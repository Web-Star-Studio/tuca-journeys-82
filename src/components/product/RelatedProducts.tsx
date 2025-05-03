
import React from 'react';
import { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils/formatters';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-6">Produtos Relacionados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link to={`/loja/${product.id}`} key={product.id}>
            <Card className="h-full overflow-hidden hover:shadow-md transition-all">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-2 mb-1">{product.name}</h3>
                <p className="text-tuca-ocean-blue font-semibold">
                  {formatCurrency(product.price)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
