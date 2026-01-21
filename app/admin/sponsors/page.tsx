"use client"

import {
    Award,
    Edit2,
    ExternalLink,
    GripVertical,
    ImageIcon,
    Link as LinkIcon,
    Loader2,
    Plus,
    RefreshCw,
    Search,
    Trash2,
    X,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { AdminShell } from "../../../components/admin/AdminShell"
import { ImageUpload } from "../../../components/admin/ImageUpload"

interface Sponsor {
    id: string
    name: string
    src: string
    website: string
    description: string
    order: number
    created_at?: string
    updated_at?: string
}

const defaultSponsor: Partial<Sponsor> = {
    name: "",
    src: "",
    website: "",
    description: "",
}

export default function SponsorsAdminPage() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([])
    const [filteredSponsors, setFilteredSponsors] = useState<Sponsor[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editingSponsor, setEditingSponsor] = useState<Partial<Sponsor> | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [isSeeding, setIsSeeding] = useState(false)

    useEffect(() => {
        loadSponsors()
    }, [])

    useEffect(() => {
        if (searchQuery) {
            const filtered = sponsors.filter(
                (sponsor) =>
                    sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    sponsor.description?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredSponsors(filtered)
        } else {
            setFilteredSponsors(sponsors)
        }
    }, [searchQuery, sponsors])

    const loadSponsors = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/admin/sponsors")
            const data = await response.json()

            if (data.success) {
                // Sort by order
                const sorted = data.sponsors.sort((a: Sponsor, b: Sponsor) => a.order - b.order)
                setSponsors(sorted)
                setFilteredSponsors(sorted)
            } else {
                setError(data.error || "Failed to load sponsors")
            }
        } catch {
            setError("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = async () => {
        if (!editingSponsor) return

        setIsSaving(true)

        try {
            const method = editingSponsor.id ? "PATCH" : "POST"
            const response = await fetch("/api/admin/sponsors", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingSponsor),
            })
            const data = await response.json()

            if (data.success) {
                if (editingSponsor.id) {
                    setSponsors((prev) =>
                        prev.map((s) =>
                            s.id === editingSponsor.id ? { ...s, ...editingSponsor } as Sponsor : s
                        )
                    )
                } else {
                    setSponsors((prev) => [...prev, data.sponsor])
                }
                setShowModal(false)
                setEditingSponsor(null)
            } else {
                alert(data.error || "Failed to save sponsor")
            }
        } catch {
            alert("An error occurred while saving")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this sponsor?")) return

        setDeletingId(id)

        try {
            const response = await fetch("/api/admin/sponsors", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
            const data = await response.json()

            if (data.success) {
                setSponsors((prev) => prev.filter((s) => s.id !== id))
            } else {
                alert(data.error || "Failed to delete sponsor")
            }
        } catch {
            alert("An error occurred while deleting")
        } finally {
            setDeletingId(null)
        }
    }

    const handleSeedSponsors = async () => {
        if (!confirm("This will add the default sponsors from testimonials. Continue?")) return

        setIsSeeding(true)

        try {
            const response = await fetch("/api/admin/seed-sponsors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secret: "aim2025-seed-sponsors" }),
            })
            const data = await response.json()

            if (data.success) {
                alert(`Successfully seeded ${data.sponsors?.length || 0} sponsors!`)
                loadSponsors()
            } else {
                alert(data.error || "Failed to seed sponsors")
            }
        } catch {
            alert("An error occurred while seeding sponsors")
        } finally {
            setIsSeeding(false)
        }
    }

    const openAddModal = () => {
        setEditingSponsor({ ...defaultSponsor })
        setShowModal(true)
    }

    const openEditModal = (sponsor: Sponsor) => {
        setEditingSponsor({ ...sponsor })
        setShowModal(true)
    }

    return (
        <AdminShell
            title="Sponsors Management"
            description="Manage AIM 2025 Summit sponsors"
        >
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search sponsors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={loadSponsors}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </button>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-4 py-3 bg-[#548cac] text-white rounded-xl text-sm font-semibold hover:bg-[#3d6a82] transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Add Sponsor</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Award className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Total Sponsors</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{sponsors.length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Search className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Filtered</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{filteredSponsors.length}</p>
                </div>
            </div>

            {/* Info Banner */}
            <div className="mb-6 p-4 bg-gradient-to-br from-[#548cac]/5 to-[#4f4f2c]/5 rounded-xl border border-[#548cac]/20">
                <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-900">Note:</span> Sponsors added here
                    will be displayed in the AIM 2025 Summit page sponsor showcase. You can drag to
                    reorder sponsors or update their order number.
                </p>
            </div>

            {/* Error State */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm font-medium text-red-700">
                    {error}
                    <button onClick={loadSponsors} className="ml-2 underline hover:no-underline">
                        Try again
                    </button>
                </div>
            )}

            {/* Loading State */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#548cac]" />
                </div>
            ) : filteredSponsors.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl ring-1 ring-gray-200">
                    <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-900">No sponsors found</p>
                    <p className="text-sm text-gray-500 mt-1">
                        {searchQuery
                            ? "Try adjusting your search query"
                            : "Add your first sponsor or seed from testimonials"}
                    </p>
                    {!searchQuery && sponsors.length === 0 && (
                        <button
                            onClick={handleSeedSponsors}
                            disabled={isSeeding}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50"
                        >
                            {isSeeding ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Plus className="h-4 w-4" />
                            )}
                            Seed Default Sponsors
                        </button>
                    )}
                </div>
            ) : (
                /* Sponsors Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSponsors.map((sponsor, index) => (
                        <motion.div
                            key={sponsor.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-xl p-4 ring-1 ring-gray-200 hover:ring-[#548cac] transition-all group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <GripVertical className="h-4 w-4 cursor-grab" />
                                    <span className="text-xs font-bold">#{sponsor.order}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    {/* Logo Preview */}
                                    <div className="relative h-16 w-full mb-3 bg-gray-50 rounded-lg overflow-hidden">
                                        {sponsor.src ? (
                                            <Image
                                                src={sponsor.src}
                                                alt={sponsor.name}
                                                fill
                                                className="object-contain p-2"
                                                sizes="(max-width: 640px) 100vw, 33vw"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <ImageIcon className="h-8 w-8 text-gray-300" />
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-sm font-bold text-gray-900 tracking-tight truncate mb-1">
                                        {sponsor.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                                        {sponsor.description || "No description"}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <a
                                            href={sponsor.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs text-[#548cac] hover:underline font-medium"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            Visit Website
                                        </a>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => openEditModal(sponsor)}
                                                className="p-1.5 text-gray-400 hover:text-[#548cac] hover:bg-[#548cac]/10 rounded-lg transition-colors"
                                                title="Edit sponsor"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(sponsor.id)}
                                                disabled={deletingId === sponsor.id}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                title="Delete sponsor"
                                            >
                                                {deletingId === sponsor.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && editingSponsor && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                                    {editingSponsor.id ? "Edit Sponsor" : "Add New Sponsor"}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Sponsor Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={editingSponsor.name || ""}
                                            onChange={(e) =>
                                                setEditingSponsor({ ...editingSponsor, name: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                            placeholder="Enter sponsor name"
                                        />
                                    </div>

                                    <ImageUpload
                                        value={editingSponsor.src || ""}
                                        onChange={(url) =>
                                            setEditingSponsor({ ...editingSponsor, src: url })
                                        }
                                        label="Logo"
                                        placeholder="https://example.com/logo.png"
                                        aspectRatio="logo"
                                        required
                                    />

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <LinkIcon className="inline h-4 w-4 mr-1" />
                                            Website URL *
                                        </label>
                                        <input
                                            type="url"
                                            value={editingSponsor.website || ""}
                                            onChange={(e) =>
                                                setEditingSponsor({ ...editingSponsor, website: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                            placeholder="https://sponsorwebsite.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={editingSponsor.description || ""}
                                            onChange={(e) =>
                                                setEditingSponsor({
                                                    ...editingSponsor,
                                                    description: e.target.value,
                                                })
                                            }
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent resize-none"
                                            placeholder="Brief description of the sponsor..."
                                        />
                                    </div>

                                    {editingSponsor.id && (
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Display Order
                                            </label>
                                            <input
                                                type="number"
                                                value={editingSponsor.order || 0}
                                                onChange={(e) =>
                                                    setEditingSponsor({
                                                        ...editingSponsor,
                                                        order: parseInt(e.target.value) || 0,
                                                    })
                                                }
                                                min="1"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={
                                        isSaving ||
                                        !editingSponsor.name ||
                                        !editingSponsor.src ||
                                        !editingSponsor.website
                                    }
                                    className="flex items-center gap-2 px-4 py-2.5 bg-[#548cac] text-white text-sm font-semibold rounded-xl hover:bg-[#3d6a82] transition-colors disabled:opacity-50"
                                >
                                    {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {editingSponsor.id ? "Update Sponsor" : "Add Sponsor"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AdminShell>
    )
}
