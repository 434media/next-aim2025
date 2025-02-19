"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0])

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover md:rounded-b-3xl">
          <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Cut+Down.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-neutral-950/30 md:rounded-b-3xl" />
      </div>

      {/* Scroll Indicator */}
      {isClient && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <motion.span
            className="text-white/70 text-sm uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Scroll to learn more
          </motion.span>
        </motion.div>
      )}
    </div>
  )
}
