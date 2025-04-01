
import { Package } from "../types/packageTypes";

export const premiumPackages: Package[] = [
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
  }
];
