import Airtable from "airtable"
import { checkBotId } from "botid/server"
import { NextResponse } from "next/server"

const airtableBaseId = process.env.AIRTABLE_BASE_ID
const airtableApiKey = process.env.AIRTABLE_API_KEY

// Conditionally initialize Airtable only if credentials exist
const base = airtableBaseId && airtableApiKey 
  ? new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId)
  : null

// Firebase Admin for Firestore
async function saveToFirestore(data: {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  message: string
}) {
  try {
    const { getAdminDb } = await import("../../../lib/firebase-admin")
    const adminDb = getAdminDb()
    await adminDb.collection("contact_submissions").add({
      ...data,
      status: "new",
      created_at: new Date().toISOString(),
    })
    return true
  } catch (error) {
    console.error("[Contact API] Firestore error:", error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    // Bot protection using Vercel BotID
    const verification = await checkBotId()
    if (verification.isBot) {
      return NextResponse.json({ error: "Bot detected. Access denied." }, { status: 403 })
    }

    const { firstName, lastName, email, phoneNumber, message } = await request.json()

    const promises: Promise<any>[] = []

    // Save to Firestore (primary storage)
    promises.push(saveToFirestore({ firstName, lastName, email, phoneNumber, message }))

    // Save to Airtable (if configured)
    if (base) {
      promises.push(
        base("AIMForm").create([
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
      )
    }

    await Promise.allSettled(promises)

    return NextResponse.json({ message: "Form submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error submitting form:", error)
    return NextResponse.json({ error: "An error occurred while submitting the form" }, { status: 500 })
  }
}

