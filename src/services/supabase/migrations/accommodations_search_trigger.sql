
-- SQL Migration for creating a search vector trigger for accommodations
-- NOTE: This will only be executed if manually run in Supabase SQL Editor

-- Create or replace function for updating the search_vector column
CREATE OR REPLACE FUNCTION public.accommodations_search_trigger()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    to_tsvector('portuguese', NEW.title) || 
    to_tsvector('portuguese', NEW.description) || 
    to_tsvector('portuguese', COALESCE(NEW.short_description, '')) ||
    to_tsvector('portuguese', COALESCE(NEW.address, '')) ||
    to_tsvector('portuguese', COALESCE(NEW.type, ''));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS accommodations_search_trigger ON public.accommodations;

-- Create the trigger
CREATE TRIGGER accommodations_search_trigger
BEFORE INSERT OR UPDATE ON public.accommodations
FOR EACH ROW EXECUTE FUNCTION public.accommodations_search_trigger();

-- Drop the index if it exists
DROP INDEX IF EXISTS accommodations_search_vector_idx;

-- Create a search index
CREATE INDEX accommodations_search_vector_idx ON public.accommodations USING GIN (search_vector);
