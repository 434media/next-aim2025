"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

export default function WhovaSpeakersEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-[600px] w-full bg-white md:mt-16">
      <div title="Whova event and conference app" id="whova-speakerwidget">
        <p id="whova-loading">Loading speakers...</p>
      </div>

      <Script
        src="https://whova.com/static/frontend/xems/js/whova-speaker-widget.js?eid=FIkfYyhB%40Bc-qmvt9iZNmxXZDlz6RPuiSVJPLRTwsIA%3D&host=https://whova.com"
        id="embeded-speaker-script"
        strategy="afterInteractive"
        onError={() => {
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <div class="flex h-96 items-center justify-center flex-col">
                <p class="text-lg text-red-500 mb-4">Failed to load speakers.</p>
                <p class="text-gray-600">Please try refreshing the page or check back later.</p>
              </div>
            `
          }
        }}
      />

      <div id="whova-wrap" className="whova-wrap-class mt-4 text-center text-sm text-gray-500">
        Powered By
        <a
          className="brandlink ml-1 font-semibold text-[#548cac]"
          target="_blank"
          href="https://whova.com"
          rel="noopener noreferrer"
        >
          Whova
        </a>
        <br />
        <a
          className="whova-emslink brandanchorlink text-xs text-gray-400 hover:text-[#548cac]"
          target="_blank"
          href="https://whova.com/abstract-management/"
          rel="noopener noreferrer"
        >
          Abstract management
        </a>
      </div>
    </div>
  )
}

