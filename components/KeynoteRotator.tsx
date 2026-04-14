"use client"

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { AIMLogo } from "../public/AIMLogo"

interface KeynoteSlide {
    label: string
    title: string
    speakerName: string
    speakerTitle: string
    imageUrl: string
    href: string
}

const slides: KeynoteSlide[] = [
    {
        label: "Morning Keynote",
        title: "Medicine, Preparedness, and Resilience",
        speakerName: "Dr. Paul Biddinger",
        speakerTitle:
            "Chief Preparedness and Continuity Officer, Mass General Brigham",
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/aimsatx%2Fpaulbiddinger.png?alt=media",
        href: "/agenda#keynote-biddinger",
    },
    {
        label: "Lunch Keynote",
        title: "Lessons from Space, Leadership for Earth",
        speakerName: "Dr. David Hilmers",
        speakerTitle:
            "Former NASA Astronaut, Marine Corps Colonel (Ret.), and Professor at Baylor College of Medicine",
        imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/aimsatx%2Fdavidhilmers.jpg?alt=media",
        href: "/agenda#keynote-hilmers",
    },
]

/* Hexagon clip-path (pointy-top orientation matching reference) */
const HEXAGON_CLIP = "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)"

export function KeynoteRotator() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1)
    const isMobile = useMediaQuery("(max-width: 768px)")

    const next = useCallback(() => {
        setDirection(1)
        setCurrent((prev) => (prev + 1) % slides.length)
    }, [])

    const prev = useCallback(() => {
        setDirection(-1)
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    }, [])

    useEffect(() => {
        const interval = setInterval(next, 7000)
        return () => clearInterval(interval)
    }, [next])

    const slide = slides[current]

    const textVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 60 : -60,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -60 : 60,
            opacity: 0,
        }),
    }

    return (
        <section className="relative w-full overflow-hidden">
            {/* Background image */}
            <img
                src="https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/aimsatx%2F0P3A0015.jpg?alt=media"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Dark blue overlay matching reference */}
            <div className="absolute inset-0 bg-[#0a1628]/88" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
                <div className={`flex ${isMobile ? "flex-col items-center gap-10" : "items-center gap-14 lg:gap-20"}`}>
                    {/* Hexagonal photo frame */}
                    <div className={`${isMobile ? "" : "shrink-0"}`}>
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={{
                                    enter: () => ({ opacity: 0, scale: 0.9 }),
                                    center: { opacity: 1, scale: 1 },
                                    exit: () => ({ opacity: 0, scale: 0.9 }),
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="relative"
                            >
                                <div
                                    className={`relative ${isMobile ? "w-60 h-68" : "w-72 h-80 lg:w-80 lg:h-88"}`}
                                >
                                    {/* Outer hexagon border */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            clipPath: HEXAGON_CLIP,
                                            background: "linear-gradient(135deg, rgba(84,140,172,0.5), rgba(84,140,172,0.15))",
                                        }}
                                    />
                                    {/* Inner hexagon with image */}
                                    <div
                                        className="absolute inset-0.75"
                                        style={{ clipPath: HEXAGON_CLIP }}
                                    >
                                        <img
                                            src={slide.imageUrl}
                                            alt={slide.speakerName}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Text content */}
                    <div className={`flex-1 min-w-0 ${isMobile ? "text-center" : ""}`}>
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* AIM Logo */}
                                <div className={`mb-5 ${isMobile ? "flex justify-center" : ""}`}>
                                    <AIMLogo variant="white" className="h-12 w-auto opacity-80" />
                                </div>

                                {/* Keynote label — dashes on either side like the reference */}
                                <p
                                    className="text-white/80 mb-6"
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        letterSpacing: "0.25em",
                                        lineHeight: 1,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    — {slide.label} —
                                </p>

                                {/* Speaker name — large uppercase tracked type matching reference */}
                                <h2
                                    className="text-white uppercase"
                                    style={{
                                        fontSize: isMobile
                                            ? "clamp(1.75rem, 8vw, 2.5rem)"
                                            : "clamp(2.5rem, 4.5vw, 4rem)",
                                        lineHeight: 1,
                                        fontWeight: 800,
                                        letterSpacing: "0.06em",
                                    }}
                                >
                                    {slide.speakerName}
                                </h2>

                                {/* Speaker title */}
                                <p
                                    className="text-white/70 mt-4"
                                    style={{
                                        fontSize: isMobile ? "0.8125rem" : "0.9375rem",
                                        lineHeight: 1.6,
                                        fontWeight: 400,
                                        letterSpacing: "0.01em",
                                        maxWidth: isMobile ? "100%" : "30rem",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {slide.speakerTitle}
                                </p>

                                {/* Learn More CTA */}
                                <Link
                                    href={slide.href}
                                    className="inline-flex items-center gap-2 mt-8 text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300 group"
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation controls */}
                <div className={`flex items-center gap-4 mt-12 sm:mt-14 ${isMobile ? "justify-center" : ""}`}>
                    <button
                        onClick={prev}
                        aria-label="Previous keynote"
                        className="p-2 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-all duration-300 cursor-pointer"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > current ? 1 : -1)
                                    setCurrent(idx)
                                }}
                                aria-label={`Go to slide ${idx + 1}`}
                                className="cursor-pointer"
                            >
                                <div
                                    className={`h-1 rounded-full transition-all duration-500 ${idx === current
                                        ? "w-8 bg-white"
                                        : "w-4 bg-white/25 hover:bg-white/40"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={next}
                        aria-label="Next keynote"
                        className="p-2 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-all duration-300 cursor-pointer"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    )
}
