import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { Accommodation, Tour, Event, Product } from '@/types/database';

// Generate Demo Products
export const generateDemoProducts = async (count: number = 10): Promise<Product[]> => {
  const categories = ['Souvenir', 'Clothing', 'Accessories', 'Food', 'Books'];
  const names = ['Camiseta Noronha', 'Caneca Tubarão', 'Chapéu de Palha', 'Chinelo Ilha', 'Livro Fotografia', 'Colar Concha', 'Eco Bag', 'Protetor Solar', 'Sandália', 'Óculos de Sol'];
  
  const products: Product[] = [];
  
  for (let i = 0; i < count; i++) {
    const product: Product = {
      id: i + 1,
      name: names[i % names.length],
      description: `Descrição detalhada do produto ${i + 1}`,
      price: Math.floor(Math.random() * 200) + 20,
      category: categories[Math.floor(Math.random() * categories.length)],
      image_url: `/product-${(i % 4) + 1}.jpg`,
      stock: Math.floor(Math.random() * 50),
      status: 'active',
      featured: Math.random() > 0.7,
      gallery: [
        `/product-${(i % 4) + 1}.jpg`,
        `/product-${((i + 1) % 4) + 1}.jpg`,
      ],
      created_at: new Date().toISOString()
    };
    
    products.push(product);
  }
  
  // Store in database
  // Note: This is just showing the structure, not actually inserting data
  /*
  const { data, error } = await supabase
    .from('products')
    .insert(products)
    .select();
  
  if (error) {
    console.error('Error generating demo products:', error);
    return [];
  }
  
  return data;
  */
  
  return products;
};

// Generate Demo Accommodations
export const generateDemoAccommodations = async (count: number = 5): Promise<Accommodation[]> => {
  const accommodationTypes = ['Hotel', 'Pousada', 'Resort', 'Apartamento', 'Casa'];
  const amenities = ['Wi-Fi', 'Piscina', 'Ar Condicionado', 'Café da Manhã', 'Estacionamento'];
  
  const accommodations: Accommodation[] = [];
  
  for (let i = 0; i < count; i++) {
    const accommodation: Accommodation = {
      id: i + 1,
      title: `${accommodationTypes[i % accommodationTypes.length]} Demo ${i + 1}`,
      description: `Descrição detalhada da acomodação ${i + 1}`,
      short_description: `Acomodação demo ${i + 1}`,
      price_per_night: Math.floor(Math.random() * 300) + 100,
      image_url: `/accommodation-${(i % 3) + 1}.jpg`,
      gallery_images: [
        `/accommodation-${(i % 3) + 1}.jpg`,
        `/accommodation-${((i + 1) % 3) + 1}.jpg`,
      ],
      address: `Endereço Demo ${i + 1}`,
      amenities: amenities.slice(0, Math.floor(Math.random() * amenities.length) + 1),
      bedrooms: Math.floor(Math.random() * 3) + 1,
      bathrooms: Math.floor(Math.random() * 2) + 1,
      max_guests: Math.floor(Math.random() * 4) + 2,
      rating: Math.floor(Math.random() * 5) + 1,
      type: accommodationTypes[i % accommodationTypes.length],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      location: 'Fernando de Noronha'
    };
    
    accommodations.push(accommodation);
  }
  
  return accommodations;
};

// Generate Demo Tours
export const generateDemoTours = async (count: number = 5): Promise<Tour[]> => {
  const categories = ['Ecoturismo', 'Aventura', 'Relaxamento', 'Cultural', 'Gastronomia'];
  const difficulties = ['Fácil', 'Médio', 'Difícil'];
  
  const tours: Tour[] = [];
  
  for (let i = 0; i < count; i++) {
    const tour: Tour = {
      id: i + 1,
      title: `Tour Demo ${i + 1}`,
      description: `Descrição detalhada do tour ${i + 1}`,
      short_description: `Tour demo ${i + 1}`,
      price: Math.floor(Math.random() * 150) + 50,
      duration: `${Math.floor(Math.random() * 4) + 1} horas`,
      category: categories[i % categories.length],
      difficulty: difficulties[i % difficulties.length],
      rating: Math.floor(Math.random() * 5) + 1,
      min_participants: 2,
      max_participants: 10,
      image_url: `/tour-${(i % 3) + 1}.jpg`,
      gallery_images: [
        `/tour-${(i % 3) + 1}.jpg`,
        `/tour-${((i + 1) % 3) + 1}.jpg`,
      ],
      meeting_point: `Ponto de encontro demo ${i + 1}`,
      schedule: ['Manhã', 'Tarde'],
      includes: ['Transporte', 'Guia', 'Equipamento'],
      excludes: ['Almoço', 'Bebidas'],
      notes: ['Levar água', 'Usar protetor solar'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      location: 'Fernando de Noronha'
    };
    
    tours.push(tour);
  }
  
  return tours;
};

// Generate Demo Events
export const generateDemoEvents = async (count: number = 5): Promise<Event[]> => {
  const categories = ['Show', 'Festival', 'Esporte', 'Cultural', 'Gastronômico'];
  
  const events: Event[] = [];
  
  for (let i = 0; i < count; i++) {
    const event: Event = {
      id: i + 1,
      name: `Evento Demo ${i + 1}`,
      title: `Evento Demo ${i + 1}`,
      description: `Descrição detalhada do evento ${i + 1}`,
      short_description: `Evento demo ${i + 1}`,
      date: new Date().toISOString().split('T')[0],
      start_time: '19:00',
      end_time: '22:00',
      location: `Local Demo ${i + 1}`,
      price: Math.floor(Math.random() * 80) + 20,
      capacity: Math.floor(Math.random() * 50) + 20,
      available_spots: Math.floor(Math.random() * 20) + 5,
      image_url: `/event-${(i % 3) + 1}.jpg`,
      partner_id: uuidv4(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: categories[i % categories.length],
      featured: Math.random() > 0.5,
      status: 'active',
      organizer: 'Organizador Demo',
      gallery_images: [
        `/event-${(i % 3) + 1}.jpg`,
        `/event-${((i + 1) % 3) + 1}.jpg`,
      ]
    };
    
    events.push(event);
  }
  
  return events;
};
