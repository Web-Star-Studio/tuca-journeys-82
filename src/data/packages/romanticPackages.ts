
import { Package } from "../types/packageTypes";

export const romanticPackages: Package[] = [
  {
    id: 1,
    title: "Escapada Romântica",
    description: "Um pacote perfeito para casais que desejam vivenciar momentos inesquecíveis em Fernando de Noronha.",
    image: "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png",
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
    id: 6,
    title: "Lua de Mel em Noronha",
    description: "Pacote especial para recém-casados com experiências românticas e exclusivas no paraíso.",
    image: "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png",
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
