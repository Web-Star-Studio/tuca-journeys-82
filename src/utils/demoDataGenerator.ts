import { Booking } from "@/types/bookings";

export function generateDemoTours() {
  return [
    {
      id: 1,
      title: "Passeio de Barco ao Pôr do Sol",
      description: "Desfrute de um belíssimo passeio de barco ao pôr do sol, com música e petiscos.",
      short_description: "Passeio de barco ao pôr do sol",
      duration: "2 horas",
      price: 120,
      image_url: "/tour-sunset.jpg",
      location: "Praia da Conceição",
      meeting_point: "Trapiche da Praia da Conceição",
      is_available: true,
      category: "Passeios",
      max_participants: 10,
      min_participants: 2,
      difficulty: "Fácil",
      rating: 4.8,
      schedule: ["16:00 - 18:00"],
      includes: ["Passeio de barco", "Música ao vivo", "Petiscos", "Bebidas"],
      excludes: ["Transporte até o trapiche"],
      notes: ["Levar protetor solar e óculos de sol"],
      gallery_images: ["/tour-sunset-1.jpg", "/tour-sunset-2.jpg"]
    },
    {
      id: 2,
      title: "Mergulho com Tartarugas",
      description: "Mergulhe nas águas cristalinas de Fernando de Noronha e observe as tartarugas marinhas em seu habitat natural.",
      short_description: "Mergulho com tartarugas marinhas",
      duration: "3 horas",
      price: 150,
      image_url: "/tour-diving.jpg",
      location: "Baía do Sancho",
      meeting_point: "Centro de Mergulho da Baía do Sancho",
      is_available: true,
      category: "Mergulho",
      max_participants: 6,
      min_participants: 1,
      difficulty: "Médio",
      rating: 4.9,
      schedule: ["09:00 - 12:00"],
      includes: ["Equipamento de mergulho", "Instrutor", "Passeio de barco"],
      excludes: ["Taxa de acesso à Baía do Sancho"],
      notes: ["Levar roupa de banho e toalha"],
      gallery_images: ["/tour-diving-1.jpg", "/tour-diving-2.jpg"]
    },
    {
      id: 3,
      title: "Trilha Ecológica",
      description: "Explore a natureza exuberante de Fernando de Noronha em uma trilha ecológica guiada.",
      short_description: "Trilha ecológica guiada",
      duration: "4 horas",
      price: 80,
      image_url: "/tour-trail.jpg",
      location: "Parque Nacional Marinho",
      meeting_point: "Entrada do Parque Nacional Marinho",
      is_available: true,
      category: "Trilhas",
      max_participants: 8,
      min_participants: 2,
      difficulty: "Difícil",
      rating: 4.7,
      schedule: ["08:00 - 12:00"],
      includes: ["Guia", "Entrada no parque", "Água"],
      excludes: ["Transporte até a entrada do parque"],
      notes: ["Levar calçado de trilha e repelente"],
      gallery_images: ["/tour-trail-1.jpg", "/tour-trail-2.jpg"]
    }
  ];
}

export function generateDemoAccommodations() {
  return [
    {
      id: 1,
      title: "Pousada Vista Mar",
      description: "Aconchegante pousada com vista para o mar, perfeita para relaxar e desfrutar da natureza.",
      short_description: "Pousada com vista para o mar",
      price_per_night: 400,
      image_url: "/accommodation-1.jpg",
      location: "Praia do Boldró",
      address: "Rua da Pousada, 123",
      is_available: true,
      category: "Pousadas",
      type: "Pousada",
      bedrooms: 2,
      bathrooms: 1,
      max_guests: 4,
      amenities: ["Wi-Fi", "Ar condicionado", "Café da manhã", "Piscina"],
      gallery_images: ["/accommodation-1-1.jpg", "/accommodation-1-2.jpg"],
      rating: 4.5
    },
    {
      id: 2,
      title: "Hotel Paraíso",
      description: "Hotel de luxo com todas as comodidades para uma estadia inesquecível.",
      short_description: "Hotel de luxo",
      price_per_night: 800,
      image_url: "/accommodation-2.jpg",
      location: "Praia do Sancho",
      address: "Avenida do Hotel, 456",
      is_available: true,
      category: "Hotéis",
      type: "Hotel",
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 6,
      amenities: ["Wi-Fi", "Ar condicionado", "Café da manhã", "Piscina", "Restaurante"],
      gallery_images: ["/accommodation-2-1.jpg", "/accommodation-2-2.jpg"],
      rating: 4.8
    }
  ];
}

