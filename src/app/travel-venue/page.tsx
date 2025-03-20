"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import Image from "next/image"
import { RiArrowRightUpLine, RiPlayFill, RiPauseFill, RiArrowUpLine } from "@remixicon/react"
import { Button } from "@/components/Button"

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

export default function TravelVenue() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Auto-play was prevented:", error)
        setIsPlaying(false)
      })
    }
  }, [])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-[#101310] text-white pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial="initial" animate="animate" variants={staggerChildren}>
          <motion.h1
            className="text-5xl lg:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#548cac] to-[#4f4f2c]"
            variants={fadeInUp}
          >
            Explore San Antonio
          </motion.h1>
          <motion.p className="text-lg sm:text-xl text-white mb-12 max-w-2xl" variants={fadeInUp}>
            Discover the perfect blend of history, culture, and modern amenities in the heart of Texas.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Feature */}
            <motion.div className="relative lg:row-span-2 rounded-2xl overflow-hidden shadow-lg" variants={fadeInUp}>
              <div className="relative aspect-[4/5] lg:aspect-[3/4] w-full">
                <video
                  ref={videoRef}
                  src="https://ampd-asset.s3.us-east-2.amazonaws.com/1080p.mp4"
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full"
                  poster="https://ampd-asset.s3.us-east-2.amazonaws.com/convention-poster.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">Henry B. González Convention Center</h2>
                  <p className="text-base sm:text-lg text-white/90 mb-6 max-w-md">
                    Experience world-class facilities in the heart of downtown San Antonio, featuring over 514,000 sq ft
                    of space along the famous River Walk.
                  </p>
                  <Button
                    variant="primary"
                    href="https://www.sahbgcc.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    Visit Website
                    <RiArrowRightUpLine className="ml-2 inline-flex size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </div>
                <button
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <RiPauseFill size={24} /> : <RiPlayFill size={24} />}
                </button>
              </div>
            </motion.div>

            {/* River Walk */}
            <motion.div className="relative rounded-2xl overflow-hidden shadow-lg" variants={fadeInUp}>
              <Link
                href="https://www.thesanantonioriverwalk.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-video w-full group"
              >
                <Image
                  src="https://ampd-asset.s3.us-east-2.amazonaws.com/river.jpg"
                  alt="San Antonio River Walk"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3">The River Walk</h2>
                  <p className="text-sm sm:text-base max-w-sm text-white/90 mb-4">
                    Explore the world-famous waterway, lined with restaurants, shops, and historic sites.
                  </p>
                  <span className="inline-flex items-center text-[#548cac] font-semibold group-hover:text-white transition-colors">
                    Learn More
                    <RiArrowRightUpLine className="ml-2 size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Visit San Antonio */}
            <motion.div className="relative rounded-2xl overflow-hidden shadow-lg" variants={fadeInUp}>
              <Link
                href="https://www.visitsanantonio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-video w-full group"
              >
                <Image
                  src="https://ampd-asset.s3.us-east-2.amazonaws.com/cosa.png"
                  alt="San Antonio cityscape"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3">Discover San Antonio</h2>
                  <p className="text-sm sm:text-base max-w-sm text-white/90 mb-4">
                    From the Alamo to Pearl District, experience the best of what the city has to offer.
                  </p>
                  <span className="inline-flex items-center text-[#548cac] font-semibold group-hover:text-white transition-colors">
                    Plan Your Visit
                    <RiArrowRightUpLine className="ml-2 size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={fadeInUp}>
            {[
              {
                title: "Hotels & Accommodations",
                href: "https://www.visitsanantonio.com/hotels/",
                description: "Find the perfect place to stay near the convention center",
              },
              {
                title: "Transportation",
                href: "https://www.visitsanantonio.com/getting-around/",
                description: "Getting around San Antonio made easy",
              },
              {
                title: "Dining Guide",
                href: "https://www.visitsanantonio.com/restaurants/",
                description: "Explore San Antonio's diverse culinary scene",
              },
              {
                title: "Attractions",
                href: "https://www.visitsanantonio.com/things-to-do/",
                description: "Must-see spots and hidden gems",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-[#1c1f1c] rounded-xl hover:bg-[#548cac]/10 transition-colors group"
              >
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#548cac]">{item.title}</h3>
                <p className="text-sm text-white/70 mb-4">{item.description}</p>
                <span className="inline-flex items-center text-[#548cac] font-medium">
                  View Details
                  <RiArrowRightUpLine className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-[#548cac] text-white p-3 rounded-full shadow-lg hover:bg-[#4f4f2c] transition-colors"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <RiArrowUpLine size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  )
}

