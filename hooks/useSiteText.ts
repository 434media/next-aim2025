"use client"

import { useCallback, useEffect, useState } from "react"

interface SiteText {
    id: string
    textId: string
    content: string
    page?: string
    section?: string
}

interface UseSiteTextOptions {
    page?: string
}

interface UseSiteTextResult {
    getText: (textId: string, fallback: string) => string
    isLoading: boolean
    error: string | null
    refetch: () => Promise<void>
}

// Global cache for site text to avoid refetching
const textCache = new Map<string, string>()
let cacheInitialized = false
let cachePromise: Promise<void> | null = null

export function useSiteText(options: UseSiteTextOptions = {}): UseSiteTextResult {
    const [isLoading, setIsLoading] = useState(!cacheInitialized)
    const [error, setError] = useState<string | null>(null)
    const [, forceUpdate] = useState({})

    const fetchTexts = useCallback(async () => {
        // If already fetching, wait for existing promise
        if (cachePromise) {
            await cachePromise
            return
        }

        setIsLoading(true)
        setError(null)

        cachePromise = (async () => {
            try {
                const params = new URLSearchParams()
                if (options.page) {
                    params.set("page", options.page)
                }

                const response = await fetch(`/api/admin/site-text?${params.toString()}`)
                
                if (!response.ok) {
                    throw new Error("Failed to fetch site text")
                }

                const data = await response.json()

                if (data.success && data.texts) {
                    // Update cache with fetched texts
                    data.texts.forEach((text: SiteText) => {
                        textCache.set(text.textId, text.content)
                    })
                    cacheInitialized = true
                }
            } catch (err) {
                console.error("[useSiteText] Error:", err)
                setError(err instanceof Error ? err.message : "Failed to load text")
            } finally {
                setIsLoading(false)
                cachePromise = null
            }
        })()

        await cachePromise
    }, [options.page])

    // Initialize cache on mount
    useEffect(() => {
        if (!cacheInitialized) {
            fetchTexts()
        }
    }, [fetchTexts])

    const getText = useCallback((textId: string, fallback: string): string => {
        // Return cached text if available, otherwise fallback
        return textCache.get(textId) ?? fallback
    }, [])

    const refetch = useCallback(async () => {
        cacheInitialized = false
        textCache.clear()
        await fetchTexts()
        forceUpdate({})
    }, [fetchTexts])

    return {
        getText,
        isLoading,
        error,
        refetch,
    }
}

// Utility to update the cache locally (for optimistic updates)
export function updateTextCache(textId: string, content: string) {
    textCache.set(textId, content)
}

// Utility to clear the cache (useful after saving)
export function clearTextCache() {
    textCache.clear()
    cacheInitialized = false
}

// Hook to get a single text value with subscription to changes
export function useSiteTextValue(textId: string, fallback: string): {
    value: string
    isLoading: boolean
} {
    const { getText, isLoading } = useSiteText()
    return {
        value: getText(textId, fallback),
        isLoading,
    }
}
