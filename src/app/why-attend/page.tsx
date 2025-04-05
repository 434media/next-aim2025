"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { FadeContainer } from "@/components/Fade"
import ParticleBackground from "@/components/ParticleBackground"
import { MilitaryHealthCity } from "@/components/ui/MilitaryHealthCity"

// Highlight component to spotlight key terms
const Highlight = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <span className={cn("relative inline text-[#366A79] font-semibold", className)}>
      <motion.span
        className="relative z-10"
        initial={prefersReducedMotion ? {} : { opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-x-0 bottom-0 h-[0.2em] bg-gradient-to-r from-[#366A79]/30 to-[#548cac]/30 rounded-sm"
        initial={prefersReducedMotion ? { width: "100%" } : { width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          duration: prefersReducedMotion ? 0.1 : 0.6,
          delay: Math.random() * 0.2 + 0.1,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
    </span>
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
            className="w-full min-h-screen flex items-center justify-center relative pt-24 md:pt-32" // Added top padding
            gradientFrom="[#101310]" // Darker background to make particles visible
            gradientVia="[#1a1f1a]"
            gradientTo="#[232725]"
          >
            <FadeContainer className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="mb-8 sm:mb-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Why Attend AIM Health R&D Summit
                </h1>

                <div className="mx-auto mb-10 sm:mb-12 max-w-3xl">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-white/10 p-6 sm:p-8 md:p-10">
                    <div className="text-left text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed space-y-6">
                      <p>
                        The AIM Health R&D Summit is a <Highlight>premier</Highlight>,{" "}
                        <Highlight>community-led</Highlight>, and <Highlight>partner-driven</Highlight> event, hosted by
                        VelocityTX, UTSA, and UT Health San Antonio, aimed at <Highlight>accelerating</Highlight> the
                        research, development, and commercialization of{" "}
                        <Highlight>transformative medical technologies</Highlight>.
                      </p>

                      <p>
                        Building on over <Highlight>15 years</Highlight> of foundational efforts, this{" "}
                        <Highlight>unique two-day summit</Highlight> unites leaders from{" "}
                        <Highlight>academia, industry, and the military</Highlight> to foster{" "}
                        <Highlight>innovation</Highlight>, <Highlight>cross-sector collaboration</Highlight>, and the
                        advancement of <Highlight>dual-use technologies</Highlight>.
                      </p>

                      <p>
                        Supported by nonprofit and public entities committed to growing the bioscience and technology
                        sectors, AIM serves as a <Highlight>catalyst for partnerships</Highlight> that not only enhance{" "}
                        <Highlight>military medical readiness</Highlight> but also create{" "}
                        <Highlight>pathways to commercialization</Highlight>, driving healthcare advancements with{" "}
                        <Highlight>global impact</Highlight>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeContainer>
          </ParticleBackground>
        )}
      </div>

      {/* Military Health City Section */}
      <section className="w-full bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MilitaryHealthCity />
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

