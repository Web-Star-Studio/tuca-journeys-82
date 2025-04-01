
export interface Accommodation {
  id: number;
  title: string;
  description: string;
  price: number;
  perNight: boolean;
  image: string;
  location: string;
  rating: number;
  amenities: string[];
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  featured: boolean;
}

export const accommodations: Accommodation[] = [
  {
    id: 1,
    title: "Pousada Vista Mar",
    description: "Pousada com vista privilegiada para o mar de Noronha, café da manhã incluso e localização estratégica.",
    price: 850,
    perNight: true,
    image: "/accommodation-pousada-1.jpg",
    location: "Praia do Sueste",
    rating: 4.8,
    amenities: ["Wi-Fi", "Café da manhã", "Ar-condicionado", "Piscina"],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true
  },
  {
    id: 2,
    title: "Villa Paradiso",
    description: "Villa completa com piscina privativa, 3 quartos e vista panorâmica para o Morro Dois Irmãos.",
    price: 2200,
    perNight: true,
    image: "/accommodation-villa-1.jpg",
    location: "Vila dos Remédios",
    rating: 4.9,
    amenities: ["Wi-Fi", "Piscina privativa", "Ar-condicionado", "Cozinha completa", "Churrasqueira"],
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    featured: true
  },
  {
    id: 3,
    title: "Eco-Chalé Noronha",
    description: "Chalé sustentável construído com materiais ecológicos, integrado à natureza, próximo à praia.",
    price: 650,
    perNight: true,
    image: "/accommodation-chale-1.jpg",
    location: "Praia do Cachorro",
    rating: 4.7,
    amenities: ["Wi-Fi", "Café da manhã", "Ventilador de teto", "Ducha externa"],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true
  },
  {
    id: 4,
    title: "Flat Premium",
    description: "Apartamento moderno com serviços de hotel, localizado próximo aos principais pontos de visitação.",
    price: 950,
    perNight: true,
    image: "/accommodation-flat-1.jpg",
    location: "Vila dos Remédios",
    rating: 4.6,
    amenities: ["Wi-Fi", "Serviço de quarto", "Ar-condicionado", "Academia"],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false
  },
  {
    id: 5,
    title: "Casa Família Noronha",
    description: "Casa espaçosa ideal para famílias, com quintal e churrasqueira, próxima a praias tranquilas.",
    price: 1800,
    perNight: true,
    image: "/accommodation-casa-1.jpg",
    location: "Praia da Conceição",
    rating: 4.8,
    amenities: ["Wi-Fi", "Cozinha completa", "Ar-condicionado", "Churrasqueira", "Estacionamento"],
    capacity: 8,
    bedrooms: 4,
    bathrooms: 3,
    featured: false
  },
  {
    id: 6,
    title: "Bangalô Ocean View",
    description: "Bangalô privativo com vista para o mar, decoração de luxo e serviços exclusivos.",
    price: 1400,
    perNight: true,
    image: "/accommodation-bangalo-1.jpg",
    location: "Baía do Sancho",
    rating: 4.9,
    amenities: ["Wi-Fi", "Café da manhã", "Ar-condicionado", "Jacuzzi privativa", "Terraço"],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true
  },
  {
    id: 7,
    title: "Camping Eco Noronha",
    description: "Experiência de camping com estrutura completa, tendas equipadas e área de convivência.",
    price: 250,
    perNight: true,
    image: "/accommodation-camping-1.jpg",
    location: "Praia do Boldró",
    rating: 4.4,
    amenities: ["Wi-Fi nas áreas comuns", "Café da manhã", "Chuveiros", "Área de convivência"],
    capacity: 1,
    bedrooms: 0,
    bathrooms: 0,
    featured: false
  },
  {
    id: 8,
    title: "Suíte Luxo Noronha",
    description: "Suíte de luxo com decoração sofisticada, serviços exclusivos e vista deslumbrante.",
    price: 1200,
    perNight: true,
    image: "/accommodation-suite-1.jpg",
    location: "Vila dos Remédios",
    rating: 4.9,
    amenities: ["Wi-Fi", "Café da manhã", "Ar-condicionado", "Serviço de quarto 24h", "Spa"],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false
  }
];
