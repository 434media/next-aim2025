"use server"

import { revalidatePath } from "next/cache"
import { createEvent, deleteEvent, getAllEvents, updateEvent } from "../../lib/airtable/events"
import type { Event } from "../../types/event"

export async function getEventsAction() {
  try {
    const events = await getAllEvents()
    return { success: true, events }
  } catch (error) {
    console.error("[Airtable] Error in getEventsAction:", error)
    
    // Check if it's an Airtable configuration error
    if (error instanceof Error && error.message.includes("Airtable configuration is missing")) {
      return { 
        success: false, 
        error: "Airtable not configured. Please set AIRTABLE_EVENTS_BASE_ID and AIRTABLE_EVENTS_API_KEY environment variables.", 
        events: [] 
      }
    }
    
    return { success: false, error: "Failed to fetch events from Airtable", events: [] }
  }
}

export async function createEventAction(event: Omit<Event, "id" | "created_at" | "updated_at">, adminPassword: string) {
  try {
    // Verify admin password (you should use environment variable)
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"
    if (adminPassword !== ADMIN_PASSWORD) {
      return { success: false, error: "Invalid admin password" }
    }

    const data = await createEvent(event)

    revalidatePath("/events")
    return { success: true, event: data }
  } catch (error) {
    console.error("[Airtable] Error in createEventAction:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to create event" }
  }
}

export async function updateEventAction(id: string, updates: Partial<Event>, adminPassword: string) {
  try {
    // Verify admin password
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"
    if (adminPassword !== ADMIN_PASSWORD) {
      return { success: false, error: "Invalid admin password" }
    }

    const data = await updateEvent(id, updates)

    revalidatePath("/events")
    return { success: true, event: data }
  } catch (error) {
    console.error("[Airtable] Error in updateEventAction:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to update event" }
  }
}

export async function deleteEventAction(id: string, adminPassword: string) {
  try {
    // Verify admin password
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"
    if (adminPassword !== ADMIN_PASSWORD) {
      return { success: false, error: "Invalid admin password" }
    }

    await deleteEvent(id)

    revalidatePath("/events")
    return { success: true }
  } catch (error) {
    console.error("[Airtable] Error in deleteEventAction:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete event" }
  }
}
