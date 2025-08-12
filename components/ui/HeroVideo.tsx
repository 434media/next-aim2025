"use client"

import React, { useRef } from "react"

export const HeroVideo = React.memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null)

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
        preload="auto"
        poster="https://ampd-asset.s3.us-east-2.amazonaws.com/recap+poster.png"
        aria-label="AIM Summit promotional video"
      >
        <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Cut+Down+Website.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-black/20" />
    </section>
  )
})

HeroVideo.displayName = "HeroVideo"
