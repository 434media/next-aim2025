"use client"

import { AuthProvider } from "../contexts/AuthContext"
import { EditModeProvider } from "../contexts/EditModeContext"
import { EditModeToolbar } from "./admin/EditModeToolbar"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <EditModeProvider>
                {children}
                <EditModeToolbar />
            </EditModeProvider>
        </AuthProvider>
    )
}
