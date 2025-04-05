import type { Metadata } from "next"
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
    <main className="flex min-h-screen flex-col items-center" aria-label="Speakers page">
      {/* Hero Section with Particle Background - Full Viewport Height */}
      <ParticleBackground className="w-full min-h-screen flex flex-col items-center justify-start relative pt-32 md:pt-40">
        <FadeContainer className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pb-16 sm:pb-24">
          <div className="mx-auto max-w-4xl text-center mb-12 md:mb-16">
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

          {/* Speakers Section - Integrated within the hero */}
          <div className="mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-lg">
              <h2 className="sr-only">Speaker Lineup</h2>
              <div className="md:-mt-16 sm:-mt-8">
                <Suspense
                  fallback={
                    <div className="flex h-96 items-center justify-center">
                      <div className="text-center">
                        <div className="mb-4 inline-block h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-4 border-[#548cac] border-t-transparent"></div>
                        <p className="text-lg sm:text-xl text-white/80">Loading speakers...</p>
                      </div>
                    </div>
                  }
                >
                  <WhovaSpeakersEmbed />
                </Suspense>
              </div>
            </div>
          </div>
        </FadeContainer>
      </ParticleBackground>
    </main>
  )
}

