import type { Metadata } from "next"
import { Suspense } from "react"
import { FadeContainer } from "../../components/Fade"
import { SpeakersHero } from "../../components/SpeakersHero"
import WhovaSpeakersEmbed from "../../components/WhovaSpeakersEmbed"
import { EditableText } from "../../components/admin/EditableText"

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
    <main className="flex min-h-screen flex-col items-center bg-white" aria-label="Speakers page">
      {/* Hero Section with Light Background */}
      <div className="w-full min-h-screen flex flex-col items-center justify-start relative pt-32 md:pt-40 bg-gradient-to-br from-neutral-50 via-sky-50 to-white">
        <FadeContainer className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pb-16 sm:pb-24">
          {/* Enhanced Hero Header - Now Client Component for Editing */}
          <SpeakersHero />

          {/* Enhanced Speakers Embed Container */}
          <div className="mx-auto max-w-5xl">
            <div className="group relative">
              {/* Floating background elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-100/50 via-transparent to-sky-100/50 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-neutral-50/80 rounded-2xl"></div>

              {/* Main container */}
              <div className="relative bg-white/90 backdrop-blur-xl border border-neutral-200 rounded-2xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-sky-200">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                    <EditableText textId="speakers-explore-title" page="speakers" section="embed">
                      Explore AIM&apos;25
                    </EditableText>
                  </h2>
                  <p className="text-neutral-700 max-w-2xl mx-auto font-medium">
                    <EditableText textId="speakers-explore-subtitle" page="speakers" section="embed">
                      Speaker and session details
                    </EditableText>
                  </p>
                </div>

                <div className="relative">
                  <Suspense
                    fallback={
                      <div className="flex h-[600px] items-center justify-center">
                        <div className="text-center">
                          <div className="relative mb-6">
                            <div className="h-16 w-16 mx-auto animate-spin rounded-full border-4 border-sky-200 border-t-sky-600"></div>
                            <div className="absolute inset-0 h-16 w-16 mx-auto animate-ping rounded-full border-4 border-sky-100"></div>
                          </div>
                          <p className="text-xl text-neutral-800 mb-2 font-semibold">Loading Speaker Profiles...</p>
                          <p className="text-sm text-neutral-600 font-medium">Connecting you with industry leaders</p>
                        </div>
                      </div>
                    }
                  >
                    <WhovaSpeakersEmbed />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </FadeContainer>
      </div>
    </main>
  )
}
