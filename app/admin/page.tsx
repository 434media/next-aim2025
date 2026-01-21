"use client"

import { Award, Calendar, Loader2, Mail, MessageSquare, TrendingUp } from "lucide-react"
import { motion } from "motion/react"
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

const quickActions = [
    {
        title: "Add New Event",
        description: "Create a new event for the calendar",
        href: "/admin/events",
        icon: Calendar,
    },
    {
        title: "Manage Sponsors",
        description: "Update sponsor information and logos",
        href: "/admin/sponsors",
        icon: Award,
    },
    {
        title: "View Contacts",
        description: "Review recent contact form submissions",
        href: "/admin/contacts",
        icon: MessageSquare,
    },
]

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("/api/admin/stats")
                const data = await response.json()
                if (data.success) {
                    setStats(data.counts)
                }
            } catch (error) {
                console.error("Failed to fetch stats:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchStats()
    }, [])

    const statCards = [
        {
            name: "Newsletter Subscribers",
            value: stats?.newsletters ?? "—",
            icon: Mail,
            href: "/admin/newsletter",
            color: "bg-blue-500",
        },
        {
            name: "Contact Submissions",
            value: stats?.contacts ?? "—",
            subtext: stats?.newContacts ? `${stats.newContacts} new` : undefined,
            icon: MessageSquare,
            href: "/admin/contacts",
            color: "bg-green-500",
        },
        {
            name: "Active Events",
            value: stats?.upcomingEvents ?? "—",
            subtext: stats?.events ? `${stats.events} total` : undefined,
            icon: Calendar,
            href: "/admin/events",
            color: "bg-purple-500",
        },
        {
            name: "Sponsors",
            value: stats?.sponsors ?? "—",
            icon: Award,
            href: "/admin/sponsors",
            color: "bg-amber-500",
        },
    ]

    return (
        <AdminShell
            title="Dashboard"
            description="Welcome to the AIM Health R&D Admin Portal"
        >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link
                            href={stat.href}
                            className="block bg-white rounded-2xl p-6 ring-1 ring-gray-200 hover:ring-[#548cac] hover:shadow-sm transition-all group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} text-white`}
                                >
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                                ) : (
                                    <TrendingUp className="h-5 w-5 text-gray-400 group-hover:text-[#548cac] transition-colors" />
                                )}
                            </div>
                            <p className="text-3xl font-bold text-gray-900 tracking-tight">
                                {isLoading ? "—" : stat.value}
                            </p>
                            <p className="text-sm font-medium text-gray-500 mt-1">
                                {stat.name}
                            </p>
                            {stat.subtext && !isLoading && (
                                <p className="text-xs text-[#548cac] font-medium mt-1">
                                    {stat.subtext}
                                </p>
                            )}
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl ring-1 ring-gray-200 p-6"
            >
                <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-6">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action) => (
                        <Link
                            key={action.title}
                            href={action.href}
                            className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#548cac]/10 text-[#548cac] group-hover:bg-[#548cac] group-hover:text-white transition-colors">
                                <action.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">
                                    {action.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                    {action.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.div>

            {/* Recent Activity Placeholder */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 bg-white rounded-2xl ring-1 ring-gray-200 p-6"
            >
                <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">
                    Getting Started
                </h2>
                <div className="bg-gradient-to-br from-[#548cac]/5 to-[#4f4f2c]/5 rounded-xl p-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Welcome to the AIM Health R&D Summit admin portal. Use the sidebar
                        navigation to manage newsletter subscribers, contact form
                        submissions, events, and sponsors. All data is synced with your
                        Firebase Firestore database in real-time.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full bg-[#548cac]/10 px-3 py-1 text-xs font-semibold text-[#548cac]">
                            Firebase Connected
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            Admin Access Active
                        </span>
                    </div>
                </div>
            </motion.div>
        </AdminShell>
    )
}
