import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { listProducts } from "@/services/product-service";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatters";
import { useWishlist } from "@/contexts/WishlistContext";
import SafeImage from "@/components/ui/safe-image";

const Loja = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await listProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar produtos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id, 'product')) {
      removeFromWishlist(product.id, 'product');
    } else {
      addToWishlist({
        id: product.id,
        type: 'product',
        title: product.name,
        image: product.image_url
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Nossa Loja</h1>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center">Carregando produtos...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <Link to={`/loja/${product.id}`}>
                    <div className="relative aspect-square">
                      <SafeImage
                        src={product.image_url}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                      {product.is_new && (
                        <Badge className="absolute top-2 left-2 bg-tuca-ocean-blue text-white">
                          Novo
                        </Badge>
                      )}
                    </div>
                  </Link>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4">
                    <div className="text-tuca-ocean-blue font-bold">
                      {formatCurrency(product.price)}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleWishlistToggle(product)}
                    >
                      {isInWishlist(product.id, 'product') ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Loja;
