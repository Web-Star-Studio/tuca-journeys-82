
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const TourActionButton: React.FC<TourActionButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button 
      onClick={onClick} 
      className="w-full sm:w-auto flex items-center gap-1"
      disabled={disabled}
    >
      <Plus className="h-4 w-4" />
      <span>Novo Passeio</span>
    </Button>
  );
};

export default TourActionButton;
