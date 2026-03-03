import { generateOGImage } from "../../lib/og-image"

export const alt = "PROPEL | AIM Health R&D Summit"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return generateOGImage({
        title: "PROPEL Program",
        subtitle: "Accelerating innovation through mentorship, networking, and resources for emerging health R&D leaders",
        accentColor: "#5a5a2c",
    })
}
