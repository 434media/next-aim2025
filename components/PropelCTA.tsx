"use client"

import { ArrowRight } from "lucide-react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { AIMLogo } from "../public/AIMLogo"

export function PropelCTA() {
    const isMobile = useMediaQuery("(max-width: 768px)")
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <div ref={sectionRef} className="w-full">
            <div
                className="relative w-full overflow-hidden"
                style={{
                    background: "linear-gradient(180deg, #c8962e 0%, #b8943a 25%, #7a9a6a 50%, #5a9a8a 75%, #4a8aaa 100%)",
                }}
            >
                {/* AIM logo watermark in background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                    <AIMLogo
                        variant="white"
                        className="opacity-[0.06]"
                        style={{
                            width: isMobile ? "90vw" : "60vw",
                            height: "auto",
                        }}
                    />
                </div>

                <div className="relative z-10 px-4 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">
                    <div className="mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-around gap-6">
                        {/* Left side: CEGM large typography */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="min-w-0"
                        >
                            <h3
                                className="uppercase"
                                style={{
                                    fontFamily: "'Holtzman', sans-serif",
                                    fontSize: isMobile ? "25vw" : "12vw",
                                    lineHeight: 0.82,
                                    color: "transparent",
                                    WebkitTextStroke: isMobile ? "1px rgba(255,255,255,0.85)" : "1.5px rgba(255,255,255,0.85)",
                                    letterSpacing: "-0.02em",
                                    fontWeight: 400,
                                }}
                            >
                                Come
                                <br />
                                Early.
                                <br />
                                <span
                                    style={{
                                        WebkitTextStroke: isMobile ? "1.5px white" : "2px white",
                                    }}
                                >
                                    Get
                                    <br />
                                    More.
                                </span>
                            </h3>
                        </motion.div>

                        {/* Right side: Dark card with ProPEL details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="lg:max-w-md shrink-0"
                        >
                            <div className="bg-gray-950/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
                                {/* ProPEL logo */}
                                <div className="mb-5">
                                    <Image
                                        src="/propel/propel-logo-2026.png"
                                        alt="ProPEL 2026 Logo"
                                        width={isMobile ? 70 : 90}
                                        height={isMobile ? 70 : 90}
                                        className="object-contain"
                                    />
                                </div>

                                <h4
                                    className="text-white font-black uppercase tracking-tight mb-3"
                                    style={{
                                        fontSize: isMobile ? "1.25rem" : "1.5rem",
                                        lineHeight: 1.1,
                                        letterSpacing: "-0.01em",
                                    }}
                                >
                                    Maximize Your AIM Experience!
                                </h4>
                                <p
                                    className="text-gray-300 mb-4"
                                    style={{
                                        fontSize: isMobile ? "0.875rem" : "1rem",
                                        lineHeight: 1.5,
                                        fontWeight: 400,
                                    }}
                                >
                                    Kickstart your AIM journey at ProPEL 2026, a pre-summit research symposium hosted by DHA Research and
                                    Engineering.
                                </p>
                                <p
                                    className="text-white mb-1"
                                    style={{
                                        fontSize: isMobile ? "0.875rem" : "1rem",
                                        lineHeight: 1.4,
                                        fontWeight: 700,
                                    }}
                                >
                                    1:00–5:30 p.m.&nbsp; |&nbsp; May 18, 2026&nbsp; |&nbsp; VelocityTX
                                </p>
                                <p
                                    className="italic text-gray-400 mb-6"
                                    style={{
                                        fontSize: isMobile ? "0.8rem" : "0.875rem",
                                        lineHeight: 1.4,
                                        fontWeight: 400,
                                    }}
                                >
                                    AIM Welcome Reception to Follow
                                </p>

                                {/* CTA button */}
                                <Link
                                    href="/propel"
                                    className="group inline-flex items-center gap-2 bg-white text-gray-950 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                    style={{
                                        fontSize: isMobile ? "0.875rem" : "1rem",
                                        lineHeight: 1.2,
                                        fontWeight: 700,
                                    }}
                                >
                                    Learn More
                                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
