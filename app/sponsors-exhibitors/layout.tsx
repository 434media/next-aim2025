import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sponsors & Exhibitors",
    description:
        "Meet the sponsors and exhibitors supporting the AIM Health R&D Summit — leading organizations driving cross-sector collaboration in military health research and development.",
    openGraph: {
        title: "Sponsors & Exhibitors | AIM Health R&D Summit",
        description:
            "Our partners driving cross-sector collaboration in military health research and development.",
        url: "/sponsors-exhibitors",
        type: "website",
    },
    alternates: {
        canonical: "/sponsors-exhibitors",
    },
}

export default function SponsorsLayout({ children }: { children: React.ReactNode }) {
    return children
}
