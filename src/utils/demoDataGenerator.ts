import { Tour } from "@/types/database";
import { Accommodation } from "@/types/database";
import { Booking } from "@/types/bookings";
import { UserProfile } from "@/types/database";
import { Product } from "@/types/product";
import { Package } from "@/data/types/packageTypes";

export interface DemoData {
  tours: Tour[];
  accommodations: Accommodation[];
  bookings: Booking[];
  users: UserProfile[];
  products: Product[];
}

/**
 * Generates consistent demo data for the entire application
 */
export function generateDemoData(): DemoData {
  // Generate users
  const users: UserProfile[] = [
    {
      id: "user-001",
      name: "João Silva",
      email: "joao@example.com",
      phone: "+55 11 98765-4321",
      address: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      zip_code: "01234-567",
      country: "Brasil",
      created_at: "2023-08-15T10:30:00Z",
      updated_at: "2023-09-10T14:45:00Z"
    },
    {
      id: "user-002",
      name: "Maria Oliveira",
      email: "maria@example.com",
      phone: "+55 21 98765-1234",
      address: "Av. Atlântica, 500",
      city: "Rio de Janeiro",
      state: "RJ",
      zip_code: "22021-001",
      country: "Brasil",
      created_at: "2023-07-20T09:15:00Z",
      updated_at: "2023-08-25T11:20:00Z"
    },
    {
      id: "user-003",
      name: "Pedro Santos",
      email: "pedro@example.com",
      phone: "+55 31 99876-5432",
      address: "Rua das Acácias, 45",
      city: "Belo Horizonte",
      state: "MG",
      zip_code: "30140-060",
      country: "Brasil",
      created_at: "2023-09-05T15:10:00Z",
      updated_at: "2023-09-05T15:10:00Z"
    },
    {
      id: "user-004",
      name: "Ana Souza",
      email: "ana@example.com",
      phone: "+55 41 98888-7777",
      address: "Av. Paulista, 1000",
      city: "Curitiba",
      state: "PR",
      zip_code: "80230-000",
      country: "Brasil",
      created_at: "2023-06-12T08:45:00Z",
      updated_at: "2023-09-01T10:30:00Z"
    }
  ];
  
  // Generate tours data that matches our existing tour types
  const tours: Tour[] = [
    {
      id: 1,
      title: "Passeio de Barco ao Pôr do Sol",
      short_description: "Navegue pelas águas cristalinas e aprecie o pôr do sol",
      description: "Navegue pelas águas cristalinas e aprecie o espetacular pôr do sol em Fernando de Noronha.",
      price: 350,
      category: "Barco",
      duration: "3 horas",
      max_participants: 12,
      min_participants: 4,
      difficulty: "Fácil",
      rating: 4.9,
      image_url: "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png",
      gallery_images: [
        "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png",
        "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png"
      ],
      schedule: [
        "16:00 - Embarque no Porto de Santo Antônio",
        "16:30 - Navegação pela costa da ilha",
        "17:45 - Parada para contemplação do pôr do sol",
        "19:00 - Retorno ao porto"
      ],
      includes: [
        "Bebidas de boas-vindas",
        "Petiscos típicos",
        "Equipamento de segurança",
        "Fotos profissionais"
      ],
      excludes: [
        "Transporte para o ponto de partida",
        "Equipamentos de mergulho"
      ],
      notes: [
        "Levar protetor solar",
        "Levar roupa extra",
        "Ideal para maiores de 6 anos"
      ],
      meeting_point: "Porto de Santo Antônio",
      created_at: "2023-05-10T08:30:00Z",
      updated_at: "2023-08-15T13:45:00Z"
    },
    {
      id: 2,
      title: "Mergulho na Baía dos Porcos",
      short_description: "Explore a vida marinha única da Baía dos Porcos",
      description: "Explore a vida marinha única da Baía dos Porcos, um dos pontos mais famosos para mergulho em Fernando de Noronha.",
      price: 480,
      category: "Mergulho",
      duration: "4 horas",
      max_participants: 8,
      min_participants: 2,
      difficulty: "Moderado",
      rating: 5.0,
      image_url: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
      gallery_images: [
        "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png",
        "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png"
      ],
      schedule: [
        "08:00 - Encontro na base",
        "08:30 - Instruções de segurança e técnicas de mergulho",
        "09:30 - Início da atividade de mergulho",
        "11:30 - Retorno à praia e lanche"
      ],
      includes: [
        "Equipamento completo de mergulho",
        "Instrutor certificado",
        "Lanche e água",
        "Fotos subaquáticas"
      ],
      excludes: [
        "Transporte até o local",
        "Itens pessoais"
      ],
      notes: [
        "Atestado médico para mergulho",
        "Saber nadar",
        "Maiores de 12 anos",
        "Preenchimento de termo de responsabilidade"
      ],
      meeting_point: "Baía dos Porcos",
      created_at: "2023-04-20T10:15:00Z",
      updated_at: "2023-07-05T09:30:00Z"
    }
  ];
  
  // Generate accommodations data
  const accommodations: Accommodation[] = [
    {
      id: 1,
      title: "Pousada Vista Mar",
      short_description: "Pousada com vista privilegiada para o mar de Noronha",
      description: "Pousada com vista privilegiada para o mar de Noronha, café da manhã incluso e localização estratégica.",
      price_per_night: 850,
      type: "Pousada",
      max_guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["Wi-Fi", "Café da manhã", "Ar-condicionado", "Piscina"],
      rating: 4.8,
      image_url: "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png",
      gallery_images: [
        "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
        "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png"
      ],
      address: "Praia do Sueste, s/n",
      created_at: "2023-03-10T14:20:00Z",
      updated_at: "2023-08-01T11:45:00Z"
    },
    {
      id: 2,
      title: "Villa Paradiso",
      short_description: "Villa completa com piscina privativa e 3 quartos",
      description: "Villa completa com piscina privativa, 3 quartos e vista panorâmica para o Morro Dois Irmãos.",
      price_per_night: 2200,
      type: "Villa",
      max_guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["Wi-Fi", "Piscina privativa", "Ar-condicionado", "Cozinha completa", "Churrasqueira"],
      rating: 4.9,
      image_url: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
      gallery_images: [
        "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png",
        "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png"
      ],
      address: "Vila dos Remédios, 123",
      created_at: "2023-02-15T09:10:00Z",
      updated_at: "2023-07-20T16:30:00Z"
    }
  ];

  // Generate more realistic bookings data
  const bookings: Booking[] = [
    {
      id: "booking-001",
      user_name: "João Silva",
      user_email: "joao@example.com",
      item_type: "tour",
      item_name: "Passeio de Barco ao Pôr do Sol",
      start_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
      end_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      guests: 2,
      total_price: 700,
      status: "confirmed",
      payment_status: "paid",
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
    },
    {
      id: "booking-002",
      user_name: "João Silva",
      user_email: "joao@example.com",
      item_type: "accommodation",
      item_name: "Pousada Vista Mar",
      start_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days from now
      end_date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(),
      guests: 2,
      total_price: 4250,
      status: "confirmed",
      payment_status: "paid",
      created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() // 60 days ago
    },
    {
      id: "booking-003",
      user_name: "João Silva",
      user_email: "joao@example.com",
      item_type: "tour",
      item_name: "Mergulho na Baía dos Porcos",
      start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      end_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      guests: 1,
      total_price: 480,
      status: "confirmed",
      payment_status: "paid",
      created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString() // 35 days ago
    },
    {
      id: "booking-004",
      user_name: "João Silva",
      user_email: "joao@example.com",
      item_type: "package",
      item_name: "Escapada Romântica",
      start_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
      end_date: new Date(Date.now() + 95 * 24 * 60 * 60 * 1000).toISOString(),
      guests: 2,
      total_price: 4899,
      status: "confirmed",
      payment_status: "paid",
      created_at: new Date().toISOString() // Today
    }
  ];

  // Generate products data
  const products: Product[] = [
    {
      id: 1,
      name: "Camiseta Fernando de Noronha",
      description: "Camiseta 100% algodão com estampa exclusiva de Fernando de Noronha",
      image_url: "/product-tshirt.jpg",
      price: 79.90,
      category: "Vestuário",
      stock: 50,
      status: "active",
      featured: true
    },
    {
      id: 2,
      name: "Chapéu de Palha Noronha",
      description: "Chapéu de palha artesanal fabricado por artesãos locais",
      image_url: "/product-hat.jpg",
      price: 45.50,
      category: "Vestuário",
      stock: 30,
      status: "active",
      featured: true
    },
    {
      id: 3,
      name: "Caneca Morro Dois Irmãos",
      description: "Caneca de cerâmica com imagem do Morro Dois Irmãos",
      image_url: "/product-mug.jpg",
      price: 39.90,
      category: "Souvenir",
      stock: 45,
      status: "active",
      featured: false
    },
    {
      id: 4,
      name: "Guia Fernando de Noronha",
      description: "Livro com dicas, mapas e informações completas sobre Fernando de Noronha",
      image_url: "/product-book.jpg",
      price: 68.00,
      category: "Livros",
      stock: 20,
      status: "active",
      featured: true
    }
  ];

  return {
    tours,
    accommodations,
    bookings,
    users,
    products
  };
}

// Use this function to access demo data throughout the application
export const demoData = generateDemoData();
