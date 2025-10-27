import Airtable from "airtable"
import type { Event } from "../../types/event"

const airtableBaseId = process.env.AIRTABLE_EVENTS_BASE_ID
const airtableApiKey = process.env.AIRTABLE_EVENTS_API_KEY

if (!airtableBaseId || !airtableApiKey) {
  throw new Error("Airtable configuration is missing. Please set AIRTABLE_EVENTS_BASE_ID and AIRTABLE_EVENTS_API_KEY environment variables.")
}

// Configure Airtable with proper authentication
const base = new Airtable({ 
  apiKey: airtableApiKey,
  endpointUrl: 'https://api.airtable.com',
}).base(airtableBaseId)
const EVENTS_TABLE = "Events"

// Transform Airtable record to Event interface
function transformAirtableRecord(record: any): Event {
  const fields = record.fields

  // Handle image URL from various possible field names and types
  let imageUrl = ""
  
  // Check common text field names for image URLs
  const textImageFields = ["Image URL", "ImageURL", "Image_URL", "image_url", "Photo URL", "PhotoURL", "Poster", "Banner"]
  for (const fieldName of textImageFields) {
    if (fields[fieldName] && typeof fields[fieldName] === 'string') {
      imageUrl = fields[fieldName]
      break
    }
  }
  
  // If no text URL found, check for attachment fields
  if (!imageUrl) {
    const attachmentFields = ["Image", "Images", "Photo", "Photos", "Attachment", "Attachments", "Poster", "Banner"]
    for (const fieldName of attachmentFields) {
      if (fields[fieldName] && Array.isArray(fields[fieldName]) && fields[fieldName].length > 0) {
        const attachment = fields[fieldName][0]
        if (attachment && attachment.url) {
          imageUrl = attachment.url
          break
        }
      }
    }
  }

  // If still no image found, do a broader search for any field containing "image" or "photo"
  if (!imageUrl) {
    for (const [fieldName, value] of Object.entries(fields)) {
      const lowerFieldName = fieldName.toLowerCase()
      if ((lowerFieldName.includes('image') || lowerFieldName.includes('photo') || lowerFieldName.includes('picture')) && value) {
        // Check if it's a string URL
        if (typeof value === 'string' && value.trim()) {
          imageUrl = value
          break
        }
        // Check if it's an attachment array
        if (Array.isArray(value) && value.length > 0 && value[0].url) {
          imageUrl = value[0].url
          break
        }
      }
    }
  }

  // Enhanced debug logging for image handling (remove in production)
  if (process.env.NODE_ENV === 'development') {
    const attachmentFieldsForDebug = ["Image", "Images", "Photo", "Photos", "Attachment", "Attachments"]
    
    console.log(`[Event Image Debug] "${fields.Title || 'Untitled Event'}":`)
    console.log(`  - All available fields:`, Object.keys(fields))
    console.log(`  - Raw fields data:`, fields)
    console.log(`  - Text image fields:`, textImageFields.map((f: string) => ({ field: f, value: fields[f], type: typeof fields[f] })).filter((f: any) => f.value))
    console.log(`  - Attachment fields:`, attachmentFieldsForDebug.map((f: string) => ({ 
        field: f, 
        value: fields[f], 
        isArray: Array.isArray(fields[f]),
        length: Array.isArray(fields[f]) ? fields[f].length : 0
      })).filter((f: any) => f.value))
    console.log(`  - Final image URL:`, imageUrl)
    console.log(`---`)
  }

  // For debugging: add a test image URL if no image is found (remove in production)
  if (!imageUrl && process.env.NODE_ENV === 'development') {
    // Use a placeholder image service for testing
    imageUrl = `https://picsum.photos/400/300?random=${record.id}`
  }

  return {
    id: record.id,
    title: fields.Title || "",
    description: fields.Description || "",
    date: fields.Date || "",
    time: fields.Time || "",
    location: fields.Location || "",
    organizer: fields.Organizer || "",
    image_url: imageUrl,
    event_url: fields["Event URL"] || "",
    tags: fields.Tags 
      ? Array.isArray(fields.Tags) 
        ? fields.Tags 
        : fields.Tags.split(",").map((tag: string) => tag.trim())
      : [],
    is_past: Boolean(fields["Is Past"]),
    created_at: record.createdTime,
    updated_at: fields["Last Modified"] || record.createdTime,
  }
}

