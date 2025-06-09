"use client"

import Link from "next/link"
import { motion, useInView } from "motion/react"
import { Button } from "../Button"
import { RiArrowRightUpLine } from "@remixicon/react"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { AIMLogo } from "../../../public/AIMLogo" // Declare the AIMLogo variable

const sections = {
  discover: {
    title: "Discover",
    items: [
      { label: "Keynotes", href: "/keynotes" },
      { label: "Schedule", href: "/schedule" },
      { label: "Speakers", href: "/speakers" },
      { label: "Sponsors & Exhibitors", href: "/sponsors-exhibitors" },
      { label: "Pre-Conference Symposiums", href: "/pre-conference-symposiums" },
    ],
  },
  more: {
    title: "More",
    items: [
      { label: "Why Attend", href: "/why-attend" },
      { label: "SURF", href: "/surf" },
      { label: "MMID", href: "/mmid" },
      { label: "Travel & Venue", href: "/travel-venue" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
}

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  // Enhanced scroll-triggered visibility
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, {
    once: true,
    amount: 0.1,
  })

  useEffect(() => {
    if (isInView) {
      setIsVisible(true)
    }
  }, [isInView])

  // Memoized sections for performance
  const memoizedSections = useMemo(() => sections, [])

  // Enhanced hover handlers with useCallback for performance
  const handleSectionHover = useCallback((sectionName: string | null) => {
    setHoveredSection(sectionName)
  }, [])

  return (
    <footer
      ref={footerRef}
      className="bg-[#101310] text-white relative overflow-hidden"
      aria-labelledby="footer-heading"
    >
      {/* Subtle animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#101310] via-[#101310] to-[#0a0f0a] opacity-50" />

      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#548cac]/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Enhanced Full-width CTAs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 divide-y divide-white/10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 first:pb-8 last:pt-8 group"
              onMouseEnter={() => handleSectionHover("sponsor")}
              onMouseLeave={() => handleSectionHover(null)}
            >
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                <h2 className="text-2xl sm:text-3xl font-bold transition-colors duration-300 group-hover:text-[#548cac]">
                  Become a Sponsor
                </h2>
                <p className="mt-2 text-[#548cac] text-lg transition-all duration-300 group-hover:text-white/90">
                  Join leading organizations in supporting innovation in military medicine.
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button
                  variant="secondary"
                  href="https://support.velocitytx.org/campaign/642575/donate"
                  className="w-full sm:w-auto text-lg py-3 px-6 relative overflow-hidden group/btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#548cac]/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <span className="flex items-center justify-center relative z-10">
                    Learn More
                    <motion.div animate={{ x: hoveredSection === "sponsor" ? 3 : 0 }} transition={{ duration: 0.2 }}>
                      <RiArrowRightUpLine className="ml-2 size-5" aria-hidden="true" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 first:pb-8 last:pt-8 group"
              onMouseEnter={() => handleSectionHover("register")}
              onMouseLeave={() => handleSectionHover(null)}
            >
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                <h2 className="text-2xl sm:text-3xl font-bold transition-colors duration-300 group-hover:text-[#548cac]">
                  Register Now
                </h2>
                <p className="mt-2 text-[#548cac] text-lg transition-all duration-300 group-hover:text-white/90">
                  Don&apos;t miss this opportunity to be part of the premier event in military medical innovation.
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Button
                  variant="primary"
                  href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                  className="w-full sm:w-auto text-lg py-3 px-6 relative overflow-hidden group/btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <span className="flex items-center justify-center relative z-10">
                    Register Now
                    <motion.div animate={{ x: hoveredSection === "register" ? 3 : 0 }} transition={{ duration: 0.2 }}>
                      <RiArrowRightUpLine className="ml-2 size-5" aria-hidden="true" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Enhanced Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="space-y-6 lg:col-span-2"
          >
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3, ease: "easeOut" }}>
              <Link href="/" className="inline-block group" aria-label="AIM Summit Home">
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <AIMLogo
                    className="w-48 h-auto group-hover:opacity-90 transition-opacity duration-300"
                    variant="white"
                  />
                </motion.div>
              </Link>
            </motion.div>
            <motion.p
              className="text-[#548cac] text-lg max-w-md leading-relaxed"
              whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
              transition={{ duration: 0.3 }}
            >
              Accelerating innovation in military medicine through collaboration between academia, industry, and the
              military.
            </motion.p>
          </motion.div>

          {/* Enhanced Discover Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="space-y-6"
            onMouseEnter={() => handleSectionHover("discover")}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <motion.h3
              className="text-xl font-semibold text-white uppercase tracking-wider"
              whileHover={{ color: "#548cac" }}
              transition={{ duration: 0.3 }}
            >
              {memoizedSections.discover.title}
            </motion.h3>
            <ul className="space-y-4">
              {memoizedSections.discover.items.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={item.href}
                    className="text-base text-[#548cac] hover:text-white transition-all duration-300 relative group inline-block"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#548cac] group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Enhanced More Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="space-y-6"
            onMouseEnter={() => handleSectionHover("more")}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <motion.h3
              className="text-xl font-semibold text-white uppercase tracking-wider"
              whileHover={{ color: "#548cac" }}
              transition={{ duration: 0.3 }}
            >
              {memoizedSections.more.title}
            </motion.h3>
            <ul className="space-y-4">
              {memoizedSections.more.items.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={item.href}
                    className="text-base text-[#548cac] hover:text-white transition-all duration-300 relative group inline-block"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#548cac] group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Bottom Bar */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10 relative z-10"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <motion.p
            className="text-[#548cac] text-sm"
            whileHover={{ color: "rgba(255, 255, 255, 0.8)" }}
            transition={{ duration: 0.3 }}
          >
            &copy; 434 MEDIA. All rights reserved.
          </motion.p>
        </div>
      </motion.div>
    </footer>
  )
}
