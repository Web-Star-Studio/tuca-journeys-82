
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface ReviewFormProps {
  itemId: string | number;
  itemType: 'tour' | 'accommodation' | 'event' | 'vehicle';
  onSuccess?: () => void;
}

interface ReviewFormData {
  comment: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ itemId, itemType, onSuccess }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReviewFormData>();

  const onSubmit = async (data: ReviewFormData) => {
    if (!user) {
      toast.error("Você precisa estar logado para enviar uma avaliação");
      return;
    }
    
    if (rating === 0) {
      toast.error("Por favor, selecione uma classificação");
      return;
    }

    setIsSubmitting(true);

    try {
      // Aqui seria a chamada real para o Supabase
      // Para demonstração, simulamos um atraso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // const { error } = await supabase.from('reviews').insert({
      //   user_id: user.id,
      //   item_id: itemId,
      //   item_type: itemType,
      //   rating: rating,
      //   comment: data.comment,
      // });
      
      // if (error) throw error;
      
      toast.success("Avaliação enviada com sucesso!");
      reset();
      setRating(0);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      toast.error("Não foi possível enviar sua avaliação. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-medium mb-4">Avaliar este {getItemTypeName(itemType)}</h2>
      
      <div className="mb-4">
        <p className="mb-2 text-sm text-gray-700">Sua classificação</p>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-8 w-8 cursor-pointer transition-colors ${
                star <= (hoveredStar || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Textarea
            placeholder="Compartilhe sua experiência..."
            {...register("comment", { 
              required: "Por favor, compartilhe sua experiência" 
            })}
            className={errors.comment ? "border-red-500" : ""}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
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
      </form>
    </div>
  );
};

function getItemTypeName(type: string): string {
  switch (type) {
    case 'tour': return 'passeio';
    case 'accommodation': return 'hospedagem';
    case 'event': return 'evento';
    case 'vehicle': return 'veículo';
    default: return 'serviço';
  }
}

export default ReviewForm;