// Transform Event interface to Airtable fields
function transformEventToAirtable(event: Omit<Event, "id" | "created_at" | "updated_at">): any {
  const fields: any = {
    Title: event.title,
    Description: event.description || "",
    Date: event.date,
    Time: event.time,
    Location: event.location,
    Organizer: event.organizer,
    "Event URL": event.event_url || "",
    Tags: Array.isArray(event.tags) ? event.tags.join(", ") : "",
    "Is Past": event.is_past || false,
  }

  // Handle image URL - only add if it exists
  if (event.image_url) {
    fields["Image URL"] = event.image_url
  }

  return fields
}

export async function getAllEvents(): Promise<Event[]> {
  try {
    const records = await base(EVENTS_TABLE)
      .select({
        sort: [{ field: "Date", direction: "asc" }],
      })
      .all()

    return records.map(transformAirtableRecord)
  } catch (error: any) {
    console.error("[Airtable] Error fetching events:", error)
    
    // Handle specific Airtable errors
    if (error?.error === 'NOT_AUTHORIZED' || error?.statusCode === 403) {
      throw new Error("Airtable authorization failed. Please check your API key and base permissions.")
    }
    if (error?.error === 'TABLE_NOT_FOUND' || error?.message?.includes('Could not find table')) {
      throw new Error(`Airtable table '${EVENTS_TABLE}' not found. Please create the Events table in your base.`)
    }
    if (error?.error === 'INVALID_REQUEST' || error?.statusCode === 422) {
      throw new Error("Invalid Airtable request. Please check your base ID and table structure.")
    }
    
    throw new Error(`Failed to fetch events from Airtable: ${error?.message || 'Unknown error'}`)
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const record = await base(EVENTS_TABLE).find(id)
    return transformAirtableRecord(record)
  } catch (error) {
    console.error(`[Airtable] Error fetching event ${id}:`, error)
    if (error instanceof Error && error.message.includes("NOT_FOUND")) {
      return null
    }
    throw new Error("Failed to fetch event from Airtable")
  }
}

export async function createEvent(eventData: Omit<Event, "id" | "created_at" | "updated_at">): Promise<Event> {
  try {
    const airtableFields = transformEventToAirtable(eventData)
    
    const records = await base(EVENTS_TABLE).create([
      {
        fields: airtableFields,
      },
    ])

    if (!records || records.length === 0) {
      throw new Error("No record created")
    }

    return transformAirtableRecord(records[0])
  } catch (error) {
    console.error("[Airtable] Error creating event:", error)
    throw new Error("Failed to create event in Airtable")
  }
}

export async function updateEvent(id: string, updates: Partial<Event>): Promise<Event> {
  try {
    // Remove read-only fields from updates
    const { id: _, created_at, updated_at, ...updateData } = updates
    const airtableFields = transformEventToAirtable(updateData as any)

    const records = await base(EVENTS_TABLE).update([
      {
        id: id,
        fields: airtableFields,
      },
    ])

    if (!records || records.length === 0) {
      throw new Error("No record updated")
    }

    return transformAirtableRecord(records[0])
  } catch (error) {
    console.error(`[Airtable] Error updating event ${id}:`, error)
    if (error instanceof Error && error.message.includes("NOT_FOUND")) {
      throw new Error("Event not found")
    }
    throw new Error("Failed to update event in Airtable")
  }
}

export async function deleteEvent(id: string): Promise<void> {
  try {
    await base(EVENTS_TABLE).destroy([id])
  } catch (error) {
    console.error(`[Airtable] Error deleting event ${id}:`, error)
    if (error instanceof Error && error.message.includes("NOT_FOUND")) {
      throw new Error("Event not found")
    }
    throw new Error("Failed to delete event from Airtable")
  }
}

// Health check function to verify Airtable connection
export async function checkAirtableConnection(): Promise<{ success: boolean; error?: string; details?: any }> {
  try {
    // Try to fetch first record to test connection
    await base(EVENTS_TABLE)
      .select({
        maxRecords: 1,
      })
      .firstPage()
    
    return { success: true }
  } catch (error: any) {
    console.error("[Airtable] Connection test failed:", error)
    
    let errorMessage = "Unknown error"
    
    if (error?.error === 'NOT_AUTHORIZED' || error?.statusCode === 403) {
      errorMessage = "Authorization failed. Check your API key and permissions."
    } else if (error?.error === 'TABLE_NOT_FOUND') {
      errorMessage = `Table '${EVENTS_TABLE}' not found. Please create it in your Airtable base.`
    } else if (error?.error === 'INVALID_REQUEST') {
      errorMessage = "Invalid base ID or configuration."
    } else if (error?.message) {
      errorMessage = error.message
    }
    
    return { 
      success: false, 
      error: errorMessage,
      details: error
    }
  }
}