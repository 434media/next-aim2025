# Editable Text Content Reference

This document lists all editable text blocks available for inline editing by admins.

## How It Works

1. **Login** with your `@434media.com` Google account
2. **Toggle Edit Mode** using the floating toolbar at the bottom or press `⌘ + Shift + E`
3. **Click any highlighted text** to edit inline
4. **Save All Changes** when done

---

## Text ID Reference by Page

### Global (Appears on Multiple Pages)

| Text ID                 | Location          | Description                                                 |
| ----------------------- | ----------------- | ----------------------------------------------------------- |
| `footer-tagline`        | Footer            | Main tagline "Accelerating Innovation in Military Medicine" |
| `footer-mission`        | Footer            | Mission statement paragraph                                 |
| `venue-cta-title`       | Venue CTA Section | "Experience San Antonio" title                              |
| `venue-cta-description` | Venue CTA Section | Description of venue and city                               |

---

### Home Page

| Text ID                 | Location     | Description                                  |
| ----------------------- | ------------ | -------------------------------------------- |
| `hero-main-description` | Hero Section | Main paragraph describing the summit purpose |

---

### Contact Page

| Text ID                    | Location | Description                           |
| -------------------------- | -------- | ------------------------------------- |
| `contact-page-title`       | Hero     | "Get in touch" heading                |
| `contact-page-description` | Hero     | Description asking users to reach out |

---

### Travel & Venue Page

| Text ID                    | Location   | Description                        |
| -------------------------- | ---------- | ---------------------------------- |
| `travel-page-title`        | Hero       | "Explore San Antonio" heading      |
| `travel-page-subtitle`     | Hero       | Subtitle about history and culture |
| `travel-venue-name`        | Venue Card | Convention center name             |
| `travel-venue-description` | Venue Card | Description of the venue           |

---

### Speakers Page

| Text ID                    | Location   | Description                        |
| -------------------------- | ---------- | ---------------------------------- |
| `speakers-badge`           | Hero Badge | "AIM'25 Speaker Lineup" badge text |
| `speakers-title-highlight` | Hero Title | "Leaders" highlighted word         |
| `speakers-title-suffix`    | Hero Title | "Shaping Tomorrow" suffix          |
| `speakers-description`     | Hero       | Description of speakers            |

---

### Schedule Page

| Text ID                          | Location   | Description                         |
| -------------------------------- | ---------- | ----------------------------------- |
| `schedule-badge`                 | Hero Badge | "Interactive Summit Schedule" badge |
| `schedule-title`                 | Hero Title | "Your Summit" main title            |
| `schedule-subtitle`              | Hero Title | "Journey Awaits" subtitle           |
| `schedule-event-date`            | Info Card  | Event date                          |
| `schedule-event-date-label`      | Info Card  | "One Day of Innovation" label       |
| `schedule-event-location`        | Info Card  | "San Antonio, TX"                   |
| `schedule-event-venue`           | Info Card  | Convention center name              |
| `schedule-description`           | Hero       | Main description paragraph          |
| `schedule-stat-sessions`         | Stats Card | "20+ Sessions"                      |
| `schedule-stat-sessions-label`   | Stats Card | Sessions description                |
| `schedule-stat-tracks`           | Stats Card | "5+ Tracks"                         |
| `schedule-stat-tracks-label`     | Stats Card | Tracks description                  |
| `schedule-stat-networking`       | Stats Card | "All-Day Networking"                |
| `schedule-stat-networking-label` | Stats Card | Networking description              |

---

### Sponsors Page

| Text ID                     | Location | Description                   |
| --------------------------- | -------- | ----------------------------- |
| `sponsors-page-title`       | Hero     | "AIM'25 SPONSORS" heading     |
| `sponsors-page-description` | Hero     | Description of sponsors' role |

---

### Pre-Conference Symposiums Page

