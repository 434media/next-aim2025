"use client"

import React, { useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { RiArrowRightUpLine } from "@remixicon/react"
import { Button } from "../Button"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function HeroVideo() {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoError, setIsVideoError] = useState(false)

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
  }

  const handleVideoError = () => {
    setIsVideoError(true)
  }

  const handleSkipLink = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const mainContent = document.querySelector("#main-content")
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-4rem)] mt-16 md:mt-24 lg:pt-0 flex flex-col lg:flex-row items-stretch overflow-hidden bg-[#101310]"
      aria-label="Hero section with background video"
    >
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#101310] focus:rounded-md focus:outline-none focus:ring-2 focus:ring-bexar-blue"
        onKeyDown={handleSkipLink}
      >
        Skip to main content
      </a>

      {/* Left Content Section */}
      <motion.div
        className="relative w-full lg:w-1/2 flex items-center z-10 order-1"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.div
          className="w-full h-full absolute inset-0 bg-aim-navy/95 border-b md:border-r border-bexar-blue/20"
          initial={{ filter: "blur(4px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          aria-hidden="true"
        />
        <div className="relative w-full max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-0">
          <div className="space-y-8 sm:space-y-12">
            <motion.div className="space-y-8" variants={stagger}>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight text-balance"
                variants={fadeInUp}
              >
                <span className="block mb-2 sm:mb-4">Accelerating Innovation</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#548cac] to-[#4f4f2c]">
                  in Military Medicine
                </span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed text-balance"
                variants={fadeInUp}
              >
                The <strong className="text-[#548cac]">AIM Health R&D Summit</strong> is a premier platform for driving
                innovation in life sciences, bringing together academia, industry, and the military. Join us in{" "}
                <strong className="text-[#4f4f2c]">Military Health City, USA</strong> for two groundbreaking days
                shaping the future of battlefield medicine.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" variants={fadeInUp}>
                <Button
                  variant="primary"
                  href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                  className="text-lg py-3 px-8 w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex items-center justify-center">
                    Register Now
                    <RiArrowRightUpLine className="ml-2 size-5" aria-hidden="true" />
                  </span>
                </Button>
                <Button
                  variant="secondary"
                  href="https://drive.google.com/file/d/1-RqS13xFyYj5ivO5bmyYfAAWfgW5apBf/view?ts=67b8b8c3"
                  className="text-lg py-3 px-8 w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex items-center justify-center">
                    Become a Sponsor
                    <RiArrowRightUpLine className="ml-2 size-5" aria-hidden="true" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right Video Section */}
      <div className="relative w-full lg:w-1/2 order-2 min-h-[50vh]">
        <motion.div className="absolute inset-0" aria-hidden="true">
          <AnimatePresence>
            {!isVideoLoaded && !isVideoError && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="loading-spinner" role="status">
                  <VisuallyHidden>Loading video</VisuallyHidden>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-poster.png"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            aria-hidden="true"
          >
            <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Cut+Down.mp4" type="video/mp4" />
            <track kind="captions" src="/captions.vtt" label="English captions" />
          </video>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#548cac]/5 to-[#4f4f2c]/5 bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  )
}

