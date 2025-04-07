
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Seu navegador não suporta geolocalização");
      toast({
        title: "Localização não disponível",
        description: "Seu navegador não suporta geolocalização",
        variant: "destructive",
      });
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([longitude, latitude]);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        let errorMessage = "Erro ao obter localização";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permissão de localização negada";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Informação de localização indisponível";
            break;
          case error.TIMEOUT:
            errorMessage = "Tempo esgotado ao obter localização";
            break;
        }
        
        setLocationError(errorMessage);
        toast({
          title: "Erro de localização",
          description: errorMessage,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return { userLocation, isLocating, locationError, getUserLocation };
};
