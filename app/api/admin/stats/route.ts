import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

export async function GET() {
  try {
    const adminDb = getAdminDb()

    // Fetch counts in parallel
    const [emailSnapshot, contactSnapshot, eventSnapshot, sponsorSnapshot] = await Promise.all([
      adminDb.collection("email_signups").where("source", "==", "aim").get(),
      adminDb.collection("contact_submissions").get(),
      adminDb.collection("events").get(),
      adminDb.collection("sponsors").get(),
    ])

    // Count new contacts
    const newContacts = contactSnapshot.docs.filter(
      (doc) => !doc.data().status || doc.data().status === "new"
    ).length

    // Count upcoming events
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const upcomingEvents = eventSnapshot.docs.filter((doc) => {
      const eventDate = doc.data().date
      return eventDate && new Date(eventDate) >= today
    }).length

    return NextResponse.json({
      success: true,
      counts: {
        newsletters: emailSnapshot.size,
        contacts: contactSnapshot.size,
        newContacts,
        events: eventSnapshot.size,
        upcomingEvents,
        sponsors: sponsorSnapshot.size,
      },
    })
  } catch (error) {
    console.error("[Admin API] Error fetching stats:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch stats",
        counts: {
          newsletters: 0,
          contacts: 0,
          newContacts: 0,
          events: 0,
          upcomingEvents: 0,
          sponsors: 0,
        },
      },
      { status: 500 }
    )
  }
}
