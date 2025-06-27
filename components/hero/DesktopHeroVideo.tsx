"use client"

import React, { useRef, useCallback, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "motion/react"
import { HeroTitle } from "./HeroTitle"
import { VideoPlayer } from "./VideoPlayer"
import { TitleParticleEffect } from "./TitleParticleEffect"

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
        className="relative bg-[#101310] overflow-hidden"
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

        {/* Main Hero Layout */}
        <div className="flex flex-row h-screen overflow-hidden">
          {/* Left Content Section - 50% width */}
          <div className="w-1/2 h-screen overflow-hidden">
            {/* Sticky Header */}
            <motion.header
              className="sticky top-4 z-20 w-full bg-gradient-to-b from-[#101310] via-[#101310] to-transparent pt-8 pb-8 px-8"
              style={{
                opacity: headerOpacity,
                scale: headerScale,
                y: headerY,
              }}
            >
              <div className="max-w-7xl mx-auto">
                <div className="brightness-125 contrast-110 saturate-110">
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

            {/* Scrollable Content - This is what drives the Here/Now change */}
            <div
              ref={contentRef}
              className="h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#38BDF8]/20 scrollbar-track-transparent"
            >
              <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="max-w-4xl mx-auto space-y-32 pb-32">
                  {/* First paragraph */}
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="flex items-start space-x-6">
                      <div className="mt-2">
                        <motion.div
                          className="w-1 h-24 bg-gradient-to-b from-[#7DD3FC] to-transparent rounded-full"
                          animate={{ height: [0, 96] }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                      <div>
                        <p className="text-3xl xl:text-4xl 2xl:text-5xl text-gray-200 leading-relaxed font-light">
                          The AIM Health R&D Summit brings together top innovators from academia, industry, and the
                          military to accelerate the research, development, and commercialization of{" "}
                          <span className="text-[#7DD3FC] font-semibold group-hover:text-sky-300 transition-colors duration-300">
                            transformative medical technologies
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Second paragraph */}
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <div className="flex items-start space-x-6">
                      <div className="mt-2">
                        <motion.div
                          className="w-1 h-24 bg-gradient-to-b from-[#7DD3FC] to-transparent rounded-full"
                          animate={{ height: [0, 96] }}
                          transition={{ duration: 1.5, delay: 1 }}
                        />
                      </div>
                      <div>
                        <p className="text-3xl xl:text-4xl 2xl:text-5xl text-gray-200 leading-relaxed font-light">
                          This unique convergence of thought leaders creates pathways to discovery and commercialization
                          while addressing critical challenges in{" "}
                          <span className="text-white font-semibold group-hover:text-gray-100 transition-colors duration-300">
                            military and civilian healthcare
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Third paragraph */}
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <div className="flex items-start space-x-6">
                      <div className="mt-2">
                        <motion.div
                          className="w-1 h-24 bg-gradient-to-b from-[#7DD3FC] to-transparent rounded-full"
                          animate={{ height: [0, 96] }}
                          transition={{ duration: 1.5, delay: 1.5 }}
                        />
                      </div>
                      <div>
                        <p className="text-3xl xl:text-4xl 2xl:text-5xl text-gray-200 leading-relaxed font-light">
                          Join us in shaping the future of healthcare innovation through{" "}
                          <span className="text-[#7DD3FC] font-semibold group-hover:text-sky-300 transition-colors duration-300">
                            collaboration, breakthrough research, and transformative partnerships
                          </span>{" "}
                          that save lives.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Fourth paragraph */}
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <div className="flex items-start space-x-6">
                      <div className="mt-2">
                        <motion.div
                          className="w-1 h-24 bg-gradient-to-b from-[#38BDF8] to-transparent rounded-full"
                          animate={{ height: [0, 96] }}
                          transition={{ duration: 1.5, delay: 2 }}
                        />
                      </div>
                      <div>
                        <p className="text-2xl xl:text-3xl 2xl:text-4xl text-gray-200 leading-relaxed font-light">
                          Through collaborative partnerships and innovative thinking, we continue to drive breakthroughs
                          that transform healthcare delivery and improve outcomes for{" "}
                          <span className="text-white font-semibold group-hover:text-gray-100 transition-colors duration-300">
                            military personnel and civilians alike
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Fifth paragraph */}
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  >
                    <div className="flex items-start space-x-6">
                      <div className="mt-2">
                        <motion.div
                          className="w-1 h-24 bg-gradient-to-b from-[#0EA5E9] to-transparent rounded-full"
                          animate={{ height: [0, 96] }}
                          transition={{ duration: 1.5, delay: 2.5 }}
                        />
                      </div>
                      <div>
                        <p className="text-2xl xl:text-3xl 2xl:text-4xl text-gray-200 leading-relaxed font-light">
                          Our commitment to innovation extends beyond the summit, fostering year-round collaboration and
                          knowledge sharing that drives{" "}
                          <span className="text-[#0EA5E9] font-semibold group-hover:text-sky-300 transition-colors duration-300">
                            continuous advancement in medical research
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Sixth paragraph */}
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <div className="flex items-start space-x-6">
                      <div className="mt-2">
                        <motion.div
                          className="w-1 h-24 bg-gradient-to-b from-[#06B6D4] to-transparent rounded-full"
                          animate={{ height: [0, 96] }}
                          transition={{ duration: 1.5, delay: 3 }}
                        />
                      </div>
                      <div>
                        <p className="text-2xl xl:text-3xl 2xl:text-4xl text-gray-200 leading-relaxed font-light">
                          Together, we are building a future where medical innovation knows no boundaries, where
                          breakthrough discoveries translate into{" "}
                          <span className="text-[#06B6D4] font-semibold group-hover:text-cyan-300 transition-colors duration-300">
                            life-saving solutions for all
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </motion.div>
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
      <div className="h-32 bg-gradient-to-b from-[#101310] to-transparent relative z-10" aria-hidden="true" />
    </>
  )
})

DesktopHeroVideo.displayName = "DesktopHeroVideo"
