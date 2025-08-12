import type { Metadata } from "next"
import { Suspense } from "react"
import SurfHero2025 from "./SurfHero2025"
import SurfPresentersSection from "./SurfPresentersSection"

export const metadata: Metadata = {
  title: "Posters | AIM Health R&D Summit",
  description: "San Antonio Military Health and Universities Research Forum (SURF) - 2025 Poster Presenters",
}

export default function SurfPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <Suspense fallback={<div className="h-[60vh] bg-gray-100 animate-pulse"></div>}>
          <SurfHero2025 />
        </Suspense>

        {/* Presenters Section */}
        <Suspense fallback={<div className="h-[40vh] bg-gray-50 animate-pulse"></div>}>
          <SurfPresentersSection />
        </Suspense>
      </main>
    </>
  )
}
