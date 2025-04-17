
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, ShoppingCart, Check, Truck, RotateCcw, Star, Share2 } from "lucide-react";
import { products, findRelatedProducts, Product } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    // Find product by ID
    const foundProduct = products.find(p => p.id === Number(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Set default selected variation
      if (foundProduct.variations && foundProduct.variations.length > 0) {
        setSelectedVariation(foundProduct.variations[0]);
      }
      
      // Get related products
      const related = findRelatedProducts(foundProduct);
      setRelatedProducts(related);
    }
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [id]);

  // Handle quantity changes
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        type: 'product',
        name: product.name,
        image: product.image
      });
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      variation: selectedVariation || undefined
    });
    
    toast.success("Produto adicionado ao carrinho", {
      description: `${quantity} × ${product.name} foi adicionado ao seu carrinho`
    });
  };
  
  // If loading, show skeleton
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-gray-200 animate-pulse rounded-lg h-[400px]"></div>
              <div>
                <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="h-6 w-1/3 bg-gray-200 animate-pulse rounded mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
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
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-6">
                <Badge className="text-sm px-3 py-1 bg-tuca-green/10 text-tuca-green rounded-full">
                  {product.category}
                </Badge>
                {product.inStock ? (
                  <Badge className="ml-2 text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    Em estoque
                  </Badge>
                ) : (
                  <Badge className="ml-2 text-sm px-3 py-1 bg-red-100 text-red-800 rounded-full">
                    Fora de estoque
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-medium mb-3">{product.name}</h1>
              
              <div className="text-2xl font-medium text-tuca-ocean-blue mb-4">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </div>
              
              <p className="text-gray-700 mb-6">{product.longDescription}</p>
              
              {/* Variations */}
              {product.variations && product.variations.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Variação</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.map(variation => (
                      <Button
                        key={variation}
                        type="button"
                        variant={selectedVariation === variation ? "default" : "outline"}
                        className={selectedVariation === variation ? "bg-tuca-ocean-blue" : ""}
                        onClick={() => setSelectedVariation(variation)}
                      >
                        {variation}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Quantidade</h3>
                <div className="flex items-center">
                  <Button
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-4 w-8 text-center">{quantity}</span>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={incrementQuantity}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  className="flex-1 bg-tuca-coral hover:bg-tuca-coral/90 text-white"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? "Adicionar ao Carrinho" : "Produto Indisponível"}
                </Button>
                
                <Button
                  variant="outline" 
                  size="lg"
                  className={`flex items-center justify-center ${
                    isInWishlist(product.id) 
                      ? "bg-red-50 border-red-200 text-red-500" 
                      : ""
                  }`}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`h-5 w-5 ${
                    isInWishlist(product.id) ? "fill-red-500" : ""
                  }`} />
                  <span className="ml-2">
                    {isInWishlist(product.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                  </span>
                </Button>
              </div>
              
              {/* Product Benefits */}
              <div className="border-t border-b border-gray-200 py-6 space-y-4">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-tuca-ocean-blue mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Entrega em Todo Brasil</h4>
                    <p className="text-sm text-gray-500">Enviamos para qualquer lugar do Brasil</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <RotateCcw className="h-5 w-5 text-tuca-ocean-blue mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">30 Dias para Troca ou Devolução</h4>
                    <p className="text-sm text-gray-500">Não gostou? Devolvemos seu dinheiro</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-tuca-ocean-blue mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Produtos Originais</h4>
                    <p className="text-sm text-gray-500">Todos os produtos são originais e de qualidade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-medium mb-6">Produtos Relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <div
                    key={relatedProduct.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                  >
                    <Link to={`/loja/${relatedProduct.id}`} className="block">
                      <div className="relative overflow-hidden h-40">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="text-xs">
                            {relatedProduct.category}
                          </Badge>
                        </div>
                      </div>
                    </Link>

                    <div className="p-4">
                      <h3 className="font-medium text-base mb-1">
                        <Link to={`/loja/${relatedProduct.id}`}>
                          {relatedProduct.name}
                        </Link>
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-tuca-deep-blue font-medium">
                          R$ {relatedProduct.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
