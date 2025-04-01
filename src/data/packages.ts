
export type Package = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  days: number;
  persons: number;
  rating: number;
  highlights?: string[];
  includes?: string[];
  excludes?: string[];
  itinerary?: {
    day: number;
    title: string;
    description: string;
  }[];
  dates?: string[];
};

export const packages: Package[] = [
  {
    id: 1,
    title: "Escapada Romântica",
    description: "Um pacote perfeito para casais que desejam vivenciar momentos inesquecíveis em Fernando de Noronha.",
    image: "/package-romantic.jpg",
    price: 4899,
    days: 5,
    persons: 2,
    rating: 4.9,
    highlights: [
      "Passeio de barco ao pôr do sol com espumante",
      "Jantar romântico na praia",
      "Hospedagem em pousada premium com vista para o mar",
      "Sessão de fotos profissional em pontos turísticos"
    ],
    includes: [
      "Passagem aérea ida e volta",
      "Traslado aeroporto/pousada/aeroporto",
      "4 noites de hospedagem com café da manhã",
      "Jantar romântico na praia",
      "Passeio de barco ao pôr do sol",
      "Sessão de fotos profissional",
      "Taxa de preservação ambiental"
    ],
    excludes: [
      "Refeições não mencionadas",
      "Passeios opcionais",
      "Despesas pessoais",
      "Gorjetas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chegada a Fernando de Noronha",
        description: "Recepção no aeroporto, traslado para a pousada e restante do dia livre para ambientação."
      },
      {
        day: 2,
        title: "Explorando as praias do Mar de Dentro",
        description: "Passeio pelas praias do Mar de Dentro, incluindo Praia do Porto, Praia da Conceição e Praia do Meio."
      },
      {
        day: 3,
        title: "Tour pelas praias do Mar de Fora",
        description: "Visita às praias do Mar de Fora, incluindo Baía dos Porcos, Praia do Sancho e Praia do Leão."
      },
      {
        day: 4,
        title: "Dia especial",
        description: "Sessão de fotos profissional em pontos turísticos e jantar romântico na praia à noite."
      },
      {
        day: 5,
        title: "Despedida",
        description: "Manhã livre para as últimas compras e despedida da ilha."
      }
    ],
    dates: ["15/06/2023 - 19/06/2023", "22/07/2023 - 26/07/2023", "10/08/2023 - 14/08/2023"]
  },
  {
    id: 2,
    title: "Aventura Completa",
    description: "Para os amantes da natureza e aventuras. Inclui trilhas, mergulho e passeios de barco.",
    image: "/package-adventure.jpg",
    price: 5299,
    days: 7,
    persons: 1,
    rating: 4.8,
    highlights: [
      "Mergulho com cilindro em pontos exclusivos",
      "Trilha do Pico do Morro São José",
      "Tour de 360° pela ilha de barco",
      "Passeio de caiaque nas águas cristalinas"
    ],
    includes: [
      "Passagem aérea ida e volta",
      "Traslado aeroporto/pousada/aeroporto",
      "6 noites de hospedagem com café da manhã",
      "Equipamento completo para mergulho",
      "Guia especializado para trilhas",
      "Tour de barco ao redor da ilha",
      "Taxa de preservação ambiental"
    ],
    excludes: [
      "Refeições não mencionadas",
      "Passeios opcionais",
      "Despesas pessoais",
      "Gorjetas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chegada e Ambientação",
        description: "Recepção no aeroporto, traslado para a pousada e briefing sobre as atividades da semana."
      },
      {
        day: 2,
        title: "Mergulho em Águas Cristalinas",
        description: "Dia dedicado ao mergulho com cilindro em pontos exclusivos da ilha."
      },
      {
        day: 3,
        title: "Trilha e Vista Panorâmica",
        description: "Trilha guiada até o Pico do Morro São José com vista panorâmica da ilha."
      },
      {
        day: 4,
        title: "Tour de Barco",
        description: "Tour de 360° ao redor da ilha de barco, com paradas para nadar em baías isoladas."
      },
      {
        day: 5,
        title: "Aventura em Caiaque",
        description: "Passeio de caiaque pelas águas cristalinas, explorando grutas e formações rochosas."
      },
      {
        day: 6,
        title: "Dia Livre",
        description: "Dia livre para descanso ou atividades opcionais."
      },
      {
        day: 7,
        title: "Despedida",
        description: "Manhã livre e retorno ao continente."
      }
    ],
    dates: ["05/06/2023 - 11/06/2023", "03/07/2023 - 09/07/2023", "07/08/2023 - 13/08/2023"]
  },
  {
    id: 3,
    title: "Família em Noronha",
    description: "Pacote ideal para famílias descobrirem as maravilhas de Fernando de Noronha com conforto e segurança.",
    image: "/package-family.jpg",
    price: 9899,
    days: 6,
    persons: 4,
    rating: 4.7,
    highlights: [
      "Passeio de barco com possibilidade de ver golfinhos",
      "Visita ao Projeto TAMAR",
      "Snorkeling em águas rasas e seguras",
      "Acomodação familiar espaçosa"
    ],
    includes: [
      "Passagem aérea ida e volta",
      "Traslado aeroporto/pousada/aeroporto",
      "5 noites de hospedagem com café da manhã",
      "Passeio de barco com guia especializado",
      "Visita guiada ao Projeto TAMAR",
      "Equipamento de snorkeling",
      "Taxa de preservação ambiental"
    ],
    excludes: [
      "Refeições não mencionadas",
      "Passeios opcionais",
      "Despesas pessoais",
      "Gorjetas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chegada a Fernando de Noronha",
        description: "Recepção no aeroporto, traslado para a pousada e restante do dia livre."
      },
      {
        day: 2,
        title: "Conhecendo a Ilha",
        description: "Tour panorâmico pela ilha, passando pelos principais pontos turísticos."
      },
      {
        day: 3,
        title: "Projeto TAMAR e Snorkeling",
        description: "Visita ao Projeto TAMAR pela manhã e tarde dedicada ao snorkeling em águas rasas."
      },
      {
        day: 4,
        title: "Passeio de Barco",
        description: "Passeio de barco com possibilidade de avistar golfinhos e tartarugas marinhas."
      },
      {
        day: 5,
        title: "Dia Livre em Família",
        description: "Dia livre para aproveitar as praias ou realizar passeios opcionais."
      },
      {
        day: 6,
        title: "Despedida",
        description: "Manhã livre e retorno ao continente."
      }
    ],
    dates: ["10/07/2023 - 15/07/2023", "15/08/2023 - 20/08/2023", "10/09/2023 - 15/09/2023"]
  },
  {
    id: 4,
    title: "Noronha Exclusivo",
    description: "Experiência premium com serviços exclusivos e hospedagem de luxo para uma experiência inesquecível.",
    image: "/hero-noronha-1.jpg",
    price: 12999,
    days: 7,
    persons: 2,
    rating: 4.9,
    highlights: [
      "Hospedagem em pousada de luxo",
      "Chef privativo para um jantar especial",
      "Tour exclusivo de carro pela ilha",
      "Passeio de lancha privativa"
    ],
    includes: [
      "Passagem aérea ida e volta em classe executiva",
      "Traslado aeroporto/pousada/aeroporto em veículo exclusivo",
      "6 noites de hospedagem com café da manhã",
      "Um jantar preparado por chef privativo",
      "Tour exclusivo pela ilha",
      "Passeio de lancha privativa",
      "Taxa de preservação ambiental"
    ],
    excludes: [
      "Refeições não mencionadas",
      "Passeios opcionais",
      "Despesas pessoais",
      "Gorjetas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chegada VIP",
        description: "Recepção exclusiva no aeroporto, traslado para a pousada de luxo e welcome drink."
      },
      {
        day: 2,
        title: "Tour Personalizado",
        description: "Tour exclusivo pela ilha em veículo privativo, com paradas personalizadas."
      },
      {
        day: 3,
        title: "Experiência Gastronômica",
        description: "Dia livre e à noite, jantar especial preparado por chef privativo na pousada."
      },
      {
        day: 4,
        title: "Passeio de Lancha",
        description: "Passeio de lancha privativa ao redor da ilha, com paradas para mergulho e contemplação."
      },
      {
        day: 5,
        title: "Dia de Relaxamento",
        description: "Dia dedicado ao relaxamento, com possibilidade de tratamentos de spa (opcional)."
      },
      {
        day: 6,
        title: "Aventura Personalizada",
        description: "Escolha uma aventura personalizada: mergulho, trilha ou passeio."
      },
      {
        day: 7,
        title: "Despedida Premium",
        description: "Café da manhã especial e traslado exclusivo para o aeroporto."
      }
    ],
    dates: ["20/07/2023 - 26/07/2023", "25/08/2023 - 31/08/2023", "15/09/2023 - 21/09/2023"]
  },
  {
    id: 5,
    title: "Noronha Econômico",
    description: "Pacote com ótimo custo-benefício para conhecer as principais atrações de Fernando de Noronha.",
    image: "/hero-noronha-3.jpg",
    price: 3799,
    days: 4,
    persons: 1,
    rating: 4.5,
    highlights: [
      "Passeio guiado às principais praias",
      "Hospedagem bem localizada",
      "Transfer compartilhado",
      "Café da manhã incluso"
    ],
    includes: [
      "Passagem aérea ida e volta",
      "Traslado aeroporto/pousada/aeroporto compartilhado",
      "3 noites de hospedagem com café da manhã",
      "Passeio guiado às principais praias",
      "Taxa de preservação ambiental"
    ],
    excludes: [
      "Refeições não mencionadas",
      "Passeios opcionais",
      "Despesas pessoais",
      "Gorjetas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chegada a Fernando de Noronha",
        description: "Recepção no aeroporto, traslado para a pousada e restante do dia livre."
      },
      {
        day: 2,
        title: "Praias do Mar de Dentro",
        description: "Passeio guiado pelas praias do Mar de Dentro, com tempo para banho."
      },
      {
        day: 3,
        title: "Praias do Mar de Fora",
        description: "Passeio guiado pelas famosas praias do Mar de Fora, incluindo Sancho e Baía dos Porcos."
      },
      {
        day: 4,
        title: "Despedida",
        description: "Manhã livre e traslado para o aeroporto."
      }
    ],
    dates: ["01/08/2023 - 04/08/2023", "01/09/2023 - 04/09/2023", "01/10/2023 - 04/10/2023"]
  },
  {
    id: 6,
    title: "Lua de Mel em Noronha",
    description: "Pacote especial para recém-casados com experiências românticas e exclusivas no paraíso.",
    image: "/package-romantic.jpg",
    price: 8599,
    days: 6,
    persons: 2,
    rating: 5.0,
    highlights: [
      "Suíte romântica com vista para o mar",
      "Jantar à luz de velas na praia",
      "Massagem para casal",
      "Passeio exclusivo ao pôr do sol"
    ],
    includes: [
      "Passagem aérea ida e volta",
      "Traslado aeroporto/pousada/aeroporto em veículo exclusivo",
      "5 noites de hospedagem em suíte romântica com café da manhã",
      "Jantar à luz de velas na praia",
      "Sessão de massagem para casal",
      "Passeio exclusivo ao pôr do sol",
      "Espumante de boas-vindas",
      "Decoração romântica no quarto",
      "Taxa de preservação ambiental"
    ],
    excludes: [
      "Refeições não mencionadas",
      "Passeios opcionais",
      "Despesas pessoais",
      "Gorjetas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chegada dos Noivos",
        description: "Recepção especial no aeroporto, traslado para a pousada e espumante de boas-vindas."
      },
      {
        day: 2,
        title: "Relaxamento a Dois",
        description: "Manhã livre e tarde com sessão de massagem para casal."
      },
      {
        day: 3,
        title: "Explorando o Paraíso",
        description: "Passeio pelas praias mais belas da ilha, com tempo para fotos e banho."
      },
      {
        day: 4,
        title: "Pôr do Sol Especial",
        description: "Dia livre e ao entardecer, passeio exclusivo para apreciar o pôr do sol com espumante."
      },
      {
        day: 5,
        title: "Noite Romântica",
        description: "Dia livre e à noite, jantar romântico à luz de velas na praia."
      },
      {
        day: 6,
        title: "Despedida",
        description: "Café da manhã especial e traslado para o aeroporto."
      }
    ],
    dates: ["10/06/2023 - 15/06/2023", "15/07/2023 - 20/07/2023", "10/08/2023 - 15/08/2023"]
  }
];
