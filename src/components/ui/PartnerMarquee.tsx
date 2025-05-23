"use client"

import type React from "react"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useAnimation, useReducedMotion } from "motion/react"
import Image from "next/image"
import Link from "next/link"

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
}

/**
 * An optimized marquee component that displays a continuous scrolling of partner logos
 * with improved performance and accessibility
 */
export function PartnerMarquee({
  partners,
  reverse = false,
  speed = 90,
  className = "",
  ariaLabel = "Our partners",
}: PartnerMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const controls = useAnimation()
  const [isMounted, setIsMounted] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

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
      if (isMounted && !prefersReducedMotion) {
        startAnimation()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMounted, prefersReducedMotion])

  // Start or restart the animation
  const startAnimation = useCallback(() => {
    if (!contentWidth) return

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
  }, [contentWidth, controls, reverse, speed])

  // Handle animation based on user preferences
  useEffect(() => {
    if (!isMounted || !contentWidth) return

    if (prefersReducedMotion) {
      controls.stop()
    } else {
      startAnimation()
    }
  }, [isMounted, prefersReducedMotion, contentWidth, controls, startAnimation])

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

  return (
    <div className={`relative overflow-hidden py-8 ${className}`} ref={containerRef} aria-label={ariaLabel}>
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
                <div className="absolute inset-0 rounded-lg overflow-hidden">
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
  )
}
