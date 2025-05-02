
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, UserCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Review {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
  user_profiles?: { 
    name: string | null; 
    avatar_url: string | null;
  } | null;
}

interface RestaurantReviewsProps {
  restaurantId: number;
}

const RestaurantReviews: React.FC<RestaurantReviewsProps> = ({ restaurantId }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  // Fetch reviews
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['restaurantReviews', restaurantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          user_profiles:user_id(name, avatar_url)
        `)
        .eq('item_id', restaurantId)
        .eq('item_type', 'restaurant')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      return data as unknown as Review[];
    }
  });

  // Check if user has already reviewed
  const { data: userReview } = useQuery({
    queryKey: ['userRestaurantReview', restaurantId, user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('item_id', restaurantId)
        .eq('item_type', 'restaurant')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Submit review mutation
  const submitReviewMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User must be logged in');
      if (rating === 0) throw new Error('Please select a rating');
      
      const reviewData = {
        item_id: restaurantId,
        item_type: 'restaurant',
        user_id: user.id,
        rating,
        comment: comment.trim() || null
      };
      
      const { data, error } = await supabase
        .from('reviews')
        .insert([reviewData])
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurantReviews', restaurantId] });
      queryClient.invalidateQueries({ queryKey: ['userRestaurantReview', restaurantId, user?.id] });
      queryClient.invalidateQueries({ queryKey: ['restaurant', restaurantId] });
      setRating(0);
      setComment('');
      toast.success('Review submitted successfully!');
    },
    onError: (error) => {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    submitReviewMutation.mutate();
  };

  const renderStars = (count: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        onClick={interactive ? () => setRating(i + 1) : undefined}
        style={interactive ? { cursor: 'pointer' } : undefined}
      />
    ));
  };

  const hasReviewed = !!userReview;

  if (isLoading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Reviews</h2>
      
      {/* Review Form */}
      {user && !hasReviewed ? (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(rating, true)}
                </div>
                <Textarea
                  placeholder="Share your experience at this restaurant..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-24"
                />
              </div>
              <Button 
                type="submit" 
                disabled={rating === 0 || submitReviewMutation.isPending}
              >
                {submitReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        user && hasReviewed && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm">
              You've already reviewed this restaurant. Thank you for your feedback!
            </p>
          </div>
        )
      )}
      
      {/* Reviews List */}
      <div className="space-y-4">
        {(!reviews || reviews.length === 0) ? (
          <div className="text-center py-6 bg-muted/20 rounded-lg">
            <p>No reviews yet. Be the first to review this restaurant!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={review.user_profiles?.avatar_url || undefined} 
                      alt="Reviewer avatar" 
                    />
                    <AvatarFallback>
                      <UserCircle2 className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">
                        {review.user_profiles?.name || 'Anonymous'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(review.created_at), 'MMM d, yyyy')}
                      </div>
                    </div>
                    
                    <div className="flex mb-2">
                      {renderStars(review.rating)}
                    </div>
                    
                    {review.comment && (
                      <p className="text-sm">{review.comment}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantReviews;
