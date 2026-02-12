"use client"

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useReducedMotion } from "../../hooks/useReducedMotion"
import { Button } from "../Button"
import { EditableText } from "../admin/EditableText"

export const HeroTextSection = React.memo(() => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)
  const [showWordSwitch, setShowWordSwitch] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform values for animations - much tighter timing
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [0.9, 1])
  const titleY = useTransform(scrollYProgress, [0, 0.15], [50, 0])

  // Word switch animation trigger - happens quickly after title appears
  const wordSwitchTrigger = useTransform(scrollYProgress, [0.15, 0.3], [0, 1])

  // Content reveal animation - appears sooner on desktop to reduce scroll gap
  const contentOpacity = useTransform(scrollYProgress, [0.12, 0.26], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.12, 0.26], [20, 0])
  const contentScale = useTransform(scrollYProgress, [0.12, 0.26], [0.99, 1])

  // Background color transition
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  // Listen for scroll progress changes
  useEffect(() => {
    const unsubscribeWordSwitch = wordSwitchTrigger.on("change", (value) => {
      setShowWordSwitch(value > 0.5)
    })

    const unsubscribeContent = contentOpacity.on("change", (value) => {
      setShowContent(value > 0.1)
    })

    return () => {
      unsubscribeWordSwitch()
      unsubscribeContent()
    }
  }, [wordSwitchTrigger, contentOpacity])

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

  // Mobile version with improved layout
  if (isMobile) {
    return (
      <section
        ref={containerRef}
        className="relative overflow-hidden min-h-[85vh] bg-gradient-to-tr from-slate-900 via-neutral-950 to-black"
        aria-label="Hero text section"
      >
        {/* Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gray-900 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={handleSkipLink}
        >
          Skip to main content
        </a>

        {/* Mobile Layout - slightly shorter than full screen to reduce dead space */}
        <div className="sticky top-0 h-[85vh] flex flex-col items-center justify-center px-4 z-10">
          <motion.div
            className="text-center w-full max-w-lg mx-auto flex-1 flex flex-col justify-center"
            style={{
              opacity: titleOpacity,
              scale: titleScale,
              y: titleY,
            }}
          >
            {/* Mobile Title - Military Medicine on same line */}
            <h1 className="text-5xl sm:text-6xl font-black leading-[0.8] tracking-tight mb-3">
              <motion.span
                className="text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <EditableText textId="hero-title-prefix" page="home" section="hero">
                  The Future of
                </EditableText>
                {" "}
                <EditableText
                  textId="hero-title-highlight"
                  page="home"
                  section="hero"
                  className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent whitespace-nowrap tracking-tighter"
                >
                  Military Medicine
                </EditableText>
                {" "}
                <EditableText textId="hero-title-starts" page="home" section="hero">
                  Starts
                </EditableText>
                {" "}
                <AnimatePresence mode="wait">
                  {!showWordSwitch ? (
                    <motion.span
                      key="here-mobile"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, rotateX: -90 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <EditableText
                        textId="hero-title-here"
                        page="home"
                        section="hero"
                        className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                      >
                        Here
                      </EditableText>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="now-mobile"
                      initial={{ opacity: 0, rotateX: 90 }}
                      animate={{ opacity: 1, rotateX: 0 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <EditableText
                        textId="hero-title-now"
                        page="home"
                        section="hero"
                        className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent"
                      >
                        Now
                      </EditableText>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
            </h1>

            {/* Content directly below title - no animations, immediate display */}
            <motion.div
              className="space-y-4"
              style={{
                opacity: contentOpacity,
                y: contentY,
                scale: contentScale,
              }}
            >
              <p className="mt-4 text-lg sm:text-xl font-light text-gray-200 leading-relaxed max-w-md mx-auto tracking-tight">
                <EditableText
                  textId="hero-main-description"
                  page="home"
                  section="hero"
                  multiline
                >
                  Join military and civilian leaders, researchers, and innovators to explore breakthrough technologies, share cutting-edge research, and forge partnerships that will transform healthcare for our service members and beyond.
                </EditableText>
              </p>

              <div>
                <Button
                  href={"https://whova.com/portal/registration/D7sdZXdTCppF1KMzet5O/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 shadow-xl shadow-blue-500/25 border-0"
                >
                  Register Now
                  <svg className="ml-2 w-5 h-5 inline-flex" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  // Desktop version (tuned for tighter scroll)
  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden min-h-[100vh]"
      aria-label="Hero text section"
    >
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gray-900 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={handleSkipLink}
      >
        Skip to main content
      </a>

      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-neutral-950 to-black"
        style={{ opacity: backgroundOpacity }}
      />

      {/* Sticky Title (slightly shorter than full viewport to bring content closer) */}
      <div className="sticky top-0 h-[90vh] lg:h-[85vh] xl:h-[80vh] flex items-center justify-center z-10">
        <motion.div
          className="text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          style={{
            opacity: titleOpacity,
            scale: titleScale,
            y: titleY,
          }}
        >
          {/* Main Title with Word Switch Animation */}
          <div className="relative">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-black leading-[0.85] tracking-tight mb-4">
              <motion.span
                className="block mb-2 sm:mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <EditableText textId="hero-title-prefix" page="home" section="hero">
                  The Future of
                </EditableText>
              </motion.span>
              <motion.span
                className="block mb-2 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <EditableText
                  textId="hero-title-highlight"
                  page="home"
                  section="hero"
                  className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                >
                  Military Medicine
                </EditableText>
              </motion.span>
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <EditableText textId="hero-title-starts" page="home" section="hero">
                  Starts
                </EditableText>
                <AnimatePresence mode="wait">
                  {!showWordSwitch ? (
                    <motion.span
                      key="here"
                      initial={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -30, rotateX: -90 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      className="inline-block ml-4"
                      style={{ transformOrigin: "center bottom" }}
                    >
                      <EditableText
                        textId="hero-title-here"
                        page="home"
                        section="hero"
                        className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                      >
                        Here
                      </EditableText>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="now"
                      initial={{ opacity: 0, y: 30, rotateX: 90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      className="inline-block ml-4"
                      style={{ transformOrigin: "center bottom" }}
                    >
                      <EditableText
                        textId="hero-title-now"
                        page="home"
                        section="hero"
                        className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent"
                      >
                        Now
                      </EditableText>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Content Section - Overlaps upward to minimize scroll between title and content */}
      <motion.div
        className="relative z-20 -mt-10 sm:-mt-12 lg:-mt-20 xl:-mt-24"
        style={{
          opacity: contentOpacity,
          y: contentY,
          scale: contentScale,
        }}
      >
        <div className="bg-gradient-to-b from-transparent via-slate-900/70 to-slate-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
            <div className="text-center max-w-4xl mx-auto">
              {/* Paragraph Text - Now Editable by Admins */}
              <motion.div
                className="mb-12 sm:mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <EditableText
                  textId="hero-main-description"
                  as="p"
                  page="home"
                  section="hero"
                  multiline
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 leading-relaxed tracking-tighter"
                >
                  Join military and civilian leaders, researchers, and innovators to explore breakthrough technologies, share cutting-edge research, and forge partnerships that will transform healthcare for our service members and beyond.
                </EditableText>
              </motion.div>

              {/* Get Involved Button */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={showContent ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <Button
                  href={"https://whova.com/portal/registration/D7sdZXdTCppF1KMzet5O/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="text-xl sm:text-2xl px-12 py-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 shadow-2xl shadow-blue-500/25 border-0 hover:shadow-blue-500/40 transition-all duration-300"
                >
                  Register Now
                  <motion.svg
                    className="ml-3 w-6 h-6 inline-flex"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
})

HeroTextSection.displayName = "HeroTextSection"
