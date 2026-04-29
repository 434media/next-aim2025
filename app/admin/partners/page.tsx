"use client"

import {
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
    Users,
    X,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { AdminShell } from "../../../components/admin/AdminShell"
import { ImageUpload } from "../../../components/admin/ImageUpload"
import { WhovaLockedOverlay } from "../../../components/admin/WhovaLockedOverlay"

interface Partner {
    id: string
    name: string
    src: string
    href: string
    group: "main" | "additional"
    order: number
    created_at?: string
    updated_at?: string
}

const defaultPartner: Partial<Partner> = {
    name: "",
    src: "",
    href: "",
    group: "main",
}

export default function PartnersAdminPage() {
    const [partners, setPartners] = useState<Partner[]>([])
    const [filteredPartners, setFilteredPartners] = useState<Partner[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editingPartner, setEditingPartner] = useState<Partial<Partner> | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [isSeeding, setIsSeeding] = useState(false)

    useEffect(() => {
        loadPartners()
    }, [])

    useEffect(() => {
        if (searchQuery) {
            setFilteredPartners(
                partners.filter((p) =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
        } else {
            setFilteredPartners(partners)
        }
    }, [searchQuery, partners])

    const loadPartners = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch("/api/admin/partners")
            const data = await response.json()
            if (data.success) {
                const sorted = data.partners.sort((a: Partner, b: Partner) => a.order - b.order)
                setPartners(sorted)
                setFilteredPartners(sorted)
            } else {
                setError(data.error || "Failed to load partners")
            }
        } catch {
            setError("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = async () => {
        if (!editingPartner) return
        setIsSaving(true)
        try {
            const method = editingPartner.id ? "PATCH" : "POST"
            const response = await fetch("/api/admin/partners", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingPartner),
            })
            const data = await response.json()
            if (data.success) {
                if (editingPartner.id) {
                    setPartners((prev) =>
                        prev.map((p) =>
                            p.id === editingPartner.id ? { ...p, ...editingPartner } as Partner : p
                        )
                    )
                } else {
                    setPartners((prev) => [...prev, data.partner])
                }
                setShowModal(false)
                setEditingPartner(null)
            } else {
                alert(data.error || "Failed to save partner")
            }
        } catch {
            alert("An error occurred while saving")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this partner?")) return
        setDeletingId(id)
        try {
            const response = await fetch("/api/admin/partners", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
            const data = await response.json()
            if (data.success) {
                setPartners((prev) => prev.filter((p) => p.id !== id))
            } else {
                alert(data.error || "Failed to delete partner")
            }
        } catch {
            alert("An error occurred while deleting")
        } finally {
            setDeletingId(null)
        }
    }

    const handleSeedPartners = async () => {
        if (!confirm("This will seed all partners from the site data (Main + Additional marquee rows) into the database. Continue?")) return
        setIsSeeding(true)
        try {
            const response = await fetch("/api/admin/seed-partners", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secret: "aim2026-seed-partners" }),
            })
            const data = await response.json()
            if (data.success) {
                alert(`Successfully seeded ${data.partners?.length || 0} partners!`)
                loadPartners()
            } else {
                alert(data.error || "Failed to seed partners")
            }
        } catch {
            alert("An error occurred while seeding partners")
        } finally {
            setIsSeeding(false)
        }
    }

    const openAddModal = () => {
        setEditingPartner({ ...defaultPartner })
        setShowModal(true)
    }

    const openEditModal = (partner: Partner) => {
        setEditingPartner({ ...partner })
        setShowModal(true)
    }

    const mainCount = partners.filter((p) => p.group === "main").length
    const additionalCount = partners.filter((p) => p.group === "additional").length

    return (
        <AdminShell
            title="Partners Management"
            description="Manage the AIM Summit partner marquee — Main & Additional rows"
        >
            <WhovaLockedOverlay>
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search partners..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={loadPartners}
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
                            <span className="hidden sm:inline">Add Partner</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 ring-1 ring-gray-200">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <Users className="h-4 w-4" />
                            <span className="text-xs font-medium uppercase tracking-wide">Total</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{partners.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 ring-1 ring-gray-200">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <span className="h-2 w-2 rounded-full bg-[#548cac]" />
                            <span className="text-xs font-medium uppercase tracking-wide">Main Row</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{mainCount}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 ring-1 ring-gray-200">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <span className="h-2 w-2 rounded-full bg-gray-400" />
                            <span className="text-xs font-medium uppercase tracking-wide">Additional</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{additionalCount}</p>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="mb-6 p-4 bg-linear-to-br from-[#548cac]/5 to-[#4f4f2c]/5 rounded-xl border border-[#548cac]/20">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-900">Home page partner marquee:</span> Partners are split into two scrolling rows —{" "}
                        <span className="font-semibold text-gray-900">Main</span> (top row, header shown) and{" "}
                        <span className="font-semibold text-gray-900">Additional</span> (bottom row, reversed scroll). Use{" "}
                        <span className="font-semibold text-gray-900">Seed Partners</span> to push the current site data into the database and unlock full CMS control.
                    </p>
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm font-medium text-red-700">
                        {error}
                        <button onClick={loadPartners} className="ml-2 underline hover:no-underline">
                            Try again
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-[#548cac]" />
                    </div>
                ) : filteredPartners.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl ring-1 ring-gray-200">
                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-gray-900">No partners found</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {searchQuery
                                ? "Try adjusting your search query"
                                : "Seed from the site data to get started"}
                        </p>
                        {!searchQuery && partners.length === 0 && (
                            <button
                                onClick={handleSeedPartners}
                                disabled={isSeeding}
                                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#548cac] text-white rounded-lg text-sm font-semibold hover:bg-[#3d6a82] transition-colors disabled:opacity-50"
                            >
                                {isSeeding ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Plus className="h-4 w-4" />
                                )}
                                Seed Partners
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredPartners.map((partner, index) => (
                            <motion.div
                                key={partner.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.04 }}
                                className="bg-white rounded-xl p-4 ring-1 ring-gray-200 hover:ring-[#548cac] transition-all group"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <GripVertical className="h-4 w-4 cursor-grab" />
                                        <span className="text-xs font-bold">#{partner.order}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        {/* Logo Preview */}
                                        <div className="relative h-16 w-full mb-3 bg-gray-50 rounded-lg overflow-hidden">
                                            {partner.src ? (
                                                <Image
                                                    src={partner.src}
                                                    alt={partner.name}
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
                                            {partner.name}
                                        </h3>

                                        {partner.group && (
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold mb-3 ${partner.group === "main"
                                                    ? "bg-[#548cac]/10 text-[#548cac]"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}>
                                                {partner.group === "main" ? "Main Row" : "Additional Row"}
                                            </span>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <a
                                                href={partner.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-[#548cac] hover:underline font-medium"
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                                Visit Website
                                            </a>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => openEditModal(partner)}
                                                    className="p-1.5 text-gray-400 hover:text-[#548cac] hover:bg-[#548cac]/10 rounded-lg transition-colors"
                                                    title="Edit partner"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(partner.id)}
                                                    disabled={deletingId === partner.id}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete partner"
                                                >
                                                    {deletingId === partner.id ? (
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
                    {showModal && editingPartner && (
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
                                        {editingPartner.id ? "Edit Partner" : "Add New Partner"}
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
                                                Partner Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={editingPartner.name || ""}
                                                onChange={(e) =>
                                                    setEditingPartner({ ...editingPartner, name: e.target.value })
                                                }
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                                placeholder="Enter partner name"
                                            />
                                        </div>

                                        <ImageUpload
                                            value={editingPartner.src || ""}
                                            onChange={(url) =>
                                                setEditingPartner({ ...editingPartner, src: url })
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
                                                value={editingPartner.href || ""}
                                                onChange={(e) =>
                                                    setEditingPartner({ ...editingPartner, href: e.target.value })
                                                }
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                                placeholder="https://partnerwebsite.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Marquee Row
                                            </label>
                                            <select
                                                value={editingPartner.group || "main"}
                                                onChange={(e) =>
                                                    setEditingPartner({
                                                        ...editingPartner,
                                                        group: e.target.value as "main" | "additional",
                                                    })
                                                }
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                            >
                                                <option value="main">Main Row (top, with header)</option>
                                                <option value="additional">Additional Row (bottom, reversed)</option>
                                            </select>
                                        </div>

                                        {editingPartner.id && (
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Display Order
                                                </label>
                                                <input
                                                    type="number"
                                                    value={editingPartner.order || 0}
                                                    onChange={(e) =>
                                                        setEditingPartner({
                                                            ...editingPartner,
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
                                            !editingPartner.name ||
                                            !editingPartner.src ||
                                            !editingPartner.href
                                        }
                                        className="flex items-center gap-2 px-4 py-2.5 bg-[#548cac] text-white text-sm font-semibold rounded-xl hover:bg-[#3d6a82] transition-colors disabled:opacity-50"
                                    >
                                        {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                                        {editingPartner.id ? "Update Partner" : "Add Partner"}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </WhovaLockedOverlay>
        </AdminShell>
    )
}
