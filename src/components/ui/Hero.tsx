"use client"

import { RiArrowRightUpLine } from "@remixicon/react"
import { FadeContainer, FadeDiv, FadeSpan } from "../Fade"
import GameOfLife from "./HeroBackground"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "../Button"

const newsItems = [
  {
    label: "AIM 2025 SYMPOSIUM SERIES",
    href: "https://www.eventbrite.com/e/sneak-preview-aim-2025-sme-encounter-sessions-tickets-1234940392959",
  },
  {
    label: "EARLY BIRD PRICING AVAILABLE",
    href: "https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/",
  },
  {
    label: "SNEAK PREVIEW: AIM 2025",
    href: "https://www.eventbrite.com/e/sneak-preview-aim-2025-sme-encounter-sessions-tickets-1234940392959",
  },
]

export function Hero() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
    }, 5000) // Change news item every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section aria-label="hero" className="relative py-16 overflow-hidden -mt-24 md:mt-0">
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 z-0" />
      <FadeContainer className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeDiv className="w-full max-w-xl md:max-w-sm px-4 sm:px-0">
          <a
            aria-label={`View latest update: ${newsItems[currentNewsIndex].label}`}
            href={newsItems[currentNewsIndex].href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-between rounded-full bg-white px-3 py-2 text-sm font-medium text-[#101310] shadow-lg shadow-[#548cac]/10 ring-1 ring-black/5 transition-all hover:bg-[#548cac]/5 hover:ring-[#548cac] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2"
          >
            <span className="flex items-center overflow-hidden">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#548cac] text-white">
                <RiArrowRightUpLine className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="ml-3 flex items-center text-xs sm:text-sm">
                <span className="font-medium text-[#101310]">News</span>
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  &middot;
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentNewsIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="truncate font-medium text-[#548cac]"
                  >
                    {newsItems[currentNewsIndex].label}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
            <span className="ml-3 flex-none text-[#4f4f2c] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              →
            </span>
          </a>
        </FadeDiv>
        <h1 className="mt-12 text-center text-4xl font-extrabold tracking-tight text-[#101310] sm:text-5xl md:text-6xl lg:text-7xl">
          <FadeSpan className="block text-[#548cac]">Two Days</FadeSpan>
          <FadeSpan className="block">One Mission</FadeSpan>
        </h1>
        <p className="mt-6 max-w-2xl text-center text-lg sm:text-xl text-gray-600">
          <FadeSpan>
            The <strong className="font-semibold text-[#101310]">AIM Health R&D Summit</strong> serves as a premier
            platform uniting{" "}
            <strong className="font-semibold text-[#101310]">academia, industry, and the military</strong> to drive
            collaboration and innovation in life sciences.
          </FadeSpan>
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <FadeDiv>
            <Button
              variant="primary"
              href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto whitespace-nowrap"
            >
              <span className="flex items-center justify-center">
                Register to Attend
                <RiArrowRightUpLine className="ml-2 h-5 w-5" aria-hidden="true" />
              </span>
            </Button>
          </FadeDiv>
          <FadeDiv>
            <Button
              variant="secondary"
              href="https://support.velocitytx.org/campaign/642575/donate"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto whitespace-nowrap"
            >
              <span className="flex items-center justify-center">
                Become a Sponsor
                <RiArrowRightUpLine className="ml-2 h-5 w-5" aria-hidden="true" />
              </span>
            </Button>
          </FadeDiv>
        </div>
      </FadeContainer>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <GameOfLife />
      </div>
    </section>
  )
}

