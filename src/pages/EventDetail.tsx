
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  CalendarDays, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  CalendarCheck, 
  Info 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Event } from "@/types/event";

// Sample events data (same as in Events.tsx)
const events: Event[] = [
  {
    id: 1,
    name: "Festival de Gastronomia e Cultura",
    description: "Um festival com os melhores pratos da culinária local de Fernando de Noronha, apresentações culturais e música ao vivo. Durante o evento, chefs renomados de todo o Brasil apresentarão pratos exclusivos que destacam os ingredientes locais e a riqueza gastronômica da região. Além da gastronomia, o festival contará com apresentações de músicos locais, exposições de artesanato e demonstrações culturais que celebram a rica herança de Fernando de Noronha. Os ingressos incluem degustações de todos os pratos apresentados no festival, assim como uma bebida de boas-vindas.",
    image_url: "/hero-noronha-2.jpg",
    date: "2024-08-15",
    start_time: "18:00",
    end_time: "23:00",
    location: "Praia do Porto",
    price: 60.00,
    category: "Gastronomia",
    capacity: 200,
    available_spots: 120,
    status: "scheduled",
    organizer: "Secretaria de Turismo de Fernando de Noronha",
    featured: true
  },
  {
    id: 2,
    name: "Corrida Ecológica de Noronha",
    description: "Corrida de 10km pelas trilhas e praias do arquipélago, promovendo conscientização ambiental e bem-estar. O percurso passará por algumas das paisagens mais deslumbrantes da ilha, incluindo a famosa Baía dos Porcos e o mirante do Morro Dois Irmãos. Todos os participantes receberão um kit contendo camiseta feita de material reciclável, número de peito, e um brinde especial produzido por artesãos locais. Parte do valor arrecadado será destinado a projetos de conservação ambiental em Fernando de Noronha.",
    image_url: "/tour-trail.jpg",
    date: "2024-09-10",
    start_time: "07:00",
    end_time: "10:30",
    location: "Porto de Santo Antônio",
    price: 85.00,
    category: "Esporte",
    capacity: 150,
    available_spots: 82,
    status: "scheduled",
    organizer: "Associação de Atletas de Fernando de Noronha"
  },
  {
    id: 3,
    name: "Workshop de Fotografia Submarina",
    description: "Aprenda técnicas de fotografia submarina com profissionais experientes em um dos locais com maior biodiversidade marinha do Brasil. Este workshop intensivo combinará aulas teóricas sobre fotografia subaquática com sessões práticas de mergulho em locais selecionados ao redor da ilha. Os participantes aprenderão sobre configurações de câmera, iluminação subaquática, técnicas de composição e edição de imagens. O workshop é adequado tanto para fotógrafos iniciantes quanto para intermediários que desejam aprimorar suas habilidades. É necessário ter experiência prévia em mergulho autônomo e trazer seu próprio equipamento fotográfico à prova d'água.",
    image_url: "/tour-underwater.jpg",
    date: "2024-07-25",
    start_time: "09:00",
    end_time: "16:00",
    location: "Marina do Sueste",
    price: 350.00,
    category: "Workshop",
    capacity: 20,
    available_spots: 12,
    status: "scheduled",
    organizer: "Instituto Marinho de Noronha"
  },
  {
    id: 4,
    name: "Observação de Tartarugas Marinhas",
    description: "Evento especial para observação da desova de tartarugas marinhas com biólogos especializados. Fernando de Noronha é um dos principais locais de desova de tartarugas-verdes no Brasil, e esta é uma oportunidade única de testemunhar este fascinante evento natural. Biólogos do Projeto TAMAR guiarão os participantes pela praia, compartilhando informações sobre o ciclo de vida das tartarugas, os desafios para sua conservação e o importante trabalho realizado para proteger estas espécies ameaçadas. O evento ocorrerá à noite, quando as tartarugas tipicamente vêm à praia para desovar, e os participantes devem seguir rigorosas diretrizes para minimizar a perturbação dos animais.",
    image_url: "/tour-turtles.jpg",
    date: "2024-09-22",
    start_time: "19:00",
    end_time: "22:00",
    location: "Praia do Leão",
    price: 120.00,
    category: "Ecoturismo",
    capacity: 30,
    available_spots: 15,
    status: "scheduled",
    organizer: "Projeto TAMAR",
    featured: true
  },
  {
    id: 5,
    name: "Sunset Yoga na Praia",
    description: "Sessão de yoga ao pôr do sol em uma das mais belas praias do arquipélago. Esta sessão especial será conduzida por um instrutor certificado e oferecerá uma prática suave adequada para todos os níveis, desde iniciantes até praticantes experientes. À medida que o sol se põe sobre o oceano Atlântico, os participantes serão guiados através de uma sequência de asanas (posturas), pranayama (exercícios de respiração) e meditação, tudo isso ao som das ondas quebrando suavemente na praia. A combinação da prática de yoga com o cenário natural deslumbrante cria uma experiência verdadeiramente única e enriquecedora para corpo, mente e espírito.",
    image_url: "/tour-sunset.jpg",
    date: "2024-08-05",
    start_time: "17:30",
    end_time: "19:00",
    location: "Praia do Sancho",
    price: 50.00,
    category: "Bem-estar",
    capacity: 25,
    available_spots: 8,
    status: "scheduled",
    organizer: "Centro de Yoga Noronha"
  },
  {
    id: 6,
    name: "Palestra: Preservação dos Recifes de Coral",
    description: "Palestra educativa sobre a importância e os desafios da preservação dos recifes de coral em Fernando de Noronha. Apresentada por especialistas em biologia marinha do ICMBio, esta palestra abordará o ecossistema único dos recifes de coral que circundam o arquipélago, sua importância para a biodiversidade marinha e os crescentes desafios que enfrentam, incluindo mudanças climáticas, acidificação dos oceanos e pressão turística. Os palestrantes compartilharão os resultados de pesquisas recentes conduzidas na região e discutirão estratégias de conservação que estão sendo implementadas para proteger estes frágeis ecossistemas. A entrada é gratuita, mas os lugares são limitados, por isso é recomendável chegar cedo para garantir um assento.",
    image_url: "/tour-diving.jpg",
    date: "2024-07-18",
    start_time: "19:00",
    end_time: "21:00",
    location: "Centro de Visitantes do ICMBio",
    price: 0.00,
    category: "Educação Ambiental",
    capacity: 80,
    available_spots: 35,
    status: "scheduled",
    organizer: "ICMBio - Fernando de Noronha"
  }
];

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  
  // Find the event by ID
  const event = events.find(e => e.id === Number(id));
  
  // If event not found, show error
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Evento não encontrado</h1>
          <p className="mb-6">O evento que você está procurando não existe.</p>
          <Button onClick={() => navigate("/eventos")}>Voltar para Eventos</Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Find related events (same category, excluding current event)
  const relatedEvents = events.filter(e => e.category === event.category && e.id !== event.id).slice(0, 3);

  // Handle quantity changes
  const incrementQuantity = () => {
    if (ticketQuantity < event.available_spots) {
      setTicketQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    setTicketQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  // Calculate total price
  const totalPrice = event.price * ticketQuantity;
  
  // Format date
  const eventDate = new Date(event.date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/eventos" className="flex items-center text-tuca-ocean-blue hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para eventos
            </Link>
          </div>
          
          {/* Event Hero */}
          <div className="relative h-[40vh] md:h-[50vh] rounded-xl overflow-hidden mb-8">
            <img 
              src={event.image_url} 
              alt={event.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 md:p-10 text-white">
                <div className="inline-block px-3 py-1 bg-tuca-green/80 rounded text-white text-sm mb-4">
                  {event.category}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.name}</h1>
                <div className="flex flex-wrap gap-4 text-white/90">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span>{eventDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.start_time} - {event.end_time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Event Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Detalhes do Evento</h2>
                <p className="text-gray-700 whitespace-pre-line mb-6">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <CalendarCheck className="h-5 w-5 mr-2 text-tuca-ocean-blue" />
                      Informações do Evento
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium">Data:</span> {eventDate}</li>
                      <li><span className="font-medium">Horário:</span> {event.start_time} - {event.end_time}</li>
                      <li><span className="font-medium">Local:</span> {event.location}</li>
                      <li><span className="font-medium">Categoria:</span> {event.category}</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Info className="h-5 w-5 mr-2 text-tuca-ocean-blue" />
                      Organizador
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium">Nome:</span> {event.organizer}</li>
                      <li><span className="font-medium">Capacidade:</span> {event.capacity} pessoas</li>
                      <li><span className="font-medium">Vagas disponíveis:</span> {event.available_spots}</li>
                      <li><span className="font-medium">Status:</span> {
                        event.status === 'scheduled' ? 'Agendado' :
                        event.status === 'ongoing' ? 'Em andamento' :
                        event.status === 'completed' ? 'Finalizado' : 'Cancelado'
                      }</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-start">
                  <Button 
                    variant="outline"
                    className="flex items-center border-tuca-ocean-blue text-tuca-ocean-blue hover:bg-tuca-ocean-blue hover:text-white"
                    onClick={() => {
                      // Share functionality would go here
                      alert("Compartilhar evento: " + event.name);
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar Evento
                  </Button>
                </div>
              </div>
              
              {/* Location Map (placeholder) */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Localização</h2>
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-gray-400 mr-2" />
                  <span className="text-gray-500">Mapa de {event.location}</span>
                </div>
              </div>
            </div>
            
            {/* Reservation Card */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Reservar Ingressos</h2>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Preço por ingresso:</span>
                    <span className="font-medium">
                      {event.price > 0 ? `R$ ${event.price.toFixed(2).replace('.', ',')}` : 'Gratuito'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Vagas disponíveis:</span>
                    <span className="font-medium">{event.available_spots} de {event.capacity}</span>
                  </div>
                  
                  <div className="border-t border-b py-4 mb-4">
                    <label className="block text-gray-700 mb-2">Quantidade de ingressos:</label>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={decrementQuantity}
                        disabled={ticketQuantity <= 1}
                        className="h-8 w-8"
                      >
                        -
                      </Button>
                      <span className="mx-4 text-lg">{ticketQuantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={incrementQuantity}
                        disabled={ticketQuantity >= event.available_spots}
                        className="h-8 w-8"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-lg font-bold text-tuca-ocean-blue">
                      {event.price > 0 ? `R$ ${totalPrice.toFixed(2).replace('.', ',')}` : 'Gratuito'}
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full py-6 bg-tuca-coral hover:bg-tuca-coral/90"
                    disabled={event.available_spots === 0 || event.status === 'completed' || event.status === 'canceled'}
                    onClick={() => {
                      // Reservation functionality would go here
                      alert(`Reserva de ${ticketQuantity} ${ticketQuantity > 1 ? 'ingressos' : 'ingresso'} para o evento: ${event.name}`);
                    }}
                  >
                    {event.price > 0 ? 'Reservar Agora' : 'Garantir Vaga'}
                  </Button>
                </div>
                
                {event.available_spots === 0 && (
                  <div className="bg-red-50 text-red-600 p-4 rounded text-center">
                    Este evento está com vagas esgotadas.
                  </div>
                )}
                
                {event.status === 'completed' && (
                  <div className="bg-gray-50 text-gray-600 p-4 rounded text-center">
                    Este evento já foi realizado.
                  </div>
                )}
                
                {event.status === 'canceled' && (
                  <div className="bg-red-50 text-red-600 p-4 rounded text-center">
                    Este evento foi cancelado.
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-8">Eventos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map(relEvent => (
                  <div
                    key={relEvent.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => navigate(`/eventos/${relEvent.id}`)}
                  >
                    <div className="relative h-48">
                      <img
                        src={relEvent.image_url}
                        alt={relEvent.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-tuca-green/80 text-white text-xs px-2 py-1 rounded">
                        {relEvent.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2">{relEvent.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(relEvent.date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long'
                          })}
                        </span>
                      </div>
                      <div className="text-tuca-ocean-blue font-bold">
                        {relEvent.price > 0 ? `R$ ${relEvent.price.toFixed(2).replace('.', ',')}` : 'Gratuito'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
