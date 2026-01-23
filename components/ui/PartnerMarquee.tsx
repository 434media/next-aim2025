"use client"

import type React from "react"

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useAnimation, useReducedMotion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "../../hooks/use-mobile"
import { EditableText } from "../admin/EditableText"

export interface Partner {
  name: string
  src: string
  href: string
}

interface PartnerMarqueeProps {
  partners: Partner[]
  reverse?: boolean
  speed?: number
  className?: string
  ariaLabel?: string
  showHeader?: boolean
}

/**
 * An optimized marquee component that displays a continuous scrolling of partner logos
 * with improved performance and accessibility. On mobile, displays scrollable rows.
 */
export function PartnerMarquee({
  partners,
  reverse = false,
  speed = 90,
  className = "",
  ariaLabel = "Our partners",
  showHeader = false,
}: PartnerMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const controls = useAnimation()
  const [isMounted, setIsMounted] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Calculate dimensions for the animation
  useEffect(() => {
    setIsMounted(true)

    const calculateWidths = () => {
      if (containerRef.current && innerRef.current) {
        setContentWidth(innerRef.current.scrollWidth / 2)
      }
    }

    calculateWidths()

    const handleResize = () => {
      calculateWidths()
      if (isMounted && !prefersReducedMotion && !isMobile) {
        startAnimation()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMounted, prefersReducedMotion, isMobile])

  // Start or restart the animation
  const startAnimation = useCallback(() => {
    if (!contentWidth || isMobile) return

    const duration = contentWidth / (speed * 0.4)

    controls.start({
      x: reverse ? [0, -contentWidth] : [-contentWidth, 0],
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration,
          ease: "linear",
        },
      },
    })
  }, [contentWidth, controls, reverse, speed, isMobile])

  // Handle animation based on user preferences
  useEffect(() => {
    if (!isMounted || !contentWidth) return

    if (prefersReducedMotion || isMobile) {
      controls.stop()
    } else {
      startAnimation()
    }
  }, [isMounted, prefersReducedMotion, contentWidth, controls, startAnimation, isMobile])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      const nextElement = document.getElementById(`partner-${index + 1}`) || document.getElementById(`partner-0`)
      nextElement?.focus()
    } else if (e.key === "ArrowLeft") {
      const prevElement =
        document.getElementById(`partner-${index - 1}`) || document.getElementById(`partner-${partners.length * 2 - 1}`)
      prevElement?.focus()
    }
  }

  // Mobile scrollable rows layout
  if (isMobile) {
    return (
      <div className={`relative ${className}`}>
        {/* Header Section */}
        {showHeader && (
          <div className="text-center mt-12 px-4">
            <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-gray-900 mb-6 leading-[0.85] tracking-tight">
              <EditableText textId="partners-title-prefix" page="home" section="partners">
                Powered by
              </EditableText>
              {" "}
              <EditableText
                textId="partners-title-highlight"
                page="home"
                section="partners"
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600"
              >
                Innovation
              </EditableText>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed tracking-tight">
              <EditableText textId="partners-description" page="home" section="partners" multiline>
                Our success is built on the foundation of strategic partnerships with industry leaders, research
                institutions, and government organizations committed to advancing military medicine.
              </EditableText>
            </p>
          </div>
        )}

        <div className="py-8" aria-label={ariaLabel}>
          {/* Screen reader accessible list of partners */}
          <div className="sr-only">
            <span id="partners-description">List of partners:</span>
            <ul aria-describedby="partners-description">
              {partners.map((partner) => (
                <li key={partner.name}>
                  <a href={partner.href}>{partner.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile scrollable row - Single row to avoid duplicates */}
          <div className="relative w-full">
            {/* Scroll indicator - left */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <ChevronLeft className="w-3 h-3 text-white/60" />
              </div>
            </div>

            {/* Scroll indicator - right */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <ChevronRight className="w-3 h-3 text-white/60" />
              </div>
            </div>

            <div
              className="overflow-x-auto scrollbar-hide px-8 py-2"
              style={{
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div
                className="flex gap-4"
                style={{
                  width: "max-content",
                  flexWrap: "nowrap",
                  minWidth: "100%",
                }}
              >
                {/* Show all partners with duplicates for scroll effect */}
                {[...partners, ...partners].map((partner, idx) => (
                  <div
                    key={`mobile-${partner.name}-${idx}`}
                    className="flex-shrink-0"
                    style={{
                      minWidth: "128px",
                      width: "128px",
                    }}
                  >
                    <Link
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full w-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548cac] focus-visible:ring-offset-2 rounded-md"
                      aria-label={`${partner.name} (opens in new tab)`}
                      tabIndex={0}
                    >
                      <div className="relative h-24 w-full overflow-hidden rounded-lg border border-white/10 transform transition-transform duration-300 hover:scale-105">
                        {/* Partner logo */}
                        <div className="absolute inset-0 flex items-center justify-center p-3">
                          <Image
                            src={partner.src || "/placeholder.svg"}
                            alt={`${partner.name} logo`}
                            fill
                            sizes="128px"
                            className="object-contain p-2"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop marquee layout
  return (
    <div className={`relative ${className}`}>
      {/* Header Section */}
      {showHeader && (
        <div className="text-center mb-12">
          <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-gray-900 mb-6 leading-[0.85] tracking-tight">
            <EditableText textId="partners-title-prefix" page="home" section="partners">
              Powered by
            </EditableText>
            {" "}
            <EditableText
              textId="partners-title-highlight"
              page="home"
              section="partners"
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600"
            >
              Innovation
            </EditableText>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <EditableText textId="partners-description" page="home" section="partners" multiline>
              Our success is built on the foundation of strategic partnerships with industry leaders, research
              institutions, and government organizations committed to advancing military medicine.
            </EditableText>
          </p>
        </div>
      )}

      <div className="overflow-hidden py-8" ref={containerRef} aria-label={ariaLabel}>
        {/* Skip link for accessibility */}
        <a
          href="#skip-marquee"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md"
        >
          Skip partner logos
        </a>

        {/* Screen reader accessible list of partners */}
        <div className="sr-only">
          <span id="partners-description">List of partners:</span>
          <ul aria-describedby="partners-description">
            {partners.map((partner) => (
              <li key={partner.name}>
                <a href={partner.href}>{partner.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual marquee */}
        <div className="relative">
          {/* Left fade gradient */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Right fade gradient */}
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <motion.div ref={innerRef} className="flex gap-8 md:gap-12 items-center" animate={controls}>
            {/* Double the items to create a seamless loop */}
            {[...partners, ...partners].map((partner, idx) => (
              <Link
                id={`partner-${idx}`}
                key={`${partner.name}-${idx}`}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548cac] focus-visible:ring-offset-2 rounded-md"
                aria-label={`${partner.name} (opens in new tab)`}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onFocus={() => setFocusedIndex(idx)}
                onBlur={() => setFocusedIndex(null)}
                tabIndex={0}
              >
                <div className="relative h-28 w-56 lg:h-32 lg:w-72">
                  <div className="absolute inset-0 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                    {/* Partner logo */}
                    <div className="absolute inset-2 flex items-center justify-center">
                      <Image
                        src={partner.src || "/placeholder.svg"}
                        alt={`${partner.name} logo`}
                        fill
                        sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                        className="object-contain p-2"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Focus indicator - only visible when focused with keyboard */}
                  {focusedIndex === idx && (
                    <div className="absolute -inset-1 rounded-lg border-2 border-[#548cac]/40 sr-only" />
                  )}
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Skip anchor */}
        <div id="skip-marquee" className="sr-only" aria-hidden="true"></div>
      </div>
    </div>
  )
}
