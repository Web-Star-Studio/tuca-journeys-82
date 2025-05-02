
import React, { useState } from 'react';
import { useUserReservations } from '@/hooks/use-restaurant-booking';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format, isPast } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';

const UserReservations: React.FC = () => {
  const { user } = useAuth();
  const { userReservations, isLoading, cancelReservation } = useUserReservations();
  const [cancelReservationId, setCancelReservationId] = useState<number | null>(null);

  if (!user) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">My Reservations</h1>
          <p className="mb-4">Please sign in to view your reservations.</p>
          <Button asChild>
            <a href="/login?redirect=/minhas-reservas">Sign In</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleCancelReservation = (id: number) => {
    setCancelReservationId(id);
  };

  const confirmCancelReservation = () => {
    if (cancelReservationId) {
      cancelReservation(cancelReservationId);
      setCancelReservationId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'no_show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Reservations</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Skeleton className="h-20 w-20 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : userReservations && userReservations.length > 0 ? (
        <div className="space-y-4">
          {userReservations.map(reservation => {
            const isPastReservation = isPast(new Date(`${reservation.reservation_date}T${reservation.reservation_time}`));
            const canCancel = !isPastReservation && reservation.status === 'confirmed';
            
            return (
              <Card key={reservation.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {reservation.restaurants && (
                      <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden">
                        <img
                          src={reservation.restaurants.image_url}
                          alt={reservation.restaurants.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <h3 className="font-medium">
                            {reservation.restaurants?.name || 'Restaurant'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {reservation.restaurants?.location || 'Location not available'}
                          </p>
                        </div>
                        
                        <Badge className={getStatusColor(reservation.status)}>
                          {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">
                            {format(new Date(reservation.reservation_date), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">{reservation.reservation_time}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">
                            {reservation.guests} {reservation.guests === 1 ? 'guest' : 'guests'}
                          </span>
                        </div>
                      </div>
                      
                      {isPastReservation && reservation.status === 'confirmed' && (
                        <div className="flex items-center mt-2 text-amber-600">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm">This reservation date has passed</span>
                        </div>
                      )}
                      
                      {canCancel && (
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelReservation(reservation.id)}
                          >
                            Cancel Reservation
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <p className="text-lg mb-2">You don't have any reservations yet.</p>
          <p className="text-muted-foreground mb-4">Explore restaurants and book a table!</p>
          <Button asChild>
            <a href="/restaurantes">Browse Restaurants</a>
          </Button>
        </div>
      )}
      
      {/* Cancel Reservation Dialog */}
      <AlertDialog 
        open={cancelReservationId !== null} 
        onOpenChange={() => setCancelReservationId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this reservation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Reservation</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmCancelReservation}
            >
              Yes, Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserReservations;
