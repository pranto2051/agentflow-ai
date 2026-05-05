# ============================================================
#  ADMIN PAGES — COMPLETE AI GENERATION PROMPT
#  AgentFlow AI Platform
#  Pages: Automations · Analytics · Logs · Health · Security · Settings
# ============================================================

You are a senior full-stack engineer and UI/UX designer building a
production-ready admin panel for "AgentFlow AI" — an AI automation SaaS.

Generate COMPLETE, working TypeScript + Next.js 14 App Router code for all
6 admin pages listed below. Every file must be 100% complete — no truncation,
no "// ... rest of code" shortcuts.

---

## DESIGN SYSTEM REMINDER (apply to EVERY page)

```
Font:       Space Grotesk (headings/numbers) · DM Sans (body) · JetBrains Mono (logs/code)
Dark base:  --bg-void: #06060e  --bg-deep: #09090f  --bg-surface: #0d0d1a
Card:       background rgba(255,255,255,0.028) · border 1px solid rgba(255,255,255,0.06) · border-radius 14px
Admin accent: #f97316 (orange) — admin uses orange where user dashboard uses violet
Violet:     #7c3aed  Cyan: #06b6d4  Green: #10b981  Red: #ef4444  Amber: #f59e0b
Radius:     6 / 10 / 14 / 20px scale
Transitions: 200ms cubic-bezier(0.4,0,0.2,1)
Framer Motion on EVERY page: pageTransition + staggerChildren + fadeInUp on cards
```

All pages live at: `app/(admin)/admin/[page]/page.tsx`
All components live at: `components/admin/[page]/[ComponentName].tsx`
All data hooks live at: `hooks/admin/use[PageName].ts`
All API routes live at: `app/api/admin/[page]/route.ts`

---

# ═══════════════════════════════════════════════════════
# PAGE 1: /admin/automations
# File: app/(admin)/admin/automations/page.tsx
# ═══════════════════════════════════════════════════════

## CONCEPT
A real-time command center showing every automation running, queued,
succeeded, or failed across ALL users on the platform. Admins can
intervene, re-trigger, kill, or inspect any automation.

---

## REQUIRED COMPONENTS

### `components/admin/automations/AutomationStatsBar.tsx`
Horizontal strip of 5 metric pills at the top of the page.

Pill 1 — Total Today
  value: total automations triggered in last 24h
  icon: Zap (orange)
  color: orange accent

Pill 2 — Running Now
  value: count of status='running'
  icon: Loader2 (spinning animation, cyan)
  color: cyan, pulsing dot next to value

Pill 3 — Succeeded
  value: count status='success' today
  icon: CheckCircle2 (green)
  color: green

Pill 4 — Failed
  value: count status='failed' today
  icon: XCircle (red)
  color: red

Pill 5 — Avg Duration
  value: average duration_ms formatted as "2.4s"
  icon: Timer (amber)
  color: amber

Pill style: glass card, 1px border with colored top-line, inline flex layout,
            big number in Space Grotesk 28px, label in 11px muted.

---

### `components/admin/automations/LiveAutomationFeed.tsx`
A vertically scrolling live feed of automation events as they happen.

Header row: "Live Feed" title + green pulsing dot + "Auto-refresh: ON" toggle switch
            Toggle uses Supabase Realtime subscription on automation_logs table

Each feed item contains:
  - Left colored timeline dot (green=success, red=failed, cyan=running, amber=pending)
  - Connecting vertical line between items (timeline style)
  - User avatar (initials circle) + username + email in small text
  - Task name in 13px bold
  - Platform badge: LinkedIn (indigo pill) | Twitter (sky pill) | Facebook (blue pill)
  - AI model used: "Gemini 1.5 Flash" in JetBrains Mono 10px muted
  - Duration: "1.2s" in amber
  - Status badge with icon
  - Timestamp: "2 min ago" relative time, updates live
  - Expand chevron → shows full AI generated content + error details if failed

On hover: row background rgba(124,58,237,0.04), "View Details" button appears right side
Failed rows: left border 2px solid rgba(239,68,68,0.5), "Re-run" button in red ghost style
Running rows: shimmer animation on the row background

Max height: 480px with overflow-y: auto, custom scrollbar
Auto-scroll to top when new events arrive (with "↑ 3 new events" pill that user can click)

---

### `components/admin/automations/AutomationFiltersBar.tsx`
Horizontal filter controls bar.

Controls (left to right):
  1. Search input: "Search by user, task, or platform..." with magnifying glass icon
  2. Status filter: pill buttons [All] [Running] [Success] [Failed] [Pending]
     Active pill: orange bg, white text
  3. Platform filter: dropdown [All Platforms | LinkedIn | Twitter | Facebook]
  4. User filter: searchable select dropdown — type to search users
  5. Date range: "Last 24h ▾" dropdown [1h | 24h | 7d | 30d | Custom]
  6. "Export CSV" button: ghost style, download icon, right-aligned
  7. "Clear Filters" link: appears only when filters are active, orange color

---

### `components/admin/automations/AutomationTable.tsx`
Full data table of all automations with admin actions.

Columns:
  # | User | Task Name | Platform | Status | AI Content Preview | Duration | Triggered | Actions

Column details:
  User: avatar initials + name + email stacked, clickable → goes to /admin/users/[id]
  Task Name: bold 13px, task_type badge (Daily/Weekly) beside it
  Platform: icon + name colored pill
  Status: colored badge (Running=cyan pulse, Success=green, Failed=red, Pending=amber)
  AI Content Preview: first 60 chars of generated_content in JetBrains Mono 11px muted,
                      italic, "..." at end, hover tooltip shows full content
  Duration: in ms, color-coded (green <1000ms, amber 1000-3000ms, red >3000ms)
  Triggered: relative time + absolute on hover tooltip
  Actions column: icon button group
    👁 View — opens detail drawer/modal
    🔄 Re-run — re-triggers the automation (POST /api/admin/automations/rerun)
    ⛔ Kill — stops running automation (only shown if status=running)
    🗑 Delete log — deletes the log entry with confirmation

Row states:
  Running: subtle animated purple shimmer on the row
  Failed: very subtle red left border on the <tr>
  Expandable: clicking row expands inline to show full AI output + error stack

Pagination: 50 per page, show total count, page selector
Empty state: "No automations match your filters" with reset button

---

### `components/admin/automations/AutomationDetailDrawer.tsx`
Right-side slide-in drawer (not a modal) for viewing full automation detail.

Width: 480px, slides from right edge
Background: #0d0d1a, left border: 1px solid rgba(255,255,255,0.08)
Close: X button top-right or click outside overlay

