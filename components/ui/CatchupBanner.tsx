"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "./dialog"
import { Button } from "../Button"
import { RiPlayFill, RiCloseLine } from "@remixicon/react"
import { VisuallyHidden } from "./visually-hidden"
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react"

const stats = [
  {
    name: "Total Registered 2024",
    value: "977",
  },
  {
    name: "Total Registered 2023",
    value: "347",
  },
  {
    name: "Increase YoY",
    value: "2.8x",
  },
]

export default function CatchupBanner() {
  const [isOpen, setIsOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "15%"])
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1, 1.05])
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 0.4, 0.6])

  // Preload the background image
  useEffect(() => {
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => setImageLoaded(true)
    img.src = "https://ampd-asset.s3.us-east-2.amazonaws.com/milcityusa-2-testimonial.png"
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "backOut",
      },
    }),
  }

  return (
    <motion.section
      ref={ref}
      className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl shadow-[#101310]/40 group"
      aria-label="AIM Summit 2024 Highlights"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Background image with transforms */}
        {imageLoaded && (
          <motion.div className="absolute inset-0 w-full h-full" style={{ y: imageY, scale: imageScale }}>
            <img
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/milcityusa-2-testimonial.png"
              alt=""
              className="w-full h-full object-cover rounded-2xl"
              aria-hidden="true"
            />
          </motion.div>
        )}

        {/* Background gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#101310]/60 via-[#366A79]/50 to-[#4f4f2c]/60 rounded-2xl"
          style={{ opacity: overlayOpacity }}
        />

        {/* Glassmorphism effect on hover */}
        <motion.div
          className="absolute inset-0 backdrop-blur-[1px] rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content - Now Full Width */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20">
        {/* Text Content - Maximized */}
        <motion.div className="w-full max-w-5xl" variants={itemVariants}>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6 sm:mb-8 leading-tight"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)",
            }}
            variants={itemVariants}
          >
            Help Drive Military Medical Innovation
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 sm:mb-12 text-balance tracking-tight leading-relaxed max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <strong>AIM Health R&D Summit</strong> provides an unparalleled epicenter for the convergence of
            professionals from academia, industry, and the military
          </motion.p>

          {/* Enhanced Stats - Now More Prominent and BEFORE buttons on mobile */}
          <motion.dl
            className="mt-8 sm:mt-12 mb-12 sm:mb-16 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-12 border-t border-[#548cac]/20 pt-8 sm:pt-12 lg:pt-16 order-first sm:order-none"
            variants={itemVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group/stat cursor-default"
                custom={index}
                variants={statVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.dd
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 transition-colors duration-300 group-hover/stat:text-[#548cac]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.dd>
                <dt className="text-sm sm:text-base lg:text-lg text-white/80 font-medium leading-tight">{stat.name}</dt>
              </motion.div>
            ))}
          </motion.dl>

          {/* Enhanced Buttons */}
          <motion.div
            className="flex gap-4 sm:gap-6 w-full justify-center max-w-xs mx-auto"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex-1"
            >
              <Button
                onClick={() => setIsOpen(true)}
                variant="primary"
                className="w-full relative overflow-hidden group/btn text-lg py-4 px-8"
              >
                <motion.span
                  className="flex items-center justify-center relative z-10"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <RiPlayFill className="mr-2 size-6" aria-hidden="true" />
                  Watch highlights
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-4xl lg:max-w-5xl p-0 bg-black border-0 overflow-hidden">
              <DialogTitle>
                <VisuallyHidden>AIM Summit 2024 Highlights Video</VisuallyHidden>
              </DialogTitle>

              <motion.div
                className="relative aspect-video"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+2024+Cut+Down.mp4"
                  title="AIM Summit 2024 Highlights"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />

                {/* Enhanced close button */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                  aria-label="Close video"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <RiCloseLine className="h-6 w-6" />
                </motion.button>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
