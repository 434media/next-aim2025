"use client"

import { ArrowRight } from "lucide-react"
import { motion, useAnimation, useReducedMotion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "../../hooks/use-mobile"
import type { Partner } from "./PartnerMarquee"

interface SponsorRowProps {
    sponsors: Partner[]
    reverse?: boolean
    speed?: number
    rowId: string
}

function SponsorRow({ sponsors, reverse = false, speed = 80, rowId }: SponsorRowProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)
    const [contentWidth, setContentWidth] = useState(0)
    const prefersReducedMotion = useReducedMotion()
    const controls = useAnimation()
    const [isMounted, setIsMounted] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)")

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
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

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

    useEffect(() => {
        if (!isMounted || !contentWidth) return

        if (prefersReducedMotion || isMobile) {
            controls.stop()
        } else {
            startAnimation()
        }
    }, [isMounted, prefersReducedMotion, contentWidth, controls, startAnimation, isMobile])

    const duplicated = [...sponsors, ...sponsors]

    if (isMobile) {
        return (
            <div className="relative w-full overflow-hidden">
                <div
                    className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to right, #ffffff, transparent)" }}
                    aria-hidden="true"
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to left, #ffffff, transparent)" }}
                    aria-hidden="true"
                />
                <div
                    className="flex gap-4 items-center py-3"
                    style={{
                        width: "max-content",
                        animation: prefersReducedMotion
                            ? "none"
                            : `aim-sponsors-marquee ${duplicated.length * (100 / (speed * 0.6))}s linear infinite${reverse ? " reverse" : ""}`,
                        willChange: "transform",
                    }}
                >
                    {duplicated.map((sponsor, idx) => (
                        <div key={`${rowId}-mobile-${sponsor.name}-${idx}`} className="shrink-0" style={{ width: "120px" }}>
                            <Link
                                href={sponsor.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548cac] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg"
                                aria-label={`${sponsor.name} (opens in new tab)`}
                            >
                                <div className="relative h-16 w-full rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                                    <Image
                                        src={sponsor.src || "/placeholder.svg"}
                                        alt={`${sponsor.name} logo`}
                                        fill
                                        sizes="120px"
                                        className="object-contain p-2"
                                        loading="lazy"
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <style jsx>{`
          @keyframes aim-sponsors-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
            </div>
        )
    }

    return (
        <div className="overflow-hidden py-4" ref={containerRef}>
            <div className="relative">
                <div
                    className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to right, #ffffff, transparent)" }}
                    aria-hidden="true"
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to left, #ffffff, transparent)" }}
                    aria-hidden="true"
                />

                <motion.div ref={innerRef} className="flex gap-8 md:gap-12 items-center" animate={controls}>
                    {duplicated.map((sponsor, idx) => (
                        <Link
                            key={`${rowId}-${sponsor.name}-${idx}`}
                            href={sponsor.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548cac] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg"
                            aria-label={`${sponsor.name} (opens in new tab)`}
                        >
                            <div className="relative h-24 w-52 lg:h-28 lg:w-64 transition-transform duration-300 hover:scale-105">
                                <Image
                                    src={sponsor.src || "/placeholder.svg"}
                                    alt={`${sponsor.name} logo`}
                                    fill
                                    sizes="(max-width: 1024px) 208px, 256px"
                                    className="object-contain p-2"
                                    loading="lazy"
                                />
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

interface Aim2026SponsorsProps {
    topSponsors: Partner[]
    bottomSponsors: Partner[]
}

export function Aim2026Sponsors({ topSponsors, bottomSponsors }: Aim2026SponsorsProps) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isMobile = useMediaQuery("(max-width: 768px)")

    return (
        <div
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-white"
        >
            {/* Content */}
            <div className="relative z-10 py-16 sm:py-20">
                {/* Header */}
                <div className="mx-auto max-w-7xl px-4 xl:px-0 text-center mb-10 sm:mb-14">
                    <p
                        className="text-[#548cac] mb-4"
                        style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            lineHeight: 1.5,
                            textTransform: "uppercase",
                        }}
                    >
                        — AIM 2026 —
                    </p>
                    <h2
                        className="font-black text-gray-900 tracking-tight"
                        style={{
                            fontSize: isMobile
                                ? "clamp(2.5rem, 11vw, 4rem)"
                                : "clamp(3.5rem, 8vw, 5.5rem)",
                            fontWeight: 900,
                            lineHeight: 0.88,
                        }}
                    >
                        Our{" "}
                        <span
                            className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-emerald-600"
                        >
                            Sponsors
                        </span>
                    </h2>
                    <p
                        className="mt-5 text-gray-600 mx-auto max-w-xl"
                        style={{
                            fontSize: "1rem",
                            lineHeight: 1.6,
                            fontWeight: 400,
                        }}
                    >
                        AIM 2026 is made possible through the support of organizations dedicated to advancing military medicine and innovation.
                    </p>

                    <div className="mt-8">
                        <Link
                            href="https://support.velocitytx.org/campaign/726139/donate"
                            className="group inline-flex items-center gap-2 bg-[#548cac] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#548cac]/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548cac] focus-visible:ring-offset-2"
                            rel="noreferrer"
                            target="_blank"
                        >
                            Become a Sponsor
                            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                    </div>
                </div>

                {/* Sponsor rows */}
                <div className="space-y-2">
                    {/* Screen reader accessible list */}
                    <div className="sr-only">
                        <ul>
                            {[...topSponsors, ...bottomSponsors].map((s) => (
                                <li key={s.name}>
                                    <a href={s.href} target="_blank" rel="noopener noreferrer">{s.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <SponsorRow sponsors={topSponsors} rowId="top" speed={70} />
                    <SponsorRow sponsors={bottomSponsors} rowId="bottom" reverse speed={85} />
                </div>
            </div>

        </div>
    )
}
