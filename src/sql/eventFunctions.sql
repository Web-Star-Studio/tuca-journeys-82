
-- Function to get event tickets
CREATE OR REPLACE FUNCTION public.get_event_tickets(p_event_id integer)
RETURNS SETOF public.event_tickets
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT * FROM public.event_tickets
  WHERE event_id = p_event_id
  ORDER BY price ASC;
$$;

-- Function to delete event tickets
CREATE OR REPLACE FUNCTION public.delete_event_tickets(p_event_id integer)
RETURNS void
LANGUAGE SQL
SECURITY DEFINER
AS $$
  DELETE FROM public.event_tickets
  WHERE event_id = p_event_id;
$$;

-- Function to create event ticket
CREATE OR REPLACE FUNCTION public.create_event_ticket(
  p_event_id integer,
  p_name text,
  p_price numeric,
  p_available_quantity integer,
  p_max_per_order integer DEFAULT 4,
  p_description text DEFAULT NULL,
  p_type text DEFAULT 'regular',
  p_benefits text[] DEFAULT '{}'::text[]
)
RETURNS void
LANGUAGE SQL
SECURITY DEFINER
AS $$
  INSERT INTO public.event_tickets (
    event_id, name, price, available_quantity, 
    max_per_order, description, type, benefits
  )
  VALUES (
    p_event_id, p_name, p_price, p_available_quantity, 
    p_max_per_order, p_description, p_type, p_benefits
  );
$$;

-- Function to get user event bookings
CREATE OR REPLACE FUNCTION public.get_user_event_bookings(p_user_id uuid)
RETURNS TABLE (
  id integer,
  event_id integer,
  user_id uuid,
  tickets integer,
  total_price numeric,
  status text,
  payment_status text,
  payment_method text,
  payment_details jsonb,
  created_at timestamp with time zone,
  attendee_info jsonb,
  event jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    eb.id,
    eb.event_id,
    eb.user_id,
    eb.tickets,
    eb.total_price,
    eb.status,
    eb.payment_status,
    eb.payment_method,
    eb.payment_details,
    eb.created_at,
    eb.attendee_info,
    row_to_json(e)::jsonb as event
  FROM 
    public.event_bookings eb
  JOIN 
    public.events e ON eb.event_id = e.id
  WHERE 
    eb.user_id = p_user_id
  ORDER BY 
    eb.created_at DESC;
END;
$$;