Sections inside:
  1. Header: status badge (large) + timestamp + "Re-run" button

  2. User Info card:
     Avatar + name + email + role badge
     "View Profile" link → /admin/users/[id]

  3. Task Info card:
     Task title, type, frequency, platform, scheduled time

  4. AI Generation section (main content):
     Label: "Generated Content" in orange small caps
     Full generated_content in a dark code-style box (JetBrains Mono 13px)
     Hashtags shown as individual pills below
     Word count + estimated read time shown as metadata
     "Copy Content" button: copies to clipboard, shows ✓ for 2s

  5. Error Details (only if status=failed):
     Red-tinted card: error_message in JetBrains Mono red text
     "Error Code" if available
     Stack trace in collapsible section

  6. Technical Metadata:
     automation_logs.id (UUID), duration_ms, response JSON preview
     "Copy Log ID" button

  7. Actions footer (sticky):
     [Re-run Automation] [View User Dashboard] [Delete Log]

---

### `components/admin/automations/FailureRateChart.tsx`
Small chart card showing success vs failure rate trend.

Chart type: Bar chart (Recharts)
X-axis: Last 14 days (date labels)
Two bars per day: green (success count) + red (failure count)
Height: 160px
No legend (color obvious), tooltip shows exact counts

---

## API ROUTE: `app/api/admin/automations/route.ts`

```typescript
// GET /api/admin/automations
// Query params: status, platform, userId, dateRange, page, limit, search
// 1. Verify caller is admin (check profiles.role via service role client)
// 2. Build dynamic Supabase query with filters
// 3. JOIN with profiles (user info) and tasks (task info)
// 4. Return: { data: AutomationLog[], total: number, stats: AutomationStats }

// AutomationStats shape:
// { totalToday, runningNow, succeededToday, failedToday, avgDurationMs }

// POST /api/admin/automations/rerun
// Body: { logId: string }
// 1. Get the original task from the log
// 2. Re-trigger AI generation via Gemini
// 3. Save new log entry
// 4. Return new log

// DELETE /api/admin/automations/[id]
// Delete a log entry (admin only)
```

## DATA HOOK: `hooks/admin/useAutomations.ts`

```typescript
// Custom hook using SWR or React Query
// - Fetches automations list with filters
// - Supabase Realtime subscription for live updates
// - Auto-refreshes every 10 seconds
// - Methods: rerunAutomation(logId), deleteLog(logId), killAutomation(logId)
// - State: automations[], total, stats, isLoading, error, filters, setFilters
```

---

# ═══════════════════════════════════════════════════════
# PAGE 2: /admin/analytics
# File: app/(admin)/admin/analytics/page.tsx
# ═══════════════════════════════════════════════════════

## CONCEPT
A comprehensive business intelligence dashboard showing platform-wide
growth, AI usage, revenue indicators, user behavior, and automation
performance. Feels like a mini Mixpanel/Amplitude for the admin.

---

## REQUIRED COMPONENTS

### `components/admin/analytics/AnalyticsHeroMetrics.tsx`
4 large hero stat cards at the top. Each card has:

Card 1 — Total Users
  value: total count from profiles table
  change: "+24 this week" in green
  sparkline: 14-day user growth mini line chart (Recharts, 60x30px)
  icon: Users2, orange

Card 2 — Monthly Active Users (MAU)
  value: users with last_login within 30 days
  change: percentage of total "72% active rate"
  donut mini chart: active vs inactive
  icon: Activity, cyan

Card 3 — AI Generations This Month
  value: count from ai_generated_posts for current month
  change: vs last month percentage
  sparkline: daily generation counts
  icon: Brain, violet

Card 4 — Automation Success Rate
  value: "97.3%" percentage
  change: trend arrow + "vs last month 95.1%"
  micro gauge chart: semi-circle gauge (SVG, not recharts)
  icon: TrendingUp, green

Style: Same glass-card with colored top-line, Space Grotesk 32px for values,
       hover lifts card, count-up animation on mount.

---

### `components/admin/analytics/UserGrowthChart.tsx`
Primary large chart — most prominent on the page.

Title: "User Growth" with date range selector (7d|30d|90d|1y)
Chart: Recharts AreaChart, full width, height 280px
Two overlapping areas:
  - "New Signups" (violet area, gradient fill)
  - "Cumulative Users" (cyan line only, no fill, dashed)
X-axis: formatted dates
Y-axis: user counts
Custom tooltip: dark card showing both values for hovered date
Annotation marker: show the day with highest signups as a special dot + label
Animation: 1200ms on mount

Below chart: summary row "Peak day: May 12 (47 signups) · Avg/day: 18 · Total: 2,412"

---

### `components/admin/analytics/AIUsageBreakdown.tsx`
Two-column section.

Left (60%): Stacked bar chart — AI Generations per day, stacked by platform
  LinkedIn stack: violet
  Twitter stack: cyan
  Facebook stack: green
  Height: 220px

Right (40%): Statistics panel
  - Total tokens used this month (formatted with commas)
  - Gemini API calls count
  - Avg tokens per generation
  - Most used prompt type: "LinkedIn Post (68%)"
  - Cost equivalent (even though free): "~$0 (free tier)"
  - Token budget remaining: progress bar (orange fill)
    "847,200 / 1,000,000 tokens used"

---

### `components/admin/analytics/PlatformPerformanceGrid.tsx`
3 platform cards side by side.

Each card (LinkedIn / Twitter / Facebook):
  Header: platform icon + name + total posts count
  Metrics:
    - Posts published this month
    - Avg engagement rate (if available)
    - Connected accounts count
    - Success rate (%)
  Mini bar chart: posts per last 7 days (height: 60px)
  Status: "Most Active" badge on highest volume platform

---

### `components/admin/analytics/TopUsersTable.tsx`
"Power Users" leaderboard table.

Title: "Most Active Users" + "This Month" pill
Columns: Rank | User | Tasks | AI Posts | Success Rate | Last Active | Actions
Rank: medal emoji for top 3 (🥇🥈🥉), number for rest
User: avatar + name + email
Actions: "View Profile" ghost button

Max 10 rows, no pagination (top 10 only)
Hover row: very subtle purple tint

---

### `components/admin/analytics/RetentionHeatmap.tsx`
User retention cohort heatmap (simplified version).

Title: "Weekly Retention by Signup Cohort"
Grid: Rows = signup week, Columns = Week 0 through Week 8
Each cell: percentage value, background color intensity = retention %
Color scale: 0%=rgba(239,68,68,0.1) → 100%=rgba(16,185,129,0.6)
Tooltip: "Week 3 cohort, 5 weeks later: 42% retained"

---

### `components/admin/analytics/GeographyCard.tsx`
Simple text-based geography breakdown (no map needed).

Title: "Users by Country"
List: flag emoji + country name + count + percentage bar
Show top 10 countries
Progress bars: orange fill, percentage text right-aligned

---

### `components/admin/analytics/AnalyticsDateRangePicker.tsx`
Reusable date range control used across all charts.

