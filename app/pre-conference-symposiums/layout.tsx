import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Pre-Conference Symposiums",
    description:
        "Join expert-led pre-conference symposiums covering DOD and VA health research, commercialization, SME encounters, and emerging technologies before the AIM Health R&D Summit.",
    openGraph: {
        title: "Pre-Conference Symposiums | AIM Health R&D Summit",
        description:
            "Deep-dive symposiums leading up to the AIM Health R&D Summit — expert panels, workshops, and SME encounters.",
        url: "/pre-conference-symposiums",
        type: "website",
    },
    alternates: {
        canonical: "/pre-conference-symposiums",
    },
}

export default function PreConferenceLayout({ children }: { children: React.ReactNode }) {
    return children
}
