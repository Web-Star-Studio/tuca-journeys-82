
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourActionButtonProps {
  onClick: () => void;
}

const TourActionButton: React.FC<TourActionButtonProps> = ({ onClick }) => {
  return (
    <Button className="gap-1" onClick={onClick}>
      <Plus className="h-4 w-4" />
      <span>Novo Passeio</span>
    </Button>
  );
};

export default TourActionButton;
