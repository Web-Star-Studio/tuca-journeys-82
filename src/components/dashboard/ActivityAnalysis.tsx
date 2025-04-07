
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Booking } from "@/types/bookings";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityAnalysisProps {
  recentBookings: Booking[];
}

const ActivityAnalysis = ({ recentBookings }: ActivityAnalysisProps) => {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-gray-800">Análise de Uso</h2>
        <Button variant="link" className="text-tuca-ocean-blue p-0 h-auto text-sm flex items-center">
          Ver detalhes <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <Card className="bg-white hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Atividades e Preferências</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3 text-gray-800">Atividades recentes</h3>
              {recentBookings.length > 0 ? (
                <ul className="space-y-3">
                  {recentBookings.slice(0, 3).map((booking, i) => (
                    <li key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{booking.item_name}</p>
                        <p className="text-xs text-gray-500">
                          {booking.start_date ? new Date(booking.start_date).toLocaleDateString() : 'Data não disponível'}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                        booking.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {booking.status === 'confirmed' ? 'Confirmado' : 
                         booking.status === 'pending' ? 'Pendente' : 'Cancelado'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">Nenhuma atividade recente</p>
              )}
              
              <Button variant="outline" className="w-full mt-3 text-sm">
                Ver histórico completo
              </Button>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 text-gray-800">Preferências de viagem</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Passeios</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2 bg-gray-200" indicatorClassName="bg-tuca-ocean-blue" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Hospedagens</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2 bg-gray-200" indicatorClassName="bg-tuca-medium-blue" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pacotes</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <Progress value={10} className="h-2 bg-gray-200" indicatorClassName="bg-blue-400" />
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Baseado em seus interesses</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-tuca-light-blue text-tuca-ocean-blue px-3 py-1 rounded-full text-xs">Praia</span>
                    <span className="bg-tuca-light-blue text-tuca-ocean-blue px-3 py-1 rounded-full text-xs">Mergulho</span>
                    <span className="bg-tuca-light-blue text-tuca-ocean-blue px-3 py-1 rounded-full text-xs">Ecoturismo</span>
                    <span className="bg-tuca-light-blue text-tuca-ocean-blue px-3 py-1 rounded-full text-xs">Aventura</span>
                  </div>
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
