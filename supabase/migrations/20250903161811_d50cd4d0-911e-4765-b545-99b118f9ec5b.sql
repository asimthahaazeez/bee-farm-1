-- Fix the role system migration
-- First, add role column to profiles as text
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'role'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN role TEXT NOT NULL DEFAULT 'beekeeper' 
        CHECK (role IN ('beekeeper', 'admin', 'moderator'));
    END IF;
END $$;

-- Create user roles enum for better type safety
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('beekeeper', 'admin', 'moderator');
    END IF;
END $$;

-- Create function to check user roles (for RLS policies)
CREATE OR REPLACE FUNCTION public.get_user_role(check_user_id uuid)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE profiles.user_id = check_user_id;
$$;

-- Create function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(check_user_id uuid, required_role TEXT)
RETURNS boolean
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = check_user_id AND profiles.role = required_role
  );
$$;

-- Create API keys table for public API access (if not exists)
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  key_name TEXT NOT NULL,
  api_key TEXT NOT NULL UNIQUE,
  permissions JSONB NOT NULL DEFAULT '{"read": true, "write": false}'::jsonb,
  rate_limit INTEGER NOT NULL DEFAULT 1000,
  expires_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on API keys
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own API keys" ON public.api_keys;
DROP POLICY IF EXISTS "Users can create their own API keys" ON public.api_keys;
DROP POLICY IF EXISTS "Users can update their own API keys" ON public.api_keys;
DROP POLICY IF EXISTS "Users can delete their own API keys" ON public.api_keys;

-- RLS Policies for API keys
CREATE POLICY "Users can view their own API keys" 
ON public.api_keys FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own API keys" 
ON public.api_keys FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own API keys" 
ON public.api_keys FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own API keys" 
ON public.api_keys FOR DELETE 
USING (auth.uid() = user_id);

-- Create system notifications table (if not exists)
CREATE TABLE IF NOT EXISTS public.system_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('security_alert', 'system_update', 'maintenance', 'feature_announcement')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  action_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on system notifications
ALTER TABLE public.system_notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.system_notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.system_notifications;
DROP POLICY IF EXISTS "Admin users can create notifications" ON public.system_notifications;

-- RLS Policies for system notifications
CREATE POLICY "Users can view their own notifications" 
ON public.system_notifications FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own notifications" 
ON public.system_notifications FOR UPDATE 
USING (auth.uid() = user_id);

-- Admin users can create system-wide notifications
CREATE POLICY "Admin users can create notifications" 
ON public.system_notifications FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create AI processing queue table (if not exists)
CREATE TABLE IF NOT EXISTS public.ai_processing_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  hive_id UUID NOT NULL,
  analysis_id UUID,
  image_url TEXT NOT NULL,
  processing_type TEXT NOT NULL CHECK (processing_type IN ('health_analysis', 'disease_detection', 'population_estimate', 'queen_detection')),
  priority INTEGER NOT NULL DEFAULT 5 CHECK (priority >= 1 AND priority <= 10),
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed', 'cancelled')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  result_data JSONB,
  error_message TEXT,
  processing_start_time TIMESTAMP WITH TIME ZONE,
  processing_end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on AI processing queue
ALTER TABLE public.ai_processing_queue ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own processing jobs" ON public.ai_processing_queue;
DROP POLICY IF EXISTS "Users can create their own processing jobs" ON public.ai_processing_queue;
DROP POLICY IF EXISTS "System can update processing jobs" ON public.ai_processing_queue;

-- RLS Policies for AI processing queue
CREATE POLICY "Users can view their own processing jobs" 
ON public.ai_processing_queue FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own processing jobs" 
ON public.ai_processing_queue FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update processing jobs" 
ON public.ai_processing_queue FOR UPDATE 
USING (true);

-- Create indexes for performance (if not exists)
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON public.api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_api_key ON public.api_keys(api_key) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_api_keys_expires ON public.api_keys(expires_at) WHERE expires_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_system_notifications_user_id ON public.system_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_system_notifications_type ON public.system_notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_system_notifications_severity ON public.system_notifications(severity);
CREATE INDEX IF NOT EXISTS idx_system_notifications_read ON public.system_notifications(is_read);

CREATE INDEX IF NOT EXISTS idx_ai_processing_queue_user_id ON public.ai_processing_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_processing_queue_status ON public.ai_processing_queue(status);
CREATE INDEX IF NOT EXISTS idx_ai_processing_queue_priority ON public.ai_processing_queue(priority);
CREATE INDEX IF NOT EXISTS idx_ai_processing_queue_created ON public.ai_processing_queue(created_at);

-- Add triggers for updated_at columns (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_api_keys_updated_at') THEN
        CREATE TRIGGER update_api_keys_updated_at
            BEFORE UPDATE ON public.api_keys
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_ai_processing_queue_updated_at') THEN
        CREATE TRIGGER update_ai_processing_queue_updated_at
            BEFORE UPDATE ON public.ai_processing_queue
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;