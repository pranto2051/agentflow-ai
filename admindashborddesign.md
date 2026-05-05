# ╔══════════════════════════════════════════════════════════════╗
# ║     ADMIN SETTINGS PAGE — COMPLETE GENERATION PROMPT        ║
# ║     AgentFlow AI Platform · /admin/settings                 ║
# ║     Next.js 14 · TypeScript · Tailwind · Supabase · Shadcn  ║
# ╚══════════════════════════════════════════════════════════════╝

You are a Senior Full-Stack Engineer + Senior UI/UX Designer.
Build the COMPLETE /admin/settings page for the AgentFlow AI SaaS platform.
Generate every file listed. No truncation. No summaries. Full production code.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 0 — DESIGN SYSTEM (Apply to EVERY component)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Fonts
```tsx
// In layout.tsx
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'
// Space Grotesk  → All headings, page titles, large numbers
// DM Sans        → All body text, labels, descriptions
// JetBrains Mono → API keys, env vars, code blocks, prompt templates
```

### Color Tokens (globals.css — already in your project, add if missing)
```css
:root {
  /* Admin Theme — Orange accent (different from user violet) */
  --admin-orange:        #f97316;
  --admin-orange-bg:     rgba(249, 115, 22, 0.12);
  --admin-orange-border: rgba(249, 115, 22, 0.28);
  --admin-orange-glow:   rgba(249, 115, 22, 0.15);

  /* Backgrounds */
  --bg-void:      #06060e;
  --bg-deep:      #09090f;
  --bg-surface:   #0d0d1a;
  --bg-card:      rgba(255, 255, 255, 0.028);
  --bg-card-hover:rgba(255, 255, 255, 0.044);
  --bg-input:     rgba(255, 255, 255, 0.042);
  --bg-elevated:  rgba(255, 255, 255, 0.058);

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.062);
  --border-soft:   rgba(255, 255, 255, 0.10);
  --border-medium: rgba(255, 255, 255, 0.14);
  --border-orange: rgba(249, 115, 22, 0.30);

  /* Text */
  --txt-primary:   #f0f0ff;
  --txt-secondary: rgba(240, 240, 255, 0.52);
  --txt-muted:     rgba(240, 240, 255, 0.28);
  --txt-orange:    #fb923c;

  /* Status */
  --green:  #10b981;  --green-bg:  rgba(16,185,129,0.12);  --green-border:  rgba(16,185,129,0.25);
  --red:    #ef4444;  --red-bg:    rgba(239,68,68,0.12);    --red-border:    rgba(239,68,68,0.25);
  --amber:  #f59e0b;  --amber-bg:  rgba(245,158,11,0.12);  --amber-border:  rgba(245,158,11,0.25);
  --cyan:   #06b6d4;  --cyan-bg:   rgba(6,182,212,0.12);   --cyan-border:   rgba(6,182,212,0.25);
  --violet: #7c3aed;  --violet-bg: rgba(124,58,237,0.12);  --violet-border: rgba(124,58,237,0.25);

  /* Radii */
  --r-sm: 6px;  --r-md: 10px;  --r-lg: 14px;  --r-xl: 20px;

  /* Shadows */
  --shadow-card:   0 2px 20px rgba(0,0,0,0.4);
  --shadow-orange: 0 0 24px rgba(249,115,22,0.25);
}
```

### Reusable CSS Classes (add to globals.css)
```css
/* Glass Card */
.admin-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-lg);
  position: relative;
  overflow: hidden;
  transition: border-color 200ms ease, background 200ms ease;
}
.admin-card:hover { border-color: var(--border-soft); }
.admin-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--admin-orange), transparent);
  opacity: 0;
  transition: opacity 200ms ease;
}
.admin-card:hover::before { opacity: 0.6; }

/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border-subtle);
}

/* Setting Row */
.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.038);
  gap: 16px;
  transition: background 150ms ease;
}
.setting-row:last-child { border-bottom: none; }
.setting-row:hover { background: rgba(255,255,255,0.018); }
```

### Framer Motion Variants (lib/animations/admin.ts)
```typescript
export const pageIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
}
export const tabIn = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
}
export const stagger = {
  animate: { transition: { staggerChildren: 0.06 } }
}
export const cardIn = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }
}
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 1 — DATABASE (Run in Supabase SQL Editor FIRST)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```sql
-- ─────────────────────────────────────────
-- TABLE: admin_settings
-- Stores all platform configuration as key-value JSON rows
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id          UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  setting_key TEXT        UNIQUE NOT NULL,
  setting_value JSONB     NOT NULL DEFAULT '{}',
  updated_by  UUID        REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage settings"
  ON public.admin_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ─────────────────────────────────────────
