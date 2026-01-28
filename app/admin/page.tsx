"use client"

import {
  AlertCircle,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  RefreshCw,
  User,
} from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AdminShell } from "../../components/admin/AdminShell"

interface Stats {
  newsletters: number
  contacts: number
  newContacts: number
  events: number
  upcomingEvents: number
  sponsors: number
}

interface RecentContact {
  id: string
  name: string
  email: string
  message: string
  status: string
  created_at?: string
}

interface RecentSubscriber {
  id: string
  email: string
  created_at?: string
}

interface UpcomingEvent {
  id: string
  title: string
  date: string
  location: string
  category?: string
}

interface Sponsor {
  id: string
  name: string
  src: string
}

interface DashboardData {
  counts: Stats
  recentActivity: {
    contacts: RecentContact[]
    subscribers: RecentSubscriber[]
    upcomingEvents: UpcomingEvent[]
  }
  sponsors: Sponsor[]
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/stats")
      const result = await response.json()
      if (result.success) {
        setData(result)
      } else {
        setError(result.error || "Failed to fetch data")
      }
    } catch {
      setError("Failed to connect to the server")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatRelativeTime = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return formatDate(dateString)
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "reviewed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "archived":
        return "bg-slate-100 text-slate-600 border-slate-200"
      default:
        return "bg-amber-50 text-amber-700 border-amber-200"
    }
  }

  const statCards = [
    {
      name: "Newsletter Subscribers",
      value: data?.counts.newsletters ?? 0,
      icon: Mail,
      href: "/admin/newsletter",
      color: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "Contact Submissions",
      value: data?.counts.contacts ?? 0,
      badge: data?.counts.newContacts ? `${data.counts.newContacts} new` : undefined,
      badgeColor: "bg-amber-500",
      icon: MessageSquare,
      href: "/admin/contacts",
      color: "from-emerald-500 to-emerald-600",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      name: "Upcoming Events",
      value: data?.counts.upcomingEvents ?? 0,
      badge: data?.counts.events ? `${data.counts.events} total` : undefined,
      badgeColor: "bg-slate-500",
      icon: Calendar,
      href: "/admin/events",
      color: "from-violet-500 to-violet-600",
      bgLight: "bg-violet-50",
      textColor: "text-violet-600",
    },
    {
      name: "Sponsors",
      value: data?.counts.sponsors ?? 0,
      icon: Award,
      href: "/admin/sponsors",
      color: "from-amber-500 to-amber-600",
      bgLight: "bg-amber-50",
      textColor: "text-amber-600",
    },
  ]

  return (
    <AdminShell
      title="Dashboard"
      description="AIM Health R&D Summit Admin Portal"
    >
      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
        >
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          <p className="text-sm font-medium text-red-700 flex-1">{error}</p>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-100 rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={stat.href}
              className="group block bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br ${stat.color} text-white shadow-lg shadow-slate-200`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                {stat.badge && (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold text-white ${stat.badgeColor}`}>
                    {stat.badge}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-slate-900 tracking-tight leading-none">
                  {isLoading ? (
                    <span className="inline-block w-12 h-8 bg-slate-200 rounded animate-pulse" />
                  ) : (
                    stat.value.toLocaleString()
                  )}
                </p>
                <p className="text-sm font-medium text-slate-500 leading-tight">
                  {stat.name}
                </p>
              </div>
              <div className="mt-4 flex items-center text-sm font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                <span>View all</span>
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Contacts - Takes 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Recent Contact Submissions
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Latest messages from the contact form
              </p>
            </div>
            <Link
              href="/admin/contacts"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {isLoading ? (
              <div className="p-6 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : data?.recentActivity.contacts.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-500">No contacts yet</p>
              </div>
            ) : (
              data?.recentActivity.contacts.map((contact) => (
                <Link
                  key={contact.id}
                  href="/admin/contacts"
                  className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-slate-900">
                        {contact.name}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(contact.status)}`}>
                        {contact.status === "new" && <Clock className="h-3 w-3 mr-1" />}
                        {contact.status === "reviewed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 truncate mt-0.5">
                      {contact.email}
                    </p>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {contact.message}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-slate-400 shrink-0">
                    {formatRelativeTime(contact.created_at)}
                  </span>
                </Link>
              ))
            )}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Next scheduled events
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {isLoading ? (
              <div className="p-6 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : data?.recentActivity.upcomingEvents.length === 0 ? (
              <div className="p-8 text-center">
                <Calendar className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-500">No upcoming events</p>
                <Link
                  href="/admin/events"
                  className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-violet-600 hover:text-violet-700"
                >
                  Add an event
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              data?.recentActivity.upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href="/admin/events"
                  className="block px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {event.title}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(event.date)}
                    </span>
                    {event.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.location}
                      </span>
                    )}
                  </div>
                  {event.category && (
                    <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200">
                      {event.category}
                    </span>
                  )}
                </Link>
              ))
            )}
          </div>
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
            <Link
              href="/admin/events"
              className="flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Manage events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Recent Newsletter Signups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Recent Subscribers
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Latest newsletter signups
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {isLoading ? (
              <div className="p-6 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : data?.recentActivity.subscribers.length === 0 ? (
              <div className="p-8 text-center">
                <Mail className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-500">No subscribers yet</p>
              </div>
            ) : (
              data?.recentActivity.subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between px-6 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 truncate">
                      {subscriber.email}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 shrink-0 ml-2">
                    {formatRelativeTime(subscriber.created_at)}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
            <Link
              href="/admin/newsletter"
              className="flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              View all subscribers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Sponsors Preview - Takes 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Summit Sponsors
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Current sponsor partners
              </p>
            </div>
            <Link
              href="/admin/sponsors"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Manage
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : data?.sponsors.length === 0 ? (
              <div className="text-center py-8">
                <Award className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-500">No sponsors added yet</p>
                <Link
                  href="/admin/sponsors"
                  className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-amber-600 hover:text-amber-700"
                >
                  Add a sponsor
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {data?.sponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="flex items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100 h-20"
                  >
                    {sponsor.src ? (
                      <Image
                        src={sponsor.src}
                        alt={sponsor.name}
                        width={120}
                        height={48}
                        className="max-h-12 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-sm font-medium text-slate-500">
                        {sponsor.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Links Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Need to make changes to the live site?
            </h3>
            <p className="text-sm text-slate-400 mt-1 leading-relaxed">
              All changes made here sync automatically with the AIM Summit website.
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-900 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors shrink-0"
          >
            View Live Site
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </AdminShell>
  )
}
