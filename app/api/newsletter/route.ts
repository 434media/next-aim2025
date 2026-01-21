import axios from "axios"
import { checkBotId } from "botid/server"
import crypto from "crypto"
import { NextResponse } from "next/server"
import { getAdminDb } from "../../../lib/firebase-admin"

// Mailchimp Configuration
const mailchimpApiKey = process.env.MAILCHIMP_API_KEY
const mailchimpListId = process.env.MAILCHIMP_AUDIENCE_ID
const mailchimpDatacenter = mailchimpApiKey ? mailchimpApiKey.split("-").pop() : null

// Website identifier for tracking
const SITE_SOURCE = "aim"
const SITE_TAGS = ["web-aimsummit", "newsletter-signup"]

export async function POST(request: Request) {
  try {
    // Bot protection using Vercel BotID
    const verification = await checkBotId()
    if (verification.isBot) {
      return NextResponse.json({ error: "Bot detected. Access denied." }, { status: 403 })
    }

    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const mailchimpEnabled = mailchimpApiKey && mailchimpListId
    if (!mailchimpEnabled) {
      console.warn("Mailchimp integration disabled - missing API key or Audience ID")
    }

    const promises: Promise<any>[] = []
    const errors: string[] = []

    // 1. Save directly to AIM's Firestore database (aimsatx)
    const saveToFirestore = async () => {
      try {
        const adminDb = getAdminDb()
        await adminDb.collection("email_signups").add({
          email: email.toLowerCase().trim(),
          source: SITE_SOURCE,
          tags: SITE_TAGS,
          pageUrl: request.headers.get("referer") || null,
          created_at: new Date().toISOString(),
        })
        return { success: true }
      } catch (error) {
        console.error("[Newsletter] Firestore save error:", error)
        throw error
      }
    }
    promises.push(saveToFirestore())

    // 2. Add to Mailchimp (with tagging)
    if (mailchimpEnabled) {
      console.log(
        "[Newsletter] Mailchimp API URL:",
        `https://${mailchimpDatacenter}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
      )

      const mailchimpPromise = axios.post(
        `https://${mailchimpDatacenter}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
        {
          email_address: email,
          status: "subscribed",
          tags: SITE_TAGS,
        },
        {
          auth: {
            username: "apikey",
            password: mailchimpApiKey,
          },
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: (status) => status < 500,
        },
      )

      promises.push(mailchimpPromise)
    }

    const results = await Promise.allSettled(promises)

    // Handle Firestore result
    const firestoreResult = results[0]
    if (firestoreResult.status === "rejected") {
      console.error("[Newsletter] Firestore save error:", firestoreResult.reason)
      errors.push("Database storage failed")
    }

    // Handle Mailchimp result
    if (mailchimpEnabled) {
      const mailchimpResult = results[1]
      if (mailchimpResult.status === "rejected") {
        console.error("Mailchimp error:", mailchimpResult.reason)
        await handleMailchimpError(mailchimpResult.reason, email, errors)
      } else if (mailchimpResult.status === "fulfilled") {
        const response = mailchimpResult.value
        if (response.status >= 400 && response.data?.title === "Member Exists") {
          // Update existing member with tags
          console.log("Email already exists in Mailchimp, updating tags")
          await updateMailchimpMemberTags(email)
        } else if (response.status >= 400) {
          console.error("Mailchimp error:", response.data)
          errors.push("Mailchimp subscription failed")
        }
      }
    }

    // Return success if at least one service succeeded
    const totalServices = mailchimpEnabled ? 2 : 1
    if (errors.length < totalServices) {
      return NextResponse.json(
        {
          message: "Newsletter subscription successful",
          warnings: errors.length > 0 ? errors : undefined,
          mailchimpEnabled,
        },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        {
          error: mailchimpEnabled ? "Both services failed" : "Email storage service failed",
          details: errors,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return NextResponse.json({ error: "An error occurred while subscribing to the newsletter" }, { status: 500 })
  }
}

async function handleMailchimpError(error: any, email: string, errors: string[]) {
  if (error?.response?.data) {
    const responseData = error.response.data
    if (typeof responseData === "string" && responseData.includes("<!DOCTYPE")) {
      console.error("Mailchimp returned HTML error page - likely authentication issue")
      errors.push("Mailchimp authentication failed")
    } else if (responseData?.title === "Member Exists") {
      console.log("Email already exists in Mailchimp, updating tags")
      await updateMailchimpMemberTags(email)
    } else {
      errors.push("Mailchimp subscription failed")
    }
  } else {
    errors.push("Mailchimp subscription failed")
  }
}

async function updateMailchimpMemberTags(email: string) {
  try {
    const emailHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex")
    await axios.post(
      `https://${mailchimpDatacenter}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members/${emailHash}/tags`,
      {
        tags: SITE_TAGS.map((tag) => ({ name: tag, status: "active" })),
      },
      {
        auth: {
          username: "apikey",
          password: mailchimpApiKey!,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (updateError) {
    console.error("Failed to update existing Mailchimp member tags:", updateError)
  }
}