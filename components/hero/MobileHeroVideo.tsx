"use client"

import React, { useRef, useCallback, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { HeroTitle } from "./HeroTitle"
import { VideoPlayer } from "./VideoPlayer"
import { TitleParticleEffect } from "./TitleParticleEffect"
import { HeroContent } from "./HeroContent"

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
      className="relative h-[216vh] bg-white overflow-hidden"
      aria-label="Hero section with background video"
    >
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gray-900 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-bexar-blue"
        onKeyDown={handleSkipLink}
      >
        Skip to main content
      </a>

      {/* Fixed Sticky Hero Title - Light background styling */}
      <motion.div
        className="fixed top-24 left-0 right-0 z-30 pointer-events-none bg-white py-4 px-4 sm:px-6 border-b border-gray-200"
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

      {/* Scrolling Content Container with improved typography */}
      <div className="relative z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8 max-w-4xl mx-auto">
          {/* Increased spacer to prevent text from being cut off by sticky title */}
          <div className="h-48" aria-hidden="true" />

          {/* Video Section - Moved above hero content with improved container */}
          <motion.div className="relative w-full max-w-3xl mx-auto overflow-hidden z-20 rounded-3xl mt-10">
            {/* Mobile-optimized video container */}
            <div
              className="relative w-full bg-white/20 backdrop-blur-sm rounded-3xl border border-gray-200"
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

          {/* Hero Content with improved typography container */}
          <div className="max-w-3xl mx-auto -mt-16 pb-32">
            <HeroContent
              isMobile={true}
              firstParagraphStyle={
                {
                  // Remove inline font size to use responsive classes
                }
              }
              secondParagraphStyle={
                {
                  // Remove inline font size to use responsive classes
                }
              }
            />
          </div>

          {/* Increased breathing room after content to ensure CTA button is visible */}
          <div className="h-60" />
        </div>
      </div>
    </section>
  )
})

MobileHeroVideo.displayName = "MobileHeroVideo"
