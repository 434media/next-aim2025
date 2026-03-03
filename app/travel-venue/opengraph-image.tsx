import { generateOGImage } from "../../lib/og-image"

export const alt = "Travel & Venue | AIM Health R&D Summit"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return generateOGImage({
        title: "Travel & Venue",
        subtitle: "Henry B. González Convention Center, San Antonio, TX — accommodations, directions, and local info",
    })
}
