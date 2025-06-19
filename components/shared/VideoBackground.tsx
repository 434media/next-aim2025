"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"

interface VideoBackgroundProps {
  prefersReducedMotion: boolean
  className?: string
  style?: React.CSSProperties
  overlay?: "gradient" | "dark" | "light" | "none"
  overlayOpacity?: number
}

export const VideoBackground = React.memo(
  ({
    prefersReducedMotion,
    className = "",
    style = {},
    overlay = "gradient",
    overlayOpacity = 0.6,
  }: VideoBackgroundProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)
    const [isVideoError, setIsVideoError] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)

    const handleVideoLoad = useCallback(() => {
      setIsVideoLoaded(true)
      setLoadingProgress(100)
      if (videoRef.current && !prefersReducedMotion) {
        videoRef.current.play().catch(() => {
          // Silent catch for autoplay restrictions
        })
      }
    }, [prefersReducedMotion])

    const handleVideoError = useCallback(() => {
      setIsVideoError(true)
      console.error("Video failed to load")
    }, [])

    const handleVideoProgress = useCallback(() => {
      if (videoRef.current) {
        const { buffered, duration } = videoRef.current
        if (buffered.length > 0 && duration > 0) {
          const progress = (buffered.end(0) / duration) * 100
          setLoadingProgress(progress)
        }
      }
    }, [])

    const retryVideoLoad = useCallback(() => {
      if (videoRef.current) {
        setIsVideoError(false)
        setIsVideoLoaded(false)
        setLoadingProgress(0)
        videoRef.current.load()
      }
    }, [])

    useEffect(() => {
      if (videoRef.current) {
        const video = videoRef.current

        video.addEventListener("loadeddata", handleVideoLoad)
        video.addEventListener("progress", handleVideoProgress)
        video.addEventListener("error", handleVideoError)

        video.load()

        return () => {
          video.removeEventListener("loadeddata", handleVideoLoad)
          video.removeEventListener("progress", handleVideoProgress)
          video.removeEventListener("error", handleVideoError)
        }
      }
    }, [handleVideoLoad, handleVideoProgress, handleVideoError])

    const getOverlayClasses = () => {
      switch (overlay) {
        case "dark":
          return `bg-black/${Math.round(overlayOpacity * 100)}`
        case "light":
          return `bg-white/${Math.round(overlayOpacity * 100)}`
        case "gradient":
          return `bg-gradient-to-b from-[#101310]/80 via-[#101310]/40 to-[#101310]/80`
        default:
          return ""
      }
    }

    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`} style={style}>
        <AnimatePresence>
          {!isVideoLoaded && !isVideoError && <VideoLoadingState progress={loadingProgress} />}
        </AnimatePresence>

        {isVideoError && <VideoErrorState onRetry={retryVideoLoad} />}

        <video
          ref={videoRef}
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          controls={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            willChange: "auto",
            opacity: isVideoLoaded ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
          poster="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-poster.png"
          preload="auto"
        >
          <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+2024+Cut+Down.mp4" type="video/mp4" />
          <track kind="captions" src="/captions.vtt" label="English captions" />
        </video>

        {/* Dynamic Overlay */}
        {overlay !== "none" && (
          <motion.div
            className={`absolute inset-0 ${getOverlayClasses()} pointer-events-none`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 1 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 1.2 }}
          />
        )}

        {/* Subtle animated particles overlay */}
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(84, 140, 172, 0.4) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    )
  },
)

VideoBackground.displayName = "VideoBackground"

const VideoLoadingState = React.memo(({ progress }: { progress: number }) => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 flex flex-col items-center justify-center bg-[#101310] backdrop-blur-sm"
  >
    <div className="text-center space-y-6">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className="size-16 border-4 border-[#548cac]/30 border-t-[#548cac] rounded-full" />
        <motion.div
          className="absolute inset-0 size-16 border-4 border-transparent border-r-[#4f4f2c] rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </motion.div>

      {progress > 0 && progress < 100 && (
        <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#548cac] to-[#4f4f2c] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      )}

      <motion.p
        className="text-white text-lg font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        Loading experience...
      </motion.p>
    </div>
  </motion.div>
))

VideoLoadingState.displayName = "VideoLoadingState"

const VideoErrorState = React.memo(({ onRetry }: { onRetry: () => void }) => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center bg-[#101310]/90 backdrop-blur-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-center p-8 max-w-md space-y-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-white text-xl mb-6 font-medium">Experience temporarily unavailable</p>
        <Image
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-poster.png"
          alt="AIM Summit"
          width={400}
          height={225}
          className="rounded-xl mx-auto shadow-2xl"
          priority
        />
      </motion.div>

      <motion.button
        onClick={onRetry}
        className="px-6 py-3 bg-gradient-to-r from-[#548cac] to-[#4f4f2c] text-white rounded-full hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Retry Loading
      </motion.button>
    </div>
  </motion.div>
))

VideoErrorState.displayName = "VideoErrorState"
