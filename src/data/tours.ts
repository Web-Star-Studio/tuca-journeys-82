
export interface Tour {
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
  active?: boolean;
  inclusions?: string[];
  exclusions?: string[];
  schedule?: string[];
  requirements?: string[];
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
    featured: true,
    inclusions: ["Guia especializado", "Equipamentos de segurança", "Bebidas não alcoólicas", "Snacks"],
    exclusions: ["Transporte até o porto", "Bebidas alcoólicas", "Refeições completas"],
    schedule: ["16:30 - Encontro no porto", "17:00 - Embarque e instruções de segurança", "17:15 - Navegação com paradas para fotos", "19:30 - Retorno ao porto"],
    requirements: ["Protetor solar", "Roupa de banho", "Toalha", "Câmera fotográfica (opcional)"]
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
    featured: true,
    inclusions: ["Equipamento completo de mergulho", "Instrutor certificado", "Transporte ao local", "Água mineral"],
    exclusions: ["Fotos submarinas (serviço adicional)", "Refeições"],
    schedule: ["08:00 - Encontro no centro de mergulho", "08:30 - Treinamento básico e instruções", "09:15 - Deslocamento para a Baía dos Porcos", "09:45 - Mergulho", "11:30 - Retorno"],
    requirements: ["Saber nadar", "Não ter problemas respiratórios graves", "Estar em boas condições físicas"]
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
    featured: true,
    inclusions: ["Guia local", "Água mineral (1 garrafa por pessoa)", "Lanche leve"],
    exclusions: ["Transporte até o início da trilha", "Equipamentos de trekking", "Refeições"],
    schedule: ["06:30 - Encontro no ponto de partida", "06:45 - Início da trilha", "08:00 - Chegada ao primeiro mirante", "09:30 - Chegada ao topo", "11:00 - Início do retorno", "12:00 - Chegada ao ponto inicial"],
    requirements: ["Calçado apropriado para trilhas", "Protetor solar", "Chapéu/boné", "Repelente", "Mochila pequena para água e lanches"]
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
    featured: true,
    inclusions: ["Buggy com motorista/guia", "Combustível", "Paradas para fotos", "Água mineral"],
    exclusions: ["Taxa de preservação ambiental", "Ingressos para atrações", "Refeições"],
    schedule: ["09:00 - Saída da Vila dos Remédios", "09:30 - Praia do Leão", "10:30 - Mirante dos Golfinhos", "12:00 - Almoço (não incluso)", "13:30 - Praia do Sancho", "15:00 - Praias da Baía dos Porcos", "16:00 - Retorno"],
    requirements: ["Documento de identidade", "Protetor solar", "Óculos de sol", "Dinheiro para taxas e refeições"]
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
    featured: false,
    inclusions: ["Guia especializado", "Binóculos para observação", "Material informativo"],
    exclusions: ["Transporte até o mirante", "Refeições e bebidas"],
    schedule: ["07:30 - Encontro no Centro de Visitantes", "08:00 - Caminhada até o mirante", "08:30-09:30 - Observação dos golfinhos com explicações do guia", "10:00 - Retorno"],
    requirements: ["Calçado confortável", "Protetor solar", "Roupas leves", "Máquina fotográfica com zoom (recomendado)"]
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
    featured: false,
    inclusions: ["Prancha e equipamentos", "Instrutor profissional", "Orientações de segurança"],
    exclusions: ["Transporte até a praia", "Protetor solar", "Toalhas"],
    schedule: ["09:00 - Encontro na escola de surf", "09:15 - Orientações teóricas e aquecimento", "09:30 - Prática na água", "10:45 - Encerramento e dicas finais"],
    requirements: ["Saber nadar", "Roupa de banho", "Disposição para se divertir"]
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
    featured: false,
    inclusions: ["Guia historiador", "Entrada no forte", "Material informativo"],
    exclusions: ["Transporte", "Alimentação", "Souvenirs"],
    schedule: ["14:00 - Encontro na entrada do Forte", "14:15 - Início do tour guiado", "15:30 - Tempo livre para fotos", "16:00 - Encerramento"],
    requirements: ["Calçado confortável", "Protetor solar", "Água"]
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
    featured: false,
    inclusions: ["Equipamento de snorkel", "Guia especializado", "Instruções básicas"],
    exclusions: ["Transporte", "Alimentação", "Fotos subaquáticas"],
    schedule: ["13:00 - Encontro no ponto de apoio", "13:15 - Distribuição de equipamentos e instruções", "13:45 - Atividade de snorkel", "15:30 - Retorno ao ponto de apoio"],
    requirements: ["Saber nadar", "Roupa de banho", "Toalha", "Protetor solar biodegradável"]
  }
];
