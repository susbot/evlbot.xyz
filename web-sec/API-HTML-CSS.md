# API Top 10 Course — HTML & CSS Reference

This file contains the exact CSS and HTML structure for the OWASP API Security Top 10 course. Rose/pink color scheme. Copy these exactly.

---

## Color variables

```
--accent: #e11d48
--accent-bright: #fb7185
--accent-glow: rgba(225,29,72,0.10)
```

---

## api01-shared.css — full file

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
:root{--bg:#0a0a0f;--surface:#111118;--surface2:#18181f;--border:#22222e;--accent:#e11d48;--accent-bright:#fb7185;--accent-glow:rgba(225,29,72,0.10);--green:#10b981;--yellow:#f59e0b;--red:#f43f5e;--blue:#38bdf8;--orange:#fb923c;--text:#e2e8f0;--muted:#64748b;--subtle:#94a3b8;}
*{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:'IBM Plex Sans',sans-serif;min-height:100vh;padding-bottom:100px;}
.top-nav{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid var(--border);position:sticky;top:0;background:var(--bg);z-index:100;}
.nav-left{display:flex;align-items:center;gap:12px;}
.nav-badge{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--accent-bright);background:var(--accent-glow);border:1px solid var(--accent);border-radius:4px;padding:3px 9px;}
.nav-title{font-size:13px;color:var(--subtle);}
.nav-right{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted);}
.progress-wrap{padding:12px 20px 0;background:var(--bg);}
.progress-labels{display:flex;justify-content:space-between;font-family:'IBM Plex Mono',monospace;font-size:9px;color:var(--muted);margin-top:6px;padding:0 2px;}
.slide{display:none;padding:28px 20px 0;}.slide.active{display:block;}
.slide-eyebrow{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
.slide-title{font-size:clamp(18px,5vw,24px);font-weight:600;color:#fff;line-height:1.25;margin-bottom:6px;}
.slide-subtitle{font-size:14px;color:var(--subtle);line-height:1.6;margin-bottom:24px;}
.block{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:18px;margin-bottom:14px;}
.block-label{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;}
.block-label.pink{color:var(--accent-bright);}.block-label.red{color:var(--red);}.block-label.yellow{color:var(--yellow);}.block-label.green{color:var(--green);}.block-label.blue{color:var(--blue);}.block-label.orange{color:var(--orange);}
.block p{font-size:13px;color:var(--subtle);line-height:1.75;margin-bottom:10px;}.block p:last-child{margin-bottom:0;}.block p strong{color:var(--text);}
.callout{border-radius:8px;padding:14px 16px;margin-bottom:14px;}
.callout.pink{background:var(--accent-glow);border:1px solid rgba(225,29,72,.35);}.callout.red{background:rgba(244,63,94,.06);border:1px solid rgba(244,63,94,.25);}.callout.yellow{background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.25);}.callout.green{background:rgba(16,185,129,.06);border:1px solid rgba(16,185,129,.25);}.callout.blue{background:rgba(56,189,248,.06);border:1px solid rgba(56,189,248,.25);}.callout.orange{background:rgba(251,146,60,.06);border:1px solid rgba(251,146,60,.25);}
.callout-label{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px;}
.callout.pink .callout-label{color:var(--accent-bright);}.callout.red .callout-label{color:var(--red);}.callout.yellow .callout-label{color:var(--yellow);}.callout.green .callout-label{color:var(--green);}.callout.blue .callout-label{color:var(--blue);}.callout.orange .callout-label{color:var(--orange);}
.callout p{font-size:13px;color:var(--subtle);line-height:1.75;margin-bottom:8px;}.callout p:last-child{margin-bottom:0;}.callout p strong{color:var(--text);}
.mono-block{background:#0d0d14;border:1px solid var(--border);border-radius:8px;padding:14px 16px;margin:12px 0;font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--accent-bright);line-height:1.7;white-space:pre-wrap;word-break:break-word;}
.mono-block .comment{color:var(--muted);}
.outcome-list{display:flex;flex-direction:column;gap:8px;margin-bottom:14px;}
.outcome-item{display:flex;align-items:flex-start;gap:12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:12px 14px;}
.outcome-icon{font-size:16px;flex-shrink:0;margin-top:1px;}
.outcome-title{font-size:13px;font-weight:600;color:var(--text);margin-bottom:3px;}
.outcome-desc{font-size:12px;color:var(--muted);line-height:1.6;}
.compare{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;}
@media(max-width:500px){.compare{grid-template-columns:1fr;}}
.compare-col{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;}
.compare-col.red-col{border-color:rgba(244,63,94,.3);}.compare-col.green-col{border-color:rgba(16,185,129,.3);}
.compare-header{font-size:12px;font-weight:600;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--border);}
.compare-col.red-col .compare-header{color:var(--red);}.compare-col.green-col .compare-header{color:var(--green);}
.compare-item{font-size:12px;color:var(--muted);line-height:1.6;padding:5px 0;border-bottom:1px solid var(--border);}.compare-item:last-child{border-bottom:none;padding-bottom:0;}.compare-item strong{color:var(--text);}
.scenario-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;margin-bottom:12px;}
.scenario-num{font-family:'IBM Plex Mono',monospace;font-size:9px;color:var(--muted);margin-bottom:6px;}
.scenario-title{font-size:14px;font-weight:600;color:var(--text);margin-bottom:10px;}
.scenario-body{font-size:13px;color:var(--subtle);line-height:1.75;}.scenario-body strong{color:var(--text);}
.scenario-why{margin-top:10px;padding-top:10px;border-top:1px solid var(--border);font-size:12px;color:var(--muted);line-height:1.6;}.scenario-why strong{color:var(--accent-bright);}
.real-incident{background:var(--surface);border:1px solid rgba(244,63,94,.3);border-radius:10px;padding:16px;margin-bottom:12px;}
.real-incident-tag{font-family:'IBM Plex Mono',monospace;font-size:9px;color:var(--red);letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px;}
.real-incident-title{font-size:14px;font-weight:600;color:var(--text);margin-bottom:4px;}
.real-incident-body{font-size:13px;color:var(--subtle);line-height:1.75;}.real-incident-body strong{color:var(--text);}
.real-incident-lesson{margin-top:10px;padding-top:10px;border-top:1px solid rgba(244,63,94,.2);font-size:12px;color:var(--muted);line-height:1.6;}.real-incident-lesson strong{color:var(--accent-bright);}
.mit-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:18px;margin-bottom:14px;}
.mit-num{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--accent-bright);background:var(--accent-glow);border:1px solid var(--accent);border-radius:4px;padding:2px 8px;display:inline-block;margin-bottom:10px;}
.mit-title{font-size:15px;font-weight:600;color:#fff;margin-bottom:12px;}
.mit-section{margin-bottom:12px;}
.mit-section-label{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px;}
.mit-section-label.green{color:var(--green);}.mit-section-label.red{color:var(--red);}.mit-section-label.yellow{color:var(--yellow);}.mit-section-label.blue{color:var(--blue);}
.mit-section p{font-size:13px;color:var(--subtle);line-height:1.7;margin-bottom:8px;}.mit-section p:last-child{margin-bottom:0;}.mit-section p strong{color:var(--text);}
.part-banner{background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:16px 18px;margin-bottom:20px;display:flex;align-items:center;gap:14px;}
.part-num{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--accent-bright);background:var(--accent-glow);border:1px solid var(--accent);border-radius:4px;padding:4px 9px;flex-shrink:0;}
.part-title{font-size:13px;font-weight:600;color:var(--text);}.part-count{font-size:11px;color:var(--muted);margin-top:2px;}
.source-tag{display:inline-flex;align-items:center;gap:5px;font-family:'IBM Plex Mono',monospace;font-size:9px;color:var(--muted);background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:2px 8px;margin-bottom:12px;}
.btn-row{display:flex;gap:10px;margin-top:24px;}
.btn-primary{flex:1;background:var(--accent);color:#fff;border:none;border-radius:8px;padding:14px;font-family:'IBM Plex Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:opacity .18s;text-decoration:none;text-align:center;display:flex;align-items:center;justify-content:center;}
.btn-primary:hover{opacity:.85;}
.btn-secondary{background:transparent;color:var(--muted);border:1px solid var(--border);border-radius:8px;padding:14px 18px;font-family:'IBM Plex Sans',sans-serif;font-size:13px;cursor:pointer;transition:all .18s;text-decoration:none;text-align:center;display:flex;align-items:center;justify-content:center;}
.btn-secondary:hover{border-color:var(--accent);color:var(--accent-bright);}
.question-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;margin-bottom:16px;}
.question-num{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--muted);margin-bottom:8px;}
.question-text{font-size:15px;font-weight:500;color:var(--text);line-height:1.5;margin-bottom:16px;}
.options{display:flex;flex-direction:column;gap:8px;}
.option{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:12px 14px;font-size:13px;color:var(--muted);cursor:pointer;transition:all .15s;text-align:left;width:100%;font-family:'IBM Plex Sans',sans-serif;}
.option:hover:not(:disabled){border-color:var(--accent);color:var(--accent-bright);}
.option.correct{border-color:var(--green);background:rgba(16,185,129,.08);color:var(--green);}
.option.wrong{border-color:var(--red);background:rgba(244,63,94,.08);color:var(--red);}
.option:disabled{cursor:not-allowed;}
.feedback{margin-top:10px;padding:10px 12px;border-radius:8px;font-size:13px;line-height:1.6;display:none;}
.feedback.show{display:block;}
.feedback.correct{background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);color:var(--green);}
.feedback.wrong{background:rgba(244,63,94,.08);border:1px solid rgba(244,63,94,.2);color:var(--red);}
.complete-wrap{text-align:center;padding:32px 0 24px;}
.complete-icon{font-size:52px;margin-bottom:16px;}
.complete-title{font-size:24px;font-weight:600;color:#fff;margin-bottom:8px;}
.complete-sub{font-size:14px;color:var(--muted);line-height:1.7;margin-bottom:24px;}
.checklist{display:flex;flex-direction:column;gap:8px;margin-bottom:20px;}
.check-item{display:flex;align-items:flex-start;gap:10px;background:var(--surface);border:1px solid rgba(16,185,129,.2);border-radius:8px;padding:12px 14px;}
.check-mark{color:var(--green);font-size:14px;flex-shrink:0;margin-top:1px;}
.check-text{font-size:13px;color:var(--subtle);line-height:1.5;}
.tab-nav{display:flex;gap:3px;overflow-x:auto;padding:0 0 2px;-webkit-overflow-scrolling:touch;}
.tab-nav::-webkit-scrollbar{height:3px;}
.tab-nav a.seg{flex:1;height:8px;border-radius:99px;background:var(--border);transition:background .15s;display:block;}
.tab-nav a.seg:hover{background:var(--accent);}
.tab-nav a.seg.done{background:var(--green);}
.tab-nav a.seg.active{background:var(--accent-bright);}
.page-footer{margin-top:32px;padding-top:18px;border-top:1px solid var(--border);text-align:center;}
.page-footer a{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted);text-decoration:none;border:1px solid var(--border);border-radius:6px;padding:7px 14px;display:inline-flex;align-items:center;gap:6px;transition:all .15s;}
.page-footer a:hover{border-color:var(--accent);color:var(--accent-bright);}
```

---

## index.html — full file, ready to use

This is the course homepage. Save it as `index.html` in the root of the project folder (same level as api01-lesson/, api02-lesson/, etc). It links to `api01-lesson/api01-shared.css` for its styles.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Security Top 10 · Interactive Security Course</title>
    <meta name="description"
          content="An interactive, slide-by-slide breakdown of the top 10 API security risks. Built for anyone who learns differently.">
    <link rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23e11d48'/%3E%3Ctext x='50%25' y='54%25' font-family='monospace' font-size='22' font-weight='bold' fill='%23fff' text-anchor='middle' dominant-baseline='middle'%3EAPI%3C/text%3E%3C/svg%3E">
    <link rel="stylesheet" href="api01-lesson/api01-shared.css">
    <style>
        html {
            background: var(--bg);
        }

        body {
            padding-bottom: 24px;
        }

        .heart {
            color: #f43f5e;
        }

        .hero {
            padding: 40px 20px 32px;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10px;
            letter-spacing: .12em;
            text-transform: uppercase;
            color: var(--accent-bright);
            background: var(--accent-glow);
            border: 1px solid var(--accent);
            border-radius: 4px;
            padding: 3px 10px;
            margin-bottom: 20px;
        }

        .hero-title {
            font-size: clamp(24px, 6vw, 36px);
            font-weight: 600;
            color: #fff;
            line-height: 1.2;
            margin-bottom: 10px;
        }

        .hero-title span {
            color: var(--accent-bright);
        }

        .hero-sub {
            font-size: 16px;
            color: var(--subtle);
            line-height: 1.75;
            max-width: 540px;
            margin-bottom: 28px;
        }

        .hero-stats {
            display: flex;
            gap: 24px;
        }

        .stat {
            text-align: center;
        }

        .stat-num {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 22px;
            font-weight: 600;
            color: var(--accent-bright);
        }

        .stat-label {
            font-size: 11px;
            color: var(--muted);
            margin-top: 2px;
        }

        .section-header {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 9px;
            letter-spacing: .14em;
            text-transform: uppercase;
            color: var(--muted);
            padding: 24px 20px 12px;
            border-top: 1px solid var(--border);
        }

        .card-grid {
            display: grid;
            grid-template-columns:repeat(5, 1fr);
            gap: 10px;
            padding: 0 20px 24px;
        }

        @media (max-width: 1024px) {
            .card-grid {
                grid-template-columns:repeat(3, 1fr);
            }
        }

        @media (max-width: 640px) {
            .card-grid {
                grid-template-columns:repeat(2, 1fr);
            }
        }

        @media (max-width: 400px) {
            .card-grid {
                grid-template-columns:1fr;
            }
        }

        .module-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 14px;
            transition: border-color .15s;
            display: flex;
            flex-direction: column;
        }

        .module-card.available {
            cursor: pointer;
        }

        .module-card.available:hover {
            border-color: var(--accent);
        }

        .module-card.available.active {
            border-color: var(--accent-bright);
        }

        .module-card.locked {
            opacity: .4;
            cursor: default;
        }

        .mod-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
        }

        .mod-num {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 9px;
            letter-spacing: .1em;
            color: var(--accent-bright);
            background: var(--accent-glow);
            border: 1px solid var(--accent);
            border-radius: 4px;
            padding: 2px 7px;
        }

        .mod-title {
            font-size: 16px;
            font-weight: 600;
            color: #fff;
            margin-bottom: 4px;
            line-height: 1.3;
        }

        .mod-desc {
            font-size: 13px;
            color: var(--muted);
            line-height: 1.6;
            margin-bottom: 10px;
            flex: 1;
        }

        .mod-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .mod-slides {
            font-size: 10px;
            color: var(--muted);
            font-family: 'IBM Plex Mono', monospace;
        }

        .pill {
            font-size: 9px;
            padding: 2px 7px;
            border-radius: 99px;
            font-weight: 600;
            letter-spacing: .04em;
        }

        .pill-ready {
            background: rgba(16, 185, 129, .12);
            color: #10b981;
            border: 1px solid rgba(16, 185, 129, .25);
        }

        .pill-soon {
            background: var(--surface2);
            color: var(--muted);
            border: 1px solid var(--border);
        }

        .mod-link {
            display: block;
            width: 100%;
            margin-top: 10px;
            background: var(--accent);
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 9px;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            transition: opacity .15s;
        }

        .mod-link:hover {
            opacity: .85;
        }

        .about-section {
            margin: 0 20px 32px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 18px;
        }

        .about-label {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 9px;
            letter-spacing: .14em;
            text-transform: uppercase;
            color: var(--muted);
            margin-bottom: 10px;
        }

        .about-text {
            font-size: 13px;
            color: var(--subtle);
            line-height: 1.75;
            margin-bottom: 12px;
        }

        .about-text strong {
            color: var(--text);
        }

        .about-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10px;
            color: var(--accent-bright);
            background: var(--accent-glow);
            border: 1px solid var(--accent);
            border-radius: 4px;
            padding: 4px 10px;
            text-decoration: none;
            transition: opacity .15s;
        }

        .about-link:hover {
            opacity: .8;
        }

        .page-footer {
            margin: 32px 20px 0;
            padding: 24px 0 32px;
            border-top: 1px solid var(--border);
            text-align: left;
        }

        .footer-top {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 20px;
        }

        .footer-brand {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .footer-mark {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: .08em;
            color: var(--accent-bright);
            background: var(--accent-glow);
            border: 1px solid var(--accent);
            border-radius: 6px;
            padding: 5px 10px;
        }

        .footer-tag {
            font-size: 12px;
            color: var(--muted);
            line-height: 1.5;
        }

        .footer-links {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .footer-links a {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10px;
            color: var(--subtle);
            text-decoration: none;
            border: 1px solid var(--border);
            border-radius: 6px;
            padding: 6px 12px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all .15s;
        }

        .footer-links a:hover {
            border-color: var(--accent);
            color: var(--accent-bright);
        }

        .footer-bottom {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            padding-top: 16px;
            border-top: 1px solid var(--border);
        }

        .footer-copy {
            font-size: 11px;
            color: var(--muted);
            line-height: 1.6;
        }

        .footer-disclaimer {
            font-size: 11.5px;
            color: var(--muted);
            line-height: 1.8;
            max-width: 760px;
            margin: 14px auto 0;
            text-align: center;
        }

        .footer-disclaimer strong {
            color: var(--subtle);
            font-weight: 600;
        }

        .footer-disclaimer a {
            color: var(--accent-bright);
            text-decoration: underline;
            text-underline-offset: 2px;
            border: none;
            padding: 0;
            border-radius: 0;
            display: inline;
        }

        .footer-disclaimer a:hover {
            opacity: .8;
        }
    </style>
</head>
<body>

<!-- NAV -->
<div class="top-nav">
    <div class="nav-left">
        <span class="nav-badge">API Top 10</span>
        <span class="nav-title">Interactive Security Course</span>
    </div>
    <a href="https://evlbot.xyz" class="nav-right"
       style="font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:600;color:var(--accent-bright);background:var(--accent-glow);border:1px solid var(--accent);border-radius:4px;padding:4px 10px;text-decoration:none;letter-spacing:.06em;">evlbot.xyz</a>
</div>

<!-- HERO -->
<div class="hero">
    <div class="hero-badge">&#x1F512; Security · APIs · REST · GraphQL</div>
    <div class="hero-title">Learn the <span>API Top 10</span><br>by actually doing it.</div>
    <p class="hero-sub">An interactive, slide-by-slide breakdown of the top 10 API security risks. You don't need to
        write code to understand why APIs break.</p>
    <div class="hero-stats">
        <!-- Update these as modules go live -->
        <div class="stat">
            <div class="stat-num">1<span style="color:var(--muted);font-size:14px;">/10</span></div>
            <div class="stat-label">Modules live</div>
        </div>
        <div class="stat">
            <div class="stat-num">28</div>
            <div class="stat-label">Slides</div>
        </div>
        <div class="stat">
            <div class="stat-num">1</div>
            <div class="stat-label">Quizzes</div>
        </div>
    </div>
</div>

<!-- CARD GRID -->
<div class="section-header">Course Modules</div>
<div class="card-grid">

    <!-- API1 — LIVE -->
    <div class="module-card available active">
        <div class="mod-top"><span class="mod-num">API1</span><span class="pill pill-ready">Live</span></div>
        <div class="mod-title">Broken Object Level Auth</div>
        <div class="mod-desc">Accessing other users' data by changing an ID in a request.</div>
        <div class="mod-footer"><span class="mod-slides">28 slides</span></div>
        <a class="mod-link" href="api01-lesson/api01-slide-01.html">Start &#x2192;</a>
    </div>

    <!-- API2–API10 — LOCKED -->
    <div class="module-card locked">
        <div class="mod-top"><span class="mod-num">API2</span><span class="pill pill-soon">Soon</span></div>
        <div class="mod-title">Broken Authentication</div>
        <div class="mod-desc">Weak tokens, no rate limiting, and credential stuffing attacks.</div>
        <div class="mod-footer"><span class="mod-slides">28 slides</span></div>
    </div>

    <div class="module-card locked">
        <div class="mod-top"><span class="mod-num">API3</span><span class="pill pill-soon">Soon</span></div>
        <div class="mod-title">Broken Object Property Auth</div>
        <div class="mod-desc">Changing fields you shouldn't be able to touch — like your own role.</div>
        <div class="mod-footer"><span class="mod-slides">28 slides</span></div>
    </div>

    <div class="module-card locked">
        <div class="mod-top"><span class="mod-num">API4</span><span class="pill pill-soon">Soon</span></div>
        <div class="mod-title">Unrestricted Resource Consumption</div>
        <div class="mod-desc">No rate limits — attackers drain resources, inflate costs, or take the service down.</div>
        <div class="mod-footer"><span class="mod-slides">28 slides</span></div>
    </div>

    <div class="module-card locked">
        <div class="mod-top"><span class="mod-num">API5</span><span class="pill pill-soon">Soon</span></div>
        <div class="mod-title">Broken Function Level Auth</div>
        <div class="mod-desc">Calling admin actions as a regular user because the API never checked your role.</div>
        <div class="mod-footer"><span class="mod-slides">28 slides</span></div>
    </div>

    <div class="module-card locked">
        <div class="mod-top"><span class="mod-num">API6</span><span class="pill pill-soon">Soon</span></div>
        <div class="mod-title">Unrestricted Access to Business Flows</div>
        <div class="mod-desc">Automating checkout, mass-voting, or scraping prices the API never intended.</div>
        <div class="mod-footer"><span class="mod-slides">28 slides</span></div>
    </div>

    <div class="module-card locked">
        <div class="mod-top"><span class="mod-num">API7</span><span class="pill pill-soon">Soon</span></div>
        <div class="mod-title">Server Side Request Forgery</div>
        <div class="mod-desc">Tricking the API into fetching attacker-controlled URLs to access internal systems.</div>
        <div class="mod-footer"><span class="mod-slides">28 slides</span></div>
    </div>

    <div class="module-card locked">
        <div class="mod-top"><span class="mod-num">API8</span><span class="pill pill-soon">Soon</span></div>
        <div class="mod-title">Security Misconfiguration</div>
        <div class="mod-desc">Open CORS, verbose error messages, and missing TLS exposing the API.</div>
        <div class="mod-footer"><span class="mod-slides">28 slides</span></div>
    </div>

    <div class="module-card locked">
        <div class="mod-top"><span class="mod-num">API9</span><span class="pill pill-soon">Soon</span></div>
        <div class="mod-title">Improper Inventory Management</div>
        <div class="mod-desc">Forgotten v1 endpoints still running in production long after v2 launched.</div>
        <div class="mod-footer"><span class="mod-slides">28 slides</span></div>
    </div>

    <div class="module-card locked">
        <div class="mod-top"><span class="mod-num">API10</span><span class="pill pill-soon">Soon</span></div>
        <div class="mod-title">Unsafe Consumption of APIs</div>
        <div class="mod-desc">Trusting third-party API responses blindly — leading to injection and data exposure.</div>
        <div class="mod-footer"><span class="mod-slides">28 slides</span></div>
    </div>

</div>

<!-- ABOUT -->
<div class="section-header">About</div>
<div class="about-section">
    <div class="about-label">Built by Susbot</div>
    <p class="about-text">I'm a different kind of learner — let's learn together. Hope it helps you learn faster.</p>
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <a class="about-link" href="https://www.linkedin.com/in/julio-perez-b1062796/" target="_blank">&#x1F517;
            LinkedIn</a>
        <script type='text/javascript' src='https://storage.ko-fi.com/cdn/widget/Widget_2.js'></script>
        <script type='text/javascript'>kofiwidget2.init('Support the project', '#e11d48', 'W8B121MBZL');
        kofiwidget2.draw();</script>
    </div>
</div>

<!-- FOOTER -->
<div class="page-footer">
    <div class="footer-top">
        <div class="footer-brand">
            <span class="footer-mark">evlbot.xyz</span>
            <span class="footer-tag">Interactive lessons on securing<br>API applications.</span>
        </div>
        <div class="footer-links">
            <a href="https://owasp.org/API-Security/editions/2023/en/0x00-header/" target="_blank" rel="noopener">&#x1F4C4;
                View the official framework &#x2197;</a>
            <a href="terms.html">&#x1F4DC; Terms &amp; Disclaimer</a>
        </div>
    </div>
    <div class="footer-bottom">
        <span class="footer-copy">&copy; 2026 Susbot &middot; Built for learning, free to use.</span>
        <span class="footer-copy">Made with <span class="heart">&#x2665;</span> &amp; a lot of curiosity</span>
    </div>
    <p class="footer-disclaimer"><strong>Source &amp; attribution:</strong> This is an independent, unofficial study
        companion. The risk categories taught here are based on a publicly available, industry-standard security
        framework maintained by an external nonprofit foundation &mdash; <strong>not created by this site</strong>. For
        the authoritative and most current version, please refer to the <a
                href="https://owasp.org/API-Security/editions/2023/en/0x00-header/" target="_blank" rel="noopener">official
            framework</a>. This project is not affiliated with, endorsed by, or sponsored by that foundation, and all
        trademarks remain the property of their respective owners.</p>
</div>

</body>
</html>
```

