
export interface PointData {
  id: string;
  name: string;
  coordinates: [number, number];
  category: string;
  description?: string;
  icon?: string;
  color?: string;
  price?: number;
  rating?: number | null;
  url?: string;
  image?: string;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  tags?: string[];
  isHidden?: boolean;
  featured?: boolean;
}

export const NORONHA_CENTER: [number, number] = [-32.426, -3.854];

export const getMapData = () => {
  const data: PointData[] = [
    {
      id: "praia-do-sancho",
      name: "Praia do Sancho",
      coordinates: [-32.436, -3.851],
      category: "Praia",
      description: "Considerada uma das praias mais bonitas do mundo.",
      icon: "beach",
      color: "#f44336",
      url: "/lugares/praia-do-sancho",
      image: "/tour-sunset.jpg",
      location: "Costa Oeste da Ilha",
      featured: true,
    },
    {
      id: "baia-dos-porcos",
      name: "Baía dos Porcos",
      coordinates: [-32.439, -3.849],
      category: "Praia",
      description: "Famosa por suas piscinas naturais e vista deslumbrante.",
      icon: "beach",
      color: "#e91e63",
      url: "/lugares/baia-dos-porcos",
      image: "/tour-underwater.jpg",
      location: "Costa Oeste da Ilha",
    },
    {
      id: "forte-nossa-senhora-dos-remedios",
      name: "Forte Nossa Senhora dos Remédios",
      coordinates: [-32.418, -3.847],
      category: "História",
      description: "Construção histórica com vista panorâmica.",
      icon: "castle",
      color: "#9c27b0",
      url: "/lugares/forte-nossa-senhora-dos-remedios",
      image: "/hero-noronha-1.jpg",
      location: "Vila dos Remédios",
      tags: ["histórico", "arquitetura", "colonial"],
    },
    {
      id: "museu-do-tubarao",
      name: "Museu do Tubarão",
      coordinates: [-32.419, -3.852],
      category: "Museu",
      description: "Informações e exposições sobre a vida marinha local.",
      icon: "museum",
      color: "#673ab7",
      url: "/lugares/museu-do-tubarao",
      image: "/tour-diving.jpg",
      location: "Vila dos Remédios",
    },
    {
      id: "cacimba-do-padre",
      name: "Cacimba do Padre",
      coordinates: [-32.447, -3.853],
      category: "Praia",
      description: "Praia extensa com ondas propícias para o surf.",
      icon: "beach",
      color: "#3f51b5",
      url: "/lugares/cacimba-do-padre",
      image: "/tour-trail.jpg",
      location: "Costa Sul da Ilha",
    },
  ];
  return data;
};
