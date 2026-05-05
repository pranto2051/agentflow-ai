# ============================================================
#  ENHANCED UI/UX DESIGN SYSTEM PROMPT — AgentFlow AI
#  Add this ENTIRE section to your Master Prompt
#  Replace the original "PHASE 10: UI/UX Design System"
# ============================================================

---

# ██████████████████████████████████████████
# PHASE 10 (ENHANCED): WORLD-CLASS UI/UX DESIGN SYSTEM
# ██████████████████████████████████████████

> **INSTRUCTION TO AI AGENT**: This is the most important design section. Read every line carefully. Do NOT use generic SaaS design patterns. This platform must look like it belongs among the world's top AI products — think Linear, Vercel, Resend, Raycast, and Arc Browser combined. Every pixel must have intention.

---

## 🎨 DESIGN PHILOSOPHY

**Aesthetic Direction**: *"Cosmic Dark — Precision meets Depth"*

Imagine a professional command center in space. Deep dark backgrounds that feel infinite. Electric violet and cyan accents that pulse with energy. Crisp white text that floats like starlight. Every card feels like a holographic panel. Every animation feels like a system breathing.

**Three guiding principles:**
1. **Depth over flatness** — layers, glows, and light sources create a spatial feel
2. **Motion with purpose** — every animation tells the user something happened
3. **Commands feel powerful** — the AI command interface is the soul of the product

---

## 🌈 DESIGN TOKEN SYSTEM

### Install Required Fonts

```bash
# In your Next.js layout.tsx, use next/font:
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300','400','500','600'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400','500','600','700'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400','500'] })
```

**Font usage rules:**
- `Space Grotesk` → All headings, stat numbers, logo, hero text
- `DM Sans` → All body text, labels, navigation, paragraphs
- `JetBrains Mono` → AI-generated content, code blocks, API responses, logs

### Complete CSS Variables (`globals.css`)

```css
/* ===========================
   AGENTFLOW DESIGN TOKENS
   =========================== */

:root {
  /* --- Brand Core --- */
  --brand-violet: #7c3aed;
  --brand-violet-light: #a78bfa;
  --brand-violet-glow: rgba(124, 58, 237, 0.4);
  --brand-cyan: #06b6d4;
  --brand-cyan-light: #67e8f9;
  --brand-cyan-glow: rgba(6, 182, 212, 0.4);
  --brand-gradient: linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%);
  --brand-gradient-text: linear-gradient(135deg, #a78bfa 0%, #67e8f9 100%);
  --brand-gradient-glow: linear-gradient(135deg, rgba(124,58,237,0.5), rgba(6,182,212,0.5));

  /* --- Backgrounds (Dark Mode Default) --- */
  --bg-void: #06060e;          /* Absolute darkest — page body */
  --bg-deep: #09090f;          /* Main content background */
  --bg-surface: #0d0d1a;       /* Sidebar, panels */
  --bg-card: rgba(255,255,255,0.028);     /* Cards */
  --bg-card-hover: rgba(255,255,255,0.045);
  --bg-elevated: rgba(255,255,255,0.055); /* Modals, dropdowns */
  --bg-input: rgba(255,255,255,0.04);    /* Form inputs */
  --bg-input-focus: rgba(124,58,237,0.08);

  /* --- Borders --- */
  --border-subtle: rgba(255,255,255,0.06);
  --border-soft: rgba(255,255,255,0.1);
  --border-medium: rgba(255,255,255,0.14);
  --border-accent: rgba(124,58,237,0.35);
  --border-accent-cyan: rgba(6,182,212,0.35);
  --border-glow: 0 0 0 1px rgba(124,58,237,0.4), 0 0 20px rgba(124,58,237,0.15);

  /* --- Text --- */
  --text-primary: #f0f0ff;
  --text-secondary: rgba(240,240,255,0.55);
  --text-muted: rgba(240,240,255,0.28);
  --text-disabled: rgba(240,240,255,0.16);
  --text-accent: #a78bfa;
  --text-accent-cyan: #67e8f9;

  /* --- Semantic Colors --- */
  --color-success: #10b981;
  --color-success-bg: rgba(16,185,129,0.12);
  --color-success-border: rgba(16,185,129,0.25);
  --color-warning: #f59e0b;
  --color-warning-bg: rgba(245,158,11,0.12);
  --color-warning-border: rgba(245,158,11,0.25);
  --color-danger: #ef4444;
  --color-danger-bg: rgba(239,68,68,0.12);
  --color-danger-border: rgba(239,68,68,0.25);
  --color-info: #3b82f6;
  --color-info-bg: rgba(59,130,246,0.12);
  --color-info-border: rgba(59,130,246,0.25);

  /* --- Admin Accent --- */
  --admin-accent: #f97316;
  --admin-accent-bg: rgba(249,115,22,0.12);
  --admin-border: rgba(249,115,22,0.3);

  /* --- Shadows --- */
  --shadow-card: 0 2px 20px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3);
  --shadow-elevated: 0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4);
  --shadow-violet: 0 0 30px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1);
  --shadow-cyan: 0 0 30px rgba(6,182,212,0.2);

  /* --- Spacing Scale --- */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* --- Radius --- */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  /* --- Transitions --- */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ========================
   GLOBAL BASE STYLES
   ======================== */

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg-void);
  color: var(--text-primary);
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  font-weight: 600;
}

/* Gradient Text Utility */
.gradient-text {
  background: var(--brand-gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass Card Base */
.glass-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(12px);
  transition: border-color var(--transition-base), background var(--transition-base);
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.glass-card:hover {
  border-color: var(--border-soft);
  background: var(--bg-card-hover);
}

.glass-card:hover::before { opacity: 1; }

/* Animated gradient orb background */
.orb-bg {
  position: fixed;
  pointer-events: none;
  z-index: 0;
  inset: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.12;
  animation: float 8s ease-in-out infinite;
}

.orb-1 { width: 500px; height: 500px; background: #7c3aed; top: -100px; left: -100px; animation-delay: 0s; }
.orb-2 { width: 400px; height: 400px; background: #06b6d4; bottom: -100px; right: -100px; animation-delay: 3s; }
.orb-3 { width: 300px; height: 300px; background: #7c3aed; top: 50%; left: 50%; animation-delay: 6s; opacity: 0.07; }

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 30px) scale(0.97); }
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-soft); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--border-medium); }
```

