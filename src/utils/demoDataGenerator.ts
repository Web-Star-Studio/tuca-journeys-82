import { Tour, Accommodation } from '@/types/database';

// Function to generate a single demo tour
const generateDemoTour = (id: number): Tour => {
  const imageUrls = [
    '/img/tour-1.jpg',
    '/img/tour-2.jpg',
    '/img/tour-3.jpg',
    '/img/tour-4.jpg',
    '/img/tour-5.jpg',
    '/img/tour-6.jpg',
  ];

  const titles = [
    'Aventura na Floresta Amazônica',
    'Explorando as Cataratas do Iguaçu',
    'Caminhada no Parque Nacional da Chapada Diamantina',
    'Descobrindo os Lençóis Maranhenses',
    'Passeio de Barco no Rio Negro',
    'Trilhas e Cachoeiras em Bonito'
  ];

  const descriptions = [
    'Embarque em uma jornada inesquecível pela densa e exuberante Floresta Amazônica, onde a biodiversidade se revela em cada trilha e a cultura local pulsa em cada encontro.',
    'Prepare-se para testemunhar a grandiosidade das Cataratas do Iguaçu, um espetáculo de águas poderosas e paisagens deslumbrantes que ficará gravado em sua memória para sempre.',
    'Desafie seus limites em uma emocionante caminhada pelo Parque Nacional da Chapada Diamantina, um paraíso de cânions, grutas e cachoeiras que testarão sua resistência e recompensarão sua audácia.',
    'Deixe-se encantar pela beleza surreal dos Lençóis Maranhenses, um deserto de dunas brancas e lagoas cristalinas que se estende até onde a vista alcança, proporcionando momentos de puro êxtase.',
    'Navegue pelas águas misteriosas do Rio Negro, um gigante da Amazônia que esconde segredos milenares e revela paisagens intocadas, onde a natureza reina em sua forma mais selvagem.',
    'Aventure-se por trilhas desafiadoras e refresque-se em cachoeiras revigorantes em Bonito, um destino que oferece uma combinação perfeita de aventura e relaxamento em meio à natureza exuberante.'
  ];

  const shortDescriptions = [
    'Aventure-se na Amazônia: trilhas, cultura e biodiversidade.',
    'Maravilhe-se com as Cataratas do Iguaçu: um espetáculo inesquecível.',
    'Desafie-se na Chapada Diamantina: cânions, grutas e cachoeiras.',
    'Encante-se nos Lençóis Maranhenses: dunas e lagoas cristalinas.',
    'Explore o Rio Negro: segredos milenares e paisagens intocadas.',
    'Descubra Bonito: aventura e relaxamento em meio à natureza.'
  ];

  const locations = [
    'Manaus, Amazonas',
    'Foz do Iguaçu, Paraná',
    'Lençóis, Bahia',
    'Barreirinhas, Maranhão',
    'Novo Airão, Amazonas',
    'Bonito, Mato Grosso do Sul'
  ];

  const categories = ['Aventura', 'Ecoturismo', 'Relaxamento', 'Cultural'];
  const difficulties = ['Fácil', 'Médio', 'Difícil'];

  return {
    id,
    title: titles[id % titles.length],
    description: descriptions[id % descriptions.length],
    short_description: shortDescriptions[id % shortDescriptions.length],
    duration: `${Math.floor(Math.random() * 7) + 1} dias`,
    price: Math.floor(Math.random() * 500) + 100,
    image_url: imageUrls[id % imageUrls.length],
    location: locations[id % locations.length],
    meeting_point: 'Local de encontro a combinar',
    is_available: Math.random() > 0.2,
    category: categories[id % categories.length],
    max_participants: Math.floor(Math.random() * 20) + 5,
    min_participants: 2,
    difficulty: difficulties[id % difficulties.length],
    rating: Math.floor(Math.random() * 5) + 1,
    schedule: ['Segunda a Sexta', 'Sábados e Domingos'],
    includes: ['Transporte', 'Hospedagem', 'Alimentação'],
    excludes: ['Bebidas', 'Taxas de entrada'],
    notes: ['Levar roupa confortável', 'Usar protetor solar'],
    gallery_images: imageUrls,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

// Function to generate a single demo accommodation
const generateDemoAccommodation = (id: number): Accommodation => {
  const imageUrls = [
    '/img/accommodation-1.jpg',
    '/img/accommodation-2.jpg',
    '/img/accommodation-3.jpg',
    '/img/accommodation-4.jpg',
    '/img/accommodation-5.jpg',
    '/img/accommodation-6.jpg',
  ];

  const titles = [
    'Hotel das Cataratas',
    'Pousada Canto das Águas',
    'Resort Chapada Diamantina',
    'Bangalôs da Amazônia',
    'Refúgio Ecológico Bonito',
    'Apart Hotel Maranhense'
  ];

  const descriptions = [
    'Hospede-se no luxuoso Hotel das Cataratas e desfrute de uma experiência inigualável em frente às majestosas Cataratas do Iguaçu, com serviços exclusivos e vistas panorâmicas de tirar o fôlego.',
    'Relaxe na charmosa Pousada Canto das Águas, um refúgio acolhedor em meio à natureza exuberante de Bonito, com acomodações confortáveis e atividades relaxantes para recarregar as energias.',
    'Desfrute de momentos inesquecíveis no Resort Chapada Diamantina, um oásis de conforto e lazer em meio aos cânions e cachoeiras da Bahia, com infraestrutura completa e serviços personalizados.',
    'Acomode-se nos exclusivos Bangalôs da Amazônia e viva uma experiência autêntica em contato com a natureza intocada da floresta, com acomodações rústicas e confortáveis e atividades de ecoturismo.',
    'Encontre a paz e a tranquilidade no Refúgio Ecológico Bonito, um paraíso sustentável em meio à natureza preservada do Mato Grosso do Sul, com acomodações charmosas e atividades de aventura.',
    'Sinta-se em casa no Apart Hotel Maranhense, um espaço moderno e funcional em Barreirinhas, com apartamentos equipados e serviços práticos para quem busca conforto e comodidade durante a estadia nos Lençóis Maranhenses.'
  ];

  const shortDescriptions = [
    'Luxo e vista panorâmica nas Cataratas do Iguaçu.',
    'Refúgio acolhedor e relaxante em Bonito.',
    'Conforto e lazer nos cânions da Chapada Diamantina.',
    'Experiência autêntica na natureza amazônica.',
    'Paraíso sustentável e aventura em Bonito.',
    'Conforto e praticidade nos Lençóis Maranhenses.'
  ];

  const locations = [
    'Foz do Iguaçu, Paraná',
    'Bonito, Mato Grosso do Sul',
    'Lençóis, Bahia',
    'Manaus, Amazonas',
    'Bonito, Mato Grosso do Sul',
    'Barreirinhas, Maranhão'
  ];

  const categories = ['Hotel', 'Pousada', 'Resort', 'Bangalô', 'Apart Hotel'];
  const types = ['Econômico', 'Médio', 'Luxo'];

  return {
    id,
    title: titles[id % titles.length],
    description: descriptions[id % descriptions.length],
    short_description: shortDescriptions[id % shortDescriptions.length],
    price_per_night: Math.floor(Math.random() * 300) + 50,
    image_url: imageUrls[id % imageUrls.length],
    location: locations[id % locations.length],
    address: 'Endereço a combinar',
    is_available: Math.random() > 0.2,
    category: categories[id % categories.length],
    type: types[id % types.length],
    bedrooms: Math.floor(Math.random() * 3) + 1,
    bathrooms: Math.floor(Math.random() * 2) + 1,
    max_guests: Math.floor(Math.random() * 4) + 2,
    amenities: ['Wi-Fi', 'Piscina', 'Café da manhã'],
    gallery_images: imageUrls,
    rating: Math.floor(Math.random() * 5) + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

// Function to generate multiple demo tours
export const generateDemoTours = (count: number = 6): Tour[] => {
  return Array.from({ length: count }, (_, i) => generateDemoTour(i + 1));
};

// Function to generate multiple demo accommodations
export const generateDemoAccommodations = (count: number = 6): Accommodation[] => {
  return Array.from({ length: count }, (_, i) => generateDemoAccommodation(i + 1));
};

// Add this export to make the file compile
export const demoData = {
  tours: generateDemoTours(),
  accommodations: generateDemoAccommodations()
};
