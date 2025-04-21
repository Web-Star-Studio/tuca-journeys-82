import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useForm } from 'react-hook-form';
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/use-profile";
import { BookingFormValues, CouponData } from "@/types/bookingForm";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase';
import { useNavigate } from "react-router-dom";
import { DiscountCoupon } from '@/types/database';
import { useNotifications } from '@/hooks/use-notifications';

export interface BookingFormProps {
  itemId: number;
  itemType: 'tour' | 'accommodation' | 'event' | 'vehicle';
  itemName: string;
  basePrice: number;
  minGuests?: number;
  maxGuests?: number;
  onSuccess?: (bookingId: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  itemId,
  itemType,
  itemName,
  basePrice,
  minGuests = 1,
  maxGuests = 10,
  onSuccess
}) => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { sendBookingNotification } = useNotifications();
  
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [guests, setGuests] = useState(minGuests);
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<CouponData | null>(null);
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);
  
  const defaultValues = {
    contactName: profile?.name || user?.email?.split('@')[0] || '',
    contactEmail: profile?.email || user?.email || '',
    contactPhone: profile?.phone || '',
    specialRequests: '',
    paymentMethod: 'credit_card',
    termsAccepted: false,
  };

  const form = useForm<BookingFormValues>({
    defaultValues,
    mode: "onBlur"
  });
  
  useEffect(() => {
    // Calculate nights/days
    const days = endDate && startDate 
      ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 1;
      
    // Calculate base total
    let calculatedPrice = basePrice;
    
    if (itemType === 'accommodation') {
      calculatedPrice = basePrice * days;
    }
    
    calculatedPrice = calculatedPrice * guests;
    
    // Apply coupon discount if available
    if (appliedCoupon) {
      const discountAmount = (calculatedPrice * appliedCoupon.discountPercentage) / 100;
      calculatedPrice -= discountAmount;
    }
    
    setTotalPrice(calculatedPrice);
  }, [startDate, endDate, guests, basePrice, appliedCoupon, itemType]);
  
  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= minGuests && value <= maxGuests) {
      setGuests(value);
    }
  };

  const verifyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsCheckingCoupon(true);
    
    try {
      // Check discount_coupons table instead of coupons
      const { data, error } = await supabase
        .from('discount_coupons')
        .select('*')
        .eq('code', couponCode.trim())
        .single();
      
      if (error) throw error;
      
      if (!data) {
        toast({
          title: "Cupom não encontrado",
          description: "O código informado não existe.",
          variant: "destructive",
        });
        setAppliedCoupon(null);
        return;
      }
      
      const coupon = data as DiscountCoupon;
      
      // Check if coupon is valid
      const now = new Date();
      const validFrom = new Date(coupon.valid_from);
      const validUntil = new Date(coupon.valid_until);
      
      if (now < validFrom || now > validUntil) {
        toast({
          title: "Cupom expirado",
          description: "Este cupom não é mais válido.",
          variant: "destructive",
        });
        return;
      }
      
      // Apply the coupon
      setAppliedCoupon({
        code: coupon.code,
        discountPercentage: coupon.discount_percentage
      });
      
      toast({
        title: "Cupom aplicado",
        description: `Desconto de ${coupon.discount_percentage}% aplicado.`,
      });
    } catch (error) {
      console.error("Error verifying coupon:", error);
      toast({
        title: "Erro ao verificar cupom",
        description: "Não foi possível verificar o cupom. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingCoupon(false);
    }
  };
  
  const handleSubmit = async (data: BookingFormValues) => {
    if (!user) {
      toast({
        title: "É necessário estar logado",
        description: "Faça login para realizar uma reserva.",
        variant: "destructive",
      });
      return;
    }

    // Validação adicional: nome e e-mail obrigatórios
    if (!data.contactName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, preencha seu nome.",
        variant: "destructive",
      });
      return;
    }
    if (!data.contactEmail.trim() || !data.contactEmail.includes("@")) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, informe um e-mail válido.",
        variant: "destructive",
      });
      return;
    }
    if (!startDate || !endDate) {
      toast({
        title: "Datas obrigatórias",
        description: "Selecione as datas de início e fim.",
        variant: "destructive",
      });
      return;
    }
    if (!data.termsAccepted) {
      toast({
        title: "Termos e condições",
        description: "Você precisa aceitar os termos e condições.",
        variant: "destructive",
      });
      return;
    }
    if (guests < minGuests || guests > maxGuests) {
      toast({
        title: "Número de hóspedes inválido",
        description: `Você deve selecionar entre ${minGuests} e ${maxGuests} pessoas.`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create booking object based on item type
      const bookingData: any = {
        user_id: user.id,
        start_date: format(startDate, 'yyyy-MM-dd'),
        end_date: format(endDate, 'yyyy-MM-dd'),
        guests: guests,
        total_price: totalPrice,
        status: 'confirmed',
        payment_status: 'paid',
        payment_method: data.paymentMethod,
        special_requests: data.specialRequests || null,
      };
      
      // Add the corresponding item ID field based on type
      switch (itemType) {
        case 'tour':
          bookingData.tour_id = itemId;
          break;
        case 'accommodation':
          bookingData.accommodation_id = itemId;
          break;
        case 'event':
          bookingData.event_id = itemId;
          break;
        case 'vehicle':
          bookingData.vehicle_id = itemId;
          break;
      }
      
      // Add coupon if applied
      if (appliedCoupon) {
        bookingData.coupon_code = appliedCoupon.code;
        bookingData.coupon_discount = appliedCoupon.discountPercentage;
      }
      
      // Save booking to database
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Reserva confirmada",
        description: "Sua reserva foi realizada com sucesso!",
      });
      
      // Send notification
      await sendBookingNotification(booking.id.toString(), itemName);
      
      // Call onSuccess callback or redirect
      if (onSuccess) {
        onSuccess(booking.id.toString());
      } else {
        navigate(`/confirmacao?id=${booking.id}`);
      }
    } catch (error: any) {
      console.error("Error creating booking:", error);
      toast({
        title: "Erro ao criar reserva",
        description: error.message || "Não foi possível finalizar sua reserva. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Detalhes da reserva</h2>
      
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6" noValidate>
        {/* Date selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Data de início</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date);
                    if (date && endDate && date > endDate) {
                      setEndDate(addDays(date, 1));
                    }
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">Data de término</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => 
                    date < new Date() || (startDate ? date <= startDate : false)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Guests */}
        <div className="space-y-2">
          <Label htmlFor="guests">Número de pessoas</Label>
          <div className="flex items-center">
            <Button 
              type="button"
              variant="outline" 
              size="icon"
              onClick={() => guests > minGuests && setGuests(guests - 1)}
              disabled={guests <= minGuests}
            >
              -
            </Button>
            <Input 
              id="guests" 
              type="number" 
              min={minGuests} 
              max={maxGuests} 
              value={guests} 
              onChange={handleGuestsChange}
              className="w-20 text-center mx-2"
            />
            <Button 
              type="button"
              variant="outline" 
              size="icon"
              onClick={() => guests < maxGuests && setGuests(guests + 1)}
              disabled={guests >= maxGuests}
            >
              +
            </Button>
          </div>
        </div>
        
        {/* Contact information */}
        <div className="space-y-2">
          <h3 className="font-medium">Informações de contato</h3>
          
          <div className="space-y-2">
            <Label htmlFor="contactName">Nome</Label>
            <Input 
              id="contactName" 
              {...form.register("contactName", { required: "Nome é obrigatório" })} 
            />
            {form.formState.errors.contactName && (
              <p className="text-red-600 text-xs">{form.formState.errors.contactName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Email</Label>
            <Input 
              id="contactEmail" 
              type="email" 
              {...form.register("contactEmail", { 
                required: "Email é obrigatório", 
                pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Email inválido" }
              })} 
            />
            {form.formState.errors.contactEmail && (
              <p className="text-red-600 text-xs">{form.formState.errors.contactEmail.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Telefone</Label>
            <Input 
              id="contactPhone" 
              {...form.register("contactPhone")} 
            />
          </div>
        </div>
        
        {/* Special requests */}
        <div className="space-y-2">
          <Label htmlFor="specialRequests">Pedidos especiais</Label>
          <Textarea 
            id="specialRequests" 
            {...form.register("specialRequests")} 
            placeholder="Algum pedido especial? Informe aqui."
          />
        </div>
        
        {/* Coupon code */}
        <div className="space-y-2">
          <Label htmlFor="couponCode">Cupom de desconto</Label>
          <div className="flex space-x-2">
            <Input 
              id="couponCode" 
              value={couponCode} 
              onChange={(e) => setCouponCode(e.target.value)} 
              className="flex-1"
              disabled={!!appliedCoupon}
            />
            <Button 
              type="button" 
              variant="secondary" 
              onClick={verifyCoupon} 
              disabled={isCheckingCoupon || !couponCode.trim() || !!appliedCoupon}
              className="whitespace-nowrap"
            >
              {isCheckingCoupon ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : appliedCoupon ? "Aplicado" : "Aplicar"}
            </Button>
          </div>
          {appliedCoupon && (
            <p className="text-sm text-green-600">
              Cupom aplicado: {appliedCoupon.discountPercentage}% de desconto
            </p>
          )}
        </div>
        
        {/* Payment method */}
        <div className="space-y-2">
          <Label>Método de pagamento</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 border p-3 rounded">
              <input 
                type="radio" 
                id="credit_card" 
                value="credit_card" 
                {...form.register("paymentMethod")} 
                defaultChecked 
              />
              <Label htmlFor="credit_card" className="cursor-pointer">Cartão de crédito</Label>
            </div>
            
            <div className="flex items-center space-x-2 border p-3 rounded">
              <input 
                type="radio" 
                id="pix" 
                value="pix" 
                {...form.register("paymentMethod")} 
              />
              <Label htmlFor="pix" className="cursor-pointer">PIX</Label>
            </div>
          </div>
        </div>
        
        {/* Booking summary */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-medium mb-2">Resumo da reserva</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Item:</span>
              <span className="font-medium">{itemName}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Período:</span>
              <span>
                {startDate && endDate ? (
                  <>
                    {format(startDate, 'dd/MM/yyyy')} até {format(endDate, 'dd/MM/yyyy')}
                  </>
                ) : 'Selecione as datas'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Pessoas:</span>
              <span>{guests}</span>
            </div>
            
            {appliedCoupon && (
              <div className="flex justify-between text-green-600">
                <span>Desconto:</span>
                <span>{appliedCoupon.discountPercentage}%</span>
              </div>
            )}
            
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Terms and conditions */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="termsAccepted" 
            {...form.register("termsAccepted", { required: true })} 
          />
          <label
            htmlFor="termsAccepted"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Aceito os termos e condições
          </label>
        </div>
        {form.formState.errors.termsAccepted && (
          <p className="text-red-600 text-xs">Aceitar os termos é obrigatório.</p>
        )}
        
        {/* Submit button */}
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            "Finalizar reserva"
          )}
        </Button>
      </form>
    </div>
  );
};
export default BookingForm;
