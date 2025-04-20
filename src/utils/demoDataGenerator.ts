import { Tour, Accommodation, Product } from '@/types/database';

// Demo data for seeding the database
export const demoData = {
  tours: [
    {
      id: 1,
      title: "Mergulho Guiado na Baía do Sancho",
      short_description: "Explore a vida marinha em um dos melhores pontos de mergulho do Brasil.",
      description: "Mergulho guiado com instrutores experientes na Baía do Sancho, eleita diversas vezes a praia mais bonita do mundo. Inclui todo o equipamento necessário e fotos subaquáticas.",
      price: 350,
      category: "mergulho",
      duration: "3 horas",
      max_participants: 6,
      min_participants: 2,
      difficulty: "moderado",
      rating: 4.8,
      image_url: "/tours/mergulho-sancho.jpg",
      gallery_images: [
        "/tours/mergulho-sancho-1.jpg",
        "/tours/mergulho-sancho-2.jpg",
        "/tours/mergulho-sancho-3.jpg"
      ],
      schedule: ["Manhã", "Tarde"],
      includes: ["Equipamento de mergulho", "Guia bilíngue", "Fotos subaquáticas"],
      excludes: ["Transporte até o ponto de encontro", "Taxa de preservação ambiental"],
      notes: ["Levar roupa de banho, toalha e protetor solar.", "Não recomendado para pessoas com problemas cardíacos."],
      meeting_point: "Centro de Mergulho Tubarão",
    },
    {
      id: 2,
      title: "Trilha do Atalaia",
      short_description: "Caminhada ecológica com piscinas naturais e vistas panorâmicas.",
      description: "Trilha guiada pela área de preservação ambiental do Atalaia, com parada para banho nas piscinas naturais (sujeito à maré baixa). Inclui transporte de ida e volta e acompanhamento de guia especializado.",
      price: 180,
      category: "trilha",
      duration: "4 horas",
      max_participants: 10,
      min_participants: 4,
      difficulty: "fácil",
      rating: 4.5,
      image_url: "/tours/trilha-atalaia.jpg",
      gallery_images: [
        "/tours/trilha-atalaia-1.jpg",
        "/tours/trilha-atalaia-2.jpg",
        "/tours/trilha-atalaia-3.jpg"
      ],
      schedule: ["Manhã"],
      includes: ["Transporte de ida e volta", "Guia especializado", "Seguro"],
      excludes: ["Taxa de acesso ao ICMBio", "Alimentação"],
      notes: ["Usar calçado fechado e roupas confortáveis.", "Levar água e lanche."],
      meeting_point: "Agência EcoNoronha",
    },
    {
      id: 3,
      title: "Passeio de Barco ao Pôr do Sol",
      short_description: "Navegue pelas águas cristalinas de Noronha e admire o espetacular pôr do sol.",
      description: "Passeio de barco com música e open bar, passando pelas principais praias e ilhas secundárias de Noronha. Inclui parada para banho e snorkeling na Baía do Sancho ou em outra praia com boas condições.",
      price: 280,
      category: "barco",
      duration: "3 horas",
      max_participants: 15,
      min_participants: 5,
      difficulty: "fácil",
      rating: 4.7,
      image_url: "/tours/barco-por-do-sol.jpg",
      gallery_images: [
        "/tours/barco-por-do-sol-1.jpg",
        "/tours/barco-por-do-sol-2.jpg",
        "/tours/barco-por-do-sol-3.jpg"
      ],
      schedule: ["Tarde"],
      includes: ["Open bar", "Música ao vivo", "Equipamento de snorkeling"],
      excludes: ["Transporte até o porto", "Alimentação"],
      notes: ["Levar roupa de banho, toalha e protetor solar.", "Em caso de chuva, o passeio será remarcado."],
      meeting_point: "Porto de Santo Antônio",
    },
    {
      id: 4,
      title: "Ilha Tour Completo",
      short_description: "Descubra os principais pontos turísticos da ilha em um só dia.",
      description: "Tour de um dia inteiro com guia exclusivo, visitando as praias do Sancho, Leão, Sueste e Cacimba do Padre, além do Forte dos Remédios e do Museu do Tubarão. Inclui transporte em veículo 4x4 e almoço em restaurante local.",
      price: 450,
      category: "terrestre",
      duration: "8 horas",
      max_participants: 8,
      min_participants: 2,
      difficulty: "moderado",
      rating: 4.9,
      image_url: "/tours/ilha-tour.jpg",
      gallery_images: [
        "/tours/ilha-tour-1.jpg",
        "/tours/ilha-tour-2.jpg",
        "/tours/ilha-tour-3.jpg"
      ],
      schedule: ["Diurno"],
      includes: ["Transporte em 4x4", "Guia exclusivo", "Almoço"],
      excludes: ["Taxa de preservação ambiental", "Bebidas"],
      notes: ["Usar roupas confortáveis e calçado fechado.", "Levar água e protetor solar."],
      meeting_point: "Receptivo Noronha",
    }
  ] as Tour[],
  
  accommodations: [
    {
      id: 1,
      title: "Pousada Mar Atlântico",
      short_description: "Aconchego e conforto perto das principais praias.",
      description: "Pousada charmosa com quartos climatizados, café da manhã tropical e piscina com vista para o mar. Localizada a poucos minutos das praias da Conceição e do Boldró.",
      price_per_night: 600,
      type: "pousada",
      max_guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["Ar condicionado", "Wi-Fi", "Piscina", "Café da manhã"],
      rating: 4.6,
      image_url: "/accommodations/pousada-mar-atlantico.jpg",
      gallery_images: [
        "/accommodations/pousada-mar-atlantico-1.jpg",
        "/accommodations/pousada-mar-atlantico-2.jpg",
        "/accommodations/pousada-mar-atlantico-3.jpg"
      ],
      address: "Rua da Praia, 123",
    },
    {
      id: 2,
      title: "Bangalô do Boldró",
      short_description: "Experiência exclusiva em meio à natureza exuberante.",
      description: "Bangalôs espaçosos com varanda privativa, hidromassagem e decoração rústica. Situados em uma área isolada, com acesso exclusivo à Praia do Boldró.",
      price_per_night: 1200,
      type: "bangalô",
      max_guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      amenities: ["Ar condicionado", "Wi-Fi", "Hidromassagem", "Cozinha equipada"],
      rating: 4.8,
      image_url: "/accommodations/bangalo-boldro.jpg",
      gallery_images: [
        "/accommodations/bangalo-boldro-1.jpg",
        "/accommodations/bangalo-boldro-2.jpg",
        "/accommodations/bangalo-boldro-3.jpg"
      ],
      address: "Estrada do Boldró, km 5",
    },
    {
      id: 3,
      title: "Apartamento Vista do Sancho",
      short_description: "Conforto e praticidade com a melhor vista da ilha.",
      description: "Apartamentos modernos com cozinha completa, sala de estar e varanda com vista panorâmica da Baía do Sancho. Próximo a restaurantes e comércios locais.",
      price_per_night: 800,
      type: "apartamento",
      max_guests: 3,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["Ar condicionado", "Wi-Fi", "Cozinha equipada", "Estacionamento"],
      rating: 4.5,
      image_url: "/accommodations/apartamento-sancho.jpg",
      gallery_images: [
        "/accommodations/apartamento-sancho-1.jpg",
        "/accommodations/apartamento-sancho-2.jpg",
        "/accommodations/apartamento-sancho-3.jpg"
      ],
      address: "Rua das Flores, 456",
    },
    {
      id: 4,
      title: "Casa da Praia",
      short_description: "Aconchegante casa de temporada a poucos passos da areia.",
      description: "Casa espaçosa com 3 quartos, sala de estar, cozinha equipada e jardim com churrasqueira. Ideal para famílias ou grupos de amigos que buscam privacidade e conforto.",
      price_per_night: 1500,
      type: "casa",
      max_guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["Ar condicionado", "Wi-Fi", "Cozinha equipada", "Churrasqueira"],
      rating: 4.7,
      image_url: "/accommodations/casa-praia.jpg",
      gallery_images: [
        "/accommodations/casa-praia-1.jpg",
        "/accommodations/casa-praia-2.jpg",
        "/accommodations/casa-praia-3.jpg"
      ],
      address: "Avenida Beira Mar, 789",
    }
  ] as Accommodation[],
  
  products: [
    {
      id: 1,
      name: "Camiseta Noronha",
      description: "Camiseta 100% algodão orgânico com estampa de tartaruga marinha",
      image_url: "/product-tshirt.jpg",
      price: 79.90,
      category: "vestuário",
      stock: 50,
      status: "active",
      featured: true
    },
    {
      id: 2,
      name: "Chapéu de Palha",
      description: "Chapéu de palha artesanal, perfeito para proteger do sol em suas aventuras",
      image_url: "/product-hat.jpg", 
      price: 45.90,
      category: "acessórios",
      stock: 30,
      status: "active",
      featured: false
    },
    {
      id: 3,
      name: "Guia de Fernando de Noronha",
      description: "Livro completo com informações sobre a ilha, trilhas, praias e fauna local",
      image_url: "/product-book.jpg",
      price: 89.90,
      category: "livros",
      stock: 25,
      status: "active",
      featured: true
    },
    {
      id: 4,
      name: "Caneca Noronha",
      description: "Caneca de cerâmica com vista do Morro Dois Irmãos",
      image_url: "/product-mug.jpg",
      price: 35.90,
      category: "souvenirs",
      stock: 40,
      status: "active",
      featured: false
    }
  ] as Product[]
};
