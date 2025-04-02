import type { Metadata } from "next"
import { RiArrowDownLine } from "@remixicon/react"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import WhovaSpeakersEmbed from "@/components/WhovaSpeakersEmbed"
import { Suspense } from "react"
import ParticleBackground from "@/components/ParticleBackground"

export const metadata: Metadata = {
  title: "Speakers | AIM Health R&D Summit",
  description: "Meet the thought leaders, innovators, and experts who will be speaking at the AIM Health R&D Summit.",
  openGraph: {
    title: "Speakers | AIM Health R&D Summit",
    description: "Meet the thought leaders, innovators, and experts who will be speaking at the AIM Health R&D Summit.",
    url: "/speakers",
    type: "website",
    siteName: "AIM Health R&D Summit",
    locale: "en_US",
  },
}

export default function SpeakersPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section with Particle Background - Full Viewport Height */}
      <ParticleBackground className="w-full min-h-screen flex items-center justify-center relative">
        <FadeContainer className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              The Future of Military Medicine Starts Here
            </h1>

            <FadeDiv className="mx-auto mb-8 sm:mb-10 max-w-2xl text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
              <p>
                Uniting innovators from academia, industry, and military to accelerate transformative medical
                technologies. Our speakers lead the charge in addressing critical challenges across both military and
                civilian healthcare.
              </p>
            </FadeDiv>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            aria-label="Scroll down to view speakers"
          >
            <RiArrowDownLine className="h-6 w-6 sm:h-8 sm:w-8 text-white/70 animate-bounce" aria-hidden="true" />
          </div>
        </FadeContainer>
      </ParticleBackground>

      {/* Speakers Section */}
      <section className="w-full py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6 md:p-8 lg:p-10 shadow-sm">
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Speaker Lineup</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
                Explore our diverse lineup of speakers who will share their expertise and insights.
              </p>
            </div>

            <div>
              <Suspense
                fallback={
                  <div className="flex h-96 items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4 inline-block h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-4 border-[#548cac] border-t-transparent"></div>
                      <p className="text-lg sm:text-xl text-gray-500">Loading speakers...</p>
                    </div>
                  </div>
                }
              >
                <WhovaSpeakersEmbed />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-xl bg-gradient-to-r from-[#101310] to-[#548cac] p-8 sm:p-10 md:p-12 text-center text-white shadow-lg">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold">Interested in Speaking?</h2>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-white/90 max-w-xl mx-auto">
              We&apos;re always looking for innovative voices to join our speaker lineup. Share your expertise with our
              community of healthcare professionals and technologists.
            </p>
            <a
              href="/contact-us"
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-[#101310] transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#548cac]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