-- TABLE: ip_blocklist
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.ip_blocklist (
  id          UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  ip_address  TEXT        UNIQUE NOT NULL,
  reason      TEXT,
  blocked_by  UUID        REFERENCES public.profiles(id),
  expires_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ip_blocklist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins only" ON public.ip_blocklist FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─────────────────────────────────────────
-- TABLE: admin_audit_log
-- Every admin action written here
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id          UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id    UUID        REFERENCES public.profiles(id),
  action      TEXT        NOT NULL,
  target_type TEXT,                         -- 'user' | 'setting' | 'system'
  target_id   TEXT,
  old_value   JSONB,
  new_value   JSONB,
  ip_address  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins only" ON public.admin_audit_log FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─────────────────────────────────────────
-- FUNCTION: auto-update updated_at
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────
-- SEED: Default settings (run once)
-- ─────────────────────────────────────────
INSERT INTO public.admin_settings (setting_key, setting_value) VALUES
('general', '{
  "platformName": "AgentFlow AI",
  "supportEmail": "support@agentflow.ai",
  "platformUrl": "https://agentflow.vercel.app",
  "defaultTimezone": "UTC+6",
  "signupsEnabled": true,
  "googleOAuthEnabled": true,
  "githubOAuthEnabled": false,
  "aiAssistantEnabled": true,
  "analyticsEnabled": true,
  "maintenanceMode": false,
  "maintenanceMessage": "We are upgrading AgentFlow AI. Back shortly!"
}'),
('ai', '{
  "model": "gemini-1.5-flash",
  "maxOutputTokens": 1024,
  "temperature": 0.7,
  "topP": 0.9,
  "dailyLimitFree": 50,
  "monthlyLimitFree": 500,
  "dailyLimitPro": 500,
  "monthlyLimitPro": 5000,
  "cooldownSeconds": 5,
  "adminBypassRateLimit": true,
  "blockProfanity": true,
  "contentModeration": true,
  "promptLinkedIn": "You are a professional LinkedIn content writer. Generate an engaging post about: {{task_description}}. User tone: {{user_tone}}. Include 5-8 hashtags. Format: hook + insight + 3 key points + CTA. Return JSON: {content, hashtags, hook, cta}",
  "promptTwitter": "Write a punchy Twitter/X thread (5 tweets) about: {{task_description}}. User tone: {{user_tone}}. Each tweet max 280 chars. Return JSON: {tweets: string[], hashtags: string[]}",
  "promptFacebook": "Write a friendly Facebook post about: {{task_description}}. User tone: {{user_tone}}. Conversational, 150-250 words. Include 3-5 hashtags. Return JSON: {content, hashtags}"
}'),
('email', '{
  "provider": "resend",
  "fromName": "AgentFlow AI",
  "fromEmail": "noreply@agentflow.ai",
  "notifications": {
    "newUserSignup": {"email": false, "inApp": true},
    "automationFailureSpike": {"email": true, "inApp": true},
    "securityThreat": {"email": true, "inApp": true},
    "geminiTokensHigh": {"email": true, "inApp": false},
    "dailyReport": {"email": true, "inApp": false},
    "adminImpersonation": {"email": false, "inApp": true}
  }
}'),
('quotas', '{
  "defaultPlan": "free",
  "allowSelfUpgrade": false,
  "plans": {
    "free":  {"maxTasks": 5,   "maxGenerationsMonth": 50,   "maxSocialAccounts": 1, "logRetentionDays": 30,  "storageMb": 100,  "apiRatePerHour": 60},
    "pro":   {"maxTasks": 50,  "maxGenerationsMonth": 500,  "maxSocialAccounts": 5, "logRetentionDays": 90,  "storageMb": 1000, "apiRatePerHour": 300},
    "team":  {"maxTasks": 200, "maxGenerationsMonth": 2000, "maxSocialAccounts": 15,"logRetentionDays": 365, "storageMb": 5000, "apiRatePerHour": 1000}
  }
}'),
('social', '{
  "linkedin": {"clientId": "", "clientSecret": "", "enabled": true},
  "twitter":  {"clientId": "", "clientSecret": "", "enabled": true},
  "facebook": {"clientId": "", "clientSecret": "", "enabled": false}
}'),
('security', '{
  "sessionTimeoutHours": 4,
  "maxFailedAttempts": 5,
  "autoBlockIp": true,
  "adminTfaRequired": false,
  "logAllAdminActions": true,
  "notifyTargetOnImpersonate": false,
  "ipWhitelist": []
}'),
('maintenance', '{
  "logRetentionDays": 90,
  "bannerEnabled": false,
  "bannerText": "",
  "bannerType": "info"
}'),
('advanced', '{
  "debugLogging": false,
  "showApiTimings": false,
  "disableRateLimiting": false
}')
ON CONFLICT (setting_key) DO NOTHING;
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 2 — TYPESCRIPT TYPES (types/admin-settings.ts)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```typescript
// types/admin-settings.ts
// Generate this file COMPLETELY

export interface GeneralSettings {
  platformName: string
  supportEmail: string
  platformUrl: string
  defaultTimezone: string
  signupsEnabled: boolean
  googleOAuthEnabled: boolean
  githubOAuthEnabled: boolean
  aiAssistantEnabled: boolean
  analyticsEnabled: boolean
  maintenanceMode: boolean
  maintenanceMessage: string
}

export interface AISettings {
  model: 'gemini-1.5-flash' | 'gemini-1.5-pro' | 'gemini-2.0-flash'
  maxOutputTokens: number         // 256–4096
  temperature: number             // 0.0–1.0
  topP: number                    // 0.0–1.0
  dailyLimitFree: number
  monthlyLimitFree: number
  dailyLimitPro: number
  monthlyLimitPro: number
  cooldownSeconds: number         // 0–60
  adminBypassRateLimit: boolean
  blockProfanity: boolean
  contentModeration: boolean
  promptLinkedIn: string
  promptTwitter: string
  promptFacebook: string
}

export interface NotificationPrefs {
  email: boolean
  inApp: boolean
}

export interface EmailSettings {
  provider: 'resend' | 'smtp' | 'sendgrid'
  fromName: string
  fromEmail: string
  resendApiKey?: string
  smtpHost?: string
  smtpPort?: number
  smtpUser?: string
  smtpPassword?: string
  notifications: {
    newUserSignup: NotificationPrefs
    automationFailureSpike: NotificationPrefs
    securityThreat: NotificationPrefs
    geminiTokensHigh: NotificationPrefs
    dailyReport: NotificationPrefs
    adminImpersonation: NotificationPrefs
  }
}

export interface PlanQuota {
  maxTasks: number
  maxGenerationsMonth: number
  maxSocialAccounts: number
  logRetentionDays: number
  storageMb: number
  apiRatePerHour: number
}

export interface QuotaSettings {
  defaultPlan: 'free' | 'pro' | 'team'
  allowSelfUpgrade: boolean
  plans: {
    free: PlanQuota
    pro: PlanQuota
    team: PlanQuota
  }
}

export interface SocialPlatformConfig {
  clientId: string
  clientSecret: string
  enabled: boolean
  connectedUsers?: number
  rateLimitUsed?: number
  rateLimitTotal?: number
  lastTestStatus?: 'success' | 'failed' | null
  lastTestAt?: string | null
}

export interface SocialSettings {
  linkedin: SocialPlatformConfig
  twitter: SocialPlatformConfig
  facebook: SocialPlatformConfig
}

export interface SecuritySettings {
  sessionTimeoutHours: number
  maxFailedAttempts: number
  autoBlockIp: boolean
  adminTfaRequired: boolean
  logAllAdminActions: boolean
  notifyTargetOnImpersonate: boolean
  ipWhitelist: string[]
}

export interface MaintenanceSettings {
  logRetentionDays: number
  bannerEnabled: boolean
  bannerText: string
  bannerType: 'info' | 'warning' | 'danger'
}

export interface AdvancedSettings {
  debugLogging: boolean
  showApiTimings: boolean
  disableRateLimiting: boolean
}

export interface AllAdminSettings {
  general: GeneralSettings
  ai: AISettings
  email: EmailSettings
  quotas: QuotaSettings
  social: SocialSettings
  security: SecuritySettings
  maintenance: MaintenanceSettings
  advanced: AdvancedSettings
}

export interface EnvVarStatus {
  key: string
  isSet: boolean
  description: string
  required: boolean
}

export interface AdminUser {
  id: string
  full_name: string
  email: string
  avatar_url: string | null
  last_login: string | null
  twoFactorEnabled: boolean
  isCurrentUser: boolean
}

export interface AuditLogEntry {
  id: string
  admin_id: string
  action: string
  target_type: string | null
  target_id: string | null
  old_value: Record<string, unknown> | null
  new_value: Record<string, unknown> | null
  ip_address: string | null
  created_at: string
  admin?: { full_name: string; email: string; avatar_url: string | null }
}

export type SettingsTab =
  | 'general'
  | 'ai'
  | 'email'
  | 'quotas'
  | 'social'
  | 'admins'
  | 'maintenance'
  | 'advanced'
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 3 — API ROUTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### `app/api/admin/settings/route.ts`
```typescript
// GET  /api/admin/settings         → returns AllAdminSettings
// PUT  /api/admin/settings         → updates one or more setting keys
//
// Implementation requirements:
// 1. createServerClient() + get session → if no session return 401
// 2. Query profiles WHERE id = session.user.id AND role = 'admin' → if not admin return 403
// 3. GET: SELECT * FROM admin_settings → build AllAdminSettings object → return 200
// 4. PUT: body = { key: SettingsKey, value: Record<string, unknown> }
//         Validate with Zod: key must be one of the 8 valid setting keys
//         UPDATE admin_settings SET setting_value = value, updated_by = adminId WHERE key = key
//         INSERT INTO admin_audit_log (admin_id, action, target_type, old_value, new_value, ip_address)
//         Return updated setting value
// 5. All errors: { error: string, code: string } with appropriate HTTP status
//
// Zod schema for PUT body:
// z.object({
//   key: z.enum(['general','ai','email','quotas','social','security','maintenance','advanced']),
//   value: z.record(z.unknown())
// })
```

### `app/api/admin/settings/test-email/route.ts`
```typescript
// POST /api/admin/settings/test-email
// Body: { toEmail: string }
// 1. Verify admin
// 2. Fetch email settings from admin_settings
// 3. Call Resend API to send test email:
//    Subject: "AgentFlow AI — Test Email"
//    Body: "If you received this email, your email configuration is working correctly."
// 4. Log action to admin_audit_log
// 5. Return { success: true, messageId: string } or { error: string }
```

### `app/api/admin/settings/test-ai/route.ts`
```typescript
// POST /api/admin/settings/test-ai
// Body: { prompt: string }
// 1. Verify admin
// 2. Fetch current AI settings from admin_settings
// 3. Initialize Gemini with the configured model + temperature + tokens
// 4. Send test prompt, capture response
// 5. Return { success: true, content: string, tokensUsed: number, latencyMs: number }
```

### `app/api/admin/settings/test-social/route.ts`
```typescript
// POST /api/admin/settings/test-social
// Body: { platform: 'linkedin' | 'twitter' | 'facebook' }
// 1. Verify admin
// 2. Fetch social credentials for platform from admin_settings
// 3. Make a simple API call to verify credentials (e.g. LinkedIn profile fetch)
// 4. Update admin_settings social.[platform].lastTestStatus and lastTestAt
// 5. Return { success: boolean, platform, latencyMs, error?: string }
```

### `app/api/admin/settings/env-status/route.ts`
```typescript
// GET /api/admin/settings/env-status
// 1. Verify admin
// 2. Check process.env for each required variable (DO NOT return values, only boolean)
// 3. Return array of EnvVarStatus objects:
// [
//   { key: 'NEXT_PUBLIC_SUPABASE_URL', isSet: true, description: 'Supabase project URL', required: true },
//   { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', isSet: true, description: 'Supabase anonymous key', required: true },
//   { key: 'SUPABASE_SERVICE_ROLE_KEY', isSet: true, description: 'Supabase service role key', required: true },
//   { key: 'GEMINI_API_KEY', isSet: boolean, description: 'Google Gemini API key', required: true },
//   { key: 'CRON_SECRET', isSet: boolean, description: 'Protects cron endpoints', required: true },
//   { key: 'RESEND_API_KEY', isSet: boolean, description: 'Email service key', required: false },
//   { key: 'NEXTAUTH_SECRET', isSet: boolean, description: 'Session encryption secret', required: true },
//   { key: 'LINKEDIN_CLIENT_ID', isSet: boolean, description: 'LinkedIn OAuth client ID', required: false },
//   { key: 'LINKEDIN_CLIENT_SECRET', isSet: boolean, description: 'LinkedIn OAuth secret', required: false },
//   { key: 'TWITTER_CLIENT_ID', isSet: boolean, description: 'Twitter OAuth client ID', required: false },
//   { key: 'TWITTER_CLIENT_SECRET', isSet: boolean, description: 'Twitter OAuth secret', required: false },
//   { key: 'FACEBOOK_CLIENT_ID', isSet: boolean, description: 'Facebook OAuth app ID', required: false },
//   { key: 'FACEBOOK_CLIENT_SECRET', isSet: boolean, description: 'Facebook OAuth secret', required: false },
// ]
```

### `app/api/admin/settings/admins/route.ts`
```typescript
// GET  /api/admin/settings/admins → list all admin users (profiles WHERE role='admin')
// POST /api/admin/settings/admins → promote a user to admin
//   Body: { userId: string }
//   UPDATE profiles SET role='admin' WHERE id=userId
//   Log to admin_audit_log
// DELETE /api/admin/settings/admins/[userId] → demote admin back to user
//   Cannot demote yourself (check session.user.id !== userId)
//   UPDATE profiles SET role='user' WHERE id=userId
```

### `app/api/admin/settings/maintenance/route.ts`
```typescript
// POST /api/admin/settings/maintenance
// Body: { action: 'clear-logs' | 'recalculate-analytics' | 'resync-memory' | 'trigger-cron' | 'export-users' | 'export-backup' }
// params?: { logRetentionDays?: number }
//
// Actions:
// 'clear-logs': DELETE FROM automation_logs WHERE created_at < NOW() - INTERVAL '${days} days'
//               Return { deleted: number }
// 'recalculate-analytics': Re-aggregate analytics (run SUM/COUNT queries, store in admin_settings as cache)
//                          Return { recalculated: true }
// 'resync-memory': For all users, run a Gemini summarisation pass on their recent posts → update ai_memory
//                  Return { usersProcessed: number }
// 'trigger-cron': Call /api/cron/run-tasks with CRON_SECRET header
//                 Return { triggered: true, response: object }
// 'export-users': Generate CSV of profiles table → return as downloadable response
//                 Headers: Content-Type: text/csv, Content-Disposition: attachment; filename="users.csv"
// 'export-backup': Query all tables → return as JSON
//                  Headers: Content-Type: application/json, Content-Disposition: attachment; filename="backup.json"
```

### `app/api/admin/settings/danger/route.ts`
```typescript
// POST /api/admin/settings/danger
// Body: { action: 'delete-logs' | 'reset-ai-memory' | 'reset-all-settings', confirmation: string }
//
// 'delete-logs':       confirmation must equal 'DELETE LOGS'
//                      DELETE FROM automation_logs (all)
//                      DELETE FROM ai_generated_posts (all)
//                      Log action
// 'reset-ai-memory':  confirmation must equal 'RESET MEMORY'
//                      DELETE FROM ai_memory (all rows)
//                      Log action
// 'reset-all-settings': confirmation must equal 'RESET ALL SETTINGS'
//                        UPDATE admin_settings with factory default values for all keys
//                        Log action
// Return { success: true, action, affectedRows?: number }
// All wrong confirmations → return 422 { error: 'Invalid confirmation text' }
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 4 — CUSTOM HOOK (hooks/admin/useAdminSettings.ts)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```typescript
// hooks/admin/useAdminSettings.ts
// Generate this file COMPLETELY
//
// This is the central state manager for the entire settings page.
// Uses useSWR for fetching. Local state for unsaved edits.
// Tracks which tabs have unsaved changes.

import useSWR from 'swr'
import { useState, useCallback } from 'react'
import type { AllAdminSettings, SettingsTab } from '@/types/admin-settings'

export function useAdminSettings() {
  const { data, error, isLoading, mutate } = useSWR<AllAdminSettings>(
    '/api/admin/settings',
    (url) => fetch(url).then(r => r.json()),
    { revalidateOnFocus: false }
  )

  // Local draft state — holds unsaved changes
  const [draft, setDraft] = useState<Partial<AllAdminSettings>>({})
  // Track which tabs have been modified
  const [dirtyTabs, setDirtyTabs] = useState<Set<SettingsTab>>(new Set())
  const [saving, setSaving] = useState<SettingsTab | null>(null)
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  // Update a specific setting key in the draft
  const updateSetting = useCallback(<K extends keyof AllAdminSettings>(
    tab: K,
    value: Partial<AllAdminSettings[K]>
  ) => {
    setDraft(prev => ({
      ...prev,
      [tab]: { ...(prev[tab] ?? data?.[tab] ?? {}), ...value }
    }))
    setDirtyTabs(prev => new Set(prev).add(tab as SettingsTab))
  }, [data])

  // Save a single tab
  const saveTab = useCallback(async (tab: SettingsTab) => {
    if (!draft[tab]) return { success: true }
    setSaving(tab)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: tab, value: { ...(data?.[tab] ?? {}), ...draft[tab] } })
      })
      if (!res.ok) throw new Error((await res.json()).error)
      await mutate()
      setDirtyTabs(prev => { const s = new Set(prev); s.delete(tab); return s })
      setLastSaved(new Date().toISOString())
      return { success: true }
    } catch (err) {
      return { success: false, error: String(err) }
    } finally {
      setSaving(null)
    }
  }, [draft, data, mutate])

  // Save ALL dirty tabs at once
  const saveAll = useCallback(async () => {
    const results = await Promise.all(
      Array.from(dirtyTabs).map(tab => saveTab(tab))
    )
    return results.every(r => r.success)
  }, [dirtyTabs, saveTab])

  // Get current value (draft takes priority over server data)
  const getValue = useCallback(<K extends keyof AllAdminSettings>(tab: K): AllAdminSettings[K] | undefined => {
    return { ...(data?.[tab] ?? {}), ...(draft[tab] ?? {}) } as AllAdminSettings[K]
  }, [data, draft])

  return {
    settings: data,
    getValue,
    isLoading,
    error,
    updateSetting,
    saveTab,
    saveAll,
    saving,
    lastSaved,
    isDirty: dirtyTabs.size > 0,
    dirtyTabs,
  }
}
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 5 — SHARED SUB-COMPONENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### `components/admin/settings/shared/SettingRow.tsx`
```tsx
// Props:
//   label: string           — main label, DM Sans 13px 500
//   description?: string    — helper text below label, 11px muted
//   children: ReactNode     — control element (toggle, input, select, button)
//   danger?: boolean        — renders row with red tint left border if true
//   className?: string

// Layout: flex row, space-between, padding 13px 20px
// Left: label + description stacked
// Right: children slot
// Hover: background rgba(255,255,255,0.018)
// Danger: border-left: 2px solid rgba(239,68,68,0.4)
// Bottom border: 1px solid rgba(255,255,255,0.038) (remove on last child)
```

### `components/admin/settings/shared/ToggleSwitch.tsx`
```tsx
// Props:
//   checked: boolean
//   onChange: (checked: boolean) => void
//   disabled?: boolean
//   color?: 'orange' | 'green' | 'violet'   default: 'green'

// Build a custom toggle — do NOT use Shadcn switch (style mismatch)
// Size: 40px wide × 22px tall
// Track: border-radius 11px
// Knob: 18px circle, white, smooth translate
// Colors:
//   OFF:    background rgba(255,255,255,0.1)
//   green:  background #10b981
//   orange: background #f97316
//   violet: background #7c3aed
// Transition: all 200ms cubic-bezier(0.4,0,0.2,1)
// Disabled: opacity 0.4, cursor not-allowed
// Focus: box-shadow 0 0 0 3px rgba(249,115,22,0.2)
// Framer: whileTap={{ scale: 0.95 }}
```

### `components/admin/settings/shared/SliderControl.tsx`
```tsx
// Props:
//   min: number
//   max: number
//   step?: number
//   value: number
//   onChange: (v: number) => void
//   formatValue?: (v: number) => string    // e.g. v => `${v}s` for cooldown
//   accentColor?: string                   // default var(--admin-orange)
//   showMinMax?: boolean

// Layout: flex row, gap 12px
// Slider: HTML range input, accent-color var(--admin-orange), flex 1, height 4px track
// Value display: JetBrains Mono 12px, color var(--admin-orange), min-width 44px, text-right
// Optional min/max labels below in 10px muted
```

### `components/admin/settings/shared/SectionCard.tsx`
```tsx
// Props:
//   title: string
//   icon: ReactNode          — 26×26 icon box
//   iconColor?: string       — 'orange'|'violet'|'green'|'cyan'|'red'|'amber'
//   badge?: ReactNode        — right side of header
//   children: ReactNode
//   className?: string

// Renders an admin-card with:
//   - section-header at top: icon box + title + optional badge
//   - children below (usually SettingRow list or custom content)
// Icon box colors (26×26, border-radius 7px):
//   orange: bg rgba(249,115,22,0.14) text #fb923c
//   violet: bg rgba(124,58,237,0.14) text #a78bfa
//   green:  bg rgba(16,185,129,0.12) text #6ee7b7
//   cyan:   bg rgba(6,182,212,0.12)  text #67e8f9
//   red:    bg rgba(239,68,68,0.12)  text #fca5a5
//   amber:  bg rgba(245,158,11,0.12) text #fcd34d
// Framer: cardIn on mount
```

### `components/admin/settings/shared/StatusBadge.tsx`
```tsx
// Props: variant: 'success'|'error'|'warning'|'info'|'orange'|'muted', children
// Small pill badge, font-size 10px, padding 2px 9px, border-radius 20px
// Each variant: bg + text + border from design tokens above
// 'success' variant: optional pulsing dot before text
```

### `components/admin/settings/shared/TextInput.tsx`
```tsx
// Props: label?, placeholder?, value, onChange, type?, width?, readOnly?, copyable?
// Styled input matching dark theme
// background: rgba(255,255,255,0.042)
// border: 1px solid var(--border-subtle)
// border-radius: var(--r-md)
// padding: 8px 14px
// color: var(--txt-primary)
// font: DM Sans 13px
// placeholder: var(--txt-muted)
// focus: border-color var(--admin-orange), box-shadow 0 0 0 3px rgba(249,115,22,0.12)
// error: border-color rgba(239,68,68,0.5)
// readOnly: cursor text, opacity 0.7
// copyable: shows clipboard icon button on right → onClick copies value + shows ✓ for 2s
// type="password": shows show/hide eye button on right
```

### `components/admin/settings/shared/SaveTabButton.tsx`
```tsx
// Props: tab: SettingsTab, isDirty: boolean, isSaving: boolean, onClick: () => void
// Renders only when isDirty === true
// Appears with animation (fadeInDown) when tab becomes dirty
// Shows: "Save [Tab Name]" button in orange gradient style
// Loading state: Loader2 spinning icon + "Saving..."
// Success flash: green checkmark for 1500ms after save
// Position: in the page header right side
```

### `components/admin/settings/shared/DangerZoneCard.tsx`
```tsx
// Props:
//   title: string
//   description: string
//   confirmText: string        — exact text user must type
//   buttonLabel: string
//   onConfirm: () => Promise<void>
//   isLoading?: boolean
//   severity?: 'danger' | 'critical'   default: 'danger'

// Background:
//   danger:   rgba(239,68,68,0.04) border rgba(239,68,68,0.18)
//   critical: rgba(239,68,68,0.08) border rgba(239,68,68,0.32)

// Layout:
//   Title row: warning icon (⚠) + title (13px red, Space Grotesk)
//   Description: 11.5px, rgba(252,165,165,0.55), line-height 1.5
//   Confirm input: type-to-confirm input
//     - placeholder: `Type "${confirmText}" to confirm`
//     - font: JetBrains Mono
//     - border: rgba(239,68,68,0.2)
//     - onChange: compare value === confirmText → enable button
//   Button: 100% width, red style, disabled until confirmed
//     - Loading: Loader2 spin
//     - disabled: opacity 0.38, cursor not-allowed

// On confirm: button goes loading → calls onConfirm() → shows success toast
//             input resets on success
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 6 — SETTINGS SIDEBAR
## `components/admin/settings/SettingsSidebar.tsx`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```tsx
// Props:
//   activeTab: SettingsTab
//   onTabChange: (tab: SettingsTab) => void
//   dirtyTabs: Set<SettingsTab>

// Width: 200px fixed, full height, no horizontal scroll

// HEADER (top of sidebar):
//   background: rgba(255,255,255,0.02)
//   border-bottom: 1px solid var(--border-subtle)
//   "Admin Settings" label: 10px, #f97316, font-weight 700, uppercase, letter-spacing 0.9px
//   "Platform Control Center" sub: 10px, var(--txt-muted)

// NAV GROUPS (3 groups with section labels):
//
//   Group "Platform" (label: 9px uppercase muted, letter-spacing 1.2px):
//     - General         icon: Settings2
//     - AI Configuration icon: Brain, orange dot badge (if AI key missing)
//     - Email & Alerts  icon: Mail
//     - Quotas & Plans  icon: Layers
//
//   Group "Integrations":
//     - Social API Keys icon: Share2
//     - Admin Accounts  icon: Users2
//
//   Group "System":
//     - Maintenance     icon: Wrench
//     - Advanced        icon: TriangleAlert, text color red-tinted (rgba(252,165,165,0.6))

// Each nav item:
//   Height: 36px, padding 0 10px, border-radius 8px
//   Inactive: color var(--txt-muted), no bg
//   Hover: bg rgba(255,255,255,0.04), color var(--txt-secondary)
//   Active: bg var(--admin-orange-bg), color #fb923c, border 1px solid var(--admin-orange-border)
//   Left accent: 2px solid var(--admin-orange) inside active item (use box-shadow inset or border-left)
//   Dirty indicator: tiny amber dot (4px) top-right of item when tab has unsaved changes
//   Framer: slideInLeft stagger on mount

// FOOTER (bottom):
//   border-top: 1px solid var(--border-subtle)
//   "Save All Changes" button: full width orange gradient
//     - Shows unsaved count: "Save Changes (3)" when dirtyTabs.size > 0
//     - Disabled when no dirty tabs
//     - Loading spinner while saving
//   Below button: "Last saved: 2 min ago" in 10px muted (update live with date-fns formatDistanceToNow)
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 7 — TAB PANELS (8 complete panels)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### TAB 1 — `components/admin/settings/tabs/GeneralTab.tsx`

```tsx
// Props: settings: GeneralSettings, onChange: (v: Partial<GeneralSettings>) => void

// CARD 1 — "Platform Identity" (icon: Globe, color: orange)
// SettingRows:
//   Platform Name      → TextInput, width 200px
//   Support Email      → TextInput type="email", width 220px
//   Platform URL       → TextInput, width 240px, copyable
//   Default Timezone   → Select with major timezones (25 options including UTC+6 Dhaka)
//
// CARD 2 — "Feature Flags" (icon: ToggleRight, color: orange)
//   badge: StatusBadge variant="orange" text="Live — applies instantly"
//   Rows (all use ToggleSwitch):
//     User Signups            color="green"
//     Google OAuth Login      color="green"
//     GitHub OAuth Login      color="green"
//     AI Assistant (global)   color="orange"  (important — different color)
//     Analytics Dashboard     color="green"
//     Social Media Posting    color="green"
//     Maintenance Mode        color="orange"  onChange also shows/hides CARD 3
//
// CARD 3 — "Maintenance Message" (icon: AlertTriangle, color: amber)
//   Only visible when maintenanceMode = true (animated: height 0 → auto, Framer AnimatePresence)
//   badge: StatusBadge variant="warning" text="All users see this"
//   Textarea: 80px height, full width, the maintenance message text
//   Preview box below: shows how it looks as a banner
//   "Test Maintenance Mode" button: opens a preview modal with simulated user view

// Skeleton loading state: 3 skeleton cards with shimmer (orange tint, not gray)
```

### TAB 2 — `components/admin/settings/tabs/AIConfigTab.tsx`

```tsx
// Props: settings: AISettings, onChange: (v: Partial<AISettings>) => void

// CARD 1 — "Model & Generation" (icon: Brain, color: violet)
//   badge: "Gemini 1.5 Flash — Free" in cyan tag
//   Rows:
//     AI Model        → custom Select card radio (not dropdown):
//                       3 pill cards side by side:
//                       [gemini-1.5-flash (Free) ✓] [gemini-1.5-pro (Paid)] [gemini-2.0-flash (Beta)]
//                       Selected: orange border + checkmark
//     Max Output Tokens → SliderControl min=256 max=4096 step=64
//     Temperature       → SliderControl min=0 max=1 step=0.1
//                         Helper: "0 = focused & predictable  ·  1 = creative & varied"
//                         Visual: 3 labels below slider: Precise | Balanced | Creative
//     Top-P (Nucleus)   → SliderControl min=0 max=1 step=0.1

// CARD 2 — "Rate Limits" (icon: Gauge, color: amber)
//   Rows:
//     Daily limit (Free users)    → TextInput type="number" width=80px + "/day" label
//     Monthly limit (Free users)  → TextInput type="number" width=80px + "/month" label
//     Daily limit (Pro users)     → TextInput type="number" width=80px
//     Monthly limit (Pro users)   → TextInput type="number" width=80px
//     Cooldown between requests   → SliderControl min=0 max=60 formatValue={v => `${v}s`}
//     Admin bypasses rate limits  → ToggleSwitch color="orange"
//     Block profanity in output   → ToggleSwitch color="green"

// CARD 3 — "Prompt Templates" (icon: FileCode2, color: violet)
//   3 collapsible sections (Accordion): LinkedIn | Twitter | Facebook
//   Each accordion item:
//     Header: platform icon + name + "Collapse/Expand" chevron
//     Body: textarea (code-area style: bg #050508, mono font, purple text, 100px height, resizable)
//     Toolbar: [Variables Reference ▾] [Reset to Default] [Test Template →]
//     Variables Reference: dropdown showing {{task_description}} {{user_tone}} {{platform}} {{user_name}}
//
//   "Test AI Configuration" button (bottom, full width, orange):
//     Opens modal:
//       TextInput: "Enter a test prompt"
//       Runs POST /api/admin/settings/test-ai
//       Shows result: AI output in code box + "1,247 tokens · 892ms" metadata
//       Framer: scaleIn modal animation
```

### TAB 3 — `components/admin/settings/tabs/EmailTab.tsx`

```tsx
// Props: settings: EmailSettings, onChange: (v: Partial<EmailSettings>) => void

// CARD 1 — "Email Provider" (icon: Mail, color: cyan)
//   badge: "Resend — 3,000 emails/month free"
//   Rows:
//     Provider → RadioCards (3 options):
//                [Resend (Free) ✓] [SMTP Custom] [SendGrid]
//                Switching shows/hides relevant fields below with AnimatePresence

//   When provider = 'resend':
//     Resend API Key  → TextInput type="password", copyable
//     From Name       → TextInput
//     From Email      → TextInput type="email"
//     "Get Resend API Key →" link to resend.com in orange ghost button style

//   When provider = 'smtp':
//     SMTP Host       → TextInput
//     SMTP Port       → TextInput type="number" width=80
//     Username        → TextInput
//     Password        → TextInput type="password"
//     From Name       → TextInput
//     From Email      → TextInput

//   "Send Test Email" button: POST /api/admin/settings/test-email
//     Loading: Loader2 spin
//     Success: green checkmark + "Test email sent to admin@email.com"
//     Error: red X + error message

// CARD 2 — "Admin Alert Preferences" (icon: Bell, color: orange)
//   Description: "Choose how you get notified about platform events"
//   Grid table (CSS grid, not HTML table):
//     Columns: Event Name | Email | In-App
//     Header row: 10px uppercase muted labels
//     6 event rows:
//       New user signup
//       Automation failure spike (>10/hr)
//       Security threat detected
//       Gemini API tokens >80%
//       Daily summary report
//       Admin impersonation started
//     Each row: event name (left) + Email toggle + In-App toggle
//     All toggles use ToggleSwitch color="orange"

// CARD 3 — "Email Templates" (icon: FileText, color: cyan)
//   Accordion list — 6 templates:
//     Welcome Email | Email Verification | Password Reset |
//     Task Failed Notification | Weekly Digest | Admin Alert
//   Each accordion item:
//     Subject: TextInput
//     Body: Textarea (dark bg, 90px, resizable)
//     Variables box: pill list of available {{vars}}
//     Footer: [Preview Email] [Reset to Default] buttons
```

### TAB 4 — `components/admin/settings/tabs/QuotasTab.tsx`

```tsx
// Props: settings: QuotaSettings, onChange: (v: Partial<QuotaSettings>) => void

// CARD 1 — "Plan Feature Limits" (icon: Layers, color: orange)
//   badge: "Edit any cell — saves on Save"
//   CSS grid table (grid-template-columns: 160px repeat(3,1fr)):
//     Header row: Feature | Free (green label) | Pro (violet label) | Team (cyan label)
//     7 data rows:
//       Max Tasks                    | 5   | 50  | 200
//       AI Generations/month         | 50  | 500 | 2000
//       Social Accounts              | 1   | 5   | 15
//       Log Retention (days)         | 30  | 90  | 365
//       Storage (MB)                 | 100 | 1000| 5000
//       API Requests/hour            | 60  | 300 | 1000
//       Support Level               | Community | Email | Priority
//
//     Each editable cell: small input (60px wide, centered text, dark bg)
//     Last row (Support Level): select dropdowns
//     Row hover: subtle orange-tinted bg

// CARD 2 — "Default Plan" (icon: Star, color: cyan)
//   Rows:
//     Assign plan on signup  → RadioCards: [Free ✓] [Pro] [Team]
//     Allow self-upgrade     → ToggleSwitch (user can upgrade plan from settings)
//     Show plan badge in UI  → ToggleSwitch (show "Pro" badge on user avatar)

// CARD 3 — "Per-User Custom Quota Override" (icon: UserCog, color: amber)
//   badge: "Bypasses plan limits for specific users"
//   Search section:
//     TextInput placeholder="Search user by email..." with magnifying glass icon
//     Dropdown: searchable user list (fetches from /api/admin/users as user types, debounced 300ms)
//     When user selected: shows a QuotaOverrideForm below:
//       Inputs for all 6 quota fields pre-filled with current user's plan values
//       "Set Custom Quota" orange button
//   Existing overrides list (fetches users WHERE custom_quota IS NOT NULL):
//     Each row: avatar + name + email + "Custom" badge + quota summary + "Remove Override" button
```

### TAB 5 — `components/admin/settings/tabs/SocialAPITab.tsx`

```tsx
// Props: settings: SocialSettings, onChange: (v: Partial<SocialSettings>) => void

// 3 platform cards (LinkedIn, Twitter/X, Facebook) — each identical structure:

// CARD STRUCTURE FOR EACH PLATFORM:
//   Header: platform logo (SVG) + platform name + status badge + "Test Connection" button
//   Status badge:
//     Connected + passing: StatusBadge variant="success" text="Active · N users"
//     Error: StatusBadge variant="error" text="Error — click to reconnect"
//     Not configured: StatusBadge variant="muted" text="Not configured"
//
//   Fields grid (2 columns):
//     Client ID     → TextInput
//     Client Secret → TextInput type="password" with show/hide eye icon
//   Full width:
//     Redirect URI  → TextInput readOnly copyable (pre-built from platform URL)
//   Scopes display: read-only pill list showing required scopes
//
//   "Test Connection" button:
//     Calls POST /api/admin/settings/test-social with platform
//     Loading: "Testing..." with Loader2 spin
//     Success: green checkmark + "Connected · 124ms"
//     Error: red X + error message inline
//
//   Rate limit progress bar (if test passed):
//     Label: "API Rate Limit"
//     Progress bar: orange fill (width = used/total %)
//     "800 / 1000 used today" label
//
//   Instructions collapsible (Accordion):
//     Step-by-step guide to get credentials
//     Link to platform developer console
//     Platform-specific notes (e.g. LinkedIn requires a Company Page for posting)
//
//   "Save [Platform] Credentials" button per card (individual save)
//
// Card border color:
//   Active: var(--border-subtle) with green top-line via ::before
//   Error:  rgba(239,68,68,0.25) border, rgba(239,68,68,0.03) bg
//   Disabled: dimmed, toggle to enable
//
// "Enable [Platform]" toggle in each card header to enable/disable platform-wide
```

### TAB 6 — `components/admin/settings/tabs/AdminAccountsTab.tsx`

```tsx
// Props: (fetches own data from /api/admin/settings/admins)

// CARD 1 — "Current Admins" (icon: Shield, color: orange)
//   badge: "N admins total"
//   Each admin row:
//     Avatar circle (gradient, initials)
//     Name + "You" pill (orange) if isCurrentUser
//     Email + "Last login: X ago" in muted text
//     "2FA ON" (green badge) or "2FA OFF" (red badge)
//     "Remove Admin" button: ghost red, disabled if isCurrentUser
//       Confirmation dialog: "Are you sure you want to remove admin access for [name]?"
//       Calls DELETE /api/admin/settings/admins/[id]
//
// CARD 2 — "Promote User to Admin" (icon: UserPlus, color: violet)
//   Searchable user select: type email → dropdown shows matching non-admin users
//   Shows user card preview when selected: avatar + name + email + current plan badge
//   "Grant Admin Access" orange button
//   Confirmation dialog: "This gives [name] FULL admin access to the platform."
//   Success: user appears in CARD 1 list with animation
//
// CARD 3 — "Admin Security Policy" (icon: Lock, color: amber)
//   Rows:
//     Require 2FA for all admins   → ToggleSwitch color="orange"
//                                    Helper: "Admins without 2FA are blocked from admin routes"
//     Admin session timeout        → Select: [2h] [4h] [8h] [24h]
//     Log all admin actions        → ToggleSwitch color="orange"
//     Notify target on impersonation → ToggleSwitch
//       Helper: "Email users when an admin views their account"
//     IP whitelist for admin login → Textarea (one IP per line)
//       Toggle: enable/disable whitelist
//       Warning card if enabled: "CRITICAL: Only listed IPs can access admin panel"
//
// CARD 4 — "Admin Audit Log" (icon: ScrollText, color: cyan)
//   Last 20 admin actions
//   Table columns: Admin | Action | Target | Timestamp
//   Each row: admin avatar + name | action in monospace | target user/resource | relative time
//   "View Full Audit Log →" link → /admin/logs?source=admin
```

### TAB 7 — `components/admin/settings/tabs/MaintenanceTab.tsx`

```tsx
// Props: settings: MaintenanceSettings, onChange: (v: Partial<MaintenanceSettings>) => void

// CARD 1 — "Database Tools" (icon: Database, color: orange)
//   Each row = a maintenance action with button:
//
//   Clear Old Automation Logs:
//     Description: "Permanently deletes logs older than N days"
//     Control: TextInput type="number" value=90 width=60px + "days" label + "Clear Logs" button
//     Before run: estimate count: "~18,847 entries will be deleted"
//     Progress: inline progress bar (0→100%) with "Deleting..." text
//     Success: "Deleted 18,847 entries" in green
//
//   Recalculate Analytics Cache:
//     Description: "Refresh all aggregated analytics data"
//     "Recalculate" button → loading 1-3s → "Done — cache refreshed"
//
//   Re-sync AI Memory:
//     Description: "Rebuild AI memory profiles for all users"
//     "Re-sync" button → loading → "2,412 users processed"
//
//   Trigger Cron Job Now:
//     Description: "Manually run the hourly automation scheduler"
//     "Trigger Now" green button → loading → shows result:
//       "Processed: 12 | Succeeded: 11 | Failed: 1 | Duration: 4.2s"
//
// CARD 2 — "Backup & Export" (icon: Download, color: cyan)
//   Export Users CSV:
//     Description: "All user accounts with metadata — estimated 2.1 MB"
//     "Download CSV" button → calls /api/admin/settings/maintenance with action='export-users'
//     Progress: "Preparing 2,412 rows..." → triggers browser download
//   Export Full Database JSON:
//     Description: "All tables — estimated 47 MB"
//     "Download JSON" button → same pattern
//   Export Automation Logs:
//     Description: "Last 30 days — estimated 8.3 MB"
//     "Download CSV" button
//
// CARD 3 — "Site-Wide User Banner" (icon: Megaphone, color: amber)
//   "Show banner to all users" → ToggleSwitch color="orange"
//   AnimatePresence: when ON, show additional controls:
//     Banner text: TextInput full width
//     Banner type: 3 RadioCards: [Info] [Warning] [Danger]
//     Live preview: shows how banner looks at top of page
//     Preview colors:
//       Info: blue bg, white text
//       Warning: amber bg, dark text
//       Danger: red bg, white text
//
// CARD 4 — "Scheduled Maintenance Window" (icon: Calendar, color: violet)
//   Schedule a future maintenance window
//   Date picker (native HTML datetime-local input, styled dark)
//   Duration select: [30 min] [1 hour] [2 hours] [4 hours]
//   "Notify users" toggle: sends email N hours before
//   "Notify N hours before" slider: 1–48 hours
//   Schedule button + existing scheduled windows list
```

### TAB 8 — `components/admin/settings/tabs/AdvancedTab.tsx`

```tsx
// Props: settings: AdvancedSettings, onChange: (v: Partial<AdvancedSettings>) => void
// (Also fetches env status from /api/admin/settings/env-status)

// WARNING BANNER at top of page (full width, above all cards):
//   bg: rgba(239,68,68,0.06), border-bottom: 1px solid rgba(239,68,68,0.2)
//   Icon: TriangleAlert (red, 16px)
//   Text: "Advanced settings — destructive actions on this page cannot be undone"
//   Framer: fadeInDown on mount

// CARD 1 — "Environment Variables" (icon: KeyRound, color: cyan)
//   Description: "Variable values are never shown — only presence is checked"
//   13 env var rows (from /api/admin/settings/env-status):
//     Each row: monospace key name + status icon + description + "Required" or "Optional" tag
//     ✓ Set: color #10b981
//     ✗ Missing: color #ef4444 + "Set in Vercel Dashboard" link
//     Missing required vars: amber warning card below list:
//       "2 required variables missing — some features may be broken"
//   Refresh button: re-fetches env status

// CARD 2 — "Developer Mode" (icon: Code2, color: violet)
//   Warning: "Only enable these in development — may affect production performance"
//   Rows:
//     Enable debug logging       → ToggleSwitch
//     Show API timings in UI     → ToggleSwitch
//     Disable rate limiting      → ToggleSwitch color="orange"
//       Extra warning if enabled: animated red border around this row

// DANGER ZONE (below cards, separated by a red section divider):
//   Divider: "— DANGER ZONE —" with red left+right lines, centered text
//   3 DangerZoneCard components:
//
//   Card 1: "Delete All Automation Logs"
//     description: shows exact count from DB before deleting
//     confirmText: "DELETE LOGS"
//     severity: "danger"
//     onConfirm: POST /api/admin/settings/danger { action:'delete-logs', confirmation:'DELETE LOGS' }
//
//   Card 2: "Reset All AI Memory"
//     description: "Clears AI memory for all N users. They will lose tone and preference settings."
//     confirmText: "RESET MEMORY"
//     severity: "danger"
//     onConfirm: POST danger with action:'reset-ai-memory'
//
//   Card 3: "Reset All Platform Settings"
//     description: "Restores ALL admin settings to factory defaults. You will lose all configuration."
//     confirmText: "RESET ALL SETTINGS"
//     severity: "critical"  (darker red, pulsing border)
//     onConfirm: POST danger with action:'reset-all-settings'
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 8 — MAIN PAGE FILE
## `app/(admin)/admin/settings/page.tsx`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```tsx
// app/(admin)/admin/settings/page.tsx
// This is the root of the settings page — wire everything together.

// Structure:
// 1. 'use client' directive
// 2. Imports: all tab components, SettingsSidebar, useAdminSettings hook,
//             Framer Motion, toast (react-hot-toast), AdminPageHeader
// 3. State: activeTab: SettingsTab = 'general'
// 4. Call useAdminSettings() hook
// 5. handleSaveTab: calls saveTab(tab) → shows success/error toast
// 6. handleSaveAll: calls saveAll() → shows toast

// LAYOUT (full viewport height minus admin topbar):
// Flex row:
//   Left:  SettingsSidebar (200px, fixed height, overflow-y auto inside)
//   Right: Main content area (flex-1, overflow-y auto)

// MAIN CONTENT AREA structure:
//   AdminPageHeader:
//     title: tab name (e.g. "General Settings")
//     subtitle: tab description
//     actions: SaveTabButton (shown when activeTab is dirty)
//
//   Animated tab content (AnimatePresence + motion.div):
//     key={activeTab}
//     Each tab panel wraps its content in <motion.div {...tabIn}>
//     Conditional render based on activeTab:
//       general      → <GeneralTab settings={getValue('general')} onChange={(v) => updateSetting('general', v)} />
//       ai           → <AIConfigTab ... />
//       email        → <EmailTab ... />
//       quotas       → <QuotasTab ... />
//       social       → <SocialAPITab ... />
//       admins       → <AdminAccountsTab />
//       maintenance  → <MaintenanceTab settings={getValue('maintenance')} onChange={...} />
//       advanced     → <AdvancedTab settings={getValue('advanced')} onChange={...} />

// TOAST CONFIGURATION (at root of component):
// import { Toaster } from 'react-hot-toast'
// <Toaster position="bottom-right" toastOptions={{
//   style: { background:'#0d0d1a', color:'#f0f0ff', border:'1px solid rgba(249,115,22,0.3)', borderRadius:'10px' },
//   success: { iconTheme: { primary:'#10b981', secondary:'#0d0d1a' } },
//   error: { iconTheme: { primary:'#ef4444', secondary:'#0d0d1a' } }
// }} />

// KEYBOARD SHORTCUT: Ctrl/Cmd+S → triggers handleSaveTab(activeTab)
// useEffect listening for keydown, cleanup on unmount

// UNSAVED CHANGES GUARD: useEffect checking isDirty
// window.onbeforeunload = isDirty ? () => "You have unsaved changes." : null

// MOBILE (< 768px):
// Sidebar collapses to a horizontal scrollable tab bar at top
// Tab items show only icons (no labels)
// Main content takes full width
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 9 — LOADING SKELETON
## `app/(admin)/admin/settings/loading.tsx`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```tsx
// Matches the exact layout of the settings page
// Shows while settings data is loading

// Sidebar skeleton:
//   - Logo area: 2 skeleton lines (title + subtitle)
//   - 8 nav item skeletons (height 36px, border-radius 8px)
//   - Footer: 1 button skeleton

// Main content skeleton:
//   - Header: title skeleton (180px wide, 20px tall) + subtitle skeleton
//   - 3 card skeletons:
//     Card 1: header row (40px) + 4 row skeletons (48px each)
//     Card 2: header row + 6 row skeletons
//     Card 3: header row + content area (100px tall)

// Shimmer animation:
// @keyframes shimmer {
//   0% { background-position: -400px 0 }
//   100% { background-position: 400px 0 }
// }
// .skeleton {
//   background: linear-gradient(90deg,
//     rgba(249,115,22,0.04) 25%,
//     rgba(249,115,22,0.08) 50%,
//     rgba(249,115,22,0.04) 75%);
//   background-size: 800px 100%;
//   animation: shimmer 1.6s infinite;
//   border-radius: var(--r-md);
// }
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 10 — COMPLETE FILE MANIFEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate ALL of these files in this exact order:

```
STEP 1 — Types & Database
  types/admin-settings.ts
  [Run SQL in Supabase]

STEP 2 — API Routes
  app/api/admin/settings/route.ts
  app/api/admin/settings/test-email/route.ts
  app/api/admin/settings/test-ai/route.ts
  app/api/admin/settings/test-social/route.ts
  app/api/admin/settings/env-status/route.ts
  app/api/admin/settings/admins/route.ts
  app/api/admin/settings/admins/[userId]/route.ts
  app/api/admin/settings/maintenance/route.ts
  app/api/admin/settings/danger/route.ts

STEP 3 — Hook
  hooks/admin/useAdminSettings.ts

STEP 4 — Shared Sub-Components
  components/admin/settings/shared/SettingRow.tsx
  components/admin/settings/shared/ToggleSwitch.tsx
  components/admin/settings/shared/SliderControl.tsx
  components/admin/settings/shared/SectionCard.tsx
  components/admin/settings/shared/StatusBadge.tsx
  components/admin/settings/shared/TextInput.tsx
  components/admin/settings/shared/SaveTabButton.tsx
  components/admin/settings/shared/DangerZoneCard.tsx

STEP 5 — Sidebar
  components/admin/settings/SettingsSidebar.tsx

STEP 6 — Tab Panels (generate each completely, in order)
  components/admin/settings/tabs/GeneralTab.tsx
  components/admin/settings/tabs/AIConfigTab.tsx
  components/admin/settings/tabs/EmailTab.tsx
  components/admin/settings/tabs/QuotasTab.tsx
  components/admin/settings/tabs/SocialAPITab.tsx
  components/admin/settings/tabs/AdminAccountsTab.tsx
  components/admin/settings/tabs/MaintenanceTab.tsx
  components/admin/settings/tabs/AdvancedTab.tsx

STEP 7 — Main Page & Loading
  lib/animations/admin.ts
  app/(admin)/admin/settings/page.tsx
  app/(admin)/admin/settings/loading.tsx
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 11 — NON-NEGOTIABLE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. COMPLETE FILES ONLY — never write "// ... rest of the component" or truncate.

2. EVERY form input must be controlled — no uncontrolled inputs anywhere.

3. EVERY async action:
   - Shows loading state (button disabled + Loader2 spinning icon)
   - Shows success toast on success (react-hot-toast)
   - Shows error toast on failure with the error message
   - Resets loading state in finally block

4. EVERY API route:
   - Verifies admin role before any data access (check profiles.role = 'admin')
   - Validates request body with Zod schemas
   - Returns typed JSON responses
   - Has try/catch with { error: string, code: string } error format
   - Logs admin actions to admin_audit_log table

5. ANIMATIONS — every panel transition uses Framer Motion:
   - Page load: pageIn variant
   - Tab switch: tabIn variant with AnimatePresence
   - Cards: stagger + cardIn
   - Modals: scaleIn

6. MOBILE — every component must be responsive:
   - Sidebar → horizontal scrollable tab bar on mobile
   - 2-column grids → single column on mobile
   - Tables → horizontal scroll wrapper
   - All text readable at 375px

7. DARK MODE ONLY — every color uses CSS variables.
   No hardcoded hex except inside :root{} CSS variable definitions.

8. TypeScript strict — no 'any' types anywhere. All props fully typed.

9. Zod validation on every API route input AND every form (react-hook-form + zodResolver).

10. The ⌘S / Ctrl+S keyboard shortcut MUST save the active tab.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## START COMMAND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEGIN NOW.

Start with Step 1: Generate `types/admin-settings.ts` completely.
Then proceed through every step in order without stopping.
Do not ask for confirmation between files.
Do not summarize what you are about to do — just write the code.
Generate every single file in the manifest above.
```