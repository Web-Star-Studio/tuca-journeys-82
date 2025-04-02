
import { Package } from "../types/packageTypes";

export const familyPackages: Package[] = [
  {
    id: 3,
    title: "Família em Noronha",
    description: "Pacote ideal para famílias descobrirem as maravilhas de Fernando de Noronha com conforto e segurança.",
    image: "https://ibb.co/fzbqbfHG",
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
  }
];