---

## 🖥️ COMPONENT LIBRARY (Build Every Component Below)

### 1. SIDEBAR (`components/dashboard/Sidebar.tsx`)

```tsx
// DESIGN SPECIFICATIONS:

// Container:
// - Width: 240px desktop, 0 (hidden) mobile with overlay
// - Background: linear-gradient(180deg, #0d0d1a 0%, #08080f 100%)
// - Right border: 1px solid rgba(124,58,237,0.1)
// - Full height, fixed position

// Logo section (top):
// - 32x32 animated logo mark: purple→cyan gradient square with ⚡ icon
// - "AgentFlow" text in Space Grotesk 700, gradient colored
// - Tagline below: "AI Automation Platform" in 10px muted text

// Navigation groups with section labels:
//   MAIN: Dashboard, Tasks, AI Agent, Schedules
//   ANALYTICS: Analytics, Social Accounts
//   ACCOUNT: Settings, Profile

// Each nav item:
// - Icon (16x16) + Label side by side, 40px height
// - Inactive: color rgba(255,255,255,0.4), no background
// - Hover: background rgba(255,255,255,0.05), color rgba(255,255,255,0.7)
// - Active: background linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))
//           border: 1px solid rgba(124,58,237,0.3)
//           color: #a78bfa
//           left accent bar: 2px solid #7c3aed
// - Smooth transition: all 200ms cubic-bezier(0.4,0,0.2,1)

// Notification badges: small purple dot on relevant items

// User profile section (bottom):
// - Gradient avatar circle with user initials
// - Name in 13px DM Sans 500
// - Plan badge: "Pro" in tiny purple pill
// - Hover shows logout option

// Mobile: hamburger button (top-left), sidebar slides in from left with dark overlay
```

### 2. TOP NAVIGATION BAR

