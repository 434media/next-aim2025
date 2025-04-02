import type { Metadata } from "next"
import { Suspense } from "react"
import { RiCalendarLine, RiMapPinLine, RiArrowDownLine } from "@remixicon/react"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import WhovaSponsorEmbed from "@/components/WhovaSponsorEmbed"
import ParticleBackground from "@/components/ParticleBackground"

export const metadata: Metadata = {
  title: "Sponsors & Exhibitors | AIM Health R&D Summit",
  description:
    "Meet the innovative companies and organizations supporting the AIM Health R&D Summit. Discover partnership opportunities and connect with industry leaders.",
  openGraph: {
    title: "Sponsors & Exhibitors | AIM Health R&D Summit",
    description:
      "Meet the innovative companies and organizations supporting the AIM Health R&D Summit. Discover partnership opportunities and connect with industry leaders.",
    url: `/sponsors-exhibitors`,
    type: "website",
  },
}

export default function SponsorsExhibitorsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section with Particle Background - Full Viewport Height */}
      <ParticleBackground
        className="w-full min-h-screen flex items-center justify-center relative"
        gradientFrom="[#101310]"
        gradientVia="[#4f4f2c]"
        gradientTo="[#4f4f2c]"
      >
        <FadeContainer className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Sponsors & Exhibitors
            </h1>

            {/* Event info section with improved spacing and responsive layout */}
            <div className="mx-auto mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-base sm:text-lg md:text-xl text-white/80">
              {/* Date */}
              <div className="flex items-center justify-center">
                <RiCalendarLine
                  className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-[#548cac] flex-shrink-0"
                  aria-hidden="true"
                />
                <span>June 16-17, 2025</span>
              </div>

              {/* Separator - Hidden on mobile, visible on desktop */}
              <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-white/40" aria-hidden="true"></span>

              {/* Location */}
              <div className="flex items-center justify-center">
                <RiMapPinLine className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-[#548cac] flex-shrink-0" aria-hidden="true" />
                <span>Henry B. González Convention Center</span>
              </div>
            </div>

            <FadeDiv className="mx-auto mb-8 sm:mb-10 max-w-2xl text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
              <p>
                Meet the innovative companies and organizations supporting the AIM Health R&D Summit. Our sponsors and
                exhibitors are essential partners in our mission to accelerate military medical innovation through
                cross-sector collaboration.
              </p>
            </FadeDiv>

            {/* Scroll indicator */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              aria-label="Scroll down to view sponsors"
            >
              <RiArrowDownLine className="h-6 w-6 sm:h-8 sm:w-8 text-white/70 animate-bounce" aria-hidden="true" />
            </div>
          </div>
        </FadeContainer>
      </ParticleBackground>

      {/* Sponsors Section */}
      <section className="w-full bg-white py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <FadeContainer className="mb-10 sm:mb-12 text-center">
              <h2
              id="sponsors-title"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#101310] tracking-tight mb-6"
              >
                AIM Health R&D Summit <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#548cac] to-[#4f4f2c] bg-clip-text text-transparent">
                  2025 Sponsors
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                These organizations make the AIM Health R&D Summit possible. Their support enables us to bring together
                the brightest minds in military medicine and healthcare innovation.
              </p>
            </FadeContainer>

            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-5 sm:p-6 md:p-8 shadow-sm">
              <Suspense
                fallback={
                  <div className="flex h-96 items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4 inline-block h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-4 border-[#548cac] border-t-transparent"></div>
                      <p className="text-lg sm:text-xl text-gray-500">Loading sponsors...</p>
                    </div>
                  </div>
                }
              >
                <WhovaSponsorEmbed />
              </Suspense>
            </div>

            <div className="mt-8 sm:mt-10 text-center">
              <p className="text-sm sm:text-base text-gray-500">
                Sponsor list is updated regularly as new organizations join.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

