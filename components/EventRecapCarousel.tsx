"use client"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useMediaQuery } from "../hooks/useMediaQuery"

interface EventImage {
  src: string
  alt: string
  title: string
  description: string
}

const eventImages: EventImage[] = [
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/keynote.jpeg",
    alt: "Keynote speaker presenting to packed auditorium",
    title: "Groundbreaking Keynotes",
    description: "World-renowned experts shared cutting-edge insights that will shape the future of military medicine.",
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    alt: "Interactive technology demonstrations at innovation showcase",
    title: "Innovation Showcase",
    description: "Revolutionary medical technologies and breakthrough solutions were unveiled and demonstrated live.",
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/stategic-networking.jpeg",
    alt: "Medical professionals networking and collaborating",
    title: "Strategic Networking",
    description: "Meaningful connections were forged between military leaders, researchers, and industry pioneers.",
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab.jpeg",
    alt: "Expert panel discussing future of military medicine",
    title: "Expert Panels",
    description:
      "Deep-dive discussions explored critical challenges and emerging opportunities in healthcare innovation.",
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/crowd.jpeg",
    alt: "Awards ceremony recognizing outstanding achievements",
    title: "Excellence Recognized",
    description:
      "Outstanding contributions to military medicine and healthcare innovation were celebrated and honored.",
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab2.jpeg",
    alt: "Collaborative discussions between conference attendees",
    title: "Collaborative Spirit",
    description: "Cross-sector partnerships were formed, creating lasting impact beyond the conference walls.",
  },
]

export function EventRecapCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying || isHovered || prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % eventImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, isHovered, prefersReducedMotion])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + eventImages.length) % eventImages.length)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % eventImages.length)
  }, [])

  const togglePlayback = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
        case " ":
          e.preventDefault()
          togglePlayback()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToPrevious, goToNext, togglePlayback])

  const currentImage = eventImages[currentIndex]

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Main Carousel Container */}
      <div
        className={`relative ${
          isMobile ? "aspect-[4/5]" : "aspect-[16/9] lg:aspect-[21/9]"
        } rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-gray-900 shadow-2xl`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={currentImage.src || "/placeholder.svg?height=600&width=1200&query=AIM 2025 event highlights"}
              alt={currentImage.alt}
              fill
              className="object-cover"
              sizes={
                isMobile ? "(max-width: 768px) 100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              }
              priority={currentIndex === 0}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="max-w-4xl"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, delay: 0.2 }}
            >
              {/* Title */}
              <motion.h3
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 leading-tight"
                style={{
                  textShadow: "0 4px 20px rgba(0,0,0,0.8)",
                }}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, delay: 0.3 }}
              >
                {currentImage.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-3xl"
                style={{
                  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                }}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, delay: 0.4 }}
              >
                {currentImage.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
          {/* Previous Button */}
          <motion.button
            onClick={goToPrevious}
            className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
            whileHover={
              !isMobile ? { scale: prefersReducedMotion ? 1 : 1.1, backgroundColor: "rgba(255,255,255,0.25)" } : {}
            }
            whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </motion.button>

          {/* Next Button */}
          <motion.button
            onClick={goToNext}
            className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
            whileHover={
              !isMobile ? { scale: prefersReducedMotion ? 1 : 1.1, backgroundColor: "rgba(255,255,255,0.25)" } : {}
            }
            whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </motion.button>
        </div>

        {/* Play/Pause Control */}
        <motion.button
          onClick={togglePlayback}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
          whileHover={!isMobile ? { scale: prefersReducedMotion ? 1 : 1.1 } : {}}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />}
        </motion.button>

        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentIndex + 1) / eventImages.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center mt-6 space-x-2 sm:space-x-3">
        {eventImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg"
                : "bg-white/30 hover:bg-white/50"
            }`}
            whileHover={!isMobile ? { scale: prefersReducedMotion ? 1 : 1.2 } : {}}
            whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
            aria-label={`Go to slide ${index + 1}: ${eventImages[index].title}`}
          />
        ))}
      </div>

      {/* Accessibility: Screen reader content */}
      <div className="sr-only">
        <p>
          Image {currentIndex + 1} of {eventImages.length}: {currentImage.alt}
        </p>
        <p>{currentImage.description}</p>
      </div>
    </div>
  )
}
