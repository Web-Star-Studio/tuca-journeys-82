
import { Event } from "@/types/event";

// Sample events data
export const events: Event[] = [
  {
    id: 1,
    name: "Festival de Gastronomia e Cultura",
    description: "Um festival com os melhores pratos da culinária local de Fernando de Noronha, apresentações culturais e música ao vivo.",
    image_url: "/hero-noronha-2.jpg",
    date: "2024-08-15",
    start_time: "18:00",
    end_time: "23:00",
    location: "Praia do Porto",
    price: 60.00,
    category: "Gastronomia",
    capacity: 200,
    available_spots: 120,
    status: "scheduled",
    organizer: "Secretaria de Turismo de Fernando de Noronha",
    featured: true
  },
  {
    id: 2,
    name: "Corrida Ecológica de Noronha",
    description: "Corrida de 10km pelas trilhas e praias do arquipélago, promovendo conscientização ambiental e bem-estar.",
    image_url: "/tour-trail.jpg",
    date: "2024-09-10",
    start_time: "07:00",
    end_time: "10:30",
    location: "Porto de Santo Antônio",
    price: 85.00,
    category: "Esporte",
    capacity: 150,
    available_spots: 82,
    status: "scheduled",
    organizer: "Associação de Atletas de Fernando de Noronha"
  },
  {
    id: 3,
    name: "Workshop de Fotografia Submarina",
    description: "Aprenda técnicas de fotografia submarina com profissionais experientes em um dos locais com maior biodiversidade marinha do Brasil.",
    image_url: "/tour-underwater.jpg",
    date: "2024-07-25",
    start_time: "09:00",
    end_time: "16:00",
    location: "Marina do Sueste",
    price: 350.00,
    category: "Workshop",
    capacity: 20,
    available_spots: 12,
    status: "scheduled",
    organizer: "Instituto Marinho de Noronha"
  },
  {
    id: 4,
    name: "Observação de Tartarugas Marinhas",
    description: "Evento especial para observação da desova de tartarugas marinhas com biólogos especializados.",
    image_url: "/tour-turtles.jpg",
    date: "2024-09-22",
    start_time: "19:00",
    end_time: "22:00",
    location: "Praia do Leão",
    price: 120.00,
    category: "Ecoturismo",
    capacity: 30,
    available_spots: 15,
    status: "scheduled",
    organizer: "Projeto TAMAR",
    featured: true
  },
  {
    id: 5,
    name: "Sunset Yoga na Praia",
    description: "Sessão de yoga ao pôr do sol em uma das mais belas praias do arquipélago.",
    image_url: "/tour-sunset.jpg",
    date: "2024-08-05",
    start_time: "17:30",
    end_time: "19:00",
    location: "Praia do Sancho",
    price: 50.00,
    category: "Bem-estar",
    capacity: 25,
    available_spots: 8,
    status: "scheduled",
    organizer: "Centro de Yoga Noronha"
  },
  {
    id: 6,
    name: "Palestra: Preservação dos Recifes de Coral",
    description: "Palestra educativa sobre a importância e os desafios da preservação dos recifes de coral em Fernando de Noronha.",
    image_url: "/tour-diving.jpg",
    date: "2024-07-18",
    start_time: "19:00",
    end_time: "21:00",
    location: "Centro de Visitantes do ICMBio",
    price: 0.00,
    category: "Educação Ambiental",
    capacity: 80,
    available_spots: 35,
    status: "scheduled",
    organizer: "ICMBio - Fernando de Noronha"
  }
];

// Available event categories
export const categories = ["Todas", "Gastronomia", "Esporte", "Workshop", "Ecoturismo", "Bem-estar", "Educação Ambiental"];