```tsx
// DESIGN SPECIFICATIONS:

// Height: 60px
// Background: rgba(9,9,15,0.8) with backdrop-filter: blur(20px)
// Border bottom: 1px solid rgba(255,255,255,0.05)
// Position: sticky top-0, z-index: 50

// LEFT SIDE:
// - Page title in Space Grotesk 600 18px
// - Breadcrumb below in 12px muted text (e.g. "Dashboard / Overview")

// CENTER — THE MAGIC: AI COMMAND BAR
// This is the hero element of every page. Make it unforgettable.
// 
// Appearance:
// - Pill shape, width: 320px, height: 36px
// - Background: rgba(124,58,237,0.08)
// - Border: 1px solid rgba(124,58,237,0.2)
// - Left: animated pulsing purple dot (live indicator)
// - Text: "Ask AI anything…" in 13px rgba(255,255,255,0.35)
// - Right: "⌘K" keyboard shortcut badge
// - Hover: border brightens to rgba(124,58,237,0.4), subtle glow
// - On click: opens full-screen AI command modal (see AI Command Modal below)

// RIGHT SIDE (left to right):
// - Status indicator: "● 3 running" in 11px green text
// - Notification bell: with badge count (unread alerts)
// - User avatar: gradient circle, click opens profile dropdown
```

### 3. ⭐ AI COMMAND MODAL (THE CROWN JEWEL — Build This Perfectly)

```tsx
// This is the most important UI element in the entire product.
// When user clicks the command bar or presses ⌘K:

// OVERLAY: rgba(0,0,0,0.85) full screen, blur(4px)

// MODAL CONTAINER:
// - Position: center of screen
// - Width: 680px max, responsive
// - Background: #0d0d1a
// - Border: 1px solid rgba(124,58,237,0.3)
// - Box shadow: 0 0 0 1px rgba(124,58,237,0.2), 0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.15)
// - Border radius: 20px
// - Animation: spring scale from 0.95 + fade in, 300ms

// TOP SECTION — Input:
// - Full-width textarea, no border, transparent background
// - Placeholder: "Tell me what you learned today, or give me a command..."
// - Font: DM Sans 15px, color var(--text-primary)
// - Min-height: 80px, auto-grow
// - Cursor: text
// - Purple animated underline/focus ring

// QUICK ACTIONS ROW (below input):
// Horizontal scrollable chips:
// [ ⚡ Post to LinkedIn ] [ 🐦 Tweet this ] [ 📅 Schedule post ] [ 🧠 Update memory ] [ 📊 Show analytics ]
// Chip style: pill, background rgba(255,255,255,0.05), border rgba(255,255,255,0.08)
// Active chip: purple gradient background

// AI RESPONSE AREA (appears after submit, animated):
// - Header: "✨ AgentFlow AI" + model badge "Gemini 1.5 Flash"
// - Content area: dark purple tinted, JetBrains Mono for generated text
// - Animated typewriter effect for AI response (character by character)
// - Word count, estimated read time shown as metadata

// BOTTOM ACTION BAR (appears with AI response):
// [ Publish Now → ] [ Schedule ] [ Edit ] [ Copy ] [ Regenerate ]
// Primary button: full gradient purple→cyan, glowing shadow
// Platform selector: pill buttons for LinkedIn | Twitter | Facebook | All

// KEYBOARD SHORTCUTS shown at bottom:
// Escape to close · Enter to send · Shift+Enter for new line

// Framer Motion animations:
// - Modal: scale(0.95)→scale(1), opacity 0→1, spring physics
// - Response: slides up from below + fade in
// - Each chip: stagger animation on modal open
```

### 4. STATS CARDS ROW

```tsx
// 4 cards in a CSS Grid, gap: 14px
// Each card:
// - Background: var(--bg-card)
// - Border: 1px solid var(--border-subtle)
// - Border radius: var(--radius-lg)
// - Padding: 20px
// - Cursor: pointer

// Top line:
// - Card number of this card (1-4) determines accent top-line color:
//   Card 1: linear-gradient(90deg, transparent, #7c3aed, transparent)
//   Card 2: linear-gradient(90deg, transparent, #06b6d4, transparent)
//   Card 3: linear-gradient(90deg, transparent, #10b981, transparent)
//   Card 4: linear-gradient(90deg, transparent, #f59e0b, transparent)
// - This is a ::before pseudo-element, position absolute at top

// Icon box (top-left of card):
// - 36x36, border-radius 10px
// - Card 1: bg rgba(124,58,237,0.15), icon color #a78bfa
// - Card 2: bg rgba(6,182,212,0.15), icon color #67e8f9
// - Card 3: bg rgba(16,185,129,0.15), icon color #6ee7b7
// - Card 4: bg rgba(245,158,11,0.15), icon color #fcd34d

// Stat Number:
// - Font: Space Grotesk 700, 28px
// - Color: var(--text-primary)
// - Animated count-up on page load using useCountUp hook

// Label:
// - Font: DM Sans 12px, var(--text-muted)
// - Uppercase, letter-spacing: 0.05em

// Change indicator (bottom):
// - "↑ +12.5% vs last month" in 11px
// - Up = color #10b981 (green)
// - Down = color #ef4444 (red)
// - Tiny sparkline mini-chart (optional, using recharts)

// Hover state:
// - border-color: var(--border-soft)
// - background: var(--bg-card-hover)
// - translateY(-2px)
// - top accent line appears with full opacity
```

