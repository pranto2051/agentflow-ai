export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string;
  task_type: 'daily' | 'weekly' | 'monthly' | 'one-time';
  schedule_time: string; // HH:MM
  schedule_day?: number; // 0-6
  timezone: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'all';
  status: 'active' | 'paused' | 'failed' | 'running';
  next_run?: string;
  created_at: string;
  updated_at: string;
}

export interface TaskStats {
  total: number;
  active: number;
  paused: number;
  failed: number;
  runningNow: number;
}

export interface GeneratedPost {
  id: string;
  task_id?: string;
  user_id: string;
  content: string;
  platform: 'linkedin' | 'twitter' | 'facebook';
  hashtags: string[];
  hook?: string;
  cta?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  generated_at: string;
  published_at?: string;
}

export interface AutomationLog {
  id: string;
  task_id: string;
  user_id: string;
  status: 'success' | 'failed' | 'running';
  message?: string;
  generated_post_id?: string;
  duration_ms?: number;
  created_at: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  post?: GeneratedPost;
  timestamp: string;
  isLoading?: boolean;
}

export interface UpcomingRun {
  task_id: string;
  title: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'all';
  task_type: string;
  next_run: string;
}

export interface ScheduledRun extends UpcomingRun {
  status: 'scheduled' | 'completed' | 'failed';
  last_run?: string;
}

export interface CalendarDay {
  date: string;
  runs: {
    task_id: string;
    title: string;
    platform: 'linkedin' | 'twitter' | 'facebook' | 'all';
    time: string;
    status: 'scheduled' | 'completed' | 'failed';
  }[];
}

export interface SocialAccount {
  id: string;
  user_id: string;
  platform: 'linkedin' | 'twitter' | 'facebook';
  username: string;
  avatar_url?: string;
  connected_at: string;
  is_active: boolean;
  expires_at: string;
  last_post_at?: string;
  post_count: number;
  token_health: 'valid' | 'expiring' | 'expired';
}

export interface AnalyticsOverview {
  totalPosts: number;
  totalGenerations: number;
  successRate: number;
  avgGenerationsPerDay: number;
  changeVsPrevious: {
    posts: number;
    generations: number;
    successRate: number;
  };
}

export interface AnalyticsData {
  overview: AnalyticsOverview;
  postsOverTime: { date: string; count: number; platform: string }[];
  platformBreakdown: { platform: string; count: number; percentage: number }[];
  taskPerformance: { taskId: string; title: string; runs: number; success: number; avg_duration: string; last_run: string }[];
  contentInsights: {
    avgTokensPerPost: number;
    mostUsedTone: string;
    mostActiveDay: string;
    mostActiveHour: string;
    topHashtags: { tag: string; count: number }[];
  };
  recentPosts: GeneratedPost[];
  activityHeatmap: { date: string; count: number }[];
}

export interface UserProfile {
  id: string;
  full_name?: string;
  username?: string;
  bio?: string;
  timezone?: string;
  avatar_url?: string;
}

export interface AIMemory {
  tone: string;
  industry: string;
  writing_style: string;
  topics: string[];
  about_me: string;
}

export interface UserSettings {
  profile: UserProfile;
  memory: AIMemory;
  notifications: {
    email_automation_completed: boolean;
    email_automation_failed: boolean;
    email_weekly_digest: boolean;
    email_daily_report: boolean;
    email_tips: boolean;
    email_updates: boolean;
    push_enabled: boolean;
    push_automation_completed: boolean;
    push_automation_failed: boolean;
    push_weekly_digest: boolean;
    fail_frequency: 'Immediately' | 'Daily Digest' | 'Never';
    digest_time: string;
    digest_day: string;
  };
}
