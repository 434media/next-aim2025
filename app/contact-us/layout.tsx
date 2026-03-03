import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with the AIM Health R&D Summit team. Reach out for partnership opportunities, sponsorship inquiries, speaker nominations, and general questions.",
    openGraph: {
        title: "Contact Us | AIM Health R&D Summit",
        description:
            "Get in touch with the AIM Health R&D Summit team for partnerships, sponsorships, and inquiries.",
        url: "/contact-us",
        type: "website",
    },
    alternates: {
        canonical: "/contact-us",
    },
}

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
    return children
}
