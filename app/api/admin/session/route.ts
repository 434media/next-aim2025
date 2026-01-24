import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getAdminAuth } from "../../../../lib/firebase-admin"

// POST - Create a session cookie from Firebase ID token
export async function POST(request: Request) {
    try {
        const { idToken } = await request.json()

        if (!idToken) {
            return NextResponse.json(
                { success: false, error: "ID token required" },
                { status: 400 }
            )
        }

        const auth = getAdminAuth()

        // Verify the ID token
        const decodedToken = await auth.verifyIdToken(idToken)

        // Verify 434media.com domain
        if (!decodedToken.email?.endsWith("@434media.com")) {
            return NextResponse.json(
                { success: false, error: "Access restricted to 434media.com accounts" },
                { status: 403 }
            )
        }

        // Create session cookie (5 days)
        const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days in milliseconds
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })

        // Set the session cookie
        const cookieStore = await cookies()
        cookieStore.set("__session", sessionCookie, {
            maxAge: expiresIn / 1000, // Convert to seconds
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[Session API] Error creating session:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to create session" },
            { status: 500 }
        )
    }
}

// DELETE - Clear session cookie (logout)
export async function DELETE() {
    try {
        const cookieStore = await cookies()
        cookieStore.delete("__session")

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[Session API] Error clearing session:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to clear session" },
            { status: 500 }
        )
    }
}
