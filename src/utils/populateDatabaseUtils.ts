
import { supabase } from '@/lib/supabase';
import { Accommodation } from '@/types/database';
import { toast } from 'sonner';

/**
 * Populates the database with sample accommodation data
 * Only to be used in development environment or controlled staging environment
 */
export async function populateAccommodationsDatabase(): Promise<boolean> {
  try {
    // Define sample data with all required properties specified by TypeScript
    const sampleAccommodations = [
      {
        title: 'Pousada Vista Mar',
        description: 'Pousada com vista privilegiada para o mar de Noronha, café da manhã incluso e localização estratégica.',
        short_description: 'Pousada com vista privilegiada para o mar de Noronha.',
        price_per_night: 850,
        image_url: "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png",
        location: "Praia do Sueste",
        address: "Rua da Praia do Sueste, 123",
        type: "Pousada",
        rating: 4.8,
        amenities: ["Wi-Fi", "Café da manhã", "Ar-condicionado", "Piscina"],
        max_guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        gallery_images: [
          "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png",
          "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png"
        ]
      },
      {
        title: 'Villa Paradiso',
        description: 'Villa completa com piscina privativa, 3 quartos e vista panorâmica para o Morro Dois Irmãos.',
        short_description: 'Villa completa com piscina privativa e vista panorâmica.',
        price_per_night: 2200,
        image_url: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
        location: "Vila dos Remédios",
        address: "Rua dos Remédios, 456",
        type: "Villa",
        rating: 4.9,
        amenities: ["Wi-Fi", "Piscina privativa", "Ar-condicionado", "Cozinha completa", "Churrasqueira"],
        max_guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        gallery_images: [
          "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
          "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png"
        ]
      },
      {
        title: 'Eco-Chalé Noronha',
        description: 'Chalé sustentável construído com materiais ecológicos, integrado à natureza, próximo à praia.',
        short_description: 'Chalé sustentável integrado à natureza, próximo à praia.',
        price_per_night: 650,
        image_url: "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png",
        location: "Praia do Cachorro",
        address: "Estrada da Praia do Cachorro, 78",
        type: "Chalé",
        rating: 4.7,
        amenities: ["Wi-Fi", "Café da manhã", "Ventilador de teto", "Ducha externa"],
        max_guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        gallery_images: [
          "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png",
          "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png"
        ]
      },
      {
        title: 'Flat Premium',
        description: 'Apartamento moderno com serviços de hotel, localizado próximo aos principais pontos de visitação.',
        short_description: 'Apartamento moderno com serviços de hotel.',
        price_per_night: 950,
        image_url: "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png",
        location: "Vila dos Remédios",
        address: "Avenida Central, 1001",
        type: "Flat",
        rating: 4.6,
        amenities: ["Wi-Fi", "Serviço de quarto", "Ar-condicionado", "Academia"],
        max_guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        gallery_images: [
          "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png",
          "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png"
        ]
      },
      {
        title: 'Casa Família Noronha',
        description: 'Casa espaçosa ideal para famílias, com quintal e churrasqueira, próxima a praias tranquilas.',
        short_description: 'Casa espaçosa ideal para famílias, com quintal e churrasqueira.',
        price_per_night: 1800,
        image_url: "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png",
        location: "Praia da Conceição",
        address: "Rua das Conchas, 550",
        type: "Casa",
        rating: 4.8,
        amenities: ["Wi-Fi", "Cozinha completa", "Ar-condicionado", "Churrasqueira", "Estacionamento"],
        max_guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        gallery_images: [
          "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png",
          "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png"
        ]
      },
      {
        title: 'Bangalô Ocean View',
        description: 'Bangalô privativo com vista para o mar, decoração de luxo e serviços exclusivos.',
        short_description: 'Bangalô privativo com vista para o mar e decoração de luxo.',
        price_per_night: 1400,
        image_url: "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png",
        location: "Baía do Sancho",
        address: "Caminho da Baía, 230",
        type: "Bangalô",
        rating: 4.9,
        amenities: ["Wi-Fi", "Café da manhã", "Ar-condicionado", "Jacuzzi privativa", "Terraço"],
        max_guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        gallery_images: [
          "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png",
          "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png"
        ]
      },
      {
        title: 'Camping Eco Noronha',
        description: 'Experiência de camping com estrutura completa, tendas equipadas e área de convivência.',
        short_description: 'Camping com estrutura completa e tendas equipadas.',
        price_per_night: 250,
        image_url: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
        location: "Praia do Boldró",
        address: "Estrada do Boldró, s/n",
        type: "Camping",
        rating: 4.4,
        amenities: ["Wi-Fi nas áreas comuns", "Café da manhã", "Chuveiros", "Área de convivência"],
        max_guests: 1,
        bedrooms: 0,
        bathrooms: 1,
        gallery_images: [
          "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
          "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png"
        ]
      }
    ];

    // Insert the sample accommodations into the database
    // Use the spread operator to ensure each accommodation is treated as a separate record
    const { data, error } = await supabase
      .from('accommodations')
      .insert([...sampleAccommodations]) // This ensures we pass an array of records instead of just the array directly
      .select();

    if (error) {
      console.error('Error populating accommodation database:', error);
      return false;
    }

    console.log(`Successfully added ${data.length} sample accommodations to the database`);
    return true;
  } catch (error) {
    console.error('Error in populateAccommodationsDatabase:', error);
    return false;
  }
}

/**
 * Utility function to populate sample availability for accommodations
 * Makes accommodations available for the next 90 days
 */
export async function populateAccommodationAvailability(accommodationId: number): Promise<boolean> {
  try {
    const today = new Date();
    const availabilityEntries = [];

    // Create availability entries for the next 90 days
    for (let i = 0; i < 90; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Every 10th day is unavailable (for demonstration)
      const status = i % 10 === 0 ? 'unavailable' : 'available';
      
      // Every 5th day has a custom price (for demonstration)
      const customPrice = i % 5 === 0 ? Math.floor(Math.random() * 200) + 100 : null;
      
      availabilityEntries.push({
        accommodation_id: accommodationId,
        date: date.toISOString().split('T')[0],
        status,
        custom_price: customPrice,
      });
    }

    // Insert the availability entries into the database
    const { data, error } = await supabase
      .from('accommodation_availability')
      .insert(availabilityEntries);

    if (error) {
      console.error('Error populating accommodation availability:', error);
      return false;
    }

    console.log(`Successfully populated availability for accommodation ID ${accommodationId}`);
    return true;
  } catch (error) {
    console.error('Error in populateAccommodationAvailability:', error);
    return false;
  }
}

/**
 * Admin utility function to populate the database with sample accommodations and their availability
 * Should only be used in development or controlled environment
 */
export async function populateEntireAccommodationsDatabase(): Promise<void> {
  try {
    // First populate accommodations
    const success = await populateAccommodationsDatabase();
    
    if (!success) {
      toast.error('Falha ao criar hospedagens de exemplo');
      return;
    }
    
    // Now get all accommodations to create availability for them
    const { data: accommodations, error } = await supabase
      .from('accommodations')
      .select('id');
      
    if (error) {
      toast.error('Falha ao recuperar IDs das hospedagens');
      return;
    }
    
    // Populate availability for each accommodation
    for (const accommodation of accommodations) {
      await populateAccommodationAvailability(accommodation.id);
    }
    
    toast.success('Dados de exemplo criados com sucesso!');
  } catch (error) {
    toast.error('Falha ao criar dados de exemplo');
    console.error('Error in populateEntireAccommodationsDatabase:', error);
  }
}
