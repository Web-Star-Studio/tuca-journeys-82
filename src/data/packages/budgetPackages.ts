
import { Package } from "../types/packageTypes";

export const budgetPackages: Package[] = [
  {
    id: 5,
    title: "Noronha Econômico",
    description: "Pacote com ótimo custo-benefício para conhecer as principais atrações de Fernando de Noronha.",
    image: "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png",
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
  }
];
