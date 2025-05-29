"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/Button"
import { RiPlayFill, RiCloseLine } from "@remixicon/react"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
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
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 0.7, 0.9])

  // Preload the background image
  useEffect(() => {
    const img = new window.Image()
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
      {/* Enhanced Background with Progressive Loading */}
      <div className="absolute inset-0">
        {/* Blur placeholder */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#101310] via-[#366A79] to-[#4f4f2c]"
          initial={{ opacity: 1 }}
          animate={{ opacity: imageLoaded ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Main background image */}
        <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
          <Image
            alt="Medical research background"
            src="https://ampd-asset.s3.us-east-2.amazonaws.com/milcityusa-2-testimonial.png"
            fill
            sizes="100vw"
            className="object-cover transition-all duration-700"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            style={{
              filter: imageLoaded ? "blur(0px) brightness(100%)" : "blur(10px) brightness(50%)",
            }}
          />
        </motion.div>

        {/* Dynamic overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#101310]/80 via-[#366A79]/70 to-[#4f4f2c]/80"
          style={{ opacity: overlayOpacity }}
        />

        {/* Glassmorphism effect on hover */}
        <motion.div
          className="absolute inset-0 backdrop-blur-[1px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 gap-6 lg:gap-8">
        {/* Text Content */}
        <motion.div className="w-full lg:w-3/5 xl:w-1/2 text-center lg:text-left" variants={itemVariants}>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)",
            }}
            variants={itemVariants}
          >
            Help Drive Military Medical Innovation
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 text-balance tracking-tight leading-relaxed max-w-2xl mx-auto lg:mx-0"
            variants={itemVariants}
          >
            <strong>AIM Health R&D Summit</strong> provides an unparalleled epicenter for the convergence of
            professionals from academia, industry, and the military
          </motion.p>

          {/* Enhanced Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full justify-center lg:justify-start"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                variant="primary"
                className="w-full sm:w-auto relative overflow-hidden group/btn"
              >
                <motion.span
                  className="flex items-center justify-center relative z-10"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <RiPlayFill className="mr-2 size-5" aria-hidden="true" />
                  Watch highlights
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                href="https://support.velocitytx.org/campaign/642575/donate"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Become a Sponsor
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.dl
            className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 border-t border-[#548cac]/20 pt-6 sm:pt-8"
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
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1 transition-colors duration-300 group-hover/stat:text-[#548cac]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.dd>
                <dt className="text-xs sm:text-sm text-white/80 font-medium leading-tight">{stat.name}</dt>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Enhanced Image Section */}
        <motion.div className="w-full lg:w-2/5 xl:w-1/2 relative" variants={itemVariants}>
          <motion.div
            className="aspect-square w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto relative overflow-hidden rounded-2xl shadow-2xl group/image"
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-[#366A79] via-[#548cac] to-[#4f4f2c] rounded-2xl opacity-0 group-hover/image:opacity-30 blur-xl transition-opacity duration-500"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/preaimweb-20.jpg"
                alt="Pre AIM Summit 2025 visual"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-cover transition-all duration-500 group-hover/image:scale-110 group-hover/image:grayscale-0 grayscale-[0.3]"
                loading="lazy"
              />

              {/* Overlay gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
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
