import { NextResponse } from "next/server"

const API_BASE_URL = process.env.EVENTS_API_URL || "https://434media.com"
const API_KEY = process.env.EVENTS_API_KEY

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const response = await fetch(`${API_BASE_URL}/api/public/events/${id}`, {
      headers: {
        "X-API-Key": API_KEY || "",
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { success: false, error: "Event not found" },
          { status: 404 }
        )
      }
      throw new Error(`Failed to fetch event: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    })
  } catch (error) {
    console.error("[Events API] Error fetching event:", error)
    const message = error instanceof Error ? error.message : "Failed to fetch event"
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
