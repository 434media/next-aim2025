"use client"

import {
    Archive,
    Calendar,
    CheckCircle,
    Clock,
    Loader2,
    Mail,
    MessageCircle,
    MessageSquare,
    Phone,
    RefreshCw,
    Search,
    Send,
    Trash2,
    User
} from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { AdminShell } from "../../../components/admin/AdminShell"
import { useAuth } from "../../../contexts/AuthContext"

interface Comment {
    id: string
    text: string
    author: string
    authorEmail: string
    created_at: string
}

interface Contact {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber?: string
    message: string
    status?: "new" | "reviewed" | "archived"
    created_at?: string
    comments?: Comment[]
}

export default function ContactsAdminPage() {
    const { user } = useAuth()
    const [contacts, setContacts] = useState<Contact[]>([])
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [newComment, setNewComment] = useState("")
    const [isAddingComment, setIsAddingComment] = useState(false)

    useEffect(() => {
        loadContacts()
    }, [])

    useEffect(() => {
        let filtered = contacts

        if (searchQuery) {
            filtered = filtered.filter(
                (contact) =>
                    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    contact.message.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter((contact) => contact.status === statusFilter)
        }

        setFilteredContacts(filtered)
    }, [searchQuery, statusFilter, contacts])

    const loadContacts = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/admin/contacts")
            const data = await response.json()

            if (data.success) {
                setContacts(data.contacts)
                setFilteredContacts(data.contacts)
            } else {
                setError(data.error || "Failed to load contacts")
            }
        } catch {
            setError("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleStatusChange = async (id: string, status: string) => {
        setUpdatingId(id)

        try {
            const response = await fetch("/api/admin/contacts", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            })
            const data = await response.json()

            if (data.success) {
                setContacts((prev) =>
                    prev.map((contact) =>
                        contact.id === id ? { ...contact, status: status as Contact["status"] } : contact
                    )
                )
            } else {
                alert(data.error || "Failed to update contact")
            }
        } catch {
            alert("An error occurred while updating")
        } finally {
            setUpdatingId(null)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this contact?")) return

        setDeletingId(id)

        try {
            const response = await fetch("/api/admin/contacts", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
            const data = await response.json()

            if (data.success) {
                setContacts((prev) => prev.filter((contact) => contact.id !== id))
                if (selectedContact?.id === id) {
                    setSelectedContact(null)
                }
            } else {
                alert(data.error || "Failed to delete contact")
            }
        } catch {
            alert("An error occurred while deleting")
        } finally {
            setDeletingId(null)
        }
    }

    const handleAddComment = async () => {
        if (!selectedContact || !newComment.trim()) return

        setIsAddingComment(true)

        try {
            const response = await fetch("/api/admin/contacts", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: selectedContact.id,
                    comment: newComment.trim(),
                    authorName: user?.displayName || user?.email?.split("@")[0] || "Admin",
                    authorEmail: user?.email || "admin@aimsummit.org",
                }),
            })
            const data = await response.json()

            if (data.success) {
                // Update local state with new comment
                const updatedContact = {
                    ...selectedContact,
                    comments: [...(selectedContact.comments || []), data.comment],
                }
                setSelectedContact(updatedContact)
                setContacts((prev) =>
                    prev.map((contact) =>
                        contact.id === selectedContact.id ? updatedContact : contact
                    )
                )
                setNewComment("")
            } else {
                alert(data.error || "Failed to add comment")
            }
        } catch {
            alert("An error occurred while adding comment")
        } finally {
            setIsAddingComment(false)
        }
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "—"
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        })
    }

    const getStatusIcon = (status?: string) => {
        switch (status) {
            case "reviewed":
                return <CheckCircle className="h-4 w-4 text-green-500" />
            case "archived":
                return <Archive className="h-4 w-4 text-gray-400" />
            default:
                return <Clock className="h-4 w-4 text-amber-500" />
        }
    }

    const getStatusBadge = (status?: string) => {
        switch (status) {
            case "reviewed":
                return "bg-green-50 text-green-700"
            case "archived":
                return "bg-gray-100 text-gray-600"
            default:
                return "bg-amber-50 text-amber-700"
        }
    }

    return (
        <AdminShell
            title="Contact Submissions"
            description="View and manage contact form submissions"
        >
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                    >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="archived">Archived</option>
                    </select>
                    <button
                        onClick={loadContacts}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Total</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 text-amber-500 mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">New</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        {contacts.filter((c) => !c.status || c.status === "new").length}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-4 ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 text-green-500 mb-1">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Reviewed</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        {contacts.filter((c) => c.status === "reviewed").length}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-4 ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Archive className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Archived</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        {contacts.filter((c) => c.status === "archived").length}
                    </p>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm font-medium text-red-700">
                    {error}
                    <button
                        onClick={loadContacts}
                        className="ml-2 underline hover:no-underline"
                    >
                        Try again
                    </button>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Contacts List */}
                <div className="flex-1">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-[#548cac]" />
                        </div>
                    ) : filteredContacts.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl ring-1 ring-gray-200">
                            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-lg font-semibold text-gray-900">No contacts found</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {searchQuery
                                    ? "Try adjusting your search query"
                                    : "Contact submissions will appear here"}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl ring-1 ring-gray-200 divide-y divide-gray-100">
                            {filteredContacts.map((contact, index) => (
                                <motion.div
                                    key={contact.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                    onClick={() => setSelectedContact(contact)}
                                    className={`p-4 cursor-pointer transition-colors ${selectedContact?.id === contact.id
                                        ? "bg-[#548cac]/5"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3 min-w-0">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#548cac]/10 text-[#548cac] flex-shrink-0">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="text-sm font-semibold text-gray-900">
                                                        {contact.firstName} {contact.lastName}
                                                    </h3>
                                                    <span
                                                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusBadge(
                                                            contact.status
                                                        )}`}
                                                    >
                                                        {getStatusIcon(contact.status)}
                                                        {contact.status || "new"}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5">{contact.email}</p>
                                                <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                                                    {contact.message}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className="text-xs text-gray-400 hidden sm:block">
                                                {formatDate(contact.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Contact Detail Panel */}
                {selectedContact && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full lg:w-96 bg-white rounded-2xl ring-1 ring-gray-200 p-6 h-fit lg:sticky lg:top-24"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#548cac] text-white">
                                    <User className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {selectedContact.firstName} {selectedContact.lastName}
                                    </h3>
                                    <span
                                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusBadge(
                                            selectedContact.status
                                        )}`}
                                    >
                                        {getStatusIcon(selectedContact.status)}
                                        {selectedContact.status || "new"}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedContact(null)}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors lg:hidden"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Email</p>
                                    <a
                                        href={`mailto:${selectedContact.email}`}
                                        className="text-sm font-semibold text-[#548cac] hover:underline"
                                    >
                                        {selectedContact.email}
                                    </a>
                                </div>
                            </div>

                            {selectedContact.phoneNumber && (
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Phone</p>
                                        <a
                                            href={`tel:${selectedContact.phoneNumber}`}
                                            className="text-sm font-semibold text-gray-900"
                                        >
                                            {selectedContact.phoneNumber}
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Submitted</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {formatDate(selectedContact.created_at)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Message</h4>
                            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">
                                {selectedContact.message}
                            </p>
                        </div>

                        {/* Admin Comments Section */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <MessageCircle className="h-4 w-4 text-gray-500" />
                                <h4 className="text-sm font-semibold text-gray-900">Admin Comments</h4>
                                <span className="text-xs text-gray-400">({selectedContact.comments?.length || 0})</span>
                            </div>

                            {/* Existing Comments */}
                            <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                                {selectedContact.comments && selectedContact.comments.length > 0 ? (
                                    selectedContact.comments.map((comment) => (
                                        <div key={comment.id} className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                                            <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-xs font-medium text-blue-600">{comment.author}</span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(comment.created_at).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-400 italic">No comments yet</p>
                                )}
                            </div>

                            {/* Add Comment Form */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault()
                                            handleAddComment()
                                        }
                                    }}
                                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#548cac] focus:border-transparent"
                                />
                                <button
                                    onClick={handleAddComment}
                                    disabled={isAddingComment || !newComment.trim()}
                                    className="flex items-center justify-center px-3 py-2 bg-[#548cac] text-white rounded-lg hover:bg-[#3e6a82] transition-colors disabled:opacity-50"
                                >
                                    {isAddingComment ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Update Status
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleStatusChange(selectedContact.id, "reviewed")}
                                    disabled={updatingId === selectedContact.id}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors disabled:opacity-50"
                                >
                                    <CheckCircle className="h-4 w-4" />
                                    Reviewed
                                </button>
                                <button
                                    onClick={() => handleStatusChange(selectedContact.id, "archived")}
                                    disabled={updatingId === selectedContact.id}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
                                >
                                    <Archive className="h-4 w-4" />
                                    Archive
                                </button>
                            </div>
                            <button
                                onClick={() => handleDelete(selectedContact.id)}
                                disabled={deletingId === selectedContact.id}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors disabled:opacity-50 mt-4"
                            >
                                {deletingId === selectedContact.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="h-4 w-4" />
                                )}
                                Delete
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </AdminShell>
    )
}
