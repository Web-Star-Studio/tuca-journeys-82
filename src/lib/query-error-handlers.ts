
import { toast } from 'sonner';

export const handleQueryError = (error: any) => {
  const errorMessage = error?.message || 'An error occurred while fetching data';
  console.error('Query error:', error);
  toast.error(errorMessage);
};

export const handleMutationError = (error: any) => {
  const errorMessage = error?.message || 'An error occurred while updating data';
  console.error('Mutation error:', error);
  toast.error(errorMessage);
};

