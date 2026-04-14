"use client"

import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react"
import { motion, useInView } from "motion/react"
import Link from "next/link"
import { useRef } from "react"
import { useMediaQuery } from "../hooks/useMediaQuery"

export function WelcomeReception() {
    const isMobile = useMediaQuery("(max-width: 768px)")
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <div ref={sectionRef} className="relative w-full overflow-hidden">
            {/* Background image */}
            <img
                src="https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/IMG_1758.JPG?alt=media"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Gradient overlay for contrast */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.85) 50%, rgba(10,22,40,0.95) 100%)",
                }}
            />

            {/* Bottom edge fade into next section */}
            <div
                className="absolute bottom-0 left-0 right-0 z-1 pointer-events-none"
                style={{
                    height: "40%",
                    background:
                        "linear-gradient(to top, #0a1628 0%, rgba(10,22,40,0.85) 40%, rgba(10,22,40,0.4) 70%, transparent 100%)",
                }}
            />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 gap-10">
                    {/* Left: Header + Meta */}
                    <div className="lg:w-5/12 shrink-0">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <p
                                className="text-[#548cac] mb-5"
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.2em",
                                    lineHeight: 1.5,
                                    textTransform: "uppercase",
                                }}
                            >
                                — Opening Night —
                            </p>
                            <h2
                                className="text-white mb-8"
                                style={{
                                    fontSize: isMobile ? "clamp(1.75rem, 8vw, 2.25rem)" : "2.5rem",
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    letterSpacing: "-0.03em",
                                }}
                            >
                                AIM Welcome
                                <br />
                                Reception
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-2.5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
                                    <Calendar className="w-4 h-4 text-[#548cac]" />
                                </div>
                                <div>
                                    <p
                                        className="text-white/90"
                                        style={{ fontSize: "0.8125rem", fontWeight: 500, lineHeight: 1.4, letterSpacing: "0.01em" }}
                                    >
                                        Monday, May 18, 2026
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
                                    <Clock className="w-4 h-4 text-[#548cac]" />
                                </div>
                                <div>
                                    <p
                                        className="text-white/90"
                                        style={{ fontSize: "0.8125rem", fontWeight: 500, lineHeight: 1.4, letterSpacing: "0.01em" }}
                                    >
                                        6:00&ndash;9:00 p.m.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
                                    <MapPin className="w-4 h-4 text-[#548cac]" />
                                </div>
                                <div>
                                    <p
                                        className="text-white/90"
                                        style={{ fontSize: "0.8125rem", fontWeight: 500, lineHeight: 1.4, letterSpacing: "0.01em" }}
                                    >
                                        1305 E Houston St. San Antonio, TX 78205
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Description + CTA */}
                    <div className="lg:w-7/12">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-4"
                        >
                            <p
                                className="text-white/90"
                                style={{
                                    fontSize: isMobile ? "1rem" : "1.0625rem",
                                    lineHeight: 1.8,
                                    fontWeight: 400,
                                    letterSpacing: "0.005em",
                                }}
                            >
                                Join us for a special opening reception designed to spark connection, conversation, and celebration. This relaxed, happy hour-style gathering gives attendees a chance to meet fellow participants, grow their networks, and kick off the Summit in a welcoming social setting.
                            </p>
                            <p
                                className="text-white/70"
                                style={{
                                    fontSize: isMobile ? "0.875rem" : "0.9375rem",
                                    lineHeight: 1.8,
                                    fontWeight: 400,
                                    letterSpacing: "0.005em",
                                }}
                            >
                                Guests will enjoy light bites, casual networking, and a bourbon tasting throughout the evening. The reception will also feature interactive elements, demonstrations, and opportunities to explore innovative work in medical modeling, simulation, and training.
                            </p>
                            <p
                                className="text-white/70"
                                style={{
                                    fontSize: isMobile ? "0.875rem" : "0.9375rem",
                                    lineHeight: 1.8,
                                    fontWeight: 400,
                                    letterSpacing: "0.005em",
                                }}
                            >
                                Whether you are attending AIM for the first time or reconnecting with colleagues, this event is the perfect way to begin your Summit experience.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-8"
                        >
                            <Link
                                href="/agenda"
                                className="group inline-flex items-center gap-2 bg-white text-[#0a1628] font-bold px-7 py-3.5 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                                style={{ fontSize: "0.9375rem", lineHeight: 1.2 }}
                            >
                                View Full Agenda
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
