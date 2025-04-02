
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

// Sample products data
const products = [
  {
    id: 1,
    name: "Camiseta Eco Noronha",
    description: "Camiseta 100% algodão orgânico com estampa exclusiva de Fernando de Noronha.",
    image: "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png",
    price: 89.90,
    category: "Vestuário",
  },
  {
    id: 2,
    name: "Caneca Morro Dois Irmãos",
    description: "Caneca de cerâmica com ilustração do famoso cartão postal de Fernando de Noronha.",
    image: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png",
    price: 49.90,
    category: "Acessórios",
  },
  {
    id: 3,
    name: "Chapéu de Palha Tuca",
    description: "Chapéu de palha artesanal, perfeito para proteger do sol durante seus passeios.",
    image: "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png",
    price: 75.90,
    category: "Vestuário",
  },
  {
    id: 4,
    name: "Livro Fotográfico Noronha",
    description: "Um belíssimo livro com as mais incríveis fotografias do arquipélago.",
    image: "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png",
    price: 120.00,
    category: "Livros",
  },
];

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Nossa Loja</h2>
        <p className="section-subtitle">
          Leve um pouco de Fernando de Noronha para casa com nossos produtos exclusivos
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover-scale"
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
                  <Link to={`/loja/produto/${product.id}`}>
                    <Button variant="outline" className="w-full border-tuca-ocean-blue text-tuca-ocean-blue hover:bg-tuca-ocean-blue hover:text-white">
                      Detalhes
                    </Button>
                  </Link>
                  <Button className="w-full bg-tuca-coral hover:bg-tuca-coral/90 text-white flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Comprar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/loja">
            <Button
              variant="outline"
              className="border-tuca-deep-blue text-tuca-deep-blue hover:bg-tuca-deep-blue hover:text-white"
            >
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
