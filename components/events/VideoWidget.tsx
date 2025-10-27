"use client"

import { motion } from "motion/react"

export function VideoWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm aspect-square"
    >
      <video autoPlay loop muted playsInline className="w-full h-full object-cover">
        <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Cut+Down+Website.mp4" type="video/mp4" />
      </video>
    </motion.div>
  )
}
