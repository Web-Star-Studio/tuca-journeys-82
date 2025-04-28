
-- Create RPC function to revoke all permissions
CREATE OR REPLACE FUNCTION public.revoke_all_permissions(
  target_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE PLPGSQL SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM user_permissions
  WHERE user_id = target_user_id;
  
  RETURN TRUE;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error revoking all permissions: %', SQLERRM;
  RETURN FALSE;
END;
$$;
