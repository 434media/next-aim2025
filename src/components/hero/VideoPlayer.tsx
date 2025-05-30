"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import Image from "next/image"

interface VideoPlayerProps {
  prefersReducedMotion: boolean
  className?: string
  style?: React.CSSProperties
}

export const VideoPlayer = React.memo(({ prefersReducedMotion, className = "", style = {} }: VideoPlayerProps) => {
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

      // Add event listeners
      video.addEventListener("loadeddata", handleVideoLoad)
      video.addEventListener("progress", handleVideoProgress)
      video.addEventListener("error", handleVideoError)

      // Start loading
      video.load()

      return () => {
        video.removeEventListener("loadeddata", handleVideoLoad)
        video.removeEventListener("progress", handleVideoProgress)
        video.removeEventListener("error", handleVideoError)
      }
    }
  }, [handleVideoLoad, handleVideoProgress, handleVideoError])

  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
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
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{
          willChange: "auto",
          opacity: isVideoLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
        poster="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-poster.png"
        preload="auto"
      >
        <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+2024+Cut+Down.mp4" type="video/mp4" />
        <track kind="captions" src="/captions.vtt" label="English captions" />
      </video>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#548cac]/10 to-[#4f4f2c]/10 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0.1 : 1 }}
      />
    </div>
  )
})

VideoPlayer.displayName = "VideoPlayer"

const VideoLoadingState = React.memo(({ progress }: { progress: number }) => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 flex flex-col items-center justify-center bg-aim-navy/20 backdrop-blur-sm z-30"
  >
    <div className="text-center space-y-4">
      <div
        className="loading-spinner size-12 border-4 border-bexar-blue/30 border-t-bexar-blue rounded-full animate-spin"
        role="status"
      >
        <VisuallyHidden>Loading video</VisuallyHidden>
      </div>
      {progress > 0 && progress < 100 && (
        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-bexar-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
      <p className="text-white text-sm">Loading video...</p>
    </div>
  </motion.div>
))

VideoLoadingState.displayName = "VideoLoadingState"

const VideoErrorState = React.memo(({ onRetry }: { onRetry: () => void }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-aim-navy/80 z-30">
    <div className="text-center p-6 max-w-md space-y-4">
      <p className="text-white text-lg mb-4">Video could not be loaded</p>
      <Image
        src="https://ampd-asset.s3.us-east-2.amazonaws.com/aim-poster.png"
        alt="AIM Summit"
        width={400}
        height={225}
        className="rounded-md mx-auto"
        priority
      />
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-bexar-blue text-white rounded-md hover:bg-bexar-blue/80 transition-colors focus:outline-none focus:ring-2 focus:ring-bexar-blue focus:ring-offset-2"
      >
        Retry Loading
      </button>
    </div>
  </div>
))

VideoErrorState.displayName = "VideoErrorState"
