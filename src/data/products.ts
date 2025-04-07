
export const products = [
  {
    id: 1,
    name: "Camiseta Eco Noronha",
    description: "Camiseta 100% algodão orgânico com estampa exclusiva de Fernando de Noronha.",
    longDescription: "Feita com algodão 100% orgânico, esta camiseta exclusiva apresenta uma estampa artística de Fernando de Noronha. Cada peça é produzida sob demanda para reduzir o desperdício e tem um percentual da venda destinado à preservação do arquipélago. Disponível em vários tamanhos e cores, é a lembrança perfeita da sua viagem ao paraíso.",
    image: "/product-tshirt.jpg",
    price: 89.90,
    category: "Vestuário",
    inStock: true,
    variations: ["P", "M", "G", "GG"],
    related: [2, 3, 7]
  },
  {
    id: 2,
    name: "Caneca Morro Dois Irmãos",
    description: "Caneca de cerâmica com ilustração do famoso cartão postal de Fernando de Noronha.",
    longDescription: "Esta caneca de cerâmica apresenta uma bela ilustração do Morro Dois Irmãos, o cartão postal mais famoso de Fernando de Noronha. Ideal para começar seu dia relembrando os momentos especiais no arquipélago. Pode ser utilizada no micro-ondas e na lava-louças.",
    image: "/product-mug.jpg",
    price: 49.90,
    category: "Acessórios",
    inStock: true,
    variations: ["300ml", "450ml"],
    related: [1, 8]
  },
  {
    id: 3,
    name: "Chapéu de Palha Tuca",
    description: "Chapéu de palha artesanal, perfeito para proteger do sol durante seus passeios.",
    longDescription: "Produzido por artesãos locais, este chapéu de palha é perfeito para proteger do sol durante seus passeios em Fernando de Noronha. Leve, confortável e dobrável, é fácil de transportar em sua bagagem. Cada peça é única e tem um toque artesanal que representa a cultura local.",
    image: "/product-hat.jpg",
    price: 75.90,
    category: "Vestuário",
    inStock: true,
    variations: ["Único"],
    related: [1, 7]
  },
  {
    id: 4,
    name: "Livro Fotográfico Noronha",
    description: "Um belíssimo livro com as mais incríveis fotografias do arquipélago.",
    longDescription: "Este livro de capa dura apresenta uma coleção de fotografias espetaculares de Fernando de Noronha, capturadas por fotógrafos profissionais que dedicaram anos ao estudo do arquipélago. Com 120 páginas em papel de alta qualidade, o livro também inclui informações sobre a história, a geologia e a biodiversidade da ilha.",
    image: "/product-book.jpg",
    price: 120.00,
    category: "Livros",
    inStock: true,
    variations: ["Capa Dura"],
    related: [8, 2]
  },
  {
    id: 5,
    name: "Garrafa Térmica Tuca",
    description: "Mantenha sua água fresca durante os passeios com esta garrafa térmica ecológica.",
    longDescription: "Fabricada com materiais ecológicos e livres de BPA, esta garrafa térmica mantém suas bebidas frias por até 24 horas ou quentes por até 12 horas. Com capacidade de 500ml, é perfeita para levar em seus passeios. Sua compra contribui para a redução do uso de plástico descartável na ilha.",
    image: "/placeholder.svg",
    price: 65.90,
    category: "Acessórios",
    inStock: true,
    variations: ["500ml", "750ml"],
    related: [2, 7]
  },
  {
    id: 6,
    name: "Kit Snorkel Profissional",
    description: "Kit completo para mergulho com snorkel, máscara e nadadeiras.",
    longDescription: "Este kit profissional inclui tudo o que você precisa para explorar os recifes de corais de Fernando de Noronha: máscara com visão panorâmica, snorkel com válvula anti-spray e nadadeiras ajustáveis. Fabricado com materiais de alta qualidade, este kit garante conforto e durabilidade para suas aventuras subaquáticas.",
    image: "/placeholder.svg",
    price: 249.90,
    category: "Equipamentos",
    inStock: false,
    variations: ["P/M", "G/GG"],
    related: [5, 7]
  },
  {
    id: 7,
    name: "Bolsa de Praia Artesanal",
    description: "Bolsa de praia feita por artesãos locais com materiais sustentáveis.",
    longDescription: "Esta bolsa de praia é produzida por artesãos locais usando fibras naturais e materiais reciclados. Espaçosa e resistente, é perfeita para levar seus pertences à praia ou para usar como souvenir do seu tempo em Fernando de Noronha. Cada peça é única e apresenta pequenas variações que destacam seu caráter artesanal.",
    image: "/placeholder.svg",
    price: 120.00,
    category: "Acessórios",
    inStock: true,
    variations: ["Único"],
    related: [3, 1]
  },
  {
    id: 8,
    name: "Mapa Ilustrado de Noronha",
    description: "Belo mapa ilustrado de Fernando de Noronha, perfeito para decoração.",
    longDescription: "Este mapa ilustrado de Fernando de Noronha é uma obra de arte que mostra as principais praias, pontos turísticos e características geográficas do arquipélago. Impresso em papel de alta qualidade, é perfeito para decorar sua casa ou escritório e relembrar suas aventuras na ilha. Disponível em vários tamanhos, pode ser adquirido com ou sem moldura.",
    image: "/placeholder.svg",
    price: 85.00,
    category: "Souvenirs",
    inStock: true,
    variations: ["A4", "A3", "A2"],
    related: [4, 2]
  },
];

export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  price: number;
  category: string;
  inStock: boolean;
  variations?: string[];
  related: number[];
}

export const findRelatedProducts = (product: Product) => {
  return products.filter(p => product.related.includes(p.id));
};
