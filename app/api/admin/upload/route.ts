import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File | null

        if (!file) {
            return NextResponse.json(
                { success: false, error: "No file provided" },
                { status: 400 }
            )
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"]
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, error: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG" },
                { status: 400 }
            )
        }

        // Validate file size (max 4.5MB for Vercel Blob free tier)
        const maxSize = 4.5 * 1024 * 1024
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, error: "File too large. Maximum size is 4.5MB" },
                { status: 400 }
            )
        }

        // Generate a unique filename
        const timestamp = Date.now()
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
        const filename = `aim-admin/${timestamp}-${sanitizedName}`

        // Upload to Vercel Blob
        const blob = await put(filename, file, {
            access: "public",
        })

        return NextResponse.json({
            success: true,
            url: blob.url,
        })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json(
            { success: false, error: "Failed to upload file" },
            { status: 500 }
        )
    }
}

export const runtime = "edge"
