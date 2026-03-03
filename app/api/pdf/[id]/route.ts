import { type NextRequest, NextResponse } from "next/server"

// PDF mapping - in production, this could come from a database
const pdfMappings: Record<string, string> = {
  "surf-2023": "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/SURF-Program_2023_Final_6.1.23_v1.pdf",
  "surf-2021": "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/SURF-2021_Program.pdf",
  "surf-2025-presenters":
    "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/List%20of%20AIM_SURF%20Poster%20Presentations.pdf",
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const pdfUrl = pdfMappings[id]

    if (!pdfUrl) {
      return new NextResponse("PDF not found", { status: 404 })
    }

    // Fetch the PDF from S3
    const response = await fetch(pdfUrl)

    if (!response.ok) {
      return new NextResponse("PDF not available", { status: 404 })
    }

    // Get the PDF data
    const pdfBuffer = await response.arrayBuffer()

    // Return the PDF with appropriate headers
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${id}.pdf"`,
        "Cache-Control": "public, max-age=31536000", // Cache for 1 year
      },
    })
  } catch (error) {
    console.error("Error serving PDF:", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
