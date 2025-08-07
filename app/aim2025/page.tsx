import { SummitMissionPast } from "../../components/SummitMissionPast"
import Testimonial from "../../components/Testimonial"
import { EventRecapCarousel } from "../../components/EventRecapCarousel"

export default function AIM2025Page() {
  return (
    <main className="min-h-screen">
      {/* Summit Mission (Past Tense) */}
      <section className="">
        <SummitMissionPast />
      </section>

      <section className="py-16">
        <EventRecapCarousel />
      </section>

      {/* Testimonials */}
      <section className="">
        <Testimonial />
      </section>
    </main>
  )
}
