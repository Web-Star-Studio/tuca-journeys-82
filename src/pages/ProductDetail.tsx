
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ArrowLeft, 
  Truck, 
  Shield, 
  RefreshCw 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Sample products data (same as in Store.tsx)
const products = [
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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  
  // Find the product by ID
  const product = products.find(p => p.id === Number(id));
  
  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <p className="mb-6">O produto que você está procurando não existe.</p>
          <Button onClick={() => navigate("/loja")}>Voltar para a Loja</Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Find related products
  const relatedProducts = products.filter(p => product.related.includes(p.id));

  // Set default selected variation
  React.useEffect(() => {
    if (product.variations && product.variations.length > 0) {
      setSelectedVariation(product.variations[0]);
    }
  }, [product.id]);
  
  // Handle quantity changes
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/loja" className="flex items-center text-tuca-ocean-blue hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para a Loja
            </Link>
          </div>
          
          {/* Product details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="rounded-xl overflow-hidden bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-6">
                <span className="text-sm px-3 py-1 bg-tuca-green/10 text-tuca-green rounded-full">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-medium mb-3">{product.name}</h1>
              
              <div className="text-2xl font-medium text-tuca-ocean-blue mb-4">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </div>
              
              <p className="text-gray-700 mb-6">{product.longDescription}</p>
              
              <div className="mb-6">
                <p className="font-medium mb-2">Disponibilidade:</p>
                {product.inStock ? (
                  <span className="text-green-600 flex items-center">
                    <span className="w-3 h-3 bg-green-600 rounded-full mr-2"></span>
                    Em estoque
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
                    Fora de estoque
                  </span>
                )}
              </div>
              
              {product.variations && product.variations.length > 0 && (
                <div className="mb-6">
                  <p className="font-medium mb-2">Variação:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.map(variation => (
                      <Button
                        key={variation}
                        variant={selectedVariation === variation ? "default" : "outline"}
                        className={selectedVariation === variation ? "bg-tuca-ocean-blue text-white" : ""}
                        onClick={() => setSelectedVariation(variation)}
                      >
                        {variation}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <p className="font-medium mb-2">Quantidade:</p>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-4 text-lg">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={incrementQuantity}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-4 mb-8">
                <Button 
                  className="flex-1 py-6 bg-tuca-coral hover:bg-tuca-coral/90" 
                  disabled={!product.inStock}
                  onClick={() => {
                    // Will be implemented with actual cart functionality
                    alert(`${product.name} adicionado ao carrinho!`);
                  }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Adicionar ao Carrinho
                </Button>
                <Button variant="outline" size="icon" className="border-tuca-ocean-blue">
                  <Heart className="h-5 w-5 text-tuca-ocean-blue" />
                </Button>
                <Button variant="outline" size="icon" className="border-tuca-ocean-blue">
                  <Share2 className="h-5 w-5 text-tuca-ocean-blue" />
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-tuca-ocean-blue" />
                  <p className="text-sm">Entrega para todo Brasil</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-tuca-ocean-blue" />
                  <p className="text-sm">Garantia de qualidade</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="h-6 w-6 mx-auto mb-2 text-tuca-ocean-blue" />
                  <p className="text-sm">30 dias para devolução</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-medium mb-8">Produtos Relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <div
                    key={relatedProduct.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover-scale"
                  >
                    <div className="relative h-48">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-1">{relatedProduct.name}</h3>
                      <p className="text-tuca-ocean-blue font-bold mb-3">
                        R$ {relatedProduct.price.toFixed(2).replace('.', ',')}
                      </p>
                      <Button 
                        className="w-full"
                        onClick={() => navigate(`/loja/produto/${relatedProduct.id}`)}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
