"use client"

import {
    Award,
    BookOpen,
    CalendarDays,
    ExternalLink,
    Loader2,
    Mic2,
} from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { AdminShell } from "../../../components/admin/AdminShell"

interface Stats {
    speakers: number
    keynotes: number
    scheduleItems: number
    breakouts: number
    panels: number
}

export default function AdminAgendaPage() {
    const [stats, setStats] = useState<Stats>({
        speakers: 0,
        keynotes: 0,
        scheduleItems: 0,
        breakouts: 0,
        panels: 0,
    })
    const [loading, setLoading] = useState(true)

    const fetchStats = useCallback(async () => {
        try {
            setLoading(true)
            const [speakersRes, scheduleRes] = await Promise.all([
                fetch("/api/admin/speakers"),
                fetch("/api/admin/schedule"),
            ])

            const speakersData = speakersRes.ok ? await speakersRes.json() : null
            const scheduleData = scheduleRes.ok ? await scheduleRes.json() : null

            const allSpeakers = speakersData?.speakers || []
            const allSchedule = scheduleData?.schedule || []

            setStats({
                speakers: allSpeakers.length,
                keynotes: allSpeakers.filter(
                    (s: { featured: boolean; keynoteType?: string }) =>
                        s.featured && s.keynoteType
                ).length,
                scheduleItems: allSchedule.length,
                breakouts: allSchedule.filter(
                    (s: { type?: string }) => s.type === "breakout"
                ).length,
                panels: allSchedule.filter(
                    (s: { type?: string }) => s.type === "panel"
                ).length,
            })
        } catch {
            // Stats will stay at 0
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchStats()
    }, [fetchStats])

    const statCards = [
        {
            label: "Total Speakers",
            value: stats.speakers,
            icon: Mic2,
            href: "/admin/speakers",
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
        {
            label: "Keynote Speakers",
            value: stats.keynotes,
            icon: Mic2,
            href: "/admin/speakers",
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            label: "Schedule Items",
            value: stats.scheduleItems,
            icon: CalendarDays,
            href: "/admin/schedule",
            color: "text-green-600",
            bg: "bg-green-50",
        },
        {
            label: "Breakout Sessions",
            value: stats.breakouts,
            icon: BookOpen,
            href: "/admin/schedule",
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
        {
            label: "Panel Sessions",
            value: stats.panels,
            icon: Award,
            href: "/admin/schedule",
            color: "text-rose-600",
            bg: "bg-rose-50",
        },
    ]

    return (
        <AdminShell
            title="Agenda Overview"
            description="Manage speakers, schedule, and sponsors that appear on the public agenda page."
        >
            {/* Stats Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-[#548cac]" />
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    {statCards.map((card) => (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-lg ${card.bg}`}
                                >
                                    <card.icon className={`w-4 h-4 ${card.color}`} />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                {card.value}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
                        </Link>
                    ))}
                </div>
            )}

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Link
                    href="/admin/speakers"
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow group"
                >
                    <div className="flex items-center gap-3">
                        <Mic2 className="w-5 h-5 text-[#548cac]" />
                        <span className="font-semibold text-gray-900">
                            Manage Speakers
                        </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#548cac] transition-colors" />
                </Link>
                <Link
                    href="/admin/schedule"
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow group"
                >
                    <div className="flex items-center gap-3">
                        <CalendarDays className="w-5 h-5 text-[#548cac]" />
                        <span className="font-semibold text-gray-900">
                            Manage Schedule
                        </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#548cac] transition-colors" />
                </Link>
                <Link
                    href="/admin/sponsors"
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow group"
                >
                    <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-[#548cac]" />
                        <span className="font-semibold text-gray-900">
                            Manage Sponsors
                        </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#548cac] transition-colors" />
                </Link>
            </div>

            {/* Public Page Link */}
            <div className="mt-6 text-center">
                <Link
                    href="/agenda"
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-[#548cac] hover:underline"
                >
                    <ExternalLink className="w-4 h-4" />
                    View Public Agenda Page
                </Link>
            </div>
        </AdminShell>
    )
}
