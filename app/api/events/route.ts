import { NextResponse } from "next/server"

const API_BASE_URL = process.env.EVENTS_API_URL || "https://434media.com"
const API_KEY = process.env.EVENTS_API_KEY

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get("filter") || "all"
    const limit = searchParams.get("limit")

    const url = new URL(`${API_BASE_URL}/api/public/events`)
    url.searchParams.set("filter", filter)
    if (limit) {
      url.searchParams.set("limit", limit)
    }

    const response = await fetch(url.toString(), {
      headers: {
        "X-API-Key": API_KEY || "",
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    })
  } catch (error) {
    console.error("[Events API] Error fetching events:", error)
    const message = error instanceof Error ? error.message : "Failed to fetch events"
    return NextResponse.json(
      { success: false, error: message, events: [], count: 0 },
      { status: 500 }
    )
  }
}
