"use client"

import { ArrowRight, Calendar, CalendarDays, MapPin } from "lucide-react"
import { motion, useInView } from "motion/react"
import Link from "next/link"
import Script from "next/script"
import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "../../hooks/useMediaQuery"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Speaker {
  id: string
  name: string
  title: string
  organization: string
  bio: string
  imageUrl: string
  keynoteType?: string
  keynoteLabel?: string
  sessionTitle?: string
  featured: boolean
  order: number
}

/* ------------------------------------------------------------------ */
/*  Summit Themes & Breakout Seminars                                  */
/* ------------------------------------------------------------------ */

interface ThemeSpeaker {
  name: string
  title: string
}

interface ThemeSession {
  title: string
  speakers: ThemeSpeaker[]
}

interface SummitTheme {
  number: number
  title: string
  sessions: ThemeSession[]
}

const SUMMIT_THEMES: SummitTheme[] = [
  {
    number: 1,
    title: "Translational Approaches in Regenerative Sciences and Modeling",
    sessions: [
      {
        title: "From Beer to Blood",
        speakers: [
          { name: "Kim Reeves", title: "Co Founder & CEO, Legacy Innovation" },
        ],
      },
      {
        title: "Transformative Grafts and Next-Generation Maxillofacial Reconstruction",
        speakers: [
          { name: "Ayelet Di Segni", title: "Director, Sheba Tissue & Cell Bank" },
          { name: "Kurt Klitzke", title: "Co-Founder & Chief Technology Officer, AlexiGen Biotech" },
          { name: "COL Kevin Gillespie", title: "Executive Director, Tri-Service Dental Research Consortium at US Army Institute of Surgical Research" },
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Enabling Long-Duration Mission Healthcare and Crew Survival",
    sessions: [
      {
        title: "The Ultimate Constraint: Medicine in the Void",
        speakers: [
          { name: "Lauren Cornell", title: "Lead Scientist, Diagnostics & Therapeutics, US Air Force 59th Medical Wing" },
          { name: "William Buras", title: "Senior Director, Life Sciences, Tietronix Software" },
        ],
      },
      {
        title: "Care Without Proximity: Extending the Lifeline in Austere Environments",
        speakers: [
          { name: "LTC Gary Legault", title: "Senior Scientist, US Army Institute of Surgical Research" },
        ],
      },
    ],
  },
  {
    number: 3,
    title: "Integrated Strategies for Peak Performance and Health",
    sessions: [
      {
        title: "The Invisible Front: Objective Signals in Cognitive Chaos",
        speakers: [
          { name: "Amit Mehta", title: "Chief Executive Officer, Amplifier Health" },
          { name: "David Zakariaie", title: "Founder and Chief Executive Officer, Senseye" },
          { name: "Don McGeary", title: "Professor, Department of Psychiatry, UT Health San Antonio" },
        ],
      },
      {
        title: "Leadership from the Face the Fight: Preventing Veteran Suicide During the Critical Transition to Civilian Life",
        speakers: [
          { name: "Chris Ford", title: "Lt Col, USAF (Ret); Principal, Face the Fight coalition, USAA" },
          { name: "Mike Eastman", title: "BG (Ret.), US Army; Executive Director, Onward Ops" },
          { name: "Joseph C. Geraci, PhD", title: "LTC (Ret.), US Army; Director, VA Transitioning Servicemember/Veteran And Suicide Prevention Center (TASC)" },
          { name: "Alfred K. Flowers, Sr", title: "Maj Gen, USAF (Ret.); Board Chairman, Reach Resilience" },
        ],
      },
    ],
  },
  {
    number: 4,
    title: "Modernizing Medical Workforce Development",
    sessions: [
      {
        title: "Session details TBA",
        speakers: [],
      },
    ],
  },
  {
    number: 5,
    title: "Innovative Technologies in Low-Resource Settings",
    sessions: [
      {
        title: "The 10 Day Solution: AI, Repurposing + Rapid Response",
        speakers: [
          { name: "Cory Hallam", title: "Texas Biomedical Research Institute" },
        ],
      },
      {
        title: "Out of the Lab: Regional Proving Grounds for Resource-Constrained Care",
        speakers: [
          { name: "Sean Biggerstaff", title: "Acting Director, Research and Engineering Directorate, Defense Health Agency" },
          { name: "Jason Moats", title: "Director, USA Center for Rural Public Health Preparedness at Texas A&M University" },
          { name: "Eric Epley", title: "Executive Director and Chief Executive Officer, Southwest Texas Regional Advisory Council (STRAC)" },
          { name: "W. Douglas Gissendanner", title: "Program Manager, The Geneva Foundation" },
        ],
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Innovation Capital & Funding Support                               */
/* ------------------------------------------------------------------ */

interface CapitalSession {
  title: string
  description: string
  speakers: ThemeSpeaker[]
}

const INNOVATION_CAPITAL_SESSIONS: CapitalSession[] = [
  {
    title: "Cup of Capital",
    description: "Curated conversations connecting innovators with investors to explore funding pathways and commercialization strategies.",
    speakers: [
      { name: "Dr. Luis Martinez", title: "Principal, Capital Factory" },
    ],
  },
  {
    title: "Architecting Congressional Support: Navigating the Appropriations Maze",
    description: "Insights into federal funding mechanisms, policy priorities, and how to effectively position programs for support.",
    speakers: [
      { name: "Jonathan Miller", title: "Principal, Cornerstone Government Affairs" },
    ],
  },
  {
    title: "Pitch Scrimmage",
    description: "Live, feedback-driven pitch sessions where startups and researchers refine their narratives with input from investors and industry leaders.",
    speakers: [
      { name: "Emma Gregory", title: "Branch Chief, Science & Technology Portfolio Management, Defense Health Agency" },
      { name: "Gabi Niederauer", title: "Co-Founder and Chief Executive Officer, Freyya" },
      { name: "Sebastian Garzon", title: "Managing Partner, Alamo Angels" },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Reusable fade-in wrapper                                           */
/* ------------------------------------------------------------------ */

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Keynote sort: "morning" before "lunch"                             */
/* ------------------------------------------------------------------ */

const keynoteOrder: Record<string, number> = { morning: 0, lunch: 1 }

function sortKeynotes(a: Speaker, b: Speaker) {
  const aOrder = keynoteOrder[a.keynoteType || ""] ?? 99
  const bOrder = keynoteOrder[b.keynoteType || ""] ?? 99
  if (aOrder !== bOrder) return aOrder - bOrder
  return a.order - b.order
}

/* ------------------------------------------------------------------ */
/*  Fallback keynote data                                              */
/* ------------------------------------------------------------------ */

const fallbackKeynotes: Speaker[] = [
  {
    id: "fallback-morning-keynote",
    name: "Morning Keynote",
    keynoteType: "morning",
    keynoteLabel: "Morning Keynote",
    sessionTitle: "To Be Announced",
    title: "AIM 2026 Summit",
    organization: "AIM Health R&D Summit",
    bio: "The AIM 2026 morning keynote speaker will be announced soon. Check back for updates on this featured address opening the summit.",
    imageUrl: "",
    featured: true,
    order: 1,
  },
  {
    id: "fallback-lunch-keynote",
    name: "Lunch Keynote",
    keynoteType: "lunch",
    keynoteLabel: "Lunch Keynote",
    sessionTitle: "To Be Announced",
    title: "AIM 2026 Summit",
    organization: "AIM Health R&D Summit",
    bio: "The AIM 2026 lunch keynote speaker will be announced soon. Check back for updates on this featured address.",
    imageUrl: "",
    featured: true,
    order: 2,
  },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AgendaPage() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [keynoteSpeakers, setKeynoteSpeakers] = useState<Speaker[]>([])


  useEffect(() => {
    async function fetchData() {
      try {
        const speakersRes = await fetch("/api/admin/speakers")

        if (speakersRes.ok) {
          const speakersData = await speakersRes.json()
          if (speakersData.success) {
            const speakers = speakersData.speakers as Speaker[]
            const keynotes = speakers.filter(
              (s) => s.featured && s.keynoteType
            )
            if (keynotes.length > 0) setKeynoteSpeakers(keynotes)
          }
        }

      } catch {
        // Use fallback data
      }
    }
    fetchData()
  }, [])

  // Keynotes — sorted morning-first
  const keynotes = (keynoteSpeakers.length > 0 ? keynoteSpeakers : fallbackKeynotes).sort(sortKeynotes)

  return (
    <main className="flex min-h-screen flex-col items-center bg-white" aria-label="Agenda page">
      {/* ── Hero (keeps dark overlay on photo) ──────────────────── */}
      <section className="relative w-full overflow-hidden pt-32 md:pt-40 lg:pt-48 pb-20 sm:pb-28">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/aimsatx%2F0P3A0058.jpg?alt=media"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0a1628]/88" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          
          <FadeUp delay={0.1}>
            <h1
              className="mb-6"
              style={{
                fontSize: isMobile ? "clamp(2.25rem, 10vw, 3rem)" : "clamp(3rem, 5vw, 4.5rem)",
                lineHeight: 1.1,
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              <span className="text-white">
                AIM 2026
              </span>
              <br />
              <span className="text-white">Agenda</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="text-white/90 mx-auto mb-10"
              style={{
                maxWidth: "42rem",
                fontSize: isMobile ? "1rem" : "1.125rem",
                lineHeight: 1.75,
                fontWeight: 400,
              }}
            >
              One day. Five tracks. Dozens of sessions connecting military and civilian leaders, researchers, and innovators to advance life-saving medical breakthroughs&mdash;from regenerative science to austere care delivery.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/15">
                <CalendarDays className="h-5 w-5 mr-3 text-white shrink-0" />
                <div className="text-left">
                  <div className="text-base font-semibold text-white" style={{ lineHeight: 1.4 }}>Tuesday, May 19, 2026</div>
                  <div className="text-xs text-white/80" style={{ lineHeight: 1.5 }}>One Day of Innovation</div>
                </div>
              </div>
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/15">
                <MapPin className="h-5 w-5 mr-3 text-white shrink-0" />
                <div className="text-left">
                  <div className="text-base font-semibold text-white" style={{ lineHeight: 1.4 }}>San Antonio, TX</div>
                  <div className="text-xs text-white/80" style={{ lineHeight: 1.5 }}>Henry B. Gonz&aacute;lez Convention Center</div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Keynote Sessions (horizontal marquee) ────────────── */}
      <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-white" id="keynotes">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-10 sm:mb-14">
              <p
                className="text-[#548cac] mb-3"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  lineHeight: 1.5,
                  textTransform: "uppercase",
                }}
              >
                — Keynote Sessions —
              </p>
              <h2
                className="text-neutral-950"
                style={{
                  fontSize: isMobile ? "1.75rem" : "2.25rem",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Featured Speakers
              </h2>
            </div>
          </FadeUp>
        </div>

        {/* Side-by-side keynote cards */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-2 gap-6"}`}>
            {keynotes.map((speaker) => (
              <div
                key={speaker.id}
                id={`keynote-${speaker.name.split(" ").pop()?.toLowerCase()}`}
                className="scroll-mt-32"
              >
                <div className="h-full rounded-2xl border border-neutral-200 bg-neutral-50 overflow-hidden hover:border-neutral-300 transition-colors duration-300 flex flex-col">
                  {/* Top: photo + label band */}
                  <div className="relative h-56 sm:h-64 overflow-hidden shrink-0">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/aimsatx%2F0P3A0015.jpg?alt=media"
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0a1628]/85" />

                    <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
                      {speaker.imageUrl && (
                        <div className="relative w-28 h-32 sm:w-32 sm:h-36 mb-3">
                          <div
                            className="absolute inset-0"
                            style={{
                              clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                              background: "linear-gradient(135deg, rgba(84,140,172,0.5), rgba(84,140,172,0.15))",
                            }}
                          />
                          <div
                            className="absolute inset-0.75"
                            style={{ clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)" }}
                          >
                            <img
                              src={speaker.imageUrl}
                              alt={speaker.name}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        </div>
                      )}

                      <p
                        className="text-[#548cac]"
                        style={{
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                        }}
                      >
                        — {speaker.keynoteLabel || "Keynote"} —
                      </p>
                      <h3
                        className="text-white uppercase mt-1.5"
                        style={{
                          fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                          fontWeight: 800,
                          letterSpacing: "0.05em",
                          lineHeight: 1.15,
                        }}
                      >
                        {speaker.name}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom: details on white */}
                  <div className="p-5 sm:p-6 flex-1">
                    {speaker.sessionTitle && (
                      <p className="text-[#2c5f78] mb-2" style={{ fontSize: "0.9375rem", lineHeight: 1.5, fontWeight: 600, fontStyle: "italic" }}>
                        &ldquo;{speaker.sessionTitle}&rdquo;
                      </p>
                    )}
                    <p className="text-neutral-600 mb-5" style={{ fontSize: "0.8125rem", lineHeight: 1.6, fontWeight: 500, letterSpacing: "0.01em" }}>
                      {speaker.title}
                    </p>
                    <div className="space-y-3">
                      {speaker.bio.split("\n\n").map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-neutral-700" style={{ fontSize: "0.8125rem", lineHeight: 1.75, fontWeight: 400 }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Summit Themes & Breakout Seminars ──────────────── */}
      <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-white" id="themes">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-10 sm:mb-14">
              <p
                className="text-[#548cac] mb-3"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  lineHeight: 1.5,
                  textTransform: "uppercase",
                }}
              >
                — Summit Themes —
              </p>
              <h2
                className="text-neutral-950"
                style={{
                  fontSize: isMobile ? "1.75rem" : "2.25rem",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Themes &amp; Breakout Seminars
              </h2>
              <p
                className="text-neutral-600 mt-4"
                style={{
                  maxWidth: "42rem",
                  fontSize: isMobile ? "0.9375rem" : "1.0625rem",
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                Five tracks exploring the frontiers of military and civilian medical innovation&mdash;from regenerative science to resource-constrained care.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-6">
            {SUMMIT_THEMES.map((theme, tIdx) => (
              <FadeUp key={theme.number} delay={tIdx * 0.05}>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 overflow-hidden hover:border-neutral-300 transition-colors duration-300">
                  {/* Theme header */}
                  <div className="bg-[#0a1628] px-5 sm:px-6 py-4 flex items-start gap-4">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#548cac]/20 text-[#548cac] text-sm font-bold shrink-0 mt-0.5">
                      {theme.number}
                    </div>
                    <h3
                      className="text-white"
                      style={{
                        fontSize: isMobile ? "1rem" : "1.125rem",
                        fontWeight: 700,
                        lineHeight: 1.35,
                      }}
                    >
                      {theme.title}
                    </h3>
                  </div>

                  {/* Sessions under this theme */}
                  <div className="divide-y divide-neutral-200">
                    {theme.sessions.map((session, sIdx) => (
                      <div key={sIdx} className="px-5 sm:px-6 py-4">
                        <h4
                          className="text-[#2c5f78] mb-2"
                          style={{
                            fontSize: "0.9375rem",
                            fontWeight: 600,
                            lineHeight: 1.5,
                            fontStyle: "italic",
                          }}
                        >
                          &ldquo;{session.title}&rdquo;
                        </h4>
                        {session.speakers.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {session.speakers.map((speaker, spIdx) => (
                              <div
                                key={spIdx}
                                className="flex items-center gap-2 bg-[#548cac]/8 rounded-full px-3 py-1"
                              >
                                <div>
                                  <span className="text-xs text-[#2c5f78] font-medium" style={{ lineHeight: 1.4 }}>
                                    {speaker.name}
                                  </span>
                                  <span className="text-[11px] text-neutral-600 block" style={{ lineHeight: 1.4 }}>
                                    {speaker.title}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-neutral-500 italic" style={{ lineHeight: 1.5 }}>
                            Details to be announced
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Innovation Capital & Funding Support ─────────────── */}
      <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-neutral-50" id="innovation-capital">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-10 sm:mb-14">
              <p
                className="text-[#548cac] mb-3"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  lineHeight: 1.5,
                  textTransform: "uppercase",
                }}
              >
                — Funding &amp; Investment —
              </p>
              <h2
                className="text-neutral-950"
                style={{
                  fontSize: isMobile ? "1.75rem" : "2.25rem",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Innovation Capital &amp; Funding Support
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INNOVATION_CAPITAL_SESSIONS.map((session, idx) => (
              <FadeUp key={idx} delay={idx * 0.08}>
                <div className="h-full rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 hover:border-neutral-300 transition-colors duration-300 flex flex-col">
                  <h3
                    className="text-neutral-950 mb-2"
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      lineHeight: 1.35,
                    }}
                  >
                    {session.title}
                  </h3>
                  <p
                    className="text-neutral-600 mb-4 flex-1"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      fontWeight: 400,
                    }}
                  >
                    {session.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-neutral-100">
                    {session.speakers.map((speaker, spIdx) => (
                      <div
                        key={spIdx}
                        className="flex items-center gap-2 bg-[#548cac]/8 rounded-full px-3 py-1"
                      >
                        <div>
                          <span className="text-xs text-[#2c5f78] font-medium" style={{ lineHeight: 1.4 }}>
                            {speaker.name}
                          </span>
                          <span className="text-[11px] text-neutral-600 block" style={{ lineHeight: 1.4 }}>
                            {speaker.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Whova Schedule Embed ────────────────────────────── */}
      <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-white" id="schedule">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-10 sm:mb-14">
              <p
                className="text-[#548cac] mb-3"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  lineHeight: 1.5,
                  textTransform: "uppercase",
                }}
              >
                — Full Schedule —
              </p>
              <h2
                className="text-neutral-950"
                style={{
                  fontSize: isMobile ? "1.75rem" : "2.25rem",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Tuesday, May 19, 2026
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="min-h-150">
              <div title="Whova event and conference app" id="whova-agendawidget">
                <p id="whova-loading" className="text-neutral-500 text-sm" style={{ lineHeight: 1.5 }}>Loading schedule…</p>
              </div>
              <Script
                src="https://whova.com/static/frontend/xems/js/embed/embedagenda.js?eid=n6nuH8kt3ZOcuu-iknbxLWMfSBelDEv06dvljrmlbzM%3D&host=https://whova.com"
                id="embeded-agenda-script"
                strategy="afterInteractive"
              />
              <div className="mt-6 text-center text-xs text-neutral-500" style={{ lineHeight: 1.5 }}>
                Powered by{" "}
                <a
                  className="font-semibold text-[#548cac] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://whova.com"
                >
                  Whova
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden py-20 sm:py-28">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/aimsatx%2F0P3A0020.jpg?alt=media"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0a1628]/88" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
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
              — Be Part of the Mission —
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="text-white mb-6"
              style={{
                fontSize: isMobile ? "1.75rem" : "2.25rem",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Ready to Advance Innovation in Medicine?
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="text-white/90 mx-auto mb-10 text-balance"
              style={{
                maxWidth: "36rem",
                fontSize: isMobile ? "0.9375rem" : "1.0625rem",
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Join military and civilian leaders, researchers, and innovators for a day of breakthrough sessions, keynotes, and connections shaping the future of medicine.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://whova.com/portal/registration/D7sdZXdTCppF1KMzet5O/"
                className="group inline-flex items-center gap-2 bg-white text-[#0a1628] font-bold px-8 py-3.5 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                style={{ fontSize: "0.9375rem", lineHeight: 1.2 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Tickets
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/propel"
                className="group inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/20 hover:bg-white/15 backdrop-blur-sm transition-colors duration-200"
                style={{ fontSize: "0.9375rem", lineHeight: 1.2 }}
              >
                Explore ProPEL
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  )
}
