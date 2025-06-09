"use client"

import type React from "react"

import { motion, useReducedMotion } from "motion/react"
import { useInView } from "react-intersection-observer"
import { RiArrowRightUpLine } from "@remixicon/react"
import { FadeContainer } from "@/components/Fade"
import { MilitaryHealthCity } from "../../components/ui/MilitaryHealthCity"
import { Button } from "@/components/Button"
import Image from "next/image"
import { useEffect, useState } from "react"

// Pre-defined particle positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
  { left: 12.5, top: 15.2 },
  { left: 31.7, top: 93.6 },
  { left: 62.8, top: 2.5 },
  { left: 11.8, top: 47.1 },
  { left: 14.0, top: 56.5 },
  { left: 41.8, top: 73.8 },
  { left: 1.2, top: 64.5 },
  { left: 35.9, top: 91.0 },
  { left: 94.5, top: 90.5 },
  { left: 85.0, top: 81.7 },
  { left: 86.4, top: 55.2 },
  { left: 52.1, top: 90.6 },
  { left: 44.2, top: 79.2 },
  { left: 47.1, top: 14.5 },
  { left: 17.0, top: 69.3 },
  { left: 55.4, top: 9.3 },
  { left: 44.3, top: 30.0 },
  { left: 84.8, top: 39.3 },
  { left: 75.9, top: 16.1 },
  { left: 70.2, top: 51.0 },
]

// Feature card component with enhanced animations
interface FeatureCardProps {
  title: string
  description: React.ReactNode
  delay?: number
}

const FeatureCard = ({ title, description, delay = 0 }: FeatureCardProps) => {
  const prefersReducedMotion = useReducedMotion()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  })

  return (
    <motion.div
      ref={ref}
      className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8 sm:p-10 h-full flex flex-col group hover:shadow-xl transition-all duration-300"
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" },
            }
      }
    >
      <motion.h3
        className="text-2xl sm:text-3xl font-bold text-[#101310] mb-6 group-hover:text-[#548cac] transition-colors duration-300 leading-tight"
        initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.div
        className="text-gray-700 text-lg sm:text-xl flex-grow leading-relaxed font-medium"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
      >
        {description}
      </motion.div>
    </motion.div>
  )
}

export default function WhyAttend() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px",
    threshold: 0.1,
  })

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  // Client-side only particles to avoid hydration mismatch
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    // Only show particles after hydration is complete
    setShowParticles(true)
  }, [])

  return (
    <>
      {/* Hero Section with Professional Conference Image */}
      <div ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="relative w-full h-full"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={heroInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/IMG_6120.JPG"
              alt="AIM Health R&D Summit - Professional conference collaboration"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            {/* Multi-layered Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#101310]/90 via-[#101310]/70 to-[#101310]/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101310]/80 via-transparent to-[#101310]/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#101310]/40" />
          </motion.div>
        </div>

        {/* Floating Particles Effect - Client-side only to avoid hydration mismatch */}
        {showParticles && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {PARTICLE_POSITIONS.map((position, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}

        {/* Hero Content */}
        <FadeContainer className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 min-h-screen flex items-center">
          <div className="mx-auto max-w-7xl w-full">
            {/* Main Title */}
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="mb-8 text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block">Why Attend</span>
                <span className="block bg-gradient-to-r from-[#548cac] via-orange-500 to-[#4f4f2c] bg-clip-text text-transparent">
                  AIM Health R&D Summit
                </span>
              </h1>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-[#548cac] to-orange-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={heroInView ? { width: 96 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.div>

            {/* Feature Cards Grid */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 mb-16"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.5,
                  },
                },
                hidden: {},
              }}
            >
              <FeatureCard
                title="Premier Community-Led Event"
                description={
                  <p>
                    The AIM Health R&D Summit is a <strong>premier</strong>, <strong>community-led</strong>, and{" "}
                    <strong>partner-driven</strong> event, hosted by VelocityTX, UTSA, and UT Health San Antonio, aimed
                    at <strong>accelerating</strong> the research, development, and commercialization of{" "}
                    <strong>transformative medical technologies</strong>.
                  </p>
                }
                delay={0.1}
              />

              <FeatureCard
                title="Cross-Sector Collaboration"
                description={
                  <p>
                    Building on over <strong>15 years</strong> of foundational efforts, this unique summit unites
                    leaders from <strong>academia, industry, and the military</strong> to foster{" "}
                    <strong>innovation</strong>, <strong>cross-sector collaboration</strong>, and the advancement of{" "}
                    <strong>dual-use technologies</strong>.
                  </p>
                }
                delay={0.2}
              />

              <FeatureCard
                title="Catalyst for Partnerships"
                description={
                  <p>
                    Supported by nonprofit and public entities committed to growing the bioscience and technology
                    sectors, AIM serves as a <strong>catalyst for partnerships</strong> that enhance{" "}
                    <strong>military medical readiness</strong> and create{" "}
                    <strong>pathways to commercialization</strong>, driving healthcare advancements with{" "}
                    <strong>global impact</strong>.
                  </p>
                }
                delay={0.3}
              />
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Button
                variant="primary"
                href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                className="text-lg py-5 px-10 bg-gradient-to-r from-[#548cac] to-orange-500 hover:from-[#4a7a96] hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              >
                <span className="flex items-center">
                  Register Now
                  <RiArrowRightUpLine className="ml-3 h-6 w-6" />
                </span>
              </Button>
            </motion.div>
          </div>
        </FadeContainer>
      </div>

      {/* Floating Stats Transition Section */}
      <section
        ref={statsRef}
        className="relative py-20 sm:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #101310 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #548cac 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-6xl">
            {/* Section Title */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-[#548cac] to-orange-500 bg-clip-text text-transparent">
                  Experience Innovation
                </span>
              </h2>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Join leaders from academia, industry, and military sectors in meaningful discussions that shape the
                future of healthcare technology.
              </p>
            </motion.div>

            {/* Floating Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-20">
              {[
                { number: "50+", label: "Expert Speakers", icon: "🎤" },
                { number: "15+", label: "Countries", icon: "🌍" },
                { number: "25+", label: "Institutions", icon: "🏛️" },
                { number: "100%", label: "Innovation", icon: "💡" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="group relative"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Floating Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#548cac]/10 to-orange-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />

                  {/* Card Content */}
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-white/20">
                    <div className="text-3xl sm:text-4xl mb-3">{stat.icon}</div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-[#548cac] transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Transition Element */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="w-32 h-1 bg-gradient-to-r from-[#548cac] to-orange-500 mx-auto rounded-full mb-8" />
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how San Antonio has become the epicenter of military health innovation
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Military Health City Section */}
      <section className="w-full bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <MilitaryHealthCity />
          </div>
        </div>
      </section>
    </>
  )
}

WhyAttend.meta = {
  title: "Why Attend AIM Health R&D Summit",
  description:
    "Discover the top reasons to attend the AIM Health R&D Summit and shape the future of military medicine.",
}
