import type { Metadata } from "next"
import { Suspense } from "react"
import { RiCalendarLine, RiMapPinLine, RiSmartphoneLine } from "@remixicon/react"
import { FadeContainer } from "@/components/Fade"
import WhovaEmbed from "@/components/WhovaEmbed"

export const metadata: Metadata = {
  title: "Schedule | AIM Health R&D Summit",
  description:
    "View the complete agenda for the AIM Health R&D Summit, including keynotes, panels, workshops, and networking events.",
  openGraph: {
    title: "Schedule | AIM Health R&D Summit",
    description:
      "View the complete agenda for the AIM Health R&D Summit, including keynotes, panels, workshops, and networking events.",
    url: `/schedule`,
    type: "website",
  },
}

export default function SchedulePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#101310] to-[#101310]/90 py-16 md:py-24">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a2a]/80 to-[#101310]/90 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#101310]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32">
          <FadeContainer className="flex flex-col items-center text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Summit Agenda</h1>

            {/* Updated event info section with better mobile layout */}
            <div className="mx-auto mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2 text-base sm:text-lg md:text-xl text-gray-300">
              {/* Date - Full width on mobile, inline on desktop */}
              <div className="flex items-center justify-center">
                <RiCalendarLine className="h-5 w-5 mr-2 text-[#548cac]" aria-hidden="true" />
                <span>June 16-17, 2025</span>
              </div>

              {/* Separator - Hidden on mobile, visible on desktop */}
              <span className="hidden sm:block mx-2 h-1 w-1 rounded-full bg-gray-500"></span>

              {/* Location - Full width on mobile, inline on desktop */}
              <div className="flex items-center justify-center">
                <RiMapPinLine className="h-5 w-5 mr-2 text-[#548cac]" aria-hidden="true" />
                <span>Henry B. González Convention Center</span>
              </div>
            </div>

            <p className="mx-auto max-w-2xl text-center text-base sm:text-lg text-gray-300">
              Explore our comprehensive schedule of keynotes, panels, workshops, and networking events designed to
              foster collaboration and innovation in military health research.
            </p>
          </FadeContainer>
        </div>
      </section>

      {/* Agenda Section */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <FadeContainer className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Full Conference Schedule
              </h2>
              <p className="text-gray-600">
                Use the interactive agenda below to plan your summit experience. You can filter by track, search for
                specific sessions, and create your personalized schedule.
              </p>
            </FadeContainer>

            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <Suspense
                fallback={
                  <div className="flex h-96 items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#548cac] border-t-transparent"></div>
                      <p className="text-lg text-gray-500">Loading agenda...</p>
                    </div>
                  </div>
                }
              >
                <WhovaEmbed />
              </Suspense>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                The agenda is subject to change. Please check back regularly for updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="w-full bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeContainer>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
                <RiSmartphoneLine className="mb-2 inline-block h-6 w-6 text-[#548cac]" aria-hidden="true" />
                <span className="ml-2">Download the Whova App</span>
              </h2>
              <p className="mb-8 text-gray-600">
                Get the most out of your summit experience by downloading the Whova app. Access the agenda on-the-go,
                network with other attendees, and receive important updates.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="https://apps.apple.com/us/app/whova-event-conference-app/id716979741"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-[#548cac] px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-[#3a6b8a] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2"
                >
                  Download for iOS
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.whova.event"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-[#548cac] px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-[#3a6b8a] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2"
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

