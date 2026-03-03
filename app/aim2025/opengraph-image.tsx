import { generateOGImage } from "../../lib/og-image"

export const alt = "AIM 2025 Recap | AIM Health R&D Summit"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return generateOGImage({
        title: "AIM 2025 Summit Recap",
        subtitle: "Highlights, keynotes, and breakthroughs from the 2025 Health R&D Summit in San Antonio",
    })
}
