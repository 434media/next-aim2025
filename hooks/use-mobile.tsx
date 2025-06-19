"use client"

import { useState, useEffect } from "react"

/**
 * A hook that returns true if the screen width is less than the provided breakpoint
 * @param breakpoint The breakpoint to check against (default: 768px)
 * @returns A boolean indicating if the screen is smaller than the breakpoint
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Set initial value
    setMatches(media.matches)

    // Update matches when media query changes
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Add listener
    media.addEventListener("change", listener)

    // Clean up
    return () => {
      media.removeEventListener("change", listener)
    }
  }, [query])

  return matches
}

