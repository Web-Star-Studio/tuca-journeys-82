
-- Create event_tickets table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.event_tickets (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  available_quantity INTEGER NOT NULL,
  max_per_order INTEGER DEFAULT 4,
  type VARCHAR DEFAULT 'regular',
  benefits TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add RLS policies for event_tickets
ALTER TABLE public.event_tickets ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can read event tickets"
ON public.event_tickets FOR SELECT
TO authenticated, anon
USING (true);

-- Only admins can insert, update, or delete
CREATE POLICY "Admins can manage event tickets"
ON public.event_tickets FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
    AND (role = 'admin' OR role = 'master')
  )
);
