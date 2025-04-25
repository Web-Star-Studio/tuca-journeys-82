
-- Create travel_preferences table for storing user preferences
CREATE TABLE IF NOT EXISTS travel_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  travel_style TEXT NOT NULL,
  group_size INTEGER NOT NULL,
  trip_duration INTEGER NOT NULL,
  activities TEXT[] NOT NULL,
  accommodation_types TEXT[] NOT NULL,
  budget_range TEXT NOT NULL,
  dietary_restrictions TEXT[],
  special_requests TEXT,
  travel_dates JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Row Level Security policies
ALTER TABLE travel_preferences ENABLE ROW LEVEL SECURITY;

-- Users can read their own preferences
CREATE POLICY "Users can read own preferences"
  ON travel_preferences
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own preferences
CREATE POLICY "Users can insert own preferences"
  ON travel_preferences
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own preferences
CREATE POLICY "Users can update own preferences"
  ON travel_preferences
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_travel_preferences_user_id ON travel_preferences (user_id);
