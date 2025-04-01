
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingCart, Filter } from "lucide-react";

// Sample products data
const products = [
  {
    id: 1,
    name: "Camiseta Eco Noronha",
    description: "Camiseta 100% algodão orgânico com estampa exclusiva de Fernando de Noronha.",
    image: "/product-tshirt.jpg",
    price: 89.90,
    category: "Vestuário",
  },
  {
    id: 2,
    name: "Caneca Morro Dois Irmãos",
    description: "Caneca de cerâmica com ilustração do famoso cartão postal de Fernando de Noronha.",
    image: "/product-mug.jpg",
    price: 49.90,
    category: "Acessórios",
  },
  {
    id: 3,
    name: "Chapéu de Palha Tuca",
    description: "Chapéu de palha artesanal, perfeito para proteger do sol durante seus passeios.",
    image: "/product-hat.jpg",
    price: 75.90,
    category: "Vestuário",
  },
  {
    id: 4,
    name: "Livro Fotográfico Noronha",
    description: "Um belíssimo livro com as mais incríveis fotografias do arquipélago.",
    image: "/product-book.jpg",
    price: 120.00,
    category: "Livros",
  },
  {
    id: 5,
    name: "Garrafa Térmica Tuca",
    description: "Mantenha sua água fresca durante os passeios com esta garrafa térmica ecológica.",
    image: "/placeholder.svg",
    price: 65.90,
    category: "Acessórios",
  },
  {
    id: 6,
    name: "Kit Snorkel Profissional",
    description: "Kit completo para mergulho com snorkel, máscara e nadadeiras.",
    image: "/placeholder.svg",
    price: 249.90,
    category: "Equipamentos",
  },
  {
    id: 7,
    name: "Bolsa de Praia Artesanal",
    description: "Bolsa de praia feita por artesãos locais com materiais sustentáveis.",
    image: "/placeholder.svg",
    price: 120.00,
    category: "Acessórios",
  },
  {
    id: 8,
    name: "Mapa Ilustrado de Noronha",
    description: "Belo mapa ilustrado de Fernando de Noronha, perfeito para decoração.",
    image: "/placeholder.svg",
    price: 85.00,
    category: "Souvenirs",
  },
];

// Available product categories
const categories = ["Todos", "Vestuário", "Acessórios", "Equipamentos", "Livros", "Souvenirs"];

const Store = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const navigate = useNavigate();

  // Filter products by category
  const filteredProducts = products.filter(product => {
    if (activeCategory === "Todos") return true;
    return product.category === activeCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative">
          <div 
            className="h-[40vh] bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-noronha-2.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Loja Tuca Noronha</h1>
                <p className="text-xl max-w-2xl mx-auto">
                  Leve um pouco do paraíso para casa com nossos produtos exclusivos
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Products Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            {/* Filter Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === activeCategory ? "default" : "outline"}
                  className={
                    category === activeCategory
                      ? "rounded-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white"
                      : "rounded-full text-foreground hover:bg-background hover:text-tuca-ocean-blue"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover-scale"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative overflow-hidden h-48 sm:h-56">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-tuca-green/80 text-white text-xs px-2 py-1 rounded">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-serif font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-tuca-deep-blue font-bold">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        className="w-full border-tuca-ocean-blue text-tuca-ocean-blue hover:bg-tuca-ocean-blue hover:text-white"
                        onClick={() => navigate(`/loja/produto/${product.id}`)}
                      >
                        Detalhes
                      </Button>
                      <Button 
                        className="w-full bg-tuca-coral hover:bg-tuca-coral/90 text-white flex items-center justify-center"
                        onClick={() => {
                          // Will be implemented with actual cart functionality
                          alert(`${product.name} adicionado ao carrinho!`);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Comprar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Store;
