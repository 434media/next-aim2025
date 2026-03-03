import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Travel & Venue",
    description:
        "Plan your trip to the AIM Health R&D Summit at the Henry B. González Convention Center in San Antonio, TX. Find hotel accommodations, directions, parking, and local attractions.",
    openGraph: {
        title: "Travel & Venue | AIM Health R&D Summit",
        description:
            "Henry B. González Convention Center, San Antonio, TX — accommodations, directions, and local info.",
        url: "/travel-venue",
        type: "website",
    },
    alternates: {
        canonical: "/travel-venue",
    },
}

export default function TravelVenueLayout({ children }: { children: React.ReactNode }) {
    return children
}
