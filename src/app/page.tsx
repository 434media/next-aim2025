import { PartnerMarquee } from "@/components/ui/PartnerMarquee"
import { MilitaryHealthCity } from "@/components/ui/MilitaryHealthCity"
import { mainPartners, additionalPartners } from "@/data/partners"
import CatchupBanner from "@/components/ui/CatchupBanner"
import { HeroVideo } from "@/components/ui/HeroVideo"
import { SponsorShowcase } from "@/components/ui/SponsorShowcase"
import Testimonial from "@/components/ui/Testimonial"
import { SummitMission } from "@/components/ui/SummitMission"

export default function Home() {
  return (
    <main className="relative mx-auto flex flex-col scroll-smooth" id="main-content">
      {/* Hero Section */}
      <section aria-labelledby="hero-heading" className="w-full">
        <h1 id="hero-heading" className="sr-only">
          AIM Health R&D Summit
        </h1>
        <HeroVideo />
      </section>

      {/* Partners Section */}
      <section aria-labelledby="partners-heading" className="w-full bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 xl:px-0">
          <h2 id="partners-heading" className="sr-only">
            Our Partners
          </h2>
          <div className="space-y-6">
            <PartnerMarquee partners={mainPartners} ariaLabel="Main partners and sponsors" />
            <PartnerMarquee
              partners={additionalPartners}
              reverse
              speed={50}
              ariaLabel="Additional partners and sponsors"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section aria-labelledby="mission-heading" className="w-full">
        <h2 id="mission-heading" className="sr-only">
          Summit Mission
        </h2>
        <SummitMission />
      </section>

      {/* Testimonial Section */}
      <section aria-labelledby="testimonial-heading" className="w-full px-4 xl:px-0">
        <h2 id="testimonial-heading" className="sr-only">
          Testimonials
        </h2>
        <Testimonial />
      </section>


      {/* Military Health City Section */}
      <section aria-labelledby="military-health-heading" className="w-full mt-16 sm:mt-20">
        <h2 id="military-health-heading" className="sr-only">
          Military Health City
        </h2>
        <MilitaryHealthCity />
      </section>

      {/* Catchup Banner Section */}
      <section aria-labelledby="catchup-heading" className="w-full mt-16 sm:mt-20 px-4 xl:px-0">
        <h2 id="catchup-heading" className="sr-only">
          Catch Up on Previous Events
        </h2>
        <CatchupBanner />
      </section>

      {/* Sponsor Showcase Section */}
      <section aria-labelledby="sponsors-heading" className="w-full mt-16 sm:mt-20">
        <h2 id="sponsors-heading" className="sr-only">
          Our Sponsors
        </h2>
        <SponsorShowcase />
      </section>
    </main>
  )
}

