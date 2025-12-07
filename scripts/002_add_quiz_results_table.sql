-- Create quiz_results table to store combined quiz answers and AI suggestions
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_answers JSONB NOT NULL,
  ai_result TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Quiz Results RLS Policies
CREATE POLICY "Users can view own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz results" ON quiz_results
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin can view all quiz results (optional)
CREATE POLICY "Admins can view all quiz results" ON quiz_results
  FOR SELECT USING (
    auth.jwt() ->> 'email' = 'admin@example.com'
  );
