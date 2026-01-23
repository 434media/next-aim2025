"use client"

import { RiArrowDownSLine } from "@remixicon/react"
import { AnimatePresence, motion } from "motion/react"
import * as React from "react"
import { cn } from "../../lib/utils"

interface AccordionItemProps {
    title: React.ReactNode
    children: React.ReactNode
    isOpen?: boolean
    onToggle?: () => void
    badge?: React.ReactNode
    className?: string
}

export function AccordionItem({
    title,
    children,
    isOpen = false,
    onToggle,
    badge,
    className,
}: AccordionItemProps) {
    return (
        <div
            className={cn(
                "border border-neutral-200 rounded-2xl overflow-hidden transition-all duration-300",
                isOpen ? "shadow-lg bg-white" : "shadow-sm bg-white hover:shadow-md",
                className
            )}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    {badge && <div className="flex-shrink-0">{badge}</div>}
                    <div className="font-semibold text-lg md:text-xl text-neutral-900 truncate">
                        {title}
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0 ml-4"
                >
                    <RiArrowDownSLine
                        className={cn(
                            "w-6 h-6 transition-colors",
                            isOpen ? "text-sky-600" : "text-neutral-400"
                        )}
                    />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-0 border-t border-neutral-100">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

interface AccordionProps {
    children: React.ReactNode
    type?: "single" | "multiple"
    defaultValue?: string | string[]
    className?: string
}

interface AccordionContextValue {
    openItems: Set<string>
    toggleItem: (id: string) => void
    type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

export function Accordion({
    children,
    type = "single",
    defaultValue,
    className,
}: AccordionProps) {
    const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
        if (defaultValue) {
            return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue])
        }
        return new Set()
    })

    const toggleItem = React.useCallback((id: string) => {
        setOpenItems((prev) => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                if (type === "single") {
                    next.clear()
                }
                next.add(id)
            }
            return next
        })
    }, [type])

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
            <div className={cn("space-y-4", className)}>{children}</div>
        </AccordionContext.Provider>
    )
}

interface AccordionItemWrapperProps {
    id: string
    title: React.ReactNode
    children: React.ReactNode
    badge?: React.ReactNode
    className?: string
}

export function AccordionItemWrapper({
    id,
    title,
    children,
    badge,
    className,
}: AccordionItemWrapperProps) {
    const context = React.useContext(AccordionContext)

    if (!context) {
        throw new Error("AccordionItemWrapper must be used within an Accordion")
    }

    const { openItems, toggleItem } = context
    const isOpen = openItems.has(id)

    return (
        <AccordionItem
            title={title}
            isOpen={isOpen}
            onToggle={() => toggleItem(id)}
            badge={badge}
            className={className}
        >
            {children}
        </AccordionItem>
    )
}
