"use client"

import { ArrowRight, Play, X } from "lucide-react"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import { useRef, useState } from "react"
import { useMediaQuery } from "../hooks/useMediaQuery"

const RECAP_VIDEO_URL =
  "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/AIM2025%20Long%20Form%20Recap_Final%20Approved.mp4"
const RECAP_POSTER_URL =
  "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/recap-poster-group"

export function EventRecapCarousel() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [videoError, setVideoError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1])
  const contentY = useTransform(scrollYProgress, [0.2, 0.8], [60, 0])
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1])

  const openVideo = () => {
    setVideoError(null)
    setIsVideoModalOpen(true)
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false)
    setVideoError(null)
  }

  const handleVideoError = (error: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = error.currentTarget
    setVideoError(`Video failed to load: ${videoElement.error?.message || "Unknown error"}`)
  }

  return (
    <>
      <section ref={sectionRef} className="relative w-full overflow-hidden bg-black">
        {/* Top gradient bleed from previous section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black to-transparent z-20 pointer-events-none" />

        <div className="relative w-full" style={{ aspectRatio: isMobile ? "4/5" : "16/9", minHeight: isMobile ? "100vh" : "100vh" }}>
          <motion.img
            src={RECAP_POSTER_URL}
            alt="AIM 2025 Recap"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              scale: imageScale,
              opacity: imageOpacity,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-end px-4 sm:px-6 lg:px-8 text-center pb-8 sm:pb-12 lg:pb-16"
            style={{
              y: contentY,
              opacity: contentOpacity,
            }}
          >
            <div className="relative mb-6 max-w-sm mx-auto">
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm rounded-xl" />
              <div className="relative px-4 py-3 sm:px-6 sm:py-4">
                <h2
                  className={`leading-tight tracking-tight text-white ${isMobile ? "text-2xl font-black mb-1" : "text-4xl font-bold mb-2"
                    }`}
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
                >
                  AIM&apos;25 Recap
                </h2>
                <p
                  className={`text-sky-100 leading-snug tracking-tighter ${isMobile ? "text-sm font-medium" : "text-lg font-medium"
                    }`}
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                >
                  The future of military medicine starts now
                </p>
              </div>
            </div>

            <motion.button
              onClick={openVideo}
              whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.2, ease: "easeOut" } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              className={`relative transition-all duration-300 shadow-xl bg-white hover:bg-gray-50 text-black border border-white hover:border-gray-100 cursor-pointer select-none ${isMobile
                ? "text-sm font-bold py-3 px-6 rounded-lg"
                : "text-lg font-semibold py-4 px-8 rounded-lg"
                }`}
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
            >
              <span className="flex items-center justify-center">
                Watch AIM&apos;25 Video
                <Play className={isMobile ? "ml-2 size-4" : "ml-2 size-5"} />
              </span>
            </motion.button>
          </motion.div>
        </div>

        <div className="sr-only">
          <p>AIM 2025 recap video section</p>
          <p>AIM&apos;25 Recap - The future of military medicine starts now</p>
        </div>
      </section>

      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
              className={`relative w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 ${isMobile ? "max-w-sm" : "max-w-6xl"
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 backdrop-blur-sm border border-white/20"
                aria-label="Close video modal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="size-5" />
              </motion.button>

              <div
                className="relative w-full bg-black rounded-3xl overflow-hidden"
                style={{ paddingBottom: isMobile ? "125%" : "56.25%" }}
              >
                {videoError ? (
                  <div className="absolute inset-0 flex items-center justify-center text-white p-6 text-center">
                    <div>
                      <div className="text-red-400 mb-4">
                        <Play className="size-12 mx-auto mb-3 opacity-50" />
                      </div>
                      <h3 className={`font-semibold mb-2 ${isMobile ? "text-lg" : "text-xl"}`}>Video Unavailable</h3>
                      <p className={`text-gray-300 mb-4 ${isMobile ? "text-sm" : "text-base"}`}>{videoError}</p>
                      <a
                        href={RECAP_VIDEO_URL}
                        className={`inline-flex items-center bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200 ${isMobile ? "px-3 py-2 text-sm" : "px-4 py-2 text-base"
                          }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Try Direct Link
                        <ArrowRight className="ml-2 size-4" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <video
                    className="absolute inset-0 w-full h-full rounded-3xl object-cover"
                    controls
                    autoPlay
                    preload="metadata"
                    onError={handleVideoError}
                    poster="https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/recap%20poster.png"
                  >
                    <source src={RECAP_VIDEO_URL} type="video/mp4" />
                    <p className="text-white p-4">
                      Your browser doesn&apos;t support HTML5 video.
                      <a href={RECAP_VIDEO_URL} className="text-blue-400 hover:text-blue-300 underline ml-1">
                        Download the video instead
                      </a>
                    </p>
                  </video>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
