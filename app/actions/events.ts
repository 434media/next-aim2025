"use server"

import { getAllEvents } from "../../lib/airtable/events"

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
