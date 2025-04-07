
import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { events } from "@/data/events";
import EventBreadcrumb from "@/components/event/detail/EventBreadcrumb";
import EventDetailHeader from "@/components/event/detail/EventDetailHeader";
import EventDetailInfo from "@/components/event/detail/EventDetailInfo";
import EventLocationSection from "@/components/event/detail/EventLocationSection";
import RelatedEvents from "@/components/event/detail/RelatedEvents";
import EventNotFound from "@/components/event/detail/EventNotFound";

const EventDetail = () => {
  const { id } = useParams();
  
  // Find the event by ID
  const event = events.find(e => e.id === Number(id));
  
  // If event not found, show error
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4 text-center">
          <EventNotFound />
        </main>
        <Footer />
      </div>
    );
  }
  
  // Find related events (same category, excluding current event)
  const relatedEvents = events.filter(e => 
    e.category === event.category && e.id !== event.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <EventBreadcrumb />
          
          {/* Event Hero */}
          <EventDetailHeader event={event} />
          
          {/* Event Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="lg:col-span-2">
              <EventDetailInfo event={event} />
            </div>
            
            {/* Location Map */}
            <div>
              <EventLocationSection location={event.location} eventId={event.id} />
            </div>
          </div>
          
          {/* Related Events */}
          <RelatedEvents events={relatedEvents} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
