"use client"

import { RiArrowRightUpLine, RiCloseLine, RiMenuLine } from "@remixicon/react"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { AIMLogo } from "../../public/AIMLogo"

const navigationItems = [
  { name: "AIM'25", href: "/aim2025" },
  { name: "Symposiums", href: "/pre-conference-symposiums" },
  { name: "Posters", href: "/posters" },
  { name: "Contact Us", href: "/contact-us" },
]

const desktopNavigationItems = [
  { name: "Symposiums", href: "/pre-conference-symposiums" },
  { name: "Posters", href: "/posters" },
  { name: "Contact Us", href: "/contact-us" },
]

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAIM2026ModalOpen, setIsAIM2026ModalOpen] = useState(false)
  const [isSASWModalOpen, setIsSASWModalOpen] = useState(false)

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

  const toggleAIM2026Modal = useCallback(() => {
    setIsAIM2026ModalOpen((prev) => !prev)
  }, [])

  const closeAIM2026Modal = useCallback(() => {
    setIsAIM2026ModalOpen(false)
  }, [])

  const toggleSASWModal = useCallback(() => {
    setIsSASWModalOpen((prev) => !prev)
  }, [])

  const closeSASWModal = useCallback(() => {
    setIsSASWModalOpen(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu()
        closeAIM2026Modal()
        closeSASWModal()
      }
    }

    if (isMenuOpen || isAIM2026ModalOpen || isSASWModalOpen) {
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
  }, [isMenuOpen, isAIM2026ModalOpen, isSASWModalOpen, closeMenu, closeAIM2026Modal, closeSASWModal])

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
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="flex flex-col items-start justify-center"
                    >
                      <h1 className="text-sm font-semibold text-white/70 leading-none">Health R&D Summit</h1>
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      >
                        <motion.p
                          className="text-sm font-medium text-white/70 hover:text-[#548cac] transition-all duration-300 cursor-pointer relative pb-1"
                          onClick={toggleAIM2026Modal}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          Join us May 19, 2026
                          <motion.span className="ml-1" whileHover={{ x: 0 }}>
                            <RiArrowRightUpLine className="inline size-3 text-[#548cac]" />
                          </motion.span>
                        </motion.p>
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#548cac] via-cyan-400 to-[#548cac] rounded-full shadow-[0_0_8px_rgba(84,140,172,0.6)]"
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "100%", opacity: 1 }}
                          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                          whileHover={{
                            boxShadow: "0 0 15px rgba(84,140,172,0.8), 0 0 25px rgba(6,182,212,0.4)",
                            scaleY: 1.5,
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.div>

                <div className="flex items-center space-x-8">
                  <nav className="hidden lg:flex items-center space-x-8">
                    {desktopNavigationItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
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
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      <button
                        onClick={toggleSASWModal}
                        className="relative hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2"
                        aria-label="San Antonio Startup Week"
                      >
                        <img
                          src="https://ampd-asset.s3.us-east-2.amazonaws.com/powered+by+geekdom+sasw-32+(1).png"
                          alt="SASW Logo"
                          className="h-8 w-auto transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,20,147,0.3)]"
                        />
                      </button>
                    </motion.div>
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
          {isAIM2026ModalOpen && (
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
                className="mt-2"
              >
                <div className="bg-black/98 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden relative z-50 max-h-[80vh] overflow-y-auto">
                  <button
                    onClick={closeAIM2026Modal}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#548cac]"
                    aria-label="Close modal"
                  >
                    <RiCloseLine className="size-5" />
                  </button>

                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-0">
                      <div className="flex-shrink-0">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/aim-white-2026%281%29-0eO4Zwsi2sVhsQgAqlLuCe9ay5dHQz.png"
                          alt="AIM 2026 Logo"
                          className="h-40 md:h-60 w-auto"
                        />
                      </div>

                      <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">From the Bench to the Battlefield</h3>
                        <p className="text-white/80 mb-4 leading-relaxed max-w-xl">
                          Military Health City USA's premier networking and collaboration conference in support of the
                          life sciences industry and military medical mission.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 mb-6 text-sm text-[#548cac]">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">📅 May 19, 2026</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">📍 Henry B. González Convention Center</span>
                          </div>
                        </div>
                        <a
                          href="https://whova.com/portal/registration/D7sdZXdTCppF1KMzet5O/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                            Get Tickets <RiArrowRightUpLine className="inline size-4 ml-1" />
                          </button>
                        </a>
                        <div className="max-w-[200px] mx-auto md:mx-0 md:text-left mt-3">
                          <span className="text-sm text-white/70">
                            Interested in sponsoring or exhibiting?{" "}
                            <Link
                              href="https://support.velocitytx.org/campaign/726139/donate"
                              className="text-[#548cac] hover:text-cyan-400 transition-colors duration-200 underline underline-offset-2"
                            >
                              Contact us
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSASWModalOpen && (
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
                className="mt-2"
              >
                <div className="bg-gradient-to-br from-black via-purple-900/50 to-pink-900/90 backdrop-blur-xl border border-pink-500/30 rounded-2xl shadow-2xl overflow-hidden relative z-50 max-h-[80vh] overflow-y-auto">
                  <button
                    onClick={closeSASWModal}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    aria-label="Close modal"
                  >
                    <RiCloseLine className="size-5" />
                  </button>

                  <div className="p-8">
                    <div className="flex items-center justify-center space-x-6 mb-8">
                      <img
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/SASW_CompactLogo-+pink.png"
                        alt="SASW Logo"
                        className="h-16 w-auto"
                      />
                      <span className="text-white/60 text-2xl font-bold">×</span>
                      <img
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-white-2026.png"
                        alt="AIM 2026 Logo"
                        className="h-16 w-auto"
                      />
                      <span className="text-white/60 text-2xl font-bold">×</span>
                      <img
                        src="https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/VelocityTX+Logo+MAIN+RGB+(1).png"
                        alt="VelocityTX Logo"
                        className="h-16 w-auto"
                      />
                    </div>

                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-white mb-4">
                        Plan Your Week of Innovation
                      </h2>
                      <p className="text-xl text-pink-200 font-semibold">
                        Don't Miss These AIM-Sponsored Events
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          AI in Healthcare: The Good, The Bad, The Unknown
                        </h3>
                        <p className="hidden md:block text-pink-200 mb-4">
                          From Seed to Scale - Capital, Funding, Business Models, and Pitch
                        </p>
                        <p className="text-white/70 mb-4">8:00 AM – 10:00 AM | VelocityTX</p>
                        <a
                          href="https://www.eventbrite.com/e/ai-in-healthcare-the-good-the-bad-and-the-unknown-registration-1628736216869"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200">
                            Learn More
                          </button>
                        </a>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Leveraging Federal Funding to Accelerate Dual-Use Solutions
                        </h3>
                        <p className="text-white/70 mb-4">
                          1:30–2:30 p.m.  | Embassy Suites – Majestic Ballroom B
                        </p>
                        <a href="https://sasw.co/homepage-2/" target="_blank" rel="noopener noreferrer">
                          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200">
                            Learn More
                          </button>
                        </a>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Connecting with Capability: Research Sponsorship and Collaboration
                        </h3>
                        <p className="text-white/70 mb-4">
                          3:30–4:20 p.m.  | Embassy Suites – Majestic Ballroom B
                        </p>
                        <a href="https://sasw.co/homepage-2/" target="_blank" rel="noopener noreferrer">
                          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200">
                            Learn More
                          </button>
                        </a>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Funding Forward: Equitable, Strategic Capital for Innovators
                        </h3>
                        <p className="text-white/70 mb-4">
                          4:30–5:20 p.m.  | Embassy Suites – Majestic Ballroom A
                        </p>
                        <a href="https://sasw.co/homepage-2/" target="_blank" rel="noopener noreferrer">
                          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200">
                            Learn More
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
                <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-60">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <button
                      onClick={() => {
                        toggleSASWModal()
                        closeMenu()
                      }}
                      className="group block w-full px-6 py-6 hover:bg-[#548cac]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-inset relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#548cac]/0 via-[#548cac]/5 to-[#548cac]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10 flex items-center justify-start">
                        <img
                          src="https://ampd-asset.s3.us-east-2.amazonaws.com/powered+by+geekdom+sasw-32+(1).png"
                          alt="SASW Logo"
                          className="h-12 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,20,147,0.3)]"
                        />
                      </div>
                    </button>
                  </motion.div>

                  <nav className="py-2">
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: (index + 1) * 0.05,
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

        <AnimatePresence>
          {(isMenuOpen || isAIM2026ModalOpen || isSASWModalOpen) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
              onClick={() => {
                closeMenu()
                closeAIM2026Modal()
                closeSASWModal()
              }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
