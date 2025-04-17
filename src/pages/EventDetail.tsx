import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { events } from "@/data/events";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, CalendarDays, Clock, MapPin, Users, Share2, ArrowLeft } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  
  // Find the event by ID
  const event = events.find(e => e.id === Number(id));
  const inWishlist = event ? isInWishlist(event.id) : false;
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleWishlistToggle = () => {
    if (!event) return;
    
    if (inWishlist) {
      removeFromWishlist(event.id);
      toast.success("Evento removido da lista de desejos");
    } else {
      addToWishlist({
        id: event.id,
        name: event.name,
        image: event.image_url,
        type: 'event',
        price: event.price,
        description: event.description.substring(0, 100) + '...'
      });
      toast.success("Evento adicionado à lista de desejos");
    }
  };
  
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.name,
        text: event?.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência");
    }
  };
  
  const handleReserve = () => {
    toast.success(`${quantity} ingressos reservados para ${event?.name}`);
    // In a real app, you would implement checkout logic here
  };
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Evento não encontrado</h1>
            <p className="mb-6 text-gray-600">O evento que você procura não existe ou foi removido.</p>
            <Button onClick={() => navigate('/eventos')}>Ver todos os eventos</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Image */}
        <div className="relative h-[50vh] bg-cover bg-center" 
             style={{ backgroundImage: `url('${event.image_url}')` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          <div className="absolute bottom-0 w-full px-4 py-6">
            <div className="container mx-auto max-w-6xl">
              <button 
                onClick={() => navigate('/eventos')}
                className="flex items-center text-white mb-4 hover:underline"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Voltar para eventos
              </button>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-tuca-green/90">{event.category}</Badge>
                {event.featured && <Badge>Destaque</Badge>}
                <Badge variant="outline" className="bg-white/10">{event.status === 'scheduled' ? 'Agendado' : 'Em andamento'}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-2">
                {event.name}
              </h1>
              
              <p className="text-white/90 text-xl max-w-3xl">
                Organizado por: {event.organizer}
              </p>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <section className="py-10 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Main Content */}
              <div className="flex-grow">
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center">
                      <CalendarDays className="h-6 w-6 mr-2 text-tuca-ocean-blue" />
                      <div>
                        <p className="text-sm text-gray-500">Data</p>
                        <p className="font-medium">
                          {new Date(event.date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-6 w-6 mr-2 text-tuca-ocean-blue" />
                      <div>
                        <p className="text-sm text-gray-500">Horário</p>
                        <p className="font-medium">{event.start_time} - {event.end_time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 mr-2 text-tuca-ocean-blue" />
                      <div>
                        <p className="text-sm text-gray-500">Local</p>
                        <p className="font-medium">{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-6 w-6 mr-2 text-tuca-ocean-blue" />
                      <div>
                        <p className="text-sm text-gray-500">Vagas</p>
                        <p className="font-medium">{event.available_spots} disponíveis de {event.capacity}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-medium mb-4">Sobre este evento</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={handleWishlistToggle}
                    >
                      <Heart className={inWishlist ? "fill-red-500 text-red-500" : ""} size={18} />
                      {inWishlist ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={handleShareClick}
                    >
                      <Share2 size={18} />
                      Compartilhar
                    </Button>
                  </div>
                </div>
                
                {/* Map Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                  <h2 className="text-2xl font-medium mb-4">Localização</h2>
                  <div className="bg-gray-100 h-64 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-gray-500">Mapa de localização</p>
                  </div>
                  <p className="text-gray-600">{event.location}, Fernando de Noronha</p>
                </div>
                
                {/* Organizer Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-medium mb-4">Organizador</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-tuca-light-blue rounded-full flex items-center justify-center mr-4">
                      <span className="font-medium text-tuca-ocean-blue">
                        {event.organizer.split(" ")[0][0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{event.organizer}</p>
                      <p className="text-gray-500 text-sm">Organizador de eventos</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Entre em contato com o organizador para mais informações sobre este evento.
                  </p>
                  <Button variant="outline" className="w-full">Contatar Organizador</Button>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-80">
                <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                  <h2 className="text-2xl font-medium mb-4">Ingressos</h2>
                  
                  <div className="mb-6">
                    <p className="text-xl font-bold mb-2">
                      {event.price > 0 ? `R$ ${event.price.toFixed(2).replace('.', ',')}` : 'Gratuito'}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {event.price > 0 ? 'por pessoa' : 'Evento gratuito, inscrição obrigatória'}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Quantidade</label>
                    <div className="flex items-center mb-4">
                      <button 
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <span className="mx-4 w-10 text-center">{quantity}</span>
                      <button 
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
                        onClick={() => setQuantity(Math.min(event.available_spots, quantity + 1))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>R$ {(event.price * quantity).toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>R$ {(event.price * quantity).toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mb-4" 
                    size="lg"
                    onClick={handleReserve}
                  >
                    Reservar agora
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Ao clicar em "Reservar agora", você concorda com nossos termos de serviço e política de privacidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Events Section */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-medium mb-6">Eventos relacionados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events
                .filter(e => e.category === event.category && e.id !== event.id)
                .slice(0, 3)
                .map(relatedEvent => (
                  <div 
                    key={relatedEvent.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate(`/eventos/${relatedEvent.id}`)}
                  >
                    <img 
                      src={relatedEvent.image_url} 
                      alt={relatedEvent.name} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{relatedEvent.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <CalendarDays className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
                        <span>
                          {new Date(relatedEvent.date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1.5 text-tuca-ocean-blue" />
                        <span>{relatedEvent.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
