import { FieldValue } from "firebase-admin/firestore"
import { NextResponse } from "next/server"
import { aim2026SponsorsBottom, aim2026SponsorsTop } from "../../../../data/partners"
import { getAdminDb } from "../../../../lib/firebase-admin"

// AIM 2026 sponsors derived from data/partners.ts
// href → website field mapping; tier label added
const aim2026Sponsors = [
    ...aim2026SponsorsTop.map((s, i) => ({
        name: s.name,
        src: s.src,
        website: s.href,
        description: "",
        tier: "tier-1",
        order: i + 1,
        featured: true,
    })),
    ...aim2026SponsorsBottom.map((s, i) => ({
        name: s.name,
        src: s.src,
        website: s.href,
        description: "",
        tier: "tier-2",
        order: aim2026SponsorsTop.length + i + 1,
        featured: false,
    })),
]

// POST - Seed sponsors from testimonials (run once)
export async function POST(request: Request) {
    try {
        // Simple protection - require a secret key
        const { secret } = await request.json()

        if (secret !== process.env.SEED_SECRET && secret !== "aim2025-seed-sponsors") {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            )
        }

        const db = getAdminDb()
        const batch = db.batch()
        const sponsorsRef = db.collection("sponsors")

        // Check if sponsors already exist
        const existingSnapshot = await sponsorsRef.limit(1).get()
        if (!existingSnapshot.empty) {
            return NextResponse.json({
                success: false,
                error: "Sponsors collection already has data. Delete existing sponsors first if you want to re-seed.",
            })
        }

        // Add each sponsor
        const createdSponsors: { id: string; name: string }[] = []

        for (const sponsor of aim2026Sponsors) {
            const docRef = sponsorsRef.doc()
            batch.set(docRef, {
                ...sponsor,
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp(),
            })
            createdSponsors.push({ id: docRef.id, name: sponsor.name })
        }

        await batch.commit()

        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${createdSponsors.length} sponsors`,
            sponsors: createdSponsors,
        })
    } catch (error) {
        console.error("[Admin API] Error seeding sponsors:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to seed sponsors" },
            { status: 500 }
        )
    }
}

// GET - Check seed status
export async function GET() {
    try {
        const db = getAdminDb()
        const sponsorsRef = db.collection("sponsors")
        const snapshot = await sponsorsRef.get()

        return NextResponse.json({
            success: true,
            sponsorCount: snapshot.size,
            message: snapshot.empty
                ? "No sponsors in database. Ready to seed."
                : `${snapshot.size} sponsors already in database.`,
        })
    } catch (error) {
        console.error("[Admin API] Error checking sponsors:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to check sponsors" },
            { status: 500 }
        )
    }
}
