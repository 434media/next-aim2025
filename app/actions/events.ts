"use server"

import { getAdminDb } from "../../lib/firebase-admin"
import type { Event } from "../../types/event"

export async function getEventsAction(): Promise<{
  success: boolean
  events: Event[]
  error?: string
}> {
  try {
    const adminDb = getAdminDb()
    const snapshot = await adminDb.collection("events").orderBy("date", "asc").get()

    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[]

    return {
      success: true,
      events,
    }
  } catch (error) {
    console.error("[Events] Error fetching events:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to load events",
      events: [],
    }
  }
}
