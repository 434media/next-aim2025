"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { RiArrowDownSLine, RiMenuLine, RiCloseLine, RiArrowRightUpLine } from "@remixicon/react"
import { Button } from "../Button"
import { AIMLogo } from "../../../public/AIMLogo"

const menuItems = [
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
    name: "Attend",
    dropdown: [{ name: "Why Attend", href: "/why-attend" }],
  },
  {
    name: "Sponsors & Exhibitors",
    href: "/sponsors-exhibitors",
  },
  {
    name: "More",
    dropdown: [
      { name: "Travel & Venue", href: "/travel-venue" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact Us", href: "/contact-us" },
    ],
  },
]

const eventInfo = {
  aim: {
    name: <AIMLogo variant="white" className="h-8 w-auto hover:opacity-80 transition-all duration-300" />,
    date: "June 16, 2025",
  },
  venue: "Henry B. González Convention Center",
  location: "San Antonio, TX",
}

const initialNewsItems = [
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

// Performance optimization: Debounce utility
const useDebounce = (callback: () => void, delay: number) => {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)

  return useCallback(() => {
    if (debounceTimer) clearTimeout(debounceTimer)
    const timer = setTimeout(callback, delay)
    setDebounceTimer(timer)
  }, [callback, delay, debounceTimer])
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  const newsItems = useMemo(() => initialNewsItems, [])

  // Optimized scroll handler with debouncing for 60fps performance
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  const debouncedScrollHandler = useDebounce(handleScroll, 16) // 60fps optimization

  // Memoized news rotation for performance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
    }, 5000) // Change news item every 5 seconds

    return () => clearInterval(interval)
  }, [newsItems.length])

  useEffect(() => {
    window.addEventListener("scroll", debouncedScrollHandler, { passive: true })
    return () => window.removeEventListener("scroll", debouncedScrollHandler)
  }, [debouncedScrollHandler])

  // Enhanced dropdown handlers with useCallback for performance
  const handleDropdownEnter = useCallback((itemName: string) => {
    setActiveDropdown(itemName)
  }, [])

  const handleDropdownLeave = useCallback(() => {
    setActiveDropdown(null)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg shadow-black/10" : ""
      }`}
    >
      <div className="relative flex flex-col">
        {/* Top Banner */}
        <div className="bg-[#101310] transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12 text-sm text-white">
              <div className="hidden md:flex items-center space-x-6">
                <span className="flex items-center">
                  <Link href="/" className="group flex items-center" aria-label="AIM Health R&D Summit Home">
                    <motion.span
                      className="relative flex items-center justify-center p-1 rounded-md group-hover:bg-white/5 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {eventInfo.aim.name}
                      <span
                        className="absolute inset-0 rounded-md bg-[#548cac]/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"
                        aria-hidden="true"
                      ></span>
                    </motion.span>
                    <span className="mx-2 text-white">|</span>
                    <span className="text-white">{eventInfo.aim.date}</span>
                  </Link>
                </span>
              </div>
              {/* Mobile: Show AIM event info */}
              <div className="md:hidden flex items-center justify-start">
                <Link href="/" className="flex items-center space-x-2" aria-label="AIM Health R&D Summit Home">
                  <motion.span
                    className="relative flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AIMLogo variant="white" className="h-9 w-auto" />
                    <span
                      className="absolute inset-0 rounded-md bg-[#548cac]/10 opacity-0 hover:opacity-100 blur-sm transition-opacity duration-300"
                      aria-hidden="true"
                    ></span>
                  </motion.span>
                  <span className="text-xs font-medium text-white/90">{eventInfo.aim.date}</span>
                </Link>
              </div>
              {/* Desktop: Show venue and location */}
              <div className="hidden md:flex items-center space-x-2">
                <span>{eventInfo.venue}</span>
                <span>|</span>
                <span>{eventInfo.location}</span>
              </div>
              {/* Mobile: Show only location */}
              <div className="md:hidden">
                <span className="text-xs font-medium text-white/90">{eventInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav
          className={`bg-[#101310]/80 backdrop-blur-sm transition-all duration-300 ${
            isScrolled ? "bg-[#101310]/95" : ""
          }`}
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {menuItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => item.dropdown && handleDropdownEnter(item.name)}
                    onMouseLeave={() => item.dropdown && handleDropdownLeave()}
                  >
                    {item.dropdown ? (
                      <motion.button
                        className="flex items-center text-sm font-medium text-white hover:text-[#548cac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-md px-2 py-1"
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        aria-expanded={activeDropdown === item.name}
                        aria-haspopup="true"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.name}
                        <motion.div
                          animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <RiArrowDownSLine className="ml-1 size-4" aria-hidden="true" />
                        </motion.div>
                      </motion.button>
                    ) : (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href={item.href}
                          className="flex items-center text-sm font-medium text-white hover:text-[#548cac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-md px-2 py-1"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    )}
                    {item.dropdown && (
                      <div
                        className={`absolute top-full left-0 w-56 py-2 mt-1 bg-[#101310] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ${
                          activeDropdown === item.name ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                        role="menu"
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-white hover:bg-[#548cac]/20 hover:text-[#548cac] focus:outline-none focus:bg-[#548cac]/20 focus:text-[#548cac]"
                            role="menuitem"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* News Ticker (Desktop and Mobile) */}
              <div className="flex-1 md:flex-none md:mx-0">
                <motion.a
                  aria-label={`View latest update: ${newsItems[currentNewsIndex].label}`}
                  href={newsItems[currentNewsIndex].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full md:w-auto items-center justify-between rounded-full bg-white px-4 py-2 text-sm font-medium text-[#101310] shadow-lg shadow-[#548cac]/10 ring-1 ring-black/5 transition-all hover:bg-[#548cac]/10 hover:ring-[#548cac] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-[#101310]"
                  tabIndex={0}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      window.open(newsItems[currentNewsIndex].href, "_blank", "noopener,noreferrer")
                    }
                  }}
                >
                  <span className="flex items-center overflow-hidden">
                    <span className="sr-only">Current news:</span>
                    <span className="flex items-center text-xs md:text-sm">
                      <span className="font-bold text-[#548cac]">News</span>
                      <span className="mx-2 text-gray-400" aria-hidden="true">
                        &middot;
                      </span>
                      <span className="relative overflow-hidden" style={{ width: "180px", height: "1.5em" }}>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={currentNewsIndex}
                            className="absolute inset-0 flex items-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="truncate font-medium text-[#101310] group-hover:text-[#548cac] transition-colors">
                              {newsItems[currentNewsIndex].label}
                            </span>
                          </motion.span>
                        </AnimatePresence>
                      </span>
                      <motion.span
                        className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#548cac] text-white ml-2"
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <RiArrowRightUpLine className="h-3 w-3" aria-hidden="true" />
                      </motion.span>
                    </span>
                  </span>
                </motion.a>
              </div>
              {/* Mobile: Menu Button */}
              <div className="p-2 ml-2 flex items-center md:hidden">
                <motion.button
                  onClick={() => setIsOpen(true)}
                  className="p-2 rounded-full transition-colors hover:bg-[#548cac]/20 focus:outline-none focus:ring-2 focus:ring-[#548cac]"
                  aria-label="Open menu"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RiMenuLine className="size-6 text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu - EXACT Original Structure */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={closeMenu}
                aria-hidden="true"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed top-4 right-4 bottom-4 w-[calc(100%-2rem)] max-w-sm bg-[#101310] z-50 shadow-xl rounded-2xl overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
              >
                <div className="flex flex-col h-full overflow-y-auto">
                  <div className="flex items-center justify-between p-4 border-b border-[#548cac]/20">
                    <h2 className="text-lg font-semibold text-white">Menu</h2>
                    <button
                      onClick={closeMenu}
                      className="p-2 rounded-full hover:bg-[#548cac]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac]"
                      aria-label="Close menu"
                    >
                      <RiCloseLine className="size-6 text-white" />
                    </button>
                  </div>

                  <div className="p-4 border-b border-[#548cac]/20 bg-[#101310]/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AIMLogo variant="white" className="h-10 w-auto" />
                        <div>
                          <p className="text-sm font-medium text-white">{eventInfo.aim.date}</p>
                          <p className="text-xs w-32 text-white/80">{eventInfo.venue}</p>
                        </div>
                      </div>
                      <div className="bg-[#548cac]/20 px-3 py-1 rounded-full">
                        <p className="text-xs text-center font-medium text-[#548cac]">{eventInfo.location}</p>
                      </div>
                    </div>
                  </div>

                  <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-4" role="list">
                      {menuItems.map((item) => (
                        <li key={item.name}>
                          {item.dropdown ? (
                            <div className="space-y-2">
                              <button
                                className="text-lg font-medium text-white w-full text-left flex items-center justify-between p-2 rounded-lg hover:bg-[#548cac]/10 transition-colors"
                                onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                                aria-expanded={activeDropdown === item.name}
                              >
                                <span>{item.name}</span>
                                <RiArrowDownSLine
                                  className={`size-5 transition-transform duration-300 ${
                                    activeDropdown === item.name ? "rotate-180 text-[#548cac]" : ""
                                  }`}
                                  aria-hidden="true"
                                />
                              </button>
                              <AnimatePresence>
                                {activeDropdown === item.name && (
                                  <motion.ul
                                    className="pl-4 space-y-1 overflow-hidden"
                                    role="menu"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    {item.dropdown.map((subItem) => (
                                      <motion.li
                                        key={subItem.name}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <Link
                                          href={subItem.href}
                                          className="block text-base text-white/80 hover:text-[#548cac] p-2 rounded-lg hover:bg-[#548cac]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-inset"
                                          onClick={closeMenu}
                                          role="menuitem"
                                        >
                                          {subItem.name}
                                        </Link>
                                      </motion.li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className="block text-lg font-medium text-white hover:text-[#548cac] p-2 rounded-lg hover:bg-[#548cac]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac]"
                              onClick={closeMenu}
                            >
                              {item.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile: Register Button */}
                  <div className="p-4 border-t border-[#548cac]/20 bg-[#101310]/50">
                    <Button
                      variant="primary"
                      href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                      className="w-full py-3 text-base"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Register Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
