import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Loader2, CreditCard, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BookingFormValues, CouponData } from "@/types/bookingForm";
import { supabase } from "@/lib/supabase";

interface BookingFormProps {
  itemId: number;
  itemType: 'tour' | 'accommodation' | 'event' | 'vehicle';
  itemName: string;
  basePrice: number;
  minGuests?: number;
  maxGuests?: number;
  startDate?: Date;
  endDate?: Date;
  onSuccess?: (bookingId: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  itemId,
  itemType,
  itemName,
  basePrice,
  minGuests = 1,
  maxGuests = 10,
  startDate: initialStartDate,
  endDate: initialEndDate,
  onSuccess
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponData | null>(null);
  const [isCouponValid, setIsCouponValid] = useState<boolean | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  
  // Calculate price with guests and duration
  const [totalPrice, setTotalPrice] = useState(basePrice);
  
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<BookingFormValues>({
    defaultValues: {
      startDate: initialStartDate || new Date(),
      endDate: initialEndDate || new Date(),
      guests: minGuests,
      specialRequests: "",
      contactName: user?.user_metadata?.name || "",
      contactEmail: user?.email || "",
      contactPhone: "",
      paymentMethod: 'credit_card',
      couponCode: "",
      termsAccepted: false,
    }
  });
  
  // Watch values for real-time updates
  const watchGuests = watch("guests");
  const watchStartDate = watch("startDate");
  const watchEndDate = watch("endDate");
  const watchCouponCode = watch("couponCode");
  
  // Update total price when inputs change
  React.useEffect(() => {
    if (typeof watchGuests !== 'number') return;
    
    const startDate = typeof watchStartDate === 'string' 
      ? new Date(watchStartDate) 
      : watchStartDate;
      
    const endDate = typeof watchEndDate === 'string' 
      ? new Date(watchEndDate) 
      : watchEndDate;
    
    let daysDifference = 1;
    if (itemType === 'accommodation' || itemType === 'vehicle') {
      // Calculate days difference for accommodations and vehicle rentals
      const diffTime = endDate.getTime() - startDate.getTime();
      daysDifference = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      daysDifference = Math.max(1, daysDifference); // At least 1 day
    }
    
    // Calculate base price
    let price = basePrice * watchGuests * daysDifference;
    
    // Apply coupon discount if valid
    if (appliedCoupon) {
      const discountAmount = price * (appliedCoupon.discountPercentage / 100);
      price = price - discountAmount;
    }
    
    setTotalPrice(price);
  }, [watchGuests, watchStartDate, watchEndDate, basePrice, itemType, appliedCoupon]);
  
  // Function to validate coupon
  const validateCoupon = async (couponCode: string) => {
    if (!couponCode.trim()) {
      return;
    }
    
    setCouponError(null);
    setIsValidatingCoupon(true);
    setIsCouponValid(null);
    
    try {
      // Demo coupon validation logic
      if (couponCode.toUpperCase() === 'DEMO10') {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        setAppliedCoupon({ code: 'DEMO10', discountPercentage: 10 });
        setIsCouponValid(true);
        
        toast({
          title: "Cupom aplicado",
          description: "Desconto de 10% aplicado com sucesso!",
        });
        return;
      }
      
      if (couponCode.toUpperCase() === 'NORONHA20') {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        setAppliedCoupon({ code: 'NORONHA20', discountPercentage: 20 });
        setIsCouponValid(true);
        
        toast({
          title: "Cupom aplicado",
          description: "Desconto de 20% aplicado com sucesso!",
        });
        return;
      }
      
      // For real implementation, check Supabase
      if (!user?.id.startsWith('demo-')) {
        const { data, error } = await supabase
          .from('discount_coupons')
          .select('*')
          .eq('code', couponCode.toUpperCase())
          .single();
        
      if (error) {
        throw new Error('Cupom inválido ou expirado');
      }
      
      if (data) {
        setAppliedCoupon({
          code: data.code,
          discountPercentage: data.discount_percentage
        });
        setIsCouponValid(true);
        
        toast({
          title: "Cupom aplicado",
          description: `Desconto de ${data.discount_percentage}% aplicado com sucesso!`,
        });
        return;
      }
    }
    
    // If we got here, coupon is invalid
    setIsCouponValid(false);
    setCouponError('Cupom inválido ou expirado');
    setAppliedCoupon(null);
  } catch (error) {
    setIsCouponValid(false);
    setCouponError('Erro ao validar cupom');
    setAppliedCoupon(null);
  } finally {
    setIsValidatingCoupon(false);
  }
};
  
  const onSubmit = async (data: BookingFormValues) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para fazer uma reserva.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Transform the data for the reservation
      const bookingData = {
        user_id: user.id,
        [`${itemType}_id`]: itemId,
        start_date: typeof data.startDate === 'string' 
          ? data.startDate 
          : data.startDate.toISOString(),
        end_date: typeof data.endDate === 'string' 
          ? data.endDate 
          : data.endDate.toISOString(),
        guests: data.guests,
        special_requests: data.specialRequests,
        total_price: totalPrice,
        status: 'pending',
        payment_status: 'pending',
        payment_method: data.paymentMethod,
        coupon_code: appliedCoupon?.code || null,
        coupon_discount: appliedCoupon ? appliedCoupon.discountPercentage : null
      };
      
      // For demo implementation, simulate success
      if (user.id.startsWith('demo-')) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockBookingId = `booking-${Date.now()}`;
        
        toast({
          title: "Reserva realizada com sucesso!",
          description: "Você receberá um email com os detalhes da sua reserva.",
        });
        
        if (onSuccess) {
          onSuccess(mockBookingId);
        }
        
        return;
      }
      
