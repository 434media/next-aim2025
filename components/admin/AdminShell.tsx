"use client"

import {
    ArrowLeft,
    Award,
    Calendar,
    CalendarDays,
    ChevronRight,
    Home,
    Loader2,
    LogOut,
    Mail,
    Menu,
    MessageSquare,
    Mic2,
    User,
    X,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"

const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Newsletter Emails", href: "/admin/newsletter", icon: Mail },
    { name: "Contact Submissions", href: "/admin/contacts", icon: MessageSquare },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Speakers", href: "/admin/speakers", icon: Mic2 },
    { name: "Schedule", href: "/admin/schedule", icon: CalendarDays },
    { name: "Sponsors", href: "/admin/sponsors", icon: Award },
]

interface AdminShellProps {
    children: React.ReactNode
    title: string
    description?: string
}

export function AdminShell({ children, title, description }: AdminShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { user, loading, signOut } = useAuth()

    useEffect(() => {
        if (!loading && !user) {
            router.push("/admin/login")
        }
    }, [user, loading, router])

    const handleSignOut = async () => {
        await signOut()
        router.push("/admin/login")
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-[#548cac]" />
                    <p className="text-base font-medium text-gray-600 tracking-tight">
                        Loading...
                    </p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Mobile sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:hidden"
                    >
                        <div className="flex h-full flex-col">
                            {/* Sidebar header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                                    AIM Admin
                                </h2>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 -mr-2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Back to main site */}
                            <div className="px-4 pt-4">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 hover:text-[#548cac] hover:bg-gray-50 rounded-xl transition-all"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    <span>Back to Main Site</span>
                                </Link>
                            </div>

                            {/* Navigation */}
                            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                                                ? "bg-[#548cac] text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.name}</span>
                                            {isActive && (
                                                <ChevronRight className="h-4 w-4 ml-auto" />
                                            )}
                                        </Link>
                                    )
                                })}
                            </nav>

                            {/* User section */}
                            <div className="px-4 py-4 border-t border-gray-100">
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#548cac] text-white">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                            {user?.displayName || "Admin"}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Sign out</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
                <div className="flex h-full flex-col bg-white border-r border-gray-200">
                    {/* Sidebar header */}
                    <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#548cac]">
                            <span className="text-lg font-bold text-white">A</span>
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-gray-900 tracking-tight">
                                AIM Health R&D
                            </h2>
                            <p className="text-xs text-gray-500 font-medium">Admin Portal</p>
                        </div>
                    </div>

                    {/* Back to main site */}
                    <div className="px-4 pt-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 hover:text-[#548cac] hover:bg-gray-50 rounded-xl transition-all"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back to Main Site</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                                        ? "bg-[#548cac] text-white shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                    {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User section */}
                    <div className="px-4 py-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#548cac] text-white">
                                <User className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    {user?.displayName || "Admin"}
                                </p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-72">
                {/* Top bar */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm px-4 sm:px-6">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -ml-2 text-gray-500 hover:text-gray-700 lg:hidden transition-colors"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-sm text-gray-500 font-medium">{description}</p>
                        )}
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    )
}
