import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const adminDb = getAdminDb()
    const doc = await adminDb.collection("events").doc(id).get()

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, event: { id: doc.id, ...doc.data() } },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    )
  } catch (error) {
    console.error("[Events API] Error fetching event:", error)
    const message = error instanceof Error ? error.message : "Failed to fetch event"
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
