"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import Link from "next/link"
import { RiMenuLine, RiCloseLine } from "@remixicon/react"
import { AIMLogo } from "../../public/AIMLogo"

const navigationItems = [
  { name: "Pre-Conference Symposiums", href: "/pre-conference-symposiums" },
  { name: "Why Attend", href: "/why-attend" },
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
              <motion.button
                onClick={toggleMenu}
                className={`relative p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-[#101310] group ${
                  isMenuOpen
                    ? "bg-[#548cac]/20 text-[#548cac]"
                    : "hover:bg-[#548cac]/10 text-white hover:text-[#548cac]"
                }`}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/20 to-[#548cac]/0 opacity-0 group-hover:opacity-100 rounded-xl"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

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
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Enhanced Mobile/Desktop Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.4,
              }}
              className="fixed top-24 left-4 right-4 lg:left-1/2 lg:right-auto lg:w-96 lg:-translate-x-1/2 bg-[#101310]/95 backdrop-blur-2xl z-50 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#548cac]/10 via-transparent to-[#548cac]/5" />

              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#548cac]/30 rounded-full"
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${20 + i * 8}%`,
                    }}
                    animate={{
                      y: [-5, 5, -5],
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              <div className="relative p-8">
                {/* Menu Header */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-2">Navigation</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#548cac] to-transparent mx-auto" />
                </motion.div>

                {/* Navigation Items */}
                <nav>
                  <ul className="space-y-2" role="list">
                    {navigationItems.map((item, index) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.2 + index * 0.1,
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={item.href}
                          className="group block p-4 rounded-2xl hover:bg-[#548cac]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-inset relative overflow-hidden"
                          onClick={closeMenu}
                        >
                          {/* Hover effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/20 to-[#548cac]/0 opacity-0 group-hover:opacity-100 rounded-2xl"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.8 }}
                          />

                          <motion.div
                            className="relative z-10 flex items-center justify-between"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="text-lg font-medium text-white group-hover:text-[#548cac] transition-colors duration-300">
                              {item.name}
                            </span>
                            <motion.div
                              className="w-2 h-2 rounded-full bg-[#548cac]/40 group-hover:bg-[#548cac] transition-colors duration-300"
                              whileHover={{ scale: 1.5 }}
                            />
                          </motion.div>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
