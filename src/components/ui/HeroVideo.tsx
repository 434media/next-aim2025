"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { RiArrowRightUpLine } from "@remixicon/react"
import { Button } from "../Button"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import Image from "next/image"

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

const MobileParticles = () => {
  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            backgroundColor: ["#548cac", "#4f4f2c", "#f97316", "#ffffff"][Math.floor(Math.random() * 4)],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  )
}

export function HeroVideo() {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoError, setIsVideoError] = useState(false)
  const [showNow, setShowNow] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const isMobile = useMediaQuery("(max-width: 767px)")

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

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
        mainContent.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
      }
    }
  }

  // Add scroll event listener to detect when user starts scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Change text when user has scrolled a small amount (100px)
      if (window.scrollY > 100) {
        setShowNow(true)
      } else {
        setShowNow(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Pause video if user prefers reduced motion
  useEffect(() => {
    if (videoRef.current && prefersReducedMotion) {
      videoRef.current.pause()
    } else if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Silent catch for autoplay restrictions
      })
    }
  }, [prefersReducedMotion, isVideoLoaded])

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

      {/* Left Content Section */}
      <motion.div
        className={`relative w-full ${
          isMobile ? "min-h-screen flex flex-col justify-center" : "lg:w-1/2 flex items-center"
        } z-10 order-1`}
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        {isMobile && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#101310] via-[#101310]/80 to-[#101310]/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 1 }}
            />
            {!prefersReducedMotion && <MobileParticles />}
          </>
        )}
        <motion.div
          className="w-full h-full absolute inset-0"
          initial={{ filter: prefersReducedMotion ? "blur(0px)" : "blur(4px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 1, ease: "easeOut" }}
          aria-hidden="true"
        />
        <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-10">
          <div className="space-y-4 sm:space-y-8 lg:space-y-10">
            <motion.div className="space-y-6 md:space-y-8" variants={stagger}>
              <motion.h1
                className={`text-3xl ${
                  isMobile ? "sm:text-4xl md:text-5xl" : "sm:text-5xl md:text-6xl lg:text-7xl"
                } font-bold text-white tracking-tight text-balance mb-4 sm:mb-6`}
                variants={fadeInUp}
              >
                <span className="block mb-2 sm:mb-4">AIM2025:</span>
                <span className="">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#548cac] to-[#4f4f2c]">
                    The Future of Military Medicine Starts{" "}
                  </span>
                  <span className="relative inline-block text-[1.06em] font-bold">
                    <AnimatePresence mode="sync" initial={false}>
                      {/* Animated background highlight */}
                      {!prefersReducedMotion && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#548cac]/10 via-[#f97316]/10 to-[#4f4f2c]/10 blur-xl"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                          aria-hidden="true"
                        />
                      )}
                      {showNow ? (
                        <motion.span
                          key="now"
                          className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] via-[#f59e0b] to-[#fbbf24] font-extrabold drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"
                          initial={
                            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(8px)", scale: 1.1 }
                          }
                          animate={{
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1,
                            transition: {
                              duration: prefersReducedMotion ? 0.1 : 0.7,
                              ease: [0.16, 1, 0.3, 1],
                            },
                          }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : {
                                  opacity: 0,
                                  filter: "blur(8px)",
                                  scale: 0.95,
                                  transition: {
                                    duration: prefersReducedMotion ? 0.1 : 0.4,
                                    ease: [0.22, 1, 0.36, 1],
                                  },
                                }
                          }
                        >
                          Now
                        </motion.span>
                      ) : (
                        <motion.span
                          key="here"
                          className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-l from-[#548cac] to-[#4f4f2c] drop-shadow-[0_0_8px_rgba(84,140,172,0.5)]"
                          initial={
                            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(8px)", scale: 0.95 }
                          }
                          animate={{
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1,
                            transition: {
                              duration: prefersReducedMotion ? 0.1 : 0.7,
                              ease: [0.16, 1, 0.3, 1],
                            },
                          }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : {
                                  opacity: 0,
                                  filter: "blur(8px)",
                                  scale: 1.1,
                                  transition: {
                                    duration: prefersReducedMotion ? 0.1 : 0.4,
                                    ease: [0.22, 1, 0.36, 1],
                                  },
                                }
                          }
                        >
                          Here
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {/* Invisible text to maintain layout */}
                    <span className="invisible" aria-hidden="true">
                      Here
                    </span>
                  </span>
                </span>
              </motion.h1>

              <motion.p
                className={`${
                  isMobile ? "text-base sm:text-lg" : "text-lg sm:text-xl md:text-2xl"
                } text-white/90 max-w-3xl leading-relaxed text-balance tracking-tight mb-6 sm:mb-8 lg:mb-10`}
                variants={fadeInUp}
              >
                The AIM Health R&D Summit brings together top innovators from academia, industry, and the military to
                accelerate the research, development, and commercialization of transformative medical technologies. This
                unique convergence of thought leaders creates pathways to discovery and commercialization while
                addressing critical challenges in both military and civilian healthcare.
              </motion.p>

              <motion.div
                className={`flex flex-col sm:flex-row gap-4 sm:gap-6 ${isMobile ? "w-full" : "pt-2 sm:pt-4"}`}
                variants={fadeInUp}
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
        className={`relative w-full ${isMobile ? "h-screen" : "lg:w-1/2"} order-2 ${isMobile ? "" : "min-h-[50vh]"}`}
      >
        <motion.div className="absolute inset-0" aria-hidden="true">
          <AnimatePresence>
            {!isVideoLoaded && !isVideoError && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="loading-spinner size-12 border-4 border-bexar-blue/30 border-t-bexar-blue rounded-full animate-spin"
                  role="status"
                >
                  <VisuallyHidden>Loading video</VisuallyHidden>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isVideoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-aim-navy/80">
              <div className="text-center p-6 max-w-md">
                <p className="text-white text-lg mb-4">Video could not be loaded</p>
                <Image
                  src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-poster.png"
                  alt="AIM Summit"
                  width={400}
                  height={225}
                  className="rounded-md mx-auto"
                />
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay={!prefersReducedMotion}
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
            <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+2024+Cut+Down.mp4" type="video/mp4" />
            <track kind="captions" src="/captions.vtt" label="English captions" />
          </video>

          {/* AIM Word Mark Watermark */}
          <div
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
}

