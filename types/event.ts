export interface Event {
  id: string
  title: string
  description?: string
  date: string
  time: string
  location: string
  organizer: string
  image_url?: string
  tags: string[]
  event_url?: string
  is_past: boolean
  created_at?: string
  updated_at?: string
}