      // For real implementation, save to Supabase
      const { data: bookingResult, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Reserva realizada com sucesso!",
        description: "Você receberá um email com os detalhes da sua reserva.",
      });
      
      if (onSuccess && bookingResult) {
        onSuccess(String(bookingResult.id));
      }
    } catch (error: any) {
      console.error('Error creating booking:', error);
      toast({
        title: "Erro ao fazer reserva",
        description: error.message || "Não foi possível concluir sua reserva. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Reservar {itemName}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">Data de início</label>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: "Data de início é obrigatória" }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          errors.startDate ? "border-red-500" : ""
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          typeof field.value === 'string' ? 
                            format(new Date(field.value), "PPP", { locale: ptBR }) :
                            format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          typeof field.value === 'string' ? 
                            new Date(field.value) : field.value
                        }
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">{errors.startDate.message}</p>
              )}
            </div>
            
            {(itemType === 'accommodation' || itemType === 'vehicle') && (
              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium">Data de término</label>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: "Data de término é obrigatória" }}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            errors.endDate ? "border-red-500" : ""
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            typeof field.value === 'string' ? 
                              format(new Date(field.value), "PPP", { locale: ptBR }) :
                              format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={
                            typeof field.value === 'string' ? 
                              new Date(field.value) : field.value
                          }
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const startDate = typeof watchStartDate === 'string' 
                              ? new Date(watchStartDate) 
                              : watchStartDate;
                            return date < startDate;
                          }}
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500">{errors.endDate.message}</p>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="guests" className="text-sm font-medium">
                Número de pessoas
              </label>
              <Input
                type="number"
                min={minGuests}
                max={maxGuests}
                {...register("guests", {
                  required: "Número de pessoas é obrigatório",
                  min: {
                    value: minGuests,
                    message: `Mínimo de ${minGuests} pessoas`
                  },
                  max: {
                    value: maxGuests,
                    message: `Máximo de ${maxGuests} pessoas`
                  },
                  valueAsNumber: true
                })}
                className={errors.guests ? "border-red-500" : ""}
              />
              {errors.guests && (
                <p className="text-sm text-red-500">{errors.guests.message}</p>
              )}
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="specialRequests" className="text-sm font-medium">
                Pedidos especiais (opcional)
              </label>
              <Textarea
                {...register("specialRequests")}
                placeholder="Ex: Preferência por quarto com vista para o mar, restrições alimentares, etc."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contactName" className="text-sm font-medium">
                Nome completo
              </label>
              <Input
                {...register("contactName", {
                  required: "Nome é obrigatório"
                })}
                className={errors.contactName ? "border-red-500" : ""}
              />
              {errors.contactName && (
                <p className="text-sm text-red-500">{errors.contactName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contactEmail" className="text-sm font-medium">
                Email
              </label>
              <Input
                type="email"
                {...register("contactEmail", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido"
                  }
                })}
                className={errors.contactEmail ? "border-red-500" : ""}
              />
              {errors.contactEmail && (
                <p className="text-sm text-red-500">{errors.contactEmail.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contactPhone" className="text-sm font-medium">
                Telefone
              </label>
              <Input
                type="tel"
                {...register("contactPhone", {
                  required: "Telefone é obrigatório"
                })}
                placeholder="(99) 99999-9999"
                className={errors.contactPhone ? "border-red-500" : ""}
              />
              {errors.contactPhone && (
                <p className="text-sm text-red-500">{errors.contactPhone.message}</p>
              )}
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Forma de pagamento</label>
              <div className="grid grid-cols-2 gap-2">
                <label
                  className={`border rounded-md p-3 flex items-center gap-2 cursor-pointer ${
                    watch('paymentMethod') === 'credit_card' 
                      ? 'border-tuca-ocean-blue bg-tuca-ocean-blue/10' 
                      : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    value="credit_card"
                    className="sr-only"
                    {...register("paymentMethod", { required: true })}
                  />
                  <CreditCard className="h-4 w-4" />
                  <span>Cartão de Crédito</span>
                </label>
                
                <label
                  className={`border rounded-md p-3 flex items-center gap-2 cursor-pointer ${
                    watch('paymentMethod') === 'pix' 
                      ? 'border-tuca-ocean-blue bg-tuca-ocean-blue/10' 
                      : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    value="pix"
                    className="sr-only"
                    {...register("paymentMethod", { required: true })}
                  />
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 9L18 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Pix</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="couponCode" className="text-sm font-medium flex justify-between">
                <span>Cupom de desconto (opcional)</span>
                {isCouponValid !== null && (
                  <span className={`text-xs flex items-center ${isCouponValid ? 'text-green-600' : 'text-red-600'}`}>
                    {isCouponValid ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" /> Válido
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 mr-1" /> Inválido
                      </>
                    )}
                  </span>
                )}
              </label>
              <div className="flex gap-2">
                <Input
                  {...register("couponCode")}
                  placeholder="NORONHA20"
                  className={`${couponError ? 'border-red-500' : ''} ${isCouponValid ? 'border-green-500' : ''}`}
                  disabled={isValidatingCoupon || !!appliedCoupon}
                />
                <Button 
                  type="button" 
                  variant="outline"
                  disabled={!watchCouponCode || isValidatingCoupon || !!appliedCoupon}
                  onClick={() => validateCoupon(watchCouponCode)}
                >
                  {isValidatingCoupon ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : appliedCoupon ? (
                    "Aplicado"
                  ) : (
                    "Aplicar"
                  )}
                </Button>
              </div>
              {couponError && (
                <p className="text-sm text-red-500">{couponError}</p>
              )}
              {appliedCoupon && (
                <p className="text-sm text-green-600">
                  Desconto de {appliedCoupon.discountPercentage}% aplicado!
                </p>
              )}
            </div>
            
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-tuca-ocean-blue focus:ring-tuca-ocean-blue"
                  {...register("termsAccepted", { 
                    required: "Você precisa aceitar os termos e condições" 
                  })}
                />
                <span className="text-sm text-gray-600">
                  Eu li e concordo com os 
                  <a href="/termos" className="text-tuca-ocean-blue hover:underline ml-1">
                    Termos e Condições
                  </a>
                  .
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="text-sm text-red-500 mt-1">{errors.termsAccepted.message}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:justify-between sm:items-center border-t pt-6">
        <div>
          <p className="text-sm text-gray-600">Valor total</p>
          <p className="text-2xl font-semibold">
            R$ {totalPrice.toFixed(2)}
            {appliedCoupon && (
              <span className="text-sm line-through text-gray-400 ml-2">
                R$ {(totalPrice / (1 - appliedCoupon.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </p>
        </div>
        <Button 
          type="submit"
          form="booking-form"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            "Finalizar Reserva"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingForm;