| Text ID                         | Location         | Description                           |
| ------------------------------- | ---------------- | ------------------------------------- |
| `symposiums-hero-title`         | Hero             | "Conference Symposiums" heading       |
| `symposiums-hero-description-1` | Hero             | First description paragraph           |
| `symposiums-hero-description-2` | Hero             | Second description paragraph          |
| `symposiums-archived-title`     | Archived Section | "Archived Symposiums" section heading |

---

### Poster Presenters Page

| Text ID                       | Location           | Description                           |
| ----------------------------- | ------------------ | ------------------------------------- |
| `posters-hero-title-1`        | Hero               | "Poster" (gradient text)              |
| `posters-hero-title-2`        | Hero               | "Presenters" (black text)             |
| `posters-hero-description`    | Hero               | Description about SURF                |
| `posters-section-title`       | Presenters Section | "AIM'25 Presenters" section heading   |
| `posters-section-description` | Presenters Section | Description of research presentations |

---

### AIM 2025 Page (Past Summit)

| Text ID                 | Location | Description                     |
| ----------------------- | -------- | ------------------------------- |
| `aim2025-hero-title-1`  | Hero     | "FROM THE" (first line of hero) |
| `aim2025-hero-title-2`  | Hero     | "BENCH" (blue accent text)      |
| `aim2025-hero-subtitle` | Hero     | "TO THE BATTLEFIELD" subtitle   |

---

## Adding New Editable Text

To make any text editable, wrap it with the `EditableText` component:

```tsx
import { EditableText } from "@/components/admin/EditableText"

// Basic usage
<EditableText textId="unique-text-id" page="page-name" section="section-name">
  Default fallback text here
</EditableText>

// For paragraphs (multiline)
<EditableText
  textId="unique-text-id"
  page="page-name"
  section="section-name"
  multiline
>
  Longer text content here...
</EditableText>
```

### Props

| Prop        | Required | Description                                  |
| ----------- | -------- | -------------------------------------------- |
| `textId`    | Yes      | Unique identifier (used as Firestore doc ID) |
| `children`  | Yes      | Default/fallback text                        |
| `page`      | No       | Page identifier for organization             |
| `section`   | No       | Section identifier for organization          |
| `as`        | No       | HTML element: "span", "p", "h1"-"h6", "div"  |
| `multiline` | No       | Enable textarea for paragraphs               |
| `className` | No       | Additional CSS classes                       |

---

## Firestore Structure

Text content is stored in the `siteText` collection:

```
siteText/
  └── {textId}/
      ├── textId: string
      ├── content: string
      ├── page: string
      ├── section: string
      ├── createdAt: timestamp
      ├── updatedAt: timestamp
      └── updatedBy: string (admin email)
```

---

## Keyboard Shortcuts

| Shortcut        | Action             |
| --------------- | ------------------ |
| `⌘ + Shift + E` | Toggle Edit Mode   |
| `Enter`         | Save (single-line) |
| `⌘ + Enter`     | Save (multiline)   |
| `Escape`        | Cancel editing     |

---

## Rich Text Editing (Phase 4)

For content requiring formatting (bold, italic, lists, headings, etc.), use the `RichEditableText` component:

```tsx
import RichEditableText from "@/components/admin/RichEditableText"

;<RichEditableText
  textId="my-rich-content"
  defaultContent="<p>Your default HTML content here</p>"
  className="prose"
/>
```

### RichEditableText Props

| Prop             | Required | Description                                  |
| ---------------- | -------- | -------------------------------------------- |
| `textId`         | Yes      | Unique identifier (used as Firestore doc ID) |
| `defaultContent` | Yes      | Default HTML content (fallback)              |
| `className`      | No       | Additional CSS classes                       |
| `placeholder`    | No       | Placeholder when empty                       |

### Rich Text Features

- **Text Formatting**: Bold, Italic, Underline, Strikethrough
- **Headings**: H1, H2, H3
- **Lists**: Bullet and Numbered
- **Block Elements**: Blockquotes, Code blocks, Horizontal rules
- **History**: Undo/Redo support
- **Inline Toolbar**: Formatting toolbar appears while editing
