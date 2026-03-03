import { generateOGImage } from "../../lib/og-image"

export const alt = "Events | AIM Health R&D Summit"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return generateOGImage({
        title: "Upcoming Events",
        subtitle: "Explore upcoming workshops, symposiums, and networking opportunities in military health R&D",
    })
}
