"use client"

import {
    Edit2,
    ExternalLink,
    Loader2,
    Mic2,
    Plus,
    Search,
    Trash2,
    X,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { AdminShell } from "../../../components/admin/AdminShell"

interface Speaker {
    id: string
    name: string
    title: string
    organization: string
    bio: string
    imageUrl: string
    linkedIn?: string
    order: number
    featured: boolean
    createdAt: string
    updatedAt: string
}

const defaultSpeaker: Omit<Speaker, "id" | "createdAt" | "updatedAt"> = {
    name: "",
    title: "",
    organization: "",
    bio: "",
    imageUrl: "",
    linkedIn: "",
    order: 0,
    featured: false,
}

export default function AdminSpeakersPage() {
    const [speakers, setSpeakers] = useState<Speaker[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editingSpeaker, setEditingSpeaker] = useState<Omit<Speaker, "id" | "createdAt" | "updatedAt"> & { id?: string }>(defaultSpeaker)
    const [saving, setSaving] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const fetchSpeakers = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/admin/speakers")
            const data = await response.json()

            if (data.success) {
                const sorted = data.speakers.sort((a: Speaker, b: Speaker) => a.order - b.order)
                setSpeakers(sorted)
            } else {
                setError(data.error || "Failed to fetch speakers")
            }
        } catch {
            setError("Failed to fetch speakers")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSpeakers()
    }, [fetchSpeakers])

    const filteredSpeakers = speakers.filter(
        (speaker) =>
            speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            speaker.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
            speaker.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSave = async () => {
        if (!editingSpeaker.name || !editingSpeaker.title) {
            alert("Please fill in required fields (name, title)")
            return
        }

        setSaving(true)
        try {
            const method = editingSpeaker.id ? "PATCH" : "POST"
            const response = await fetch("/api/admin/speakers", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingSpeaker),
            })
            const data = await response.json()

            if (data.success) {
                setShowModal(false)
                fetchSpeakers()
            } else {
                alert(data.error || "Failed to save speaker")
            }
        } catch {
            alert("An error occurred while saving")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this speaker?")) return

        setDeletingId(id)
        try {
            const response = await fetch("/api/admin/speakers", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
            const data = await response.json()

            if (data.success) {
                setSpeakers((prev) => prev.filter((s) => s.id !== id))
            } else {
                alert(data.error || "Failed to delete speaker")
            }
        } catch {
            alert("An error occurred while deleting")
        } finally {
            setDeletingId(null)
        }
    }

    const openAddModal = () => {
        setEditingSpeaker({ ...defaultSpeaker, order: speakers.length })
        setPreviewImage(null)
        setShowModal(true)
    }

    const openEditModal = (speaker: Speaker) => {
        setEditingSpeaker({ ...speaker })
        setPreviewImage(speaker.imageUrl)
        setShowModal(true)
    }

    const handleImageUrlChange = (url: string) => {
        setEditingSpeaker({ ...editingSpeaker, imageUrl: url })
        if (url && url.startsWith("http")) {
            setPreviewImage(url)
        } else {
            setPreviewImage(null)
        }
    }

    return (
        <AdminShell
            title="Speakers Management"
            description="Manage AIM 2025 Summit speakers"
        >
            {/* Search and Add */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search speakers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent transition-all"
                    />
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#548cac] text-white rounded-xl text-sm font-semibold hover:bg-[#548cac]/90 transition-colors shadow-sm"
                >
                    <Plus className="h-5 w-5" />
                    <span>Add Speaker</span>
                </button>
            </div>

            {/* Speakers Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#548cac]" />
                </div>
            ) : error ? (
                <div className="text-center py-12">
                    <p className="text-red-500 font-medium">{error}</p>
                    <button
                        onClick={fetchSpeakers}
                        className="mt-4 text-[#548cac] font-semibold hover:underline"
                    >
                        Try again
                    </button>
                </div>
            ) : filteredSpeakers.length === 0 ? (
                <div className="text-center py-12">
                    <Mic2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">
                        {searchQuery ? "No speakers match your search" : "No speakers yet"}
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredSpeakers.map((speaker, index) => (
                        <motion.div
                            key={speaker.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex gap-4">
                                <div className="relative h-20 w-20 flex-shrink-0 rounded-xl bg-gray-100 overflow-hidden">
                                    {speaker.imageUrl ? (
                                        <Image
                                            src={speaker.imageUrl}
                                            alt={speaker.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <Mic2 className="h-8 w-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 truncate">
                                                {speaker.name}
                                            </h3>
                                            <p className="text-xs text-gray-600 truncate">
                                                {speaker.title}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {speaker.organization}
                                            </p>
                                        </div>
                                        {speaker.featured && (
                                            <span className="flex-shrink-0 px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                                {speaker.linkedIn && (
                                    <a
                                        href={speaker.linkedIn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-400 hover:text-[#0077b5] transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}
                                <div className="flex-1" />
                                <button
                                    onClick={() => openEditModal(speaker)}
                                    className="p-2 text-gray-400 hover:text-[#548cac] transition-colors"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(speaker.id)}
                                    disabled={deletingId === speaker.id}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                >
                                    {deletingId === speaker.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {editingSpeaker.id ? "Edit Speaker" : "Add Speaker"}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* Image Preview */}
                                {previewImage && (
                                    <div className="relative h-32 w-32 mx-auto rounded-xl bg-gray-100 overflow-hidden">
                                        <Image
                                            src={previewImage}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={editingSpeaker.name}
                                        onChange={(e) =>
                                            setEditingSpeaker({ ...editingSpeaker, name: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        placeholder="Dr. Jane Smith"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={editingSpeaker.title}
                                        onChange={(e) =>
                                            setEditingSpeaker({ ...editingSpeaker, title: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        placeholder="Chief Medical Officer"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Organization
                                    </label>
                                    <input
                                        type="text"
                                        value={editingSpeaker.organization}
                                        onChange={(e) =>
                                            setEditingSpeaker({ ...editingSpeaker, organization: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        placeholder="USAMRDC"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Bio
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={editingSpeaker.bio}
                                        onChange={(e) =>
                                            setEditingSpeaker({ ...editingSpeaker, bio: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent resize-none"
                                        placeholder="Brief speaker biography..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        value={editingSpeaker.imageUrl}
                                        onChange={(e) => handleImageUrlChange(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        placeholder="https://example.com/speaker.jpg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        LinkedIn URL
                                    </label>
                                    <input
                                        type="url"
                                        value={editingSpeaker.linkedIn || ""}
                                        onChange={(e) =>
                                            setEditingSpeaker({ ...editingSpeaker, linkedIn: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={editingSpeaker.featured}
                                        onChange={(e) =>
                                            setEditingSpeaker({ ...editingSpeaker, featured: e.target.checked })
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-[#548cac] focus:ring-[#548cac]"
                                    />
                                    <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                                        Featured Speaker
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        value={editingSpeaker.order}
                                        onChange={(e) =>
                                            setEditingSpeaker({ ...editingSpeaker, order: parseInt(e.target.value) || 0 })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-[#548cac] text-white rounded-xl text-sm font-semibold hover:bg-[#548cac]/90 transition-colors disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <span>Save Speaker</span>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AdminShell>
    )
}
