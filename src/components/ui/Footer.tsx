"use client"
import Link from "next/link"
import type React from "react"

import { motion } from "framer-motion"
import { Button } from "../Button"
import {
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterXFill,
  RiYoutubeFill,
  RiMapPin2Fill,
  RiCalendarEventFill,
} from "@remixicon/react"

const sections = {
  about: {
    title: "Quick Links",
    items: [
      { label: "About", href: "#about" },
      { label: "Program", href: "#program" },
      { label: "Partners", href: "#partners" },
      { label: "Location", href: "#location" },
      { label: "Contact", href: "#contact" },
    ],
  },
}

const eventInfo = {
  date: "June 16-17, 2025",
  location: "San Antonio, TX",
}

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Vertical Lines */}
        <div className="pointer-events-none absolute inset-0">
          {/* Left */}
          <div
            className="absolute inset-y-0 left-4 sm:left-6 lg:left-8 w-px my-[-5rem]"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, white 5rem, white calc(100% - 5rem), transparent)",
            }}
          >
            <svg className="h-full w-full" preserveAspectRatio="none">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                className="stroke-neutral-200"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            </svg>
          </div>

          {/* Right */}
          <div
            className="absolute inset-y-0 right-4 sm:right-6 lg:right-8 w-px my-[-5rem]"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, white 5rem, white calc(100% - 5rem), transparent)",
            }}
          >
            <svg className="h-full w-full" preserveAspectRatio="none">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                className="stroke-neutral-200"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            </svg>
          </div>
        </div>

        {/* Top Border Pattern */}
        <svg
          className="w-full border-y border-dashed border-neutral-200 stroke-neutral-200"
          height="64"
          style={{
            maskImage: "linear-gradient(to right, transparent, white 2rem, white calc(100% - 2rem), transparent)",
          }}
        >
          <defs>
            <pattern id="footer-pattern" patternUnits="userSpaceOnUse" width="64" height="64">
              {Array.from({ length: 17 }, (_, i) => {
                const offset = i * 8
                return <path key={i} d={`M${-106 + offset} 110L${22 + offset} -18`} strokeWidth="1" />
              })}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>

        <div className="py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 ml-2 mr-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start lg:col-span-2"
            >
              <h3 className="text-3xl md:text-5xl text-gray-800 font-bold text-balance max-w-3xl mb-8 leading-tight">
                Accelerating life-saving technologies{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  from bench to battlefield
                </span>
              </h3>
              <div className="flex flex-col space-y-4 mb-8">
                <div className="flex items-center space-x-2">
                  <RiCalendarEventFill className="w-6 h-6 text-orange-500" />
                  <span className="text-lg text-gray-600">{eventInfo.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RiMapPin2Fill className="w-6 h-6 text-orange-500" />
                  <span className="text-lg text-gray-600">{eventInfo.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col space-y-6"
            >
              <h4 className="text-lg font-semibold text-gray-900 uppercase tracking-wider">Join Us</h4>
              <div className="flex flex-col space-y-4">
                <Button
                  variant="secondary"
                  href="https://support.velocitytx.org/campaign/642575/donate"
                  className="text-lg py-3"
                >
                  Become a Sponsor
                </Button>
                <Button
                  variant="primary"
                  href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                  className="text-lg py-3"
                >
                  Register to Attend
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-neutral-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 ml-2 mr-2">
            <p className="text-base text-gray-500">&copy; 434 MEDIA. All rights reserved.</p>
            <div className="flex space-x-6">
              <SocialLink href="#" icon={RiTwitterXFill} label="Twitter" />
              <SocialLink href="#" icon={RiYoutubeFill} label="YouTube" />
              <SocialLink href="#" icon={RiInstagramFill} label="Instagram" />
              <SocialLink href="#" icon={RiLinkedinFill} label="LinkedIn" />
            </div>
          </div>
          <nav className="mt-8 ml-2" aria-label="Quick links">
            <ul className="flex flex-wrap justify-center md:justify-start space-x-6">
              {sections.about.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-orange-500 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}

function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="sr-only">{label}</span>
      <Icon className="w-6 h-6" />
    </Link>
  )
}

