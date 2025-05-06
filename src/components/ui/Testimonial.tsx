"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/Button"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { RiArrowLeftSLine, RiArrowRightSLine, RiExternalLinkLine } from "@remixicon/react"

const particleColors = ["#548cac", "#0891b2", "#0e7490", "#ffffff"]

// Define the testimonial data structure
type Testimonial = {
  quote: string
  highlightedText: string
  author: string
  title: string
  image: string
  organization?: string
  logo: string
  logoAlt: string
  websiteUrl: string
  sponsorName: string
}

// Define our testimonials
const testimonials: Testimonial[] = [
  {
    quote:
      "At Metis Foundation, we are scientists serving scientists—advancing military medicine through mission-focused innovation, strategic collaboration, and sustainable funding to deliver real-world solutions from bench to battlefield.",
    highlightedText: "At Metis Foundation, we are scientists serving scientists",
    author: "Anders Carlsson, PhD",
    title: "COO, The Metis Foundation",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/metis-profile.jpeg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/inverted+logo.png",
    logoAlt: "The Metis Foundation Logo",
    websiteUrl: "https://metisfoundationusa.org/",
    sponsorName: "The Metis Foundation",
  },
  {
    quote:
      "Forums like AIM give us the opportunity to collaborate with organizations outside of DoD so they have a better idea how to engage with the military's medical mission and advance healthcare innovation",
    highlightedText: "Forums like AIM give us the opportunity to collaborate with organizations outside of DoD",
    author: "Dr. Sean Biggerstaff",
    title: "Acting Deputy Assistant Director, Research and Engineering, Defense Health Agency",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/biggerstaff.jpeg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/dha_logo_white.png",
    logoAlt: "Defense Health Agency Logo",
    websiteUrl: "https://dha.mil/",
    sponsorName: "The Defense Health Agency",
  },
]

export default function SponsorSpotlight() {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const [particles, setParticles] = useState<React.ReactNode[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [key, setKey] = useState(0) // Used to force re-render of particles

  // Function to go to next testimonial
  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setKey((prev) => prev + 1) // Change particle pattern on quote change
  }, [])

  // Function to go to previous testimonial
  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    setKey((prev) => prev + 1) // Change particle pattern on quote change
  }, [])

  // Auto-rotate testimonials (always enabled)
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 10000) // Change every 10 seconds

    return () => clearInterval(interval)
  }, [nextTestimonial])

  // Generate particles
  useEffect(() => {
    const generateParticles = () => {
      return [...Array(isMobile ? 30 : 60)].map((_, i) => (
        <motion.div
          key={`particle-${i}-${key}`} // Include key in particle key to force re-render
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            backgroundColor: particleColors[Math.floor(Math.random() * particleColors.length)],
            right: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            times: [0, 0.1, 0.9, 1],
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))
    }

    setParticles(generateParticles())
  }, [isMobile, key])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <motion.section
      className="my-12 md:my-16 relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl shadow-[#366A79]/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#101310]/80 to-[#101310]/90" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">{particles}</div>

      <div className="relative z-10 flex flex-col items-center justify-between p-6 sm:p-10 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full text-center mb-6 md:mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">SPONSOR SPOTLIGHT</h2>
          <div className="h-1 w-24 bg-[#0891b2] mx-auto mb-6 md:mb-8"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-12">
          {/* Logo Section with AnimatePresence for smooth transitions */}
          <div className="w-full md:w-1/2 flex flex-col items-center relative min-h-[200px] sm:min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`logo-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center"
              >
                <div className="relative w-full max-w-md flex items-center justify-center">
                  <Image
                    src={currentTestimonial.logo || "/placeholder.svg"}
                    alt={currentTestimonial.logoAlt}
                    width={400}
                    height={200}
                    className="object-contain max-h-[150px]"
                    priority
                  />
                </div>

                {/* Updated Learn More Button with icon */}
                <div className="mt-6 w-full flex justify-center">
                  <Button
                    href={currentTestimonial.websiteUrl}
                    variant="primary"
                    className="bg-[#0891b2] hover:bg-[#0e7490] text-white group transition-all duration-300 flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Visit ${currentTestimonial.sponsorName} website`}
                  >
                    <span>Visit {currentTestimonial.sponsorName}</span>{' '}
                    <RiExternalLinkLine className="inline-flex w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quote Section */}
          <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`testimonial-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <blockquote
                  className="relative text-lg sm:text-xl md:text-2xl leading-relaxed tracking-tight text-white mb-6"
                  aria-label={`Testimonial quote by ${currentTestimonial.author}`}
                >
                  <svg
                    aria-hidden="true"
                    className="absolute -top-10 -left-8 h-16 w-16 text-[#0891b2]/20"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-white relative z-10">
                    <strong className="font-semibold text-[#0891b2]">{currentTestimonial.highlightedText}</strong>
                    {currentTestimonial.quote.substring(currentTestimonial.highlightedText.length)}
                  </p>
                </blockquote>

                <div className="mt-6 md:mt-8">
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white p-1 rounded-full">
                      <Image
                        alt={`${currentTestimonial.author} profile`}
                        src={currentTestimonial.image || "/placeholder.svg"}
                        width={80}
                        height={80}
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-medium text-white">{currentTestimonial.author}</div>
                      <div className="text-base text-[#0891b2] font-semibold">{currentTestimonial.title}</div>
                      {currentTestimonial.organization && (
                        <div className="text-sm text-white/80">{currentTestimonial.organization}</div>
                      )}
                    </div>
                  </div>

                  {/* Carousel Controls - Simplified with just arrows and indicators */}
                  <div className="mt-4 flex items-center justify-start space-x-4">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <RiArrowLeftSLine className="w-6 h-6" />
                    </button>

                    <div className="flex items-center justify-center space-x-3">
                      {testimonials.map((_, index) => (
                        <button
                          key={`indicator-${index}`}
                          onClick={() => {
                            setCurrentIndex(index)
                            setKey((prev) => prev + 1)
                          }}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentIndex === index ? "bg-[#0891b2] scale-125" : "bg-white/30 hover:bg-white/50"
                          }`}
                          aria-label={`Go to testimonial ${index + 1}`}
                          aria-current={currentIndex === index ? "true" : "false"}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextTestimonial}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      aria-label="Next testimonial"
                    >
                      <RiArrowRightSLine className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0891b2]/30 pointer-events-none"
        aria-hidden="true"
      />
    </motion.section>
  )
}
