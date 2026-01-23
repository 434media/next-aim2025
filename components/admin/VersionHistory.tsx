"use client"

import { Clock, History, RotateCcw, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useState } from "react"
import { useEditMode } from "../../contexts/EditModeContext"
import { updateTextCache } from "../../hooks/useSiteText"

interface TextVersion {
    id: string
    textId: string
    content: string
    createdAt: { _seconds: number; _nanoseconds: number } | Date
    createdBy: string
    versionNumber: number
}

interface VersionHistoryProps {
    textId: string
    currentContent: string
    isOpen: boolean
    onClose: () => void
    onRestore: (content: string) => void
}

export function VersionHistory({
    textId,
    currentContent,
    isOpen,
    onClose,
    onRestore,
}: VersionHistoryProps) {
    const [versions, setVersions] = useState<TextVersion[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedVersion, setSelectedVersion] = useState<TextVersion | null>(null)
    const { setPendingChange } = useEditMode()

    const fetchVersions = useCallback(async () => {
        if (!isOpen) return

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/admin/site-text/versions?textId=${encodeURIComponent(textId)}`)
            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to fetch versions")
            }

            setVersions(data.versions || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load version history")
        } finally {
            setIsLoading(false)
        }
    }, [textId, isOpen])

    useEffect(() => {
        fetchVersions()
    }, [fetchVersions])

    const formatDate = (timestamp: { _seconds: number; _nanoseconds: number } | Date) => {
        if (!timestamp) return "Unknown date"

        const date = "_seconds" in timestamp
            ? new Date(timestamp._seconds * 1000)
            : new Date(timestamp)

        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
    }

    const handleRestore = (version: TextVersion) => {
        // Update the pending change with the restored content
        setPendingChange(textId, version.content)
        updateTextCache(textId, version.content)
        onRestore(version.content)
        onClose()
    }

    const truncateContent = (content: string, maxLength: number = 100) => {
        if (content.length <= maxLength) return content
        return content.slice(0, maxLength) + "..."
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose()
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-2xl max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-sky-100 rounded-lg">
                                <History className="w-5 h-5 text-sky-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-neutral-900">Version History</h2>
                                <p className="text-sm text-neutral-500">{textId}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex h-[calc(80vh-80px)]">
                        {/* Version List */}
                        <div className="w-1/2 border-r border-neutral-200 overflow-y-auto">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                                    <p className="text-red-500 mb-2">{error}</p>
                                    <button
                                        onClick={fetchVersions}
                                        className="text-sky-600 hover:text-sky-700 font-medium"
                                    >
                                        Try again
                                    </button>
                                </div>
                            ) : versions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                                    <Clock className="w-12 h-12 text-neutral-300 mb-3" />
                                    <p className="text-neutral-500">No version history yet</p>
                                    <p className="text-sm text-neutral-400 mt-1">
                                        Changes will be saved here automatically
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-neutral-100">
                                    {/* Current Version */}
                                    <div
                                        className={`p-4 cursor-pointer transition-colors ${!selectedVersion
                                                ? "bg-sky-50 border-l-4 border-sky-500"
                                                : "hover:bg-neutral-50 border-l-4 border-transparent"
                                            }`}
                                        onClick={() => setSelectedVersion(null)}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-neutral-900">
                                                Current Version
                                            </span>
                                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                                Active
                                            </span>
                                        </div>
                                        <p className="text-xs text-neutral-500 mb-2">Now</p>
                                        <p className="text-sm text-neutral-600 line-clamp-2">
                                            {truncateContent(currentContent)}
                                        </p>
                                    </div>

                                    {/* Previous Versions */}
                                    {versions.map((version) => (
                                        <div
                                            key={version.id}
                                            className={`p-4 cursor-pointer transition-colors ${selectedVersion?.id === version.id
                                                    ? "bg-sky-50 border-l-4 border-sky-500"
                                                    : "hover:bg-neutral-50 border-l-4 border-transparent"
                                                }`}
                                            onClick={() => setSelectedVersion(version)}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-neutral-900">
                                                    Version {version.versionNumber}
                                                </span>
                                            </div>
                                            <p className="text-xs text-neutral-500 mb-2">
                                                {formatDate(version.createdAt)}
                                                {version.createdBy && (
                                                    <span className="ml-2">by {version.createdBy}</span>
                                                )}
                                            </p>
                                            <p className="text-sm text-neutral-600 line-clamp-2">
                                                {truncateContent(version.content)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Preview Panel */}
                        <div className="w-1/2 flex flex-col">
                            <div className="p-4 border-b border-neutral-200 bg-neutral-50">
                                <h3 className="text-sm font-medium text-neutral-700">
                                    {selectedVersion
                                        ? `Version ${selectedVersion.versionNumber} Preview`
                                        : "Current Content"}
                                </h3>
                            </div>
                            <div className="flex-1 p-4 overflow-y-auto">
                                <div className="prose prose-sm max-w-none text-neutral-700">
                                    {selectedVersion ? selectedVersion.content : currentContent}
                                </div>
                            </div>
                            {selectedVersion && (
                                <div className="p-4 border-t border-neutral-200 bg-neutral-50">
                                    <button
                                        onClick={() => handleRestore(selectedVersion)}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        Restore This Version
                                    </button>
                                    <p className="text-xs text-neutral-500 text-center mt-2">
                                        This will set the content as a pending change
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

// Hook to manage version history modal state
export function useVersionHistory() {
    const [state, setState] = useState<{
        isOpen: boolean
        textId: string
        currentContent: string
    }>({
        isOpen: false,
        textId: "",
        currentContent: "",
    })

    const openHistory = useCallback((textId: string, currentContent: string) => {
        setState({ isOpen: true, textId, currentContent })
    }, [])

    const closeHistory = useCallback(() => {
        setState((prev) => ({ ...prev, isOpen: false }))
    }, [])

    return {
        ...state,
        openHistory,
        closeHistory,
    }
}
