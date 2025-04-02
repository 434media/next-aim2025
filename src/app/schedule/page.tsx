import type { Metadata } from "next"
import { Suspense } from "react"
import { RiCalendarLine, RiMapPinLine, RiSmartphoneLine, RiArrowDownLine } from "@remixicon/react"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import WhovaEmbed from "@/components/WhovaEmbed"
import ParticleBackground from "@/components/ParticleBackground"

export const metadata: Metadata = {
  title: "Agenda | AIM Health R&D Summit",
  description:
    "View the complete agenda for the AIM Health R&D Summit, including keynotes, panels, workshops, and networking events.",
  openGraph: {
    title: "Agenda | AIM Health R&D Summit",
    description:
      "View the complete agenda for the AIM Health R&D Summit, including keynotes, panels, workshops, and networking events.",
    url: `/agenda`,
    type: "website",
  },
}

export default function AgendaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section with Particle Background - Full Viewport Height */}
      <ParticleBackground
        className="w-full min-h-screen flex items-center justify-center relative"
        gradientFrom="[#101310]"
        gradientVia="[#101310]"
        gradientTo="[#101310]/90"
      >
        <FadeContainer className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Summit Agenda
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
                Explore our comprehensive schedule of keynotes, panels, workshops, and networking events designed to
                foster collaboration and innovation in military health research.
              </p>
            </FadeDiv>

            {/* Scroll indicator */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              aria-label="Scroll down to view agenda"
            >
              <RiArrowDownLine className="h-6 w-6 sm:h-8 sm:w-8 text-white/70 animate-bounce" aria-hidden="true" />
            </div>
          </div>
        </FadeContainer>
      </ParticleBackground>

      {/* Agenda Section */}
      <section className="w-full bg-white py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <FadeContainer className="mb-10 sm:mb-12 text-center">
              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Full Conference Schedule
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Use the interactive agenda below to plan your summit experience. You can filter by track, search for
                specific sessions, and create your personalized schedule.
              </p>
            </FadeContainer>

            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-5 sm:p-6 md:p-8 shadow-sm">
              <Suspense
                fallback={
                  <div className="flex h-96 items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4 inline-block h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-4 border-[#548cac] border-t-transparent"></div>
                      <p className="text-lg sm:text-xl text-gray-500">Loading agenda...</p>
                    </div>
                  </div>
                }
              >
                <WhovaEmbed />
              </Suspense>
            </div>

            <div className="mt-8 sm:mt-10 text-center">
              <p className="text-sm sm:text-base text-gray-500">
                The agenda is subject to change. Please check back regularly for updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="w-full bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeContainer>
              <h2 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold text-gray-900">
                <RiSmartphoneLine
                  className="mb-2 sm:mb-3 inline-block h-6 w-6 sm:h-8 sm:w-8 text-[#548cac]"
                  aria-hidden="true"
                />
                <span className="ml-2">Download the Whova App</span>
              </h2>
              <p className="mb-8 sm:mb-10 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Get the most out of your summit experience by downloading the Whova app. Access the agenda on-the-go,
                network with other attendees, and receive important updates.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <a
                  href="https://apps.apple.com/us/app/whova-event-conference-app/id716979741"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-[#548cac] px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-white shadow-sm transition-colors hover:bg-[#3a6b8a] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2"
                >
                  Download for iOS
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.whova.event"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-[#548cac] px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-white shadow-sm transition-colors hover:bg-[#3a6b8a] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2"
                >
                  Download for Android
                </a>
              </div>
            </FadeContainer>
          </div>
        </div>
      </section>
    </main>
  )
}

