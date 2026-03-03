import type { Metadata } from "next"
import { Suspense } from "react"
import SurfHero2025 from "./SurfHero2025"
import SurfPresentersSection from "./SurfPresentersSection"

export const metadata: Metadata = {
  title: "SURF Poster Presentations",
  description:
    "San Antonio Military Health & Universities Research Forum (SURF) — browse poster presenters, research abstracts, and scientific innovations at the AIM Health R&D Summit.",
  openGraph: {
    title: "SURF Poster Presentations | AIM Health R&D Summit",
    description:
      "Browse SURF poster presenters and research abstracts from the AIM Health R&D Summit.",
    url: "/posters",
    type: "website",
  },
  alternates: {
    canonical: "/posters",
  },
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
