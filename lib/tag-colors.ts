// Generate consistent random colors for tags
const tagColorCache = new Map<string, string>()

const colorVariants = [
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-purple-100 text-purple-700 border-purple-200",
  "bg-pink-100 text-pink-700 border-pink-200",
  "bg-rose-100 text-rose-700 border-rose-200",
  "bg-orange-100 text-orange-700 border-orange-200",
  "bg-amber-100 text-amber-700 border-amber-200",
  "bg-yellow-100 text-yellow-700 border-yellow-200",
  "bg-lime-100 text-lime-700 border-lime-200",
  "bg-green-100 text-green-700 border-green-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-teal-100 text-teal-700 border-teal-200",
  "bg-cyan-100 text-cyan-700 border-cyan-200",
  "bg-sky-100 text-sky-700 border-sky-200",
  "bg-indigo-100 text-indigo-700 border-indigo-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
]

// Simple hash function to generate consistent index from string
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

export function getTagColor(tag: string): string {
  if (tagColorCache.has(tag)) {
    return tagColorCache.get(tag)!
  }

  const index = hashString(tag) % colorVariants.length
  const color = colorVariants[index]
  tagColorCache.set(tag, color)
  return color
}
