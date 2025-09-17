"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import Link from "next/link"
import { RiMenuLine, RiCloseLine } from "@remixicon/react"
import { AIMLogo } from "../../public/AIMLogo"

const navigationItems = [
  { name: "AIM'25", href: "/aim2025" },
  { name: "Symposiums", href: "/pre-conference-symposiums" },
  { name: "Posters", href: "/posters" },
  { name: "Contact Us", href: "/contact-us" },
]

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9])

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown)
      if (window.innerWidth < 1024) {
        document.body.style.overflow = "hidden"
      }
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
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <motion.div
            className={`relative rounded-2xl transition-all duration-500 ${
              isScrolled
                ? "bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl"
                : "bg-black/85 backdrop-blur-md border border-white/5"
            }`}
            style={{
              backdropFilter: `blur(${headerBlur}px)`,
            }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#548cac]/5 via-transparent to-[#548cac]/5 opacity-0 hover:opacity-100 transition-opacity duration-700" />

            <div className="relative px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
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
                        Health R&D Summit
                      </h1>
                      <p className="text-xs text-white/70 group-hover:text-[#548cac]/80 transition-colors duration-300">
                        Military Medical Innovation
                      </p>
                    </motion.div>
                  </Link>
                </motion.div>

                <div className="flex items-center space-x-8">
                  <nav className="hidden lg:flex items-center space-x-8">
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          className="relative text-white hover:text-[#548cac] transition-colors duration-300 font-medium group py-2 px-3 rounded-lg hover:bg-[#548cac]/10 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black"
                        >
                          {item.name}
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#548cac] origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                <button
                  onClick={toggleMenu}
                  className={`lg:hidden relative p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black ${
                    isMenuOpen ? "bg-[#548cac]/20 text-[#548cac]" : "text-white hover:text-[#548cac]"
                  }`}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                >
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
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <div className="max-w-5xl mx-auto px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  duration: 0.3,
                }}
                className="lg:hidden mt-2"
              >
                <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/10">
                    <h3 className="text-lg font-semibold text-white">Explore</h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#548cac] to-[#4f4f2c] rounded-full mt-2" />
                  </div>

                  <nav className="py-2">
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.05,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={item.href}
                          className="group block px-6 py-4 hover:bg-[#548cac]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-inset relative overflow-hidden"
                          onClick={closeMenu}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/5 to-[#548cac]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="relative z-10 flex items-center justify-between">
                            <span className="text-lg font-medium text-white group-hover:text-[#548cac] transition-colors duration-300">
                              {item.name}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-[#548cac]/40 group-hover:bg-[#548cac] transition-colors duration-300" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <div className="px-6 py-4 border-t border-white/10 bg-[#548cac]/5">
                    <p className="text-white/60 text-sm">AIM Health R&D Summit</p>
                    <p className="text-[#548cac] text-sm font-semibold mt-1">The Future of Military Medicine</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  )
}