Pill buttons: [7d] [30d] [90d] [1y] [Custom]
Active: orange gradient pill
Custom: opens a simple from/to date input
On change: updates all charts simultaneously via React context
"Compare to previous period" toggle: shows ghost overlay on charts when enabled

---

## API ROUTE: `app/api/admin/analytics/route.ts`

```typescript
// GET /api/admin/analytics
// Query params: dateRange (7d|30d|90d|1y), startDate?, endDate?
// Returns comprehensive analytics object:
// {
//   userGrowth: { date, newSignups, cumulative }[],
//   mau: number,
//   totalUsers: number,
//   aiGenerations: { date, linkedin, twitter, facebook, total }[],
//   totalTokensUsed: number,
//   successRate: number,
//   topUsers: User[],
//   platformBreakdown: { platform, count, successRate }[],
//   retentionCohorts: RetentionRow[],
//   geographyData: { country, count, flag }[],
//   summary: { peakDay, avgPerDay, total }
// }
```

---

# ═══════════════════════════════════════════════════════
# PAGE 3: /admin/logs
# File: app/(admin)/admin/logs/page.tsx
# ═══════════════════════════════════════════════════════

## CONCEPT
A professional log viewer — like Datadog or Papertrail but styled for
AgentFlow. Admins can search, filter, and deep-dive into every system
event: automation runs, AI API calls, auth events, errors, cron jobs.

---

## REQUIRED COMPONENTS

### `components/admin/logs/LogsSearchBar.tsx`
Advanced search interface at the top.

Elements:
  1. Large search input (full width, prominent):
     Placeholder: 'Search logs... e.g. "user:john@email.com status:failed platform:linkedin"'
     Support query syntax highlighting as user types
     Keyboard shortcut: / to focus

  2. Quick filter chips below search (toggleable):
     [🔴 Errors Only] [🟡 Warnings] [⚡ AI Events] [🔑 Auth Events] [⏱ Cron Jobs] [💀 Critical]
     Active chip: filled with matching color

  3. Advanced Filters (collapsible panel, "Advanced ▾" toggle):
     - User: searchable select
     - Date range: from/to datetime pickers
     - Log level: checkboxes (DEBUG, INFO, WARNING, ERROR, CRITICAL)
     - Source: dropdown (automation_engine | ai_service | auth | cron | api | social)
     - Duration: slider "Show only calls longer than X ms"

  4. Right side: "Live Tail" toggle + "Export" button + log count badge "2,847 logs"

---

### `components/admin/logs/LogLevelSummaryBar.tsx`
Colored summary strip showing counts by log level.

5 segments in a horizontal bar (proportional widths):
  DEBUG (gray) | INFO (blue) | WARNING (amber) | ERROR (red) | CRITICAL (deep red)
  Each segment: count number + label
  Click a segment → filters table to that level
  The bar itself is a proportional stacked bar chart showing today's distribution

---

### `components/admin/logs/LogsTable.tsx`
The main log viewer. Dense, information-rich, like a terminal but styled.

Display mode toggle: [Table View] [Stream View] (top right)

TABLE VIEW columns:
  Timestamp | Level | Source | User | Message | Duration | Details

  Timestamp: "2025-05-04 14:32:11.847" in JetBrains Mono 11px, timezone shown on hover
  Level badge: colored pill
    DEBUG: gray bg/text
    INFO: blue bg/text
    WARNING: amber bg/text
    ERROR: red bg/text
    CRITICAL: deep red bg, white text, pulsing border
  Source: monospaced label e.g. "automation_engine" "ai_service" "cron"
  User: avatar + truncated email, "System" for system events
  Message: the log message, max 1 line, expand on click, code in monospace
  Duration: color-coded ms value (only for API/automation logs)
  Details: "›" expand arrow

Row click → expands inline to show:
  Full message | Request payload (JSON, syntax highlighted) | Response JSON
  Stack trace (if error) in red monospace
  Related log IDs (linked)
  Copy row as JSON button

Row coloring:
  CRITICAL rows: left border 3px solid #7f1d1d, bg rgba(239,68,68,0.05)
  ERROR rows: left border 2px solid rgba(239,68,68,0.4), bg rgba(239,68,68,0.025)
  WARNING rows: left border 2px solid rgba(245,158,11,0.3)

---

STREAM VIEW (when toggled):
  Terminal-style display, monochrome with colored level prefixes
  Dark background (#030307), green cursor blinking at bottom
  Text: JetBrains Mono 12px, line-height 1.8
  Level colors: INFO=cyan, WARNING=amber, ERROR=red, CRITICAL=bright red
  Format: [14:32:11] [INFO ] [automation] User john@email.com: Task "Daily LinkedIn" executed in 1.2s
  Auto-scroll toggle: "Pause" button to stop auto-scroll
  Max 500 visible lines, virtual scrolling for performance

---

### `components/admin/logs/LogStats.tsx`
Small stats panel (right sidebar or top of page).

Stats shown:
  - Total logs today
  - Error rate (errors/total %)
  - Most common error message
  - Busiest hour today (e.g. "2PM — 847 logs")
  - Avg API response time
  - Cron job last run + next run

---

### `components/admin/logs/LogsExportModal.tsx`
Modal triggered by Export button.

Options:
  Format: [JSON] [CSV] [Plain Text]
  Date range: from/to
  Log levels: checkboxes
  Max records: input (default 10,000)
  "Export" button: generates and downloads file
  Shows progress bar while preparing

---

## API ROUTE: `app/api/admin/logs/route.ts`

```typescript
// GET /api/admin/logs
// Params: search, level, source, userId, startDate, endDate, page, limit, durationMin
// 1. Verify admin
// 2. Query automation_logs with dynamic WHERE clauses
// 3. JOIN profiles for user info
// 4. Support full-text search on message/response columns
// 5. Return: { logs: Log[], total, stats: LogStats, levelCounts: Record<Level, number> }

// GET /api/admin/logs/stream  (for Server-Sent Events live tail)
// Returns SSE stream of new log entries as they are inserted
// Uses Supabase Realtime postgres_changes

// GET /api/admin/logs/export
// Returns downloadable file in requested format
// Streams large datasets
```

---

# ═══════════════════════════════════════════════════════
# PAGE 4: /admin/health
# File: app/(admin)/admin/health/page.tsx
# ═══════════════════════════════════════════════════════

## CONCEPT
A real-time infrastructure and system health dashboard. Like a simplified
StatusPage.io showing the health of every service AgentFlow depends on,
plus internal system metrics. Gives admin instant situational awareness.

---

## REQUIRED COMPONENTS

### `components/admin/health/OverallStatusBanner.tsx`
Full-width status banner at the very top of the page.

States:
  ALL SYSTEMS OPERATIONAL
    bg: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))
    border-bottom: 1px solid rgba(16,185,129,0.3)
    icon: green shield checkmark
    text: "All Systems Operational" in Space Grotesk green

  DEGRADED PERFORMANCE
    bg: amber tint
    icon: amber warning triangle
    text: "Degraded Performance — [Service Name] is experiencing issues"

  PARTIAL OUTAGE
    bg: orange tint
    text: "Partial Outage — [N] services affected"

  MAJOR OUTAGE
    bg: red tint, pulsing border animation
    text: "Major Outage — Immediate attention required"

