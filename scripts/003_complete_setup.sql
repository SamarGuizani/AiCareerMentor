-- Complete database setup for AI Career Mentor
-- Run this script in your Supabase SQL Editor

-- 1. Create quiz_results table (if not exists)
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_answers JSONB NOT NULL,
  ai_result TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create career_paths table (FIXED - no dependency on quiz_answers)
CREATE TABLE IF NOT EXISTS career_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  phase_1 JSONB NOT NULL,
  phase_2 JSONB NOT NULL,
  phase_3 JSONB NOT NULL,
  phase_4 JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Enable Row Level Security
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own quiz results" ON quiz_results;
DROP POLICY IF EXISTS "Users can insert own quiz results" ON quiz_results;
DROP POLICY IF EXISTS "Users can update own quiz results" ON quiz_results;
DROP POLICY IF EXISTS "Users can view own career path" ON career_paths;
DROP POLICY IF EXISTS "Users can insert own career path" ON career_paths;
DROP POLICY IF EXISTS "Users can update own career path" ON career_paths;
DROP POLICY IF EXISTS "Users can delete own career path" ON career_paths;

-- 5. Create RLS Policies for quiz_results
CREATE POLICY "Users can view own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz results" ON quiz_results
  FOR UPDATE USING (auth.uid() = user_id);

-- 6. Create RLS Policies for career_paths
CREATE POLICY "Users can view own career path" ON career_paths
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own career path" ON career_paths
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own career path" ON career_paths
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own career path" ON career_paths
  FOR DELETE USING (auth.uid() = user_id);

-- 7. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON quiz_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_career_paths_user_id ON career_paths(user_id);
CREATE INDEX IF NOT EXISTS idx_career_paths_created_at ON career_paths(created_at DESC);



