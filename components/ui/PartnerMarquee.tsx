"use client"

import type React from "react"

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
    const mobileSpeed = speed * 0.6 // slightly slower on mobile for readability
    const duplicatedPartners = [...partners, ...partners]

    return (
      <div className={`relative ${className}`}>
        {/* Header Section */}
        {showHeader && (
          <div className="text-center mt-12 px-4">
            <h3
              className="font-black text-gray-900 mb-4 tracking-tight"
              style={{
                fontSize: "clamp(2.75rem, 12vw, 4.5rem)",
                lineHeight: 0.88,
                fontWeight: 900,
              }}
            >
              <EditableText textId="partners-title-prefix" page="home" section="partners">
                Powered by
              </EditableText>
              {" "}
              <EditableText
                textId="partners-title-highlight"
                page="home"
                section="partners"
                className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-emerald-600"
              >
                Innovation
              </EditableText>
            </h3>
            <p
              className="text-gray-600 max-w-md mx-auto tracking-tight"
              style={{
                fontSize: "1rem",
                lineHeight: 1.45,
                fontWeight: 400,
              }}
            >
              <EditableText textId="partners-description" page="home" section="partners" multiline>
                Our success is built on the foundation of strategic partnerships with industry leaders, research
                institutions, and government organizations committed to advancing military medicine.
              </EditableText>
            </p>
          </div>
        )}

        <div className="py-6" aria-label={ariaLabel}>
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

          {/* CSS-only marquee for mobile — GPU-accelerated, no JS overhead */}
          <div className="relative w-full overflow-hidden">
            {/* Edge fade gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-linear-to-r from-white to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-linear-to-l from-white to-transparent pointer-events-none" aria-hidden="true" />

            <div
              className="flex gap-5 items-center"
              style={{
                width: "max-content",
                animation: prefersReducedMotion
                  ? "none"
                  : `marquee-mobile ${duplicatedPartners.length * (100 / mobileSpeed)}s linear infinite${reverse ? " reverse" : ""}`,
                willChange: "transform",
              }}
            >
              {duplicatedPartners.map((partner, idx) => (
                <div
                  key={`mobile-${partner.name}-${idx}`}
                  className="shrink-0"
                  style={{ width: "110px" }}
                >
                  <Link
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full w-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548cac] focus-visible:ring-offset-2 rounded-md"
                    aria-label={`${partner.name} (opens in new tab)`}
                    tabIndex={0}
                  >
                    <div className="relative h-20 w-full overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-105">
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        <Image
                          src={partner.src || "/placeholder.svg"}
                          alt={`${partner.name} logo`}
                          fill
                          sizes="110px"
                          className="object-contain p-1"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CSS keyframes injected once */}
          <style jsx>{`
            @keyframes marquee-mobile {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @media (prefers-reduced-motion: reduce) {
              .marquee-mobile { animation: none !important; }
            }
          `}</style>
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
              className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-emerald-600"
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
            className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-linear-to-r from-white to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Right fade linear */}
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-linear-to-l from-white to-transparent pointer-events-none"
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
                className="group relative shrink-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548cac] focus-visible:ring-offset-2 rounded-md"
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