---

## Slide HTML structure — copy for every slide

Every slide file lives inside its module folder: `api01-lesson/api01-slide-XX.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>API1:2023 — [Risk Name] · Slide X of 28</title>
<link rel="stylesheet" href="api01-shared.css">
</head>
<body>

<!-- NAV: badge = module code, title = risk name, right = slide count -->
<div class="top-nav">
  <div class="nav-left">
    <span class="nav-badge">API1:2023</span>
    <span class="nav-title">[Risk Name]</span>
  </div>
  <span class="nav-right">Slide X of 28</span>
</div>

<!-- PROGRESS BAR: 28 segments, one per slide
     done = already visited (green)
     active = current slide (pink)
     plain seg = not yet visited (grey) -->
<div class="progress-wrap">
  <div class="tab-nav">
    <a class="seg done" href="api01-slide-01.html" title="Slide 1 · The Setup"></a>
    <a class="seg active" href="api01-slide-02.html" title="Slide 2 · The Word"></a>
    <a class="seg" href="api01-slide-03.html" title="Slide 3 · ..."></a>
    <!-- repeat to 28 -->
  </div>
  <div class="progress-labels"><span>[Part Name]</span><span>Slide X</span></div>
</div>

<!-- SLIDE CONTENT -->
<div class="slide active">

  <!-- PART BANNER: only on the FIRST slide of each new part (1, 9, 14, 18) -->
  <div class="part-banner">
    <span class="part-num">PART 1</span>
    <div>
      <div class="part-title">What Is It?</div>
      <div class="part-count">Slides 1–8 · From story to definition</div>
    </div>
  </div>

  <!-- SLIDE HEADER -->
  <div class="slide-eyebrow">Slide X · [Slide Name]</div>
  <div class="slide-title">[Main heading]</div>
  <div class="slide-subtitle">[One supporting line]</div>

  <!-- OWASP SOURCE TAG: use when citing the official document directly -->
  <div class="source-tag">📄 OWASP API Security Top 10 · 2023 · API1</div>

  <!-- CALLOUT BOX
       Colors: pink, red, yellow, green, blue, orange
       pink   = key takeaway / definition
       yellow = scenario / setup / "here's what happened"
       red    = the attack / the bad outcome
       green  = the solution / the defense
       blue   = analogy / plain-English explanation
       orange = warning / nuance / "but watch out" -->
  <div class="callout yellow">
    <div class="callout-label">The Scenario</div>
    <p>Content here. Use <strong>strong</strong> for key phrases.</p>
  </div>

  <!-- BLOCK BOX: for key takeaways and definitions -->
  <div class="block">
    <div class="block-label pink">One Line to Remember</div>
    <p>The single most important idea from this slide.</p>
  </div>

  <!-- MONO BLOCK: for code, API requests, or terminal examples -->
  <div class="mono-block"><span class="comment">// comment in grey</span>
GET /api/orders/1042
→ pink colored output text</div>

  <!-- OUTCOME LIST: for listing impacts or consequences -->
  <div class="outcome-list">
    <div class="outcome-item">
      <div class="outcome-icon">🔓</div>
      <div>
        <div class="outcome-title">Outcome title</div>
        <div class="outcome-desc">Description anchored to a real CVE or incident.</div>
      </div>
    </div>
  </div>

  <!-- COMPARE GRID: two columns, red vs green -->
  <div class="compare">
    <div class="compare-col red-col">
      <div class="compare-header">What went wrong</div>
      <div class="compare-item">Item one</div>
      <div class="compare-item">Item two</div>
    </div>
    <div class="compare-col green-col">
      <div class="compare-header">What should happen</div>
      <div class="compare-item">Item one</div>
      <div class="compare-item">Item two</div>
    </div>
  </div>

  <!-- SCENARIO CARD: for attack scenario slides -->
  <div class="scenario-card">
    <div class="scenario-num">SCENARIO 01</div>
    <div class="scenario-title">Scenario title</div>
    <div class="scenario-body"><p>What happened. <strong>Key detail.</strong></p></div>
    <div class="scenario-why"><strong>Why this matters:</strong> Explanation.</div>
  </div>

  <!-- REAL INCIDENT CARD: for documented breaches and CVEs -->
  <div class="real-incident">
    <div class="real-incident-tag">Real Incident · [Month Year]</div>
    <div class="real-incident-title">Company name / CVE</div>
    <div class="real-incident-body"><p>What happened and how.</p></div>
    <div class="real-incident-lesson"><strong>Lesson:</strong> What to take away.</div>
  </div>

  <!-- MITIGATION CARD: for prevention slides -->
  <div class="mit-card">
    <div class="mit-num">MIT 01</div>
    <div class="mit-title">Mitigation title</div>
    <div class="mit-section">
      <div class="mit-section-label green">What to do</div>
      <p>Concrete action. <strong>Specific detail.</strong></p>
    </div>
    <div class="mit-section">
      <div class="mit-section-label blue">Plain English</div>
      <p>Analogy or plain explanation for non-developers.</p>
    </div>
    <div class="mit-section">
      <div class="mit-section-label red">What this doesn't fix</div>
      <p>Honest about limitations.</p>
    </div>
  </div>

  <!-- NAV BUTTONS: always at the bottom
       btn-primary text previews the next slide — never just "Next →"
       btn-secondary is always "← Back" -->
  <div class="btn-row">
    <a class="btn-secondary" href="api01-slide-01.html">← Back</a>
    <a class="btn-primary" href="api01-slide-03.html">Got it → What does this mean in practice?</a>
  </div>

</div><!-- end .slide.active -->

<!-- PAGE FOOTER: appears on every slide -->
<div class="page-footer"><a href="sources.html">📄 View sources for this lesson</a></div>

</body>
</html>
```

---

## File naming rules

```
Root:
  index.html              ← homepage

Module folder:
  api01-lesson/
    api01-shared.css      ← CSS for all slides in this module
    api01-slide-01.html   ← through api01-slide-28.html
    sources.html          ← references and citations

Next module:
  api02-lesson/
    api02-shared.css      ← same CSS, same colors (copy api01-shared.css)
    api02-slide-01.html   ← through api02-slide-28.html
    sources.html
```

Each module has its own copy of the CSS. The index.html links to `api01-lesson/api01-shared.css` to borrow its CSS variables for the homepage.

---

## Updating the homepage when a new module ships

1. Find the locked card for that module and change `class="module-card locked"` → `class="module-card available"`
2. Add the `<a class="mod-link" href="apXX-lesson/apXX-slide-01.html">Start →</a>` button inside the card
3. Update the hero stats: modules live count, slides count, quizzes count
4. The first module card keeps `active` class — subsequent live ones just use `available`
