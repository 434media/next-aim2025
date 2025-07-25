"use client"

import type React from "react"

import { Button } from "../Button"
import { RiArrowLeftSLine, RiArrowRightSLine, RiExternalLinkLine } from "@remixicon/react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { useMediaQuery } from "../../hooks/useMediaQuery"

const particleColors = ["#548cac", "#0891b2", "#0e7490", "#e0f2fe"]

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
  {
    quote:
      "StemBioSys develops primary cell-derived extracellular matrices that bring in vitro research closer to human biology. By enhancing the relevance and reliability of preclinical data, we support AIM’s mission to accelerate transformative healthcare innovations for military and civilian populations.",
    highlightedText: "StemBioSys develops primary cell-derived extracellular matrices",
    author: "Bob Hutchens",
    title: "CEO, StemBioSys",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/bob-stembios.jpeg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/stembiosys.png",
    logoAlt: "StemBioSys Logo",
    websiteUrl: "https://www.stembiosys.com/",
    sponsorName: "StemBioSys",
  },
  {
    quote:
      "At Audicin, we develop audio solutions to enhance focus, recovery, and sleep for active duty service members and veterans. Engineered for operational demands and post-service care for PTSD, Audicin supports cognitive readiness, stress regulation, and long-term resilience through mission-tested sound therapy",
    highlightedText: "At Audicin, we develop audio solutions to enhance focus, recovery, and sleep",
    author: "Laura Avonius",
    title: "Founder & CEO, Audicin",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/laura-audicin.jpeg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/HorizontalLogo_Audicin-02.png",
    logoAlt: "Audicin Logo",
    websiteUrl: "https://www.audicin.com/",
    sponsorName: "Audicin",
  },
  {
    quote:
      "At Molecular You, we believe in honouring those who serve by helping them stay mission-ready and healthy—long after the mission ends. Our pre-diagnostic health assessment offers early detection of chronic disease risks through a single blood test, empowering active military personnel to extend their service and supporting veterans with personalized health insights to thrive in civilian life.",
    highlightedText: "At Molecular You, we believe in honouring those who serve by helping them stay mission-ready and healthy",
    author: "Rob Fraser",
    title: "CSO & Co-Founder, Molecular You",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/Rob+Fraser+1.1+(3).png",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/MYHi+logo+file+copy+sideways-01+(2).png",
    logoAlt: "Molecular You Logo",
    websiteUrl: "https://www.molecularyou.com/",
    sponsorName: "Molecular You",
  },
  {
    quote:
      "We’re grateful to the AIM Summit for providing a powerful platform to connect with academic, industry, and military leaders—driving innovation in military medicine and healthcare. As a national trauma research consortium, TRC4 is dedicated to advancing trauma care through collaborative, data-driven research and grant-funded programs. Events like these amplify our shared mission and accelerate progress in saving lives.",
    highlightedText: "We’re grateful to the AIM Summit for providing a powerful platform to connect with academic, industry, and military leaders",
    author: "Christina Spencer",
    title: "Director, Research Operations, TRC4",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/spenser-trc4.jpeg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/TRC4+UT+System+Logo.png",
    logoAlt: "TRC4 Logo",
    websiteUrl: "https://trc4.org/",
    sponsorName: "TRC4",
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
      return [...Array(isMobile ? 20 : 40)].map((_, i) => (
        <motion.div
          key={`particle-${i}-${key}`} // Include key in particle key to force re-render
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            backgroundColor: particleColors[Math.floor(Math.random() * particleColors.length)],
            right: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.4, 0.4, 0],
            x: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
            y: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
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
      className="my-8 md:my-12 relative mx-auto w-full max-w-6xl overflow-hidden rounded-none md:rounded-2xl bg-white border border-gray-200 shadow-xl isolate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Light gradient overlay - contained within component */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-blue-50/60 pointer-events-none" />

      {/* Particles - properly contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>

      <div className="relative z-10 flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full text-center mb-4 md:mb-6"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">SPONSOR SPOTLIGHT</h2>
          <div className="h-1 w-20 bg-[#0891b2] mx-auto mb-4 md:mb-6"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-8">
          {/* Logo Section with AnimatePresence for smooth transitions */}
          <div className="w-full md:w-1/2 flex flex-col items-center relative min-h-[160px] sm:min-h-[180px] md:min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`logo-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="relative w-full max-w-lg flex items-center justify-center p-6 md:p-8">
                  <Image
                    src={currentTestimonial.logo || "/placeholder.svg"}
                    alt={currentTestimonial.logoAlt}
                    width={500}
                    height={300}
                    className="object-contain max-h-[100px] md:max-h-[180px] lg:max-h-[200px] w-full filter brightness-0 contrast-100"
                    priority
                  />
                </div>

                {/* Updated Learn More Button */}
                <div className="mt-4 md:mt-6 w-full flex justify-center">
                  <Button
                    href={currentTestimonial.websiteUrl}
                    variant="primary"
                    className="bg-[#0891b2] hover:bg-[#0e7490] text-white group transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Visit ${currentTestimonial.sponsorName} website`}
                  >
                    <span>Visit {currentTestimonial.sponsorName}</span>{" "}
                    <RiExternalLinkLine className="inline-flex w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quote Section */}
          <div className="w-full md:w-1/2 relative mt-4 md:mt-0">
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
                  className="relative text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-gray-800 mb-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-sm border border-gray-100"
                  aria-label={`Testimonial quote by ${currentTestimonial.author}`}
                >
                  <svg
                    aria-hidden="true"
                    className="absolute -top-3 -left-3 h-10 w-10 text-[#0891b2]/20"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-800 relative z-10">
                    <strong className="font-semibold text-[#0891b2]">{currentTestimonial.highlightedText}</strong>
                    {currentTestimonial.quote.substring(currentTestimonial.highlightedText.length)}
                  </p>
                </blockquote>

                <div className="mt-4 md:mt-6">
                  <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-sm border border-gray-100">
                    <div className="relative shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-white p-1 rounded-full shadow-md border-2 border-gray-100">
                      <Image
                        alt={`${currentTestimonial.author} profile`}
                        src={currentTestimonial.image || "/placeholder.svg"}
                        width={64}
                        height={64}
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="text-base md:text-lg font-medium text-gray-900">{currentTestimonial.author}</div>
                      <div className="text-sm md:text-base text-[#0891b2] font-semibold">
                        {currentTestimonial.title}
                      </div>
                      {currentTestimonial.organization && (
                        <div className="text-xs md:text-sm text-gray-600">{currentTestimonial.organization}</div>
                      )}
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div className="mt-4 flex items-center justify-start space-x-3">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 md:p-3 rounded-full bg-white hover:bg-gray-50 text-gray-700 hover:text-[#0891b2] transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200"
                      aria-label="Previous testimonial"
                    >
                      <RiArrowLeftSLine className="w-4 h-4 md:w-5 md:h-5" />
                    </button>

                    <div className="flex items-center justify-center space-x-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={`indicator-${index}`}
                          onClick={() => {
                            setCurrentIndex(index)
                            setKey((prev) => prev + 1)
                          }}
                          className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                            currentIndex === index
                              ? "bg-[#0891b2] scale-125 shadow-md"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                          aria-label={`Go to testimonial ${index + 1}`}
                          aria-current={currentIndex === index ? "true" : "false"}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextTestimonial}
                      className="p-2 md:p-3 rounded-full bg-white hover:bg-gray-50 text-gray-700 hover:text-[#0891b2] transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200"
                      aria-label="Next testimonial"
                    >
                      <RiArrowRightSLine className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
