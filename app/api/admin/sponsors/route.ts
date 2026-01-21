import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

// Get all sponsors
export async function GET() {
  try {
    const adminDb = getAdminDb()
    const sponsorsRef = adminDb.collection("sponsors")
    const snapshot = await sponsorsRef.orderBy("order", "asc").get()

    const sponsors = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      success: true,
      sponsors,
      count: sponsors.length,
    })
  } catch (error) {
    console.error("[Admin API] Error fetching sponsors:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch sponsors",
        sponsors: [],
      },
      { status: 500 }
    )
  }
}

// Create a new sponsor
export async function POST(request: Request) {
  try {
    const sponsorData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "src", "website"]
    for (const field of requiredFields) {
      if (!sponsorData[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    const adminDb = getAdminDb()
    
    // Get current max order
    const snapshot = await adminDb
      .collection("sponsors")
      .orderBy("order", "desc")
      .limit(1)
      .get()
    const maxOrder = snapshot.empty ? 0 : (snapshot.docs[0].data().order || 0)

    const newSponsor = {
      ...sponsorData,
      order: maxOrder + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const docRef = await adminDb.collection("sponsors").add(newSponsor)

    return NextResponse.json({
      success: true,
      sponsor: { id: docRef.id, ...newSponsor },
      message: "Sponsor created successfully",
    })
  } catch (error) {
    console.error("[Admin API] Error creating sponsor:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create sponsor",
      },
      { status: 500 }
    )
  }
}

// Update a sponsor
export async function PATCH(request: Request) {
  try {
    const { id, ...sponsorData } = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Sponsor ID is required" },
        { status: 400 }
      )
    }

    const adminDb = getAdminDb()
    await adminDb.collection("sponsors").doc(id).update({
      ...sponsorData,
      updated_at: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Sponsor updated successfully",
    })
  } catch (error) {
    console.error("[Admin API] Error updating sponsor:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update sponsor",
      },
      { status: 500 }
    )
  }
}

// Delete a sponsor
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Sponsor ID is required" },
        { status: 400 }
      )
    }

    const adminDb = getAdminDb()
    await adminDb.collection("sponsors").doc(id).delete()

    return NextResponse.json({
      success: true,
      message: "Sponsor deleted successfully",
    })
  } catch (error) {
    console.error("[Admin API] Error deleting sponsor:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete sponsor",
      },
      { status: 500 }
    )
  }
}
