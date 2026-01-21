import { FieldValue } from "firebase-admin/firestore"
import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

// GET - Fetch all speakers
export async function GET() {
    try {
        const db = getAdminDb()
        const speakersRef = db.collection("speakers")
        const snapshot = await speakersRef.orderBy("order", "asc").get()

        const speakers = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))

        return NextResponse.json({ success: true, speakers })
    } catch (error) {
        console.error("[Admin API] Error fetching speakers:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to fetch speakers" },
            { status: 500 }
        )
    }
}

// POST - Create new speaker
export async function POST(request: Request) {
    try {
        const db = getAdminDb()
        const body = await request.json()

        const { name, title, organization, bio, imageUrl, linkedIn, order, featured } = body

        if (!name || !title) {
            return NextResponse.json(
                { success: false, error: "Name and title are required" },
                { status: 400 }
            )
        }

        const speakerData = {
            name,
            title,
            organization: organization || "",
            bio: bio || "",
            imageUrl: imageUrl || "",
            linkedIn: linkedIn || "",
            order: order || 0,
            featured: featured || false,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        }

        const docRef = await db.collection("speakers").add(speakerData)

        return NextResponse.json({
            success: true,
            speaker: { id: docRef.id, ...speakerData },
        })
    } catch (error) {
        console.error("[Admin API] Error creating speaker:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to create speaker" },
            { status: 500 }
        )
    }
}

// PATCH - Update speaker
export async function PATCH(request: Request) {
    try {
        const db = getAdminDb()
        const body = await request.json()

        const { id, ...updates } = body

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Speaker ID is required" },
                { status: 400 }
            )
        }

        const speakerRef = db.collection("speakers").doc(id)
        await speakerRef.update({
            ...updates,
            updatedAt: FieldValue.serverTimestamp(),
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[Admin API] Error updating speaker:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to update speaker" },
            { status: 500 }
        )
    }
}

// DELETE - Delete speaker
export async function DELETE(request: Request) {
    try {
        const db = getAdminDb()
        const body = await request.json()

        const { id } = body

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Speaker ID is required" },
                { status: 400 }
            )
        }

        await db.collection("speakers").doc(id).delete()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[Admin API] Error deleting speaker:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to delete speaker" },
            { status: 500 }
        )
    }
}
