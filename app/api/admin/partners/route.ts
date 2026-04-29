import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

// Get all partners
export async function GET() {
    try {
        const adminDb = getAdminDb()
        const snapshot = await adminDb
            .collection("partners")
            .orderBy("order", "asc")
            .get()

        const partners = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))

        return NextResponse.json({ success: true, partners, count: partners.length })
    } catch (error) {
        console.error("[Admin API] Error fetching partners:", error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to fetch partners",
                partners: [],
            },
            { status: 500 }
        )
    }
}

// Create a new partner
export async function POST(request: Request) {
    try {
        const partnerData = await request.json()

        const requiredFields = ["name", "src", "href"]
        for (const field of requiredFields) {
            if (!partnerData[field]) {
                return NextResponse.json(
                    { success: false, error: `${field} is required` },
                    { status: 400 }
                )
            }
        }

        const adminDb = getAdminDb()
        const snapshot = await adminDb
            .collection("partners")
            .orderBy("order", "desc")
            .limit(1)
            .get()
        const maxOrder = snapshot.empty ? 0 : (snapshot.docs[0].data().order || 0)

        const newPartner = {
            ...partnerData,
            order: maxOrder + 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }

        const docRef = await adminDb.collection("partners").add(newPartner)

        return NextResponse.json({
            success: true,
            partner: { id: docRef.id, ...newPartner },
            message: "Partner created successfully",
        })
    } catch (error) {
        console.error("[Admin API] Error creating partner:", error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to create partner",
            },
            { status: 500 }
        )
    }
}

// Update a partner
export async function PATCH(request: Request) {
    try {
        const { id, ...partnerData } = await request.json()

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Partner ID is required" },
                { status: 400 }
            )
        }

        const adminDb = getAdminDb()
        await adminDb.collection("partners").doc(id).update({
            ...partnerData,
            updated_at: new Date().toISOString(),
        })

        return NextResponse.json({ success: true, message: "Partner updated successfully" })
    } catch (error) {
        console.error("[Admin API] Error updating partner:", error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to update partner",
            },
            { status: 500 }
        )
    }
}

// Delete a partner
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json()

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Partner ID is required" },
                { status: 400 }
            )
        }

        const adminDb = getAdminDb()
        await adminDb.collection("partners").doc(id).delete()

        return NextResponse.json({ success: true, message: "Partner deleted successfully" })
    } catch (error) {
        console.error("[Admin API] Error deleting partner:", error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to delete partner",
            },
            { status: 500 }
        )
    }
}
