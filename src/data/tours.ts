
export interface Tour {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  category: string;
  maxParticipants: number;
  inclusions: string[];
  exclusions: string[];
  schedule: string[];
  requirements: string[];
  location: string;
  featured: boolean;
}

export const tours: Tour[] = [
  {
    id: 1,
    title: "Passeio de Barco ao Pôr do Sol",
    description: "Navegue pelas águas cristalinas e aprecie o espetacular pôr do sol em Fernando de Noronha. Este passeio inesquecível lhe proporcionará vistas deslumbrantes e momentos de pura tranquilidade no oceano. Ideal para casais e amantes da natureza que desejam capturar a beleza única do entardecer na ilha.",
    image: "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png",
    price: 350,
    duration: "3 horas",
    rating: 4.9,
    category: "Barco",
    maxParticipants: 12,
    inclusions: [
      "Bebidas de boas-vindas",
      "Petiscos típicos",
      "Equipamento de segurança",
      "Fotos profissionais"
    ],
    exclusions: [
      "Transporte para o ponto de partida",
      "Equipamentos de mergulho"
    ],
    schedule: [
      "16:00 - Embarque no Porto de Santo Antônio",
      "16:30 - Navegação pela costa da ilha",
      "17:45 - Parada para contemplação do pôr do sol",
      "19:00 - Retorno ao porto"
    ],
    requirements: [
      "Levar protetor solar",
      "Levar roupa extra",
      "Ideal para maiores de 6 anos"
    ],
    location: "Porto de Santo Antônio",
    featured: true
  },
  {
    id: 2,
    title: "Mergulho na Baía dos Porcos",
    description: "Explore a vida marinha única da Baía dos Porcos, um dos pontos mais famosos para mergulho em Fernando de Noronha. Acompanhado por instrutores experientes, você poderá observar diversas espécies de peixes coloridos, tartarugas e a extraordinária formação de corais da região.",
    image: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
    price: 480,
    duration: "4 horas",
    rating: 5.0,
    category: "Mergulho",
    maxParticipants: 8,
    inclusions: [
      "Equipamento completo de mergulho",
      "Instrutor certificado",
      "Lanche e água",
      "Fotos subaquáticas"
    ],
    exclusions: [
      "Transporte até o local",
      "Itens pessoais"
    ],
    schedule: [
      "08:00 - Encontro na base",
      "08:30 - Instruções de segurança e técnicas de mergulho",
      "09:30 - Início da atividade de mergulho",
      "11:30 - Retorno à praia e lanche"
    ],
    requirements: [
      "Atestado médico para mergulho",
      "Saber nadar",
      "Maiores de 12 anos",
      "Preenchimento de termo de responsabilidade"
    ],
    location: "Baía dos Porcos",
    featured: true
  },
  {
    id: 3,
    title: "Trilha Ecológica Mirante dos Golfinhos",
    description: "Uma trilha com vista panorâmica onde é possível observar golfinhos em seu habitat natural. Durante o percurso, o guia especializado explicará sobre a flora e fauna local, proporcionando uma experiência educativa e inesquecível em contato direto com a natureza.",
    image: "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png",
    price: 200,
    duration: "2 horas",
    rating: 4.7,
    category: "Trilha",
    maxParticipants: 15,
    inclusions: [
      "Guia especializado",
      "Kit de primeiros socorros",
      "Água mineral"
    ],
    exclusions: [
      "Refeições",
      "Binóculos para observação"
    ],
    schedule: [
      "07:00 - Encontro no ponto de partida",
      "07:15 - Início da trilha com paradas interpretativas",
      "08:30 - Chegada ao mirante e observação de golfinhos",
      "09:00 - Retorno pela trilha"
    ],
    requirements: [
      "Calçado fechado",
      "Protetor solar e chapéu",
      "Condicionamento físico básico"
    ],
    location: "Parque Nacional Marinho",
    featured: true
  },
  {
    id: 4,
    title: "Tour de Buggy pela Ilha",
    description: "Explore as principais praias e atrações da ilha com um confortável passeio de buggy. Com paradas estratégicas nos pontos mais deslumbrantes, você terá tempo para fotografar, nadar e conhecer a ilha de uma forma única e emocionante.",
    image: "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png",
    price: 550,
    duration: "6 horas",
    rating: 4.8,
    category: "Terrestre",
    maxParticipants: 4,
    inclusions: [
      "Buggy com combustível",
      "Motorista guia",
      "Paradas para banho",
      "Seguro viagem"
    ],
    exclusions: [
      "Taxa de preservação ambiental",
      "Almoço e bebidas",
      "Entrada em atrações pagas"
    ],
    schedule: [
      "09:00 - Saída do hotel",
      "09:30 - Visita à Praia do Sancho",
      "11:00 - Visita à Baía dos Porcos",
      "12:30 - Parada para almoço (não incluso)",
      "14:00 - Visita ao Porto de Santo Antônio",
      "15:30 - Retorno ao hotel"
    ],
    requirements: [
      "Documento de identificação",
      "Protetor solar",
      "Roupa de banho",
      "Dinheiro para gastos extras"
    ],
    location: "Retirada no hotel",
    featured: true
  },
  {
    id: 5,
    title: "Observação de Tartarugas Marinhas",
    description: "Uma experiência única para observar tartarugas marinhas em seu habitat natural. Acompanhado por biólogos, você aprenderá sobre o projeto de conservação e poderá assistir, em épocas específicas, a desova ou a liberação de filhotes ao mar.",
    image: "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png",
    price: 180,
    duration: "2 horas",
    rating: 4.9,
    category: "Ecológico",
    maxParticipants: 10,
    inclusions: [
      "Acompanhamento de biólogo",
      "Material informativo",
      "Contribuição para projeto de conservação"
    ],
    exclusions: [
      "Transporte até o local",
      "Equipamentos fotográficos"
    ],
    schedule: [
      "05:30 - Encontro na praia designada",
      "05:45 - Palestra sobre conservação",
      "06:15 - Início da observação",
      "07:30 - Encerramento da atividade"
    ],
    requirements: [
      "Silêncio durante a observação",
      "Não utilizar flash nas fotos",
      "Seguir todas as orientações do guia"
    ],
    location: "Praia do Projeto TAMAR",
    featured: false
  },
  // For the remaining tours, alternate between our 5 new images
  {
    id: 6,
    title: "Passeio de Caiaque ao Atalaia",
    description: "Aventure-se em um passeio de caiaque até a famosa piscina natural do Atalaia. Durante o trajeto, aprecie a beleza da costa e, ao chegar, desfrute de momentos de snorkeling em uma das mais belas piscinas naturais da ilha.",
    image: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
    price: 280,
    duration: "3 horas",
    rating: 4.6,
    category: "Aventura",
    maxParticipants: 8,
    inclusions: [
      "Caiaque e remo",
      "Colete salva-vidas",
      "Equipamento de snorkeling",
      "Instructor"
    ],
    exclusions: [
      "Transporte até o ponto de partida",
      "Refeições",
      "Fotos profissionais"
    ],
    schedule: [
      "08:30 - Encontro na praia de partida",
      "08:45 - Instruções básicas e dicas de segurança",
      "09:00 - Início do passeio de caiaque",
      "10:00 - Chegada ao Atalaia para snorkeling",
      "11:30 - Retorno de caiaque"
    ],
    requirements: [
      "Saber nadar",
      "Boa condição física",
      "Protetor solar biodegradável",
      "Maiores de 14 anos"
    ],
    location: "Praia da Conceição",
    featured: false
  },
  {
    id: 7,
    title: "Fotografia Subaquática",
    description: "Workshop prático de fotografia subaquática com profissional especializado. Aprenda técnicas exclusivas enquanto registra a incrível vida marinha de Fernando de Noronha. Ideal para entusiastas da fotografia que desejam aprimorar suas habilidades.",
    image: "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png",
    price: 650,
    duration: "5 horas",
    rating: 4.8,
    category: "Workshop",
    maxParticipants: 5,
    inclusions: [
      "Equipamento de mergulho",
      "Câmera subaquática (para quem não possuir)",
      "Material didático",
      "Certificado de participação"
    ],
    exclusions: [
      "Hospedagem",
      "Transporte",
      "Cartão de memória"
    ],
    schedule: [
      "13:00 - Aula teórica",
      "14:30 - Preparação do equipamento",
      "15:00 - Sessão prática de fotografia subaquática",
      "17:00 - Revisão das fotos e feedback",
      "18:00 - Encerramento"
    ],
    requirements: [
      "Experiência básica em mergulho",
      "Conhecimentos básicos de fotografia",
      "Equipamento próprio (opcional)",
      "Atestado médico para mergulho"
    ],
    location: "Centro de Visitantes",
    featured: false
  },
  {
    id: 8,
    title: "Passeio Histórico pela Vila dos Remédios",
    description: "Conheça a história e cultura de Fernando de Noronha neste passeio pela Vila dos Remédios. Visite construções históricas, o museu local e aprenda sobre a colonização e desenvolvimento da ilha ao longo dos séculos.",
    image: "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png",
    price: 120,
    duration: "3 horas",
    rating: 4.5,
    category: "Cultural",
    maxParticipants: 20,
    inclusions: [
      "Guia historiador",
      "Entrada no museu",
      "Material informativo"
    ],
    exclusions: [
      "Transporte até a Vila",
      "Refeições e bebidas",
      "Souvenirs"
    ],
    schedule: [
      "14:00 - Encontro na Praça Central",
      "14:15 - Visita à Igreja de Nossa Senhora dos Remédios",
      "15:00 - Visita ao Palácio São Miguel",
      "15:45 - Visita ao Museu da Vila",
      "16:30 - Tempo livre para fotos",
      "17:00 - Encerramento"
    ],
    requirements: [
      "Vestuário adequado para visita à igreja",
      "Protetor solar e chapéu",
      "Garrafa de água"
    ],
    location: "Vila dos Remédios",
    featured: false
  }
];
