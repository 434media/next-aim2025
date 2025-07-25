"use client"

import { motion } from "motion/react"
import { RiArrowRightSLine, RiPlayCircleLine, RiHistoryLine, RiBookOpenLine } from "@remixicon/react"
import { FadeContainer } from "../../components/Fade"
import ParticleBackground from "../../components/ParticleBackground"
import { ExperienceInnovationCTA } from "../../components/ExperienceInnovationCTA"

export default function MMIDPage() {
  return (
    <>
    <main
      className="min-h-screen bg-white text-gray-900 overflow-hidden mt-10 md:mt-0"
      id="main-content"
      aria-labelledby="page-heading"
    >
      {/* Full-Screen Hero Section */}
      <div className="relative w-full min-h-screen flex flex-col">
        {/* Clean white background */}
        <div className="absolute inset-0 bg-white" />

        {/* Enhanced particle background - Light theme */}
        <div className="absolute inset-0 z-10">
          <ParticleBackground
            className="w-full h-full"
            gradientFrom="#ffffff"
            gradientVia="#f9fafb"
            gradientTo="#ffffff"
            particleCount={80}
          />
        </div>

        {/* Subtle radial light effects */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-100/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-50/30 rounded-full blur-2xl"
            animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.15, 0.05, 0.15] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gray-50/10 rounded-full blur-3xl"
            animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
          />
        </div>

        {/* Hero content - Enhanced mobile typography and spacing */}
        <div className="relative z-20 flex-1 flex flex-col justify-center py-12 sm:py-16 md:py-24 lg:py-32 mt-2 sm:mt-4 md:mt-8">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <FadeContainer className="max-w-7xl mx-auto text-center">
              {/* Section header with mobile-optimized typography */}
              <motion.div
                className="mb-8 sm:mb-10 md:mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-7 md:mb-8 mt-6 md:mt-0">
                  <motion.div
                    className="h-6 sm:h-8 md:h-10 w-1 sm:w-1.5 bg-gradient-to-b from-green-600 to-green-800 rounded-full"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-tight leading-tight px-2 sm:px-0 mb-2 sm:mb-4">
                      <span
                        className="bg-gradient-to-r from-green-600 via-green-500 to-green-700 bg-clip-text text-transparent animate-pulse"
                        style={{
                          backgroundSize: "200% 200%",
                          animation: "gradient-shift 3s ease-in-out infinite",
                        }}
                      >
                        MMID
                      </span>
                    </h1>
                    <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight leading-tight px-2 sm:px-0">
                      Preparatory Webinar Sessions
                    </h2>
                  </motion.div>
                  <motion.div
                    className="h-6 sm:h-8 md:h-10 w-1 sm:w-1.5 bg-gradient-to-b from-green-600 to-green-800 rounded-full"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  />
                </div>
              </motion.div>

              {/* Main description with mobile-optimized typography */}
              <motion.div
                className="space-y-6 sm:space-y-8 md:space-y-10 max-w-5xl mx-auto mb-10 sm:mb-12 md:mb-14 lg:mb-16"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 justify-center px-2 sm:px-0"
                  whileInView={{ scale: [0.95, 1.02, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="mx-auto sm:mx-0 flex-shrink-0"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <RiPlayCircleLine
                      className="h-6 w-6 sm:h-7 sm:w-7 text-green-600 mt-0 sm:mt-1.5"
                      aria-hidden="true"
                    />
                  </motion.div>
                  <p className="text-gray-900 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed text-center max-w-4xl">
                    Watch instructional/informational videos of previous AIM Health R&D Summit and Military Medical
                    Industry Days (MMID) webinar sessions
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200 shadow-2xl shadow-gray-200/30 mx-2 sm:mx-0"
                  whileInView={{ y: [20, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-5 md:mb-6 font-medium text-center">
                    Access our complete video library of the preparatory webinar sessions held over the last several
                    years that address various key topics such as
                    <span className="text-gray-900 font-bold mx-1 sm:mx-2 px-1 sm:px-2 py-0.5 sm:py-1 bg-gray-100 rounded text-xs sm:text-sm md:text-base lg:text-lg inline-block my-1">
                      &quot;Keys to Collaborating with the Military&quot;
                    </span>{" "}
                    to
                    <span className="text-gray-900 font-bold mx-1 sm:mx-2 px-1 sm:px-2 py-0.5 sm:py-1 bg-gray-100 rounded text-xs sm:text-sm md:text-base lg:text-lg inline-block my-1">
                      &quot;Licensing Technologies from The Military&quot;
                    </span>
                    along with various others.
                  </p>

                  <motion.div
                    className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6"
                    whileInView={{ x: [-20, 0], opacity: [0, 1] }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <RiHistoryLine
                      className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1 mx-auto sm:mx-0"
                      aria-hidden="true"
                    />
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl italic font-medium leading-relaxed text-center sm:text-left">
                      All were designed to help you optimize your experience at the AIM Health R&D Summit and provide
                      essential information about military medical innovation and research.
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-center"
                    whileInView={{ scale: [0.9, 1.05, 1] }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="inline-flex flex-col sm:flex-row items-center px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg sm:rounded-xl border border-gray-300 shadow-lg text-center sm:text-left">
                      <RiBookOpenLine className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mb-1 sm:mb-0 sm:mr-3" />
                      <span className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base lg:text-lg leading-tight">
                        Topics include collaboration strategies, licensing, funding opportunities, and more
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Enhanced CTA Button - Updated for light theme */}
              <motion.div
                className="flex justify-center px-2 sm:px-0"
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.a
                  href="https://youtube.com/playlist?list=PLu4stFKpxLBXb7TY7luPCEAHBg1CZQru8&si=UnnuZ2Q2E08QSBVP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 text-base sm:text-lg md:text-xl font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-xl sm:rounded-2xl transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-gray-500/50 focus:ring-offset-4 focus:ring-offset-white shadow-2xl shadow-gray-900/30 overflow-hidden w-full max-w-xs sm:max-w-sm md:min-w-[320px] lg:min-w-[360px]"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Enhanced animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Multiple shimmer layers */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500" />
                  <div
                    className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-gray-200/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-700"
                    style={{ animationDelay: "0.2s" }}
                  />

                  {/* Button content with mobile-optimized spacing */}
                  <span className="relative z-10 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <RiPlayCircleLine
                        className="mr-2 sm:mr-3 md:mr-4 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 group-hover:animate-pulse flex-shrink-0"
                        aria-hidden="true"
                      />
                    </motion.div>
                    <span className="font-bold tracking-wide text-center leading-tight">
                      <span className="block sm:inline">Watch Full</span>{" "}
                      <span className="block sm:inline">Playlist</span>
                    </span>
                    <motion.span
                      className="ml-2 sm:ml-3 md:ml-4 flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full bg-white/20 group-hover:bg-white/30 transition-all duration-300 flex-shrink-0"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <RiArrowRightSLine className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                    </motion.span>
                  </span>

                  {/* Enhanced pulse effects */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gray-400/20 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gray-300/10 scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" />
                </motion.a>
              </motion.div>
            </FadeContainer>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out;
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </main>

    <ExperienceInnovationCTA />
    </>
  )
}

MMIDPage.meta = {
  title: "Military Medical Industry Days (MMID) - Preparatory Webinar Library",
  description:
    "Access our comprehensive video library of MMID preparatory webinar sessions designed to help you navigate the military medical innovation and research ecosystem.",
}
