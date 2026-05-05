-- ============================================================
-- AgentFlow AI - Supabase Database Schema
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================
-- USERS (extends Supabase auth.users)
-- =====================
CREATE TABLE IF NOT EXISTS public.profiles (
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
CREATE TABLE IF NOT EXISTS public.tasks (
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
CREATE TABLE IF NOT EXISTS public.ai_generated_posts (
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
CREATE TABLE IF NOT EXISTS public.automation_logs (
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
CREATE TABLE IF NOT EXISTS public.social_accounts (
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
CREATE TABLE IF NOT EXISTS public.ai_memory (
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
CREATE TABLE IF NOT EXISTS public.admin_impersonation_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id UUID REFERENCES public.profiles(id),
  target_user_id UUID REFERENCES public.profiles(id),
  action TEXT,
  ip_address TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ
);

-- ============================================================
-- AgentFlow AI - EMERGENCY RESET (Fixing 500 Internal Error)
-- ============================================================

-- 1. Remove ALL custom triggers and functions to stop the 500 error
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

-- 2. Clean up corrupted auth users
DELETE FROM auth.users WHERE email = 'admin@agentflow.ai';

-- 3. Re-create a simple, non-recursive is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT (role = 'admin')
    FROM public.profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Disable RLS on profiles temporarily to ensure login works
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- 5. Force a schema reload
NOTIFY pgrst, 'reload schema';

-- =====================
-- ADMIN SETTINGS TABLE
-- =====================

CREATE TABLE IF NOT EXISTS public.admin_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Admins can manage settings
CREATE POLICY "Admins manage settings" ON public.admin_settings FOR ALL USING (public.is_admin());
-- Public can view some settings if needed (or keep it admin only)
CREATE POLICY "Users view public settings" ON public.admin_settings FOR SELECT USING (true);
