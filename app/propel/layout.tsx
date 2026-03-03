import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "PROPEL Program",
    description:
        "The PROPEL program accelerates innovation through mentorship, networking, and resources for emerging health R&D leaders in the military health ecosystem.",
    openGraph: {
        title: "PROPEL Program | AIM Health R&D Summit",
        description:
            "Accelerating innovation through mentorship, networking, and resources for emerging health R&D leaders.",
        url: "/propel",
        type: "website",
    },
    alternates: {
        canonical: "/propel",
    },
}

export default function PropelLayout({ children }: { children: React.ReactNode }) {
    return children
}
