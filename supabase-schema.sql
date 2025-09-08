-- Araujo-Schacht Belonging & Becoming Planner
-- Supabase Database Schema
-- Copy and paste this into your Supabase SQL Editor

-- Enable RLS (Row Level Security)
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Create profiles table for users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL CHECK (name IN ('Daniel', 'Yvonne')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create goals table
CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('personal', 'family', 'career', 'health', 'financial', 'spiritual', 'relationship')),
  owner TEXT NOT NULL CHECK (owner IN ('Daniel', 'Yvonne', 'both')),
  target_date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  milestones JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  owner TEXT NOT NULL CHECK (owner IN ('Daniel', 'Yvonne', 'both')),
  due_date DATE NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  goal_id UUID REFERENCES goals(id) ON DELETE SET NULL,
  reminder TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create weekly_plans table
CREATE TABLE IF NOT EXISTS weekly_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_number INTEGER NOT NULL CHECK (week_number >= 1 AND week_number <= 52),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  focus TEXT DEFAULT '',
  wins TEXT[] DEFAULT ARRAY[]::TEXT[],
  lessons TEXT[] DEFAULT ARRAY[]::TEXT[],
  owner TEXT NOT NULL CHECK (owner IN ('Daniel', 'Yvonne', 'both')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(week_number, start_date, owner)
);

-- Create daily_rhythms table
CREATE TABLE IF NOT EXISTS daily_rhythms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  owner TEXT NOT NULL CHECK (owner IN ('Daniel', 'Yvonne')),
  habits JSONB DEFAULT '[]'::jsonb,
  gratitude TEXT[] DEFAULT ARRAY[]::TEXT[],
  top_priorities TEXT[] DEFAULT ARRAY[]::TEXT[],
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, owner)
);

-- Create vision_boards table
CREATE TABLE IF NOT EXISTS vision_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner TEXT NOT NULL CHECK (owner IN ('Daniel', 'Yvonne', 'both')),
  title TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  quotes TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_weekly_plans_updated_at BEFORE UPDATE ON weekly_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_daily_rhythms_updated_at BEFORE UPDATE ON daily_rhythms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vision_boards_updated_at BEFORE UPDATE ON vision_boards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_rhythms ENABLE ROW LEVEL SECURITY;
ALTER TABLE vision_boards ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow all operations for now (since we handle auth in the app)
-- You can make these more restrictive later if needed

CREATE POLICY "Allow all operations on profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on goals" ON goals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on weekly_plans" ON weekly_plans FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on daily_rhythms" ON daily_rhythms FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on vision_boards" ON vision_boards FOR ALL USING (true) WITH CHECK (true);

-- Insert initial user profiles
INSERT INTO profiles (id, email, name) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'daniel@araujo-schacht.com', 'Daniel'),
  ('22222222-2222-2222-2222-222222222222', 'yvonne@araujo-schacht.com', 'Yvonne')
ON CONFLICT (email) DO NOTHING;

-- Insert initial 12-week plans
INSERT INTO weekly_plans (week_number, start_date, end_date, focus, owner) VALUES
  (1, '2025-09-08', '2025-09-14', 'Setting Foundation & Getting Started', 'both'),
  (2, '2025-09-15', '2025-09-21', 'Building Momentum', 'both'),
  (3, '2025-09-22', '2025-09-28', 'Establishing Daily Rhythms', 'both'),
  (4, '2025-09-29', '2025-10-05', 'First Month Review & Adjustment', 'both'),
  (5, '2025-10-06', '2025-10-12', 'Deepening Commitment', 'both'),
  (6, '2025-10-13', '2025-10-19', 'Mid-Point Momentum', 'both'),
  (7, '2025-10-20', '2025-10-26', 'Overcoming Challenges', 'both'),
  (8, '2025-10-27', '2025-11-02', 'Two-Thirds Milestone', 'both'),
  (9, '2025-11-03', '2025-11-09', 'Accelerating Progress', 'both'),
  (10, '2025-11-10', '2025-11-16', 'Final Push Preparation', 'both'),
  (11, '2025-11-17', '2025-11-23', 'Sprint to Finish', 'both'),
  (12, '2025-11-24', '2025-11-30', 'Completion & Celebration', 'both')
ON CONFLICT (week_number, start_date, owner) DO NOTHING;