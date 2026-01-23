"use client"

import { Check, Pencil, RotateCcw, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type KeyboardEvent,
    type ReactNode,
} from "react"
import { createPortal } from "react-dom"
import { useEditMode } from "../../contexts/EditModeContext"
import { updateTextCache, useSiteText } from "../../hooks/useSiteText"

interface EditableTextProps {
    /** Unique identifier for this text block - used as Firestore document ID */
    textId: string
    /** Default/fallback text if no saved version exists */
    children: ReactNode
    /** HTML element to render. Defaults to "span" */
    as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"
    /** Page identifier for organizing text blocks */
    page?: string
    /** Section identifier for organizing text blocks (stored with content) */
    section?: string
    /** Additional className for styling */
    className?: string
    /** Whether this is a multiline text block */
    multiline?: boolean
    /** Placeholder text when empty */
    placeholder?: string
}

export function EditableText({
    textId,
    children,
    as: Component = "span",
    page,
    section: _section, // Stored via API but not used in component
    className = "",
    multiline = false,
    placeholder = "Click to edit...",
}: EditableTextProps) {
    const { isEditMode, isAdmin, setPendingChange, clearPendingChange, pendingChanges } = useEditMode()
    const { getText } = useSiteText({ page })

    // Extract text content from children
    const defaultText = typeof children === "string" ? children : ""
    const savedText = getText(textId, defaultText)
    const pendingText = pendingChanges.get(textId)

    const [isEditing, setIsEditing] = useState(false)
    const [localValue, setLocalValue] = useState(pendingText ?? savedText)
    const [originalValue, setOriginalValue] = useState(savedText)
    const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null)
    const containerRef = useRef<HTMLSpanElement>(null)

    // Sync with saved text when it changes
    useEffect(() => {
        if (!isEditing && !pendingChanges.has(textId)) {
            setLocalValue(savedText)
            setOriginalValue(savedText)
        }
    }, [savedText, isEditing, pendingChanges, textId])

    // Focus input when entering edit mode
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [isEditing])

    const handleStartEdit = useCallback(() => {
        if (!isEditMode || !isAdmin) return
        setIsEditing(true)
        setLocalValue(pendingChanges.get(textId) ?? savedText)
        setOriginalValue(savedText)
    }, [isEditMode, isAdmin, pendingChanges, textId, savedText])

    const handleSave = useCallback(() => {
        setIsEditing(false)
        if (localValue !== originalValue) {
            setPendingChange(textId, localValue)
            updateTextCache(textId, localValue)
        }
    }, [localValue, originalValue, setPendingChange, textId])

    const handleCancel = useCallback(() => {
        setIsEditing(false)
        setLocalValue(pendingChanges.get(textId) ?? savedText)
    }, [pendingChanges, textId, savedText])

    const handleReset = useCallback(() => {
        setLocalValue(originalValue)
        clearPendingChange(textId)
        updateTextCache(textId, originalValue)
        setIsEditing(false)
    }, [originalValue, clearPendingChange, textId])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            handleCancel()
        } else if (e.key === "Enter" && !multiline) {
            e.preventDefault()
            handleSave()
        } else if (e.key === "Enter" && e.metaKey) {
            e.preventDefault()
            handleSave()
        }
    }, [handleCancel, handleSave, multiline])

    // Calculate dynamic rows based on content length for better UX
    const calculateRows = useCallback((text: string) => {
        const lineCount = (text.match(/\n/g) || []).length + 1
        const estimatedRows = Math.max(lineCount, Math.ceil(text.length / 60))
        return Math.min(Math.max(estimatedRows, 4), 15) // Min 4 rows, max 15 rows
    }, [])

    // Click outside to save
    useEffect(() => {
        if (!isEditing) return

        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                handleSave()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isEditing, handleSave])

    const hasChanges = pendingChanges.has(textId)
    const displayValue = pendingText ?? localValue ?? savedText ?? defaultText

    // Not in admin mode - render normally
    if (!isAdmin) {
        return <Component className={className}>{displayValue || children}</Component>
    }

    // Admin mode but edit mode is off - show subtle indicator
    if (!isEditMode) {
        return <Component className={className}>{displayValue || children}</Component>
    }

    // Modal content rendered via portal to avoid DOM nesting issues (div inside p)
    const modalContent = isEditing && typeof document !== 'undefined' ? createPortal(
        <AnimatePresence>
            <motion.div
                key="editing-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[100] flex items-center justify-center"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        handleSave()
                    }
                }}
            >
                {/* Backdrop - separate from modal to prevent blur affecting content */}
                <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

                {/* Modal container - isolated layer for crisp rendering */}
                <div
                    className="relative w-full max-w-2xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden"
                    style={{
                        willChange: 'transform',
                        isolation: 'isolate',
                        backfaceVisibility: 'hidden'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <span className="flex items-center gap-2 text-sm font-medium">
                            <Pencil className="w-4 h-4" />
                            Editing Text
                        </span>
                        <span className="text-xs opacity-75">
                            {multiline ? "Cmd+Enter to save" : "Enter to save"} • Esc to cancel
                        </span>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {multiline ? (
                            <textarea
                                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                                value={localValue}
                                onChange={(e) => setLocalValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholder}
                                className="w-full min-h-[200px] p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-900 text-base leading-relaxed focus:outline-none focus:border-blue-400 resize-y"
                                rows={calculateRows(localValue)}
                                style={{ maxHeight: '60vh' }}
                            />
                        ) : (
                            <input
                                ref={inputRef as React.RefObject<HTMLInputElement>}
                                type="text"
                                value={localValue}
                                onChange={(e) => setLocalValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholder}
                                className="w-full p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-900 text-lg focus:outline-none focus:border-blue-400"
                            />
                        )}
                    </div>

                    {/* Footer with actions */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
                        <div className="text-xs text-gray-500">
                            {localValue.length} characters
                            {hasChanges && (
                                <span className="ml-2 text-orange-500">• Unsaved changes</span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {hasChanges && (
                                <button
                                    onClick={handleReset}
                                    className="px-3 py-1.5 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 text-sm font-medium transition-colors flex items-center gap-1.5"
                                    title="Reset to original"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    Reset
                                </button>
                            )}
                            <button
                                onClick={handleCancel}
                                className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium transition-colors flex items-center gap-1.5"
                                title="Cancel (Esc)"
                            >
                                <X className="w-3.5 h-3.5" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm font-medium transition-colors flex items-center gap-1.5"
                                title={multiline ? "Save (Cmd+Enter)" : "Save (Enter)"}
                            >
                                <Check className="w-3.5 h-3.5" />
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    ) : null

    // Edit mode is on - show editable interface
    return (
        <span ref={containerRef} className="relative inline group">
            {/* Portal renders modal at document.body level */}
            {modalContent}

            {/* Clickable text display */}
            {!isEditing && (
                <motion.span
                    key="display"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    onClick={handleStartEdit}
                    className={`relative cursor-pointer rounded transition-all duration-200 ${hasChanges
                        ? "ring-2 ring-orange-400 ring-offset-1"
                        : "hover:ring-2 hover:ring-blue-400 hover:ring-offset-1"
                        }`}
                >
                    <Component className={className}>
                        {displayValue || children}
                    </Component>

                    {/* Edit indicator */}
                    <span className={`absolute -top-2 -right-2 p-1 rounded-full shadow-md transition-all duration-200 ${hasChanges
                        ? "bg-orange-500 opacity-100"
                        : "bg-blue-500 opacity-0 group-hover:opacity-100"
                        }`}>
                        <Pencil className="w-3 h-3 text-white" />
                    </span>
                </motion.span>
            )}

            {/* Show text even when editing so the layout doesn't shift */}
            {isEditing && (
                <span className="opacity-50">
                    <Component className={className}>
                        {displayValue || children}
                    </Component>
                </span>
            )}
        </span>
    )
}

// Convenience wrapper for headings
export function EditableHeading({
    level = 1,
    ...props
}: Omit<EditableTextProps, "as"> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) {
    const Tag = `h${level}` as const
    return <EditableText {...props} as={Tag} />
}

// Convenience wrapper for paragraphs
export function EditableParagraph(props: Omit<EditableTextProps, "as">) {
    return <EditableText {...props} as="p" multiline />
}
