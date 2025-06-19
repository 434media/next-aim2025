"use client"

import { motion } from "motion/react"
import { RiArrowRightSLine, RiPlayCircleLine, RiHistoryLine, RiBookOpenLine } from "@remixicon/react"
import { FadeContainer } from "../../components/Fade"
import ParticleBackground from "../../components/ParticleBackground"
import Image from "next/image"

export default function MMIDPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden mt-10 md:mt-0" id="main-content" aria-labelledby="page-heading">
      {/* Full-Screen Hero Section */}
      <div className="relative w-full min-h-screen flex flex-col">
        {/* Animated background gradient - Enhanced Green theme */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F0A] via-[#1A4A1A] to-[#0F2F0F]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
          {/* Additional depth layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-green-800/10" />
        </div>

        {/* Enhanced MMID Logo Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large centered logo with enhanced effects */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
            animate={{ opacity: 0.12, scale: 1, rotate: 0 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-green-400/5 rounded-full blur-3xl scale-150 animate-pulse" />
              <div
                className="absolute inset-0 bg-green-300/3 rounded-full blur-2xl scale-125 animate-pulse"
                style={{ animationDelay: "2s" }}
              />
              <Image
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/mmid.png"
                alt=""
                width={900}
                height={675}
                className="w-full h-auto max-w-5xl opacity-80"
                style={{
                  filter: "invert(1) brightness(1.2) contrast(0.8)",
                  mixBlendMode: "screen",
                }}
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Additional floating logo elements for depth */}
          <motion.div
            className="absolute top-20 right-20 opacity-5"
            animate={{
              y: [-15, 15, -15],
              rotate: [0, 10, -10, 0],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/mmid.png"
              alt=""
              width={200}
              height={150}
              style={{ filter: "invert(1) brightness(0.8)" }}
              aria-hidden="true"
            />
          </motion.div>

          <motion.div
            className="absolute bottom-32 left-16 opacity-4"
            animate={{
              y: [20, -20, 20],
              rotate: [0, -8, 8, 0],
              scale: [1, 0.9, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 3,
            }}
          >
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/mmid.png"
              alt=""
              width={180}
              height={135}
              style={{ filter: "invert(1) brightness(0.6)" }}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Enhanced particle background - Green theme */}
        <div className="absolute inset-0 z-10">
          <ParticleBackground
            className="w-full h-full"
            gradientFrom="#0A1F0A"
            gradientVia="#1A4A1A"
            gradientTo="#0F2F0F"
            particleCount={80}
          />
        </div>

        {/* Enhanced radial light effects - Green theme */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/8 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/12 rounded-full blur-2xl"
            animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.12, 0.06, 0.12] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-green-400/4 rounded-full blur-3xl"
            animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.04, 0.08, 0.04] }}
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
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-7 md:mb-8">
                  <motion.div
                    className="h-6 sm:h-8 md:h-10 w-1 sm:w-1.5 bg-gradient-to-b from-[#4A9A4A] to-[#2A6A2A] rounded-full"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                  <motion.h1
                    className="xs:text-2xl text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-tight px-2 sm:px-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    <span className="block sm:inline">MMID Preparatory</span>{" "}
                    <span className="block sm:inline">Webinar Sessions</span>
                  </motion.h1>
                  <motion.div
                    className="h-6 sm:h-8 md:h-10 w-1 sm:w-1.5 bg-gradient-to-b from-[#4A9A4A] to-[#2A6A2A] rounded-full"
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
                      className="h-6 w-6 sm:h-7 sm:w-7 text-[#4A9A4A] mt-0 sm:mt-1.5"
                      aria-hidden="true"
                    />
                  </motion.div>
                  <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed text-center sm:text-left max-w-4xl">
                    Watch instructional/informational videos of previous AIM Health R&D Summit and Military Medical
                    Industry Days (MMID) webinar sessions
                  </p>
                </motion.div>

                <motion.div
                  className="bg-black/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-green-500/30 shadow-2xl shadow-green-900/20 mx-2 sm:mx-0"
                  whileInView={{ y: [20, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-5 md:mb-6 font-medium text-left">
                    Access our complete video library of the preparatory webinar sessions held over the last several
                    years that address various key topics such as
                    <span className="text-white font-bold mx-1 sm:mx-2 px-1 sm:px-2 py-0.5 sm:py-1 bg-green-500/20 rounded text-xs sm:text-sm md:text-base lg:text-lg inline-block my-1">
                      &quot;Keys to Collaborating with the Military&quot;
                    </span>{" "}
                    to
                    <span className="text-white font-bold mx-1 sm:mx-2 px-1 sm:px-2 py-0.5 sm:py-1 bg-green-500/20 rounded text-xs sm:text-sm md:text-base lg:text-lg inline-block my-1">
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
                      className="h-5 w-5 sm:h-6 sm:w-6 text-[#4A9A4A] flex-shrink-0 mt-0.5 sm:mt-1 mx-auto sm:mx-0"
                      aria-hidden="true"
                    />
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl italic font-medium leading-relaxed text-center sm:text-left">
                      All were designed to help you optimize your experience at the AIM Health R&D Summit and provide
                      essential information about military medical innovation and research.
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-center"
                    whileInView={{ scale: [0.9, 1.05, 1] }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="inline-flex flex-col sm:flex-row items-center px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-black/50 to-green-900/30 rounded-lg sm:rounded-xl border border-green-400/40 shadow-lg text-center sm:text-left">
                      <RiBookOpenLine className="h-4 w-4 sm:h-5 sm:w-5 text-[#4A9A4A] mb-1 sm:mb-0 sm:mr-3" />
                      <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg leading-tight">
                        Topics include collaboration strategies, licensing, funding opportunities, and more
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Enhanced CTA Button - Mobile-optimized */}
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
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 text-base sm:text-lg md:text-xl font-bold text-white bg-[#FF0000] hover:bg-[#CC0000] rounded-xl sm:rounded-2xl transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-red-500/50 focus:ring-offset-4 focus:ring-offset-black shadow-2xl shadow-red-900/60 overflow-hidden w-full max-w-xs sm:max-w-sm md:min-w-[320px] lg:min-w-[360px]"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Enhanced animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000] via-[#FF4444] to-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Multiple shimmer layers */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500" />
                  <div
                    className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-red-200/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-700"
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
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-red-400/20 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-red-300/10 scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md" />
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
      `}</style>
    </main>
  )
}

MMIDPage.meta = {
  title: "Military Medical Industry Days (MMID) - Preparatory Webinar Library",
  description:
    "Access our comprehensive video library of MMID preparatory webinar sessions designed to help you navigate the military medical innovation and research ecosystem.",
}
