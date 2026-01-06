export interface Event {
  id: string
  title: string
  description?: string
  date: string // YYYY-MM-DD format
  time: string // HH:MM format
  location: string
  organizer: string
  category: "conference" | "workshop" | "meetup" | "networking" | "other"
  attendees?: number
  price: string
  url: string
  source: "meetup" | "eventbrite" | "luma" | "manual"
  image: string
  tags: string // Comma-separated tags from API
  isPast: boolean
  created_at?: string
  updated_at?: string
}

// Helper type for parsed tags (array format)
export type EventWithParsedTags = Omit<Event, "tags"> & {
  tags: string[]
}

// Utility to parse comma-separated tags string to array
export function parseEventTags(event: Event): EventWithParsedTags {
  return {
    ...event,
    tags: event.tags ? event.tags.split(",").map((tag) => tag.trim()) : [],
  }
}