### 5. ANALYTICS CHART CARD

```tsx
// Container: glass-card, full width of its grid cell
// Padding: 20px 24px

// Header row:
// - Title: Space Grotesk 14px 600
// - Right side: date range pills (7d | 30d | 90d) — active pill: gradient bg
// - "Live" badge: green dot + "Live" text, pulsing animation

// Chart area (use Recharts):
// - AreaChart for AI generations over time
// - Area fill: gradient from rgba(124,58,237,0.3) at top → transparent at bottom
// - Stroke: #7c3aed, strokeWidth: 2
// - Dots: appear on hover only
// - Grid lines: rgba(255,255,255,0.04), no x-axis line
// - Tooltip: custom dark tooltip with purple border
//   Style: { background: '#0d0d1a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '10px', padding: '8px 12px' }
// - Smooth curve: type="monotone"
// - Animation: animationDuration={1500}

// Below chart — platform breakdown donut (Recharts PieChart):
// - Colors: violet for LinkedIn, cyan for Twitter, green for Facebook
// - Center label: "Posts" in small text
// - Custom legend to the right with percentages
```

### 6. ACTIVITY FEED

```tsx
// Title row: "Recent Automations" + "View all →" link

// Each feed item:
// - Height: 44px, full width
// - Background: rgba(255,255,255,0.02)
// - Border: 1px solid rgba(255,255,255,0.04)
// - Border radius: 10px
// - Padding: 10px 14px
// - Flex row: [icon] [info] [status badge]

// Platform icon (28x28, rounded 8px):
// - LinkedIn: indigo bg + "in" logo
// - Twitter: cyan bg + "𝕏"
// - Facebook: blue bg + "f"

// Info section:
// - Task name: 12px, color rgba(255,255,255,0.75)
// - Time: 10px, var(--text-muted)

// Status badge (pill):
// - Success: bg rgba(16,185,129,0.12), text #6ee7b7, border rgba(16,185,129,0.2)
// - Failed: bg rgba(239,68,68,0.12), text #fca5a5, border rgba(239,68,68,0.2)
// - Running: bg rgba(124,58,237,0.12), text #c4b5fd, border rgba(124,58,237,0.2)
// - Running badge has a pulsing animation on its dot

// Failed items: left border 2px solid rgba(239,68,68,0.4), "Fix →" link appears on hover
```

### 7. UPCOMING TASKS WIDGET

```tsx
// Each task row:
// - Left: colored dot (violet/cyan/green/amber by task type)
// - Center: task name (bold) + schedule info (small muted)
// - Right: time until next run ("In 2h", "Tomorrow", etc.)
// - Warning tasks (token expired etc.): amber left border, amber dot, "Action required" pill

// "Create New Task" button at bottom:
// - Full width, dashed border, hover: solid purple border + glow
// - "+ New Task" with plus icon
```

### 8. PRIMARY BUTTON SYSTEM

```tsx
// 4 button variants:

// VARIANT: "primary" (most important CTA)
// background: linear-gradient(135deg, #7c3aed, #0ea5e9)
// color: white
// border: none
// border-radius: var(--radius-md)
// padding: 10px 20px
// font: DM Sans 14px 500
// hover: brightness(1.1), translateY(-1px)
// hover shadow: 0 4px 20px rgba(124,58,237,0.4)
// active: scale(0.98)
// disabled: opacity 0.4, cursor not-allowed

// VARIANT: "secondary"
// background: rgba(255,255,255,0.05)
// border: 1px solid rgba(255,255,255,0.1)
// color: var(--text-secondary)
// hover: background rgba(255,255,255,0.08), border rgba(255,255,255,0.16)

// VARIANT: "ghost"
// background: transparent
// border: none
// color: var(--text-accent)
// hover: background rgba(124,58,237,0.1)

// VARIANT: "danger"
// background: rgba(239,68,68,0.12)
// border: 1px solid rgba(239,68,68,0.3)
// color: #fca5a5
// hover: background rgba(239,68,68,0.2)

// ALL BUTTONS: Loading state shows spinner + "Loading..." text, disabled
// ALL BUTTONS: Framer Motion whileTap={{ scale: 0.97 }}
```

