"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const images = {
  logo: "/propel/propel-logo-2026.jpg",
}

export default function PropelComingSoonPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-neutral-50 via-white to-neutral-50">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <Image
              src={images.logo}
              alt="ProPEL 2026 – Promoting Professional Engagement Among Military Laboratories"
              width={180}
              height={180}
              className="mx-auto"
              priority
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-[#548cac]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#548cac]">
              Coming Soon
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
          >
            ProPEL 2026
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-2 text-lg font-medium text-[#548cac]"
          >
            Promoting Professional Engagement among Military Laboratories
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg"
          >
            Details for ProPEL 2026 are being finalized. Check back soon for
            information on this year&apos;s program, including areas of focus,
            keynote speakers, and registration.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 h-px w-24 bg-linear-to-r from-transparent via-[#548cac]/40 to-transparent"
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8"
          >
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full bg-[#548cac] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#476e87] hover:shadow-md"
            >
              Get Notified
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Host */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 text-xs font-medium uppercase tracking-widest text-neutral-400"
          >
            Hosted by DHA Research &amp; Engineering
          </motion.p>
        </motion.div>
      </div>
    </main>
  )
}
