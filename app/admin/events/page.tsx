"use client"

import {
    Archive,
    Calendar,
    ChevronDown,
    ChevronUp,
    Clock,
    Edit2,
    Link as LinkIcon,
    Loader2,
    MapPin,
    Plus,
    RefreshCw,
    Search,
    Tag,
    Trash2,
    Users,
    X,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
import { AdminShell } from "../../../components/admin/AdminShell"
import { ImageUpload } from "../../../components/admin/ImageUpload"

interface Event {
    id: string
    title: string
    description?: string
    date: string
    time: string
    location: string
    organizer: string
    category: "conference" | "workshop" | "meetup" | "networking" | "other"
    attendees?: number
    price: string
    url: string
    image: string
    tags: string
    isPast: boolean
    created_at?: string
    updated_at?: string
}

const categories = [
    { value: "conference", label: "Conference" },
    { value: "workshop", label: "Workshop" },
    { value: "meetup", label: "Meetup" },
    { value: "networking", label: "Networking" },
    { value: "other", label: "Other" },
]

const defaultEvent: Partial<Event> = {
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    category: "conference",
    price: "Free",
    url: "",
    image: "",
    tags: "",
    isPast: false,
}

export default function EventsAdminPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
    const [pastEvents, setPastEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [showArchive, setShowArchive] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editingEvent, setEditingEvent] = useState<Partial<Event> | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    useEffect(() => {
        loadEvents()
    }, [])

    useEffect(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        let filtered = events

        if (searchQuery) {
            filtered = filtered.filter(
                (event) =>
                    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Sort by date ascending (coming up next first)
        const sorted = [...filtered].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )

        const upcoming = sorted.filter((event) => new Date(event.date) >= today)
        const past = sorted
            .filter((event) => new Date(event.date) < today)
            .reverse() // Most recent past events first

        setUpcomingEvents(upcoming)
        setPastEvents(past)
    }, [events, searchQuery])

    const loadEvents = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/admin/events")
            const data = await response.json()

            if (data.success) {
                setEvents(data.events)
            } else {
                setError(data.error || "Failed to load events")
            }
        } catch {
            setError("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = async () => {
        if (!editingEvent) return

        setIsSaving(true)

        try {
            const method = editingEvent.id ? "PATCH" : "POST"
            const response = await fetch("/api/admin/events", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingEvent),
            })
            const data = await response.json()

            if (data.success) {
                if (editingEvent.id) {
                    setEvents((prev) =>
                        prev.map((e) => (e.id === editingEvent.id ? { ...e, ...editingEvent } as Event : e))
                    )
                } else {
                    setEvents((prev) => [...prev, data.event])
                }
                setShowModal(false)
                setEditingEvent(null)
            } else {
                alert(data.error || "Failed to save event")
            }
        } catch {
            alert("An error occurred while saving")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return

        setDeletingId(id)

        try {
            const response = await fetch("/api/admin/events", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
            const data = await response.json()

            if (data.success) {
                setEvents((prev) => prev.filter((e) => e.id !== id))
            } else {
                alert(data.error || "Failed to delete event")
            }
        } catch {
            alert("An error occurred while deleting")
        } finally {
            setDeletingId(null)
        }
    }

    const openAddModal = () => {
        setEditingEvent({ ...defaultEvent })
        setShowModal(true)
    }

    const openEditModal = (event: Event) => {
        setEditingEvent({ ...event })
        setShowModal(true)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "conference":
                return "bg-blue-50 text-blue-700"
            case "workshop":
                return "bg-purple-50 text-purple-700"
            case "meetup":
                return "bg-green-50 text-green-700"
            case "networking":
                return "bg-amber-50 text-amber-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    const EventCard = ({ event }: { event: Event }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 ring-1 ring-gray-200 hover:ring-[#548cac] transition-all group"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getCategoryColor(
                                event.category
                            )}`}
                        >
                            {event.category}
                        </span>
                        {event.isPast && (
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                                Past
                            </span>
                        )}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 tracking-tight line-clamp-2 mb-2">
                        {event.title}
                    </h3>
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span className="font-medium">{formatDate(event.date)}</span>
                            <Clock className="h-4 w-4 flex-shrink-0 ml-2" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users className="h-4 w-4 flex-shrink-0" />
                            <span>{event.organizer}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => openEditModal(event)}
                        className="p-2 text-gray-400 hover:text-[#548cac] hover:bg-[#548cac]/10 rounded-lg transition-colors"
                        title="Edit event"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(event.id)}
                        disabled={deletingId === event.id}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete event"
                    >
                        {deletingId === event.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Trash2 className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    )

    return (
        <AdminShell
            title="Events Management"
            description="Add, edit, and manage summit events"
        >
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={loadEvents}
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
                        <span className="hidden sm:inline">Add Event</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Total</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 text-green-500 mb-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Upcoming</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Archive className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Past</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{pastEvents.length}</p>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm font-medium text-red-700">
                    {error}
                    <button onClick={loadEvents} className="ml-2 underline hover:no-underline">
                        Try again
                    </button>
                </div>
            )}

            {/* Loading State */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#548cac]" />
                </div>
            ) : (
                <>
                    {/* Upcoming Events */}
                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-[#548cac]" />
                            Upcoming Events
                            <span className="text-sm font-medium text-gray-400">
                                (sorted by date)
                            </span>
                        </h2>
                        {upcomingEvents.length === 0 ? (
                            <div className="text-center py-8 bg-white rounded-2xl ring-1 ring-gray-200">
                                <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                <p className="text-base font-semibold text-gray-900">No upcoming events</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Add a new event to get started
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {upcomingEvents.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Past Events Accordion */}
                    <div className="bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden">
                        <button
                            onClick={() => setShowArchive(!showArchive)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Archive className="h-5 w-5 text-gray-400" />
                                <span className="text-base font-bold text-gray-900 tracking-tight">
                                    Archived Events
                                </span>
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                                    {pastEvents.length}
                                </span>
                            </div>
                            {showArchive ? (
                                <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                        <AnimatePresence>
                            {showArchive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 pt-0 border-t border-gray-100">
                                        {pastEvents.length === 0 ? (
                                            <p className="text-center py-6 text-sm text-gray-500">
                                                No archived events
                                            </p>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                {pastEvents.map((event) => (
                                                    <EventCard key={event.id} event={event} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && editingEvent && (
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
                            className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                                    {editingEvent.id ? "Edit Event" : "Add New Event"}
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Event Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={editingEvent.title || ""}
                                            onChange={(e) =>
                                                setEditingEvent({ ...editingEvent, title: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                            placeholder="Enter event title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Calendar className="inline h-4 w-4 mr-1" />
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={editingEvent.date || ""}
                                            onChange={(e) =>
                                                setEditingEvent({ ...editingEvent, date: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Clock className="inline h-4 w-4 mr-1" />
                                            Time *
                                        </label>
                                        <input
                                            type="time"
                                            value={editingEvent.time || ""}
                                            onChange={(e) =>
                                                setEditingEvent({ ...editingEvent, time: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <MapPin className="inline h-4 w-4 mr-1" />
                                            Location *
                                        </label>
                                        <input
                                            type="text"
                                            value={editingEvent.location || ""}
                                            onChange={(e) =>
                                                setEditingEvent({ ...editingEvent, location: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                            placeholder="Enter event location"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Users className="inline h-4 w-4 mr-1" />
                                            Organizer *
                                        </label>
                                        <input
                                            type="text"
                                            value={editingEvent.organizer || ""}
                                            onChange={(e) =>
                                                setEditingEvent({ ...editingEvent, organizer: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                            placeholder="Enter organizer name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            value={editingEvent.category || "conference"}
                                            onChange={(e) =>
                                                setEditingEvent({
                                                    ...editingEvent,
                                                    category: e.target.value as Event["category"],
                                                })
                                            }
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            value={editingEvent.price || ""}
                                            onChange={(e) =>
                                                setEditingEvent({ ...editingEvent, price: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                            placeholder="Free or $XX"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <LinkIcon className="inline h-4 w-4 mr-1" />
                                            Event URL
                                        </label>
                                        <input
                                            type="url"
                                            value={editingEvent.url || ""}
                                            onChange={(e) =>
                                                setEditingEvent({ ...editingEvent, url: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <ImageUpload
                                            value={editingEvent.image || ""}
                                            onChange={(url) =>
                                                setEditingEvent({ ...editingEvent, image: url })
                                            }
                                            label="Event Image"
                                            placeholder="https://example.com/event-image.jpg"
                                            aspectRatio="landscape"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Tag className="inline h-4 w-4 mr-1" />
                                            Tags (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={editingEvent.tags || ""}
                                            onChange={(e) =>
                                                setEditingEvent({ ...editingEvent, tags: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                            placeholder="health, innovation, networking"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={editingEvent.description || ""}
                                            onChange={(e) =>
                                                setEditingEvent({ ...editingEvent, description: e.target.value })
                                            }
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent resize-none"
                                            placeholder="Enter event description..."
                                        />
                                    </div>
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
                                    disabled={isSaving || !editingEvent.title || !editingEvent.date}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-[#548cac] text-white text-sm font-semibold rounded-xl hover:bg-[#3d6a82] transition-colors disabled:opacity-50"
                                >
                                    {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {editingEvent.id ? "Update Event" : "Create Event"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AdminShell>
    )
}
