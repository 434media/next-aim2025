import { generateOGImage } from "../../lib/og-image"

export const alt = "Speakers | AIM Health R&D Summit"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return generateOGImage({
        title: "Summit Speakers",
        subtitle: "Meet the thought leaders, innovators, and experts driving military health R&D forward",
    })
}
