"use client"

import {
    Calendar,
    Download,
    ExternalLink,
    Filter,
    Loader2,
    Mail,
    RefreshCw,
    Search,
    Tag,
    Trash2,
    X,
} from "lucide-react"
import { motion } from "motion/react"
import { useCallback, useEffect, useState } from "react"
import { AdminShell } from "../../../components/admin/AdminShell"

interface Subscriber {
    id: string
    email: string
    source?: string
    tags?: string[]
    pageUrl?: string
    created_at?: string
}

export default function NewsletterAdminPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([])
    const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [deletingId, setDeletingId] = useState<string | null>(null)

    // Date range filters
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [appliedStartDate, setAppliedStartDate] = useState("")
    const [appliedEndDate, setAppliedEndDate] = useState("")
    const [showFilters, setShowFilters] = useState(false)

    const loadSubscribers = useCallback(async (start?: string, end?: string) => {
        setIsLoading(true)
        setError(null)

        try {
            const params = new URLSearchParams()
            if (start) params.set("startDate", start)
            if (end) params.set("endDate", end)

            const url = `/api/admin/newsletter${params.toString() ? `?${params}` : ""}`
            const response = await fetch(url)
            const data = await response.json()

            if (data.success) {
                setSubscribers(data.subscribers)
                setFilteredSubscribers(data.subscribers)
            } else {
                setError(data.error || "Failed to load subscribers")
            }
        } catch {
            setError("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadSubscribers()
    }, [loadSubscribers])

    useEffect(() => {
        if (searchQuery) {
            const filtered = subscribers.filter(
                (sub) =>
                    sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    sub.source?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredSubscribers(filtered)
        } else {
            setFilteredSubscribers(subscribers)
        }
    }, [searchQuery, subscribers])

    const handleApplyFilters = () => {
        setAppliedStartDate(startDate)
        setAppliedEndDate(endDate)
        loadSubscribers(startDate, endDate)
    }

    const handleClearFilters = () => {
        setStartDate("")
        setEndDate("")
        setAppliedStartDate("")
        setAppliedEndDate("")
        loadSubscribers()
    }

    const hasActiveFilters = appliedStartDate || appliedEndDate

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this subscriber?")) return

        setDeletingId(id)

        try {
            const response = await fetch("/api/admin/newsletter", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
            const data = await response.json()

            if (data.success) {
                setSubscribers((prev) => prev.filter((sub) => sub.id !== id))
            } else {
                alert(data.error || "Failed to delete subscriber")
            }
        } catch {
            alert("An error occurred while deleting")
        } finally {
            setDeletingId(null)
        }
    }

    const handleExport = () => {
        // Build filename with date range if filters are applied
        let filename = "newsletter-subscribers-aim"
        if (appliedStartDate) {
            filename += `-from-${appliedStartDate}`
        }
        if (appliedEndDate) {
            filename += `-to-${appliedEndDate}`
        }
        filename += `-exported-${new Date().toISOString().split("T")[0]}.csv`

        const csv = [
            ["Email", "Source", "Tags", "Date Subscribed"].join(","),
            ...filteredSubscribers.map((sub) =>
                [
                    `"${sub.email}"`,
                    sub.source || "",
                    `"${sub.tags?.join("; ") || ""}"`,
                    sub.created_at
                        ? new Date(sub.created_at).toLocaleDateString()
                        : "",
                ].join(",")
            ),
        ].join("\n")

        const blob = new Blob([csv], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "—"
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    const formatDateRange = () => {
        if (!appliedStartDate && !appliedEndDate) return null
        if (appliedStartDate && appliedEndDate) {
            return `${formatDate(appliedStartDate)} — ${formatDate(appliedEndDate)}`
        }
        if (appliedStartDate) return `From ${formatDate(appliedStartDate)}`
        return `Until ${formatDate(appliedEndDate)}`
    }

    return (
        <AdminShell
            title="Newsletter Subscribers"
            description="AIM source email subscribers from the newsletter popup"
        >
            {/* Header Actions */}
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-3 border rounded-xl text-sm font-semibold transition-colors ${hasActiveFilters
                                ? "bg-[#548cac]/10 border-[#548cac] text-[#548cac]"
                                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline">
                                {hasActiveFilters ? "Filtered" : "Date Filter"}
                            </span>
                        </button>
                        <button
                            onClick={() => loadSubscribers(appliedStartDate, appliedEndDate)}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                            <span className="hidden sm:inline">Refresh</span>
                        </button>
                        <button
                            onClick={handleExport}
                            disabled={filteredSubscribers.length === 0}
                            className="flex items-center gap-2 px-4 py-3 bg-[#548cac] text-white rounded-xl text-sm font-semibold hover:bg-[#3d6a82] transition-colors disabled:opacity-50"
                        >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Export CSV</span>
                        </button>
                    </div>
                </div>

                {/* Date Range Filter Panel */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white border border-gray-200 rounded-xl p-4"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                                {hasActiveFilters && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                        Clear
                                    </button>
                                )}
                                <button
                                    onClick={handleApplyFilters}
                                    disabled={!startDate && !endDate}
                                    className="flex-1 sm:flex-none px-6 py-2.5 bg-[#548cac] text-white rounded-lg text-sm font-semibold hover:bg-[#3d6a82] transition-colors disabled:opacity-50"
                                >
                                    Apply Filter
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Active Filter Badge */}
                {hasActiveFilters && !showFilters && (
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Showing:</span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#548cac]/10 text-[#548cac] font-medium rounded-full">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDateRange()}
                            <button
                                onClick={handleClearFilters}
                                className="ml-1 hover:text-[#3d6a82]"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </span>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-6">
                <div className="bg-white rounded-xl px-5 py-3 ring-1 ring-gray-200 flex items-center gap-3">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Mail className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Total AIM</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{subscribers.length}</p>
                </div>
                {searchQuery && (
                    <div className="bg-white rounded-xl px-5 py-3 ring-1 ring-gray-200 flex items-center gap-3">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Search className="h-4 w-4" />
                            <span className="text-xs font-medium uppercase tracking-wide">Matching</span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">{filteredSubscribers.length}</p>
                    </div>
                )}
            </div>

            {/* Error State */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm font-medium text-red-700">
                    {error}
                    <button
                        onClick={() => loadSubscribers(appliedStartDate, appliedEndDate)}
                        className="ml-2 underline hover:no-underline"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Loading State */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#548cac]" />
                </div>
            ) : filteredSubscribers.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl ring-1 ring-gray-200">
                    <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-900">No subscribers found</p>
                    <p className="text-sm text-gray-500 mt-1">
                        {searchQuery || hasActiveFilters
                            ? "Try adjusting your search or date filters"
                            : "AIM newsletter signups will appear here"}
                    </p>
                </div>
            ) : (
                /* Subscribers Table */
                <div className="bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                        Source
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                        Tags
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                        Date
                                    </th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredSubscribers.map((subscriber, index) => (
                                    <motion.tr
                                        key={subscriber.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.02 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#548cac]/10 text-[#548cac]">
                                                    <Mail className="h-4 w-4" />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {subscriber.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                                                {subscriber.source || "Unknown"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <div className="flex items-center gap-1">
                                                <Tag className="h-3.5 w-3.5 text-gray-400" />
                                                <span className="text-xs text-gray-500">
                                                    {subscriber.tags?.join(", ") || "—"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell">
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{formatDate(subscriber.created_at)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {subscriber.pageUrl && (
                                                    <a
                                                        href={subscriber.pageUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 text-gray-400 hover:text-[#548cac] transition-colors"
                                                        title="View source page"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(subscriber.id)}
                                                    disabled={deletingId === subscriber.id}
                                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                                                    title="Delete subscriber"
                                                >
                                                    {deletingId === subscriber.id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </AdminShell>
    )
}
