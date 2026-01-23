import { FieldValue } from "firebase-admin/firestore"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getAdminAuth, getAdminDb } from "../../../../lib/firebase-admin"

interface SiteText {
    id: string
    textId: string
    content: string
    page?: string
    section?: string
    createdAt: FirebaseFirestore.Timestamp
    updatedAt: FirebaseFirestore.Timestamp
    updatedBy?: string
}

// Helper to verify admin session
async function verifyAdminSession() {
    try {
        const cookieStore = await cookies()
        const sessionCookie = cookieStore.get("__session")?.value

        if (!sessionCookie) {
            return null
        }

        const auth = getAdminAuth()
        const decodedToken = await auth.verifySessionCookie(sessionCookie, true)
        
        // Verify 434media.com domain
        if (!decodedToken.email?.endsWith("@434media.com")) {
            return null
        }

        return decodedToken
    } catch {
        return null
    }
}

// GET - Fetch site text content (public for reading, but includes all text)
export async function GET(request: Request) {
    try {
        const db = getAdminDb()
        const { searchParams } = new URL(request.url)
        
        const textId = searchParams.get("textId")
        const page = searchParams.get("page")

        let query: FirebaseFirestore.Query = db.collection("siteText")

        // Filter by specific textId
        if (textId) {
            const doc = await db.collection("siteText").doc(textId).get()
            if (!doc.exists) {
                return NextResponse.json({ success: true, text: null })
            }
            return NextResponse.json({
                success: true,
                text: { id: doc.id, ...doc.data() } as SiteText,
            })
        }

        // Filter by page
        if (page) {
            query = query.where("page", "==", page)
        }

        const snapshot = await query.get()
        const texts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as SiteText[]

        return NextResponse.json({ success: true, texts })
    } catch (error) {
        console.error("[Site Text API] Error fetching:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to fetch site text" },
            { status: 500 }
        )
    }
}

// POST - Create new site text entry (admin only)
export async function POST(request: Request) {
    try {
        const admin = await verifyAdminSession()
        if (!admin) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            )
        }

        const db = getAdminDb()
        const body = await request.json()

        const { textId, content, page, section } = body

        if (!textId || !content) {
            return NextResponse.json(
                { success: false, error: "textId and content are required" },
                { status: 400 }
            )
        }

        const textData = {
            textId,
            content,
            page: page || "global",
            section: section || "default",
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
            updatedBy: admin.email,
        }

        // Use textId as document ID for easy lookup
        await db.collection("siteText").doc(textId).set(textData)

        return NextResponse.json({
            success: true,
            text: { id: textId, ...textData },
        })
    } catch (error) {
        console.error("[Site Text API] Error creating:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to create site text" },
            { status: 500 }
        )
    }
}

// PATCH - Update site text (admin only) - supports batch updates
export async function PATCH(request: Request) {
    try {
        const admin = await verifyAdminSession()
        if (!admin) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            )
        }

        const db = getAdminDb()
        const body = await request.json()

        // Support both single update and batch updates
        const updates: Array<{ textId: string; content: string; page?: string; section?: string }> = 
            body.updates || [body]

        const batch = db.batch()
        const results: Array<{ textId: string; success: boolean }> = []

        for (const update of updates) {
            const { textId, content, page, section } = update

            if (!textId) {
                results.push({ textId: textId || "unknown", success: false })
                continue
            }

            const docRef = db.collection("siteText").doc(textId)
            const doc = await docRef.get()

            if (doc.exists) {
                const existingData = doc.data()
                
                // Save the current version to history before updating
                if (existingData?.content && existingData.content !== content) {
                    // Get the current highest version number
                    const versionsRef = docRef
                        .collection("versions")
                        .orderBy("versionNumber", "desc")
                        .limit(1)
                    
                    const versionSnapshot = await versionsRef.get()
                    const currentVersion = versionSnapshot.empty 
                        ? 0 
                        : (versionSnapshot.docs[0].data().versionNumber || 0)
                    
                    // Create a new version with the old content
                    const versionRef = docRef.collection("versions").doc()
                    batch.set(versionRef, {
                        textId,
                        content: existingData.content,
                        versionNumber: currentVersion + 1,
                        createdAt: FieldValue.serverTimestamp(),
                        createdBy: existingData.updatedBy || admin.email,
                    })
                }

                // Update existing
                batch.update(docRef, {
                    content,
                    ...(page && { page }),
                    ...(section && { section }),
                    updatedAt: FieldValue.serverTimestamp(),
                    updatedBy: admin.email,
                })
            } else {
                // Create new
                batch.set(docRef, {
                    textId,
                    content,
                    page: page || "global",
                    section: section || "default",
                    createdAt: FieldValue.serverTimestamp(),
                    updatedAt: FieldValue.serverTimestamp(),
                    updatedBy: admin.email,
                })
            }

            results.push({ textId, success: true })
        }

        await batch.commit()

        return NextResponse.json({ success: true, results })
    } catch (error) {
        console.error("[Site Text API] Error updating:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to update site text" },
            { status: 500 }
        )
    }
}

// DELETE - Remove site text entry (admin only)
export async function DELETE(request: Request) {
    try {
        const admin = await verifyAdminSession()
        if (!admin) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            )
        }

        const db = getAdminDb()
        const { searchParams } = new URL(request.url)
        const textId = searchParams.get("textId")

        if (!textId) {
            return NextResponse.json(
                { success: false, error: "textId is required" },
                { status: 400 }
            )
        }

        await db.collection("siteText").doc(textId).delete()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[Site Text API] Error deleting:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to delete site text" },
            { status: 500 }
        )
    }
}
