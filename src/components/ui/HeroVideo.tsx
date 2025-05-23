"use client"

import React from "react"
import { useRef, useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { RiArrowRightUpLine } from "@remixicon/react"
import { Button } from "../Button"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import Image from "next/image"

// Custom hooks for better organization
const useScrollDetection = (threshold = 100) => {
  const [showNow, setShowNow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowNow(window.scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return showNow
}

const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}

const useVideoManager = (prefersReducedMotion: boolean) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoError, setIsVideoError] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true)
    setLoadingProgress(100)
  }, [])

  const handleVideoError = useCallback(() => {
    setIsVideoError(true)
  }, [])

  const handleVideoProgress = useCallback(() => {
    if (videoRef.current) {
      const { buffered, duration } = videoRef.current
      if (buffered.length > 0 && duration > 0) {
        const progress = (buffered.end(0) / duration) * 100
        setLoadingProgress(progress)
      }
    }
  }, [])

  const retryVideoLoad = useCallback(() => {
    if (videoRef.current) {
      setIsVideoError(false)
      setIsVideoLoaded(false)
      setLoadingProgress(0)
      videoRef.current.load()
    }
  }, [])

  useEffect(() => {
    if (videoRef.current && prefersReducedMotion) {
      videoRef.current.pause()
    } else if (videoRef.current && isVideoLoaded) {
      videoRef.current.play().catch(() => {
        // Silent catch for autoplay restrictions
      })
    }
  }, [prefersReducedMotion, isVideoLoaded])

  return {
    videoRef,
    isVideoLoaded,
    isVideoError,
    loadingProgress,
    handleVideoLoad,
    handleVideoError,
    handleVideoProgress,
    retryVideoLoad,
  }
}

