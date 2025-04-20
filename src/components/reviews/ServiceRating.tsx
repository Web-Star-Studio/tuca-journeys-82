
import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Star, StarHalf, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface ServiceRatingProps {
  serviceId: number | string;
  serviceType: 'tour' | 'accommodation' | 'event' | 'vehicle';
  serviceName: string;
  bookingId?: string;
  onRatingComplete?: () => void;
}

const ServiceRating: React.FC<ServiceRatingProps> = ({
  serviceId,
  serviceType,
  serviceName,
  bookingId,
  onRatingComplete
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleMouseOver = (index: number) => {
    setHoverRating(index);
  };
  
  const handleMouseLeave = () => {
    setHoverRating(0);
  };
  
  const handleClick = (index: number) => {
    setRating(index);
  };
  
  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para avaliar.",
        variant: "destructive",
      });
      return;
    }
    
    if (rating === 0) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma classificação.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const reviewData = {
        user_id: user.id,
        [`${serviceType}_id`]: serviceId,
        booking_id: bookingId || null,
        rating: rating,
        comment: comment.trim() || null,
        created_at: new Date().toISOString()
      };
      
      // For demo users, simulate success
      if (user.id.startsWith('demo-')) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Avaliação enviada",
          description: "Obrigado pelo seu feedback!",
        });
        
        if (onRatingComplete) {
          onRatingComplete();
        }
        
        return;
      }
      
      // For real users, save to Supabase
      const { error } = await supabase
        .from('reviews')
        .insert([reviewData]);
        
      if (error) throw error;
      
      toast({
        title: "Avaliação enviada",
        description: "Obrigado pelo seu feedback!",
      });
      
      if (onRatingComplete) {
        onRatingComplete();
      }
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast({
        title: "Erro ao enviar avaliação",
        description: error.message || "Não foi possível enviar sua avaliação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-4 bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-medium">Avaliar {serviceName}</h3>
      
      <div className="flex flex-col items-center space-y-2">
        <p className="text-gray-600 text-sm">Toque nas estrelas para avaliar</p>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={handleMouseLeave}
              className="p-1"
            >
              {index <= (hoverRating || rating) ? (
                <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
              ) : (
                <Star className="h-8 w-8 text-gray-300" />
              )}
            </button>
          ))}
        </div>
        <p className="text-sm font-medium mt-1">
          {rating === 1 && "Ruim"}
          {rating === 2 && "Regular"}
          {rating === 3 && "Bom"}
          {rating === 4 && "Muito bom"}
          {rating === 5 && "Excelente"}
        </p>
      </div>
      
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Comentário (opcional)
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Conte-nos sobre sua experiência..."
          rows={4}
        />
      </div>
      
      <Button 
        onClick={handleSubmit} 
        disabled={isSubmitting || rating === 0} 
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar avaliação"
        )}
      </Button>
    </div>
  );
};

export default ServiceRating;
