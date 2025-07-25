"use client"

import React, { useEffect, useState } from "react"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useReducedMotion } from "../../hooks/useReducedMotion"
import { DesktopHeroVideo } from "../hero/DesktopHeroVideo"
import { MobileHeroVideo } from "../hero/MobileHeroVideo"

export const HeroVideo = React.memo(() => {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 1023px)")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Return a minimal placeholder while we wait for client-side hydration
    return <div className="min-h-[100vh] bg-white" aria-label="Loading hero section..." />
  }

  // Render the appropriate component based on device type
  return isMobile ? (
    <MobileHeroVideo prefersReducedMotion={prefersReducedMotion} />
  ) : (
    <DesktopHeroVideo prefersReducedMotion={prefersReducedMotion} />
  )
})

HeroVideo.displayName = "HeroVideo"
