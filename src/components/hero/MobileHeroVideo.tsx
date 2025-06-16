"use client"

import React, { useRef, useCallback, useMemo, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { HeroTitle } from "./HeroTitle"
import { VideoPlayer } from "./VideoPlayer"
import { FadeDiv } from "../Fade"
import { TitleParticleEffect } from "./TitleParticleEffect"

interface MobileHeroVideoProps {
  prefersReducedMotion: boolean
}

export const MobileHeroVideo = React.memo(({ prefersReducedMotion }: MobileHeroVideoProps) => {
  const containerRef = useRef<HTMLElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const stickyTitleOpacity = useTransform(scrollYProgress, [0, 0.7, 0.9], [1, 0.8, 0])

  // Listen for mobile menu state changes
  useEffect(() => {
    const checkMobileMenu = () => {
      // Check if mobile menu is open by looking for the backdrop element
      const backdrop = document.querySelector('[aria-hidden="true"].fixed.inset-0.bg-black\\/60')
      setIsMobileMenuOpen(!!backdrop)
    }

    // Check initially
    checkMobileMenu()

    // Set up observer to watch for mobile menu changes
    const observer = new MutationObserver(checkMobileMenu)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"],
    })

    return () => observer.disconnect()
  }, [])

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
    // Use a throttled update to reduce the frequency of state changes during scroll
    let lastUpdateTime = 0
    const THROTTLE_MS = 16 // Approximately 60fps

    const handleScrollUpdate = (latest: number) => {
      const now = performance.now()
      if (now - lastUpdateTime < THROTTLE_MS) return

      lastUpdateTime = now
      setCurrentScrollProgress(latest)
    }

    const handleOpacityUpdate = (latest: number) => {
      const now = performance.now()
      if (now - lastUpdateTime < THROTTLE_MS) return

      lastUpdateTime = now
      setCurrentTitleOpacity(latest)
    }

    const unsubscribeScroll = scrollYProgress.on("change", handleScrollUpdate)
    const unsubscribeOpacity = stickyTitleOpacity.on("change", handleOpacityUpdate)

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

      {/* Fixed Sticky Hero Title Box - Hide when mobile menu is open */}
      <motion.div
        className="fixed top-16 left-0 right-0 z-30 pointer-events-none"
        style={{
          opacity: isMobileMenuOpen ? 0 : stickyTitleOpacity,
          willChange: "opacity",
          visibility: isMobileMenuOpen ? "hidden" : "visible",
        }}
      >
        <HeroTitle animationProgress={scrollYProgress} prefersReducedMotion={prefersReducedMotion} isMobile={true} />
        {!prefersReducedMotion && currentTitleOpacity > 0.1 && !isMobileMenuOpen && (
          <TitleParticleEffect
            scrollProgress={currentScrollProgress}
            titleOpacity={currentTitleOpacity}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
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
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
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
