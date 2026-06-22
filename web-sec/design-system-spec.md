# Design System — What To Change

A new chat building a course must make these exact changes to the shared CSS file. Follow these instructions literally.

---

## Step 1 — Find these two lines in the `:root` block and change them

Find:
```
--muted:#64748b
```
Replace with:
```
--muted:#8899a6
```

Find:
```
--subtle:#94a3b8
```
Replace with:
```
--subtle:#a8b8c8
```

---

## Step 2 — Find these lines and change the font sizes

Find:
```
.block p{font-size:13px
```
Replace with:
```
.block p{font-size:14px
```

---

Find:
```
.callout p{font-size:13px
```
Replace with:
```
.callout p{font-size:14px
```

---

Find:
```
.outcome-desc{font-size:12px
```
Replace with:
```
.outcome-desc{font-size:13px
```

---

Find:
```
.compare-item{font-size:12px
```
Replace with:
```
.compare-item{font-size:13px
```

---

Find:
```
.scenario-body{font-size:13px
```
Replace with:
```
.scenario-body{font-size:14px
```

---

Find:
```
.scenario-why{margin-top:10px;padding-top:10px;border-top:1px solid var(--border);font-size:12px
```
Replace with:
```
.scenario-why{margin-top:10px;padding-top:10px;border-top:1px solid var(--border);font-size:13px
```

---

Find:
```
.real-incident-body{font-size:13px
```
Replace with:
```
.real-incident-body{font-size:14px
```

---

Find:
```
.real-incident-lesson{margin-top:10px;padding-top:10px;border-top:1px solid rgba(244,63,94,.2);font-size:12px
```
Replace with:
```
.real-incident-lesson{margin-top:10px;padding-top:10px;border-top:1px solid rgba(244,63,94,.2);font-size:13px
```

---

Find:
```
.mit-section p{font-size:13px
```
Replace with:
```
.mit-section p{font-size:14px
```

---

Find:
```
.check-text{font-size:13px
```
Replace with:
```
.check-text{font-size:14px
```

---

Find:
```
border-radius:8px;padding:12px 14px;font-size:13px;color:var(--muted);cursor:pointer
```
Replace with:
```
border-radius:8px;padding:12px 14px;font-size:14px;color:var(--muted);cursor:pointer
```

---

Find:
```
border-radius:8px;font-size:13px;line-height:1.6;display:none
```
Replace with:
```
border-radius:8px;font-size:14px;line-height:1.6;display:none
```

---

## Why these changes

- The background is near-black (`#0a0a0f`). The original grey colors (`#64748b` and `#94a3b8`) were too dim to read comfortably, especially at night.
- The original font sizes (12px and 13px for body text) were too small. 14px is the minimum for comfortable reading on screen.

## Apply to every CSS file in the course

If the course has one shared CSS file, change it once. If each lesson has its own copy of the CSS (e.g. `api01-shared.css`, `api02-shared.css`), apply every change above to every file. All copies must be identical.
