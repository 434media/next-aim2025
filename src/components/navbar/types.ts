import type { ReactNode } from "react"

export interface DropdownItem {
  name: string
  href: string
}

export interface MenuItem {
  name: string
  href?: string
  dropdown?: DropdownItem[]
}

export interface NewsItem {
  label: string
  href: string
}

export interface EventInfo {
  aim: {
    name: ReactNode
    date: string
  }
  venue: string
  location: string
}
