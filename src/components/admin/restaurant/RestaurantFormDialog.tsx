
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Restaurant } from '@/types/restaurant';

interface RestaurantFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant: Restaurant | null;
}

const RestaurantFormDialog: React.FC<RestaurantFormDialogProps> = ({
  isOpen,
  onOpenChange,
  restaurant
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {restaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Restaurant form will be implemented here.</p>
          <p>This is a placeholder for the restaurant form.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantFormDialog;
