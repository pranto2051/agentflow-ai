# ============================================================
#  MASTER AI ENGINEERING PROMPT
#  Project: Autonomous Multi-User AI Agent SaaS Platform
#  Hosting: 100% FREE — Vercel + Supabase + Render + Gemini
# ============================================================

You are acting as a **Senior AI Software Architect**, **Senior Full-Stack Engineer**, **Senior UI/UX Designer**, and **DevOps Engineer** — all in one. Your mission is to build a complete, production-ready SaaS platform from scratch, step by step, with full working code for every file.

---

## PLATFORM NAME: **AgentFlow AI**

A cloud-based, multi-user AI automation SaaS where users create AI-powered scheduled tasks, automate social media posting, and manage AI workflows from a beautiful professional dashboard.

---

## ⚠️ CRITICAL RULE — FREE HOSTING ONLY

**Every single service used MUST have a completely free tier with no credit card required (unless noted). Do NOT suggest any paid service without a free alternative.**

### Approved Free Tech Stack:

| Layer | Technology | Free Tier |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) + TypeScript | Vercel Free (Hobby) |
| **Styling** | Tailwind CSS + Shadcn/UI | Free forever |
| **Animation** | Framer Motion | Free forever |
| **Database** | Supabase PostgreSQL | Free (500MB) |
| **Auth** | Supabase Auth | Free (50k MAU) |
| **Storage** | Supabase Storage | Free (1GB) |
| **AI Engine** | Google Gemini 1.5 Flash API | Free (1M tokens/day) |
| **Automation / Scheduler** | Vercel Cron Jobs + API Routes | Free (Hobby plan) |
| **Background Jobs Alt** | n8n self-hosted on Render.com | Render Free tier |
| **Email** | Resend | Free (3,000 emails/month) |
| **Deployment** | Vercel (frontend + API) | Free Hobby plan |
| **n8n Hosting** | Render.com Web Service | Free tier |
| **Real-time** | Supabase Realtime | Free tier |
| **Icons** | Lucide React | Free |

> **Note on n8n**: Host n8n on Render.com free tier (it may sleep after 15 min of inactivity — acceptable for a free setup). Alternatively, replace n8n entirely with Vercel API Routes + Vercel Cron Jobs (recommended for simplicity on free tier).

---

## ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────┐
│           VERCEL (Free Hobby Plan)           │
│  ┌──────────────┐    ┌────────────────────┐ │
│  │  Next.js 14  │    │   API Routes       │ │
│  │  App Router  │    │  /api/*            │ │
│  │  TypeScript  │    │  Cron Jobs         │ │
│  └──────────────┘    └────────────────────┘ │
└──────────────────────┬──────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌─────▼──────┐ ┌───▼──────────┐
│   Supabase   │ │  Gemini    │ │   Render.com  │
│  PostgreSQL  │ │  1.5 Flash │ │   (n8n opt.)  │
│  Auth        │ │  API       │ │               │
│  Storage     │ │  (Free)    │ │               │
│  Realtime    │ └────────────┘ └───────────────┘
└──────────────┘
```

---

## DATABASE SCHEMA (PostgreSQL via Supabase)

Run the following SQL in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- USERS (extends Supabase auth.users)
-- =====================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned')),
  bio TEXT,
  timezone TEXT DEFAULT 'UTC',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- TASKS
-- =====================
CREATE TABLE public.tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT CHECK (task_type IN ('daily', 'weekly', 'monthly', 'one-time')),
  frequency TEXT,
  schedule_time TIME,
  schedule_day INTEGER,
  timezone TEXT DEFAULT 'UTC',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'failed')),
  platform TEXT CHECK (platform IN ('linkedin', 'twitter', 'facebook', 'all')),
  last_run TIMESTAMPTZ,
  next_run TIMESTAMPTZ,
  run_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- AI GENERATED POSTS
-- =====================
CREATE TABLE public.ai_generated_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  platform TEXT,
  generated_content TEXT,
  hashtags TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'failed', 'scheduled')),
  published_at TIMESTAMPTZ,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- AUTOMATION LOGS
-- =====================
CREATE TABLE public.automation_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  action TEXT,
  status TEXT CHECK (status IN ('success', 'failed', 'pending', 'running')),
  response JSONB,
  error_message TEXT,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- SOCIAL ACCOUNTS
-- =====================
CREATE TABLE public.social_accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  platform TEXT CHECK (platform IN ('linkedin', 'twitter', 'facebook')),
  platform_user_id TEXT,
  platform_username TEXT,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- =====================
-- AI MEMORY
-- =====================
CREATE TABLE public.ai_memory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  memory_key TEXT NOT NULL,
  memory_value TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, memory_key)
);

-- =====================
-- ADMIN IMPERSONATION LOGS
-- =====================
CREATE TABLE public.admin_impersonation_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id UUID REFERENCES public.profiles(id),
  target_user_id UUID REFERENCES public.profiles(id),
  action TEXT,
  ip_address TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ
);

-- =====================
-- ROW LEVEL SECURITY (RLS)
-- =====================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generated_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_impersonation_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: users see own, admins see all
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Tasks: users own their tasks
CREATE POLICY "Users manage own tasks" ON public.tasks
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all tasks" ON public.tasks
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Posts: same pattern
CREATE POLICY "Users manage own posts" ON public.ai_generated_posts
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all posts" ON public.ai_generated_posts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Logs
CREATE POLICY "Users view own logs" ON public.automation_logs
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins view all logs" ON public.automation_logs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Social accounts
CREATE POLICY "Users manage own social accounts" ON public.social_accounts
  FOR ALL USING (auth.uid() = user_id);

-- AI Memory
CREATE POLICY "Users manage own memory" ON public.ai_memory
  FOR ALL USING (auth.uid() = user_id);

-- Function: auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## PROJECT STRUCTURE

Generate the following exact file/folder structure:

```
agentflow-ai/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              ← Dashboard shell with sidebar
│   │   ├── dashboard/page.tsx
│   │   ├── tasks/page.tsx
│   │   ├── tasks/new/page.tsx
│   │   ├── ai-assistant/page.tsx
│   │   ├── schedules/page.tsx
│   │   ├── social-accounts/page.tsx
│   │   ├── analytics/page.tsx
│   │   └── settings/page.tsx
│   ├── (admin)/
│   │   ├── layout.tsx              ← Admin shell
│   │   ├── admin/page.tsx
│   │   ├── admin/users/page.tsx
│   │   ├── admin/users/[id]/page.tsx
│   │   ├── admin/automations/page.tsx
│   │   ├── admin/logs/page.tsx
│   │   ├── admin/analytics/page.tsx
│   │   └── admin/settings/page.tsx
│   ├── (public)/
│   │   ├── page.tsx                ← Landing/home page
│   │   ├── pricing/page.tsx
│   │   ├── features/page.tsx
│   │   └── about/page.tsx
│   ├── api/
│   │   ├── auth/callback/route.ts
│   │   ├── tasks/route.ts
│   │   ├── tasks/[id]/route.ts
│   │   ├── ai/generate/route.ts
│   │   ├── ai/memory/route.ts
│   │   ├── admin/users/route.ts
│   │   ├── admin/impersonate/route.ts
│   │   ├── admin/stats/route.ts
│   │   ├── social/connect/route.ts
│   │   ├── social/publish/route.ts
│   │   ├── cron/run-tasks/route.ts ← Vercel Cron
│   │   └── logs/route.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                         ← Shadcn components
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── StatsCard.tsx
│   │   ├── TaskCard.tsx
│   │   ├── ActivityFeed.tsx
│   │   ├── AnalyticsChart.tsx
│   │   └── RecentPosts.tsx
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── UserTable.tsx
│   │   ├── ImpersonationBanner.tsx
│   │   └── SystemHealth.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   └── CTA.tsx
│   └── shared/
│       ├── Logo.tsx
│       ├── ThemeToggle.tsx
│       └── Notifications.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts               ← Browser client
│   │   ├── server.ts               ← Server client
│   │   └── middleware.ts
│   ├── gemini/
│   │   ├── client.ts
│   │   └── prompts.ts              ← Reusable prompt templates
│   ├── utils.ts
│   └── constants.ts
├── hooks/
│   ├── useUser.ts
│   ├── useTasks.ts
│   ├── useAnalytics.ts
│   └── useImpersonation.ts
├── types/
│   ├── database.ts                 ← Supabase generated types
│   ├── api.ts
│   └── index.ts
├── middleware.ts                   ← Auth + admin route protection
├── vercel.json                     ← Cron job config
├── .env.local.example
└── package.json
```

---

## ENVIRONMENT VARIABLES

Create `.env.local` with these variables (provide example values and instructions):

```env
# Supabase (get from supabase.com → Project Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google Gemini (get from aistudio.google.com → API Keys)
GEMINI_API_KEY=your-gemini-api-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-min-32-chars

# Cron Security (random string to protect cron endpoints)
CRON_SECRET=your-random-cron-secret

# Admin (set first admin email manually)
ADMIN_EMAIL=admin@yourdomain.com

# Social OAuth (optional - configure per platform)
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=
```

---

## PHASE 1: Project Setup

### Step 1.1 — Initialize Project

```bash
npx create-next-app@latest agentflow-ai \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd agentflow-ai

# Install dependencies
npm install @supabase/supabase-js @supabase/ssr
npm install @google/generative-ai
npm install framer-motion
npm install lucide-react
npm install recharts
npm install date-fns
npm install zod
npm install react-hook-form @hookform/resolvers

# Shadcn UI setup
npx shadcn@latest init
npx shadcn@latest add button card input label textarea select badge
npx shadcn@latest add dialog sheet dropdown-menu tabs avatar
npx shadcn@latest add toast skeleton progress separator
npx shadcn@latest add table form switch
```

### Step 1.2 — Supabase Client Setup

Generate complete code for:

**`lib/supabase/client.ts`** — Browser-side Supabase client using `createBrowserClient` from `@supabase/ssr`

**`lib/supabase/server.ts`** — Server-side Supabase client using `createServerClient` from `@supabase/ssr` with cookie handling for Next.js App Router

**`middleware.ts`** — Route protection middleware that:
- Refreshes Supabase auth sessions on every request
- Redirects unauthenticated users away from `/dashboard/*`
- Redirects non-admin users away from `/admin/*`
- Checks `profiles.role = 'admin'` for admin routes
- Handles impersonation session cookie

---

## PHASE 2: Authentication System

### Step 2.1 — Login Page (`app/(auth)/login/page.tsx`)

Build a premium login page with:
- Dark mode glassmorphism design
- Email + password login form
- Google OAuth button (Supabase handles this for free)
- GitHub OAuth button
- Animated background with floating gradient orbs
- Form validation with Zod
- Redirect to `/dashboard` on success
- Link to signup page
- Error handling with toast notifications
- Remember me checkbox
- Forgot password link

### Step 2.2 — Signup Page (`app/(auth)/signup/page.tsx`)

Build a signup page with:
- Full name, username, email, password fields
- Password strength indicator
- Terms of service checkbox
- Same glassmorphism aesthetic
- Redirect to dashboard after email verification
- Auto-creates profile in `public.profiles` via the database trigger

### Step 2.3 — Auth API (`app/api/auth/callback/route.ts`)

Handle Supabase OAuth callback and session exchange.

---

## PHASE 3: Landing Page (Public Home)

### `app/(public)/page.tsx`

Build a world-class AI SaaS landing page. Design inspiration: Linear, Vercel, Resend, Clerk.

**MANDATORY SECTIONS** — build each as a separate component:

#### Hero Section
- Animated headline: "Automate Your Professional Presence with AI"
- Subheadline about AI-powered LinkedIn/social automation
- Two CTAs: "Start Free" (primary) + "See Demo" (secondary)
- Animated dashboard mockup/preview floating below the headline
- Subtle grid background with glowing gradient accent
- Framer Motion entrance animations (stagger children)
- Badge: "✦ Powered by Gemini AI — Free to start"

#### Features Grid
- 6 feature cards in a 3×2 grid
- Features: AI Content Generation, Smart Scheduling, Multi-Platform, Analytics, Memory System, Admin Control
- Each card has an icon, title, description
- Hover: subtle border glow effect
- Framer Motion: fade-in-up on scroll

#### Dashboard Preview
- Screenshot/mockup of the dashboard in a browser frame
- "See it in action" label
- Subtle parallax scroll effect

#### AI Workflow Demo
- Animated 3-step flow diagram
- Step 1: "Add a Task" → Step 2: "AI Generates Content" → Step 3: "Auto-Published"
- Animated connecting arrows
- Real example content shown at each step

#### Pricing Section
- 3 pricing cards: Free, Pro ($0 — everything is free for demo), Team
- Free tier: 5 tasks, 50 AI generations/month, 1 social account
- Glassmorphism card design
- "Most Popular" badge on middle card
- Feature checklist per tier

#### Testimonials
- 3 testimonial cards with avatar, name, title, quote
- Use realistic-sounding fake testimonials

#### FAQ Accordion
- 8 common questions and answers
- Animated expand/collapse

#### Footer
- Logo, nav links, social icons
- "Built with Gemini AI + Supabase + Vercel — all free"

---

## PHASE 4: User Dashboard

### Step 4.1 — Dashboard Layout (`app/(dashboard)/layout.tsx`)

Build a full-height sidebar layout:

**Sidebar** (`components/dashboard/Sidebar.tsx`):
- Logo at top
- Navigation items with icons:
  - Dashboard (LayoutDashboard icon)
  - Tasks (CheckSquare icon)
  - AI Assistant (Bot icon)
  - Schedules (Calendar icon)
  - Social Accounts (Share2 icon)
  - Analytics (BarChart2 icon)
  - Settings (Settings icon)
- User avatar + name + email at bottom
- Logout button
- Active route highlight
- Collapsible on mobile (hamburger menu)
- Dark sidebar with subtle gradient

**Admin Banner** (if impersonating):
- Yellow warning banner at top: "⚠️ You are viewing this account as Admin — [Exit Impersonation]"
- Only visible during admin impersonation sessions

### Step 4.2 — Main Dashboard (`app/(dashboard)/dashboard/page.tsx`)

Build the main dashboard with:

**Stats Row** (4 cards):
- Total Tasks Created
- AI Posts Generated
- Automation Success Rate (%)
- Active Schedules

**Charts Section**:
- Line chart: AI generations over last 30 days (using Recharts)
- Donut chart: Posts by platform (LinkedIn / Twitter / Facebook)

**Recent Activity Feed**:
- List of last 10 automation events with status badges (success/failed/pending)
- Timestamp, task name, platform, AI snippet preview

**Upcoming Automations**:
- Next 5 scheduled tasks with countdown timers

**Quick Actions**:
- "Create New Task" button
- "Generate Post Now" button
- "Connect Social Account" button

### Step 4.3 — Tasks Page (`app/(dashboard)/tasks/page.tsx`)

- Table/card list of all user tasks
- Status filter (active/paused/completed)
- Search by title
- Each task shows: title, type, frequency, platform, status, last run, next run
- Actions per task: Edit, Pause/Resume, Delete, Run Now, View Logs
- "Create Task" button → `/tasks/new`

### Step 4.4 — New Task Form (`app/(dashboard)/tasks/new/page.tsx`)

Multi-step form:
1. **Step 1 — Task Info**: Title, description, what did you learn/want to post about
2. **Step 2 — Schedule**: Type (daily/weekly/monthly/one-time), time, day, timezone
3. **Step 3 — Platform**: LinkedIn / Twitter / Facebook / All
4. **Step 4 — Preview**: AI generates a sample post for preview before saving
- Form validation with React Hook Form + Zod
- Animated step transitions with Framer Motion

### Step 4.5 — AI Assistant (`app/(dashboard)/ai-assistant/page.tsx`)

Chat-like interface:
- User types a prompt or learning note
- AI (Gemini) responds with a professional LinkedIn post
- Option to save, regenerate, or publish immediately
- Memory context: AI remembers user's tone, industry, writing style
- Prompt examples sidebar
- Copy to clipboard button
- "Publish Now" button that posts to connected social accounts

### Step 4.6 — Analytics (`app/(dashboard)/analytics/page.tsx`)

- Date range picker (last 7 / 30 / 90 days)
- Line chart: posts generated over time
- Bar chart: posts by platform
- Success/failure rate pie chart
- Table: top performing tasks
- Export as CSV button

### Step 4.7 — Social Accounts (`app/(dashboard)/social-accounts/page.tsx`)

- Cards for LinkedIn, Twitter/X, Facebook
- Each shows: connected/disconnected status, username, connected date
- "Connect" button triggers OAuth flow
- "Disconnect" button with confirmation
- Last post info

### Step 4.8 — Settings (`app/(dashboard)/settings/page.tsx`)

Tabs:
- **Profile**: name, username, bio, avatar upload (Supabase Storage)
- **Notifications**: email preferences toggles
- **AI Preferences**: default tone (professional/casual/technical), industry, writing style notes — saved to `ai_memory`
- **Security**: change password, active sessions
- **Danger Zone**: delete account

---

## PHASE 5: Admin System (MOST CRITICAL)

### Step 5.1 — Admin Layout (`app/(admin)/layout.tsx`)

Separate admin shell with:

**Admin Sidebar** (`components/admin/AdminSidebar.tsx`):
- "AGENTFLOW ADMIN" branding with red/orange admin badge
- Navigation:
  - Overview (LayoutDashboard)
  - Users (Users)
  - Automations (Zap)
  - AI Usage (Brain)
  - Logs (ScrollText)
  - Analytics (TrendingUp)
  - API Monitor (Activity)
  - Security (Shield)
  - Settings (Settings)
- Admin user info at bottom
- "Back to App" link

### Step 5.2 — Admin Dashboard (`app/(admin)/admin/page.tsx`)

Stats grid (8 cards):
- Total Registered Users
- Active Users (last 7 days)
- Total Tasks Created
- Total AI Generations
- Successful Automations
- Failed Automations
- Posts Published
- System Uptime

**Charts**:
- User signups over time (line chart)
- AI API usage over time (area chart)
- Automation success vs failure (bar chart)

**System Health Panel**:
- Supabase DB status: ✅ Online
- Gemini API status: ✅ Online
- Cron jobs status: ✅ Running
- Last cron run timestamp

**Recent Activity**:
- Last 20 system-wide automation logs

### Step 5.3 — User Management (`app/(admin)/admin/users/page.tsx`)

Full data table with:
- Columns: Avatar, Name, Email, Username, Role, Status, Tasks, Posts, Last Login, Created At, Actions
- Search by name/email
- Filter by role (admin/user) and status (active/suspended/banned)
- Sort by any column
- Bulk actions: Suspend, Delete, Change Role
- Per-user actions dropdown:
  - ✏️ Edit User
  - 🔑 Reset Password
  - 🚫 Suspend Account
  - ⛔ Ban Account
  - 👤 **Login as User** (IMPERSONATION)
  - 🗑️ Delete User
- Pagination (25 per page)
- Export users as CSV

### Step 5.4 — User Detail Page (`app/(admin)/admin/users/[id]/page.tsx`)

Full user profile view:
- User info panel (name, email, role, status, dates)
- Stats: tasks created, posts generated, social accounts connected
- Task list (admin can edit/delete)
- Automation logs
- AI Memory viewer
- Social accounts status
- Action buttons: Edit, Suspend, Ban, Reset Password, **Login as User**
- Impersonation activity log for this user

### Step 5.5 — Admin Impersonation System (VERY IMPORTANT)

#### How It Works:

**Flow**:
1. Admin clicks "Login as User" on any user
2. System stores in an HTTP-only cookie: `impersonation_session = { adminId, targetUserId, startedAt }`
3. Supabase Service Role client is used server-side to fetch data as that user
4. A persistent yellow banner shows: `"⚠️ Admin Mode: You are viewing [UserName]'s account — Exit"`
5. All admin actions are logged to `admin_impersonation_logs`
6. Admin clicks "Exit" → cookie cleared → returns to admin panel

**Implementation**:

`app/api/admin/impersonate/route.ts`:
```typescript
// POST /api/admin/impersonate
// Body: { targetUserId: string }
// 1. Verify requesting user is admin (check profiles.role)
// 2. Log impersonation start to admin_impersonation_logs
// 3. Set secure HTTP-only cookie with impersonation data
// 4. Return success + redirect URL to /dashboard

// DELETE /api/admin/impersonate
// 1. Clear impersonation cookie
// 2. Log impersonation end (update ended_at)
// 3. Redirect back to admin panel
```

`components/admin/ImpersonationBanner.tsx`:
```typescript
// Read impersonation cookie on every dashboard page
// Show yellow top banner if impersonation active
// Display: target user's name and email
// "Exit Impersonation" button calls DELETE /api/admin/impersonate
// All data loads use the target user's ID (passed via cookie)
```

**Security Rules for Impersonation**:
- Only users with `role = 'admin'` can trigger impersonation
- Admin cannot impersonate another admin
- All impersonation actions are logged with IP address
- Session expires after 2 hours automatically
- Impersonation cookie is: HttpOnly, Secure, SameSite=Strict

### Step 5.6 — Automation Monitor (`app/(admin)/admin/automations/page.tsx`)

- Live table of all running/recent automations across ALL users
- Columns: User, Task, Platform, Status, AI Model, Duration, Timestamp
- Filter by status, platform, user
- View full AI-generated content for any post
- Re-trigger failed automations
- Stats: total today, success rate, average duration

### Step 5.7 — System Logs (`app/(admin)/admin/logs/page.tsx`)

- Full searchable log viewer
- Filter by: user, action type, status, date range
- Log levels: INFO, WARNING, ERROR, CRITICAL
- Expandable log entries showing full JSON response
- Pagination
- Export logs as CSV

---

## PHASE 6: AI Engine (Gemini Integration)

### `lib/gemini/client.ts`

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Use Flash for free tier (faster + free)
  generationConfig: {
    temperature: 0.8,
    maxOutputTokens: 1024,
  },
});
```

### `lib/gemini/prompts.ts`

Create reusable prompt templates:

```typescript
export const generateLinkedInPost = (params: {
  taskDescription: string;
  userMemory: string; // User's tone, industry, style from ai_memory
  platform: string;
}) => `
You are a professional social media content writer.

User's background and preferences:
${params.userMemory}

Task/Topic to write about:
${params.taskDescription}

Platform: ${params.platform}

Generate a highly engaging ${params.platform} post that:
1. Starts with a hook that grabs attention
2. Shares the insight or learning in a conversational, professional way
3. Provides 3-5 key takeaways as bullet points
4. Ends with a clear call-to-action or thought-provoking question
5. Includes 5-8 relevant hashtags at the end

Respond in this exact JSON format:
{
  "content": "full post content here",
  "hashtags": ["hashtag1", "hashtag2"],
  "hook": "first line of post",
  "cta": "call to action line"
}
`;

export const updateUserMemory = (existingMemory: string, newInteraction: string) => `
Based on this user's writing style and new post:

Existing memory: ${existingMemory}
New post: ${newInteraction}

Update the user memory profile. Extract: tone, industry, typical topics, writing style, engagement patterns.
Keep the memory concise (under 300 words). Respond with just the updated memory text.
`;
```

### `app/api/ai/generate/route.ts`

```typescript
// POST /api/ai/generate
// Protected: requires auth
// Body: { taskDescription, platform, taskId? }
// 1. Get user's AI memory from ai_memory table
// 2. Build prompt using template
// 3. Call Gemini API
// 4. Parse JSON response
// 5. Save to ai_generated_posts table
// 6. Optionally update ai_memory with new interaction
// 7. Log to automation_logs
// 8. Return generated content
```

---

## PHASE 7: Automation & Scheduling

### Vercel Cron Jobs (Free — No n8n needed)

**`vercel.json`**:
```json
{
  "crons": [
    {
      "path": "/api/cron/run-tasks",
      "schedule": "0 * * * *"
    }
  ]
}
```

### `app/api/cron/run-tasks/route.ts`

```typescript
// This runs every hour on Vercel's free cron
// 1. Verify CRON_SECRET header (security)
// 2. Query tasks where:
//    - status = 'active'
//    - next_run <= NOW()
// 3. For each task:
//    a. Call Gemini to generate post content
//    b. If social account connected → publish via platform API
//    c. Save to ai_generated_posts
//    d. Log result to automation_logs
//    e. Update task.last_run and task.next_run
// 4. Return summary { processed: N, succeeded: N, failed: N }
```

---

## PHASE 8: API Routes (Complete List)

Generate full working TypeScript code for each:

### Auth
- `GET/POST /api/auth/callback` — Supabase OAuth callback

### Tasks
- `GET /api/tasks` — List user's tasks (paginated)
- `POST /api/tasks` — Create task
- `GET /api/tasks/[id]` — Get single task
- `PATCH /api/tasks/[id]` — Update task
- `DELETE /api/tasks/[id]` — Delete task
- `POST /api/tasks/[id]/run` — Manually trigger task

### AI
- `POST /api/ai/generate` — Generate AI content
- `GET /api/ai/memory` — Get user's AI memory
- `POST /api/ai/memory` — Update AI memory

### Admin
- `GET /api/admin/stats` — Platform-wide statistics
- `GET /api/admin/users` — List all users (paginated, searchable)
- `GET /api/admin/users/[id]` — Get user with full details
- `PATCH /api/admin/users/[id]` — Update user (role, status)
- `DELETE /api/admin/users/[id]` — Delete user
- `POST /api/admin/impersonate` — Start impersonation
- `DELETE /api/admin/impersonate` — End impersonation
- `GET /api/admin/logs` — System-wide logs

### Social
- `GET /api/social/accounts` — List connected accounts
- `POST /api/social/connect` — Initiate OAuth
- `DELETE /api/social/[id]` — Disconnect account
- `POST /api/social/publish` — Publish post to platform

### Logs & Analytics
- `GET /api/logs` — User's automation logs
- `GET /api/analytics` — User's analytics data

---

## PHASE 9: Security Implementation

### Middleware (`middleware.ts`)

```typescript
// Check all routes:
// /dashboard/* → require auth (redirect to /login)
// /admin/* → require auth + role = 'admin' (redirect to /dashboard)
// /api/admin/* → verify admin role via service role client
// /api/cron/* → verify CRON_SECRET header
// All routes → refresh Supabase auth session
```

### API Security Pattern (apply to every API route):

```typescript
// Standard security wrapper for every API route:
// 1. createServerClient() and get session
// 2. If no session → return 401
// 3. Get user's profile from profiles table
// 4. Check role for admin-only endpoints
// 5. Validate request body with Zod schema
// 6. Execute operation
// 7. Return typed response
```

### Rate Limiting (Free — using Supabase):

```typescript
// Use automation_logs table to count requests per user per hour
// If count > 50 for AI generation → return 429 Too Many Requests
// This prevents Gemini API abuse on free tier
```

---

## PHASE 10: UI/UX Design System

### Design Tokens (add to `globals.css`):

```css
:root {
  /* Brand Colors */
  --brand-primary: #6366f1;    /* Indigo */
  --brand-secondary: #8b5cf6;  /* Violet */
  --brand-accent: #06b6d4;     /* Cyan */
  --brand-success: #10b981;    /* Emerald */
  --brand-warning: #f59e0b;    /* Amber */
  --brand-danger: #ef4444;     /* Red */
  --brand-admin: #f97316;      /* Orange — admin UI accent */

  /* Dark theme (default) */
  --bg-primary: #0a0a0f;
  --bg-secondary: #111118;
  --bg-tertiary: #1a1a24;
  --bg-card: #16161f;
  --border-subtle: rgba(255,255,255,0.07);
  --border-medium: rgba(255,255,255,0.12);
  --text-primary: #f8f8ff;
  --text-secondary: #a0a0b8;
  --text-muted: #606078;
}
```

### Component Standards:

**Cards**: Dark background `bg-card`, 1px border `border-subtle`, `rounded-xl`, `p-6`

**Glassmorphism** (for auth pages, modals):
```css
background: rgba(255,255,255,0.03);
backdrop-filter: blur(20px);
border: 1px solid rgba(255,255,255,0.08);
```

**Gradient Text** (for headings):
```css
background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

