"use client"

import Link from "next/link"
import { motion, useInView } from "motion/react"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { RiArrowRightUpLine } from "@remixicon/react"
import { AIMLogo } from "../../public/AIMLogo"

const footerSections = {
  explore: {
    title: "Explore",
    items: [
      { label: "AIM'25", href: "/aim2025" },
      { label: "Symposiums", href: "/pre-conference-symposiums" },
      { label: "Posters", href: "/posters" },
    ],
  },
  connect: {
    title: "Connect",
    items: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "434 MEDIA", href: "https://www.434media.com/" },
    ],
  },
  register: {
    title: "AIM 2026",
    items: [
      { label: "Get Tickets", href: "https://whova.com/portal/registration/D7sdZXdTCppF1KMzet5O/" },
      { label: "Sponsor", href: "https://support.velocitytx.org/campaign/726139/donate" },
    ],
  },
}

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

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

  const memoizedSections = useMemo(() => footerSections, [])

  const handleSectionHover = useCallback((sectionName: string | null) => {
    setHoveredSection(sectionName)
  }, [])

  return (
    <footer
      ref={footerRef}
      className="bg-[#000] text-white relative overflow-hidden"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000] via-[#000] to-[#0a0f0a]" />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#548cac]/20 rounded-full"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(84, 140, 172, 0.4) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://ampd-asset.s3.us-east-2.amazonaws.com/434MediaICONWHITE.png')`,
            backgroundSize: "100px",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Logo and Title */}
            <motion.div
              className="space-y-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Link href="/" className="inline-block group" aria-label="AIM Summit Home">
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <AIMLogo
                    className="w-16 h-auto group-hover:drop-shadow-[0_0_20px_rgba(84,140,172,0.4)] transition-all duration-500"
                    variant="white"
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-lg text-[#548cac] font-medium leading-relaxed">
                Accelerating Innovation in Military Medicine
              </p>
              <p className="text-white/80 leading-relaxed max-w-md">
                Fostering collaboration between academia, industry, and military researchers to develop life-saving
                innovations that advance military medical capabilities.
              </p>
            </motion.div>
          </motion.div>

          {/* Navigation Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            {/* Explore Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="space-y-6"
              onMouseEnter={() => handleSectionHover("explore")}
              onMouseLeave={() => handleSectionHover(null)}
            >
              <motion.h3
                className="text-xl font-bold text-white uppercase tracking-wider relative"
                whileHover={{ color: "#548cac", x: 5 }}
                transition={{ duration: 0.3 }}
              >
                {memoizedSections.explore.title}
                <motion.div
                  className="absolute -bottom-2 left-0 h-0.5 bg-[#548cac] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredSection === "explore" ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.h3>
              <ul className="space-y-4">
                {memoizedSections.explore.items.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center text-white/80 hover:text-[#548cac] transition-all duration-300 relative py-2"
                    >
                      <motion.div
                        className="flex items-center space-x-3 w-full"
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-[#548cac]/40 group-hover:bg-[#548cac] transition-colors duration-300"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 3 }}
                      >
                        <RiArrowRightUpLine className="size-4 text-[#548cac]" />
                      </motion.div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Connect Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="space-y-6"
              onMouseEnter={() => handleSectionHover("connect")}
              onMouseLeave={() => handleSectionHover(null)}
            >
              <motion.h3
                className="text-xl font-bold text-white uppercase tracking-wider relative"
                whileHover={{ color: "#548cac", x: 5 }}
                transition={{ duration: 0.3 }}
              >
                {memoizedSections.connect.title}
                <motion.div
                  className="absolute -bottom-2 left-0 h-0.5 bg-[#548cac] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredSection === "connect" ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.h3>
              <ul className="space-y-4">
                {memoizedSections.connect.items.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center text-white/80 hover:text-[#548cac] transition-all duration-300 relative py-2"
                    >
                      <motion.div
                        className="flex items-center space-x-3 w-full"
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-[#548cac]/40 group-hover:bg-[#548cac] transition-colors duration-300"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 3 }}
                      >
                        <RiArrowRightUpLine className="size-4 text-[#548cac]" />
                      </motion.div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Register Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="space-y-6"
              onMouseEnter={() => handleSectionHover("register")}
              onMouseLeave={() => handleSectionHover(null)}
            >
              <motion.h3
                className="text-xl font-bold text-white uppercase tracking-wider relative"
                whileHover={{ color: "#548cac", x: 5 }}
                transition={{ duration: 0.3 }}
              >
                {memoizedSections.register.title}
                <motion.div
                  className="absolute -bottom-2 left-0 h-0.5 bg-[#548cac] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredSection === "register" ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.h3>
              <ul className="space-y-4">
                {memoizedSections.register.items.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center text-white/80 hover:text-[#548cac] transition-all duration-300 relative py-2"
                    >
                      <motion.div
                        className="flex items-center space-x-3 w-full"
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-[#548cac]/40 group-hover:bg-[#548cac] transition-colors duration-300"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 3 }}
                      >
                        <RiArrowRightUpLine className="size-4 text-[#548cac]" />
                      </motion.div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.p
            className="text-white/60 text-sm"
            whileHover={{ color: "rgba(255, 255, 255, 0.8)" }}
            transition={{ duration: 0.3 }}
          >
            &copy; {new Date().getFullYear()} 434 MEDIA. All rights reserved.
          </motion.p>

          <motion.div
            className="flex items-center space-x-6 text-sm text-white/60"
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <span>Actions Speak Louder</span>
            <motion.div
              className="w-2 h-2 rounded-full bg-[#548cac]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
