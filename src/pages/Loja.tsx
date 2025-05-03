import React, { useState } from "react";
import { Product } from "@/types/product";
import { productService } from "@/services/product-service";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/formatters";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Loja = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await productService.getProducts();
    },
  });

  const handleWishlistToggle = (
    e: React.MouseEvent,
    productId: number,
    productName: string,
    productImage: string
  ) => {
    e.preventDefault();
    if (isInWishlist(productId, "product")) {
      removeFromWishlist(productId, "product");
    } else {
      addToWishlist({
        id: productId,
        type: "product",
        title: productName,
        image: productImage,
      });
    }
  };

  const filteredProducts = products
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">Loja</h1>
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="mt-4 w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {isLoading ? (
            <p className="text-center">Carregando produtos...</p>
          ) : error ? (
            <p className="text-center text-red-500">
              Erro ao carregar produtos.
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center">Nenhum produto encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isProductInWishlist = isInWishlist(product.id, "product");
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <Link to={`/loja/${product.id}`}>
                      <div className="relative">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        {product.featured && (
                          <div className="absolute top-2 left-2 bg-tuca-ocean-blue text-white text-xs py-1 px-2 rounded-full">
                            Destaque
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600">{product.description}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-tuca-ocean-blue font-bold">
                            {formatCurrency(product.price)}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="p-4 flex justify-end">
                      <button
                        onClick={(e) =>
                          handleWishlistToggle(
                            e,
                            product.id,
                            product.name,
                            product.image_url
                          )
                        }
                        className={`p-2 rounded-full transition-colors ${
                          isProductInWishlist
                            ? "bg-red-100 text-red-500 hover:bg-red-200"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            isProductInWishlist ? "fill-red-500" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Loja;
