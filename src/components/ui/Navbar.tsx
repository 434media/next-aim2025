"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import Link from "next/link"
import { RiMenuLine } from "@remixicon/react"
import { AIMLogo } from "../../../public/AIMLogo"
import DesktopMenu from "../navbar/DesktopMenu"
import MobileMenu from "../navbar/MobileMenu"
import type { MenuItem, NewsItem, EventInfo } from "../navbar/types"

const menuItems: MenuItem[] = [
  { name: "AIM Pre-Conference Symposiums", href: "/pre-conference-symposiums" },
  {
    name: "Agenda",
    dropdown: [
      { name: "Keynotes", href: "/keynotes" },
      { name: "Schedule", href: "/schedule" },
      { name: "Speakers", href: "/speakers" },
    ],
  },
  {
    name: "Sponsors & Exhibitors",
    href: "/sponsors-exhibitors",
  },
  {
    name: "More",
    dropdown: [
      { name: "SURF", href: "/surf" },
      { name: "Why Attend", href: "/why-attend" },
      { name: "Travel & Venue", href: "/travel-venue" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact Us", href: "/contact-us" },
    ],
  },
]

const eventInfo: EventInfo = {
  aim: {
    name: <AIMLogo variant="white" className="h-8 w-auto hover:opacity-80 transition-all duration-300" />,
    date: "June 16, 2025",
  },
  venue: "Henry B. González Convention Center",
  location: "San Antonio, TX",
}

const initialNewsItems: NewsItem[] = [
  {
    label: "AIM 2025 SYMPOSIUMS",
    href: "https://www.eventbrite.com/e/sneak-preview-aim-2025-sme-encounter-sessions-tickets-1234940392959",
  },
  {
    label: "NAVIGATING MEDICAL IP",
    href: "https://www.eventbrite.com/e/pathways-to-innovation-navigating-medical-ip-with-the-federal-government-tickets-1237932362019",
  },
  {
    label: "PATHWAYS TO COMMERCIALIZATION",
    href: "https://www.eventbrite.com/e/pathways-to-commercialization-leveraging-federal-private-sector-funding-tickets-1238030736259",
  },
]

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const headerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  // Smooth scroll-based transforms
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 4])

  const newsItems = useMemo(() => initialNewsItems, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu()
      }
    },
    [closeMenu],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, handleKeyDown])

  return (
    <motion.header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        opacity: headerOpacity,
      }}
    >
      <motion.div
        className="relative"
        style={{
          backdropFilter: `blur(${headerBlur}px)`,
        }}
      >
        {/* Unified Banner */}
        <motion.div
          className="bg-gradient-to-r from-[#101310] via-[#101310] to-[#0f1f0f] relative overflow-hidden border-b border-white/5"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Subtle animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(84, 140, 172, 0.3) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#548cac]/5 to-transparent opacity-50" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Mobile Layout */}
            <div className="md:hidden flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-3" aria-label="AIM Health R&D Summit Home">
                  <motion.span
                    className="relative flex items-center justify-center"
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AIMLogo variant="white" className="h-8 w-auto" />
                    <motion.span
                      className="absolute inset-0 rounded-md bg-[#548cac]/10 opacity-0 hover:opacity-100 blur-sm transition-opacity duration-300"
                      aria-hidden="true"
                    />
                  </motion.span>
                </Link>
                <div className="text-left">
                  <div className="text-sm font-medium text-white">{eventInfo.aim.date}</div>
                  <div className="text-xs text-white/70">{eventInfo.location}</div>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(true)}
                className="p-3 rounded-xl transition-all duration-300 hover:bg-[#548cac]/20 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-[#101310] relative overflow-hidden touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center"
                style={{ pointerEvents: "auto" }}
                aria-label="Open menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/20 to-[#548cac]/0 opacity-0 hover:opacity-100 rounded-xl"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <RiMenuLine className="size-5 text-white relative z-10" />
              </motion.button>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex flex-col">
              {/* Top Row - Logo/Date and Venue Info */}
              <div className="flex items-center justify-between h-12 text-sm text-white border-b border-white/10">
                <div className="flex items-center space-x-6">
                  <span className="flex items-center">
                    <Link href="/" className="group flex items-center" aria-label="AIM Health R&D Summit Home">
                      <motion.span
                        className="relative flex items-center justify-center p-2 rounded-lg group-hover:bg-white/5 transition-all duration-300"
                        whileHover={{
                          scale: 1.05,
                          rotateY: 5,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {eventInfo.aim.name}
                        <motion.span
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/10 to-[#548cac]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          aria-hidden="true"
                        />
                      </motion.span>
                      <span className="mx-3 text-white/60">|</span>
                      <motion.span className="text-white font-medium" whileHover={{ color: "#548cac" }}>
                        {eventInfo.aim.date}
                      </motion.span>
                    </Link>
                  </span>
                </div>

                <motion.div
                  className="flex items-center space-x-3 text-white/90"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span className="hover:text-[#548cac] transition-colors cursor-default">{eventInfo.venue}</span>
                  <span className="text-white/40">|</span>
                  <span className="hover:text-[#548cac] transition-colors cursor-default">{eventInfo.location}</span>
                </motion.div>
              </div>

              {/* Bottom Row - Centered Navigation */}
              <div className="flex items-center justify-center h-16">
                <DesktopMenu
                  menuItems={menuItems}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <MobileMenu
              isOpen={isOpen}
              closeMenu={closeMenu}
              menuItems={menuItems}
              eventInfo={eventInfo}
              newsItems={newsItems}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  )
}
