import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Events",
    description:
        "Discover upcoming AIM Health R&D Summit events, workshops, symposiums, and networking opportunities connecting academia, industry, and military health researchers.",
    openGraph: {
        title: "Events | AIM Health R&D Summit",
        description:
            "Explore upcoming workshops, symposiums, and networking opportunities in military health R&D.",
        url: "/events",
        type: "website",
    },
    alternates: {
        canonical: "/events",
    },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return children
}
