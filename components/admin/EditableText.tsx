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

    // Edit mode is on - show editable interface
    return (
        <span ref={containerRef} className="relative inline group">
            <AnimatePresence mode="wait">
                {isEditing ? (
                    <motion.span
                        key="editing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="relative inline-block"
                    >
                        {multiline ? (
                            <textarea
                                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                                value={localValue}
                                onChange={(e) => setLocalValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholder}
                                className={`${className} w-full min-h-[100px] p-2 rounded-md border-2 border-blue-500 bg-white/95 text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y`}
                                rows={3}
                            />
                        ) : (
                            <input
                                ref={inputRef as React.RefObject<HTMLInputElement>}
                                type="text"
                                value={localValue}
                                onChange={(e) => setLocalValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholder}
                                className={`${className} w-full p-2 rounded-md border-2 border-blue-500 bg-white/95 text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            />
                        )}

                        {/* Edit controls */}
                        <span className="absolute -bottom-10 left-0 flex gap-1 z-50">
                            <button
                                onClick={handleSave}
                                className="p-1.5 rounded bg-green-500 text-white hover:bg-green-600 shadow-md transition-colors"
                                title="Save (Enter)"
                            >
                                <Check className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleCancel}
                                className="p-1.5 rounded bg-gray-500 text-white hover:bg-gray-600 shadow-md transition-colors"
                                title="Cancel (Esc)"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            {hasChanges && (
                                <button
                                    onClick={handleReset}
                                    className="p-1.5 rounded bg-orange-500 text-white hover:bg-orange-600 shadow-md transition-colors"
                                    title="Reset to original"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                            )}
                        </span>
                    </motion.span>
                ) : (
                    <motion.span
                        key="display"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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
            </AnimatePresence>
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
