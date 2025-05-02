
-- Function to create event tickets
CREATE OR REPLACE FUNCTION public.create_event_ticket(
  p_event_id INT,
  p_name TEXT,
  p_price NUMERIC,
  p_available_quantity INT,
  p_max_per_order INT DEFAULT 4,
  p_description TEXT DEFAULT NULL,
  p_type TEXT DEFAULT 'regular',
  p_benefits TEXT[] DEFAULT '{}'
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ticket_id INT;
BEGIN
  INSERT INTO public.event_tickets (
    event_id,
    name,
    price,
    available_quantity,
    max_per_order,
    description,
    type,
    benefits
  ) VALUES (
    p_event_id,
    p_name,
    p_price,
    p_available_quantity,
    p_max_per_order,
    p_description,
    p_type,
    p_benefits
  )
  RETURNING id INTO v_ticket_id;
  
  RETURN jsonb_build_object('id', v_ticket_id, 'success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Function to get event tickets
CREATE OR REPLACE FUNCTION public.get_event_tickets(
  p_event_id INT
) RETURNS SETOF public.event_tickets
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.event_tickets
  WHERE event_id = p_event_id
  ORDER BY price ASC;
END;
$$;

-- Function to delete event tickets
CREATE OR REPLACE FUNCTION public.delete_event_tickets(
  p_event_id INT
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INT;
BEGIN
  DELETE FROM public.event_tickets
  WHERE event_id = p_event_id
  RETURNING count(*) INTO v_count;
  
  RETURN jsonb_build_object('success', true, 'deleted_count', v_count);
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;
