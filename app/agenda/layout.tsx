import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Agenda | AIM Health R&D Summit 2026",
    description:
        "Explore the full AIM 2026 agenda — keynote sessions, breakout seminars, innovation funding, and more at the Health R&D Summit in San Antonio.",
    openGraph: {
        title: "AIM 2026 Agenda | AIM Health R&D Summit",
        description:
            "Keynotes, breakout seminars, innovation capital sessions, and more at the AIM Health R&D Summit 2026.",
        url: "/agenda",
        type: "website",
        siteName: "AIM Health R&D Summit",
        locale: "en_US",
    },
    alternates: {
        canonical: "/agenda",
    },
}

export default function AgendaLayout({ children }: { children: React.ReactNode }) {
    return children
}
