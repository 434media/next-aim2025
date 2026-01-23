import { Calendar, Clock, Users } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import { Suspense } from "react"
import { FadeContainer } from "../../components/Fade"
import ParticleBackground from "../../components/ParticleBackground"
import { ScheduleHero } from "../../components/ScheduleHero"
import WhovaEmbed from "../../components/WhovaEmbed"

export const metadata: Metadata = {
  title: "Schedule | AIM Health R&D Summit",
  description:
    "View the complete schedule for the AIM Health R&D Summit, including keynotes, panels, workshops, and networking events.",
  openGraph: {
    title: "Schedule | AIM Health R&D Summit",
    description:
      "View the complete schedule for the AIM Health R&D Summit, including keynotes, panels, workshops, and networking events.",
    url: `/schedule`,
    type: "website",
  },
}

export default function AgendaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Enhanced Hero Section */}
      <ParticleBackground
        className="w-full min-h-screen flex items-center justify-center relative pt-32 md:pt-40"
        gradientFrom="[#0a0f0a]"
        gradientVia="[#1a3f4a]"
        gradientTo="[#2a4f3a]"
      >
        <FadeContainer className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Enhanced Header - Now Client Component for Editing */}
          <ScheduleHero />

          {/* Enhanced Schedule Embed */}
          <div className="mx-auto max-w-7xl">
            <div className="group relative">
              {/* Floating background effects */}
              <div className="absolute -inset-6 bg-gradient-to-r from-[#548cac]/10 via-transparent to-[#548cac]/10 rounded-3xl blur-3xl group-hover:blur-[40px] transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

              {/* Main schedule container */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-white/30">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Interactive Schedule</h2>
                  <p className="text-white/70 max-w-2xl mx-auto text-lg">
                    Click on any session to view details, add to your personal agenda, and connect with other attendees.
                  </p>
                </div>

                <div className="relative">
                  <Suspense
                    fallback={
                      <div className="flex h-[700px] items-center justify-center">
                        <div className="text-center">
                          <div className="relative mb-6">
                            <div className="h-16 w-16 mx-auto animate-spin rounded-full border-4 border-[#548cac]/30 border-t-[#548cac]"></div>
                            <div className="absolute inset-0 h-16 w-16 mx-auto animate-ping rounded-full border-4 border-[#548cac]/20"></div>
                          </div>
                          <p className="text-xl text-white/80 mb-2">Loading Summit Schedule...</p>
                          <p className="text-sm text-white/60">Preparing your personalized agenda</p>
                          <div className="mt-4 flex justify-center space-x-1">
                            <div className="h-2 w-2 bg-[#548cac] rounded-full animate-bounce"></div>
                            <div
                              className="h-2 w-2 bg-[#548cac] rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="h-2 w-2 bg-[#548cac] rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <WhovaEmbed />
                  </Suspense>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-white/60 mb-4">
                    Schedule is subject to change. Download the app for real-time updates.
                  </p>
                  <div className="inline-flex items-center rounded-full bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400 border border-yellow-500/20">
                    <Clock className="mr-2 h-4 w-4" />
                    Live updates available in the mobile app
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeContainer>
      </ParticleBackground>

      {/* Enhanced Mobile App Section */}
      <section className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <FadeContainer>
              <div className="mb-8 flex justify-center">
                <div className="inline-flex items-center rounded-full bg-[#548cac]/10 px-6 py-2 text-sm font-medium text-[#548cac] ring-1 ring-[#548cac]/20">
                  <Image
                    src="https://ampd-asset.s3.us-east-2.amazonaws.com/whova-logo-white.png"
                    alt="Whova"
                    width={80}
                    height={20}
                    className="mr-2 h-4 w-auto invert"
                  />
                  Powered Experience
                </div>
              </div>

              <h2 className="mb-8 text-3xl sm:text-4xl font-bold text-gray-900">Take Your Schedule Everywhere</h2>

              <p className="mb-12 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Access your personalized agenda offline, receive push notifications for session reminders, participate
                in live polls, and network with fellow attendees—all from your mobile device.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#548cac]/10 rounded-full mb-4">
                    <Calendar className="h-8 w-8 text-[#548cac]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Agenda</h3>
                  <p className="text-gray-600">Build your custom schedule and get reminders</p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#548cac]/10 rounded-full mb-4">
                    <Users className="h-8 w-8 text-[#548cac]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Networking</h3>
                  <p className="text-gray-600">Connect with speakers and attendees instantly</p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#548cac]/10 rounded-full mb-4">
                    <Clock className="h-8 w-8 text-[#548cac]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h3>
                  <p className="text-gray-600">Get instant notifications about schedule changes</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="https://apps.apple.com/us/app/whova-event-conference-app/id716979741"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center rounded-xl bg-[#548cac] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#3a6b8a] hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2"
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">Download for iOS</span>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.whova.event"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center rounded-xl bg-[#548cac] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#3a6b8a] hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2"
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">Download for Android</span>
                </a>
              </div>
            </FadeContainer>
          </div>
        </div>
      </section>
    </main>
  )
}
