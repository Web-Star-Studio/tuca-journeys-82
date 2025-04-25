
interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  rating: number;
  image: string;
  maxParticipants: number;
  minParticipants: number;
  category: string;
  featured: boolean;
}

export const tours: Tour[] = [
  {
    id: 1,
    title: "Passeio de Barco ao Pôr do Sol",
    description: "Navegue pelas águas cristalinas e aprecie o espetacular pôr do sol em Fernando de Noronha.",
    price: 350,
    duration: "3 horas",
    location: "Porto de Santo Antônio",
    rating: 4.9,
    image: "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png",
    maxParticipants: 12,
    minParticipants: 4,
    category: "Barco",
    featured: true
  },
  {
    id: 2,
    title: "Mergulho na Baía dos Porcos",
    description: "Explore a vida marinha única da Baía dos Porcos, um dos pontos mais famosos para mergulho em Fernando de Noronha.",
    price: 480,
    duration: "4 horas",
    location: "Baía dos Porcos",
    rating: 5.0,
    image: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
    maxParticipants: 8,
    minParticipants: 2,
    category: "Mergulho",
    featured: true
  },
  {
    id: 3,
    title: "Trilha Morro Dois Irmãos",
    description: "Caminhe pela icônica trilha que leva ao mirante do Morro Dois Irmãos, com vista panorâmica da ilha.",
    price: 120,
    duration: "5 horas",
    location: "Trilha Dois Irmãos",
    rating: 4.7,
    image: "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png",
    maxParticipants: 15,
    minParticipants: 2,
    category: "Trilha",
    featured: true
  },
  {
    id: 4,
    title: "Passeio de Buggy pela Ilha",
    description: "Aventure-se em um passeio de buggy pelas estradas de Noronha, visitando as principais praias e mirantes.",
    price: 300,
    duration: "6 horas",
    location: "Vila dos Remédios",
    rating: 4.8,
    image: "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png",
    maxParticipants: 4,
    minParticipants: 1,
    category: "Terrestre",
    featured: true
  },
  {
    id: 5,
    title: "Observação de Golfinhos",
    description: "Observe golfinhos em seu habitat natural na famosa Baía dos Golfinhos.",
    price: 220,
    duration: "2 horas",
    location: "Baía dos Golfinhos",
    rating: 4.9,
    image: "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png",
    maxParticipants: 10,
    minParticipants: 2,
    category: "Ecológico",
    featured: false
  },
  {
    id: 6,
    title: "Aula de Surf",
    description: "Aprenda ou aperfeiçoe suas habilidades no surf com instrutores experientes nas ondas perfeitas de Noronha.",
    price: 150,
    duration: "1.5 horas",
    location: "Praia da Cacimba do Padre",
    rating: 4.6,
    image: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
    maxParticipants: 6,
    minParticipants: 1,
    category: "Aquático",
    featured: false
  },
  {
    id: 7,
    title: "Tour Histórico pelo Forte",
    description: "Conheça a história de Fernando de Noronha através de um passeio guiado pelo Forte de Nossa Senhora dos Remédios.",
    price: 90,
    duration: "2 horas",
    location: "Forte Nossa Senhora dos Remédios",
    rating: 4.5,
    image: "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png",
    maxParticipants: 20,
    minParticipants: 5,
    category: "Histórico",
    featured: false
  },
  {
    id: 8,
    title: "Snorkeling na Praia do Sancho",
    description: "Explore os recifes de corais e a rica vida marinha da Praia do Sancho com equipamentos de snorkel.",
    price: 140,
    duration: "3 horas",
    location: "Praia do Sancho",
    rating: 4.8,
    image: "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png",
    maxParticipants: 12,
    minParticipants: 2,
    category: "Aquático",
    featured: false
  }
];
