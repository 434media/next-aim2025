"use client"

import { RiArrowRightUpLine, RiPauseFill, RiPlayFill } from "@remixicon/react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { EditableText } from "./admin/EditableText"
import { Button } from "./Button"

const stats = [
  { label: "Convention Center Size", value: "514,000 sq ft" },
  { label: "River Walk Length", value: "15 miles" },
  { label: "Annual Visitors", value: "39 million" },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function VenueCTA() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => setIsVideoLoaded(true))
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#101310] text-white">
      <div className="absolute inset-0">
        <Image
          alt="Medical research background"
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/milcityusa-2-testimonial.png"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#548cac] to-[#4f4f2c]">
              <EditableText
                textId="venue-cta-title"
                page="global"
                section="venue-cta"
              >
                Experience San Antonio
              </EditableText>
            </h2>
            <p className="text-lg sm:text-xl text-[#548cac] mb-8">
              <EditableText
                textId="venue-cta-description"
                page="global"
                section="venue-cta"
                multiline
              >
                Discover the perfect blend of history, culture, and modern amenities at the Henry B. González Convention
                Center, nestled in the heart of vibrant San Antonio.
              </EditableText>
            </p>
            <Button variant="primary" href="/travel-venue" className="group text-lg py-3 px-6">
              Explore Venue & City
              <RiArrowRightUpLine className="ml-2 inline-flex size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative aspect-video">
            <AnimatePresence>
              {!isVideoLoaded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-[#101310]"
                >
                  <div className="w-16 h-16 border-4 border-[#548cac] border-t-transparent rounded-full animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <video
                ref={videoRef}
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/1080p.mp4"
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
                poster="https://ampd-asset.s3.us-east-2.amazonaws.com/Cantilever-Room2.jpg"
              />
              <button
                className="absolute bottom-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <RiPauseFill size={24} /> : <RiPlayFill size={24} />}
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={fadeInUp} custom={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#548cac] mb-2">{stat.value}</div>
              <div className="text-sm sm:text-base text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

