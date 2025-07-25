"use client"

import React, { useRef, useCallback, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "motion/react"
import { HeroTitle } from "./HeroTitle"
import { VideoPlayer } from "./VideoPlayer"
import { TitleParticleEffect } from "./TitleParticleEffect"
import { HeroContent } from "./HeroContent"

interface DesktopHeroVideoProps {
  prefersReducedMotion: boolean
}

export const DesktopHeroVideo = React.memo(({ prefersReducedMotion }: DesktopHeroVideoProps) => {
  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Create motion value for content scroll progress
  const contentScrollProgress = useMotionValue(0)

  // Custom scroll listener for the content area
  useEffect(() => {
    const contentElement = contentRef.current
    if (!contentElement) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = contentElement
      const maxScroll = scrollHeight - clientHeight
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0
      contentScrollProgress.set(progress)
    }

    contentElement.addEventListener("scroll", handleScroll, { passive: true })
    return () => contentElement.removeEventListener("scroll", handleScroll)
  }, [contentScrollProgress])

  // Create animation trigger from the motion value
  const animationTrigger = useTransform(contentScrollProgress, [0, 0.1], [0, 1])

  // Sticky title effects - responds to page scroll when hero is in view
  const { scrollYProgress: pageScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const headerOpacity = useTransform(pageScrollProgress, [0, 0.1, 0.9, 1], [1, 1, 0.95, 0.9])
  const headerScale = useTransform(pageScrollProgress, [0, 0.5, 1], [1, 0.98, 0.96])
  const headerY = useTransform(pageScrollProgress, [0, 1], [0, -20])

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
        className="relative bg-white overflow-hidden"
        aria-label="Hero section with background video"
        id="hero-section"
      >
        {/* Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gray-900 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-bexar-blue"
          onKeyDown={handleSkipLink}
        >
          Skip to main content
        </a>

        {/* Main Hero Layout */}
        <div className="flex flex-row h-screen overflow-hidden">
          {/* Left Content Section - 50% width with improved typography container */}
          <div className="w-1/2 h-screen overflow-hidden bg-white">
            {/* Sticky Header */}
            <motion.header
              className="sticky top-4 z-20 w-full bg-white pt-8 pb-8 px-6 lg:px-8 xl:px-12"
              style={{
                opacity: headerOpacity,
                scale: headerScale,
                y: headerY,
              }}
            >
              <div className="max-w-7xl mx-auto">
                <div className="brightness-100 contrast-100 saturate-100">
                  <HeroTitle
                    animationProgress={animationTrigger}
                    prefersReducedMotion={prefersReducedMotion}
                    isMobile={false}
                    className="py-6 w-full"
                  />
                </div>

                {/* Particle Effect */}
                {!prefersReducedMotion && (
                  <TitleParticleEffect
                    scrollProgress={contentScrollProgress.get()}
                    titleOpacity={headerOpacity.get()}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                )}
              </div>
            </motion.header>

            {/* Scrollable Content with improved typography container */}
            <div
              ref={contentRef}
              className="h-[calc(100vh-330px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-track-transparent bg-white"
            >
              <div className="max-w-6xl mx-auto px-6 lg:px-8 xl:px-12 py-12 bg-white -mt-6">
                {/* Typography container with optimal reading width */}
                <div className="max-w-5xl">
                  <HeroContent
                    isMobile={false}
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
              </div>
            </div>
          </div>

          {/* Right Video Section - 50% width */}
          <div className="w-1/2 relative">
            <div className="sticky top-0 h-screen">
              <VideoPlayer prefersReducedMotion={prefersReducedMotion} className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Transition Buffer Zone */}
      <div className="h-32 bg-white relative z-10" aria-hidden="true" />
    </>
  )
})

DesktopHeroVideo.displayName = "DesktopHeroVideo"
