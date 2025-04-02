import type { Metadata } from "next"
import { RiTeamLine, RiMicLine } from "@remixicon/react"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import WhovaSpeakersEmbed from "@/components/WhovaSpeakersEmbed"
import { Suspense } from "react"

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
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-16 md:py-24 mt-24 md:mt-32 lg:mt-40">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[#548cac]/30" />
          <div className="absolute -right-20 top-20 h-60 w-60 rounded-full bg-[#10131d]/20" />
        </div>

        <FadeContainer className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <FadeDiv className="mb-2 flex items-center justify-center gap-2 text-sm font-medium text-[#548cac]">
              <RiTeamLine className="h-5 w-5" aria-hidden="true" />
              <span>INNOVATION LEADERS</span>
            </FadeDiv>

            <h1 className="mb-6 bg-gradient-to-r from-[#10131d] via-[#548cac] to-[#10131d] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
              The Future of Military Medicine Starts Here
            </h1>

            <FadeDiv className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              <p>
                Uniting innovators from academia, industry, and military to accelerate transformative medical
                technologies. Our speakers lead the charge in addressing critical challenges across both military and
                civilian healthcare.
              </p>
            </FadeDiv>

            <FadeDiv className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500">
              <RiMicLine className="h-5 w-5 text-[#548cac]" aria-hidden="true" />
              <span>VISIONARY SPEAKERS 2025</span>
            </FadeDiv>
          </div>
        </FadeContainer>
      </section>

      {/* Speakers Section */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Speaker Lineup</h2>
              <p className="mt-2 text-gray-600">
                Explore our diverse lineup of speakers who will share their expertise and insights.
              </p>
            </div>

            <div>
              <Suspense
                fallback={
                  <div className="flex h-96 items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#548cac] border-t-transparent"></div>
                      <p className="text-lg text-gray-500">Loading speakers...</p>
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
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-xl bg-gradient-to-r from-[#10131d] to-[#548cac] p-8 text-center text-white shadow-lg md:p-12">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Interested in Speaking?</h2>
            <p className="mb-6 text-white/90">
              We&apos;re always looking for innovative voices to join our speaker lineup. Share your expertise with our
              community of healthcare professionals and technologists.
            </p>
            <a
              href="/contact-us"
              className="inline-block rounded-lg bg-white px-6 py-3 font-medium text-[#10131d] transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#548cac]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

