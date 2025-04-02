
import { Package } from "../types/packageTypes";

export const adventurePackages: Package[] = [
  {
    id: 2,
    title: "Aventura Completa",
    description: "Para os amantes da natureza e aventuras. Inclui trilhas, mergulho e passeios de barco.",
    image: "https://ibb.co/pmMT8sg",
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
  }
];
