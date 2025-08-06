"use client"
import { motion } from "motion/react"
import { ImagesSlider } from "./ui/images-slider"
import { Button } from "./Button"
import { RiMailLine } from "@remixicon/react"
import { useMediaQuery } from "../hooks/useMediaQuery"

const eventImages = [
  "https://ampd-asset.s3.us-east-2.amazonaws.com/keynote.jpeg",
  "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
  "https://ampd-asset.s3.us-east-2.amazonaws.com/stategic-networking.jpeg",
  "https://ampd-asset.s3.us-east-2.amazonaws.com/collab.jpeg",
  "https://ampd-asset.s3.us-east-2.amazonaws.com/crowd.jpeg",
  "https://ampd-asset.s3.us-east-2.amazonaws.com/collab2.jpeg",
]

export function EventRecapCarousel() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  return (
    <section className="relative w-full overflow-hidden isolate bg-black">
      {/* Full Viewport Slider */}
      <ImagesSlider
        className="h-screen w-full"
        images={eventImages}
        autoplay={true}
        direction="up"
        overlayClassName="bg-gradient-to-t from-black/95 via-black/40 to-transparent"
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="z-30 absolute bottom-0 left-0 right-0 flex flex-col justify-end items-center px-4 sm:px-6 lg:px-8 text-center pb-8 sm:pb-12 lg:pb-16"
        >
          {/* H2 Text Overlay */}
          <motion.div
            className={`relative ${isMobile ? "mb-6" : "mb-8"} overflow-hidden`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            {/* Enhanced background for better contrast - contained within bounds */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-sky-500/10 blur-md rounded-full scale-90" />

            <h2
              className={`relative leading-tight font-bold tracking-tight text-white ${
                isMobile
                  ? "text-2xl sm:text-3xl"
                  : isTablet
                    ? "text-4xl lg:text-5xl"
                    : "text-5xl xl:text-6xl 2xl:text-7xl"
              }`}
              style={{
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8), 2px 2px 0px rgba(0,0,0,1), -2px -2px 0px rgba(0,0,0,1), 2px -2px 0px rgba(0,0,0,1), -2px 2px 0px rgba(0,0,0,1)",
              }}
            >
              <span className="block text-white font-semibold">The Future of Military Medicine</span>
              <span className="block mt-1">
                <span className="text-sky-300 font-black">Starts Here</span>
                <span className="text-white font-medium">, and It</span>
              </span>
              <span className="block mt-1">
                <span className="text-blue-300 font-black">Continues With You</span>
                <span className="text-white font-medium">.</span>
              </span>
            </h2>

            {/* Subtle decorative elements - contained within bounds */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-sky-400 rounded-full opacity-60 blur-sm" />
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-50 blur-sm" />
          </motion.div>

          {/* Enhanced Stay Connected Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="relative overflow-hidden"
          >
            <motion.div
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative inline-block"
            >
              {/* Button glow effect - contained within bounds */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/40 to-blue-500/40 rounded-full blur-md opacity-60 scale-95" />

              <Button
                variant="primary"
                href="/contact-us"
                className={`relative transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-600 hover:from-sky-500 hover:via-blue-500 hover:to-sky-500 border-2 border-white/40 hover:border-white/60 text-white backdrop-blur-sm ${
                  isMobile
                    ? "text-base font-semibold py-3 px-6 rounded-full w-full max-w-xs"
                    : isTablet
                      ? "text-lg font-bold py-4 px-8 rounded-full"
                      : "text-xl font-bold py-5 px-10 rounded-full"
                }`}
                style={{
                  textShadow: "0 2px 8px rgba(0,0,0,0.8), 1px 1px 0px rgba(0,0,0,0.9), -1px -1px 0px rgba(0,0,0,0.9)",
                  boxShadow: isMobile
                    ? "0 4px 20px rgba(14, 165, 233, 0.3), 0 0 0 1px rgba(255,255,255,0.2) inset"
                    : "0 8px 32px rgba(14, 165, 233, 0.4), 0 0 0 1px rgba(255,255,255,0.2) inset",
                }}
              >
                <span className="flex items-center justify-center relative z-10">
                  <motion.div
                    animate={
                      isMobile
                        ? {}
                        : {
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, 0],
                          }
                    }
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <RiMailLine className={`${isMobile ? "mr-2 size-4" : "mr-3 size-5"}`} />
                  </motion.div>
                  Stay Connected
                  <motion.div
                    className={`${isMobile ? "ml-2 text-lg" : "ml-3 text-xl"}`}
                    animate={
                      isMobile
                        ? {}
                        : {
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, -10, 0],
                          }
                    }
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    ✨
                  </motion.div>
                </span>
              </Button>

              {/* Bottom gradient line - contained within bounds */}
              <div
                className={`absolute inset-x-0 h-px -bottom-px bg-gradient-to-r mx-auto from-transparent via-sky-300/80 to-transparent ${
                  isMobile ? "w-2/3" : "w-3/4"
                }`}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </ImagesSlider>

      {/* Accessibility: Screen reader content */}
      <div className="sr-only">
        <p>Event recap slideshow showcasing highlights from AIM 2025</p>
        <p>The future of military medicine starts here, and it continues with you.</p>
      </div>
    </section>
  )
}
