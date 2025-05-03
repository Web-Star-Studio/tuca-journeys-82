
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductImage from "@/components/product/ProductImage";
import ProductBenefits from "@/components/product/ProductBenefits";
import ProductActions from "@/components/product/ProductActions";
import { useWishlist } from "@/contexts/WishlistContext";
import Footer from "@/components/Footer";
import { Product } from "@/types/product";
import { toast } from "sonner";

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
        image_url: "/products/camiseta.jpg",
        category: "Vestuário",
        stock: 10,
        featured: true,
        benefits: ["Algodão orgânico", "Design exclusivo", "Confortável"],
        gallery: [],
        status: 'active',
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

  const relatedProductsData: Product[] = [
    {
      id: 2,
      name: "Boné Tuca Noronha",
      description: "Boné com a logo da Tuca Noronha",
      price: 49.9,
      image_url: "/products/bone.jpg",
      category: "Acessórios",
      stock: 5,
      featured: false,
      status: 'active',
      gallery: [],
    },
    {
      id: 3,
      name: "Caneca Tuca Noronha",
      description: "Caneca para você tomar seu café",
      price: 29.9,
      image_url: "/products/caneca.jpg",
      category: "Acessórios",
      stock: 20,
      featured: false,
      status: 'active',
      gallery: [],
    },
  ];

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist(product.id, 'product')) {
      removeFromWishlist(product.id, 'product');
      toast.info("Produto removido dos favoritos");
    } else {
      addToWishlist({
        id: product.id,
        type: 'product',
        title: product.name,
        image: product.image_url
      });
      toast.success("Produto adicionado aos favoritos");
    }
  };

  const handleAddToCart = (quantity: number) => {
    toast.success(`${quantity} unidade(s) de ${product.name} adicionado(s) ao carrinho`);
    // Implement actual cart functionality here
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImage product={product} />
          <div>
            <h1 className="text-3xl font-medium mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <ProductActions 
              product={product}
              isInWishlist={isInWishlist(product.id, 'product')}
              toggleWishlist={handleWishlistToggle}
              addToCart={handleAddToCart}
            />
            
            <ProductBenefits benefits={product.benefits || []} />
          </div>
        </div>
        <RelatedProducts products={relatedProductsData} />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
