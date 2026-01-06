"use server"

import type { Event } from "../../types/event"

const API_BASE_URL = process.env.EVENTS_API_URL || "https://434media.com"
const API_KEY = process.env.EVENTS_API_KEY

interface EventsApiResponse {
  success: boolean
  events: Event[]
  count: number
  timestamp: string
  error?: string
}

export async function getEventsAction(filter: "all" | "upcoming" | "past" = "all"): Promise<{
  success: boolean
  events: Event[]
  error?: string
}> {
  try {
    const url = new URL(`${API_BASE_URL}/api/public/events`)
    if (filter !== "all") {
      url.searchParams.set("filter", filter)
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

    const data: EventsApiResponse = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch events")
    }

    return {
      success: true,
      events: data.events,
    }
  } catch (error) {
    console.error("[Events API] Error fetching events:", error)
    
    // Check if it's a configuration error
    if (!API_KEY) {
      return { 
        success: false, 
        error: "Events API not configured. Please set EVENTS_API_URL and EVENTS_API_KEY environment variables.", 
        events: [] 
      }
    }
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to load events", 
      events: [] 
    }
  }
}
