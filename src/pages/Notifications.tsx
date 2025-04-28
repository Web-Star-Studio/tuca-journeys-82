
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Bell, Check, Calendar, Gift, CreditCard, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const notificationsData = [
  {
    id: 1,
    title: "Confirmação de reserva",
    message: "Sua reserva para o Tour de Mergulho foi confirmada.",
    date: "Hoje, 10:30",
    type: "reservation",
    isNew: true,
  },
  {
    id: 2,
    title: "Desconto exclusivo",
    message: "Aproveite 15% de desconto para o passeio de buggy esta semana!",
    date: "Ontem, 14:20",
    type: "promotion",
    isNew: true,
  },
  {
    id: 3,
    title: "Lembrete de viagem",
    message: "Sua viagem para Fernando de Noronha começa em 3 dias.",
    date: "15/04/2023",
    type: "reminder",
    isNew: false,
  },
  {
    id: 4,
    title: "Pagamento confirmado",
    message: "Seu pagamento de R$ 450,00 foi processado com sucesso.",
    date: "10/04/2023",
    type: "payment",
    isNew: false,
  },
  {
    id: 5,
    title: "Atualização de itinerário",
    message: "Houve uma mudança no horário do seu passeio de barco.",
    date: "05/04/2023",
    type: "info",
    isNew: false,
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "reservation":
      return <Check className="h-5 w-5 text-green-500" />;
    case "reminder":
      return <Calendar className="h-5 w-5 text-blue-500" />;
    case "promotion":
      return <Gift className="h-5 w-5 text-purple-500" />;
    case "payment":
      return <CreditCard className="h-5 w-5 text-tuca-ocean-blue" />;
    default:
      return <Info className="h-5 w-5 text-gray-500" />;
  }
};

const Notifications = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Notificações</h1>
            <Button variant="outline">Marcar todas como lidas</Button>
          </div>

          <div className="space-y-4">
            {notificationsData.length > 0 ? (
              notificationsData.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 flex items-start ${
                    notification.isNew ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="mr-4 mt-1 bg-gray-100 p-2 rounded-full">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">
                        {notification.title}
                        {notification.isNew && (
                          <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                            Nova
                          </span>
                        )}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {notification.date}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-gray-600">
                  Nenhuma notificação
                </h2>
                <p className="text-gray-500 mt-2">
                  Você não tem nenhuma notificação no momento.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notifications;
