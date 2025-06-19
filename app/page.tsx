import CatchupBanner from "../components/ui/CatchupBanner"
import { PartnerMarquee } from "../components/ui/PartnerMarquee"
import { additionalPartners, mainPartners } from "../data/partners"
// import { HeroVideo } from "@/components/ui/HeroVideo"
import { ThankYou } from "../components/ThankYou"
import { SponsorShowcase } from "../components/ui/SponsorShowcase"
import { SummitMission } from "../components/ui/SummitMission"
import Testimonial from "../components/ui/Testimonial"

export default function Home() {
  return (
    <main className="relative mx-auto flex flex-col scroll-smooth" id="main-content">
      {/* Thank You Section - Now at top */}
      <section aria-labelledby="thank-you-heading" className="w-full">
        <h2 id="thank-you-heading" className="sr-only">
          Thank You Message
        </h2>
        <ThankYou />
      </section>

      {/* Hero Section */}
      {/*  <section aria-labelledby="hero-heading" className="w-full">
        <h1 id="hero-heading" className="sr-only">
          AIM Health R&D Summit
        </h1>
        <HeroVideo />
      </section> */}

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
