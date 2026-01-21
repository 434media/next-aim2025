"use client"

import {
    CalendarDays,
    ChevronDown,
    ChevronUp,
    Clock,
    Edit2,
    Loader2,
    MapPin,
    Plus,
    Search,
    Trash2,
    X,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useState } from "react"
import { AdminShell } from "../../../components/admin/AdminShell"

interface ScheduleItem {
    id: string
    title: string
    description: string
    date: string
    startTime: string
    endTime: string
    location: string
    speakerIds: string[]
    track: string
    type: "keynote" | "panel" | "breakout" | "networking" | "break" | "other"
    order: number
    createdAt: string
    updatedAt: string
}

interface Speaker {
    id: string
    name: string
}

const defaultScheduleItem: Omit<ScheduleItem, "id" | "createdAt" | "updatedAt"> = {
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    speakerIds: [],
    track: "",
    type: "other",
    order: 0,
}

const sessionTypes = [
    { value: "keynote", label: "Keynote", color: "bg-purple-100 text-purple-700" },
    { value: "panel", label: "Panel", color: "bg-blue-100 text-blue-700" },
    { value: "breakout", label: "Breakout", color: "bg-green-100 text-green-700" },
    { value: "networking", label: "Networking", color: "bg-amber-100 text-amber-700" },
    { value: "break", label: "Break", color: "bg-gray-100 text-gray-700" },
    { value: "other", label: "Other", color: "bg-slate-100 text-slate-700" },
]

