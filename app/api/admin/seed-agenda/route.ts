import { FieldValue } from "firebase-admin/firestore"
import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

// POST - Seed agenda data (keynotes + full day-of schedule from official PDF) into Firestore
export async function POST() {
    try {
        const db = getAdminDb()
        const batch = db.batch()

        // ── Keynote speakers ──────────────────────────────────────
        const keynotes = [
            {
                name: "Dr. David Hilmers",
                title: "NASA Astronaut, Marine Corps Colonel (Ret.), and Professor at Baylor College of Medicine",
                organization: "Baylor College of Medicine",
                bio: "NASA Astronaut, Marine Corps Colonel (Ret.), and Professor at Baylor College of Medicine, Dr. David Hilmers\u2019 career has been defined by exploration, service, and leadership at the highest levels.\n\nA veteran of four space shuttle missions, Dr. Hilmers now serves as a consultant on NASA-sponsored research advancing how astronauts deliver medical care during deep space exploration.\n\nBoard-certified in both internal medicine and pediatrics, he also brings more than two decades of clinical experience and global health leadership, serving as Chief Medical Officer for Hepatitis B Free, a nonprofit organization dedicated to the prevention and treatment of hepatitis in low and middle-income countries.",
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/aimsatx%2Fdavidhilmers.jpg?alt=media",
                linkedIn: "",
                order: 1,
                featured: true,
                keynoteType: "lunch",
                keynoteLabel: "Lunch Keynote",
                sessionTitle: "Lessons from Space, Leadership for Earth",
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp(),
            },
            {
                name: "Dr. Paul Biddinger",
                title: "Chief Preparedness and Continuity Officer, Mass General Brigham",
                organization: "Mass General Brigham",
                bio: "Dr. Paul Biddinger is the Chief Preparedness and Continuity Officer at Mass General Brigham, where he serves at the critical intersection of medicine, preparedness, and resilience.\n\nWith appointments at Harvard Medical School and the Harvard T.H. Chan School of Public Health, Dr. Biddinger is shaping how disaster medicine and emergency systems are researched, taught, and operationalized globally.\n\nFrom Hurricane Katrina and Superstorm Sandy to the Boston Marathon bombings and Nepal earthquakes, he doesn\u2019t just study disasters\u2014he\u2019s responded to them, led teams through them, and helped redesign systems to withstand them.",
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/aimsatx%2Fpaulbiddinger.png?alt=media",
                linkedIn: "",
                order: 2,
                featured: true,
                keynoteType: "morning",
                keynoteLabel: "Morning Keynote",
                sessionTitle: "Medicine, Preparedness, and Resilience",
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp(),
            },
        ]

        for (const speaker of keynotes) {
            const ref = db.collection("speakers").doc()
            batch.set(ref, speaker)
        }

        // ── Full day-of schedule from official PDF ────────────────
        const scheduleItems = [
            { title: "Registration & Morning Networking", description: "", date: "2026-05-19", startTime: "07:30", endTime: "08:15", location: "2nd Floor", speakerIds: [], speakerNames: [], track: "", trackNumber: 0, type: "networking", order: 1, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Exhibit Hall Hours", description: "", date: "2026-05-19", startTime: "07:30", endTime: "16:30", location: "Room 304 (3rd Floor)", speakerIds: [], speakerNames: [], track: "", trackNumber: 0, type: "other", order: 2, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Exhibit Hall Opens", description: "", date: "2026-05-19", startTime: "08:00", endTime: "16:30", location: "Room 304 (3rd Floor)", speakerIds: [], speakerNames: [], track: "", trackNumber: 0, type: "other", order: 3, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Opening Ceremony: Presentation of Colors & National Anthem, Welcome Remarks", description: "", date: "2026-05-19", startTime: "08:30", endTime: "09:00", location: "Plenary Room - 221 (2nd Floor)", speakerIds: [], speakerNames: ["Rene Dominguez", "Taylor Eighmy", "The Honorable Gina Ortiz Jones"], track: "", trackNumber: 0, type: "other", order: 4, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Keynote Speaker: Dr. Paul Biddinger", description: "", date: "2026-05-19", startTime: "09:00", endTime: "09:45", location: "Plenary Room - 221 (2nd Floor)", speakerIds: [], speakerNames: ["Paul Biddinger"], track: "", trackNumber: 0, type: "keynote", order: 5, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Science Research Session - Emergency Medicine", description: "", date: "2026-05-19", startTime: "09:45", endTime: "10:45", location: "Room 301 A", speakerIds: [], speakerNames: [], track: "Science Research", trackNumber: 0, type: "breakout", order: 6, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Science Research Session - Regenerative Medicine & Biomaterials", description: "", date: "2026-05-19", startTime: "09:45", endTime: "10:45", location: "Room 301 B", speakerIds: [], speakerNames: [], track: "Science Research", trackNumber: 0, type: "breakout", order: 7, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Science Research Session - Infectious Disease Prevention & Management", description: "", date: "2026-05-19", startTime: "09:45", endTime: "10:45", location: "Room 301 C", speakerIds: [], speakerNames: [], track: "Science Research", trackNumber: 0, type: "breakout", order: 8, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Science Research Session - Nursing Research Clinical Training & Innovation", description: "", date: "2026-05-19", startTime: "09:45", endTime: "10:45", location: "Room 302 A", speakerIds: [], speakerNames: [], track: "Science Research", trackNumber: 0, type: "breakout", order: 9, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Architecting Congressional Support: Navigating the Authorization and Appropriations Maze", description: "", date: "2026-05-19", startTime: "09:45", endTime: "10:30", location: "Room 302 B", speakerIds: [], speakerNames: [], track: "Innovation Capital & Funding Support", trackNumber: 6, type: "panel", order: 10, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Care Without Proximity: Extending the Lifeline in Austere Environments", description: "", date: "2026-05-19", startTime: "09:45", endTime: "10:30", location: "Room 303 B", speakerIds: [], speakerNames: ["Gary Legault"], track: "Enabling Long-Duration Mission Healthcare and Crew Survival", trackNumber: 2, type: "breakout", order: 11, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Face the Fight: Preventing Veteran Suicide During the Critical Transition to Civilian Life", description: "", date: "2026-05-19", startTime: "10:45", endTime: "11:30", location: "Room 302 C", speakerIds: [], speakerNames: [], track: "Integrated Strategies for Peak Performance and Health", trackNumber: 3, type: "breakout", order: 12, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Out of the Lab: Regional Proving Grounds for Resource-Constrained Care", description: "", date: "2026-05-19", startTime: "10:45", endTime: "11:30", location: "Room 303 A", speakerIds: [], speakerNames: ["Sean Biggerstaff"], track: "Innovative Technologies in Low-Resource Settings", trackNumber: 5, type: "breakout", order: 13, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Transformative Grafts and Next-Generation Maxillofacial Reconstruction", description: "", date: "2026-05-19", startTime: "10:45", endTime: "11:30", location: "Room 303 B", speakerIds: [], speakerNames: [], track: "Translational Approaches in Regenerative Sciences and Modeling", trackNumber: 1, type: "breakout", order: 14, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Science Research Session - TRC4-Trauma & Combat Casualty Care", description: "", date: "2026-05-19", startTime: "11:00", endTime: "12:00", location: "Room 301 A", speakerIds: [], speakerNames: [], track: "Science Research", trackNumber: 0, type: "breakout", order: 15, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Science Research Session - Human Performance, Readiness & Recovery", description: "", date: "2026-05-19", startTime: "11:00", endTime: "12:00", location: "Room 301 B", speakerIds: [], speakerNames: [], track: "Science Research", trackNumber: 0, type: "breakout", order: 16, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Science Research Session - Traumatic Brain Injury", description: "", date: "2026-05-19", startTime: "11:00", endTime: "12:00", location: "Room 301 C", speakerIds: [], speakerNames: [], track: "Science Research", trackNumber: 0, type: "breakout", order: 17, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Science Research Session - Abstract Rapid Fire Talks", description: "", date: "2026-05-19", startTime: "11:00", endTime: "12:00", location: "Room 302 A", speakerIds: [], speakerNames: [], track: "Science Research", trackNumber: 0, type: "breakout", order: 18, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Networking Lunch Break: Fuel Up & Mingle!", description: "", date: "2026-05-19", startTime: "11:30", endTime: "12:15", location: "Plenary Room - 221 (2nd Floor)", speakerIds: [], speakerNames: [], track: "", trackNumber: 0, type: "break", order: 19, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Keynote Speaker: Dr. David C. Hilmers", description: "", date: "2026-05-19", startTime: "12:15", endTime: "13:15", location: "Plenary Room - 221 (2nd Floor)", speakerIds: [], speakerNames: ["David Hilmers"], track: "", trackNumber: 0, type: "keynote", order: 20, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Subject Matter Expert (SME) Sessions", description: "", date: "2026-05-19", startTime: "13:30", endTime: "16:30", location: "", speakerIds: [], speakerNames: [], track: "", trackNumber: 0, type: "other", order: 21, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Science Research Session - TRC4 Trauma & Combat Casualty Care", description: "", date: "2026-05-19", startTime: "13:30", endTime: "14:30", location: "Room 301 A", speakerIds: [], speakerNames: [], track: "Science Research", trackNumber: 0, type: "breakout", order: 22, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Science Research Session - Traumatic Brain Injury & Mental Health", description: "", date: "2026-05-19", startTime: "13:30", endTime: "14:30", location: "Room 301 B", speakerIds: [], speakerNames: [], track: "Science Research", trackNumber: 0, type: "breakout", order: 23, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Science Research Session - Veteran & Military Health Innovations", description: "", date: "2026-05-19", startTime: "13:30", endTime: "14:30", location: "Room 301 C", speakerIds: [], speakerNames: [], track: "Science Research", trackNumber: 0, type: "breakout", order: 24, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Science Research Session - Abstract Rapid Fire Talks", description: "", date: "2026-05-19", startTime: "13:30", endTime: "14:30", location: "Room 302 A", speakerIds: [], speakerNames: [], track: "Science Research", trackNumber: 0, type: "breakout", order: 25, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "From Beer to Blood", description: "", date: "2026-05-19", startTime: "13:30", endTime: "14:15", location: "Room 302 B", speakerIds: [], speakerNames: ["Kim Reeves"], track: "Translational Approaches in Regenerative Sciences and Modeling", trackNumber: 1, type: "breakout", order: 26, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "The Ultimate Constraint: Medicine in the Void", description: "", date: "2026-05-19", startTime: "14:30", endTime: "15:15", location: "Room 303 A", speakerIds: [], speakerNames: [], track: "Enabling Long-Duration Mission Healthcare and Crew Survival", trackNumber: 2, type: "breakout", order: 27, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "The Invisible Front: Objective Signals in Cognitive Chaos", description: "", date: "2026-05-19", startTime: "14:30", endTime: "15:15", location: "Room 302 C", speakerIds: [], speakerNames: [], track: "Integrated Strategies for Peak Performance and Health", trackNumber: 3, type: "breakout", order: 28, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Poster Sessions", description: "", date: "2026-05-19", startTime: "15:00", endTime: "18:00", location: "Foyer of 3rd Floor", speakerIds: [], speakerNames: [], track: "", trackNumber: 0, type: "other", order: 29, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Pitch Scrimmage", description: "", date: "2026-05-19", startTime: "15:30", endTime: "16:45", location: "Room 303 A", speakerIds: [], speakerNames: [], track: "Innovation Capital & Funding Support", trackNumber: 6, type: "panel", order: 30, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
            { title: "Mix, Mingle & Unwind", description: "", date: "2026-05-19", startTime: "16:30", endTime: "18:00", location: "", speakerIds: [], speakerNames: [], track: "", trackNumber: 0, type: "networking", order: 31, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
        ]

        for (const item of scheduleItems) {
            const ref = db.collection("schedule").doc()
            batch.set(ref, item)
        }

        await batch.commit()

        return NextResponse.json({
            success: true,
            message: `Seeded ${keynotes.length} keynote speakers and ${scheduleItems.length} schedule items`,
            speakersAdded: keynotes.length,
            scheduleItemsAdded: scheduleItems.length,
        })
    } catch (error) {
        console.error("[Admin API] Error seeding agenda data:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to seed agenda data" },
            { status: 500 }
        )
    }
}
