
import React, { useState, useEffect } from "react";
import { Loader2, Star, UserCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsListProps {
  itemId: string | number;
  itemType: 'tour' | 'accommodation' | 'event' | 'vehicle';
}

const ReviewsList: React.FC<ReviewsListProps> = ({ itemId, itemType }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulação de dados para demonstração
        // Em produção, buscaríamos do Supabase
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Dados simulados para demonstração
        const mockReviews: Review[] = [
          {
            id: "1",
            userId: "user1",
            userName: "Maria Silva",
            rating: 5,
            comment: "Experiência incrível! O passeio superou todas as expectativas. O guia foi muito atencioso e conhecedor da região.",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "2",
            userId: "user2",
            userName: "João Pereira",
            rating: 4,
            comment: "Muito bom, só achei um pouco corrido. Mas a beleza do lugar compensa qualquer contratempo!",
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "3",
            userId: "user3",
            userName: "Ana Carolina",
            rating: 5,
            comment: "Tudo perfeito! Desde o atendimento até a execução do passeio. Recomendo fortemente!",
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          }
        ];
        
        setReviews(mockReviews);
      } catch (err) {
        console.error("Erro ao buscar avaliações:", err);
        setError("Não foi possível carregar as avaliações");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [itemId, itemType]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          Ainda não há avaliações para este {getItemTypeName(itemType)}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map(review => (
        <div key={review.id} className="border-b pb-6 last:border-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UserCircle className="h-10 w-10 text-gray-400 mr-3" />
              <div>
                <h4 className="font-medium">{review.userName}</h4>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${
                        star <= review.rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-300"
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {format(new Date(review.createdAt), "d 'de' MMMM", { locale: ptBR })}
            </span>
          </div>
          <p className="mt-3 text-gray-700">{review.comment}</p>
        </div>
      ))}
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

export default ReviewsList;
