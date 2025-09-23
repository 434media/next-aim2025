"use client"

import React, { useRef } from "react"
import { motion } from "motion/react"
import { RiArrowRightUpLine } from "@remixicon/react"

export const HeroVideo = React.memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Responsive video: full screen on desktop (16:9), 4:5 aspect ratio on mobile
  return (
    <section
      className="relative w-full h-screen lg:h-screen aspect-[4/5] lg:aspect-auto overflow-hidden bg-black"
      aria-label="Hero video section with responsive aspect ratios"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="https://ampd-asset.s3.us-east-2.amazonaws.com/aimhero-short.png"
        aria-label="AIM Summit promotional video"
      >
        <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Cut+Down+Website.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-black/20" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 lg:p-8"
      >
        <div className="max-w-5xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4">AIM 2026 ANNOUNCED!</h1>
              <div className="flex items-center space-x-8 text-white/90">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide">HENRY B. GONZÁLEZ</p>
                  <p className="text-sm font-medium uppercase tracking-wide">CONVENTION CENTER</p>
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide">JOIN US</p>
                  <p className="text-sm font-medium uppercase tracking-wide">MAY 19, 2026</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-4">
              <a
                href="https://whova.com/portal/registration/D7sdZXdTCppF1KMzet5O/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 shadow-xl shadow-blue-500/25 border-0 text-white font-bold rounded-lg transition-all duration-300"
                >
                  Get Tickets <RiArrowRightUpLine className="inline size-4 ml-1" />
                </motion.button>
              </a>
              <div className="text-sm text-white/70 font-medium text-center max-w-[200px]">
                Interested in sponsoring or exhibiting?{" "}
                <a
                  href="https://support.velocitytx.org/campaign/726139/donate"
                  className="text-white/90 hover:text-white underline underline-offset-2 transition-colors"
                >
                  Contact us
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden text-center">
            <h1 className="text-3xl font-bold text-white mb-6">AIM 2026 ANNOUNCED!</h1>
            <div className="grid grid-cols-1 gap-4 mb-6 text-white/90">
              <div className="text-center">
                <p className="text-xs font-medium uppercase tracking-wide">HENRY B. GONZÁLEZ CONVENTION CENTER</p>
                <p className="text-xs font-medium uppercase tracking-wide mt-2">JOIN US MAY 19, 2026</p>
              </div>
            </div>
            <a
              href="https://whova.com/portal/registration/D7sdZXdTCppF1KMzet5O/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full text-lg px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 shadow-xl shadow-blue-500/25 border-0 text-white font-bold rounded-lg transition-all duration-300"
              >
                Get Tickets <RiArrowRightUpLine className="inline size-4 ml-1" />
              </motion.button>
            </a>
            <span className="block text-sm text-white/70 font-medium mt-4">
              Interested in sponsoring or exhibiting?{" "}
              <a
                href="https://support.velocitytx.org/campaign/726139/donate"
                className="text-white/90 hover:text-white underline underline-offset-2 transition-colors"
              >
                Contact us
              </a>
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
})

HeroVideo.displayName = "HeroVideo"
