import { generateOGImage } from "../../lib/og-image"

export const alt = "Pre-Conference Symposiums | AIM Health R&D Summit"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return generateOGImage({
        title: "Pre-Conference Symposiums",
        subtitle: "Deep-dive symposiums leading up to the AIM Health R&D Summit — expert panels, workshops, and SME encounters",
    })
}
