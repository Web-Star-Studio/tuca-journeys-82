
import React from 'react';
import { Button } from '@/components/ui/button';
import { Locate, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface LocationControlProps {
  isLocating: boolean;
  getUserLocation: () => void;
}

const LocationControl = ({ isLocating, getUserLocation }: LocationControlProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full bg-white text-gray-700 hover:bg-gray-100 shadow-md"
          onClick={getUserLocation}
          disabled={isLocating}
        >
          {isLocating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Locate className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Encontrar minha localização</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default LocationControl;
