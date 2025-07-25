"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import Link from "next/link"
import { RiMenuLine, RiCloseLine } from "@remixicon/react"
import { AIMLogo } from "../../public/AIMLogo"

const navigationItems = [
  { name: "AIM 2025", href: "/aim2025" },
  { name: "Pre-Conference Symposiums", href: "/pre-conference-symposiums" },
  { name: "SURF", href: "/surf" },
  { name: "MMID", href: "/mmid" },
  { name: "Contact Us", href: "/contact-us" },
]

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  // Enhanced scroll effects
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9])

  // Track scroll state
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50)
    })
    return unsubscribe
  }, [scrollY])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }

    if (isMenuOpen) {
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
  }, [isMenuOpen, closeMenu])

  return (
    <>
      <motion.header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-2" : "py-4"}`}
        style={{
          opacity: headerOpacity,
        }}
      >
        <motion.div
          className={`mx-4 lg:mx-8 rounded-2xl transition-all duration-500 ${
            isScrolled
              ? "bg-[#101310]/90 backdrop-blur-xl border border-white/10 shadow-2xl"
              : "bg-[#101310]/70 backdrop-blur-md border border-white/5"
          }`}
          style={{
            backdropFilter: `blur(${headerBlur}px)`,
          }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#548cac]/5 via-transparent to-[#548cac]/5 opacity-0 hover:opacity-100 transition-opacity duration-700" />

          <div className="relative px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div style={{ scale: logoScale }}>
                <Link href="/" className="group flex items-center space-x-3" aria-label="AIM Health R&D Summit Home">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <AIMLogo
                      variant="white"
                      className="h-10 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(84,140,172,0.3)]"
                    />
                    {/* Subtle glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-[#548cac]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      aria-hidden="true"
                    />
                  </motion.div>

                  <motion.div
                    className="hidden sm:block"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h1 className="text-lg font-bold text-white group-hover:text-[#548cac] transition-colors duration-300">
                      AIM Health R&D Summit
                    </h1>
                    <p className="text-xs text-white/70 group-hover:text-[#548cac]/80 transition-colors duration-300">
                      Military Medical Innovation
                    </p>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Menu Button */}
              <button
                onClick={toggleMenu}
                className={`relative p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-[#101310] ${
                  isMenuOpen ? "bg-[#548cac]/20 text-[#548cac]" : "text-white hover:text-[#548cac]"
                }`}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {/* Menu Icon with smooth transition */}
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <RiCloseLine className="size-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <RiMenuLine className="size-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Full Screen Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Full Screen Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.4,
              }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[500px] lg:w-[600px] bg-gradient-to-br from-[#101310] via-[#1a1f1a] to-[#101310] z-50 overflow-hidden sm:overflow-visible"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Close Button */}
              <motion.button
                onClick={closeMenu}
                className="absolute top-8 md:top-12 right-6 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white hover:text-[#548cac] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] z-10"
                aria-label="Close menu"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <RiCloseLine className="size-6" />
              </motion.button>

              {/* Static background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#548cac]/10 via-transparent to-[#4f4f2c]/10" />

              {/* Scrollable content container for mobile */}
              <div className="relative h-full overflow-y-auto sm:overflow-visible">
                <div className="min-h-full flex flex-col sm:justify-center p-8 lg:p-12">
                  {/* Menu Header */}
                  <motion.div
                    className="mb-8 sm:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Navigate</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#548cac] to-[#4f4f2c] rounded-full" />
                  </motion.div>

                  {/* Navigation Items */}
                  <nav className="flex-1 sm:flex-none">
                    <ul className="space-y-4 sm:space-y-6" role="list">
                      {navigationItems.map((item, index) => (
                        <motion.li
                          key={item.name}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.15 + index * 0.05,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                        >
                          <Link
                            href={item.href}
                            className="group block py-4 px-6 rounded-2xl hover:bg-[#548cac]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-inset relative overflow-hidden border border-transparent hover:border-[#548cac]/20"
                            onClick={closeMenu}
                          >
                            {/* Simplified hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/10 to-[#548cac]/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

                            <div className="relative z-10 flex items-center justify-between">
                              <span className="text-xl lg:text-2xl font-medium text-white group-hover:text-[#548cac] transition-colors duration-300">
                                {item.name}
                              </span>
                              {/* Hide dots on mobile, show on desktop */}
                              <div className="hidden sm:block w-3 h-3 rounded-full bg-[#548cac]/40 group-hover:bg-[#548cac] transition-colors duration-300" />
                            </div>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  {/* Footer */}
                  <motion.div
                    className="mt-8 sm:mt-12 pt-8 border-t border-white/10 pb-8 sm:pb-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <p className="text-white/60 text-sm">AIM Health R&D Summit</p>
                    <p className="text-[#548cac] text-lg font-semibold mt-1">The Future of Military Medicine</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
