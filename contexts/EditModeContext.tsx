"use client"

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { useAuth } from "./AuthContext"

interface HistoryEntry {
    textId: string
    previousValue: string
    newValue: string
    timestamp: number
}

interface EditModeContextType {
    isEditMode: boolean
    isAdmin: boolean
    toggleEditMode: () => void
    setEditMode: (enabled: boolean) => void
    pendingChanges: Map<string, string>
    setPendingChange: (textId: string, value: string) => void
    clearPendingChange: (textId: string) => void
    clearAllPendingChanges: () => void
    hasPendingChanges: boolean
    saveAllChanges: () => Promise<void>
    isSaving: boolean
    // Undo/Redo functionality
    undo: () => void
    redo: () => void
    canUndo: boolean
    canRedo: boolean
    undoHistory: HistoryEntry[]
    redoHistory: HistoryEntry[]
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined)

// Maximum number of undo/redo steps to keep
const MAX_HISTORY_SIZE = 50

export function EditModeProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth()
    const [isEditMode, setIsEditMode] = useState(false)
    const [pendingChanges, setPendingChanges] = useState<Map<string, string>>(new Map())
    const [isSaving, setIsSaving] = useState(false)

    // Undo/Redo state
    const [undoHistory, setUndoHistory] = useState<HistoryEntry[]>([])
    const [redoHistory, setRedoHistory] = useState<HistoryEntry[]>([])

    // Check if user is an admin (authenticated with 434media.com domain)
    const isAdmin = !!user?.email?.endsWith("@434media.com")

    // Disable edit mode when user logs out or is not admin
    useEffect(() => {
        if (!isAdmin) {
            setIsEditMode(false)
            setPendingChanges(new Map())
            setUndoHistory([])
            setRedoHistory([])
        }
    }, [isAdmin])

    // Keyboard shortcut: Cmd/Ctrl + Shift + E to toggle edit mode
    // Cmd/Ctrl + Z for undo, Cmd/Ctrl + Shift + Z for redo
    useEffect(() => {
        if (!isAdmin) return

        const handleKeyDown = (e: KeyboardEvent) => {
            // Toggle edit mode: Cmd/Ctrl + Shift + E
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "e") {
                e.preventDefault()
                setIsEditMode((prev) => !prev)
                return
            }

            // Only handle undo/redo when in edit mode
            if (!isEditMode) return

            // Redo: Cmd/Ctrl + Shift + Z
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "z") {
                e.preventDefault()
                redo()
                return
            }

            // Undo: Cmd/Ctrl + Z (without Shift)
            if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === "z") {
                e.preventDefault()
                undo()
                return
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdmin, isEditMode, undoHistory, redoHistory])

    const toggleEditMode = useCallback(() => {
        if (isAdmin) {
            setIsEditMode((prev) => !prev)
        }
    }, [isAdmin])

    const setEditMode = useCallback((enabled: boolean) => {
        if (isAdmin) {
            setIsEditMode(enabled)
        }
    }, [isAdmin])

    const setPendingChange = useCallback((textId: string, value: string) => {
        setPendingChanges((prev) => {
            const previousValue = prev.get(textId)
            const next = new Map(prev)
            next.set(textId, value)

            // Only add to undo history if there's an actual change
            if (previousValue !== undefined && previousValue !== value) {
                setUndoHistory((history) => {
                    const newEntry: HistoryEntry = {
                        textId,
                        previousValue,
                        newValue: value,
                        timestamp: Date.now(),
                    }
                    const newHistory = [...history, newEntry]
                    // Limit history size
                    if (newHistory.length > MAX_HISTORY_SIZE) {
                        return newHistory.slice(-MAX_HISTORY_SIZE)
                    }
                    return newHistory
                })
                // Clear redo history when a new change is made
                setRedoHistory([])
            }

            return next
        })
    }, [])

    const clearPendingChange = useCallback((textId: string) => {
        setPendingChanges((prev) => {
            const next = new Map(prev)
            next.delete(textId)
            return next
        })
    }, [])

    const clearAllPendingChanges = useCallback(() => {
        setPendingChanges(new Map())
        setUndoHistory([])
        setRedoHistory([])
    }, [])

    const undo = useCallback(() => {
        if (undoHistory.length === 0) return

        const lastEntry = undoHistory[undoHistory.length - 1]

        // Move entry to redo history
        setRedoHistory((prev) => [...prev, lastEntry])
        setUndoHistory((prev) => prev.slice(0, -1))

        // Restore the previous value
        setPendingChanges((prev) => {
            const next = new Map(prev)
            next.set(lastEntry.textId, lastEntry.previousValue)
            return next
        })
    }, [undoHistory])

    const redo = useCallback(() => {
        if (redoHistory.length === 0) return

        const lastEntry = redoHistory[redoHistory.length - 1]

        // Move entry back to undo history
        setUndoHistory((prev) => [...prev, lastEntry])
        setRedoHistory((prev) => prev.slice(0, -1))

        // Apply the new value
        setPendingChanges((prev) => {
            const next = new Map(prev)
            next.set(lastEntry.textId, lastEntry.newValue)
            return next
        })
    }, [redoHistory])

    const saveAllChanges = useCallback(async () => {
        if (pendingChanges.size === 0) return

        setIsSaving(true)
        try {
            const updates = Array.from(pendingChanges.entries()).map(([textId, content]) => ({
                textId,
                content,
            }))

            const response = await fetch("/api/admin/site-text", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ updates }),
            })

            if (!response.ok) {
                throw new Error("Failed to save changes")
            }

            setPendingChanges(new Map())
            // Clear history after successful save
            setUndoHistory([])
            setRedoHistory([])
        } catch (error) {
            console.error("[EditMode] Error saving changes:", error)
            throw error
        } finally {
            setIsSaving(false)
        }
    }, [pendingChanges])

    return (
        <EditModeContext.Provider
            value={{
                isEditMode,
                isAdmin,
                toggleEditMode,
                setEditMode,
                pendingChanges,
                setPendingChange,
                clearPendingChange,
                clearAllPendingChanges,
                hasPendingChanges: pendingChanges.size > 0,
                saveAllChanges,
                isSaving,
                // Undo/Redo
                undo,
                redo,
                canUndo: undoHistory.length > 0,
                canRedo: redoHistory.length > 0,
                undoHistory,
                redoHistory,
            }}
        >
            {children}
        </EditModeContext.Provider>
    )
}

export function useEditMode() {
    const context = useContext(EditModeContext)
    if (context === undefined) {
        throw new Error("useEditMode must be used within an EditModeProvider")
    }
    return context
}
