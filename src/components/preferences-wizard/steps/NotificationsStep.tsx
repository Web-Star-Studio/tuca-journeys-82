
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface NotificationsStepProps {
  notifyPromos: boolean;
  notifyBookings: boolean;
  onNotifyPromosChange: (checked: boolean) => void;
  onNotifyBookingsChange: (checked: boolean) => void;
}

const NotificationsStep = ({
  notifyPromos,
  notifyBookings,
  onNotifyPromosChange,
  onNotifyBookingsChange,
}: NotificationsStepProps) => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Escolha quais tipos de notificações você deseja receber para ficar por dentro de tudo.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="notifyPromos" 
            checked={notifyPromos}
            onCheckedChange={(checked) => onNotifyPromosChange(checked === true)}
          />
          <div className="space-y-1">
            <label
              htmlFor="notifyPromos"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Promoções e ofertas especiais
            </label>
            <p className="text-sm text-gray-500">
              Receba notificações sobre promoções, descontos e ofertas exclusivas.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="notifyBookings" 
            checked={notifyBookings}
            onCheckedChange={(checked) => onNotifyBookingsChange(checked === true)}
          />
          <div className="space-y-1">
            <label
              htmlFor="notifyBookings"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Atualizações de reservas
            </label>
            <p className="text-sm text-gray-500">
              Receba notificações sobre confirmações, cancelamentos e alterações em suas reservas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsStep;
