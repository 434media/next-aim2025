import { NextResponse } from "next/server"
import { deleteEvent, getEventById, updateEvent } from "../../../../lib/airtable/events"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const event = await getEventById(id)
    
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }
    
    return NextResponse.json({ event })
  } catch (error) {
    console.error("[Airtable] Error fetching event:", error)
    const message = error instanceof Error ? error.message : "Failed to fetch event"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const event = await updateEvent(id, body)
    return NextResponse.json({ event })
  } catch (error) {
    console.error("[Airtable] Error updating event:", error)
    const message = error instanceof Error ? error.message : "Failed to update event"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await deleteEvent(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Airtable] Error deleting event:", error)
    const message = error instanceof Error ? error.message : "Failed to delete event"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
