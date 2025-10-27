import type { Event } from "../types/event"

export function isEventUpcoming(event: Event): boolean {
  const eventDate = new Date(event.date)
  const now = new Date()

  // Set time to end of day for the event date
  eventDate.setHours(23, 59, 59, 999)

  return eventDate >= now
}

export function formatEventDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatEventTime(timeString: string): string {
  // Handle various time formats
  if (!timeString) return ""

  try {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  } catch {
    return timeString
  }
}
