import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  message: string
  status?: string
  created_at?: string
}

interface Subscriber {
  id: string
  email: string
  created_at?: string
}

interface Event {
  id: string
  title: string
  date: string
  location: string
  category?: string
}

interface Sponsor {
  id: string
  name: string
  src: string
}

export async function GET() {
  try {
    const adminDb = getAdminDb()

    // Fetch all data in parallel
    // Note: email_signups query avoids orderBy to prevent requiring a composite index
    const [emailSnapshot, contactSnapshot, eventSnapshot, sponsorSnapshot] = await Promise.all([
      adminDb.collection("email_signups").where("source", "==", "aim").get(),
      adminDb.collection("contact_submissions").get(),
      adminDb.collection("events").get(),
      adminDb.collection("sponsors").get(),
    ])

    // Process contacts - sort by created_at descending
    const contacts = contactSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() })) as Contact[]
    contacts.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
      return dateB - dateA
    })
    const newContacts = contacts.filter(c => !c.status || c.status === "new")
    const recentContacts = contacts.slice(0, 5)

    // Process subscribers - sort by created_at descending
    const subscribers = emailSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() })) as Subscriber[]
    subscribers.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
      return dateB - dateA
    })
    const recentSubscribers = subscribers.slice(0, 5)

    // Process events - sort by date ascending
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const events = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Event[]
    events.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateA - dateB
    })
    const upcomingEvents = events.filter(e => e.date && new Date(e.date) >= today)
    const nextEvents = upcomingEvents.slice(0, 3)

    // Process sponsors - sort by order ascending
    const sponsors = sponsorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Sponsor[]
    sponsors.sort((a, b) => ((a as unknown as { order?: number }).order ?? 0) - ((b as unknown as { order?: number }).order ?? 0))

    return NextResponse.json({
      success: true,
      counts: {
        newsletters: emailSnapshot.size,
        contacts: contactSnapshot.size,
        newContacts: newContacts.length,
        events: eventSnapshot.size,
        upcomingEvents: upcomingEvents.length,
        sponsors: sponsorSnapshot.size,
      },
      recentActivity: {
        contacts: recentContacts.map(c => ({
          id: c.id,
          name: `${c.firstName} ${c.lastName}`,
          email: c.email,
          message: c.message?.substring(0, 100) + (c.message?.length > 100 ? "..." : ""),
          status: c.status || "new",
          created_at: c.created_at,
        })),
        subscribers: recentSubscribers.map(s => ({
          id: s.id,
          email: s.email,
          created_at: s.created_at,
        })),
        upcomingEvents: nextEvents.map(e => ({
          id: e.id,
          title: e.title,
          date: e.date,
          location: e.location,
          category: e.category,
        })),
      },
      sponsors: sponsors.slice(0, 6).map(s => ({
        id: s.id,
        name: s.name,
        src: s.src,
      })),
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
        recentActivity: {
          contacts: [],
          subscribers: [],
          upcomingEvents: [],
        },
        sponsors: [],
      },
      { status: 500 }
    )
  }
}
