# Design System Specification
## Colors, Typography, and Readability Standards

This document defines the exact CSS values used in this course. Any new course must use these values exactly. Do not approximate or substitute.

---

## CSS Variables (`:root`)

Copy this block verbatim into every shared CSS file:

```css
:root {
  --bg:           #0a0a0f;
  --surface:      #111118;
  --surface2:     #18181f;
  --border:       #22222e;
  --accent:       #e11d48;
  --accent-bright:#fb7185;
  --accent-glow:  rgba(225,29,72,0.10);
  --green:        #10b981;
  --yellow:       #f59e0b;
  --red:          #f43f5e;
  --blue:         #38bdf8;
  --orange:       #fb923c;
  --text:         #e2e8f0;
  --muted:        #8899a6;
  --subtle:       #a8b8c8;
}
```

### Critical values — do not change

| Variable | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0f` | Page background — near black |
| `--surface` | `#111118` | Card and block backgrounds |
| `--surface2` | `#18181f` | Secondary surface (part banners, etc.) |
| `--border` | `#22222e` | All borders and dividers |
| `--accent` | `#e11d48` | Primary brand color — buttons, badges |
| `--accent-bright` | `#fb7185` | Lighter accent — links, labels on dark |
| `--text` | `#e2e8f0` | Primary text — headings, strong elements |
| `--muted` | `#8899a6` | Secondary text — must be this value for dark-background readability |
| `--subtle` | `#a8b8c8` | Body paragraph text — must be this value for dark-background readability |

### Why `--muted` and `--subtle` are these specific values

The background is `#0a0a0f` (near black). These two values were tuned for comfortable nighttime reading on dark screens:

- `--muted: #8899a6` — used for descriptions, list item text, footnote-style content. Bright enough to read clearly on dark backgrounds without eye strain.
- `--subtle: #a8b8c8` — used for paragraph body text in blocks and callouts. Slightly brighter than muted because it carries more reading load.

**Do not use darker values.** Previous values of `#64748b` (muted) and `#94a3b8` (subtle) were too grey for dark backgrounds and caused readability issues at night. These were explicitly corrected.

---

## Typography

### Fonts

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
```

| Role | Font | Usage |
|---|---|---|
| Body / UI | IBM Plex Sans | All readable content, buttons, labels |
| Code / Mono | IBM Plex Mono | Badges, nav labels, code blocks, eyebrows |

### Font sizes

These are the required sizes. Do not go smaller.

| Element | Size | Color variable |
|---|---|---|
| Slide title | `clamp(18px, 5vw, 24px)` | `#fff` |
| Slide subtitle | `14px` | `--subtle` |
| Block / callout paragraph text | `14px` | `--subtle` |
| Scenario body text | `14px` | `--subtle` |
| Real incident body text | `14px` | `--subtle` |
| Mitigation section paragraph | `14px` | `--subtle` |
| Quiz option text | `14px` | `--muted` |
| Quiz feedback text | `14px` | varies |
| Checklist item text | `14px` | `--subtle` |
| Outcome item description | `13px` | `--muted` |
| Compare column item | `13px` | `--muted` |
| Scenario why / footnote text | `13px` | `--muted` |
| Real incident lesson text | `13px` | `--muted` |
| Nav title | `13px` | `--subtle` |
| Mono code block | `12px` | `--accent-bright` |
| Labels / eyebrows (uppercase) | `9px` | varies by context |
| Nav badge / source tag | `10px–11px` | `--muted` or `--accent-bright` |

### The size rule

- **14px** — anything the user reads as a sentence (paragraphs, body text, options, feedback)
- **13px** — secondary/supporting text that supplements a heading (descriptions, footnotes, list items)
- **12px** — code blocks only
- **9–11px** — labels, eyebrows, nav chrome — always uppercase, always monospace

Never use `12px` for readable body text. It is too small on mobile and at night.

---

## Callout colors

Callouts use colored borders and tinted backgrounds. These exact values must be used:

```css
.callout.pink   { background: var(--accent-glow);              border: 1px solid rgba(225,29,72,.35); }
.callout.red    { background: rgba(244,63,94,.06);             border: 1px solid rgba(244,63,94,.25); }
.callout.yellow { background: rgba(245,158,11,.06);            border: 1px solid rgba(245,158,11,.25); }
.callout.green  { background: rgba(16,185,129,.06);            border: 1px solid rgba(16,185,129,.25); }
.callout.blue   { background: rgba(56,189,248,.06);            border: 1px solid rgba(56,189,248,.25); }
.callout.orange { background: rgba(251,146,60,.06);            border: 1px solid rgba(251,146,60,.25); }
```

### When to use each callout color

| Color | Use for |
|---|---|
| `blue` | Neutral information, explanations, context — including Business Takeaway callouts |
| `red` | Danger, warnings, what-not-to-do, the bad outcome |
| `orange` | Caution, caveats, nuance, &#x201C;important but not alarming&#x201D; |
| `green` | Correct approach, positive outcome, the right answer |
| `yellow` | Notes, tips, secondary observations |
| `pink` | Key definitions, the most important concept on a slide |

---

## Background and surface hierarchy

The course uses three levels of dark surface. Use them in this order:

```
Page background:  --bg       #0a0a0f   (darkest)
Cards / blocks:   --surface  #111118   (mid)
Nested elements:  --surface2 #18181f   (lightest dark)
```

Never use a surface lighter than `--surface2` for backgrounds. Never use white or near-white backgrounds anywhere in the UI.

---

## Buttons

```css
/* Primary — accent color, full width flex */
.btn-primary {
  background: var(--accent);   /* #e11d48 */
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  padding: 14px;
}

/* Secondary — transparent with border */
.btn-secondary {
  background: transparent;
  color: var(--muted);         /* #8899a6 */
  border: 1px solid var(--border);
  font-size: 13px;
  border-radius: 8px;
  padding: 14px 18px;
}
/* Secondary hover: border -> --accent, color -> --accent-bright */
```

---

## Progress bar segments

```css
.tab-nav a.seg         { background: var(--border); }    /* not visited */
.tab-nav a.seg.done    { background: var(--green);  }    /* completed */
.tab-nav a.seg.active  { background: var(--accent-bright); } /* current */
```

---

## Summary: the numbers that matter most

If a new chat session reads only this section, these are the values that cannot be wrong:

| What | Value |
|---|---|
| Background | `#0a0a0f` |
| Primary text | `#e2e8f0` |
| Body paragraph text color | `#a8b8c8` (`--subtle`) |
| Secondary/description text color | `#8899a6` (`--muted`) |
| Accent / brand color | `#e11d48` |
| Body paragraph font size | `14px` |
| Description / supporting text size | `13px` |
| Body font | IBM Plex Sans |
| Mono / label font | IBM Plex Mono |
