import { generateOGImage } from "../../lib/og-image"

export const alt = "Contact Us | AIM Health R&D Summit"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return generateOGImage({
        title: "Contact Us",
        subtitle: "Get in touch with the AIM Health R&D Summit team for partnerships, sponsorships, and inquiries",
    })
}
