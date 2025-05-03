
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const navigate = useNavigate();
  
  if (products.length === 0) {
    return null;
  }
  
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-medium mb-8">Produtos Relacionados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover-scale"
          >
            <div className="relative h-48">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1">{product.name}</h3>
              <p className="text-tuca-ocean-blue font-bold mb-3">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
              <Button 
                className="w-full"
                onClick={() => navigate(`/loja/${product.id}`)}
              >
                Ver Detalhes
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