// Optimized Mobile Particles Component
const MobileParticles = React.memo(() => {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      size: number
      color: string
      left: number
      top: number
      opacity: number
      duration: number
      xOffset: number
      yOffset: number
    }>
  >([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 1,
        color: ["#548cac", "#4f4f2c", "#f97316", "#ffffff"][Math.floor(Math.random() * 4)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 5 + 3,
        xOffset: Math.random() * 50 - 25,
        yOffset: Math.random() * 50 - 25,
      })),
    )
  }, [])

  if (particles.length === 0) return null

  return (
    <motion.div key="mobile-particles-container" className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={`mobile-particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity,
            willChange: "transform",
          }}
          animate={{
            x: [0, particle.xOffset],
            y: [0, particle.yOffset],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  )
})

MobileParticles.displayName = "MobileParticles"

// Enhanced AnimatedHeroText with scroll-driven underline animation
const AnimatedHeroText = React.memo(
  ({ showNow, prefersReducedMotion }: { showNow: boolean; prefersReducedMotion: boolean }) => {
    const [particles, setParticles] = useState<
      Array<{
        id: number
        size: number
        left: number
        top: number
        opacity: number
        xOffset: number
        yOffset: number
        duration: number
        delay: number
      }>
    >([])
    const [isClient, setIsClient] = useState(false)
    const [hasTriggeredUnderline, setHasTriggeredUnderline] = useState(false)

    // Client-side only initialization with more particles for enhanced effect
    useEffect(() => {
      setIsClient(true)
      setParticles(
        Array.from({ length: 20 }, (_, i) => ({
          id: i,
          size: Math.random() * 6 + 2,
          left: Math.random() * 100,
          top: Math.random() * 100,
          opacity: Math.random() * 0.9 + 0.4,
          xOffset: Math.random() * 40 - 20,
          yOffset: Math.random() * 40 - 20,
          duration: Math.random() * 4 + 2,
          delay: Math.random() * 3,
        })),
      )
    }, [])

    // Trigger underline animation on state change
    useEffect(() => {
      if (isClient) {
        setHasTriggeredUnderline(true)
        // Reset trigger after animation completes
        const timer = setTimeout(() => setHasTriggeredUnderline(false), 3500)
        return () => clearTimeout(timer)
      }
    }, [showNow, isClient])

    // Dynamic colors and effects based on state
    const currentText = showNow ? "Now" : "Here"
    const currentGradient = showNow
      ? "bg-gradient-to-r from-[#f97316] via-[#f59e0b] to-[#fbbf24]"
      : "bg-gradient-to-l from-[#548cac] to-[#4f4f2c]"
    const particleColor = showNow ? "#f97316" : "#548cac"
    const secondaryParticleColor = showNow ? "#fbbf24" : "#4f4f2c"

    return (
      <span className="relative inline font-extrabold overflow-hidden">
        {/* Intense particle system with enhanced effects */}
        {!prefersReducedMotion && isClient && particles.length > 0 && (
          <motion.div
            key="hero-text-particles"
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ transform: "scale(1.5)" }}
          >
            {particles.map((particle, index) => (
              <motion.div
                key={`hero-particle-${particle.id}`}
                className="absolute rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: index % 3 === 0 ? secondaryParticleColor : particleColor,
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  opacity: particle.opacity,
                  boxShadow: `0 0 ${particle.size * 4}px ${index % 3 === 0 ? secondaryParticleColor : particleColor}`,
                }}
                animate={{
                  x: [0, particle.xOffset, -particle.xOffset * 0.8, 0],
                  y: [0, particle.yOffset, -particle.yOffset * 0.8, 0],
                  opacity: [particle.opacity, particle.opacity * 0.1, particle.opacity * 0.9, particle.opacity],
                  scale: [1, 2, 0.5, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: particle.delay,
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Enhanced orbiting particles with more intensity */}
        {!prefersReducedMotion && isClient && (
          <motion.div
            key="hero-text-orbiting-particles"
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={`orbit-particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: i % 2 === 0 ? particleColor : secondaryParticleColor,
                  boxShadow: `0 0 15px ${i % 2 === 0 ? particleColor : secondaryParticleColor}`,
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  rotate: [0, 360],
                  x: [0, Math.cos((i * 36 * Math.PI) / 180) * 50],
                  y: [0, Math.sin((i * 36 * Math.PI) / 180) * 50],
                  scale: [1, 1.8, 1],
                }}
                transition={{
                  duration: 6 + i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Enhanced floating energy motes */}
        {!prefersReducedMotion && isClient && (
          <motion.div key="hero-text-energy-motes" className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`energy-mote-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 3,
                  height: 3,
                  backgroundColor: particleColor,
                  boxShadow: `0 0 12px ${particleColor}`,
                  left: `${15 + ((i * 70) % 70)}%`,
                  top: `${25 + ((i * 50) % 50)}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  x: [0, Math.sin(i) * 15, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.3, 1.5, 0.3],
                }}
                transition={{
                  duration: 4 + (i % 4),
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Main text with clean gradient styling - no glow effects */}
        <span
          className={`relative z-10 text-transparent bg-clip-text ${currentGradient} font-extrabold`}
          style={{ verticalAlign: "baseline" }}
        >
          {currentText}
        </span>

        {/* Scroll-driven underline animation - triggers on state change */}
        {!prefersReducedMotion && isClient && hasTriggeredUnderline && (
          <motion.div
            key={`hero-text-underline-${showNow ? "now" : "here"}`}
            className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${
                showNow ? "rgba(249,115,22,1)" : "rgba(84,140,172,1)"
              } 50%, transparent 100%)`,
              boxShadow: `0 0 25px ${showNow ? "rgba(249,115,22,0.9)" : "rgba(84,140,172,0.9)"}, 
                          0 0 50px ${showNow ? "rgba(249,115,22,0.7)" : "rgba(84,140,172,0.7)"}, 
                          0 0 75px ${showNow ? "rgba(249,115,22,0.5)" : "rgba(84,140,172,0.5)"}`,
              borderRadius: "2px",
            }}
            initial={{ x: "-120%", scaleX: 0.3 }}
            animate={{ x: "120%", scaleX: [0.3, 1, 0.3] }}
            transition={{
              duration: 2.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        )}

        {/* Additional underline glow trail - also scroll-driven */}
        {!prefersReducedMotion && isClient && hasTriggeredUnderline && (
          <motion.div
            key={`hero-text-underline-trail-${showNow ? "now" : "here"}`}
            className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${
                showNow ? "rgba(249,115,22,0.8)" : "rgba(84,140,172,0.8)"
              } 50%, transparent 100%)`,
              boxShadow: `0 0 20px ${showNow ? "rgba(249,115,22,0.6)" : "rgba(84,140,172,0.6)"}`,
              borderRadius: "1px",
            }}
            initial={{ x: "-140%", opacity: 0 }}
            animate={{ x: "140%", opacity: [0, 1, 0] }}
            transition={{
              duration: 3,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.3,
            }}
          />
        )}

        {/* Invisible text to maintain layout */}
        <span className="invisible font-extrabold" aria-hidden="true">
          Here
        </span>
      </span>
    )
  },
)