export function generateDemoBookings(userId: string): Booking[] {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);
  
  return [
    {
      id: "booking-1",
      user_id: userId,
      user_name: "Demo User",
      user_email: "demo@example.com",
      tour_id: 1,
      accommodation_id: null,
      event_id: null,
      vehicle_id: null,
      item_type: "tour",
      item_name: "Passeio de Barco ao Pôr do Sol",
      start_date: tomorrow.toISOString(),
      end_date: tomorrow.toISOString(),
      guests: 2,
      total_price: 240,
      status: "confirmed",
      payment_status: "paid",
      created_at: yesterday.toISOString(),
      updated_at: yesterday.toISOString(),
      payment_method: "credit_card",
      special_requests: null
    },
    {
      id: "booking-2",
      user_id: userId,
      user_name: "Demo User",
      user_email: "demo@example.com",
      tour_id: null,
      accommodation_id: 1,
      event_id: null,
      vehicle_id: null,
      item_type: "accommodation",
      item_name: "Pousada Vista Mar",
      start_date: nextWeek.toISOString(),
      end_date: new Date(nextWeek.getTime() + 86400000 * 3).toISOString(),
      guests: 2,
      total_price: 1200,
      status: "confirmed",
      payment_status: "paid",
      created_at: yesterday.toISOString(),
      updated_at: yesterday.toISOString(),
      payment_method: "credit_card",
      special_requests: "Quarto com vista para o mar, por favor."
    },
    {
      id: "booking-3",
      user_id: userId,
      user_name: "Demo User",
      user_email: "demo@example.com",
      tour_id: 2,
      accommodation_id: null,
      event_id: null,
      vehicle_id: null,
      item_type: "tour",
      item_name: "Mergulho com Tartarugas",
      start_date: lastWeek.toISOString(),
      end_date: lastWeek.toISOString(),
      guests: 1,
      total_price: 150,
      status: "confirmed",
      payment_status: "paid",
      created_at: new Date(lastWeek.getTime() - 86400000 * 2).toISOString(),
      updated_at: new Date(lastWeek.getTime() - 86400000 * 2).toISOString(),
      payment_method: "credit_card",
      special_requests: null
    },
    {
      id: "booking-4",
      user_id: userId,
      user_name: "Demo User",
      user_email: "demo@example.com",
      tour_id: null,
      accommodation_id: null,
      event_id: 1,
      vehicle_id: null,
      item_type: "event",
      item_name: "Festival de Música",
      start_date: nextMonth.toISOString(),
      end_date: nextMonth.toISOString(),
      guests: 2,
      total_price: 300,
      status: "pending",
      payment_status: "pending",
      created_at: today.toISOString(),
      updated_at: today.toISOString(),
      payment_method: "bank_transfer",
      special_requests: null
    },
    {
      id: "booking-5",
      user_id: userId,
      user_name: "Demo User",
      user_email: "demo@example.com",
      tour_id: 3,
      accommodation_id: null,
      event_id: null,
      vehicle_id: null,
      item_type: "tour",
      item_name: "Trilha Ecológica",
      start_date: tomorrow.toISOString(),
      end_date: tomorrow.toISOString(),
      guests: 4,
      total_price: 320,
      status: "confirmed",
      payment_status: "paid",
      created_at: yesterday.toISOString(),
      updated_at: yesterday.toISOString(),
      payment_method: "credit_card",
      special_requests: null
    }
  ];
}
