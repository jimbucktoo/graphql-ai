# GraphQLAI Design System

All design decisions, tokens, and component specs for the GraphQLAI app.

---

## Tokens (CSS Custom Properties)

Defined in `src/styles/tokens.css`. Import that file; never use raw values in components.

### Color Palette

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#080B10` | Page background |
| `--color-surface` | `#0D1117` | Cards, panels |
| `--color-surface-hover` | `#161B22` | Hovered surfaces |
| `--color-surface-elevated` | `#1C2128` | Inputs, elevated cards |
| `--color-border` | `#21262D` | Subtle borders |
| `--color-border-strong` | `#30363D` | Input borders, dividers |
| `--color-primary` | `#60A5FA` | Primary actions, accents — **7.9:1 contrast on bg** |
| `--color-primary-hover` | `#93C5FD` | Hovered primary |
| `--color-primary-active` | `#3B82F6` | Pressed/active primary |
| `--color-primary-subtle` | `rgba(96,165,250,.08)` | Tinted backgrounds |
| `--color-primary-ring` | `rgba(96,165,250,.25)` | Focus rings |
| `--color-accent` | `#A78BFA` | Gradient pair with primary |
| `--color-text-primary` | `#E6EDF3` | Body text — **12.7:1 on bg** |
| `--color-text-secondary` | `#7D8590` | Labels, hints |
| `--color-text-tertiary` | `#484F58` | Placeholders, disabled |
| `--color-text-on-primary` | `#080B10` | Text on primary button |
| `--color-error` | `#F85149` | Error states — **5.7:1 on surface** |
| `--color-error-subtle` | `rgba(248,81,73,.10)` | Error backgrounds |
| `--color-error-border` | `rgba(248,81,73,.30)` | Error borders |
| `--color-success` | `#3FB950` | Success states — **7.4:1 on surface** |
| `--color-warning` | `#D29922` | Warning states |

All contrast ratios meet or exceed WCAG AA (4.5:1 for normal text, 3:1 for large text).

### Typography

| Token | Value | Use |
|---|---|---|
| `--font-display` | Space Grotesk | Headings, brand name, card titles |
| `--font-body` | Inter | Body text, labels, buttons |
| `--font-mono` | Fira Code | Code, `kbd` elements |

#### Type Scale

| Token | Value | Pixels |
|---|---|---|
| `--text-xs` | 0.75rem | 12px |
| `--text-sm` | 0.875rem | 14px |
| `--text-base` | 1rem | 16px |
| `--text-lg` | 1.125rem | 18px |
| `--text-xl` | 1.25rem | 20px |
| `--text-2xl` | 1.5rem | 24px |
| `--text-3xl` | 1.875rem | 30px |
| `--text-4xl` | 2.25rem | 36px |

### Spacing (8px grid)

| Token | Value | Pixels |
|---|---|---|
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem | 16px |
| `--space-5` | 1.25rem | 20px |
| `--space-6` | 1.5rem | 24px |
| `--space-8` | 2rem | 32px |
| `--space-10` | 2.5rem | 40px |
| `--space-12` | 3rem | 48px |
| `--space-16` | 4rem | 64px |
| `--space-20` | 5rem | 80px |

### Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | `kbd`, small chips |
| `--radius-md` | 8px | Inputs, buttons |
| `--radius-lg` | 12px | Error banners |
| `--radius-xl` | 16px | Cards, form section |
| `--radius-full` | 9999px | Spinner, pills |

