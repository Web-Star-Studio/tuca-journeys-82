
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface NotificationsCardProps {
  notifyPromos: boolean;
  notifyBookings: boolean;
  onNotifyPromosChange: (checked: boolean) => void;
  onNotifyBookingsChange: (checked: boolean) => void;
}

const NotificationsCard = ({
  notifyPromos,
  notifyBookings,
  onNotifyPromosChange,
  onNotifyBookingsChange,
}: NotificationsCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Notificações</h3>
        
        <div className="space-y-4">
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
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;
