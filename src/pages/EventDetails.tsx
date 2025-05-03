
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";
import { eventService } from "@/services/event-service";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatters";
import { formatDate } from "@/utils/date";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Heart,
  CheckCircle,
  AlertTriangle,
  InfoIcon,
} from "lucide-react";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      if (!id) throw new Error("Event ID not found");
      return await eventService.getEventById(parseInt(id));
    },
  });

  const handleWishlist = () => {
    if (!event) return;

    if (isInWishlist(event.id, "event")) {
      removeFromWishlist(event.id, "event");
    } else {
      addToWishlist({
        id: event.id,
        type: "event",
        title: event.name,
        image: event.image_url
      });
    }
  };

  const handleBookTickets = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to book tickets for this event",
        variant: "destructive",
      });
      navigate("/login", { state: { from: `/eventos/${id}` } });
      return;
    }

    navigate(`/reservar/evento/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-300 rounded-md mb-4"></div>
            <div className="h-6 w-48 bg-gray-200 rounded-md"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
            <p className="mb-6">The event you're looking for could not be found.</p>
            <Button onClick={() => navigate("/eventos")}>
              Return to Events
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatEventTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isEventInWishlist = isInWishlist(event.id, "event");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <img
            src={event.image_url}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="container mx-auto px-4 py-12 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {event.name}
              </h1>
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  {formatEventTime(event.start_time)} - {formatEventTime(event.end_time)}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  {event.location}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Event Details Column */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                <p className="text-gray-700 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="flex items-center text-tuca-ocean-blue mb-2">
                    <CalendarDays className="h-5 w-5 mr-2" />
                    <h3 className="font-semibold">Date & Time</h3>
                  </div>
                  <p className="text-gray-700">
                    {formatDate(event.date)}
                  </p>
                  <p className="text-gray-700">
                    {formatEventTime(event.start_time)} - {formatEventTime(event.end_time)}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="flex items-center text-tuca-ocean-blue mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <h3 className="font-semibold">Location</h3>
                  </div>
                  <p className="text-gray-700">{event.location}</p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="flex items-center text-tuca-ocean-blue mb-2">
                    <User className="h-5 w-5 mr-2" />
                    <h3 className="font-semibold">Capacity</h3>
                  </div>
                  <p className="text-gray-700">{event.capacity} attendees</p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="flex items-center text-tuca-ocean-blue mb-2">
                    <InfoIcon className="h-5 w-5 mr-2" />
                    <h3 className="font-semibold">Category</h3>
                  </div>
                  <p className="text-gray-700">{event.category}</p>
                </div>
              </div>

              {event.policies && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Event Policies</h2>
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <p className="text-gray-700 whitespace-pre-line">
                      {event.policies}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Booking Column */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <div className="mb-6">
                  <p className="text-2xl font-bold text-tuca-ocean-blue mb-1">
                    {formatCurrency(event.price)}
                  </p>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600">
                      {event.available_spots} spots available
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    onClick={handleBookTickets}
                    className="w-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90"
                    size="lg"
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleWishlist}
                    className="w-full"
                  >
                    <Heart
                      className={`mr-2 h-5 w-5 ${
                        isEventInWishlist ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                    {isEventInWishlist
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"}
                  </Button>
                </div>

                <div className="text-sm text-gray-500">
                  <p className="mb-2">
                    <strong>Organizer:</strong> {event.organizer || "Not specified"}
                  </p>
                  <p>
                    <strong>Booking details:</strong> Tickets must be purchased in
                    advance. No refunds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;
