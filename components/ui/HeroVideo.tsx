"use client"

import React from "react"

export const HeroVideo = React.memo(() => {
  // Full screen video only
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black" aria-label="Hero video section">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="AIM Summit promotional video"
      >
        <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Long+Form+V4.mp4" type="video/mp4" />
        <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Long+Form+V4.mp4" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      {/* Optional overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-black/20" />
    </section>
  )
})

HeroVideo.displayName = "HeroVideo"
