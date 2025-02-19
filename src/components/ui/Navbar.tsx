"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import Link from "next/link"
import Image from "next/image"
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Button } from "../Button"
import { AIMLogo } from "../../../public/AIMLogo"
import { RiMapPin2Fill, RiCalendarEventFill, RiArrowRightUpLine } from "@remixicon/react"

const menuItems = [
  { name: "About", href: "#about" },
  { name: "Program", href: "#program" },
  { name: "Partners", href: "#partners" },
  { name: "Location", href: "#location" },
  { name: "Contact", href: "#contact" },
]

const SALE_END_DATE = new Date("2025-02-28T23:59:59")

const eventInfo = {
  date: "June 16-17, 2025",
  location: "San Antonio, TX",
}

const EarlyBirdBanner = ({ scrolled }: { scrolled: boolean }) => {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = SALE_END_DATE.getTime() - now.getTime()

      if (difference <= 0) {
        return "Sale has ended"
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

      if (days > 1) {
        return `${days} days left for early bird pricing`
      } else if (days === 1) {
        return "1 day left for early bird pricing"
      } else if (hours > 1) {
        return `${hours} hours left for early bird pricing`
      } else if (hours === 1) {
        return "1 hour left for early bird pricing"
      } else {
        return "Less than an hour left for early bird pricing"
      }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000 * 60) // Update every minute

    setTimeLeft(calculateTimeLeft()) // Initial calculation

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden md:block"
    >
      <a
        href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <motion.div
          animate={{
            backgroundColor: scrolled
              ? ["hsla(220, 100%, 15%, 0.9)", "hsla(220, 100%, 20%, 0.9)"]
              : ["hsla(220, 100%, 15%, 0.3)", "hsla(220, 100%, 20%, 0.3)"],
            transition: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
          }}
          className="rounded-full border border-blue-400/20 px-4 py-2 group-hover:border-orange-500/20 transition-colors"
        >
          <p className="text-sm font-medium text-orange-500">{timeLeft} <RiArrowRightUpLine className="inline-block w-4 h-4" /></p>
        </motion.div>
      </a>
    </motion.div>
  )
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const textColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 1)", "rgba(31, 41, 55, 1)"])

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 shadow-md" : "bg-transparent"
        } backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20" aria-label="Main navigation">
            {/* Logo and Event Info */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md">
                <motion.div
                  initial={false}
                  animate={{ filter: scrolled ? "invert(0)" : "invert(1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <AIMLogo className="h-12 md:h-16 w-auto" aria-label="AIM Summit Logo" />
                </motion.div>
              </Link>
              <motion.div style={{ color: textColor }} className="hidden md:flex flex-col items-start ml-4">
                <div className="flex items-center space-x-1">
                  <RiCalendarEventFill className="w-5 h-5 text-orange-500" />
                  <span className="text-sm">{eventInfo.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <RiMapPin2Fill className="w-5 h-5 text-orange-500" />
                  <span className="text-sm">{eventInfo.location}</span>
                </div>
              </motion.div>
            </div>

            {/* CTA Button and Menu */}
            <div className="flex items-center gap-4">
              <EarlyBirdBanner scrolled={scrolled} />

              <button
                onClick={() => setIsOpen(true)}
                className={`group rounded-full p-2 transition-colors ${
                  scrolled ? "hover:bg-gray-200" : "hover:bg-white/20"
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                aria-label="Open menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <Bars3CenterLeftIcon
                  className={`size-6 sm:size-8 ${scrolled ? "text-gray-800" : "text-gray-100"} transition-transform group-hover:scale-105`}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-neutral-950 z-50 shadow-xl overflow-y-auto rounded-l-3xl"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-between items-center">
                  <Image
                    src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-2025-dark-bg.svg"
                    alt="AIM Summit Logo"
                    width={180}
                    height={90}
                    className="h-12 sm:h-16 w-auto"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                    aria-label="Close menu"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-6 flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RiCalendarEventFill className="w-5 h-5 text-orange-500" />
                    <span className="text-sm text-gray-300">{eventInfo.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RiMapPin2Fill className="w-5 h-5 text-orange-500" />
                    <span className="text-sm text-gray-300">{eventInfo.location}</span>
                  </div>
                </div>

                <nav className="mt-8" aria-label="Mobile navigation">
                  <ul className="space-y-4" role="list">
                    {menuItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="group flex items-center text-xl sm:text-2xl text-white transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          <motion.span
                            initial={false}
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", damping: 20, stiffness: 400 }}
                          >
                            {item.name}
                          </motion.span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-auto pt-8">
                  <div className="space-y-4 w-full flex flex-col">
                    <Button variant="secondary" href="https://support.velocitytx.org/campaign/642575/donate">
                      Become a Sponsor
                    </Button>
                    <Button variant="primary" href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/">
                      Register to Attend
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

