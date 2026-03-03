"use client"

import {
  ArrowUpRight,
  Beaker,
  BrainCircuit,
  ChevronDown,
  Clock,
  FlaskConical,
  Handshake,
  HeartPulse,
  Lightbulb,
  MapPin,
  Microscope,
  Users,
} from "lucide-react"
import { AnimatePresence, motion, useInView } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"

/* ------------------------------------------------------------------ */
/*  Images – stored locally in public/propel/                          */
/* ------------------------------------------------------------------ */

const images = {
  logo: "/propel/propel-logo-2026.jpg",
  venue: "/propel/propel-venue.JPG",
  prosthetics: "/propel/propel-prosthetics.jpg",
  research: "/propel/propel-research.jpg",
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const areasOfFocus = [
  {
    id: "ai",
    title: "AI & Data Science",
    icon: BrainCircuit,
    items: [
      "Artificial Intelligence in Clinical Decision-Making",
      "Precision Medicine & Bioinformatics",
    ],
  },
  {
    id: "trauma",
    title: "Trauma & Injury",
    icon: HeartPulse,
    items: [
      "Neurotrauma / TBI",
      "Hemorrhage & Vascular Dysfunction",
      "Craniofacial / Ocular / Hearing Trauma",
      "Burn Injury",
      "Wound Care & Healing",
    ],
  },
  {
    id: "performance",
    title: "Human Performance & Operational Medicine",
    icon: Users,
    items: [
      "Sleep Medicine",
      "Deployability",
      "Environmental Exposures",
    ],
  },
  {
    id: "emerging",
    title: "Emerging Technologies",
    icon: Lightbulb,
    items: [
      "Robotics & Sensors",
      "Organ Support Automation",
      "Space Medicine",
      "Naval Medicine",
    ],
  },
  {
    id: "rehab",
    title: "Rehabilitation & Recovery",
    icon: FlaskConical,
    items: [
      "Amputation & Prosthetics",
      "Pain & Sensory Injury",
      "Regenerative Medicine",
    ],
  },
  {
    id: "clinical",
    title: "Clinical & Community Health",
    icon: Microscope,
    items: [
      "Infectious Disease",
      "Mental Health",
      "Nursing Research",
      "Dental Innovations",
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Reusable CTA pair                                                  */
/* ------------------------------------------------------------------ */

function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        href="https://whova.com/portal/registration/D7sdZXdTCppF1KMzet5O/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3.5 bg-[#548cac] hover:bg-[#3a6b8a] text-white font-semibold rounded-lg shadow-lg shadow-[#548cac]/15 transition-all duration-300 flex items-center gap-2"
        >
          Register to Attend
          <ArrowUpRight className="size-4" />
        </motion.button>
      </Link>
      <Link href="https://utsaresearch.infoready4.com/#freeformCompetitionDetail/2003650">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3.5 border border-neutral-300 hover:border-[#548cac] hover:bg-[#548cac]/5 text-neutral-700 hover:text-[#548cac] font-medium rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          Submit A Poster
          <ArrowUpRight className="size-4" />
        </motion.button>
      </Link>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Accordion row for Areas of Focus                                   */
/* ------------------------------------------------------------------ */

function FocusAccordionItem({
  area,
  isOpen,
  onToggle,
}: {
  area: (typeof areasOfFocus)[number]
  isOpen: boolean
  onToggle: () => void
}) {
  const Icon = area.icon
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
        ? "border-[#548cac]/30 bg-white shadow-lg shadow-[#548cac]/5"
        : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md"
        }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#548cac] focus-visible:ring-inset"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div
            className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${isOpen
              ? "bg-[#548cac]/15 text-[#548cac]"
              : "bg-neutral-100 text-neutral-400"
              }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-semibold text-base sm:text-lg text-neutral-900 leading-snug truncate">
            {area.title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown
            className={`w-5 h-5 transition-colors ${isOpen ? "text-[#548cac]" : "text-neutral-400"
              }`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 space-y-2 border-t border-neutral-100">
              {area.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm sm:text-base text-neutral-600 leading-relaxed pt-2 first:pt-3"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#548cac] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProPELPage() {
  const introRef = useRef(null)
  const whyRef = useRef(null)
  const focusRef = useRef(null)
  const footerRef = useRef(null)

  const introInView = useInView(introRef, { once: true, amount: 0.2 })
  const whyInView = useInView(whyRef, { once: true, amount: 0.2 })
  const focusInView = useInView(focusRef, { once: true, amount: 0.15 })
  const footerInView = useInView(footerRef, { once: true, amount: 0.3 })

  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  return (
    <main className="min-dvh bg-white text-neutral-900">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-28 pb-12 md:pb-16 min-h-[calc(100dvh-4rem)] flex items-center">
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center text-center gap-6 md:gap-7">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={images.logo}
                alt="ProPEL 2026 – Promoting Professional Engagement Among Military Laboratories"
                width={140}
                height={140}
                className="mx-auto"
                priority
              />
            </motion.div>

            {/* Title block */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-3"
            >
              <h1 className="text-balance text-5xl md:text-6xl font-black tracking-tight leading-[0.92] text-neutral-900">
                Maximize Your{" "}
                <span className="text-[#548cac]">AIM</span>{" "}
                Experience!
              </h1>

              <p className="text-balance text-lg text-neutral-500 leading-relaxed max-w-xl mx-auto font-medium">
                Come Early for ProPEL 2026 and Stick Around for Our AIM Welcome
                Reception
              </p>
            </motion.div>

            {/* Presented by */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-balance text-sm text-[#548cac] font-bold tracking-[0.15em] uppercase"
            >
              Presented by DHA Research &amp; Engineering
            </motion.p>

            {/* Event meta — compact pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-2"
            >
              <div className="inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-neutral-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#548cac]" />
                  VelocityTX
                </span>
                <span className="w-px h-3.5 bg-neutral-300 hidden sm:block" />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#548cac]" />
                  May 18, 2026
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-1 text-sm text-neutral-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#548cac]" />
                  1:00 – 4:30 P.M. CT &nbsp;|&nbsp; ProPEL Research Symposium
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  4:30 – 6:00 P.M. CT &nbsp;|&nbsp; AIM Welcome Reception
                </span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <CTAButtons />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MODULE 1 — Introduction ──────────────────────────── */}
      <section ref={introRef} className="py-10 md:py-24 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={introInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text content */}
            <div className="space-y-8">
              {/* Section label */}
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-[#548cac]" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#548cac]">
                  Introduction
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[0.95] tracking-tight text-neutral-900">
                Promoting Professional{" "}
                <span className="text-[#548cac]">Engagement</span>{" "}
                Among Military Medical Laboratories
              </h2>

              <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                ProPEL is an in-person research symposium designed to advance
                collaboration, innovation, and research impact across the military
                medical community. Hosted by the Defense Health Agency, ProPEL
                convenes Department of War (DoW) and non-DoW
                professionals—including leaders from academia, industry, non-profits,
                and clinical practice—to present previously cleared research, fulfill
                grant dissemination requirements, and build strategic partnerships.
              </p>

              <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                By gathering military and civilian experts in one focused setting,
                ProPEL creates a powerful opportunity to connect, collaborate, and
                maximize engagement—without additional travel for AIM attendees.
              </p>

              <CTAButtons />
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={images.venue}
                  alt="ProPEL research symposium at VelocityTX – attendees networking and viewing poster presentations"
                  width={800}
                  height={533}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-[#548cac]/10" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── MODULE 2 — Why Attend ────────────────────────────── */}
      <section
        ref={whyRef}
        className="py-10 md:py-24 bg-gradient-to-b from-neutral-50 to-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={whyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 max-w-xs mx-auto">
              <span className="h-px flex-1 bg-[#548cac]/30" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#548cac]">
                Why Attend
              </span>
              <span className="h-px flex-1 bg-[#548cac]/30" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[0.95] tracking-tight text-neutral-900">
              Why Should I Attend{" "}
              <span className="text-[#548cac]">ProPEL?</span>
            </h2>
          </div>

          {/* Three cards with images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Handshake,
                title: "Networking Opportunities",
                description:
                  "Connect with military medical professionals at a pre-AIM event.",
                image: images.venue,
                imageAlt: "Attendees networking at ProPEL event",
              },
              {
                icon: Beaker,
                title: "Innovative Research Presentations",
                description:
                  "Learn about the latest discoveries in defense health innovation.",
                image: images.prosthetics,
                imageAlt: "Researcher presenting prosthetics innovations at ProPEL",
              },
              {
                icon: Users,
                title: "Collaboration",
                description:
                  "Engage with peers to shape the future of military medicine.",
                image: images.research,
                imageAlt: "Researchers discussing poster presentations at ProPEL",
              },
            ].map((card, i) => {
              const CardIcon = card.icon
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:border-[#548cac]/30 hover:shadow-xl transition-all duration-300"
                >
                  {/* Card image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Card content */}
                  <div className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#548cac]/10 text-[#548cac] group-hover:bg-[#548cac]/15 transition-colors duration-300 -mt-10 relative z-10 border-4 border-white shadow-md">
                      <CardIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 leading-snug mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* ── MODULE 3 — Areas of Focus ────────────────────────── */}
      <section ref={focusRef} className="py-10 md:py-24 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={focusInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl px-6 lg:px-8 space-y-10"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center gap-3 max-w-xs mx-auto">
              <span className="h-px flex-1 bg-[#548cac]/30" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#548cac]">
                Research Topics
              </span>
              <span className="h-px flex-1 bg-[#548cac]/30" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[0.95] tracking-tight text-neutral-900">
              Areas of{" "}
              <span className="text-[#548cac]">Focus</span>
            </h2>
          </div>

          {/* Accordion list */}
          <div className="space-y-3">
            {areasOfFocus.map((area) => (
              <FocusAccordionItem
                key={area.id}
                area={area}
                isOpen={openAccordion === area.id}
                onToggle={() =>
                  setOpenAccordion((prev) =>
                    prev === area.id ? null : area.id
                  )
                }
              />
            ))}
          </div>

          {/* CTA */}
          <div className="pt-4">
            <CTAButtons />
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER — Hosted by DHA ────────────────────────────── */}
      <section
        ref={footerRef}
        className="pb-20 bg-gradient-to-b from-white to-neutral-50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={footerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-xl px-6 text-center space-y-5"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={footerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#548cac] to-transparent mx-auto"
          />

          <Image
            src={images.logo}
            alt="ProPEL 2026"
            width={100}
            height={100}
            className="mx-auto"
          />

          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#548cac]">
            Hosted by
          </p>
          <p className="text-lg md:text-xl font-bold text-neutral-800 leading-snug">
            DHA Research &amp; Engineering
          </p>
        </motion.div>
      </section>
    </main>
  )
}