### 9. FORM INPUTS

```tsx
// TEXT INPUT:
// height: 40px
// background: var(--bg-input)
// border: 1px solid var(--border-subtle)
// border-radius: var(--radius-md)
// padding: 0 14px
// color: var(--text-primary)
// font: DM Sans 14px
// placeholder: var(--text-muted)
// focus: border-color rgba(124,58,237,0.5), box-shadow: 0 0 0 3px rgba(124,58,237,0.12)
// error: border-color rgba(239,68,68,0.5), box-shadow: 0 0 0 3px rgba(239,68,68,0.1)
// transition: all 200ms

// TEXTAREA:
// Same as input but height: auto, min-height: 100px
// resize: vertical

// SELECT:
// Same as input
// Custom dropdown with dark background (#0d0d1a), border, rounded corners
// Options: hover purple bg, check icon for selected

// LABEL:
// font: DM Sans 12px 500
// color: rgba(255,255,255,0.6)
// margin-bottom: 6px
// uppercase, letter-spacing: 0.04em

// ERROR MESSAGE:
// color: #fca5a5
// font-size: 11px
// margin-top: 4px
// appears with slide-down animation

// FORM CARD WRAPPER:
// glass-card, padding: 28px 32px
// Section heading: Space Grotesk 16px 600
```

### 10. DATA TABLE (for Tasks, Users, Logs)

```tsx
// Wrapper: glass-card, no padding

// TABLE HEADER:
// background: rgba(255,255,255,0.02)
// border-bottom: 1px solid var(--border-subtle)
// th: DM Sans 11px 500, var(--text-muted), uppercase, letter-spacing 0.06em
// padding: 12px 20px

// TABLE ROWS:
// border-bottom: 1px solid rgba(255,255,255,0.03)
// hover: background rgba(124,58,237,0.04)
// transition: background 150ms
// td: DM Sans 13px, padding 14px 20px

// COLUMNS:
// User column: avatar (circle) + name + email stacked
// Status column: colored pill badge
// Platform column: small platform icon + name
// Action column: "..." menu or icon buttons (Edit, Delete, View)

// EMPTY STATE:
// Centered in table body
// Illustration (simple SVG of robot/task) in muted purple
// Title: "No tasks yet" Space Grotesk 16px
// Subtitle: "Create your first AI task to get started"
// CTA button: primary style

// PAGINATION:
// Bottom row: "Showing 1–25 of 142 users"
// Left/right arrow buttons, page numbers
// "Per page" selector
// All in DM Sans 12px muted

// SEARCH + FILTER BAR (above table):
// Search input with magnifying glass icon, left-aligned
// Filter pills for status/type on the right
// Active filters show as purple pills with × to remove
```

---

## 🏠 LANDING PAGE — SECTION BY SECTION

### Hero Section

```tsx
// Full viewport height (100vh)
// Background: var(--bg-void) with 3 animated gradient orbs
// Noise texture overlay: subtle, 3% opacity

// BADGE (top):
// Pill: "✦ Now with Gemini 1.5 Flash" 
// bg: rgba(124,58,237,0.1), border: rgba(124,58,237,0.25)
// Left: animated pulsing purple dot
// Framer: fade-in-down, delay 0ms

// HEADLINE (largest text on page):
// Font: Space Grotesk 800, 72px, line-height 1.1
// Line 1: "Automate Your" — color white
// Line 2: "Professional Voice" — gradient text (violet→cyan)
// Line 3: "with AI" — color white
// Mobile: 40px
// Framer: fade-in-up, delay 100ms

// SUBHEADLINE:
// DM Sans 18px, var(--text-secondary), max-width 520px, centered
// "Create tasks, let AI write your content, and publish automatically to LinkedIn, Twitter, and more — while you sleep."
// Framer: fade-in-up, delay 200ms

// CTA BUTTONS (two, side by side):
// Primary: "Start Free Today →" — gradient button, 48px height, 20px padding
// Secondary: "Watch Demo" — ghost button with play icon (▶)
// "No credit card required" text below in 11px muted
// Framer: fade-in-up, delay 300ms

// HERO VISUAL (below CTAs):
// Browser mockup frame (dark, with red/yellow/green dots)
// Inside: Screenshot of dashboard (the design from Sidebar component)
// Framer: fade-in-up + subtle float animation (y: 0→-10px→0, 4s loop)
// Shadow: 0 40px 120px rgba(124,58,237,0.3), 0 0 0 1px rgba(255,255,255,0.1)

// TRUSTED BY: logos row in grayscale muted
// "Trusted by 2,400+ professionals"
```

