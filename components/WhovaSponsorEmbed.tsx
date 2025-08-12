"use client"

import Script from "next/script"
import { useEffect, useRef } from "react"

export default function WhovaSponsorEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = containerRef.current
    // Cleanup function to remove all children when component unmounts
    return () => {
      if (currentRef) {
        while (currentRef.firstChild) {
          currentRef.removeChild(currentRef.firstChild)
        }
      }
    }
  }, [])

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mb-8" ref={containerRef}>
      <div>
        <div title="Whova event and conference app" id="whova-sponsorwidget">
          <p id="whova-loading">Loading sponsors...</p>
        </div>

        <Script
          src="https://whova.com/static/frontend/xems/js/whova-sponsor-widget.js?eid=V31Cn5oQiUuAxjgfiWoq7VF-izZD4CMMx6QQbB%40NTQo%3D&host=https://whova.com"
          id="embeded-sponsor-script"
          strategy="afterInteractive"
          onError={() => {
            if (containerRef.current) {
              const errorDiv = document.createElement("div")
              errorDiv.className = "text-red-500 text-center py-4"
              errorDiv.innerHTML = "Failed to load sponsors. Please refresh the page or try again later."
              containerRef.current.appendChild(errorDiv)
            }
          }}
        />

        <div id="whova-wrap" className="whova-wrap-class mt-4 text-center text-sm text-gray-500">
          Powered By
          <a
            className="brandlink font-medium text-military-green ml-1"
            target="_blank"
            rel="noopener noreferrer"
            href="https://whova.com"
          >
            <b>Whova</b>
          </a>
          <br />
          <a
            className="whova-emslink brandanchorlink text-military-green hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://whova.com/trade-show-app-lead-retrieval/"
          >
            Virtual exhibitor booth
          </a>
        </div>
      </div>
    </div>
  )
}

