import { generateOGImage } from "../../lib/og-image"

export const alt = "Keynote Nomination | AIM Health R&D Summit"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return generateOGImage({
        title: "Keynote Speaker Nomination",
        subtitle: "Nominate a thought leader to speak at the AIM Health R&D Summit",
    })
}