Auto-refreshes every 30 seconds. Last checked: timestamp shown right side.

---

### `components/admin/health/ServiceStatusGrid.tsx`
Grid of service status cards. 3 columns on desktop, 1 on mobile.

SERVICE CARDS (one per service):

Card 1 — Supabase Database
  Icon: Database (orange)
  Status indicator: large colored dot + text (Online / Degraded / Offline)
  Metrics:
    - Response time: "12ms" (color-coded: green <50ms, amber 50-200ms, red >200ms)
    - Connection pool: "8/20 connections"
    - DB size: "247 MB / 500 MB" with progress bar
    - Last migration: relative time
  Mini uptime bar: last 90 days as tiny squares (green=up, red=down, amber=degraded)
  Action: "Open Supabase Dashboard ↗" link

Card 2 — Supabase Auth
  Icon: Shield
  Metrics:
    - Active sessions: count
    - Auth requests/min: current rate
    - Failed logins last hour: count (red if > 10)
    - OAuth providers status: LinkedIn ✓ Twitter ✓ Facebook ✓
  Uptime bar: last 90 days

Card 3 — Gemini AI API
  Icon: Brain (violet)
  Metrics:
    - Status: Online / Rate Limited / Error
    - Requests today: count + progress bar vs daily limit
    - Tokens used today: count + progress bar (1M limit)
    - Avg response time: in ms
    - Error rate: percentage
    - Model: "gemini-1.5-flash" badge
  Warning if tokens > 80%: amber alert card below

Card 4 — Vercel (Application)
  Icon: triangle/vercel icon
  Metrics:
    - Deployment status: "Production ✓ · v1.4.2"
    - Last deploy: timestamp + commit hash
    - Active regions: ["iad1", "sfo1"] pills
    - Edge function invocations/day
    - Bandwidth used
  "View Deployment ↗" link

Card 5 — Cron Jobs
  Icon: Clock (amber)
  Table inside card (not a separate table):
    Cron name | Schedule | Last Run | Next Run | Status | Duration
    "run-tasks" | "0 * * * *" | "14 min ago" | "in 46 min" | ✓ Success | 1.2s
  "Trigger Now" button next to each cron (admin manually triggers)
  Failed cron: red row, "Re-run" button

Card 6 — Email Service (Resend)
  Icon: Mail (cyan)
  Metrics:
    - Emails sent today
    - Delivery rate
    - Bounce rate
    - Remaining free quota

Card 7 — Storage (Supabase Storage)
  Icon: HardDrive
  Metrics:
    - Total files: count
    - Storage used: "247 MB / 1 GB" with progress bar
    - Bandwidth used this month
    - Largest files list (top 3)

Card 8 — Social API Connections
  Icon: Share2
  Status per platform:
    LinkedIn API: Online | Rate limit: 800/1000 remaining
    Twitter API: Online | Rate limit: 1,200/1,500 remaining
    Facebook API: Online | Rate limit: 400/200 ← RED (exceeded)
  Each platform shows: status dot + rate limit remaining bar

---

### `components/admin/health/PerformanceMetricsRow.tsx`
4 metric gauges in a horizontal row.

Gauge 1 — API Response Time (avg)
  Value: "48ms" in large text
  Semi-circle gauge SVG (custom, no library)
  Scale: 0ms to 500ms
  Color: green < 100ms, amber 100-300ms, red > 300ms
  Subtitle: "p95: 120ms · p99: 340ms"

Gauge 2 — Error Rate
  Value: "0.8%"
  Same gauge style
  Scale: 0% to 10%
  Color: green < 1%, amber 1-5%, red > 5%

Gauge 3 — Automation Success Rate
  Value: "97.3%"
  Color: green > 95%, amber 85-95%, red < 85%

Gauge 4 — Queue Depth
  Value: "12 pending"
  Shows pending automations in queue
  Color: green < 20, amber 20-50, red > 50

---

### `components/admin/health/UptimeHistoryChart.tsx`
Timeline chart showing service uptime over last 30 days.

Y-axis: list of services (Database, Auth, AI API, Cron, Email)
X-axis: last 30 days
Each cell: colored rectangle
  Green = operational, Amber = degraded, Red = outage, Gray = unknown
Tooltip: shows exact status + duration for any incident

Below chart: "30-day uptime: 99.94%" in green for each service

---

### `components/admin/health/RecentIncidents.tsx`
Incident log panel.

Title: "Recent Incidents"
Each incident:
  - Status badge: Resolved (green) | Ongoing (red pulsing) | Monitoring (amber)
  - Title: "Gemini API Rate Limit Exceeded"
  - Time range: "May 3, 14:20 — 14:47 (27 min)"
  - Affected service + impact: "AI generation failed for 23 users"
  - Resolution: brief text
Empty state: "No incidents in the last 30 days 🎉" in green

---

### `components/admin/health/SystemResourcesCard.tsx`
Shows Vercel/server resource usage.

Metrics:
  - Build minutes used this month (Vercel free: 6,000 min/month)
  - Serverless function invocations (free: 100GB-hrs)
  - Bandwidth used (free: 100GB/month)
  - Cron executions (free: limited)
Each metric: label + current value + max + progress bar + color status

---

## API ROUTES: `app/api/admin/health/route.ts`

```typescript
// GET /api/admin/health
// Checks all services and returns health status
// Implementation:
// 1. Check Supabase: run simple query, measure response time
// 2. Check Gemini API: call with empty test prompt, check response
// 3. Check cron jobs: query last automation_log for cron source, check recency
// 4. Check Resend: call /api/email-stats endpoint
// 5. Calculate metrics from DB queries
// Returns:
// {
//   overallStatus: 'operational'|'degraded'|'partial_outage'|'major_outage',
//   services: ServiceHealth[],
//   metrics: { avgResponseTime, errorRate, successRate, queueDepth },
//   incidents: Incident[],
//   lastChecked: ISO timestamp
// }
// This endpoint is itself cached for 30 seconds

// POST /api/admin/health/trigger-cron
// Manually triggers a cron job
// Body: { cronName: string }
// Calls the cron API route directly with CRON_SECRET header
```

---

# ═══════════════════════════════════════════════════════
# PAGE 5: /admin/security
# File: app/(admin)/admin/security/page.tsx
# ═══════════════════════════════════════════════════════

