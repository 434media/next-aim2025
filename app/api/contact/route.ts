import Airtable from "airtable"
import { checkBotId } from "botid/server"
import { NextResponse } from "next/server"

const airtableBaseId = process.env.AIRTABLE_BASE_ID
const airtableApiKey = process.env.AIRTABLE_API_KEY

if (!airtableBaseId || !airtableApiKey) {
  throw new Error("Airtable configuration is missing")
}

const base = new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId)

export async function POST(request: Request) {
  try {
    // Bot protection using Vercel BotID
    const verification = await checkBotId()
    if (verification.isBot) {
      return NextResponse.json({ error: "Bot detected. Access denied." }, { status: 403 })
    }

    const { firstName, lastName, email, phoneNumber, message } = await request.json()

    if (!airtableBaseId || !airtableApiKey) {
      console.error("Airtable configuration is missing")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Create record in Airtable
    await base("AIMForm").create([
      {
        fields: {
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Phone: phoneNumber,
          Message: message,
          Source: "AIM",
        },
      },
    ])

    return NextResponse.json({ message: "Form submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error submitting form:", error)
    return NextResponse.json({ error: "An error occurred while submitting the form" }, { status: 500 })
  }
}

