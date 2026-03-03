import { generateOGImage } from "../lib/og-image"

export const alt = "AIM Health R&D Summit"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return generateOGImage({
        title: "AIM Health R&D Summit",
        subtitle:
            "Academia, Industry & Military Researchers Promoting Cross-Sector Collaboration in Life-Saving Innovations",
    })
}
