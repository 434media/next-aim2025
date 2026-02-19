import Airtable from "airtable"
import { checkBotId } from "botid/server"
import { NextResponse } from "next/server"

const isDevelopment = process.env.NODE_ENV === "development"

const airtableBaseId = process.env.AIRTABLE_PROJECT_MANAGEMENT_BASE_ID
const airtableApiKey = process.env.AIRTABLE_API_KEY

// Debug logging for development
if (isDevelopment) {
  console.log("=== Airtable Configuration Debug ===")
  console.log("Base ID configured:", !!airtableBaseId)
  console.log("API Key configured:", !!airtableApiKey)
}

// Conditionally initialize Airtable only if credentials exist
const base = airtableBaseId && airtableApiKey 
  ? new Airtable({ 
      apiKey: airtableApiKey,
      endpointUrl: 'https://api.airtable.com',
    }).base(airtableBaseId)
  : null

export async function POST(request: Request) {
  if (!base) {
    return NextResponse.json({ error: "Airtable not configured" }, { status: 503 })
  }
  
  try {
    // Bot protection using Vercel BotID
    const verification = await checkBotId()
    if (verification.isBot) {
      return NextResponse.json({ error: "Bot detected. Access denied." }, { status: 403 })
    }

    const {
      speakerPocId,
      speakerPocName,
      speakerPocCustomName,
      speakerName,
      roleTitle,
      company,
      linkedinProfile,
      shortJustification
    } = await request.json()
    
    // Debug logging for development
    if (isDevelopment) {
      console.log("=== Form Submission Debug ===")
      console.log("Received fields present:", {
        speakerPocId: !!speakerPocId,
        speakerPocName: !!speakerPocName,
        speakerPocCustomName: !!speakerPocCustomName,
        speakerName: !!speakerName,
        roleTitle: !!roleTitle,
        company: !!company,
        linkedinProfile: !!linkedinProfile,
        shortJustification: !!shortJustification
      })
    }

    // Prepare the fields for Airtable
    const fields: any = {
      "Speaker Name": speakerName,
      "Role / Title": roleTitle,
      "Company": company,
      "Short Justification": shortJustification,
    }

    // Handle LinkedIn profile if provided
    if (linkedinProfile && linkedinProfile.trim()) {
      fields["LinkedIn Profile"] = linkedinProfile
    }

    // Handle Speaker POC - only set if we have a valid linked record ID
    if (speakerPocId !== "other" && speakerPocId !== "" && speakerPocId) {
      // For existing Speaker POC entries, link to the Contacts record
      fields["Speaker POC"] = [speakerPocId]
    }
    
    // Handle custom POC name for "other" entries
    if (speakerPocId === "other" && (speakerPocCustomName || speakerPocName)) {
      fields["Custom POC Name"] = speakerPocCustomName || speakerPocName
    }

    // Handle Events field - link to AIM 2026 event record
    const aim2026EventId = "recxF5NAdlBaGLMcS"
    fields["Events"] = [aim2026EventId]
    
    if (isDevelopment) {
      console.log("=== Events Field Debug ===")
      console.log("Linking to AIM 2026 event record ID:", aim2026EventId)
    }

    // Debug logging for development
    if (isDevelopment) {
      console.log("=== Airtable Fields Debug ===")
      console.log("Field keys to be saved:", Object.keys(fields))
      console.log("Target table: Speakers")
    }

    // Create record in Airtable
    await base("Speakers").create([
      {
        fields: fields,
      },
    ])

    if (isDevelopment) {
      console.log("=== Success ===")
      console.log("Record created successfully in Speakers table")
    }

    return NextResponse.json({ message: "Keynote nomination submitted successfully" }, { status: 200 })
  } catch (error: any) {
    console.error("Error submitting keynote nomination:", error?.error || error?.message || "Unknown error")
    
    // Handle specific Airtable errors
    if (error?.error === 'NOT_AUTHORIZED' || error?.statusCode === 403) {
      return NextResponse.json({ error: "Airtable authorization failed. Please check your API key and base permissions." }, { status: 403 })
    }
    if (error?.error === 'TABLE_NOT_FOUND' || error?.message?.includes('Could not find table')) {
      return NextResponse.json({ error: "Speakers table not found. Please create the table in your Airtable base." }, { status: 404 })
    }
    if (error?.error === 'INVALID_REQUEST' || error?.statusCode === 422) {
      return NextResponse.json({ error: "Invalid request. Please check the field names and table structure." }, { status: 422 })
    }
    
    return NextResponse.json({ error: "An error occurred while submitting the keynote nomination" }, { status: 500 })
  }
}

export async function GET() {
  if (!base) {
    return NextResponse.json({ error: "Airtable not configured" }, { status: 503 })
  }
  
  try {
    const records = await base("Speakers")
      .select({
        sort: [{ field: "Created", direction: "desc" }],
      })
      .all()

    const nominations = records.map(record => ({
      id: record.id,
      speakerName: record.fields["Speaker Name"] || "",
      roleTitle: record.fields["Role / Title"] || "",
      company: record.fields["Company"] || "",
      linkedinProfile: record.fields["Linkedin Profile"] || "",
      shortJustification: record.fields["Short Justification"] || "",
      speakerPOC: record.fields["Speaker POC"] || record.fields["Speaker POC (Text)"] || "",
      events: record.fields["Events"] || [],
      created: (record as any).createdTime,
    }))

    return NextResponse.json(nominations, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching keynote nominations:", error?.error || error?.message || "Unknown error")
    return NextResponse.json({ error: "Failed to fetch keynote nominations" }, { status: 500 })
  }
}