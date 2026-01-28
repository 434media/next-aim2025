"use client"

import {
    signOut as firebaseSignOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    type User,
} from "firebase/auth"
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { auth, googleProvider } from "../lib/firebase"

interface AuthContextType {
    user: User | null
    loading: boolean
    signInWithEmail: (email: string, password: string) => Promise<void>
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
    error: string | null
    isConfigured: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper to create server-side session cookie
async function createServerSession(user: User) {
    try {
        const idToken = await user.getIdToken()
        const response = await fetch("/api/admin/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ idToken }),
        })
        if (!response.ok) {
            console.warn("[Auth] Failed to create server session")
        }
    } catch (error) {
        console.error("[Auth] Error creating server session:", error)
    }
}

// Helper to clear server-side session cookie
async function clearServerSession() {
    try {
        await fetch("/api/admin/session", {
            method: "DELETE",
            credentials: "include",
        })
    } catch (error) {
        console.error("[Auth] Error clearing server session:", error)
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const isConfigured = !!auth

    useEffect(() => {
        if (!auth) {
            setLoading(false)
            return
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user)
            setLoading(false)

            // Create server session when user logs in
            // Allow both @434media.com Google users and email/password authenticated users
            if (user) {
                await createServerSession(user)
            }
        })

        return () => unsubscribe()
    }, [])

    const signInWithEmail = async (email: string, password: string) => {
        if (!auth) {
            setError("Firebase not configured")
            throw new Error("Firebase not configured")
        }

        setError(null)
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to sign in"
            setError(message)
            throw err
        }
    }

    const signInWithGoogle = async () => {
        if (!auth || !googleProvider) {
            setError("Firebase not configured")
            throw new Error("Firebase not configured")
        }

        setError(null)
        try {
            const result = await signInWithPopup(auth, googleProvider)
            // Verify the user is from 434media.com domain
            const email = result.user.email
            if (email && !email.endsWith("@434media.com")) {
                await firebaseSignOut(auth)
                throw new Error("Access restricted to 434media.com accounts only")
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to sign in with Google"
            setError(message)
            throw err
        }
    }

    const signOut = async () => {
        if (!auth) {
            return
        }

        setError(null)
        try {
            // Clear server session first
            await clearServerSession()
            await firebaseSignOut(auth)
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to sign out"
            setError(message)
            throw err
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signInWithEmail,
                signInWithGoogle,
                signOut,
                error,
                isConfigured,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
