"use client"

import { motion } from "motion/react"
import { RiPlayCircleLine } from "@remixicon/react"

export default function MMIDCallout() {
  return (
    <section className="-mt-16 -md:mt-20 py-16 sm:py-20 bg-gradient-to-t from-neutral-50 via-sky-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="relative px-8 py-16 sm:px-16 sm:py-20 lg:px-24 lg:py-24 text-left md:text-center">

            {/* Heading */}
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Preparatory Webinar Sessions
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Watch instructional/informational videos of previous AIM Health R&D Summit and <span className="text-sky-600 font-medium">Military Medical Industry Days (MMID)</span> webinar sessions
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="https://youtube.com/playlist?list=PLu4stFKpxLBXb7TY7luPCEAHBg1CZQru8&si=UnnuZ2Q2E08QSBVP"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-neutral-900 bg-white border-2 border-neutral-900 rounded-xl hover:bg-neutral-900 hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-neutral-500/50 focus:ring-offset-4 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Watch Full Playlist
                <RiPlayCircleLine className="ml-1 h-6 w-6 group-hover:animate-pulse" aria-hidden="true" />                
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
