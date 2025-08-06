import { PartnerMarquee } from "../components/ui/PartnerMarquee"
import { additionalPartners, mainPartners } from "../data/partners"
import { HeroVideo } from "../components/ui/HeroVideo"
import { ExperienceInnovationCTA } from "../components/ExperienceInnovationCTA"

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
        </div>
      </section>

      {/* Experience Innovation CTA Section */}
      <section aria-labelledby="cta-heading" className="w-full">
        <h2 id="cta-heading" className="sr-only">
          Experience Innovation Call to Action
        </h2>
        <ExperienceInnovationCTA />
      </section>
    </main>
  )
}
