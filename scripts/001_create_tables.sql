-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create quiz_answers table to store user quiz responses
CREATE TABLE IF NOT EXISTS quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  q1_answer TEXT NOT NULL,
  q2_answer TEXT NOT NULL,
  q3_answer TEXT NOT NULL,
  q4_answer TEXT NOT NULL,
  q5_answer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create career_paths table to store AI-generated career paths
CREATE TABLE IF NOT EXISTS career_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_answers_id UUID NOT NULL REFERENCES quiz_answers(id) ON DELETE CASCADE,
  phase_1 JSONB NOT NULL,
  phase_2 JSONB NOT NULL,
  phase_3 JSONB NOT NULL,
  phase_4 JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Quiz Answers RLS Policies
CREATE POLICY "Users can view own quiz answers" ON quiz_answers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz answers" ON quiz_answers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz answers" ON quiz_answers
  FOR UPDATE USING (auth.uid() = user_id);

-- Career Paths RLS Policies
CREATE POLICY "Users can view own career path" ON career_paths
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own career path" ON career_paths
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own career path" ON career_paths
  FOR UPDATE USING (auth.uid() = user_id);
