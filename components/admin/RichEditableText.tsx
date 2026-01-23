"use client"

import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
    Bold,
    Check,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    List,
    ListOrdered,
    Minus,
    Pencil,
    Quote,
    Redo,
    Strikethrough,
    Underline as UnderlineIcon,
    Undo,
    X,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import React, { useCallback, useEffect, useState } from "react"
import { useEditMode } from "../../contexts/EditModeContext"
import { useSiteText } from "../../hooks/useSiteText"
import { cn } from "../../lib/utils"

interface RichEditableTextProps {
    textId: string
    defaultContent: string
    className?: string
    placeholder?: string
}

// Toolbar button component
function ToolbarButton({
    onClick,
    isActive = false,
    disabled = false,
    children,
    title,
}: {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode
    title: string
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={cn(
                "p-1.5 rounded-md transition-all duration-200",
                isActive
                    ? "bg-sky-100 text-sky-700"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            {children}
        </button>
    )
}

// Toolbar divider
function ToolbarDivider() {
    return <div className="w-px h-6 bg-neutral-200 mx-1" />
}

export default function RichEditableText({
    textId,
    defaultContent,
    className,
    placeholder = "Start typing...",
}: RichEditableTextProps) {
    const { isEditMode, isAdmin, setPendingChange, clearPendingChange } = useEditMode()
    const { getText, isLoading } = useSiteText()
    const [isEditing, setIsEditing] = useState(false)
    const [originalContent, setOriginalContent] = useState<string>("")
    const [isSaving, setIsSaving] = useState(false)

    // Get the current stored text or use default
    const currentContent = getText(textId, defaultContent)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            Underline,
        ],
        content: currentContent,
        editable: false,
        editorProps: {
            attributes: {
                class: cn(
                    "prose prose-neutral max-w-none focus:outline-none",
                    "prose-headings:font-bold prose-headings:text-neutral-900",
                    "prose-p:text-neutral-700 prose-p:leading-relaxed",
                    "prose-strong:text-neutral-900 prose-strong:font-semibold",
                    "prose-em:italic",
                    "prose-ul:list-disc prose-ol:list-decimal",
                    "prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:pl-4 prose-blockquote:italic",
                    "prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
                    className
                ),
            },
        },
    })

    // Update editor content when stored text changes
    useEffect(() => {
        if (editor && !isEditing) {
            editor.commands.setContent(currentContent)
        }
    }, [editor, currentContent, isEditing])

    // Update editable state based on editing mode
    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditing)
        }
    }, [editor, isEditing])

    const handleStartEditing = useCallback(() => {
        if (!isAdmin || !isEditMode || !editor) return
        setOriginalContent(editor.getHTML())
        setIsEditing(true)
    }, [isAdmin, isEditMode, editor])

    const handleSave = useCallback(async () => {
        if (!editor) return

        const newContent = editor.getHTML()
        if (newContent === originalContent) {
            setIsEditing(false)
            return
        }

        setIsSaving(true)

        try {
            const response = await fetch("/api/admin/site-text", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    textId,
                    content: newContent,
                    page: "global",
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to save content")
            }

            // Update pending changes for the toolbar indicator
            setPendingChange(textId, newContent)
        } catch (error) {
            console.error("Error saving rich text:", error)
            // Revert content on error
            editor.commands.setContent(originalContent)
        }

        setIsSaving(false)
        setIsEditing(false)
    }, [editor, textId, originalContent, setPendingChange])

    const handleCancel = useCallback(() => {
        if (!editor) return
        editor.commands.setContent(originalContent)
        clearPendingChange(textId)
        setIsEditing(false)
    }, [editor, originalContent, textId, clearPendingChange])

    if (!editor) {
        return (
            <div className={cn("animate-pulse bg-neutral-100 rounded h-24", className)} />
        )
    }

    // Non-admin view - just render the content
    if (!isAdmin || !isEditMode) {
        return (
            <div className={className}>
                <EditorContent editor={editor} />
            </div>
        )
    }

    return (
        <div className="relative group">
            <AnimatePresence mode="wait">
                {isEditing ? (
                    <motion.div
                        key="editor"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative"
                    >
                        {/* Formatting Toolbar */}
                        <div className="sticky top-20 z-20 mb-2 flex flex-wrap items-center gap-0.5 p-2 bg-white border border-neutral-200 rounded-lg shadow-lg">
                            {/* Undo/Redo */}
                            <ToolbarButton
                                onClick={() => editor.chain().focus().undo().run()}
                                disabled={!editor.can().undo()}
                                title="Undo"
                            >
                                <Undo className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().redo().run()}
                                disabled={!editor.can().redo()}
                                title="Redo"
                            >
                                <Redo className="w-4 h-4" />
                            </ToolbarButton>

                            <ToolbarDivider />

                            {/* Text formatting */}
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                isActive={editor.isActive("bold")}
                                title="Bold"
                            >
                                <Bold className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                isActive={editor.isActive("italic")}
                                title="Italic"
                            >
                                <Italic className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                isActive={editor.isActive("underline")}
                                title="Underline"
                            >
                                <UnderlineIcon className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                isActive={editor.isActive("strike")}
                                title="Strikethrough"
                            >
                                <Strikethrough className="w-4 h-4" />
                            </ToolbarButton>

                            <ToolbarDivider />

                            {/* Headings */}
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                isActive={editor.isActive("heading", { level: 1 })}
                                title="Heading 1"
                            >
                                <Heading1 className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                isActive={editor.isActive("heading", { level: 2 })}
                                title="Heading 2"
                            >
                                <Heading2 className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                isActive={editor.isActive("heading", { level: 3 })}
                                title="Heading 3"
                            >
                                <Heading3 className="w-4 h-4" />
                            </ToolbarButton>

                            <ToolbarDivider />

                            {/* Lists */}
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                isActive={editor.isActive("bulletList")}
                                title="Bullet List"
                            >
                                <List className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                isActive={editor.isActive("orderedList")}
                                title="Numbered List"
                            >
                                <ListOrdered className="w-4 h-4" />
                            </ToolbarButton>

                            <ToolbarDivider />

                            {/* Block elements */}
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                isActive={editor.isActive("blockquote")}
                                title="Quote"
                            >
                                <Quote className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                isActive={editor.isActive("codeBlock")}
                                title="Code Block"
                            >
                                <Code className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                                title="Horizontal Rule"
                            >
                                <Minus className="w-4 h-4" />
                            </ToolbarButton>

                            {/* Save/Cancel buttons */}
                            <div className="ml-auto flex items-center gap-2">
                                <button
                                    onClick={handleCancel}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors disabled:opacity-50"
                                >
                                    <Check className="w-4 h-4" />
                                    {isSaving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </div>

                        {/* Editor content */}
                        <div className="border-2 border-sky-400 rounded-lg p-4 bg-white focus-within:ring-2 focus-within:ring-sky-400 focus-within:ring-offset-2">
                            <EditorContent editor={editor} />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="display"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative cursor-pointer group"
                        onClick={handleStartEditing}
                    >
                        {/* Edit indicator overlay */}
                        <div className="absolute -inset-2 border-2 border-dashed border-transparent group-hover:border-sky-300 rounded-lg transition-colors" />

                        {/* Edit button */}
                        <motion.button
                            className="absolute -right-2 -top-2 z-10 p-1.5 bg-sky-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title="Edit rich text"
                        >
                            <Pencil className="w-3.5 h-3.5" />
                        </motion.button>

                        <EditorContent editor={editor} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Loading overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    )
}
