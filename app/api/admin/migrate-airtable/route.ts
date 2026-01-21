import Airtable from "airtable"
import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

const airtableBaseId = process.env.AIRTABLE_BASE_ID
const airtableApiKey = process.env.AIRTABLE_API_KEY

// Initialize Airtable
const base = airtableBaseId && airtableApiKey 
  ? new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId)
  : null

interface AirtableEmailRecord {
  id: string
  createdTime?: string
  fields: {
    Email?: string
    Source?: string
    "Created At"?: string
    "Created"?: string
    Tags?: string[]
    "Page URL"?: string
  }
}

interface AirtableContactRecord {
  id: string
  createdTime?: string
  fields: {
    FirstName?: string
    LastName?: string
    Email?: string
    Phone?: string
    Message?: string
    Source?: string
    "Created At"?: string
    "Created"?: string
    CreatedTime?: string
  }
}

// POST - Run migration from Airtable to Firestore
export async function POST(request: Request) {
  try {
    // Simple protection - require a secret key
    const { secret, type, forceRemigrate } = await request.json()
    
    if (secret !== process.env.SEED_SECRET && secret !== "aim2025-migrate") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!base) {
      return NextResponse.json(
        { success: false, error: "Airtable not configured" },
        { status: 500 }
      )
    }

    const db = getAdminDb()
    const results: { emails?: number; contacts?: number; errors: string[]; deleted?: { emails?: number; contacts?: number } } = { errors: [] }

    // If forceRemigrate, delete existing migrated records first
    if (forceRemigrate) {
      results.deleted = {}
      
      // Delete existing migrated emails (query all and filter in JS)
      const allEmails = await db.collection("email_signups").get()
      const migratedEmails = allEmails.docs.filter(doc => doc.data().airtable_id)
      if (migratedEmails.length > 0) {
        const deleteBatch = db.batch()
        migratedEmails.forEach(doc => deleteBatch.delete(doc.ref))
        await deleteBatch.commit()
        results.deleted.emails = migratedEmails.length
      }
      
      // Delete existing migrated contacts (query all and filter in JS)
      const allContacts = await db.collection("contact_submissions").get()
      const migratedContacts = allContacts.docs.filter(doc => doc.data().airtable_id)
      if (migratedContacts.length > 0) {
        const deleteBatch = db.batch()
        migratedContacts.forEach(doc => deleteBatch.delete(doc.ref))
        await deleteBatch.commit()
        results.deleted.contacts = migratedContacts.length
      }
    }

    // Migrate newsletter emails
    if (!type || type === "emails" || type === "all") {
      try {
        const emailRecords: AirtableEmailRecord[] = []
        
        await new Promise<void>((resolve, reject) => {
          base("Email Sign Up (All Sites)")
            .select({
              filterByFormula: "{Source} = 'AIM'",
              maxRecords: 10000,
            })
            .eachPage(
              (records, fetchNextPage) => {
                records.forEach((record) => {
                  // Access the record's created time from _rawJson
                  const rawRecord = record._rawJson as { createdTime?: string } | undefined
                  emailRecords.push({
                    id: record.id,
                    createdTime: rawRecord?.createdTime,
                    fields: record.fields as AirtableEmailRecord["fields"],
                  })
                })
                fetchNextPage()
              },
              (err) => {
                if (err) reject(err)
                else resolve()
              }
            )
        })

        // Add to Firestore
        const batch = db.batch()
        const emailSignupsRef = db.collection("email_signups")
        let emailCount = 0

        for (const record of emailRecords) {
          if (record.fields.Email) {
            const docRef = emailSignupsRef.doc()
            // Try multiple possible date fields, falling back to record's createdTime
            const createdDate = 
              record.fields["Created At"] || 
              record.fields["Created"] ||
              record.createdTime ||
              new Date().toISOString()
            batch.set(docRef, {
              email: record.fields.Email.toLowerCase().trim(),
              source: "aim",
              tags: record.fields.Tags || ["web-aimsummit", "newsletter-signup"],
              pageUrl: record.fields["Page URL"] || null,
              created_at: createdDate,
              airtable_id: record.id,
              migrated_at: new Date().toISOString(),
            })
            emailCount++
          }
        }

        if (emailCount > 0) {
          await batch.commit()
        }
        results.emails = emailCount
      } catch (error) {
        console.error("[Migration] Email migration error:", error)
        results.errors.push(`Email migration failed: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    // Migrate contact submissions
    if (!type || type === "contacts" || type === "all") {
      try {
        const contactRecords: AirtableContactRecord[] = []
        
        await new Promise<void>((resolve, reject) => {
          base("AIMForm")
            .select({
              maxRecords: 10000,
            })
            .eachPage(
              (records, fetchNextPage) => {
                records.forEach((record) => {
                  // Access the record's created time from _rawJson
                  const rawRecord = record._rawJson as { createdTime?: string } | undefined
                  contactRecords.push({
                    id: record.id,
                    createdTime: rawRecord?.createdTime,
                    fields: record.fields as AirtableContactRecord["fields"],
                  })
                })
                fetchNextPage()
              },
              (err) => {
                if (err) reject(err)
                else resolve()
              }
            )
        })

        // Add to Firestore
        const batch = db.batch()
        const contactsRef = db.collection("contact_submissions")
        let contactCount = 0

        for (const record of contactRecords) {
          const docRef = contactsRef.doc()
          // Try multiple possible date fields, falling back to record's createdTime
          const createdDate = 
            record.fields["Created At"] || 
            record.fields["Created"] ||
            record.fields.CreatedTime ||
            record.createdTime ||
            new Date().toISOString()
          batch.set(docRef, {
            firstName: record.fields.FirstName || "",
            lastName: record.fields.LastName || "",
            email: record.fields.Email || "",
            phoneNumber: record.fields.Phone || null,
            message: record.fields.Message || "",
            status: "new",
            created_at: createdDate,
            airtable_id: record.id,
            migrated_at: new Date().toISOString(),
            comments: [],
          })
          contactCount++
        }

        if (contactCount > 0) {
          await batch.commit()
        }
        results.contacts = contactCount
      } catch (error) {
        console.error("[Migration] Contact migration error:", error)
        results.errors.push(`Contact migration failed: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Migration completed",
      results,
    })
  } catch (error) {
    console.error("[Migration] Error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Migration failed" },
      { status: 500 }
    )
  }
}

// GET - Check migration status
export async function GET() {
  try {
    const db = getAdminDb()
    
    const [emailSnapshot, contactSnapshot] = await Promise.all([
      db.collection("email_signups").where("source", "==", "aim").get(),
      db.collection("contact_submissions").get(),
    ])

    return NextResponse.json({
      success: true,
      counts: {
        emails: emailSnapshot.size,
        contacts: contactSnapshot.size,
      },
      message: "Current data in Firestore",
    })
  } catch (error) {
    console.error("[Migration] Status check error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to check status" },
      { status: 500 }
    )
  }
}
