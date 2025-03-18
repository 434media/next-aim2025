"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useReducedMotion, AnimatePresence } from "motion/react"
import Link from "next/link"

interface LinkPreviewProps {
  children: React.ReactNode
  href: string
  description: string
  className?: string
}

/**
 * A component that shows a tooltip preview when hovering over a link
 */
export const LinkPreview: React.FC<LinkPreviewProps> = React.memo(({ children, href, description, className = "" }) => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Check if we're on a touch device
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPreviewVisible) {
        setIsPreviewVisible(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isPreviewVisible])

  // Handle click outside to close preview
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        previewRef.current &&
        linkRef.current &&
        !previewRef.current.contains(e.target as Node) &&
        !linkRef.current.contains(e.target as Node) &&
        isPreviewVisible
      ) {
        setIsPreviewVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isPreviewVisible])

  return (
    <span className="relative inline-block">
      <Link
        ref={linkRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} font-semibold text-[#366A79] hover:text-[#548cac] focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:ring-offset-2 rounded-sm transition-colors duration-200`}
        onMouseEnter={() => !isTouchDevice && setIsPreviewVisible(true)}
        onMouseLeave={() => !isTouchDevice && setIsPreviewVisible(false)}
        onClick={(e) => {
          if (isTouchDevice) {
            e.preventDefault()
            setIsPreviewVisible((prev) => !prev)
          }
        }}
        onFocus={() => setIsPreviewVisible(true)}
        onBlur={() => setIsPreviewVisible(false)}
        aria-describedby={isPreviewVisible ? `preview-${href.replace(/[^a-zA-Z0-9]/g, "-")}` : undefined}
      >
        {children}
      </Link>

      <AnimatePresence>
        {isPreviewVisible && (
          <motion.div
            ref={previewRef}
            id={`preview-${href.replace(/[^a-zA-Z0-9]/g, "-")}`}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
            className="absolute z-50 left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 text-sm text-gray-900 border border-gray-200"
            role="tooltip"
          >
            {description}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-200"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
})

LinkPreview.displayName = "LinkPreview"

