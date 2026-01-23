"use client"

import { ArrowRight, PlayCircle } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import { EditableText } from "./admin/EditableText"

export default function MMIDCallout() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-16 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/5-2-2023_mmid-7.jpg"
                alt="Military Medical Industry Days (MMID) webinar session participants"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-500/10 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-600/10 rounded-full blur-xl" />
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div className="space-y-6">
              <h2
                className="text-5xl lg:text-6xl xl:text-7xl font-black text-neutral-900 leading-[0.9] tracking-tight"
              >
                <EditableText textId="mmid-callout-title" page="pre-conference-symposiums" section="mmid">
                  Preparatory Webinars
                </EditableText>
              </h2>

              <div className="space-y-4">
                <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
                  <EditableText textId="mmid-callout-description-1" page="pre-conference-symposiums" section="mmid" multiline>
                    Watch instructional and informational videos of previous AIM Health R&D Summit and Military Medical Industry Days (MMID) webinar sessions.
                  </EditableText>
                </p>

                <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
                  <EditableText textId="mmid-callout-description-2" page="pre-conference-symposiums" section="mmid" multiline>
                    All sessions were designed to help you optimize your experience at the AIM Health R&D Summit and provide essential information about military medical innovation and research.
                  </EditableText>
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="https://youtube.com/playlist?list=PLu4stFKpxLBXb7TY7luPCEAHBg1CZQru8&si=UnnuZ2Q2E08QSBVP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Watch MMID preparatory webinar playlist on YouTube"
              >
                <PlayCircle className="h-6 w-6 group-hover:animate-pulse" aria-hidden="true" />
                Watch Full Playlist
                <ArrowRight
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
