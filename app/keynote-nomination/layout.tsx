import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Keynote Speaker Nomination",
    description:
        "Nominate a thought leader, innovator, or researcher to deliver a keynote address at the AIM Health R&D Summit. Help shape the conversation in military health innovation.",
    openGraph: {
        title: "Keynote Speaker Nomination | AIM Health R&D Summit",
        description:
            "Nominate a thought leader to speak at the AIM Health R&D Summit.",
        url: "/keynote-nomination",
        type: "website",
    },
    alternates: {
        canonical: "/keynote-nomination",
    },
}

export default function KeynoteNominationLayout({ children }: { children: React.ReactNode }) {
    return children
}
