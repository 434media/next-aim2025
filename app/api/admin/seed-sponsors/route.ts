import { FieldValue } from "firebase-admin/firestore"
import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

// Testimonial data to seed as sponsors
const testimonialSponsors = [
    {
        name: "Audicin",
        description: "At Audicin, we develop audio solutions to enhance focus, recovery, and sleep for active duty service members and veterans. Engineered for operational demands and post-service care for PTSD, Audicin supports cognitive readiness, stress regulation, and long-term resilience through mission-tested sound therapy",
        contactName: "Laura Avonius",
        contactTitle: "Founder & CEO, Audicin",
        contactImage: "https://ampd-asset.s3.us-east-2.amazonaws.com/laura-audicin.jpeg",
        src: "https://ampd-asset.s3.us-east-2.amazonaws.com/HorizontalLogo_Audicin-02.png",
        alt: "Audicin Logo",
        website: "https://www.audicin.com/",
        tier: "partner",
        order: 1,
        featured: true,
    },
    {
        name: "The Metis Foundation",
        description: "At Metis Foundation, we are scientists serving scientists—advancing military medicine through mission-focused innovation, strategic collaboration, and sustainable funding to deliver real-world solutions from bench to battlefield.",
        contactName: "Anders Carlsson, PhD",
        contactTitle: "COO, The Metis Foundation",
        contactImage: "https://ampd-asset.s3.us-east-2.amazonaws.com/metis-profile.jpeg",
        src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/High+resolution%2C+no+background+logo.png",
        alt: "The Metis Foundation Logo",
        website: "https://metisfoundationusa.org/",
        tier: "partner",
        order: 2,
        featured: true,
    },
    {
        name: "TRC4",
        description: "We're grateful to the AIM Summit for providing a powerful platform to connect with academic, industry, and military leaders",
        contactName: "Christina Spencer",
        contactTitle: "Director, Research Operations, TRC4",
        contactImage: "https://ampd-asset.s3.us-east-2.amazonaws.com/spenser-trc4.jpeg",
        src: "https://ampd-asset.s3.us-east-2.amazonaws.com/TRC4+UT+System+Logo.png",
        alt: "TRC4 Logo",
        website: "https://trc4.org/",
        tier: "partner",
        order: 3,
        featured: true,
    },
    {
        name: "StemBioSys",
        description: "StemBioSys develops primary cell-derived extracellular matrices that bring in vitro research closer to human biology. By enhancing the relevance and reliability of preclinical data, we support AIM's mission to accelerate transformative healthcare innovations for military and civilian populations.",
        contactName: "Bob Hutchens",
        contactTitle: "CEO, StemBioSys",
        contactImage: "https://ampd-asset.s3.us-east-2.amazonaws.com/bob-stembios.jpeg",
        src: "https://ampd-asset.s3.us-east-2.amazonaws.com/stembiosys.png",
        alt: "StemBioSys Logo",
        website: "https://www.stembiosys.com/",
        tier: "partner",
        order: 4,
        featured: true,
    },
    {
        name: "Molecular You",
        description: "At Molecular You, we believe in honouring those who serve by helping them stay mission-ready and healthy—long after the mission ends. Our pre-diagnostic health assessment offers early detection of chronic disease risks through a single blood test, empowering active military personnel to extend their service and supporting veterans with personalized health insights to thrive in civilian life.",
        contactName: "Rob Fraser",
        contactTitle: "CSO & Co-Founder, Molecular You",
        contactImage: "https://ampd-asset.s3.us-east-2.amazonaws.com/Rob+Fraser+1.1+(3).png",
        src: "https://ampd-asset.s3.us-east-2.amazonaws.com/MYHi+logo+file+copy+sideways-01+(2).png",
        alt: "Molecular You Logo",
        website: "https://www.molecularyou.com/",
        tier: "partner",
        order: 5,
        featured: true,
    },
    {
        name: "The Defense Health Agency",
        description: "Forums like AIM give us the opportunity to collaborate with organizations outside of DoD so they have a better idea how to engage with the military's medical mission and advance healthcare innovation",
        contactName: "Dr. Sean Biggerstaff",
        contactTitle: "Acting Deputy Assistant Director, Research and Engineering, Defense Health Agency",
        contactImage: "https://ampd-asset.s3.us-east-2.amazonaws.com/biggerstaff.jpeg",
        src: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/dha_logo.png",
        alt: "Defense Health Agency Logo",
        website: "https://dha.mil/",
        tier: "government",
        order: 6,
        featured: true,
    },
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
        
        for (const sponsor of testimonialSponsors) {
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
