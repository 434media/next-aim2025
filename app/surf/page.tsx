import type { Metadata } from "next"
import { Suspense } from "react"
import SurfHero2025 from "./SurfHero2025"
import SurfPresentersSection from "./SurfPresentersSection"
import PdfArchive from "./PdfArchive"

export const metadata: Metadata = {
  title: "SURF | AIM Health R&D Summit",
  description: "San Antonio Military Health and Universities Research Forum (SURF) - 2025 Presenters and Archive",
}

export default function SurfPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 2025 SURF Hero Section */}
      <Suspense fallback={<div className="h-[60vh] bg-gray-100 animate-pulse"></div>}>
        <SurfHero2025 />
      </Suspense>

      {/* 2025 SURF Presenters Section */}
      <Suspense fallback={<div className="h-[40vh] bg-gray-50 animate-pulse"></div>}>
        <SurfPresentersSection />
      </Suspense>

      {/* Archive Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">SURF Archive</h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore past SURF events and research presentations from previous years.
            </p>
          </div>

          <PdfArchive />
        </div>
      </section>
    </main>
  )
}
