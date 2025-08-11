"use client"

import React, { useState, useRef } from "react"
import { Volume2, VolumeX } from 'lucide-react'

export const HeroVideo = React.memo(() => {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleAudio = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  // Responsive video: full screen on desktop (16:9), 4:5 aspect ratio on mobile
  return (
    <section 
      className="relative w-full h-screen lg:h-screen aspect-[4/5] lg:aspect-auto overflow-hidden bg-black" 
      aria-label="Hero video section with responsive aspect ratios"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-label="AIM Summit promotional video"
      >
        <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM-V6.mp4" type="video/mp4" />
        <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM-V6.mp4" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      {/* Optional overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Audio Toggle Button */}
      <button
        onClick={toggleAudio}
        className="absolute bottom-6 right-6 z-10 bg-black/60 backdrop-blur-sm hover:bg-amber-600/80 transition-all duration-300 rounded-full p-3 group focus:outline-none focus:ring-2 focus:ring-amber-500 border border-white/20 hover:border-amber-500/50"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        type="button"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white group-hover:text-white group-hover:scale-110 transition-all duration-300" />
        ) : (
          <Volume2 className="w-6 h-6 text-amber-500 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
        )}
      </button>
    </section>
  )
})

HeroVideo.displayName = "HeroVideo"
