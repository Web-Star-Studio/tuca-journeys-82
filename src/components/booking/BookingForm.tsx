
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("2");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [accommodationType, setAccommodationType] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!name || !email || !phone || !checkIn || !checkOut || !accommodationType) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Reserva Enviada!",
        description: "Entraremos em contato em breve para confirmar sua reserva.",
      });
      setIsSubmitting(false);
      
      // Store booking data in localStorage for demo purposes
      const bookingData = {
        name,
        email,
        phone,
        guests,
        checkIn,
        checkOut,
        accommodationType,
        notes,
        bookingId: `TN-${Math.floor(Math.random() * 10000)}`,
        status: "Pendente",
        createdAt: new Date().toISOString(),
      };
      
      const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      localStorage.setItem("bookings", JSON.stringify([...existingBookings, bookingData]));
      
      // Redirect to confirmation page
      navigate("/reserva-confirmada", { state: { booking: bookingData } });
    }, 1500);
  };

  return (
    <Card className="p-6 md:p-8 shadow-md">
      <h2 className="text-2xl font-medium mb-6">Faça sua Reserva</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Seu nome completo"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="seu@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="(00) 00000-0000"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Label htmlFor="guests">Hóspedes</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger id="guests">
                  <SelectValue placeholder="Número de pessoas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 pessoa</SelectItem>
                  <SelectItem value="2">2 pessoas</SelectItem>
                  <SelectItem value="3">3 pessoas</SelectItem>
                  <SelectItem value="4">4 pessoas</SelectItem>
                  <SelectItem value="5">5 pessoas</SelectItem>
                  <SelectItem value="6">6 pessoas</SelectItem>
                  <SelectItem value="7+">7+ pessoas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? (
                      format(checkIn, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? (
                      format(checkOut, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    initialFocus
                    disabled={(date) => !checkIn || date <= checkIn}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div>
            <Label htmlFor="accommodationType">Tipo de Hospedagem</Label>
            <Select value={accommodationType} onValueChange={setAccommodationType}>
              <SelectTrigger id="accommodationType">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pousada">Pousada</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="chalé">Chalé</SelectItem>
                <SelectItem value="camping">Camping</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="notes">Observações</Label>
            <Textarea 
              id="notes" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="Alguma solicitação especial?"
              rows={4}
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processando..." : "Enviar Solicitação de Reserva"}
        </Button>
        
        <p className="text-sm text-muted-foreground text-center mt-4">
          Ao enviar este formulário, você concorda com nossos termos e condições.
        </p>
      </form>
    </Card>
  );
};

export default BookingForm;
