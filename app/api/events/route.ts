import { NextResponse } from "next/server"
import { getAdminDb } from "../../../lib/firebase-admin"

export async function GET() {
  try {
    const adminDb = getAdminDb()
    const snapshot = await adminDb.collection("events").orderBy("date", "asc").get()

    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json(
      { success: true, events, count: events.length },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    )
  } catch (error) {
    console.error("[Events API] Error fetching events:", error)
    const message = error instanceof Error ? error.message : "Failed to fetch events"
    return NextResponse.json(
      { success: false, error: message, events: [], count: 0 },
      { status: 500 }
    )
  }
}
