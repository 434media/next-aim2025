"use client"

import { Lock, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useState } from "react"

interface WhovaLockedOverlayProps {
    children: React.ReactNode
}

export function WhovaLockedOverlay({ children }: WhovaLockedOverlayProps) {
    const [showToast, setShowToast] = useState(false)

    const handleClick = useCallback((e: React.MouseEvent) => {
        // Allow the page content to be visible but block interactions
        const target = e.target as HTMLElement
        const isInteractive =
            target.closest("button") ||
            target.closest("a") ||
            target.closest("input") ||
            target.closest("select") ||
            target.closest("textarea") ||
            target.tagName === "BUTTON" ||
            target.tagName === "A" ||
            target.tagName === "INPUT" ||
            target.tagName === "SELECT" ||
            target.tagName === "TEXTAREA"

        if (isInteractive) {
            e.preventDefault()
            e.stopPropagation()
            setShowToast(true)
            setTimeout(() => setShowToast(false), 3000)
        }
    }, [])

    return (
        <div className="relative">
            {/* Grayscale content layer */}
            <div
                className="grayscale opacity-60 pointer-events-none select-none"
                aria-hidden="true"
            >
                {children}
            </div>

            {/* Invisible click-capture layer */}
            <div
                className="absolute inset-0 z-10 cursor-not-allowed"
                onClick={handleClick}
            />

            {/* Persistent banner */}
            <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
                <div className="mx-auto max-w-2xl mt-4 px-4">
                    <div className="flex items-center gap-3 rounded-xl bg-gray-900/90 backdrop-blur-sm px-5 py-3.5 shadow-lg">
                        <Lock className="h-4 w-4 text-amber-400 shrink-0" />
                        <p className="text-sm font-medium text-gray-200">
                            This section is managed via{" "}
                            <span className="font-semibold text-white">Whova</span>. Customization options are turned off.
                        </p>
                    </div>
                </div>
            </div>

            {/* Click toast */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
                    >
                        <div className="flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-3.5 shadow-2xl ring-1 ring-white/10">
                            <Lock className="h-4 w-4 text-amber-400 shrink-0" />
                            <p className="text-sm font-medium text-white whitespace-nowrap">
                                Client is using Whova to manage this section — customization is turned off.
                            </p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowToast(false)
                                }}
                                className="p-1 text-gray-400 hover:text-white transition-colors pointer-events-auto"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
