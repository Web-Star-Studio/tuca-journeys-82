import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Loja = () => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Extract all unique categories from products
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'featured' - keep original order
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, sortBy]);

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
        {/* Hero Section */}
        <div className="relative mb-10">
          <div 
            className="h-[30vh] bg-cover bg-center relative"
            style={{ backgroundImage: "url('/hero-noronha-2.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                  Loja Tuca Noronha
                </h1>
                <p className="text-lg max-w-2xl mx-auto">
                  Leve um pouco de Fernando de Noronha para casa com nossos produtos exclusivos
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
              <div className="w-full md:w-auto flex items-center relative">
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-full md:w-80"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </Button>
                
                <div className="w-full md:w-auto">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Em Destaque</SelectItem>
                      <SelectItem value="price-asc">Menor Preço</SelectItem>
                      <SelectItem value="price-desc">Maior Preço</SelectItem>
                      <SelectItem value="name-asc">A-Z</SelectItem>
                      <SelectItem value="name-desc">Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {showFilters && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Filtrar por</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedCategory === category
                          ? "bg-tuca-ocean-blue text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === "all" ? "Todos" : category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Results count */}
            <div className="text-sm text-gray-500 mt-2">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-500 mb-4">Tente outros filtros ou termos de busca.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Loja;
