import { PartnerMarquee } from "../components/ui/PartnerMarquee"
import { additionalPartners, mainPartners } from "../data/partners"
import { ThankYou } from "../components/ThankYou"
import { SummitMission } from "../components//ui/SummitMission"
import { HeroVideo } from "../components/ui/HeroVideo"
import Testimonial from "../components/ui/Testimonial"

export default function Home() {
  return (
    <main className="relative mx-auto flex flex-col scroll-smooth" id="main-content">
      {/* Hero Video Section */}
      <section aria-labelledby="hero-heading" className="w-full">
        <h1 id="hero-heading" className="sr-only">
          AIM Summit - Advancing Innovation in Military Medicine
        </h1>
        <HeroVideo />
      </section>

      {/* Mission Section */}
      <section aria-labelledby="mission-heading" className="w-full">
        <h2 id="mission-heading" className="sr-only">
          Summit Mission
        </h2>
        <SummitMission />
      </section>

      {/* Testimonial Section */}
      <section aria-labelledby="testimonial-heading" className="w-full">
        <h2 id="testimonial-heading" className="sr-only">
          Testimonials
        </h2>
        <Testimonial />
      </section>

      {/* Partners Section */}
      <section aria-labelledby="partners-heading" className="w-full bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 xl:px-0">
          <h2 id="partners-heading" className="sr-only">
            Our Partners
          </h2>

          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
              Powered by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600">
                Innovation
              </span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our success is built on the foundation of strategic partnerships with industry leaders, research
              institutions, and government organizations committed to advancing military medicine.
            </p>
          </div>

          <div className="space-y-8">
            <PartnerMarquee partners={mainPartners} ariaLabel="Main partners and sponsors" />
            <PartnerMarquee
              partners={additionalPartners}
              reverse
              speed={50}
              ariaLabel="Additional partners and sponsors"
            />
          </div>

          {/* Partnership CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-50 to-emerald-50 border-2 border-cyan-200/50 rounded-full">
              <span className="text-gray-700 font-semibold">
                Interested in partnering with us?{" "}
                <a
                  href="/contact-us"
                  className="text-cyan-600 hover:text-cyan-700 underline underline-offset-2 transition-colors duration-200"
                >
                  Get in touch
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section with Event Recap */}
      <section aria-labelledby="thank-you-heading" className="w-full">
        <h2 id="thank-you-heading" className="sr-only">
          Thank You and Event Recap
        </h2>
        <ThankYou />
      </section>
    </main>
  )
}
