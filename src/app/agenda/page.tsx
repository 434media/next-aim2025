import type { Metadata } from "next"
import { Suspense } from "react"
import { FadeContainer } from "@/components/Fade"
import WhovaEmbed from "@/components/WhovaEmbed"

export const metadata: Metadata = {
  title: "Agenda | AIM Health R&D Summit",
  description:
    "View the complete agenda for the AIM Health R&D Summit, including keynotes, panels, workshops, and networking events.",
  openGraph: {
    title: "Agenda | AIM Health R&D Summit",
    description:
      "View the complete agenda for the AIM Health R&D Summit, including keynotes, panels, workshops, and networking events.",
    url: `/agenda`,
  },
}

export default function AgendaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#101310] to-[#101310]/90 py-16 md:py-24">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#101310]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
          <FadeContainer className="flex flex-col items-center text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Summit Agenda</h1>
            <div className="mx-auto mb-8 flex max-w-3xl flex-row items-center justify-center gap-2 text-lg text-gray-300 sm:text-xl">
              <span>June 16-17, 2025 • Henry B. González Convention Center</span>
            </div>
            <p className="mx-auto max-w-2xl text-center text-lg text-gray-300">
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
                    <p className="text-lg text-gray-500">Loading agenda...</p>
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
              <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">Download the Whova App</h2>
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

