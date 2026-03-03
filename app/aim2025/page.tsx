import type { Metadata } from "next"
import { EventRecapCarousel } from "../../components/EventRecapCarousel"
import { SummitMissionPast } from "../../components/SummitMissionPast"
import Testimonial from "../../components/Testimonial"

export const metadata: Metadata = {
  title: "AIM 2025 Recap",
  description:
    "Relive the AIM 2025 Health R&D Summit — keynote highlights, event recap, testimonials, and breakthroughs from cross-sector collaboration in San Antonio.",
  openGraph: {
    title: "AIM 2025 Summit Recap | AIM Health R&D Summit",
    description:
      "Highlights, keynotes, and breakthroughs from the 2025 Health R&D Summit in San Antonio.",
    url: "/aim2025",
    type: "website",
  },
  alternates: {
    canonical: "/aim2025",
  },
}

export default function AIM2025Page() {
  return (
    <main className="min-h-screen">
      {/* Summit Mission (Past Tense) */}
      <section className="">
        <SummitMissionPast />
      </section>

      <section className="">
        <EventRecapCarousel />
      </section>

      {/* Testimonials */}
      <section className="">
        <Testimonial />
      </section>
    </main>
  )
}
