import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

interface Comment {
  id: string
  text: string
  author: string
  authorEmail: string
  created_at: string
}

export async function GET() {
  try {
    const adminDb = getAdminDb()
    const contactsRef = adminDb.collection("contact_submissions")
    const snapshot = await contactsRef
      .orderBy("created_at", "desc")
      .limit(500)
      .get()

    const contacts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      success: true,
      contacts,
      count: contacts.length,
    })
  } catch (error) {
    console.error("[Admin API] Error fetching contacts:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch contacts",
        contacts: [],
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status, comment, authorName, authorEmail } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Contact ID is required" },
        { status: 400 }
      )
    }

    const adminDb = getAdminDb()
    const docRef = adminDb.collection("contact_submissions").doc(id)
    
    // If adding a comment
    if (comment) {
      const doc = await docRef.get()
      if (!doc.exists) {
        return NextResponse.json(
          { success: false, error: "Contact not found" },
          { status: 404 }
        )
      }
      
      const existingData = doc.data()
      const existingComments: Comment[] = existingData?.comments || []
      
      const newComment: Comment = {
        id: `comment_${Date.now()}`,
        text: comment,
        author: authorName || "Admin",
        authorEmail: authorEmail || "admin@aimsummit.org",
        created_at: new Date().toISOString(),
      }
      
      await docRef.update({
        comments: [...existingComments, newComment],
        updated_at: new Date().toISOString(),
      })
      
      return NextResponse.json({
        success: true,
        message: "Comment added successfully",
        comment: newComment,
      })
    }
    
    // If updating status
    if (status) {
      await docRef.update({
        status,
        updated_at: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message: "Contact updated successfully",
      })
    }

    return NextResponse.json(
      { success: false, error: "No update data provided" },
      { status: 400 }
    )
  } catch (error) {
    console.error("[Admin API] Error updating contact:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update contact",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Contact ID is required" },
        { status: 400 }
      )
    }

    const adminDb = getAdminDb()
    await adminDb.collection("contact_submissions").doc(id).delete()

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    })
  } catch (error) {
    console.error("[Admin API] Error deleting contact:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete contact",
      },
      { status: 500 }
    )
  }
}