AnimatedHeroText.displayName = "AnimatedHeroText"

// Enhanced Loading Component
const VideoLoadingState = React.memo(({ progress }: { progress: number }) => (
  <motion.div
    key="video-loading-state"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 flex flex-col items-center justify-center bg-aim-navy/20 backdrop-blur-sm"
  >
    <div className="text-center space-y-4">
      <div
        className="loading-spinner size-12 border-4 border-bexar-blue/30 border-t-bexar-blue rounded-full animate-spin"
        role="status"
      >
        <VisuallyHidden>Loading video</VisuallyHidden>
      </div>
      {progress > 0 && progress < 100 && (
        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            key="loading-progress-bar"
            className="h-full bg-bexar-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </div>
  </motion.div>
))

VideoLoadingState.displayName = "VideoLoadingState"

// Enhanced Error Component
const VideoErrorState = React.memo(({ onRetry }: { onRetry: () => void }) => (
  <div key="video-error-state" className="absolute inset-0 flex items-center justify-center bg-aim-navy/80">
    <div className="text-center p-6 max-w-md space-y-4">
      <p className="text-white text-lg mb-4">Video could not be loaded</p>
      <Image
        src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-poster.png"
        alt="AIM Summit"
        width={400}
        height={225}
        className="rounded-md mx-auto"
        priority
      />
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-bexar-blue text-white rounded-md hover:bg-bexar-blue/80 transition-colors focus:outline-none focus:ring-2 focus:ring-bexar-blue focus:ring-offset-2"
      >
        Retry Loading
      </button>
    </div>
  </div>
))

VideoErrorState.displayName = "VideoErrorState"

// Main optimized component
export const HeroVideo = React.memo(() => {
  const containerRef = useRef<HTMLElement>(null)
  const showNow = useScrollDetection(100)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 767px)")
  const [isMounted, setIsMounted] = useState(false)

  // Only render client-specific content after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const {
    videoRef,
    isVideoLoaded,
    isVideoError,
    loadingProgress,
    handleVideoLoad,
    handleVideoError,
    handleVideoProgress,
    retryVideoLoad,
  } = useVideoManager(prefersReducedMotion)

  // Memoized animation variants
  const fadeInUp = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
    [],
  )

  const stagger = useMemo(
    () => ({
      animate: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    [],
  )

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
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-4rem)] mt-10 md:mt-24 lg:pt-0 flex flex-col lg:flex-row items-stretch overflow-hidden bg-[#101310]"
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

      {/* Left Content Section with proper overflow containment */}
      <motion.div
        key="hero-content-section"
        className={`relative w-full ${
          isMobile ? "min-h-screen flex flex-col justify-center" : "lg:w-1/2 flex items-center"
        } z-10 order-1 overflow-hidden`}
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        {isMobile && isMounted && (
          <React.Fragment key="mobile-effects">
            <motion.div
              key="mobile-gradient-overlay"
              className="absolute inset-0 bg-gradient-to-b from-[#101310] via-[#101310]/80 to-[#101310]/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 1 }}
            />
            {!prefersReducedMotion && <MobileParticles />}
          </React.Fragment>
        )}
        <motion.div
          key="content-blur-overlay"
          className="w-full h-full absolute inset-0"
          initial={{ filter: prefersReducedMotion ? "blur(0px)" : "blur(4px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 1, ease: "easeOut" }}
          aria-hidden="true"
          style={{ willChange: "filter" }}
        />
        <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-10 overflow-hidden">
          <div className="space-y-4 sm:space-y-8 lg:space-y-10">
            <motion.div key="hero-text-content" className="space-y-6 md:space-y-8" variants={stagger}>
              <motion.h1
                key="hero-main-heading"
                className={`text-3xl ${
                  isMobile ? "sm:text-4xl md:text-5xl" : "sm:text-5xl md:text-6xl lg:text-7xl"
                } font-bold text-white tracking-tight text-balance mb-4 sm:mb-6 overflow-hidden`}
                variants={fadeInUp}
                style={{ willChange: "transform, opacity" }}
              >
                <span className="block mb-2 sm:mb-4">AIM2025:</span>
                <span className="overflow-hidden">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#548cac] to-[#4f4f2c]">
                    The Future of Military Medicine Starts{" "}
                  </span>
                  <AnimatedHeroText showNow={showNow} prefersReducedMotion={prefersReducedMotion} />
                </span>
              </motion.h1>

              <motion.p
                key="hero-description"
                className={`${
                  isMobile ? "text-base sm:text-lg" : "text-lg sm:text-xl md:text-2xl"
                } text-white/90 max-w-3xl leading-relaxed text-balance tracking-tight mb-6 sm:mb-8 lg:mb-10`}
                variants={fadeInUp}
                style={{ willChange: "transform, opacity" }}
              >
                The AIM Health R&D Summit brings together top innovators from academia, industry, and the military to
                accelerate the research, development, and commercialization of transformative medical technologies. This
                unique convergence of thought leaders creates pathways to discovery and commercialization while
                addressing critical challenges in both military and civilian healthcare.
              </motion.p>

              <motion.div
                key="hero-cta-buttons"
                className={`flex flex-col sm:flex-row gap-4 sm:gap-6 ${isMobile ? "w-full" : "pt-2 sm:pt-4"}`}
                variants={fadeInUp}
                style={{ willChange: "transform, opacity" }}
              >
                <Button
                  variant="primary"
                  href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                  className={`text-base sm:text-lg ${isMobile ? "py-3 px-6" : "py-3 px-6 md:py-4 md:px-8"} w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bexar-blue`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Register Now for AIM Summit (opens in new tab)"
                >
                  <span className="flex items-center justify-center">
                    Register Now
                    <RiArrowRightUpLine className="ml-2 size-5 md:size-6" aria-hidden="true" />
                  </span>
                </Button>
                <Button
                  variant="secondary"
                  href="https://support.velocitytx.org/campaign/642575/donate"
                  className={`text-base sm:text-lg ${isMobile ? "py-3 px-6" : "py-3 px-6 md:py-4 md:px-8"} w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-military-green`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Become a Sponsor for AIM Summit (opens in new tab)"
                >
                  <span className="flex items-center justify-center">
                    Become a Sponsor
                    <RiArrowRightUpLine className="ml-2 size-5 md:size-6" aria-hidden="true" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right Video Section */}
      <div
        key="hero-video-section"
        className={`relative w-full ${isMobile ? "h-screen" : "lg:w-1/2"} order-2 ${isMobile ? "" : "min-h-[50vh]"}`}
      >
        <motion.div key="video-container" className="absolute inset-0" aria-hidden="true">
          <AnimatePresence>
            {!isVideoLoaded && !isVideoError && <VideoLoadingState progress={loadingProgress} />}
          </AnimatePresence>

          {isVideoError && <VideoErrorState onRetry={retryVideoLoad} />}

          <video
            key="hero-background-video"
            ref={videoRef}
            autoPlay={!prefersReducedMotion}
            muted
            loop
            playsInline
            controls={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ willChange: "auto" }}
            poster="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-poster.png"
            onLoadedData={handleVideoLoad}
            onProgress={handleVideoProgress}
            onError={handleVideoError}
            preload="metadata"
            aria-hidden="true"
          >
            <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+2024+Cut+Down.mp4" type="video/mp4" />
            <track kind="captions" src="/captions.vtt" label="English captions" />
          </video>

          {/* AIM Word Mark Watermark */}
          <div
            key="aim-logo-watermark"
            className={`absolute z-20 ${
              isMobile
                ? "bottom-4 right-4 w-9" // Bottom right for mobile
                : "bottom-4 right-4 w-9" // Bottom right for larger screens
            }`}
          >
            <div className="relative bg-black/20 backdrop-blur-sm rounded-md">
              <Image
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim.png"
                alt="AIM Summit Logo"
                width={80}
                height={27}
                className="w-full h-auto mix-blend-difference invert brightness-150 contrast-125 rounded"
                priority
              />
            </div>
          </div>

          <motion.div
            key="video-gradient-overlay"
            className="absolute inset-0 bg-gradient-to-r from-[#548cac]/5 to-[#4f4f2c]/5 bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 1 }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  )
})

HeroVideo.displayName = "HeroVideo"
