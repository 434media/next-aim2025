"use client"

import { Check, Keyboard, LayoutDashboard, Loader2, LogOut, Pencil, PencilOff, Redo2, Undo2, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useEditMode } from "../../contexts/EditModeContext"
import { clearTextCache } from "../../hooks/useSiteText"

export function EditModeToolbar() {
    const { user, signOut } = useAuth()
    const {
        isEditMode,
        isAdmin,
        toggleEditMode,
        hasPendingChanges,
        pendingChanges,
        saveAllChanges,
        clearAllPendingChanges,
        isSaving,
        undo,
        redo,
        canUndo,
        canRedo,
    } = useEditMode()

    const [showSuccess, setShowSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Don't render if not admin
    if (!isAdmin || !user) return null

    const handleSaveAll = async () => {
        try {
            setError(null)
            await saveAllChanges()
            clearTextCache()
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 2000)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save")
            setTimeout(() => setError(null), 3000)
        }
    }

    const handleDiscardAll = () => {
        if (window.confirm(`Discard ${pendingChanges.size} pending change(s)?`)) {
            clearAllPendingChanges()
            clearTextCache()
            window.location.reload()
        }
    }

    const handleSignOut = async () => {
        setIsDropdownOpen(false)
        await signOut()
    }

    // Get user initials for avatar
    const getInitials = (name: string | null | undefined) => {
        if (!name) return "A"
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    }

    return (
        <>
            {/* Floating Admin Button */}
            <div className="fixed bottom-4 right-4 z-[9999]" ref={dropdownRef}>
                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden"
                        >
                            {/* User Info Header */}
                            <div className="px-5 py-4 border-b border-neutral-100">
                                <p className="font-semibold text-neutral-900 text-lg">{user.displayName || "Admin User"}</p>
                                <p className="text-sm text-neutral-500">{user.email}</p>
                            </div>

                            {/* Main Actions */}
                            <div className="p-2">
                                <button
                                    onClick={() => {
                                        toggleEditMode()
                                        setIsDropdownOpen(false)
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-neutral-100 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Pencil className="w-5 h-5 text-neutral-600" />
                                        <span className="text-neutral-800 font-medium">
                                            {isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
                                        </span>
                                    </div>
                                    <kbd className="px-2 py-1 bg-neutral-100 text-neutral-500 text-xs rounded font-mono">⌘E</kbd>
                                </button>

                                <Link
                                    href="/admin"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 transition-colors"
                                >
                                    <LayoutDashboard className="w-5 h-5 text-neutral-600" />
                                    <span className="text-neutral-800 font-medium">Admin Dashboard</span>
                                </Link>
                            </div>

                            {/* Shortcuts Section */}
                            <div className="p-2 border-t border-neutral-100">
                                <div className="px-4 py-2 flex items-center gap-2 text-neutral-500">
                                    <Keyboard className="w-4 h-4" />
                                    <span className="text-sm font-medium">Shortcuts</span>
                                </div>
                                <div className="px-4 py-1.5 flex items-center justify-between text-sm">
                                    <span className="text-neutral-600">Toggle Edit Mode</span>
                                    <kbd className="px-2 py-0.5 bg-neutral-100 text-neutral-500 text-xs rounded font-mono">⌘E</kbd>
                                </div>
                                <div className="px-4 py-1.5 flex items-center justify-between text-sm">
                                    <span className="text-neutral-600">Undo</span>
                                    <kbd className="px-2 py-0.5 bg-neutral-100 text-neutral-500 text-xs rounded font-mono">⌘Z</kbd>
                                </div>
                                <div className="px-4 py-1.5 flex items-center justify-between text-sm">
                                    <span className="text-neutral-600">Redo</span>
                                    <kbd className="px-2 py-0.5 bg-neutral-100 text-neutral-500 text-xs rounded font-mono">⌘⇧Z</kbd>
                                </div>
                                <div className="px-4 py-1.5 flex items-center justify-between text-sm">
                                    <span className="text-neutral-600">Save Changes</span>
                                    <kbd className="px-2 py-0.5 bg-neutral-100 text-neutral-500 text-xs rounded font-mono">⌘↵</kbd>
                                </div>
                                <div className="px-4 py-1.5 flex items-center justify-between text-sm">
                                    <span className="text-neutral-600">Cancel Edit</span>
                                    <kbd className="px-2 py-0.5 bg-neutral-100 text-neutral-500 text-xs rounded font-mono">Esc</kbd>
                                </div>
                            </div>

                            {/* Sign Out */}
                            <div className="p-2 border-t border-neutral-100">
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-red-600"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-medium">Sign Out</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Admin Button */}
                <motion.button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-full shadow-lg transition-all duration-200 ${isEditMode
                        ? "bg-sky-600 text-white"
                        : "bg-neutral-900 text-white hover:bg-neutral-800"
                        }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-sm font-bold text-white">
                        {getInitials(user.displayName)}
                    </div>
                    <span className="font-medium">Admin</span>
                </motion.button>
            </div>

            {/* Pending Changes Bar */}
            <AnimatePresence>
                {hasPendingChanges && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9998]"
                    >
                        <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-900/95 backdrop-blur-md rounded-full shadow-2xl border border-gray-700">
                            {/* Undo/Redo Buttons */}
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={undo}
                                    disabled={!canUndo || isSaving}
                                    className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Undo (⌘Z)"
                                >
                                    <Undo2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={redo}
                                    disabled={!canRedo || isSaving}
                                    className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Redo (⌘⇧Z)"
                                >
                                    <Redo2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="w-px h-5 bg-gray-700" />

                            {/* Changes count */}
                            <span className="text-sm text-orange-400 font-medium">
                                {pendingChanges.size} unsaved change{pendingChanges.size !== 1 ? "s" : ""}
                            </span>

                            {/* Discard Button */}
                            <button
                                onClick={handleDiscardAll}
                                disabled={isSaving}
                                className="p-1.5 rounded-full bg-gray-700 text-gray-300 hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
                                title="Discard all changes"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Save Button */}
                            <button
                                onClick={handleSaveAll}
                                disabled={isSaving}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600 text-white hover:bg-green-500 transition-colors disabled:opacity-50 text-sm font-medium"
                                title="Save all changes"
                            >
                                {isSaving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Check className="w-4 h-4" />
                                )}
                                <span>Save All</span>
                            </button>

                            {/* Success Message */}
                            <AnimatePresence>
                                {showSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex items-center gap-1.5 text-sm text-green-400"
                                    >
                                        <Check className="w-4 h-4" />
                                        <span>Saved!</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex items-center gap-1.5 text-sm text-red-400"
                                    >
                                        <X className="w-4 h-4" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Mode Active Indicator */}
            <AnimatePresence>
                {isEditMode && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-[9997]"
                    >
                        <div className="px-4 py-2 bg-sky-500 text-white text-sm rounded-full font-medium shadow-lg flex items-center gap-2">
                            <Pencil className="w-4 h-4" />
                            <span>Edit Mode Active</span>
                            <span className="text-sky-200">— Click any highlighted text to edit</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

// Compact version for mobile or minimal UI
export function EditModeToggle() {
    const { isEditMode, isAdmin, toggleEditMode } = useEditMode()

    if (!isAdmin) return null

    return (
        <button
            onClick={toggleEditMode}
            className={`fixed bottom-4 right-4 z-[9999] p-3 rounded-full shadow-lg transition-all duration-200 ${isEditMode
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            title={isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        >
            {isEditMode ? <Pencil className="w-5 h-5" /> : <PencilOff className="w-5 h-5" />}
        </button>
    )
}