## CONCEPT
A security operations center for the platform. Shows suspicious activity,
manages authentication policies, controls admin access, logs all sensitive
actions, and gives admin tools to respond to threats immediately.

---

## REQUIRED COMPONENTS

### `components/admin/security/SecurityScoreCard.tsx`
The hero element of the security page. A prominent "Security Score" display.

Large circular progress gauge (SVG):
  - Outer ring: gradient from red → amber → green
  - Score displayed in center: "87 / 100" in Space Grotesk 48px
  - Label: "Good" or "Excellent" or "At Risk" based on score
  - Animated: score counts up when page loads

Below gauge: score breakdown list
  ✅ Row Level Security: Enabled (+20 pts)
  ✅ JWT Auth: Active (+20 pts)
  ✅ Admin 2FA: Enabled (+15 pts)
  ⚠️ Rate Limiting: Basic only (+10/15 pts) — "Upgrade to advanced"
  ✅ Encrypted Tokens: Yes (+20 pts)
  ❌ Audit Log Retention: 30 days (should be 90) (+2/10 pts)

Each item: checkmark/warning/X icon, colored text, points contribution

---

### `components/admin/security/ThreatFeed.tsx`
Real-time security event feed. The most important component on this page.

Title: "Threat Detection" + red pulsing dot if any active threats
Toggle: [All Events] [Threats Only] [Auth Events] [Admin Actions]

Each security event item:
  Severity icon: 🔴 Critical / 🟡 Warning / 🔵 Info (left-aligned colored dot)
  Event type badge: [BRUTE FORCE] [RATE LIMIT] [SUSPICIOUS LOGIN] [ADMIN ACTION] [OAUTH FAIL]
  Description: "5 failed login attempts for user@email.com from IP 123.45.67.89"
  IP address: monospaced, with country flag emoji
  Timestamp: relative + absolute on hover
  Action buttons:
    For threats: [Block IP] [Suspend User] [Dismiss]
    For info: [View User] [View Logs]

Event types to detect and display:
  1. Multiple failed login attempts (> 5 in 10 min from same IP)
  2. Login from new country/location
  3. Admin impersonation sessions started/ended
  4. User account suspended/banned
  5. Password reset requests
  6. OAuth token refresh failures
  7. Rate limit exceeded events
  8. API key usage (if applicable)
  9. Bulk actions (admin deleting many users)
  10. Cron job failures (potential attack surface)

---

### `components/admin/security/ActiveSessionsTable.tsx`
All currently active user sessions across the platform.

Title: "Active Sessions" + total count badge

Columns:
  User | Session Start | Last Activity | IP Address | Location | Device | Actions

Details:
  User: avatar + name + email, admin badge if admin
  Session Start: relative time
  Last Activity: relative time (updates live via polling)
  IP Address: monospaced, with "🚩 Flag" button if suspicious
  Location: "Dhaka, Bangladesh 🇧🇩" (GeoIP lookup - use a free service)
  Device: icon (Desktop/Mobile/Tablet) + browser name
  Actions: [View Activity] [Force Logout] (Force Logout = revoke Supabase session)

Highlight rows:
  Admin sessions: subtle orange left border
  Long sessions (> 24h): amber dot
  Suspicious (new location): red dot + "Unusual" badge

Summary stats above table:
  Total active: N | Admins online: N | Mobile: N% | New locations: N

---

### `components/admin/security/ImpersonationAuditLog.tsx`
Complete log of all admin impersonation events.

Title: "Impersonation Audit Log"
Subtitle: "All admin access to user accounts — required for compliance"

Each log entry:
  - Admin who impersonated: avatar + name
  - Target user: avatar + name + email
  - Duration: "Started 14:32 → Ended 14:47 (15 min)"
  - Actions taken during session: list of actions if logged
  - IP address
  - Status: Active (red pulse) | Ended (green)

Active impersonations highlighted at top in amber card:
  "Admin John is currently viewing Sarah's account — Started 8 min ago [End Session]"

---

### `components/admin/security/IPBlocklistManager.tsx`
Manage blocked IP addresses.

Table of blocked IPs:
  IP | Reason | Blocked By | Blocked At | Auto-Unblock | Actions
  Actions: [Unblock] [View Logs for IP]

Add to blocklist form:
  IP input + Reason dropdown (Brute force / Spam / Manual) + Block duration
  "Block IP" button

Show: total blocked count, last block time

---

### `components/admin/security/AuthPolicySettings.tsx`
Configure authentication security policies.

Settings (each as a toggle card):

  1. Require Email Verification
     Toggle: on/off
     Description: "New users must verify email before accessing dashboard"

  2. Session Timeout
     Slider: 1h to 30 days
     Current: "7 days"
     Note: "Users are logged out after this period of inactivity"

  3. Max Failed Login Attempts
     Number input: 1-20, default 5
     Action after limit: [Temporary lockout (15min)] [Account suspend] [Captcha]

  4. Admin 2FA Required
     Toggle: enforce 2FA for all admin accounts
     Note: "If enabled, admins without 2FA set up will be forced to configure it"

  5. IP Whitelist for Admin (optional)
     Textarea: one IP per line
     Toggle: Enable/disable whitelist
     Warning: "Enabling this will block ALL admin logins not from listed IPs"

  6. Automatic Threat Detection
     Toggle: auto-block IPs after 10 failed attempts
     Toggle: alert admin email on suspicious login

  "Save Security Policy" button: primary orange, saves to Supabase admin_settings

---

### `components/admin/security/SecurityEventsChart.tsx`
Chart showing security events over time.

Line chart (Recharts), height 180px
Multiple lines:
  - Failed logins (red)
  - Successful logins (green)
  - Admin actions (orange)
X-axis: last 14 days
Custom legend below

---

## API ROUTES: `app/api/admin/security/route.ts`

```typescript
// GET /api/admin/security/overview
// Returns:
// {
//   securityScore: number,
//   scoreBreakdown: ScoreItem[],
//   activeSessions: Session[],
//   threatEvents: ThreatEvent[],
//   impersonationLog: ImpersonationLog[],
//   blockedIPs: BlockedIP[],
//   authPolicy: AuthPolicy,
//   eventsChart: ChartData[]
// }

// POST /api/admin/security/block-ip
// Body: { ip, reason, duration }
// Adds to ip_blocklist table (create this table if not exists)

// DELETE /api/admin/security/block-ip/[ip]
// Removes IP from blocklist

// POST /api/admin/security/force-logout
// Body: { userId }
// Uses Supabase Admin API to revoke user's sessions:
// supabaseAdmin.auth.admin.signOut(userId)

// PUT /api/admin/security/auth-policy
// Body: AuthPolicy object
// Saves to admin_settings table

// GET /api/admin/security/events
// Returns security event log with filters
```

---

# ═══════════════════════════════════════════════════════
# PAGE 6: /admin/settings
# File: app/(admin)/admin/settings/page.tsx
# ═══════════════════════════════════════════════════════

