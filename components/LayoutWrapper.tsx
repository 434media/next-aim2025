"use client"

import { usePathname } from "next/navigation"
import type React from "react"

interface LayoutWrapperProps {
    children: React.ReactNode
    navbar: React.ReactNode
    footer: React.ReactNode
}

export function LayoutWrapper({ children, navbar, footer }: LayoutWrapperProps) {
    const pathname = usePathname()
    const isAdminRoute = pathname?.startsWith("/admin")

    if (isAdminRoute) {
        return <>{children}</>
    }

    return (
        <>
            {navbar}
            {children}
            {footer}
        </>
    )
}
