import { NextResponse } from "next/server"
import Airtable from "airtable"
import axios from "axios"

const airtableBaseId = process.env.AIRTABLE_BASE_ID
const airtableApiKey = process.env.AIRTABLE_API_KEY
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY

if (!airtableBaseId || !airtableApiKey) {
  throw new Error("Airtable configuration is missing")
}

const base = new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId)

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phoneNumber, message, turnstileToken } = await request.json()

    if (!airtableBaseId || !airtableApiKey) {
      console.error("Airtable configuration is missing")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    if (!turnstileSecretKey) {
      console.error("Turnstile secret key is not defined")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Verify Turnstile token
    const turnstileVerification = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      new URLSearchParams({
        secret: turnstileSecretKey,
        response: turnstileToken,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    )

    if (!turnstileVerification.data.success) {
      return NextResponse.json({ error: "Turnstile verification failed" }, { status: 400 })
    }

    // Create record in Airtable
    await base("AIMForm").create([
      {
        fields: {
          "First Name": firstName,
          "Last Name": lastName,
          Email: email,
          "Phone Number": phoneNumber,
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

