"use client"

import type React from "react"

import { motion, useReducedMotion } from "motion/react"
import { useInView } from "react-intersection-observer"
import { RiArrowRightUpLine } from "@remixicon/react"
import { FadeContainer } from "@/components/Fade"
import ParticleBackground from "@/components/ParticleBackground"
import { MilitaryHealthCity } from "@/components/ui/MilitaryHealthCity"
import { Button } from "@/components/Button"

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
      className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-white/10 p-6 sm:p-8 h-full flex flex-col"
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.22, 1, 0.36, 1], // Custom ease curve for smoother motion
      }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -5,
              boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 },
            }
      }
    >
      <motion.h3
        className="text-xl sm:text-2xl font-bold text-[#101310] mb-4"
        initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.div
        className="text-gray-700 text-base sm:text-lg flex-grow leading-relaxed"
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px",
    threshold: 0.1,
  })

  return (
    <>
      <div ref={ref} className="relative">
        {inView && (
          <ParticleBackground
            className="w-full min-h-screen flex items-center justify-center relative pt-24 md:pt-32"
            gradientFrom="[#101310]"
            gradientVia="[#101310]"
            gradientTo="[#101310]/80"
          >
            <FadeContainer className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              <div className="mx-auto max-w-5xl text-center">
                <h1 className="mb-8 sm:mb-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Why Attend AIM Health R&D Summit
                </h1>
                {/* Feature Cards - Full Width with staggered animations */}
                <motion.div
                  className="flex flex-col gap-6 sm:gap-8 mb-12"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.15,
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
                        <strong>partner-driven</strong> event, hosted by VelocityTX, UTSA, and UT Health San Antonio,
                        aimed at <strong>accelerating</strong> the research, development, and commercialization of{" "}
                        <strong>transformative medical technologies</strong>.
                      </p>
                    }
                    delay={0.1}
                  />

                  <FeatureCard
                    title="Unique Two-Day Summit"
                    description={
                      <p>
                        Building on over <strong>15 years</strong> of foundational efforts, this{" "}
                        <strong>unique two-day summit</strong> unites leaders from{" "}
                        <strong>academia, industry, and the military</strong> to foster <strong>innovation</strong>,{" "}
                        <strong>cross-sector collaboration</strong>, and the advancement of{" "}
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

                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Button
                    variant="primary"
                    href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                    className="text-base py-3 px-6"
                  >
                    <span className="flex items-center">
                      Register Now
                      <RiArrowRightUpLine className="ml-2 h-5 w-5" />
                    </span>
                  </Button>
                </motion.div>
              </div>
            </FadeContainer>
          </ParticleBackground>
        )}
      </div>

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

