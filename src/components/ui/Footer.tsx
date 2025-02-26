"use client"

import Link from "next/link"
import type React from "react"
import { motion } from "motion/react"
import { Button } from "../Button"
import { RiInstagramFill, RiLinkedinFill, RiTwitterXFill, RiYoutubeFill, RiArrowRightUpLine } from "@remixicon/react"
import { AIMLogo } from "../../../public/AIMLogo"

const sections = {
  discover: {
    title: "Discover",
    items: [
      { label: "Why Attend", href: "/why-attend" },
      { label: "Schedule", href: "#schedule" },
      { label: "Speakers", href: "#speakers" },
      { label: "Sponsors & Exhibitors", href: "/sponsors-exhibitors" },
      { label: "Pre-Conference Symposiums", href: "/pre-conference-symposiums" },
    ],
  },
  more: {
    title: "More",
    items: [
      { label: "FAQ", href: "/faq" },
      { label: "Travel & Venue", href: "/travel-venue" },
      { label: "Code of Conduct", href: "/code-of-conduct" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
}

export default function Footer() {
  return (
    <footer className="bg-[#101310] text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Full-width CTAs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 divide-y divide-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 first:pb-8 last:pt-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Become a Sponsor</h2>
                <p className="mt-2 text-[#548cac] text-lg">
                  Join leading organizations in supporting innovation in military medicine.
                </p>
              </div>
              <Button
                variant="secondary"
                href="https://support.velocitytx.org/campaign/642575/donate"
                className="w-full sm:w-auto text-lg py-3 px-6"
              >
                <span className="flex items-center justify-center">
                  Learn More
                  <RiArrowRightUpLine className="ml-2 size-5" aria-hidden="true" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 first:pb-8 last:pt-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Register Now</h2>
                <p className="mt-2 text-[#548cac] text-lg">Don&apos;t miss this opportunity to be part of the premier event in military medical innovation.</p>
              </div>
              <Button
                variant="primary"
                href="https://whova.com/portal/registration/Y-ZNcxeCfgZo09u3PpLM/"
                className="w-full sm:w-auto text-lg py-3 px-6"
              >
                <span className="flex items-center justify-center">
                  Register Now
                  <RiArrowRightUpLine className="ml-2 size-5" aria-hidden="true" />
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:col-span-2"
          >
            <Link href="/" className="inline-block" aria-label="AIM Summit Home">
              <AIMLogo className="w-48 h-auto" variant="white" />
            </Link>
            <p className="text-[#548cac] text-lg max-w-md">
              Accelerating innovation in military medicine through collaboration between academia, industry, and the
              military.
            </p>
          </motion.div>

          {/* Discover Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-[#4f4f2c] uppercase tracking-wider">{sections.discover.title}</h3>
            <ul className="space-y-4">
              {sections.discover.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-base text-[#548cac] hover:text-white transition-colors duration-200"
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
            <h3 className="text-xl font-semibold text-[#4f4f2c] uppercase tracking-wider">{sections.more.title}</h3>
            <ul className="space-y-4">
              {sections.more.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-base text-[#548cac] hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-[#548cac] text-sm">&copy; 434 MEDIA. All rights reserved.</p>

          <div className="flex gap-6" aria-label="Social media links">
            <SocialLink href="#" icon={RiYoutubeFill} label="YouTube" />
            <SocialLink href="#" icon={RiLinkedinFill} label="LinkedIn" />
            <SocialLink href="#" icon={RiInstagramFill} label="Instagram" />
            <SocialLink href="#" icon={RiTwitterXFill} label="Twitter" />
          </div>
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
      className="text-[#548cac] hover:text-white transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="sr-only">{label}</span>
      <Icon className="w-6 h-6 transition-transform hover:scale-110" />
    </Link>
  )
}

