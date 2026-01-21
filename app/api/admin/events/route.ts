import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

// Get all events for admin
export async function GET() {
  try {
    const adminDb = getAdminDb()
    const eventsRef = adminDb.collection("events")
    const snapshot = await eventsRef.orderBy("date", "asc").get()

    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      success: true,
      events,
      count: events.length,
    })
  } catch (error) {
    console.error("[Admin API] Error fetching events:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch events",
        events: [],
      },
      { status: 500 }
    )
  }
}

// Create a new event
export async function POST(request: Request) {
  try {
    const eventData = await request.json()

    // Validate required fields
    const requiredFields = ["title", "date", "time", "location", "organizer", "category"]
    for (const field of requiredFields) {
      if (!eventData[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    const newEvent = {
      ...eventData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      source: "manual",
      isPast: false,
    }

    const adminDb = getAdminDb()
    const docRef = await adminDb.collection("events").add(newEvent)

    return NextResponse.json({
      success: true,
      event: { id: docRef.id, ...newEvent },
      message: "Event created successfully",
    })
  } catch (error) {
    console.error("[Admin API] Error creating event:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create event",
      },
      { status: 500 }
    )
  }
}

// Update an event
export async function PATCH(request: Request) {
  try {
    const { id, ...eventData } = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      )
    }

    const adminDb = getAdminDb()
    await adminDb.collection("events").doc(id).update({
      ...eventData,
      updated_at: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Event updated successfully",
    })
  } catch (error) {
    console.error("[Admin API] Error updating event:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update event",
      },
      { status: 500 }
    )
  }
}

// Delete an event
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      )
    }

    const adminDb = getAdminDb()
    await adminDb.collection("events").doc(id).delete()

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    })
  } catch (error) {
    console.error("[Admin API] Error deleting event:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete event",
      },
      { status: 500 }
    )
  }
}
