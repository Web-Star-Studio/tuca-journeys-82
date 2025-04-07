
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Booking } from "@/types/bookings";

interface ActivityAnalysisProps {
  recentBookings: Booking[];
}

const ActivityAnalysis = ({ recentBookings }: ActivityAnalysisProps) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-medium mb-4">Análise de Uso</h2>
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Atividades recentes</h3>
              <ul className="space-y-2">
                {recentBookings.slice(0, 3).map((booking, i) => (
                  <li key={i} className="text-sm flex justify-between border-b pb-2">
                    <span>{booking.item_name}</span>
                    <span className="text-gray-500">
                      {booking.start_date ? new Date(booking.start_date).toLocaleDateString() : 'Data não disponível'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Preferências</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Passeios</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Hospedagens</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pacotes</span>
                    <span>10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ActivityAnalysis;