## CONCEPT
The control panel for the entire platform's configuration.
Unlike user settings (personal preferences), admin settings control
system-wide behavior, limits, integrations, email templates,
AI model config, and platform branding.

---

## LAYOUT: Tabs-based, vertical tabs on left side (not horizontal)

Vertical tab list (left sidebar within the page, 200px wide):
  - General
  - AI Configuration
  - Email & Notifications
  - User Limits & Quotas
  - Social API Keys
  - Admin Accounts
  - Maintenance
  - Advanced

Each tab opens a settings panel on the right (full width)

---

## TAB 1 — General (`components/admin/settings/GeneralSettings.tsx`)

Platform Identity section:
  - Platform Name: text input (default "AgentFlow AI")
  - Platform URL: text input (your Vercel domain)
  - Support Email: text input
  - Logo Upload: image drop zone + preview (circular preview)
  - Favicon Upload: small square upload

Platform Status section:
  - Status toggle: [Operational | Maintenance | Degraded] — radio cards
  - Maintenance Message: textarea (shown to users when in maintenance mode)
  - Maintenance Banner: toggle (show/hide site-wide banner to all users)

Feature Flags section (all toggle switches):
  - User Signups: toggle (disable to close registration)
  - Google OAuth: enable/disable
  - GitHub OAuth: enable/disable
  - LinkedIn Integration: enable/disable
  - Twitter Integration: enable/disable
  - Facebook Integration: enable/disable
  - AI Assistant: enable/disable system-wide
  - Analytics Dashboard: show/hide from user nav

"Save General Settings" button

---

## TAB 2 — AI Configuration (`components/admin/settings/AIConfigSettings.tsx`)

Model Settings:
  - AI Model: dropdown [gemini-1.5-flash (Free) | gemini-1.5-pro (Paid)]
    gemini-1.5-flash selected + "(Recommended for free tier)" note
  - Max tokens per generation: slider 256–4096, default 1024
  - Temperature: slider 0.0–1.0, default 0.7
    Helper text: "0 = deterministic, 1 = creative. 0.7 is recommended."
  - Top-P: slider 0.0–1.0, default 0.9

Rate Limiting:
  - Max AI generations per user per day: number input
  - Max AI generations per user per month: number input
  - Cooldown between generations: slider (0–60 seconds)
  - Admin bypass rate limits: toggle

Default Prompt Templates:
  Card for each template with a CodeEditor-style textarea (dark bg, mono font):
  - LinkedIn Post Template
  - Twitter Post Template
  - Facebook Post Template
  Each has a "Reset to Default" link

Content Policy:
  - Block profanity: toggle
  - Content moderation: toggle (uses Gemini safety settings)
  - Max content length: number input
  - Allowed topics: tag input (whitelist mode toggle)
  - Blocked topics: tag input

"Test AI Configuration" button:
  Opens a small test modal where admin types a prompt and sees output with current settings

---

## TAB 3 — Email & Notifications (`components/admin/settings/EmailSettings.tsx`)

SMTP / Email Provider:
  - Provider: dropdown [Resend (Free) | SMTP | SendGrid]
  - API Key: password input with show/hide toggle
  - From Name: text input "AgentFlow AI"
  - From Email: text input
  - "Send Test Email" button → sends to admin's email

Email Templates:
  Accordion list of email templates (click to expand and edit):
  - Welcome Email (on signup)
  - Email Verification
  - Password Reset
  - Task Failed Notification
  - Weekly Digest
  - Admin Alert (for admin notifications)

Each template editor:
  - Subject line input
  - Body: simple rich-text-like textarea (no complex editor, just textarea)
  - Variables: shows available {{variables}} in a reference box
  - Preview button: shows rendered preview in modal
  - Reset to default link

Admin Notification Preferences:
  Toggle matrix — admin gets notified via email/in-app for:
  - New user signup: [Email ✓] [In-app ✓]
  - Automation failure > 10 in 1h: [Email ✓] [In-app ✓]
  - System error: [Email ✓] [In-app ✓]
  - New security threat: [Email ✓] [In-app ✓]
  - Daily report: [Email ✓] [In-app —]

---

## TAB 4 — User Limits & Quotas (`components/admin/settings/QuotaSettings.tsx`)

Plan-based limits (3 columns: Free | Pro | Team):
Each row = a feature, each cell = input for that plan's limit.

Features:
  - Max tasks per user
  - Max AI generations per month
  - Max social accounts connected
  - Automation history retention (days)
  - File storage limit (MB)
  - API rate limit (requests/hour)

Table style: rows = features, columns = plans
  Each cell: number input
  "∞" checkbox: set to unlimited

Global Overrides:
  - Override user quota: search a specific user + set custom limits
    Shows as: user card + input fields for each limit
    "Add Override" → searchable user select → quota inputs
  - List of users with overrides + "Remove Override" button

Default New User Plan:
  Radio cards: [Free] [Pro] (which plan gets assigned on signup)

---

## TAB 5 — Social API Keys (`components/admin/settings/SocialAPISettings.tsx`)

One card per platform (LinkedIn, Twitter/X, Facebook):