### Features Grid Section

```tsx
// Section title: "Everything you need to automate your presence"
// Subtitle: one line, muted, centered

// 3×2 grid of feature cards (6 total):
// Card structure:
// - Icon: 44x44, gradient bg, 20px icon inside
// - Title: Space Grotesk 16px 600
// - Description: DM Sans 14px, var(--text-secondary), 3 lines max

// Feature 1: "AI Content Generation" — brain icon, violet
// Feature 2: "Smart Scheduling" — calendar icon, cyan
// Feature 3: "Multi-Platform Posting" — share icon, green
// Feature 4: "Performance Analytics" — chart icon, amber
// Feature 5: "AI Memory System" — database icon, violet
// Feature 6: "Admin Control" — shield icon, cyan

// Card hover effect:
// - translateY(-4px)
// - border: 1px solid rgba(124,58,237,0.3)
// - gradient top line appears

// Framer: staggerChildren(0.08s), each card slides up + fades in on scroll
```

### AI Workflow Demo Section

```tsx
// Background: slightly elevated panel (rgba(255,255,255,0.02))
// Section width: full, padding 80px 0

// 3-step animated demo:
// Step 1 → Step 2 → Step 3 (horizontal, connected by animated dashed line)

// Each step node:
// - Circle: 60x60, gradient border, number inside
// - Below: title + description
// - A realistic mockup card below showing what it looks like

// Animated connecting arrow: SVG path that draws itself (stroke-dashoffset animation)
// Arrow color: gradient from step 1 color → step 2 color

// Below the steps: a live preview area that cycles through example posts
// Tab buttons: LinkedIn | Twitter | Facebook
// Animated in/out as user switches tabs
```

### Pricing Section

```tsx
// 3 cards: Free | Pro | Team
// Centered, max-width 960px

// Each card:
// - glass-card base
// - Price: Space Grotesk 48px 700, "$0" or "$12" etc.
// - /month in 16px muted
// - Feature list with check icons (✓ in purple)
// - CTA button

// "Most Popular" card (Pro):
// - border: 1px solid rgba(124,58,237,0.4)
// - Top badge: gradient background, "Most Popular ✦"
// - Slightly scaled up: scale(1.03)
// - Glowing shadow: box-shadow: var(--shadow-violet)

// Annual toggle above cards: "Monthly | Annual (Save 30%)"
// Toggle: pill-shaped switch, animated sliding indicator
// Price animates when toggled
```

---

## 🛡️ ADMIN PANEL DESIGN

```tsx
// Admin has a DIFFERENT aesthetic to signal authority and power.
// While user dashboard is violet+cyan, admin is amber+orange.

// Admin sidebar:
// - Background: #0a0805 (slightly warm dark)
// - Accent color: #f97316 (orange)
// - Top: "ADMIN CONTROL" badge in orange pill
// - "AgentFlow" logo with orange accent

// Admin stats cards:
// - Same glass-card base
// - Top accent lines use orange gradient
// - Icon boxes use orange tints

// User table:
// - Standard glass-card table (see component 10)
// - "Impersonate" button in each row: ghost button, orange color, 👤 icon
// - On hover: "Login as user →" appears

// IMPERSONATION BANNER (CRITICAL UI):
// When admin impersonates a user, show this at top of page:
// - Full width, height: 44px
// - Background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(249,115,22,0.1))
// - Border-bottom: 1px solid rgba(245,158,11,0.3)
// - Left: ⚠️ icon (amber)
// - Text: "Admin Mode: You are viewing [UserName]'s account (user@email.com)"
// - Text color: #fcd34d
// - Right: "Exit Impersonation" button — red pill button
// - Animation: slides down from top, cannot be dismissed except by exit button
// - This banner MUST be sticky at top, z-index 100
```

---

## 🎬 ANIMATION SYSTEM (Framer Motion)

