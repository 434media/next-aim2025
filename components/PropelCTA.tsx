"use client"

import { ArrowRight } from "lucide-react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { useMediaQuery } from "../hooks/useMediaQuery"

export function PropelCTA() {
    const isMobile = useMediaQuery("(max-width: 768px)")
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <div ref={sectionRef} className="w-full">
            {/* Main gradient section with large typography */}
            <div
                className="relative w-full overflow-hidden"
                style={{
                    background: "linear-gradient(180deg, #c8962e 0%, #b8943a 25%, #7a9a6a 50%, #5a9a8a 75%, #4a8aaa 100%)",
                }}
            >
                {/* Subtle AIM watermark */}
                <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden">
                    <span
                        className="text-white/6 font-black tracking-tighter"
                        style={{
                            fontSize: isMobile ? "40vw" : "28vw",
                            lineHeight: 0.85,
                            transform: "translateX(5%)",
                        }}
                    >
                        AIM
                    </span>
                </div>

                <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-32">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
                        {/* Large outlined typography */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="flex-1"
                        >
                            <h3
                                className="font-black uppercase tracking-tight"
                                style={{
                                    fontSize: isMobile ? "clamp(3.5rem, 18vw, 6rem)" : "clamp(5rem, 10vw, 10rem)",
                                    lineHeight: 0.85,
                                    color: "transparent",
                                    WebkitTextStroke: isMobile ? "1.5px rgba(255,255,255,0.9)" : "2px rgba(255,255,255,0.9)",
                                    letterSpacing: "-0.02em",
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

                        {/* AIM 2026 logo - bottom right on the gradient section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="shrink-0"
                        >
                            <Image
                                src="/propel/propel-logo-2026.png"
                                alt="ProPEL 2026"
                                width={isMobile ? 160 : 240}
                                height={isMobile ? 160 : 240}
                                className="object-contain"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Dark bottom bar with ProPEL details */}
            <div className="w-full bg-gray-950 relative">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10"
                    >
                        {/* ProPEL logo */}
                        <div className="shrink-0">
                            <Image
                                src="/propel/propel-logo-2026.png"
                                alt="ProPEL 2026 Logo"
                                width={isMobile ? 80 : 100}
                                height={isMobile ? 80 : 100}
                                className="rounded-full object-contain"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                            <h4
                                className="text-white font-black uppercase tracking-tight mb-2"
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
                                className="italic text-gray-400"
                                style={{
                                    fontSize: isMobile ? "0.8rem" : "0.875rem",
                                    lineHeight: 1.4,
                                    fontWeight: 400,
                                }}
                            >
                                AIM Welcome Reception to Follow
                            </p>
                        </div>

                        {/* CTA button */}
                        <div className="shrink-0 sm:self-center">
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
                {/* Gradient bleed into next section */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-black pointer-events-none" />
            </div>
        </div>
    )
}
