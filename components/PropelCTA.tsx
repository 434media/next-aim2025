"use client"

import { ArrowRight } from "lucide-react"
import { motion, useInView } from "motion/react"
import { Orbitron } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { AIMLogo } from "../public/AIMLogo"

const orbitron = Orbitron({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap",
})

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
                            width: isMobile ? "80vw" : "50vw",
                            height: "auto",
                        }}
                    />
                </div>

                <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-32">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">
                        {/* Left side: CEGM large typography */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="flex-1"
                        >
                            <h3
                                className={`${orbitron.className} uppercase tracking-tight`}
                                style={{
                                    fontSize: isMobile ? "clamp(3.5rem, 18vw, 6rem)" : "clamp(5rem, 10vw, 10rem)",
                                    lineHeight: 0.85,
                                    color: "transparent",
                                    WebkitTextStroke: isMobile ? "1.5px rgba(255,255,255,0.9)" : "2px rgba(255,255,255,0.9)",
                                    letterSpacing: "-0.02em",
                                    fontWeight: 900,
                                }}
                            >
                                Come
                                <br />
                                Early.
                                <br />
                                <span
                                    style={{
                                        WebkitTextStroke: isMobile ? "1.5px white" : "2.5px white",
                                    }}
                                >
                                    Get
                                    <br />
                                    More.
                                </span>
                            </h3>
                        </motion.div>

                        {/* Right side: Maximize Your AIM Experience */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex-1 max-w-xl"
                        >
                            <div className="bg-gray-950/70 backdrop-blur-sm rounded-2xl p-8 sm:p-10">
                                {/* ProPEL logo */}
                                <div className="mb-6">
                                    <Image
                                        src="/propel/propel-logo-2026.png"
                                        alt="ProPEL 2026 Logo"
                                        width={isMobile ? 80 : 100}
                                        height={isMobile ? 80 : 100}
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
                                    1:00–4:30 p.m.&nbsp; |&nbsp; May 18, 2026&nbsp; |&nbsp; VelocityTX
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
