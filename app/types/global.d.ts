interface TurnstileOptions {
  sitekey: string
  callback?: (token: string) => void
  "error-callback"?: () => void
  "expired-callback"?: () => void
  execution?: "render" | "execute"
}

interface Turnstile {
  render: (container: HTMLElement | string, options: TurnstileOptions) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
  getResponse: (widgetId?: string) => string | undefined
  execute: (widgetId?: string) => Promise<void>
  ready: (callback: () => void) => void
}

interface Window {
  turnstile: Turnstile
}

