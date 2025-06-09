import type { Metadata } from "next"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import WhovaSpeakersEmbed from "@/components/WhovaSpeakersEmbed"
import { Suspense } from "react"
import ParticleBackground from "@/components/ParticleBackground"
import { RiUserLine, RiGlobalLine, RiAwardLine, RiStarLine } from "@remixicon/react"

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
      {/* Hero Section with Enhanced Particle Background */}
      <ParticleBackground
        className="w-full min-h-screen flex flex-col items-center justify-start relative pt-32 md:pt-40"
        gradientFrom="[#0a0f0a]"
        gradientVia="[#1a2f3a]"
        gradientTo="[#2a3f2a]"
      >
        <FadeContainer className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pb-16 sm:pb-24">
          {/* Enhanced Hero Header */}
          <div className="mx-auto max-w-5xl text-center mb-16 md:mb-20">
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center rounded-full bg-[#548cac]/10 px-6 py-2 text-sm font-medium text-[#548cac] ring-1 ring-[#548cac]/20 backdrop-blur-sm">
                <RiStarLine className="mr-2 h-4 w-4" />
                World-Class Speaker Lineup
              </div>
            </div>

            <h1 className="mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-white via-white to-[#548cac] bg-clip-text text-transparent">
                Visionary Leaders
              </span>
              <br />
              <span className="text-white/90">Shaping Tomorrow</span>
            </h1>

            <FadeDiv className="mx-auto mb-12 max-w-3xl text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed">
              <p>
                Connect with pioneering researchers, military leaders, and industry innovators who are revolutionizing
                healthcare technology. Our speakers represent the forefront of medical advancement across defense and
                civilian sectors.
              </p>
            </FadeDiv>

            {/* Interactive Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#548cac]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <RiUserLine className="h-8 w-8 text-[#548cac] mb-3 mx-auto" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">50+</div>
                  <div className="text-sm text-white/70">Expert Speakers</div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#548cac]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <RiGlobalLine className="h-8 w-8 text-[#548cac] mb-3 mx-auto" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">15+</div>
                  <div className="text-sm text-white/70">Countries</div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#548cac]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <RiAwardLine className="h-8 w-8 text-[#548cac] mb-3 mx-auto" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">25+</div>
                  <div className="text-sm text-white/70">Institutions</div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#548cac]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <RiStarLine className="h-8 w-8 text-[#548cac] mb-3 mx-auto" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-white/70">Innovation</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Speakers Embed Container */}
          <div className="mx-auto max-w-7xl">
            <div className="group relative">
              {/* Floating background elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#548cac]/10 via-transparent to-[#548cac]/10 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

              {/* Main container */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-white/30">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Meet Our Speakers</h2>
                  <p className="text-white/70 max-w-2xl mx-auto">
                    Explore detailed profiles, research backgrounds, and session information for each of our
                    distinguished speakers.
                  </p>
                </div>

                <div className="relative">
                  <Suspense
                    fallback={
                      <div className="flex h-[600px] items-center justify-center">
                        <div className="text-center">
                          <div className="relative mb-6">
                            <div className="h-16 w-16 mx-auto animate-spin rounded-full border-4 border-[#548cac]/30 border-t-[#548cac]"></div>
                            <div className="absolute inset-0 h-16 w-16 mx-auto animate-ping rounded-full border-4 border-[#548cac]/20"></div>
                          </div>
                          <p className="text-xl text-white/80 mb-2">Loading Speaker Profiles...</p>
                          <p className="text-sm text-white/60">Connecting you with industry leaders</p>
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
      </ParticleBackground>
    </main>
  )
}
