"use client"

import React, { useRef, useCallback, useMemo, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { RiArrowRightUpLine } from "@remixicon/react"
import { HeroTitle } from "./HeroTitle"
import { VideoPlayer } from "./VideoPlayer"
import { Button } from "../Button"
import { FadeDiv } from "../Fade"
import { TitleParticleEffect } from "./TitleParticleEffect"

interface MobileHeroVideoProps {
  prefersReducedMotion: boolean
}

export const MobileHeroVideo = React.memo(({ prefersReducedMotion }: MobileHeroVideoProps) => {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const animationTrigger = useMemo(() => scrollYProgress, [])
  const stickyTitleOpacity = useTransform(scrollYProgress, [0, 0.7, 0.9], [1, 0.8, 0])

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

  // Simplified fade in animation
  const fadeInUp = useMemo(
    () => ({
      initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
    [prefersReducedMotion],
  )

  const [currentScrollProgress, setCurrentScrollProgress] = useState(0)
  const [currentTitleOpacity, setCurrentTitleOpacity] = useState(1)

  useEffect(() => {
    const unsubscribeScroll = scrollYProgress.on("change", setCurrentScrollProgress)
    const unsubscribeOpacity = stickyTitleOpacity.on("change", setCurrentTitleOpacity)

    return () => {
      unsubscribeScroll()
      unsubscribeOpacity()
    }
  }, [scrollYProgress, stickyTitleOpacity])

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-[#101310] overflow-hidden"
      aria-label="Hero section with background video"
    >
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#101310] focus:rounded-md focus:outline-none focus:ring-2 focus:ring-bexar-blue"
        onKeyDown={handleSkipLink}
      >
        Skip to main content
      </a>

      {/* Fixed Sticky Hero Title Box */}
      <motion.div
        className="fixed top-16 left-0 right-0 z-40 pointer-events-none"
        style={{
          opacity: stickyTitleOpacity,
        }}
      >
        <HeroTitle animationProgress={animationTrigger} prefersReducedMotion={prefersReducedMotion} isMobile={true} />
        <TitleParticleEffect
          scrollProgress={currentScrollProgress}
          titleOpacity={currentTitleOpacity}
          prefersReducedMotion={prefersReducedMotion}
        />
      </motion.div>

      {/* Scrolling Content Container */}
      <div className="relative z-10">
        <div className="px-4 sm:px-6 py-6 space-y-6">
          {/* Spacer to prevent text from being cut off by sticky title */}
          <div className="h-40" aria-hidden="true" />

          {/* Video Section - Moved above hero content */}
          <motion.div className="relative w-full max-w-4xl mx-auto overflow-hidden z-20 rounded-3xl">
            {/* Mobile-optimized video container */}
            <div
              className="-mt-6 relative w-full bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10"
              style={{ aspectRatio: "4/5" }}
            >
              <VideoPlayer
                prefersReducedMotion={prefersReducedMotion}
                className="w-full h-full object-cover rounded-3xl"
                style={{
                  borderRadius: "inherit",
                }}
              />
            </div>
          </motion.div>

          {/* Spacer between video and content */}
          <div className="h-8" aria-hidden="true" />

          {/* Hero Content - Now below the video - Simplified animations */}
          <div className="space-y-6 md:space-y-8">
            {/* Paragraph content - Removed complex blur effects */}
            <div>
              <FadeDiv>
                <motion.p
                  className="text-lg sm:text-xl text-white/95 leading-relaxed -mt-10 max-w-4xl text-balance tracking-tight font-medium"
                  {...fadeInUp}
                  style={{
                    textShadow: "0 3px 15px rgba(0,0,0,0.8)",
                    lineHeight: "1.4",
                  }}
                >
                  The AIM Health R&D Summit brings together top innovators from academia, industry, and the military to
                  accelerate the research, development, and commercialization of transformative medical technologies.
                </motion.p>
              </FadeDiv>

              <FadeDiv>
                <motion.p
                  className="text-base sm:text-lg text-white/90 leading-relaxed mt-6 max-w-4xl text-balance tracking-tight"
                  {...fadeInUp}
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                    lineHeight: "1.5",
                  }}
                >
                  This unique convergence of thought leaders creates pathways to discovery and commercialization while
                  addressing critical challenges in both military and civilian healthcare.
                </motion.p>
              </FadeDiv>
            </div>

            {/* Buttons - Simplified animations */}
            <div className="flex flex-col gap-4 w-full max-w-md pt-8">
              <FadeDiv>
                <Button
                  variant="primary"
                  href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                  className="text-base py-4 px-8 w-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#548cac] shadow-xl hover:shadow-2xl font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Register Now for AIM Summit (opens in new tab)"
                >
                  <span className="flex items-center justify-center">
                    Register Now
                    <motion.span
                      className="ml-2 size-5"
                      whileHover={prefersReducedMotion ? {} : { x: 2, y: -2 }}
                      aria-hidden="true"
                    >
                      <RiArrowRightUpLine />
                    </motion.span>
                  </span>
                </Button>
              </FadeDiv>

              <FadeDiv>
                <Button
                  variant="secondary"
                  href="https://support.velocitytx.org/campaign/642575/donate"
                  className="text-base py-4 px-8 w-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4f4f2c] shadow-xl hover:shadow-2xl font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Become a Sponsor for AIM Summit (opens in new tab)"
                >
                  <span className="flex items-center justify-center">
                    Become a Sponsor
                    <motion.span
                      className="ml-2 size-5"
                      whileHover={prefersReducedMotion ? {} : { x: 2, y: -2 }}
                      aria-hidden="true"
                    >
                      <RiArrowRightUpLine />
                    </motion.span>
                  </span>
                </Button>
              </FadeDiv>
            </div>
          </div>

          {/* Minimal breathing room after content */}
          <div className="h-20" />
        </div>
      </div>

      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#101310] via-[#101310] to-[#0a0f0a] pointer-events-none z-0" />
    </section>
  )
})

MobileHeroVideo.displayName = "MobileHeroVideo"
