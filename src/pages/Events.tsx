
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Filter, CalendarDays, MapPin, Clock, Users } from "lucide-react";
import { Event } from "@/types/event";
import { formatDate } from "@/lib/utils";

// Sample events data
const events: Event[] = [
  {
    id: 1,
    name: "Festival de Gastronomia e Cultura",
    description: "Um festival com os melhores pratos da culinária local de Fernando de Noronha, apresentações culturais e música ao vivo.",
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
    description: "Corrida de 10km pelas trilhas e praias do arquipélago, promovendo conscientização ambiental e bem-estar.",
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
    description: "Aprenda técnicas de fotografia submarina com profissionais experientes em um dos locais com maior biodiversidade marinha do Brasil.",
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
    description: "Evento especial para observação da desova de tartarugas marinhas com biólogos especializados.",
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
    description: "Sessão de yoga ao pôr do sol em uma das mais belas praias do arquipélago.",
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
    description: "Palestra educativa sobre a importância e os desafios da preservação dos recifes de coral em Fernando de Noronha.",
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

// Available event categories
const categories = ["Todas", "Gastronomia", "Esporte", "Workshop", "Ecoturismo", "Bem-estar", "Educação Ambiental"];

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter events by category and search query
  const filteredEvents = events.filter(event => {
    const matchesCategory = activeCategory === "Todas" || event.category === activeCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative">
          <div 
            className="h-[40vh] bg-cover bg-center"
            style={{ backgroundImage: "url('/tour-sunset.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Eventos em Noronha</h1>
                <p className="text-xl max-w-2xl mx-auto">
                  Descubra experiências únicas e memoráveis no paraíso
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Events Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  className="pl-10 pr-4 py-2 border rounded-full w-full md:w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === activeCategory ? "default" : "outline"}
                    className={
                      category === activeCategory
                        ? "rounded-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white"
                        : "rounded-full text-foreground hover:bg-background hover:text-tuca-ocean-blue"
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover-scale"
                  onClick={() => navigate(`/eventos/${event.id}`)}
                >
                  <div className="relative h-56">
                    <img
                      src={event.image_url}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                    {event.featured && (
                      <div className="absolute top-3 right-3 bg-tuca-coral/90 text-white text-xs px-2 py-1 rounded">
                        Destaque
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-tuca-green/80 text-white text-xs px-2 py-1 rounded">
                      {event.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-serif font-bold text-lg mb-2">{event.name}</h3>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(event.date).toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.start_time} - {event.end_time}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Users className="h-4 w-4 mr-1" />
                      <span>
                        {event.available_spots} vagas disponíveis de {event.capacity}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-tuca-deep-blue font-bold">
                        {event.price > 0 ? `R$ ${event.price.toFixed(2).replace('.', ',')}` : 'Gratuito'}
                      </span>
                    </div>
                    
                    <Button 
                      className="w-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/eventos/${event.id}`);
                      }}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredEvents.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium text-gray-700">Nenhum evento encontrado</h3>
                  <p className="text-gray-500">
                    Tente ajustar seus filtros ou buscar por termos diferentes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