export default function AdminSchedulePage() {
    const [schedule, setSchedule] = useState<ScheduleItem[]>([])
    const [speakers, setSpeakers] = useState<Speaker[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editingItem, setEditingItem] = useState<Omit<ScheduleItem, "id" | "createdAt" | "updatedAt"> & { id?: string }>(defaultScheduleItem)
    const [saving, setSaving] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [expandedDate, setExpandedDate] = useState<string | null>(null)

    const fetchSchedule = useCallback(async () => {
        try {
            setLoading(true)
            const [scheduleRes, speakersRes] = await Promise.all([
                fetch("/api/admin/schedule"),
                fetch("/api/admin/speakers"),
            ])

            const scheduleData = await scheduleRes.json()
            const speakersData = await speakersRes.json()

            if (scheduleData.success) {
                setSchedule(scheduleData.schedule)
            } else {
                setError(scheduleData.error || "Failed to fetch schedule")
            }

            if (speakersData.success) {
                setSpeakers(speakersData.speakers)
            }
        } catch {
            setError("Failed to fetch schedule")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSchedule()
    }, [fetchSchedule])

    // Group schedule items by date
    const scheduleByDate = schedule.reduce((acc, item) => {
        const date = item.date
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(item)
        return acc
    }, {} as Record<string, ScheduleItem[]>)

    // Sort dates
    const sortedDates = Object.keys(scheduleByDate).sort()

    // Filter items
    const filterItems = (items: ScheduleItem[]) =>
        items.filter(
            (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.track.toLowerCase().includes(searchQuery.toLowerCase())
        )

    const handleSave = async () => {
        if (!editingItem.title || !editingItem.date || !editingItem.startTime) {
            alert("Please fill in required fields (title, date, start time)")
            return
        }

        setSaving(true)
        try {
            const method = editingItem.id ? "PATCH" : "POST"
            const response = await fetch("/api/admin/schedule", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingItem),
            })
            const data = await response.json()

            if (data.success) {
                setShowModal(false)
                fetchSchedule()
            } else {
                alert(data.error || "Failed to save schedule item")
            }
        } catch {
            alert("An error occurred while saving")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this schedule item?")) return

        setDeletingId(id)
        try {
            const response = await fetch("/api/admin/schedule", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
            const data = await response.json()

            if (data.success) {
                setSchedule((prev) => prev.filter((s) => s.id !== id))
            } else {
                alert(data.error || "Failed to delete schedule item")
            }
        } catch {
            alert("An error occurred while deleting")
        } finally {
            setDeletingId(null)
        }
    }

    const openAddModal = () => {
        setEditingItem({ ...defaultScheduleItem })
        setShowModal(true)
    }

    const openEditModal = (item: ScheduleItem) => {
        setEditingItem({ ...item })
        setShowModal(true)
    }

    const getTypeStyle = (type: string) => {
        return sessionTypes.find((t) => t.value === type)?.color || "bg-gray-100 text-gray-700"
    }

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        } catch {
            return dateString
        }
    }

    return (
        <AdminShell
            title="Schedule Management"
            description="Manage AIM 2025 Summit schedule"
        >
            {/* Search and Add */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search schedule..."
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
                    <span>Add Session</span>
                </button>
            </div>

            {/* Schedule by Date */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#548cac]" />
                </div>
            ) : error ? (
                <div className="text-center py-12">
                    <p className="text-red-500 font-medium">{error}</p>
                    <button
                        onClick={fetchSchedule}
                        className="mt-4 text-[#548cac] font-semibold hover:underline"
                    >
                        Try again
                    </button>
                </div>
            ) : sortedDates.length === 0 ? (
                <div className="text-center py-12">
                    <CalendarDays className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No schedule items yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {sortedDates.map((date) => {
                        const items = filterItems(scheduleByDate[date])
                        if (items.length === 0 && searchQuery) return null

                        const isExpanded = expandedDate === date || !expandedDate

                        return (
                            <div
                                key={date}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                            >
                                <button
                                    onClick={() => setExpandedDate(isExpanded ? null : date)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <CalendarDays className="h-5 w-5 text-[#548cac]" />
                                        <span className="text-base font-bold text-gray-900">
                                            {formatDate(date)}
                                        </span>
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                            {items.length} sessions
                                        </span>
                                    </div>
                                    {isExpanded ? (
                                        <ChevronUp className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="border-t border-gray-100">
                                                {items
                                                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                                                    .map((item, index) => (
                                                        <motion.div
                                                            key={item.id}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.03 }}
                                                            className="p-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                                                        >
                                                            <div className="flex items-start gap-4">
                                                                <div className="flex-shrink-0 text-sm font-medium text-gray-500 w-24">
                                                                    <div className="flex items-center gap-1">
                                                                        <Clock className="h-3.5 w-3.5" />
                                                                        {item.startTime}
                                                                    </div>
                                                                    {item.endTime && (
                                                                        <div className="text-xs text-gray-400 mt-0.5">
                                                                            - {item.endTime}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-start gap-2 flex-wrap">
                                                                        <h3 className="text-sm font-bold text-gray-900">
                                                                            {item.title}
                                                                        </h3>
                                                                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getTypeStyle(item.type)}`}>
                                                                            {sessionTypes.find((t) => t.value === item.type)?.label || item.type}
                                                                        </span>
                                                                    </div>
                                                                    {item.description && (
                                                                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                                            {item.description}
                                                                        </p>
                                                                    )}
                                                                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                                                        {item.location && (
                                                                            <span className="flex items-center gap-1">
                                                                                <MapPin className="h-3 w-3" />
                                                                                {item.location}
                                                                            </span>
                                                                        )}
                                                                        {item.track && (
                                                                            <span className="px-1.5 py-0.5 bg-[#548cac]/10 text-[#548cac] font-medium rounded">
                                                                                {item.track}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <button
                                                                        onClick={() => openEditModal(item)}
                                                                        className="p-2 text-gray-400 hover:text-[#548cac] transition-colors"
                                                                    >
                                                                        <Edit2 className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(item.id)}
                                                                        disabled={deletingId === item.id}
                                                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                                                    >
                                                                        {deletingId === item.id ? (
                                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                                        ) : (
                                                                            <Trash2 className="h-4 w-4" />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
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
                                    {editingItem.id ? "Edit Session" : "Add Session"}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={editingItem.title}
                                        onChange={(e) =>
                                            setEditingItem({ ...editingItem, title: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        placeholder="Opening Keynote"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={editingItem.description}
                                        onChange={(e) =>
                                            setEditingItem({ ...editingItem, description: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent resize-none"
                                        placeholder="Session description..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={editingItem.date}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, date: e.target.value })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Session Type
                                        </label>
                                        <select
                                            value={editingItem.type}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, type: e.target.value as ScheduleItem["type"] })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        >
                                            {sessionTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Start Time *
                                        </label>
                                        <input
                                            type="time"
                                            value={editingItem.startTime}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, startTime: e.target.value })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            End Time
                                        </label>
                                        <input
                                            type="time"
                                            value={editingItem.endTime}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, endTime: e.target.value })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={editingItem.location}
                                        onChange={(e) =>
                                            setEditingItem({ ...editingItem, location: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        placeholder="Ballroom A"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Track
                                    </label>
                                    <input
                                        type="text"
                                        value={editingItem.track}
                                        onChange={(e) =>
                                            setEditingItem({ ...editingItem, track: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        placeholder="Innovation Track"
                                    />
                                </div>

                                {speakers.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Speakers
                                        </label>
                                        <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-xl p-2 space-y-1">
                                            {speakers.map((speaker) => (
                                                <label
                                                    key={speaker.id}
                                                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={editingItem.speakerIds.includes(speaker.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setEditingItem({
                                                                    ...editingItem,
                                                                    speakerIds: [...editingItem.speakerIds, speaker.id],
                                                                })
                                                            } else {
                                                                setEditingItem({
                                                                    ...editingItem,
                                                                    speakerIds: editingItem.speakerIds.filter((id) => id !== speaker.id),
                                                                })
                                                            }
                                                        }}
                                                        className="h-4 w-4 rounded border-gray-300 text-[#548cac] focus:ring-[#548cac]"
                                                    />
                                                    <span className="text-sm text-gray-700">{speaker.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
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
                                        <span>Save Session</span>
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
