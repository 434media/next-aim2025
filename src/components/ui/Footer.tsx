"use client"

import Link from "next/link"
import type React from "react"
import { motion } from "motion/react"
import { Button } from "../Button"
import { RiInstagramFill, RiLinkedinFill, RiTwitterXFill, RiYoutubeFill, RiArrowRightUpLine } from "@remixicon/react"
import Image from "next/image"

const sections = {
  discover: {
    title: "Discover",
    items: [
      { label: "Why Attend", href: "#why-attend" },
      { label: "Keynote", href: "#keynote" },
      { label: "Pricing", href: "#pricing" },
      { label: "Schedule", href: "#schedule" },
      { label: "Speakers", href: "#speakers" },
      { label: "Sponsors & Exhibitors", href: "#sponsors" },
      { label: "Bring Your Team", href: "#team" },
    ],
  },
  more: {
    title: "More",
    items: [
      { label: "FAQ", href: "#faq" },
      { label: "Travel & Venue", href: "#travel" },
      { label: "Code of Conduct", href: "#code" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
}

export default function Footer() {
  return (
    <>
      {/* Full-width CTAs */}
      <section className="bg-neutral-950 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold">Become a Sponsor</h2>
            <p className="mt-2 text-white/80 max-w-xl">
              Join leading organizations in supporting innovation in military medicine.
            </p>
          </div>
          <Button
            variant="secondary"
            href="https://support.velocitytx.org/campaign/642575/donate"
            className="w-full sm:w-auto text-lg"
          >
            Learn More
            <RiArrowRightUpLine className="ml-2 size-5" />
          </Button>
        </motion.div>
      </section>

      <section className="bg-white/5 text-neutral-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold">Register Now</h2>
            <p className="mt-2 text-black/90 max-w-xl">Early bird pricing available until February 28, 2025.</p>
          </div>
          <Button
            variant="primary"
            href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
            className="w-full sm:w-auto"
          >
            Register Now
            <RiArrowRightUpLine className="ml-2 size-5" />
          </Button>
        </motion.div>
      </section>

      {/* Main Footer */}
      <footer className="md:pt-4 bg-white/5 text-gray-800" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Vertical Lines */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            {/* Left */}
            <div
              className="absolute inset-y-0 left-4 sm:left-6 lg:left-8 w-px my-[-5rem] hidden sm:block"
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
              className="absolute inset-y-0 right-4 sm:right-6 lg:right-8 w-px my-[-5rem] hidden sm:block"
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
            className="w-full border-y border-dashed border-neutral-200 stroke-neutral-200 hidden sm:block"
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

          <div className="py-20 lg:py-24">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Logo Section*/}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 lg:col-span-2 p-2"
              >
                <Link href="/" className="inline-block" aria-label="AIM Summit Home">
                  <Image
                    src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-surf-color.png"
                    alt="AIM Summit Logo"
                    width={300}
                    height={150}
                    className="h-auto w-full max-w-md md:-mt-12 transition-opacity duration-300 hover:opacity-80"
                  />
                </Link>
              </motion.div>

              {/* Discover Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 uppercase tracking-wider">
                  {sections.discover.title}
                </h3>
                <ul className="space-y-4">
                  {sections.discover.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-600 hover:text-orange-500 hover:underline transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* More Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 uppercase tracking-wider">{sections.more.title}</h3>
                <ul className="space-y-4">
                  {sections.more.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-600 hover:text-orange-500 hover:underline transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <div className="border-t border-neutral-200">
            <div className="flex flex-col md:flex-row items-center justify-between mt-2 space-y-4 md:mt-6 p-2">
              <p className="text-gray-700 text-sm">&copy; 434 MEDIA. All rights reserved.</p>

              <div className="flex gap-4" aria-label="Social media links">
                <SocialLink href="#" icon={RiYoutubeFill} label="YouTube" />
                <SocialLink href="#" icon={RiLinkedinFill} label="LinkedIn" />
                <SocialLink href="#" icon={RiInstagramFill} label="Instagram" />
                <SocialLink href="#" icon={RiTwitterXFill} label="Twitter" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
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
      <Icon className="w-8 h-8 transition-transform hover:scale-110" />
    </Link>
  )
}

