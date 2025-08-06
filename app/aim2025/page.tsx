import { SummitMissionPast } from "../../components/SummitMissionPast"
import { AIM2025Speakers } from "../../components/AIM2025Speakers"
import Testimonial from "../../components/Testimonial"
import { EventRecapCarousel } from "../../components/EventRecapCarousel"

export default function AIM2025Page() {
  return (
    <main className="min-h-screen">
      {/* Summit Mission (Past Tense) */}
      <section className="">
        <SummitMissionPast />
      </section>

      {/* Speakers Section */}
      <section className="">
        <AIM2025Speakers />
      </section>

      {/* Testimonials */}
      <section className="">
        <Testimonial />
      </section>

      {/* Event Recap Carousel - Full Viewport */}
      <EventRecapCarousel />
    </main>
  )
}
