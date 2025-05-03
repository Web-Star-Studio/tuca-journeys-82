import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/data/products";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductBenefits } from "@/components/product/ProductBenefits";
import { ProductActions } from "@/components/product/ProductActions";
import { useWishlist } from "@/contexts/WishlistContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    // Mock product data fetching
    const mockFetch = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock product data
      const mockProduct: Product = {
        id: 1,
        name: "Camiseta Tuca Noronha",
        description:
          "Camiseta de algodão orgânico com design exclusivo da Tuca Noronha. Confortável e estilosa para você aproveitar ao máximo sua viagem.",
        price: 79.9,
        image: "/products/camiseta.jpg",
        category: "Vestuário",
        inStock: true,
        benefits: ["Algodão orgânico", "Design exclusivo", "Confortável"],
        relatedProducts: [2, 3],
      };

      setProduct(mockProduct);
    };

    mockFetch();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando detalhes do produto...
      </div>
    );
  }

  const relatedProductsData = [
    {
      id: 2,
      name: "Boné Tuca Noronha",
      description: "Boné com a logo da Tuca Noronha",
      price: 49.9,
      image: "/products/bone.jpg",
      category: "Acessórios",
      inStock: true,
    },
    {
      id: 3,
      name: "Caneca Tuca Noronha",
      description: "Caneca para você tomar seu café",
      price: 29.9,
      image: "/products/caneca.jpg",
      category: "Acessórios",
      inStock: true,
    },
  ];

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist(product.id, 'product')) {
      removeFromWishlist(product.id, 'product');
    } else {
      addToWishlist({
        id: product.id,
        type: 'product',
        title: product.name,
        image: product.image
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImage image={product.image} name={product.name} />
          <div>
            <h1 className="text-3xl font-medium mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="text-tuca-ocean-blue text-xl font-medium mb-4">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </div>
            <ProductActions productName={product.name} inStock={product.inStock} />
            <ProductBenefits />
          </div>
        </div>
        <RelatedProducts products={relatedProductsData} />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
