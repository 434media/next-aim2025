import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

interface Subscriber {
  id: string
  email?: string
  source?: string
  tags?: string[]
  pageUrl?: string
  created_at?: string
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const adminDb = getAdminDb()
    const subscribersRef = adminDb.collection("email_signups")
    
    // Only get emails with source "aim"
    const query = subscribersRef.where("source", "==", "aim")
    
    const snapshot = await query.get()

    let subscribers: Subscriber[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Subscriber, "id">),
    }))

    // Filter by date range if provided (done in JS since Firestore requires composite index for multiple where + orderBy)
    if (startDate) {
      const start = new Date(startDate)
      start.setHours(0, 0, 0, 0)
      subscribers = subscribers.filter((sub) => {
        const subDate = sub.created_at ? new Date(sub.created_at) : null
        return subDate && subDate >= start
      })
    }

    if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      subscribers = subscribers.filter((sub) => {
        const subDate = sub.created_at ? new Date(sub.created_at) : null
        return subDate && subDate <= end
      })
    }

    // Sort by created_at descending
    subscribers.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
      return dateB - dateA
    })

    return NextResponse.json({
      success: true,
      subscribers,
      count: subscribers.length,
    })
  } catch (error) {
    console.error("[Admin API] Error fetching newsletter subscribers:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch subscribers",
        subscribers: [],
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Subscriber ID is required" },
        { status: 400 }
      )
    }

    const adminDb = getAdminDb()
    await adminDb.collection("email_signups").doc(id).delete()

    return NextResponse.json({
      success: true,
      message: "Subscriber deleted successfully",
    })
  } catch (error) {
    console.error("[Admin API] Error deleting subscriber:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete subscriber",
      },
      { status: 500 }
    )
  }
}