**Animated Background** (for landing page):
- Use Framer Motion to animate 3–4 gradient orbs slowly floating
- Orb colors: indigo, violet, cyan at 15% opacity
- Blur radius: 120px

**Status Badges**:
- active: green bg, green text
- paused: yellow bg, yellow text
- failed: red bg, red text
- pending: blue bg, blue text
- admin: orange bg, orange text

---

## PHASE 11: Deployment Guide (100% Free)

### Step 11.1 — Supabase Setup (Free)

1. Go to [supabase.com](https://supabase.com) → New Project (free tier)
2. Copy Project URL and Anon Key from Project Settings → API
3. Copy Service Role Key (keep secret — server only)
4. Go to SQL Editor → paste and run the full schema from Phase 1
5. Go to Authentication → Providers → Enable Email, Google, GitHub
6. Go to Authentication → URL Configuration → set Site URL to your Vercel URL

### Step 11.2 — Vercel Deployment (Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# Project → Settings → Environment Variables
# Add all variables from .env.local
```

Or deploy via GitHub:
1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project → Select repo
3. Add all environment variables in Vercel dashboard
4. Deploy

Vercel free tier includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Cron jobs (1 per project on Hobby)
- ✅ Custom domain

### Step 11.3 — Set First Admin User

After deploying, run this in Supabase SQL Editor:

```sql
-- Replace with your admin email
UPDATE public.profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'your-admin@email.com'
);
```

### Step 11.4 — n8n on Render.com (Optional — Free)

If you want n8n for more complex workflows:

1. Go to [render.com](https://render.com) → New Web Service
2. Use this Docker image: `n8nio/n8n`
3. Set environment:
   - `N8N_BASIC_AUTH_ACTIVE=true`
   - `N8N_BASIC_AUTH_USER=admin`
   - `N8N_BASIC_AUTH_PASSWORD=yourpassword`
   - `N8N_HOST=your-render-url.onrender.com`
   - `WEBHOOK_URL=https://your-render-url.onrender.com`
