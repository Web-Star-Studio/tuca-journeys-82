
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductImage from "@/components/product/ProductImage";
import ProductControls from "@/components/product/ProductControls";
import ProductActions from "@/components/product/ProductActions";
import ProductBenefits from "@/components/product/ProductBenefits";
import RelatedProducts from "@/components/product/RelatedProducts";
import { products, findRelatedProducts } from "@/data/products";

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
  const relatedProducts = findRelatedProducts(product);

  // Set default selected variation
  useEffect(() => {
    if (product.variations && product.variations.length > 0) {
      setSelectedVariation(product.variations[0]);
    }
  }, [product.id, product.variations]);
  
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
            <ProductImage image={product.image} name={product.name} />
            
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
              
              <ProductControls 
                variations={product.variations}
                selectedVariation={selectedVariation}
                setSelectedVariation={setSelectedVariation}
                quantity={quantity}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                inStock={product.inStock}
              />
              
              <ProductActions 
                productName={product.name}
                inStock={product.inStock}
              />
              
              <ProductBenefits />
            </div>
          </div>
          
          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
