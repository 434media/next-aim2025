import { NextResponse } from "next/server"
import { createEvent, getAllEvents } from "../../../lib/airtable/events"

export async function GET() {
  try {
    const events = await getAllEvents()
    return NextResponse.json({ events })
  } catch (error) {
    console.error("[Airtable] Error fetching events:", error)
    const message = error instanceof Error ? error.message : "Failed to fetch events"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const event = await createEvent(body)
    return NextResponse.json({ event })
  } catch (error) {
    console.error("[Airtable] Error creating event:", error)
    const message = error instanceof Error ? error.message : "Failed to create event"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
