"use client"

import React, { useRef, useCallback } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { HeroTitle } from "./HeroTitle"
import { VideoPlayer } from "./VideoPlayer"
import { TitleParticleEffect } from "./TitleParticleEffect"
import { RiArrowRightUpLine } from "@remixicon/react"

interface DesktopHeroVideoProps {
  prefersReducedMotion: boolean
}

export const DesktopHeroVideo = React.memo(({ prefersReducedMotion }: DesktopHeroVideoProps) => {
  const containerRef = useRef<HTMLElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Animation triggers
  const animationTrigger = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  // Sticky title visibility - only visible within hero section
  const stickyTitleOpacity = useTransform(scrollYProgress, [0, 0.7, 0.95], [1, 0.9, 0])

  // Text blur effects when content touches sticky title
  const textBlur = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.25],
    ["blur(0px)", "blur(0px)", "blur(6px)", "blur(0px)"],
  )
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [1, 1, 0.4, 1])

  const handleSkipLink = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        const mainContent = document.querySelector("#main-content")
        if (mainContent) {
          mainContent.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
        }
      }
    },
    [prefersReducedMotion],
  )

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-[100vh] flex flex-row items-stretch overflow-hidden bg-[#101310]"
        aria-label="Hero section with background video"
        id="hero-section"
      >
        {/* Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#101310] focus:rounded-md focus:outline-none focus:ring-2 focus:ring-bexar-blue"
          onKeyDown={handleSkipLink}
        >
          Skip to main content
        </a>

        {/* Sticky Hero Title - Only visible within hero section */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 z-30 pointer-events-none"
          style={{
            opacity: stickyTitleOpacity,
            position: "sticky",
            top: "5rem", // Account for navbar height
            willChange: "opacity",
          }}
        >
          {/* Enhanced solid dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#101310] via-[#101310] to-[#101310]/95 shadow-2xl border-r border-white/10"></div>

          <div className="relative">
            {/* Enhanced brightness and contrast for the title */}
            <div className="brightness-125 contrast-110 saturate-110">
              <HeroTitle
                animationProgress={animationTrigger}
                prefersReducedMotion={prefersReducedMotion}
                isMobile={false}
                className="py-8 px-8 lg:px-12"
              />
            </div>

            {/* Enhanced Particle Effect with better performance */}
            {!prefersReducedMotion && (
              <TitleParticleEffect
                scrollProgress={scrollYProgress.get()}
                titleOpacity={stickyTitleOpacity.get()}
                prefersReducedMotion={prefersReducedMotion}
              />
            )}
          </div>
        </motion.div>

        {/* Left Content Section - 50% width */}
        <div className="relative w-1/2 h-full flex flex-col justify-between">
          {/* Scrolling Content that flows behind sticky title */}
          <div className="relative px-8 lg:px-12">
            {/* Spacer to account for sticky title */}
            <div className="h-80" aria-hidden="true" />

            {/* Content that will scroll past the sticky title */}
            <div className="space-y-10 lg:space-y-12">
              {/* First paragraph with blur effects when touching sticky title */}
              <motion.div
                style={{
                  filter: textBlur,
                  opacity: textOpacity,
                }}
              >
                <motion.p
                  className="text-xl sm:text-2xl md:text-3xl text-white/95 leading-relaxed max-w-4xl text-balance tracking-tight font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    textShadow: "0 3px 15px rgba(0,0,0,0.8)",
                    lineHeight: "1.4",
                  }}
                >
                  The AIM Health R&D Summit brings together top innovators from academia, industry, and the military to
                  accelerate the research, development, and commercialization of transformative medical technologies.
                </motion.p>
              </motion.div>

              {/* Second paragraph - no blur effects */}
              <div className="space-y-6 md:space-y-8">
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl text-balance tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                    lineHeight: "1.5",
                  }}
                >
                  This unique convergence of thought leaders creates pathways to discovery and commercialization while
                  addressing critical challenges in both military and civilian healthcare.
                </motion.p>
              </div>
            </div>
          </div>

          {/* CTA Buttons - positioned at bottom to align with video */}
          <motion.div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 px-8 lg:px-12 py-16 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <motion.a
              href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-[#548cac] text-lg sm:text-lg py-4 px-8 md:py-5 md:px-10 w-full sm:w-auto text-white shadow-xl hover:shadow-2xl font-semibold transition-all duration-200 hover:bg-[#548cac]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548cac] focus-visible:ring-offset-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Register Now for AIM Summit (opens in new tab)"
            >
              <span className="flex items-center justify-center">
                Register Now
                <motion.span className="ml-2 size-5 md:size-6" whileHover={{ x: 2, y: -2 }} aria-hidden="true">
                  <RiArrowRightUpLine />
                </motion.span>
              </span>
            </motion.a>

            <motion.a
              href="https://support.velocitytx.org/campaign/642575/donate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-[#4f4f2c] text-lg sm:text-lg py-4 px-8 md:py-5 md:px-10 w-full sm:w-auto text-white shadow-xl hover:shadow-2xl font-semibold transition-all duration-200 hover:bg-[#4f4f2c]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f4f2c] focus-visible:ring-offset-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Become a Sponsor for AIM Summit (opens in new tab)"
            >
              <span className="flex items-center justify-center">
                Become a Sponsor
                <motion.span className="ml-2 size-5 md:size-6" whileHover={{ x: 2, y: -2 }} aria-hidden="true">
                  <RiArrowRightUpLine />
                </motion.span>
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* Right Video Section - 50% width, aligned with CTA buttons */}
        <div className="relative w-1/2 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center">
            <VideoPlayer prefersReducedMotion={prefersReducedMotion} className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* Transition Buffer Zone */}
      <div className="h-32 bg-gradient-to-b from-[#101310] to-transparent relative z-10" aria-hidden="true" />
    </>
  )
})

DesktopHeroVideo.displayName = "DesktopHeroVideo"
