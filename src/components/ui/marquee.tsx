"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useAnimationFrame, useMotionValue, useSpring } from "motion/react"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  duration?: number
  reverse?: boolean
}

export const Marquee: React.FC<MarqueeProps> = ({ children, className = "", duration = 20, reverse = false }) => {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const x = useMotionValue(0)
  const springX = useSpring(x, { damping: 50, stiffness: 400 })

  useEffect(() => {
    if (marqueeRef.current) {
      setContentWidth(marqueeRef.current.scrollWidth / 2)
    }
  }, [])

  useAnimationFrame((_, delta) => {
    if (contentWidth <= 0) return

    let newX = x.get() + (reverse ? delta : -delta) / (duration * 10)

    if (newX < -contentWidth) {
      newX += contentWidth
    } else if (newX > 0) {
      newX -= contentWidth
    }

    x.set(newX)
  })

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div ref={marqueeRef} style={{ x: springX }} className="flex whitespace-nowrap">
        {React.Children.map(children, (child) => (
          <div className="flex-shrink-0">{child}</div>
        ))}
        {React.Children.map(children, (child) => (
          <div className="flex-shrink-0">{child}</div>
        ))}
      </motion.div>
    </div>
  )
}