4. Free tier: 750 hours/month (will sleep when inactive)
5. Connect to Supabase via n8n's Postgres node

> For free setup, Vercel Cron is recommended over Render+n8n as it doesn't sleep.

---

## GENERATION INSTRUCTIONS FOR AI AGENT

**Read these instructions before generating any code:**

1. **Generate COMPLETE files** — never truncate with `// ... rest of code`. Every file must be 100% complete and runnable.

2. **TypeScript strict mode** — use proper types for everything. Generate `types/database.ts` with full Supabase type definitions.

3. **Error handling** — every API route must have try/catch with proper error responses and logging.

4. **Loading states** — every page must have skeleton loaders while data fetches.

5. **Empty states** — show helpful empty states when there's no data (e.g., "No tasks yet — create your first one").

6. **Mobile responsive** — every page works on mobile (375px) to desktop (1440px).

7. **Dark mode** — the entire app is dark mode by default (matches the design system above).

8. **Generate in this order** (do not skip steps):
   - Phase 1: Project setup + database schema
   - Phase 2: Auth pages
   - Phase 3: Landing page
   - Phase 4: Dashboard layout + main page
   - Phase 5: Task system
   - Phase 6: AI assistant page
   - Phase 7: Admin system (users, impersonation, logs)
   - Phase 8: API routes
   - Phase 9: Cron job automation
   - Phase 10: Analytics pages
   - Phase 11: Settings + social accounts

9. **After each phase**, verify:
   - All imports are correct
   - All environment variables are used correctly
   - All Supabase queries use correct table/column names from schema
   - All routes are protected by middleware

10. **Package versions to use**:
    - next: 14.x
    - @supabase/supabase-js: 2.x
    - @supabase/ssr: latest
    - @google/generative-ai: latest
    - framer-motion: 11.x
    - tailwindcss: 3.x

---

## START COMMAND

**Begin now. Start with Phase 1.**

Generate the complete `package.json`, `next.config.ts`, `tailwind.config.ts`, `globals.css`, and all Supabase client files first.

Then proceed phase by phase, generating every file completely.

Do not ask for confirmation between phases — continue automatically until the entire project is complete.

**This platform must be deployable to Vercel + Supabase with zero cost.**
```