```tsx
// =============================================
// REUSABLE ANIMATION VARIANTS — put in lib/animations.ts
// =============================================

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
}

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.07 } }
}

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
}

// Page transition (wrap every page):
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25 }
}

// Floating animation (hero visual):
export const float = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
}

// Count-up animation for stats:
// Use: import { useCountUp } from 'react-countup'
// Configure: start: 0, end: value, duration: 1.5, delay: 0.3

// Pulse dot animation:
// @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(.8); } }

// Apply animations with these rules:
// - All cards: use staggerContainer on grid wrapper, fadeInUp on each child
// - All pages: wrap content in pageTransition motion.div
// - Stats row: count-up numbers on page load
// - Charts: animationDuration={1200} in Recharts
// - Modal open: scaleIn + overlay fade-in simultaneously
// - Sidebar nav items: slideInLeft, stagger 30ms each
```

---

## 📱 RESPONSIVE DESIGN RULES

```css
/* BREAKPOINTS */
/* Mobile:  0–639px  */
/* Tablet:  640–1023px */
/* Desktop: 1024px+  */

/* MOBILE RULES: */
/* - Sidebar: hidden, slide-in overlay with hamburger toggle */
/* - Stats row: 2 columns (2×2 grid) */
/* - Mid-row (chart + activity): stack vertically */
/* - AI Command bar: icon only, tap to open full modal */
/* - Font sizes: reduce by 10-15% across headings */
/* - Padding: 16px instead of 24px */
/* - Cards: full width, reduced padding (14px) */

/* TABLET RULES: */
/* - Sidebar: collapsed to icons only (64px), hover to expand */
/* - Stats row: 2×2 grid */
/* - Charts: full width */
```

---

## 🌟 PAGE-LEVEL DESIGN SPECS

### AI Assistant Page

```tsx
// This page is the product's heart — make it extraordinary.

// LAYOUT: Two-column (60/40 split)
// Left: Conversation / Output area
// Right: Context panel (memory, quick commands, tips)

// LEFT PANEL — Chat Interface:
// - Scroll area with messages
// - User messages: right-aligned, rounded bubble, rgba(124,58,237,0.15) bg
// - AI messages: left-aligned, darker card style with "⚡ AgentFlow AI" label
//   + tiny Gemini icon badge
// - AI text: JetBrains Mono for generated posts, DM Sans for explanations
// - "Generating..." state: 3 dot pulse animation in purple

// INPUT AREA (bottom of left panel, sticky):
// - Textarea: min-height 56px, auto-grows
// - Placeholder: "Describe what you learned, or give any command..."
// - Character counter bottom-right (e.g. "247/2000")
// - Toolbar row below textarea:
//   [ Platform: LinkedIn ▾ ] [ Tone: Professional ▾ ] [ 🧠 Use Memory ] [ ⚡ Generate ]
// - Generate button: gradient, larger (48px), glowing on hover

// RIGHT PANEL — Context:
// - "AI Memory" card: shows stored preferences
//   (industry, tone, writing style, recent topics)
// - "Quick Commands" list:
//   Each is a clickable pill that fills the input:
//   "📝 Summarize my week", "💡 Post about today's learning",
//   "📣 Promote a project", "🔁 Repurpose last post"
// - "Recent Posts" mini list: last 5 generated posts

// MOBILE: Single column, context panel becomes bottom sheet
```

### Settings Page

```tsx
// Tabs: Profile | Notifications | AI Preferences | Security | Danger Zone
// Each tab content is a glass-card

// Profile tab:
// - Avatar upload: circular drop zone with camera icon overlay on hover
//   Clicking opens file picker, image previews instantly
// - Form fields with labels (name, username, bio, timezone)
// - Bio: textarea with character limit (160)
// - "Save Changes" primary button, right-aligned

// AI Preferences tab (unique design):
// - Writing Tone: 5 clickable cards (Professional | Casual | Technical | Inspirational | Bold)
//   Each card has icon + name, selected: purple border + checkmark
// - Industry: searchable select
// - Memory Notes: textarea — "What should AI always remember about you?"
// - "Test AI" button: generates a sample post in real-time

// Security tab:
// - "Active Sessions" list with device icons, location, time, "Revoke" button
// - Change password form

// Danger Zone tab:
// - Red-accented section
// - "Delete Account" — requires typing "DELETE" in a field to confirm
// - "Export Data" — download all user data as JSON
```

### Analytics Page

