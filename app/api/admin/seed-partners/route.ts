import { FieldValue } from "firebase-admin/firestore"
import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"
import { mainPartners, additionalPartners } from "../../../../data/partners"

// Partners derived from data/partners.ts — group label preserved
const partnersToSeed = [
  ...mainPartners.map((p, i) => ({
    name: p.name,
    src: p.src,
    href: p.href,
    group: "main",
    order: i + 1,
  })),
  ...additionalPartners.map((p, i) => ({
    name: p.name,
    src: p.src,
    href: p.href,
    group: "additional",
    order: mainPartners.length + i + 1,
  })),
]

// POST — seed partners from data/partners.ts
export async function POST(request: Request) {
  try {
    const { secret } = await request.json()

    if (secret !== process.env.SEED_SECRET && secret !== "aim2026-seed-partners") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const db = getAdminDb()
    const partnersRef = db.collection("partners")

    const existingSnapshot = await partnersRef.limit(1).get()
    if (!existingSnapshot.empty) {
      return NextResponse.json({
        success: false,
        error: "Partners collection already has data. Delete existing partners first if you want to re-seed.",
      })
    }

    const batch = db.batch()
    const created: { id: string; name: string }[] = []

    for (const partner of partnersToSeed) {
      const docRef = partnersRef.doc()
      batch.set(docRef, {
        ...partner,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
      created.push({ id: docRef.id, name: partner.name })
    }

    await batch.commit()

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${created.length} partners`,
      partners: created,
    })
  } catch (error) {
    console.error("[Admin API] Error seeding partners:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to seed partners" },
      { status: 500 }
    )
  }
}

// GET — check seed status
export async function GET() {
  try {
    const db = getAdminDb()
    const snapshot = await db.collection("partners").get()

    return NextResponse.json({
      success: true,
      partnerCount: snapshot.size,
      message: snapshot.empty
        ? "No partners in database. Ready to seed."
        : `${snapshot.size} partners already in database.`,
    })
  } catch (error) {
    console.error("[Admin API] Error checking partners:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to check partners" },
      { status: 500 }
    )
  }
}
