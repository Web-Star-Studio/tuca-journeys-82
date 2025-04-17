
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/contexts/WishlistContext";

const Loja = () => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = (id: number, name: string, image: string) => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        type: 'product',
        name,
        image
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Nossa Loja
          </h1>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Leve um pouco de Fernando de Noronha para casa com nossos produtos exclusivos.
            Temos souvenirs, roupas e acessórios feitos por artistas e artesãos locais.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="tuca" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <button 
                    onClick={() => handleWishlistToggle(product.id, product.name, product.image)}
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-tuca-deep-blue font-bold">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to={`/loja/${product.id}`}>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Loja;
