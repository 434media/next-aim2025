import { generateOGImage } from "../../lib/og-image"

export const alt = "Schedule | AIM Health R&D Summit"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return generateOGImage({
        title: "Summit Schedule",
        subtitle: "Complete agenda: keynotes, panels, workshops, and networking events at the AIM Health R&D Summit",
    })
}