### Elevation / Shadows

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,.4)` | Subtle elements |
| `--shadow-md` | `0 4px 6px / 0 1px 3px` | Cards, panels |
| `--shadow-lg` | `0 10px 15px / 0 4px 6px` | Hovered cards |
| `--shadow-xl` | `0 20px 25px / 0 10px 10px` | Modals, overlays |
| `--shadow-glow` | `0 0 20px rgba(primary,.15)` | Focus glows |

### Transitions

| Token | Value | Use |
|---|---|---|
| `--transition-fast` | 100ms ease | Micro interactions (scale, active) |
| `--transition-base` | 150ms ease | Hover state changes |
| `--transition-slow` | 200ms ease | Logo filter, card hover |
| `--transition-reveal` | 300ms cubic-bezier(0.4,0,0.2,1) | Content appearing (error, results) |

---

## Component Specs

### Button — Primary (`btn-generate`)

- **Default**: `--color-primary` bg, `--color-text-on-primary` text, full width
- **Hover**: `--color-primary-hover` bg, blue box-shadow glow
- **Active**: `--color-primary-active` bg, `scale(0.99)` transform
- **Focus-visible**: 2px `--color-primary` outline + 5px ring
- **Disabled**: `opacity: 0.45`, `cursor: not-allowed`
- **Loading**: inline spinner + "Generating…" text, button disabled
- Height: 52px (padding `--space-4` top/bottom)
- Radius: `--radius-md`

### Input (`field-input`)

- **Default**: `--color-surface-elevated` bg, `--color-border-strong` border
- **Hover**: `--color-surface-hover` bg, `--color-text-tertiary` border
- **Focus**: `--color-primary` border, `--color-primary-ring` 3px box-shadow
- Padding: `--space-3` × `--space-4`
- Radius: `--radius-md`
- Placeholder: `--color-text-tertiary`

### Form Section

- Surface card with top-edge gradient highlight (blue → purple)
- `--shadow-md` elevation
- `--radius-xl` corners
- Padding: `--space-8` desktop, `--space-6` mobile

### Error Banner

- `role="alert"` + `aria-atomic="true"` for screen readers
- `--color-error-subtle` tinted background
- `--color-error-border` left/full border
- Entrance: `slide-down` animation 300ms

### Result Cards

- Conditional render — only appear after first successful result
- Entrance: `fade-up` animation 300ms
- Header: uppercase label, color dot indicator, `--font-display` font
- Body: Monaco Editor, custom `graphqlai-dark` theme matching surface colors
- Hover: `--shadow-lg` + `--color-border-strong` border

### Monaco Editor Theme (`graphqlai-dark`)

Extends `vs-dark` with:
- Background matched to card surface `#0D1117`
- Cursor: `--color-primary`
- Removed line highlight background
- Thin scrollbars (5px)
- Font: Fira Code 13px with ligatures

---

## Accessibility

- All text contrast: WCAG AA minimum (4.5:1 normal, 3:1 large)
- Skip link (`:focus` brings it into view)
- Semantic landmarks: `<main>`, `<header>`, `<section>`, `<form>`
- Heading hierarchy: `<h1>` brand → `<h2>` hidden form section → `<h2>` card titles
- `aria-busy` on `<form>` during loading
- `aria-live="polite"` on results section
- `role="alert"` + `aria-atomic` on error
- `aria-label` on all Monaco editor containers
- `aria-label` on submit button (changes during loading)
- `:focus-visible` ring on all interactive elements
- Keyboard shortcut: Ctrl/Cmd+Enter

---

## Layout

- Max content width: `960px`, centered with auto margins
- Page padding: `--space-12` vertical, `--space-6` horizontal (desktop)
- Results grid: 2-column CSS Grid, collapses to 1 column at ≤768px
- Responsive breakpoints: 375px / 768px / 960px+

---

## Changes Made and Why

| Change | Reason |
|---|---|
| Replaced Bootstrap + React-Bootstrap with semantic HTML + custom CSS | Eliminate fighting Bootstrap's specificity; full control over design; no `!important` hacks |
| Created `tokens.css` with all CSS custom properties | Single source of truth — zero hardcoded values in components |
| Chose Space Grotesk (display) + Inter (body) | Space Grotesk's geometric, technical character suits a dev tool; Inter is the industry standard for legibility |
| Changed primary blue from `#0d6efd` → `#60A5FA` | Original failed WCAG AA (3.66:1 on black); new value achieves 7.9:1 |
| Removed fixed `width="400px"` from Monaco editors | Broke responsiveness on any screen <800px; editors now fill their grid column |
| Unified form layout (both fields stacked, button below) | Original mixed `InputGroup` (inline) and standalone inputs — inconsistent; single layout is more scannable |
| Renamed button to "Generate Query" | "Submit" gives no context; "Generate Query" is specific and sets clear expectations |
| Added Ctrl/Cmd+Enter shortcut | Natural for a query/REPL-style tool; reduces friction for repeat use |
| Added conditional rendering for results section | Eliminates two empty black Monaco boxes on page load; reduces visual noise until needed |
| Added `role="alert"` to error, `aria-live` to results | Screen readers now announce both states without the user needing to navigate |
| Added skip link | Keyboard users can bypass header/brand on repeated visits |
| Added `aria-busy` on form | Screen readers announce loading state without visual-only spinner |
| Added custom Monaco theme matching `--color-surface` | Removes jarring color mismatch between card bg and editor bg |
| Added entrance animations (slide-down, fade-up) | Results and errors feel intentional, not jarring; 300ms is within HIG guidelines |
| Added subtle top-edge gradient on cards | Adds depth and polish without adding visual weight |
| Added ambient radial glow behind brand | Creates a sense of depth; reinforces primary color brand identity |
