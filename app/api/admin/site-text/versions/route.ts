import { FieldValue } from "firebase-admin/firestore"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getAdminAuth, getAdminDb } from "../../../../../lib/firebase-admin"

interface TextVersion {
    id: string
    textId: string
    content: string
    createdAt: FirebaseFirestore.Timestamp
    createdBy: string
    versionNumber: number
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
        
        if (!decodedToken.email?.endsWith("@434media.com")) {
            return null
        }

        return decodedToken
    } catch {
        return null
    }
}

// GET - Fetch version history for a text block
export async function GET(request: Request) {
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
        const limit = parseInt(searchParams.get("limit") || "20")

        if (!textId) {
            return NextResponse.json(
                { success: false, error: "textId is required" },
                { status: 400 }
            )
        }

        // Get versions from subcollection, ordered by version number descending
        const versionsRef = db
            .collection("siteText")
            .doc(textId)
            .collection("versions")
            .orderBy("versionNumber", "desc")
            .limit(limit)

        const snapshot = await versionsRef.get()
        const versions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as TextVersion[]

        return NextResponse.json({ success: true, versions })
    } catch (error) {
        console.error("[Versions API] Error fetching:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to fetch versions" },
            { status: 500 }
        )
    }
}

// POST - Create a new version (typically called before updating text)
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
        const { textId, content } = body

        if (!textId || content === undefined) {
            return NextResponse.json(
                { success: false, error: "textId and content are required" },
                { status: 400 }
            )
        }

        // Get the current highest version number
        const versionsRef = db
            .collection("siteText")
            .doc(textId)
            .collection("versions")
            .orderBy("versionNumber", "desc")
            .limit(1)

        const snapshot = await versionsRef.get()
        const currentVersion = snapshot.empty ? 0 : (snapshot.docs[0].data().versionNumber || 0)
        const newVersionNumber = currentVersion + 1

        // Create new version
        const versionData = {
            textId,
            content,
            versionNumber: newVersionNumber,
            createdAt: FieldValue.serverTimestamp(),
            createdBy: admin.email,
        }

        const versionRef = await db
            .collection("siteText")
            .doc(textId)
            .collection("versions")
            .add(versionData)

        return NextResponse.json({
            success: true,
            version: { id: versionRef.id, ...versionData, versionNumber: newVersionNumber },
        })
    } catch (error) {
        console.error("[Versions API] Error creating:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to create version" },
            { status: 500 }
        )
    }
}

// DELETE - Delete old versions (keep only latest N versions)
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
        const keepCount = parseInt(searchParams.get("keep") || "10")

        if (!textId) {
            return NextResponse.json(
                { success: false, error: "textId is required" },
                { status: 400 }
            )
        }

        // Get all versions
        const versionsRef = db
            .collection("siteText")
            .doc(textId)
            .collection("versions")
            .orderBy("versionNumber", "desc")

        const snapshot = await versionsRef.get()
        
        // Delete versions beyond the keepCount
        const versionsToDelete = snapshot.docs.slice(keepCount)
        
        if (versionsToDelete.length > 0) {
            const batch = db.batch()
            versionsToDelete.forEach((doc) => batch.delete(doc.ref))
            await batch.commit()
        }

        return NextResponse.json({
            success: true,
            deleted: versionsToDelete.length,
            kept: Math.min(snapshot.docs.length, keepCount),
        })
    } catch (error) {
        console.error("[Versions API] Error deleting:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to delete versions" },
            { status: 500 }
        )
    }
}
