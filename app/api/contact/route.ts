import { NextResponse } from "next/server"
import Airtable from "airtable"
import axios from "axios"

const isDevelopment = process.env.NODE_ENV === "development"

const airtableBaseId = process.env.AIRTABLE_BASE_ID
const airtableApiKey = process.env.AIRTABLE_API_KEY
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY

if (!airtableBaseId || !airtableApiKey) {
  throw new Error("Airtable configuration is missing")
}

const base = new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId)

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phoneNumber, message } = await request.json()
    const turnstileToken = request.headers.get("cf-turnstile-response")
    const remoteIp = request.headers.get("CF-Connecting-IP")

    if (!airtableBaseId || !airtableApiKey) {
      console.error("Airtable configuration is missing")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    if (!isDevelopment) {
      if (!turnstileSecretKey) {
        console.error("Turnstile secret key is not defined")
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
      }

      // Verify Turnstile token
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