Each card:
  Header: platform logo (SVG) + platform name + status badge

  Fields:
  - Client ID: text input
  - Client Secret: password input (show/hide button)
  - Redirect URI: readonly text showing your callback URL
  - Scopes: readonly pills showing required scopes
  - Webhook URL (if applicable)

  Status section:
  - Last OAuth test: timestamp + result (✓ Success / ✗ Failed)
  - "Test Connection" button: makes a test API call, shows result inline
  - Connected user accounts: count (e.g. "47 users connected")

  Instructions collapsible:
  Step-by-step guide to get credentials for this platform
  (Link to platform's developer docs)

  "Save [Platform] Settings" button per card

---

## TAB 6 — Admin Accounts (`components/admin/settings/AdminAccountsSettings.tsx`)

Current Admin Users:
  Table: Avatar | Name | Email | Last Login | 2FA | Actions
  Actions: [Remove Admin Role] (cannot remove yourself)
  2FA status badge: Enabled (green) | Disabled (red)

Promote User to Admin:
  Search user input (searchable select)
  "Grant Admin Access" button
  Confirmation dialog: "Are you sure? This gives full platform access."

Admin Activity Log:
  Last 20 admin actions across all admins
  Columns: Admin | Action | Target | Timestamp
  Examples: "John granted admin to Sarah", "Jane suspended user bob@email.com"

---

## TAB 7 — Maintenance (`components/admin/settings/MaintenanceSettings.tsx`)

Database Tools:
  - "Clear Old Logs" button: deletes automation_logs older than X days
    Input: number of days to keep (default 90)
    Shows: "This will delete ~2,847 log entries. Are you sure?"
    Progress indicator when running

  - "Recalculate Analytics Cache" button
    Refreshes any cached analytics data

  - "Re-sync AI Memory" button: triggers a scan of all users' AI memory

Backup & Export:
  - "Export Full Database Backup" button
    Downloads all tables as JSON zip
    Shows estimated file size and time

  - "Export Users CSV" button (just users)

System Messages:
  - Site-wide banner: text input + color picker (info/warning/error)
  - Toggle: show/hide banner
  - Preview: shows how it looks above the dashboard

Schedule Maintenance Window:
  - Date/time picker: set scheduled maintenance time
  - Duration: dropdown (30min / 1h / 2h / 4h / Custom)
  - Notify users in advance: toggle + email notification

---

## TAB 8 — Advanced (`components/admin/settings/AdvancedSettings.tsx`)

Danger Zone section (red-accented cards):

  Card 1 — Reset Platform Data
    "Delete all automation logs" — requires typing "CONFIRM"
    "Delete all AI-generated posts" — requires typing "CONFIRM"
    "Reset all user AI memory" — requires typing "CONFIRM"
    Each with: description of impact + confirmation input + red button

  Card 2 — Environment Variables Status
    Read-only list of all required env vars with status:
    NEXT_PUBLIC_SUPABASE_URL: ✓ Set
    SUPABASE_SERVICE_ROLE_KEY: ✓ Set
    GEMINI_API_KEY: ✓ Set
    CRON_SECRET: ✓ Set
    RESEND_API_KEY: ✗ Not set ← red warning
    (Values are NEVER shown, only whether they're set)

  Card 3 — Developer Mode
    Toggle: Enable debug logging
    Toggle: Show API response times in UI
    Toggle: Disable rate limiting (for testing)
    Warning: "Only enable these in development"

  Card 4 — Platform Reset
    "Reset to Default Settings" — resets all admin_settings to defaults
    Requires typing "RESET ALL SETTINGS"
    Cannot be undone

---

## API ROUTES: `app/api/admin/settings/route.ts`

```typescript
// GET /api/admin/settings
// Returns all admin settings from admin_settings table
// (Store settings as key-value JSON in a single row or multiple rows)

// PUT /api/admin/settings
// Body: Partial<AdminSettings>
// Updates specified settings
// Validates settings with Zod schema

// POST /api/admin/settings/test-email
// Sends a test email using current email config

// POST /api/admin/settings/test-ai
// Body: { prompt: string }
// Tests AI config by generating a sample post

// POST /api/admin/settings/test-social
// Body: { platform: string }
// Tests OAuth credentials for given platform

// POST /api/admin/settings/maintenance
// Body: { action: 'clear-logs' | 'recalculate' | 'backup', params?: any }
// Performs maintenance operations
```

---

# ═══════════════════════════════════════════════════════
# SHARED ADMIN COMPONENTS (Used across all 6 pages)
# ═══════════════════════════════════════════════════════

### `components/admin/shared/AdminPageHeader.tsx`
```tsx
// Props: title, subtitle, actions (ReactNode), breadcrumb
// Layout:
//   Left: breadcrumb (small muted) above title (Space Grotesk 22px) + subtitle
//   Right: action buttons slot
// Bottom: 1px separator line
// Framer: fade-in-down on mount
```

### `components/admin/shared/AdminStatCard.tsx`
```tsx
// Reusable stat card matching the admin orange theme
// Props: label, value, change, changeDirection, icon, accentColor, sparklineData?
// Same glass-card style with colored top-line
// Supports optional mini sparkline chart inside
```

### `components/admin/shared/AdminEmptyState.tsx`
```tsx
// Props: icon, title, subtitle, action?
// Centered layout with SVG illustration
// Action: optional primary button
// Used in every table/feed when no data
```

### `components/admin/shared/AdminConfirmDialog.tsx`
```tsx
// Accessible confirmation dialog (uses Radix Dialog)
// Props: title, description, confirmText, onConfirm, variant ('danger'|'warning')
// Danger: red confirm button
// Warning: amber confirm button
// Optional: type-to-confirm input (pass requiredText prop)
// Framer: scaleIn animation
```

### `components/admin/shared/AdminBadge.tsx`
```tsx
// Status badge component
// Variants: success, danger, warning, info, running, muted, admin
// Running variant: includes pulsing dot animation
// Size variants: sm, md
```

### `components/admin/shared/AdminDataTable.tsx`
```tsx
// Reusable table with built-in:
// - Column definitions (typed with generics)
// - Row click handler
// - Row hover state
// - Sortable columns (click header to sort)
// - Loading skeleton (5 skeleton rows with shimmer)
// - Empty state slot
// - Pagination controls (built-in)
// - Row selection with checkboxes (for bulk actions)
// - Bulk actions bar (appears when rows selected)
```

---

# ═══════════════════════════════════════════════════════
# DATABASE ADDITIONS (Run in Supabase SQL Editor)
# ═══════════════════════════════════════════════════════

```sql
-- Admin Settings table (for TAB settings in admin/settings)
CREATE TABLE public.admin_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- IP Blocklist (for security page)
CREATE TABLE public.ip_blocklist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ip_address TEXT UNIQUE NOT NULL,
  reason TEXT,
  blocked_by UUID REFERENCES public.profiles(id),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Security Events (for threat feed)
CREATE TABLE public.security_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_type TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('info', 'warning', 'critical')),
  user_id UUID REFERENCES public.profiles(id),
  ip_address TEXT,
  description TEXT,
  metadata JSONB,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Only admins can access these tables
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ip_blocklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins only" ON public.admin_settings FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins only" ON public.ip_blocklist FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins only" ON public.security_events FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Seed default admin settings
INSERT INTO public.admin_settings (setting_key, setting_value) VALUES
  ('general', '{"platformName":"AgentFlow AI","signupsEnabled":true,"maintenanceMode":false}'),
  ('ai', '{"model":"gemini-1.5-flash","maxTokens":1024,"temperature":0.7,"dailyLimit":50,"monthlyLimit":500}'),
  ('email', '{"provider":"resend","fromName":"AgentFlow AI","fromEmail":"noreply@agentflow.ai"}'),
  ('quotas', '{"free":{"maxTasks":5,"maxGenerations":50,"maxSocialAccounts":1},"pro":{"maxTasks":50,"maxGenerations":500,"maxSocialAccounts":5}}'),
  ('security', '{"sessionTimeout":7,"maxFailedAttempts":5,"autoBlockEnabled":true,"adminTFARequired":false}');
```

---

# ═══════════════════════════════════════════════════════
# TYPES (Add to types/admin.ts)
# ═══════════════════════════════════════════════════════

```typescript
// types/admin.ts — Generate this complete file

export interface AutomationLog {
  id: string
  user_id: string
  task_id: string | null
  action: string
  status: 'success' | 'failed' | 'running' | 'pending'
  response: Record<string, unknown> | null
  error_message: string | null
  duration_ms: number | null
  created_at: string
  // Joined fields:
  user?: { full_name: string; email: string; avatar_url: string | null }
  task?: { title: string; task_type: string; platform: string }
}

export interface AutomationStats {
  totalToday: number
  runningNow: number
  succeededToday: number
  failedToday: number
  avgDurationMs: number
}

export interface ServiceHealth {
  name: string
  status: 'operational' | 'degraded' | 'outage' | 'unknown'
  responseTimeMs: number | null
  metrics: Record<string, string | number>
  uptimePercent: number
  lastChecked: string
}

export interface SystemHealth {
  overallStatus: 'operational' | 'degraded' | 'partial_outage' | 'major_outage'
  services: ServiceHealth[]
  metrics: {
    avgResponseTime: number
    errorRate: number
    successRate: number
    queueDepth: number
  }
  incidents: Incident[]
  lastChecked: string
}

export interface Incident {
  id: string
  title: string
  status: 'resolved' | 'ongoing' | 'monitoring'
  severity: 'minor' | 'major' | 'critical'
  affectedServices: string[]
  startedAt: string
  resolvedAt: string | null
  description: string
}

export interface SecurityEvent {
  id: string
  event_type: string
  severity: 'info' | 'warning' | 'critical'
  user_id: string | null
  ip_address: string | null
  description: string
  metadata: Record<string, unknown>
  resolved: boolean
  created_at: string
  user?: { full_name: string; email: string }
}

export interface AdminSettings {
  general: {
    platformName: string
    signupsEnabled: boolean
    maintenanceMode: boolean
    maintenanceMessage: string
  }
  ai: {
    model: string
    maxTokens: number
    temperature: number
    topP: number
    dailyLimit: number
    monthlyLimit: number
  }
  email: {
    provider: 'resend' | 'smtp' | 'sendgrid'
    fromName: string
    fromEmail: string
    apiKey: string
  }
  quotas: {
    free: UserQuota
    pro: UserQuota
    team: UserQuota
  }
  security: {
    sessionTimeoutDays: number
    maxFailedAttempts: number
    autoBlockEnabled: boolean
    adminTFARequired: boolean
    ipWhitelist: string[]
  }
}

export interface UserQuota {
  maxTasks: number
  maxGenerationsPerMonth: number
  maxSocialAccounts: number
  logRetentionDays: number
  storageLimitMb: number
  apiRateLimitPerHour: number
}

export interface AnalyticsData {
  userGrowth: { date: string; newSignups: number; cumulative: number }[]
  mau: number
  totalUsers: number
  aiGenerations: {
    date: string
    linkedin: number
    twitter: number
    facebook: number
    total: number
  }[]
  totalTokensUsed: number
  successRate: number
  topUsers: {
    id: string
    full_name: string
    email: string
    avatar_url: string | null
    taskCount: number
    postCount: number
    successRate: number
    lastActive: string
  }[]
  platformBreakdown: {
    platform: string
    count: number
    successRate: number
  }[]
  geographyData: { country: string; count: number; flag: string }[]
}

export interface LogEntry {
  id: string
  user_id: string | null
  level: 'debug' | 'info' | 'warning' | 'error' | 'critical'
  source: string
  message: string
  payload: Record<string, unknown> | null
  duration_ms: number | null
  ip_address: string | null
  created_at: string
  user?: { full_name: string; email: string }
}
```

---

# ═══════════════════════════════════════════════════════
# GENERATION RULES — MANDATORY
# ═══════════════════════════════════════════════════════

1. Generate ALL 6 pages and ALL components listed above. Do not skip any.

2. Every page must use:
   ```tsx
   import { motion } from 'framer-motion'
   // Wrap content: <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.4}}>
   ```

3. Every page must have a loading.tsx companion:
   `app/(admin)/admin/[page]/loading.tsx`
   Show admin-orange shimmer skeleton matching the page layout.

4. Every API route must:
   - Check admin role first (before any data query)
   - Use try/catch with proper error responses
   - Return typed responses matching the types above

5. All data fetching uses `useSWR` with appropriate revalidation intervals:
   - Health page: revalidateOnFocus: true, refreshInterval: 30000
   - Automations: refreshInterval: 10000 (live feel)
   - Logs: no auto-refresh (on-demand)
   - Analytics: revalidateOnFocus: true, no auto-refresh
   - Security: refreshInterval: 60000
   - Settings: no auto-refresh

6. All charts use Recharts with these exact configs:
   ```tsx
   <ResponsiveContainer width="100%" height={240}>
     <AreaChart data={data} margin={{top:8,right:0,bottom:0,left:-20}}>
       <defs>
         <linearGradient id="grad-violet" x1="0" y1="0" x2="0" y2="1">
           <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
           <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
         </linearGradient>
       </defs>
       <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
       <XAxis dataKey="date" tick={{fill:'rgba(255,255,255,0.3)',fontSize:11}} axisLine={false} tickLine={false}/>
       <YAxis tick={{fill:'rgba(255,255,255,0.3)',fontSize:11}} axisLine={false} tickLine={false}/>
       <Tooltip contentStyle={{background:'#0d0d1a',border:'1px solid rgba(124,58,237,0.3)',borderRadius:'10px'}} labelStyle={{color:'rgba(255,255,255,0.6)'}} itemStyle={{color:'#a78bfa'}}/>
       <Area type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2} fill="url(#grad-violet)" animationDuration={1200}/>
     </AreaChart>
   </ResponsiveContainer>
   ```

7. Toasts for all actions:
   ```tsx
   import toast from 'react-hot-toast'
   // Success: toast.success('Settings saved', { style: { background:'#0d0d1a', color:'#f0f0ff', border:'1px solid rgba(16,185,129,0.3)' } })
   // Error: toast.error('Failed to save', { ... })
   ```
8. Every form uses React Hook Form + Zod validation.

9. Mobile responsive: all pages work on 375px viewport.
   - Charts: use ResponsiveContainer (already responsive)
   - Tables: horizontal scroll wrapper on mobile
   - Grid columns: reduce to 1 or 2 on mobile using Tailwind responsive prefixes

10. Generate in this order:
    - types/admin.ts (all types first)
    - Database SQL (run in Supabase)
    - API routes (all 6)
    - Shared admin components (AdminPageHeader, AdminStatCard, etc.)
    - Page 1: Automations (+ all its components)
    - Page 2: Analytics (+ all its components)
    - Page 3: Logs (+ all its components)
    - Page 4: Health (+ all its components)
    - Page 5: Security (+ all its components)
    - Page 6: Settings (+ all its components + all tabs)
    - loading.tsx for each page
START NOW. Begin with `types/admin.ts`. Generate every file completely.
Do not summarize. Do not truncate. Write every line of code.
```