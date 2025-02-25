"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { RiArrowDownSLine, RiMenuLine, RiCloseLine } from "@remixicon/react"
import { Button } from "../Button"

const menuItems = [
  { name: "AIM Pre-Conference Symposiums", href: "/pre-conference-symposiums" },
  {
    name: "Agenda",
    href: "#agenda",
    dropdown: [
      { name: "Keynote", href: "#keynote" },
      { name: "Schedule", href: "#schedule" },
      { name: "Speakers", href: "#speakers" },
    ],
  },
  {
    name: "Attend",
    href: "#attend",
    dropdown: [
      { name: "Why Attend", href: "/why-attend" },
      { name: "Bring Your Team", href: "/bring-your-team" },
    ],
  },
  { name: "Sponsors & Exhibitors", href: "/sponsors-exhibitors" },
  {
    name: "More",
    href: "#more",
    dropdown: [
      { name: "Travel & Venue", href: "#travel-venue" },
      { name: "FAQ", href: "/faq" },
      { name: "Code of Conduct", href: "/code-of-conduct" },
      { name: "Contact Us", href: "/contact-us" },
      { name: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
]

const eventInfo = {
  aim: {
    name: "AIM Health R&D Summit",
    date: "June 16 - 17, 2025",
  },
  venue: "Henry B. González Convention Center",
  location: "San Antonio, TX",
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="relative flex flex-col">
        {/* Top Banner */}
        <div className="bg-[#101310] transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12 text-sm text-white">
              <div className="hidden md:flex items-center space-x-6">
                <span className="flex items-center">
                  <Link href="/">
                    <span className="font-bold text-[#548cac] hover:text-[#548cac]/80">{eventInfo.aim.name}</span>
                  </Link>
                  <span className="mx-2">|</span>
                  <span>{eventInfo.aim.date}</span>
                </span>
              </div>
              {/* Mobile: Show AIM event info */}
              <div className="md:hidden flex flex-col items-start">
                <span className="font-bold text-[#548cac]">{eventInfo.aim.name}</span>
                <span className="text-xs">{eventInfo.aim.date}</span>
              </div>
              {/* Desktop: Show venue and location */}
              <div className="hidden md:flex items-center space-x-2">
                <span>{eventInfo.venue}</span>
                <span>|</span>
                <span>{eventInfo.location}</span>
              </div>
              {/* Mobile: Show only location */}
              <div className="md:hidden">
                <span className="text-xs">{eventInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-[#101310]/80 backdrop-blur-sm transition-all duration-300" aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {menuItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onFocus={() => setActiveDropdown(item.name)}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center text-sm font-medium text-white hover:text-[#548cac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-md px-2 py-1"
                    >
                      {item.name}
                      {item.dropdown && (
                        <RiArrowDownSLine
                          className="ml-1 size-4 transition-transform duration-200 group-hover:rotate-180"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                    {item.dropdown && activeDropdown === item.name && (
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 w-48 py-2 mt-1 bg-[#101310] rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                          role="menu"
                        >
                          {item.dropdown.map((subItem) => (
                            <motion.div
                              key={subItem.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: 0.1 }}
                            >
                              <Link
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-white hover:bg-[#548cac]/20 hover:text-[#548cac] focus:outline-none focus:bg-[#548cac]/20 focus:text-[#548cac]"
                                role="menuitem"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {subItem.name}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile: Register Button and Menu Button */}
              <div className="flex items-center justify-between w-full md:w-auto">
                <Button
                  variant="primary"
                  href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                  className="text-sm py-2 md:hidden"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now
                </Button>
                <button
                  onClick={() => setIsOpen(true)}
                  className="p-2 rounded-full transition-colors hover:bg-[#548cac]/20 focus:outline-none focus:ring-2 focus:ring-[#548cac] md:hidden"
                  aria-label="Open menu"
                >
                  <RiMenuLine className="size-6 text-white" />
                </button>
              </div>

              {/* Desktop: Register Button */}
              <div className="hidden md:block">
                <Button
                  variant="primary"
                  href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                  className="text-sm py-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setIsOpen(false)}
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
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full hover:bg-[#548cac]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#548cac]"
                      aria-label="Close menu"
                    >
                      <RiCloseLine className="size-6 text-white" />
                    </button>
                  </div>

                  <div className="p-4 border-b border-[#548cac]/20 bg-[#101310]/50">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-[#548cac]">{eventInfo.aim.name}</p>
                        <p className="text-sm text-white/80">{eventInfo.aim.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/80">{eventInfo.venue}</p>
                        <p className="text-sm text-white/80">{eventInfo.location}</p>
                      </div>
                    </div>
                  </div>

                  <nav className="flex-1 p-4">
                    <ul className="space-y-4" role="list">
                      {menuItems.map((item) => (
                        <li key={item.name}>
                          {item.dropdown ? (
                            <div className="space-y-2">
                              <div className="text-lg font-medium text-white">{item.name}</div>
                              <ul className="pl-4 space-y-2" role="list">
                                {item.dropdown.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link
                                      href={subItem.href}
                                      className="block text-base text-white/80 hover:text-[#548cac] transition-colors focus:outline-none focus:text-[#548cac]"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className="block text-lg font-medium text-white hover:text-[#548cac] transition-colors focus:outline-none focus:text-[#548cac]"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="p-4 border-t border-[#548cac]/20 bg-[#101310]/50">
                    <Button
                      variant="primary"
                      href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                      className="w-full"
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

