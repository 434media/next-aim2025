import { FieldValue } from "firebase-admin/firestore"
import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

interface ScheduleItem {
    id: string
    title: string
    description?: string
    date: string
    startTime: string
    endTime?: string
    location?: string
    speakerIds?: string[]
    track?: string
    type?: string
    order?: number
}

// GET - Fetch all schedule items
export async function GET() {
    try {
        const db = getAdminDb()
        const scheduleRef = db.collection("schedule")
        // Only order by date in Firestore to avoid needing a composite index
        // We'll sort by startTime in JavaScript
        const snapshot = await scheduleRef.orderBy("date", "asc").get()

        const schedule: ScheduleItem[] = snapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<ScheduleItem, "id">),
            }))
            // Sort by date first, then by startTime
            .sort((a, b) => {
                if (a.date !== b.date) {
                    return a.date.localeCompare(b.date)
                }
                return (a.startTime || "").localeCompare(b.startTime || "")
            })

        return NextResponse.json({ success: true, schedule })
    } catch (error) {
        console.error("[Admin API] Error fetching schedule:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to fetch schedule" },
            { status: 500 }
        )
    }
}

// POST - Create new schedule item
export async function POST(request: Request) {
    try {
        const db = getAdminDb()
        const body = await request.json()

        const { title, description, date, startTime, endTime, location, speakerIds, track, type, order } = body

        if (!title || !date || !startTime) {
            return NextResponse.json(
                { success: false, error: "Title, date, and start time are required" },
                { status: 400 }
            )
        }

        const scheduleData = {
            title,
            description: description || "",
            date,
            startTime,
            endTime: endTime || "",
            location: location || "",
            speakerIds: speakerIds || [],
            track: track || "",
            type: type || "other",
            order: order || 0,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        }

        const docRef = await db.collection("schedule").add(scheduleData)

        return NextResponse.json({
            success: true,
            scheduleItem: { id: docRef.id, ...scheduleData },
        })
    } catch (error) {
        console.error("[Admin API] Error creating schedule item:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to create schedule item" },
            { status: 500 }
        )
    }
}

// PATCH - Update schedule item
export async function PATCH(request: Request) {
    try {
        const db = getAdminDb()
        const body = await request.json()

        const { id, ...updates } = body

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Schedule item ID is required" },
                { status: 400 }
            )
        }

        const scheduleRef = db.collection("schedule").doc(id)
        await scheduleRef.update({
            ...updates,
            updatedAt: FieldValue.serverTimestamp(),
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[Admin API] Error updating schedule item:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to update schedule item" },
            { status: 500 }
        )
    }
}

// DELETE - Delete schedule item
export async function DELETE(request: Request) {
    try {
        const db = getAdminDb()
        const body = await request.json()

        const { id } = body

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Schedule item ID is required" },
                { status: 400 }
            )
        }

        await db.collection("schedule").doc(id).delete()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[Admin API] Error deleting schedule item:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to delete schedule item" },
            { status: 500 }
        )
    }
}