```tsx
// Date range picker: custom pill design (7d | 30d | 90d | Custom)

// HERO METRICS: 4 large stat cards with mini sparkline charts inside

// CHARTS LAYOUT (below stats):
// Row 1: Full-width area chart — "Posts Published Over Time"
//         Two lines: Generated vs Published
//         Fill: gradient under each line
// Row 2: Left (60%): Bar chart — Posts by day of week
//         Right (40%): Donut — Platform breakdown with legend

// BEST PERFORMING POSTS TABLE:
// Columns: Post Preview (truncated) | Platform | Views | Engagement | Date
// Rows are clickable to expand full post content
// Sorted by engagement rate by default

// EXPORT BUTTON: top-right, "↓ Export CSV" ghost button
```

---

## 🎯 MICRO-INTERACTIONS CHECKLIST

Build ALL of these micro-interactions:

- [ ] Sidebar nav item hover: icon slightly scales up (scale 1.1), label brightens
- [ ] Stats card hover: card lifts (translateY -2px), top accent line fades in
- [ ] Button click: scale(0.97) for 100ms, then spring back
- [ ] Input focus: border color transitions to purple in 200ms, glow appears
- [ ] Status badge: "running" badge has a pulsing dot animation
- [ ] Avatar: hover shows subtle ring animation
- [ ] Notification bell: rings animation (rotate ±15°) when new notification arrives
- [ ] Task completion: strikethrough animates left→right, item fades out
- [ ] Chart tooltips: fade in, never flicker or jump
- [ ] Table row hover: very subtle purple tint (rgba 124,58,237,0.04) slides in from left
- [ ] Modal open: content scales up from 95%→100%, overlay fades in
- [ ] Toast notifications: slide in from top-right, auto-dismiss with shrink animation
- [ ] Page transitions: current page fades and shifts up slightly, new page fades in
- [ ] Skeleton loaders: purple-tinted shimmer (not gray)
- [ ] AI typing indicator: 3 dots with wave animation in purple tones

---

## ✅ FINAL QUALITY CHECKLIST

Before considering any page complete, verify:

1. **Fonts loaded** — Space Grotesk for headings, DM Sans for body, JetBrains Mono for code/AI output
2. **All colors use CSS variables** — zero hardcoded hex values outside of `:root {}`
3. **Hover states** — every interactive element has a hover state
4. **Loading skeletons** — purple shimmer skeleton shown while data fetches
5. **Empty states** — illustrated empty states with CTA for all lists/tables
6. **Error states** — red-accented error messages with retry option
7. **Mobile responsive** — tested at 375px, 768px, 1280px, 1440px
8. **Animations** — all Framer Motion, no CSS-only janky transitions
9. **No generic defaults** — no default browser styles visible anywhere
10. **AI Command Bar** — accessible from every dashboard page via ⌘K

---

## 📦 ADDITIONAL NPM PACKAGES REQUIRED

```bash
npm install react-countup           # Animated number count-up for stats
npm install react-hot-toast         # Beautiful toast notifications
npm install @radix-ui/react-dialog  # Accessible modal (Shadcn uses this)
npm install cmdk                    # Command palette (⌘K interface)
npm install react-textarea-autosize # Auto-growing textarea for AI input
npm install clsx tailwind-merge     # Class name utilities
npm install date-fns                # Date formatting
```

---

## 🚀 IMPLEMENTATION ORDER FOR UI

Build in this exact order for best results:

1. `globals.css` — all design tokens first
2. `lib/animations.ts` — all Framer Motion variants
3. Shared components: Logo, Button, Input, Badge, Card
4. Dashboard layout (Sidebar + Topbar)
5. Main Dashboard page (stats + charts)
6. AI Command Modal (⌘K) — this touches every page
7. Tasks page
8. AI Assistant page
9. Analytics page
10. Settings page
11. Admin layout (different theme)
12. Admin dashboard + user table
13. Landing page (Hero → Features → Pricing → Footer)
14. Auth pages (Login + Signup)

---

> **FINAL NOTE TO AI AGENT**: Do NOT compromise on this design. Every component described here must match the specifications exactly. This platform competes with products like Linear, Notion, and Vercel in terms of design quality. The AI Command Bar (⌘K modal) is the single most important feature — it should feel magical when the user opens it. The glowing effects, the spring animations, the gradient text — these are what make AgentFlow AI unforgettable.
```
