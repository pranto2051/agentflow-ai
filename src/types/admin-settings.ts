// types/admin-settings.ts

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
  maxOutputTokens: number
  temperature: number
  topP: number
  dailyLimitFree: number
  monthlyLimitFree: number
  dailyLimitPro: number
  monthlyLimitPro: number
  cooldownSeconds: number
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
