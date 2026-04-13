"use client"

import { ArrowRight, Calendar, CalendarDays, Clock, Filter, MapPin, Users } from "lucide-react"
import { motion, useInView } from "motion/react"
import Link from "next/link"
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

interface ScheduleItem {
  id: string
  title: string
  description?: string
  date: string
  startTime: string
  endTime?: string
  location?: string
  speakerNames?: string[]
  track?: string
  trackNumber?: number
  type?: string
  order: number
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TIME_BLOCKS = [
  { id: "all", label: "Full Day", range: null },
  { id: "morning", label: "Morning", sublabel: "7 AM – 11 AM", range: ["07:00", "11:00"] as [string, string] },
  { id: "midday", label: "Midday", sublabel: "11 AM – 1:30 PM", range: ["11:00", "13:30"] as [string, string] },
  { id: "afternoon", label: "Afternoon", sublabel: "1:30 PM – 6 PM", range: ["13:30", "18:00"] as [string, string] },
]

const TYPE_FILTERS = [
  { id: "all", label: "All" },
  { id: "keynote", label: "Keynotes" },
  { id: "breakout", label: "Sessions" },
  { id: "panel", label: "Panels" },
  { id: "break", label: "Breaks" },
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
/*  Helper: format 24h time to 12h AM/PM                               */
/* ------------------------------------------------------------------ */

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number)
  const period = h >= 12 ? "PM" : "AM"
  const hour12 = h % 12 || 12
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`
}

/* ------------------------------------------------------------------ */
/*  Helper: check if time falls within a range                         */
/* ------------------------------------------------------------------ */

function isInTimeRange(time: string, range: [string, string] | null) {
  if (!range) return true
  return time >= range[0] && time < range[1]
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
    id: "fallback-biddinger",
    name: "Dr. Paul Biddinger",
    keynoteType: "morning",
    keynoteLabel: "Morning Keynote",
    sessionTitle: "Medicine, Preparedness, and Resilience",
    title: "Chief Preparedness and Continuity Officer, Mass General Brigham",
    organization: "Mass General Brigham",
    bio: "Dr. Paul Biddinger is the Chief Preparedness and Continuity Officer at Mass General Brigham, where he serves at the critical intersection of medicine, preparedness, and resilience.\n\nWith appointments at Harvard Medical School and the Harvard T.H. Chan School of Public Health, Dr. Biddinger is shaping how disaster medicine and emergency systems are researched, taught, and operationalized globally.\n\nFrom Hurricane Katrina and Superstorm Sandy to the Boston Marathon bombings and Nepal earthquakes, he doesn\u2019t just study disasters\u2014he\u2019s responded to them, led teams through them, and helped redesign systems to withstand them.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/aimsatx%2Fpaulbiddinger.png?alt=media",
    featured: true,
    order: 1,
  },
  {
    id: "fallback-hilmers",
    name: "Dr. David Hilmers",
    keynoteType: "lunch",
    keynoteLabel: "Lunch Keynote",
    sessionTitle: "Lessons from Space, Leadership for Earth",
    title: "Former NASA Astronaut, Marine Corps Colonel (Ret.), and Professor at Baylor College of Medicine",
    organization: "Baylor College of Medicine",
    bio: "NASA Astronaut, Marine Corps Colonel (Ret.), and Professor at Baylor College of Medicine, Dr. David Hilmers\u2019 career has been defined by exploration, service, and leadership at the highest levels.\n\nA veteran of four space shuttle missions, Dr. Hilmers now serves as a consultant on NASA-sponsored research advancing how astronauts deliver medical care during deep space exploration.\n\nBoard-certified in both internal medicine and pediatrics, he also brings more than two decades of clinical experience and global health leadership, serving as Chief Medical Officer for Hepatitis B Free, a nonprofit organization dedicated to the prevention and treatment of hepatitis in low and middle-income countries.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/aimsatx%2Fdavidhilmers.jpg?alt=media",
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
  const [allSpeakers, setAllSpeakers] = useState<Speaker[]>([])
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([])
  const [activeTimeBlock, setActiveTimeBlock] = useState("all")
  const [activeTypeFilter, setActiveTypeFilter] = useState("all")

  useEffect(() => {
    async function fetchData() {
      try {
        const [speakersRes, scheduleRes] = await Promise.all([
          fetch("/api/admin/speakers"),
          fetch("/api/admin/schedule"),
        ])

        if (speakersRes.ok) {
          const speakersData = await speakersRes.json()
          if (speakersData.success) {
            const speakers = speakersData.speakers as Speaker[]
            setAllSpeakers(speakers)
            const keynotes = speakers.filter(
              (s) => s.featured && s.keynoteType
            )
            if (keynotes.length > 0) setKeynoteSpeakers(keynotes)
          }
        }

        if (scheduleRes.ok) {
          const scheduleData = await scheduleRes.json()
          if (scheduleData.success && scheduleData.schedule?.length > 0) {
            setScheduleItems(scheduleData.schedule)
          }
        }
      } catch {
        // Use fallback data
      }
    }
    fetchData()
  }, [])

  // Build speaker name → imageUrl lookup (handles prefix mismatches like "Dr.", "The Honorable", etc.)
  const speakerImageMap = new Map<string, string>()
  for (const s of allSpeakers) {
    if (s.imageUrl && s.name) {
      speakerImageMap.set(s.name.toLowerCase(), s.imageUrl)
    }
  }
  function findSpeakerImage(scheduleName: string): string | undefined {
    const key = scheduleName.toLowerCase()
    // Exact match first
    const exact = speakerImageMap.get(key)
    if (exact) return exact
    // Check if schedule name is contained in any speaker name (e.g. "Paul Biddinger" in "Dr. Paul Biddinger")
    for (const [name, url] of speakerImageMap) {
      if (name.includes(key) || key.includes(name)) return url
    }
    return undefined
  }

  // Keynotes — sorted morning-first
  const keynotes = (keynoteSpeakers.length > 0 ? keynoteSpeakers : fallbackKeynotes).sort(sortKeynotes)

  // Filter schedule items
  const activeRange = TIME_BLOCKS.find(b => b.id === activeTimeBlock)?.range ?? null
  const filteredSchedule = scheduleItems
    .filter((item) => {
      if (!isInTimeRange(item.startTime, activeRange)) return false
      if (activeTypeFilter === "all") return true
      if (activeTypeFilter === "break") return item.type === "break" || item.type === "networking"
      return item.type === activeTypeFilter
    })
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return (a.startTime || "").localeCompare(b.startTime || "")
    })

  // Count items per time block for badges
  const countForBlock = (blockId: string) => {
    const range = TIME_BLOCKS.find(b => b.id === blockId)?.range ?? null
    return scheduleItems.filter(item => isInTimeRange(item.startTime, range)).length
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-white" aria-label="Agenda page">
      {/* ── Hero (keeps dark overlay on photo) ──────────────────── */}
      <section className="relative w-full overflow-hidden pt-32 md:pt-40 pb-20 sm:pb-28">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/aimsatx%2FCopy%20of%20DSCF3694.jpg?alt=media"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0a1628]/88" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center rounded-full bg-white/10 px-6 py-2 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm" style={{ lineHeight: 1.5 }}>
                <Calendar className="mr-2 h-4 w-4" />
                May 19, 2026 &middot; San Antonio, TX
              </div>
            </div>
          </FadeUp>
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
              <span className="text-white/90">Agenda</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="text-white/80 mx-auto mb-10"
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
                  <div className="text-xs text-white/70" style={{ lineHeight: 1.5 }}>One Day of Innovation</div>
                </div>
              </div>
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/15">
                <MapPin className="h-5 w-5 mr-3 text-white shrink-0" />
                <div className="text-left">
                  <div className="text-base font-semibold text-white" style={{ lineHeight: 1.4 }}>San Antonio, TX</div>
                  <div className="text-xs text-white/70" style={{ lineHeight: 1.5 }}>Henry B. Gonz&aacute;lez Convention Center</div>
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
                className="text-neutral-900"
                style={{
                  fontSize: isMobile ? "1.75rem" : "2.25rem",
                  fontWeight: 700,
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
                          fontWeight: 600,
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
                    <p className="text-neutral-500 mb-5" style={{ fontSize: "0.8125rem", lineHeight: 1.5, fontWeight: 500, letterSpacing: "0.01em" }}>
                      {speaker.title}
                    </p>
                    <div className="space-y-3">
                      {speaker.bio.split("\n\n").map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-neutral-600" style={{ fontSize: "0.8125rem", lineHeight: 1.75, fontWeight: 400 }}>
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

      {/* ── Day-Of Schedule ─────────────────────────────────────── */}
      {scheduleItems.length > 0 && (
        <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-neutral-50" id="day-of-schedule">
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
                  — Day-Of Schedule —
                </p>
                <h2
                  className="text-neutral-900"
                  style={{
                    fontSize: isMobile ? "1.75rem" : "2.25rem",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Tuesday, May 19, 2026
                </h2>
              </div>
            </FadeUp>

            {/* Time block tabs */}
            <FadeUp delay={0.05}>
              <div className="mb-6">
                <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-2`}>
                  {TIME_BLOCKS.map((block) => {
                    const isActive = activeTimeBlock === block.id
                    const count = block.id === "all" ? scheduleItems.length : countForBlock(block.id)
                    return (
                      <button
                        key={block.id}
                        onClick={() => setActiveTimeBlock(block.id)}
                        className={`group relative flex-1 rounded-xl px-4 py-3 text-left transition-all duration-200 cursor-pointer ${isActive
                          ? "bg-[#548cac]/10 border border-[#548cac]/30 ring-1 ring-[#548cac]/15"
                          : "bg-white border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`text-sm font-semibold ${isActive ? "text-[#2c5f78]" : "text-neutral-700"}`} style={{ lineHeight: 1.4 }}>
                              {block.label}
                            </div>
                            {block.sublabel && (
                              <div className={`text-xs mt-0.5 ${isActive ? "text-[#548cac]" : "text-neutral-400"}`} style={{ lineHeight: 1.4 }}>
                                {block.sublabel}
                              </div>
                            )}
                          </div>
                          <span className={`text-xs font-mono px-2 py-0.5 rounded-md ${isActive
                            ? "bg-[#548cac]/15 text-[#2c5f78]"
                            : "bg-neutral-100 text-neutral-400"
                            }`}>
                            {count}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </FadeUp>

            {/* Type filter chips */}
            <FadeUp delay={0.1}>
              <div className="flex items-center gap-2 mb-8 flex-wrap">
                <Filter className="w-3.5 h-3.5 text-neutral-400 mr-1" />
                {TYPE_FILTERS.map((filter) => {
                  const isActive = activeTypeFilter === filter.id
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveTypeFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${isActive
                        ? "bg-[#548cac] text-white"
                        : "bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 border border-neutral-200"
                        }`}
                    >
                      {filter.label}
                    </button>
                  )
                })}
              </div>
            </FadeUp>

            {/* Filtered results count */}
            <div className="mb-6 text-xs text-neutral-400" style={{ lineHeight: 1.5 }}>
              Showing {filteredSchedule.length} of {scheduleItems.length} items
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-linear-to-b from-[#548cac]/30 via-neutral-200 to-transparent" />

              {filteredSchedule.length === 0 ? (
                <div className="pl-10 sm:pl-14 py-12 text-center">
                  <p className="text-neutral-500" style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>No sessions match your filters.</p>
                  <button
                    onClick={() => { setActiveTimeBlock("all"); setActiveTypeFilter("all") }}
                    className="mt-3 text-[#2c5f78] text-sm font-medium hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredSchedule.map((item, idx) => {
                    const isKeynote = item.type === "keynote"
                    const isBreak = item.type === "break" || item.type === "networking"
                    const isPanel = item.type === "panel"
                    const typeColorMap: Record<string, string> = {
                      keynote: "bg-amber-100 text-amber-800 border-amber-200",
                      breakout: "bg-sky-100 text-sky-800 border-sky-200",
                      panel: "bg-teal-100 text-teal-800 border-teal-200",
                      break: "bg-emerald-100 text-emerald-800 border-emerald-200",
                      networking: "bg-emerald-100 text-emerald-800 border-emerald-200",
                      other: "bg-neutral-100 text-neutral-600 border-neutral-200",
                    }
                    const typeLabel: Record<string, string> = {
                      keynote: "Keynote",
                      breakout: "Session",
                      panel: "Panel",
                      break: "Break",
                      networking: "Networking",
                      other: "",
                    }
                    const colorClass = typeColorMap[item.type || "other"] || typeColorMap.other
                    const label = typeLabel[item.type || "other"] || ""

                    return (
                      <motion.div
                        key={item.id || idx}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: Math.min(idx * 0.02, 0.4) }}
                        className={`relative pl-10 sm:pl-14 ${isKeynote ? "py-1" : ""}`}
                      >
                        {/* Timeline dot */}
                        <div className={`absolute left-2.5 sm:left-4.5 top-4 w-3 h-3 rounded-full border-2 ${isKeynote
                          ? "bg-amber-500 border-amber-500"
                          : isBreak
                            ? "bg-emerald-500 border-emerald-500"
                            : isPanel
                              ? "bg-teal-500 border-teal-500"
                              : "bg-[#548cac] border-[#548cac]"
                          }`} />

                        <div className={`rounded-xl border p-4 sm:p-5 transition-colors ${isKeynote
                          ? "bg-amber-50 border-amber-200"
                          : isBreak
                            ? "bg-emerald-50 border-emerald-200"
                            : isPanel
                              ? "bg-teal-50 border-teal-200"
                              : "bg-white border-neutral-200 hover:bg-neutral-50"
                          }`}>
                          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                            {/* Time */}
                            <div className="flex items-center gap-1.5 shrink-0 text-neutral-500">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="text-xs font-mono tracking-wide" style={{ lineHeight: 1.5 }}>
                                {formatTime(item.startTime)}
                                {item.endTime ? ` – ${formatTime(item.endTime)}` : ""}
                              </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className={`text-sm sm:text-base font-semibold ${isKeynote ? "text-amber-900" : "text-neutral-900"}`} style={{ lineHeight: 1.4 }}>
                                  {item.title}
                                </h3>
                                {label && (
                                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${colorClass}`}>
                                    {label}
                                  </span>
                                )}
                              </div>

                              {item.description && (
                                <p className="text-neutral-600 mt-1.5" style={{ fontSize: "0.8125rem", lineHeight: 1.7 }}>
                                  {item.description}
                                </p>
                              )}

                              {item.location && (
                                <div className="flex items-center gap-1.5 text-neutral-500 mt-1.5">
                                  <MapPin className="w-3 h-3 shrink-0" />
                                  <span className="text-xs" style={{ lineHeight: 1.5 }}>{item.location}</span>
                                </div>
                              )}

                              {item.speakerNames && item.speakerNames.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 mt-3">
                                  {item.speakerNames.map((name, nIdx) => {
                                    const imgUrl = findSpeakerImage(name)
                                    return (
                                      <div key={nIdx} className="flex items-center gap-2 bg-[#548cac]/8 rounded-full pl-1 pr-3 py-1">
                                        {imgUrl ? (
                                          <img
                                            src={imgUrl}
                                            alt={name}
                                            className="w-6 h-6 rounded-full object-cover object-top shrink-0"
                                          />
                                        ) : (
                                          <div className="w-6 h-6 rounded-full bg-[#548cac]/20 flex items-center justify-center shrink-0">
                                            <Users className="w-3 h-3 text-[#548cac]" />
                                          </div>
                                        )}
                                        <span className="text-xs text-[#2c5f78] font-medium" style={{ lineHeight: 1.4 }}>
                                          {name}
                                        </span>
                                      </div>
                                    )
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
              className="text-white/80 mx-auto mb-10"
              style={{
                maxWidth: "36rem",
                fontSize: isMobile ? "0.9375rem" : "1.0625rem",
                lineHeight: 1.75,
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
