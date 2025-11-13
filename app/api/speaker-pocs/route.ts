import Airtable from "airtable"
import { NextResponse } from "next/server"

const airtableBaseId = process.env.AIRTABLE_PROJECT_MANAGEMENT_BASE_ID
const airtableApiKey = process.env.AIRTABLE_API_KEY

if (!airtableBaseId || !airtableApiKey) {
  throw new Error("Airtable configuration is missing")
}

const base = new Airtable({ 
  apiKey: airtableApiKey,
  endpointUrl: 'https://api.airtable.com',
}).base(airtableBaseId)

export async function GET() {
  try {
    const records = await base("Contacts")
      .select({
        filterByFormula: "FIND('AIM2026: Keynote Speaker Nomination', {Tags})",
        sort: [{ field: "Name", direction: "asc" }],
      })
      .all()

    const speakerPOCs = records.map(record => ({
      id: record.id,
      name: record.fields.Name || "",
      email: record.fields.Email || "",
    }))

    return NextResponse.json(speakerPOCs, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching Speaker POCs:", error)
    
    // Handle specific Airtable errors
    if (error?.error === 'NOT_AUTHORIZED' || error?.statusCode === 403) {
      return NextResponse.json({ error: "Airtable authorization failed. Please check your API key and base permissions." }, { status: 403 })
    }
    if (error?.error === 'TABLE_NOT_FOUND' || error?.message?.includes('Could not find table')) {
      return NextResponse.json({ error: "Contacts table not found. Please create the table in your Airtable base." }, { status: 404 })
    }
    
    return NextResponse.json({ error: "Failed to fetch speaker POCs" }, { status: 500 })
  }
}