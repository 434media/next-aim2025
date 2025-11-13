import Airtable from "airtable"
import axios from "axios"
import { NextResponse } from "next/server"

const isDevelopment = process.env.NODE_ENV === "development"

const airtableBaseId = process.env.AIRTABLE_PROJECT_MANAGEMENT_BASE_ID
const airtableApiKey = process.env.AIRTABLE_API_KEY
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY

// Debug logging for development
if (isDevelopment) {
  console.log("=== Airtable Configuration Debug ===")
  console.log("Base ID:", airtableBaseId ? `${airtableBaseId.substring(0, 8)}...` : "MISSING")
  console.log("API Key:", airtableApiKey ? `${airtableApiKey.substring(0, 8)}...` : "MISSING")
  console.log("Environment variables available:", Object.keys(process.env).filter(key => key.includes('AIRTABLE')))
}

if (!airtableBaseId || !airtableApiKey) {
  console.error("Missing Airtable configuration:", { 
    hasBaseId: !!airtableBaseId, 
    hasApiKey: !!airtableApiKey 
  })
  throw new Error("Airtable configuration is missing")
}

const base = new Airtable({ 
  apiKey: airtableApiKey,
  endpointUrl: 'https://api.airtable.com',
}).base(airtableBaseId)

export async function POST(request: Request) {
  try {
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
      console.log("Received data:", {
        speakerPocId,
        speakerPocName,
        speakerPocCustomName,
        speakerName,
        roleTitle,
        company,
        linkedinProfile: linkedinProfile ? "provided" : "empty",
        shortJustification: shortJustification ? `${shortJustification.substring(0, 50)}...` : "empty"
      })
    }
    
    const turnstileToken = request.headers.get("cf-turnstile-response")
    const remoteIp = request.headers.get("CF-Connecting-IP")

    if (!airtableBaseId || !airtableApiKey) {
      console.error("Airtable configuration is missing")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Verify Turnstile token in production
    if (!isDevelopment) {
      if (!turnstileSecretKey) {
        console.error("Turnstile secret key is not defined")
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
      }

      if (turnstileToken) {
        const idempotencyKey = crypto.randomUUID()
        const turnstileVerification = await axios.post(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          new URLSearchParams({
            secret: turnstileSecretKey,
            response: turnstileToken,
            remoteip: remoteIp || "",
            idempotency_key: idempotencyKey,
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          },
        )

        if (!turnstileVerification.data.success) {
          const errorCodes = turnstileVerification.data["error-codes"] || []
          console.error("Turnstile verification failed:", errorCodes)
          return NextResponse.json({ error: "Turnstile verification failed", errorCodes }, { status: 400 })
        }
      } else {
        return NextResponse.json({ error: "Turnstile token is missing" }, { status: 400 })
      }
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
      console.log("Fields to be saved:", fields)
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
    console.error("Error submitting keynote nomination:", error)
    
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
    console.error("Error fetching keynote nominations:", error)
    return NextResponse.json({ error: "Failed to fetch keynote nominations" }, { status: 500 })
  }
}