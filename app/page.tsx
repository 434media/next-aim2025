import { PartnerMarquee } from "../components/ui/PartnerMarquee"
import { additionalPartners, mainPartners } from "../data/partners"
import { HeroVideo } from "../components/ui/HeroVideo"
import { HeroTextSection } from "../components/ui/HeroTextSection"

export default function Home() {
  return (
    <main className="relative mx-auto flex flex-col scroll-smooth" id="main-content">
      {/* Full Screen Hero Video Section */}
      <section aria-labelledby="hero-video-heading" className="w-full">
        <h1 id="hero-video-heading" className="sr-only">
          AIM Summit - Hero Video
        </h1>
        <HeroVideo />
      </section>

      {/* Hero Text Section - Centered */}
      <section aria-labelledby="hero-text-heading" className="w-full">
        <h2 id="hero-text-heading" className="sr-only">
          AIM Summit - Advancing Innovation in Military Medicine
        </h2>
        <HeroTextSection />
      </section>

      {/* Partners Section */}
      <section aria-labelledby="partners-heading" className="w-full bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 xl:px-0">
          <h2 id="partners-heading" className="sr-only">
            Our Partners
          </h2>

          <div className="space-y-8">
            <PartnerMarquee partners={mainPartners} ariaLabel="Main partners and sponsors" showHeader={true} />
            <PartnerMarquee
              partners={additionalPartners}
              reverse
              speed={50}
              ariaLabel="Additional partners and sponsors"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
