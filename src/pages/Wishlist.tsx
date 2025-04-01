
import React from "react";
import { Link } from "react-router-dom";
import { Heart, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tours } from "@/data/tours";
import { accommodations } from "@/data/accommodations";
import { packages } from "@/data/packages";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (id: number, type: string) => {
    // Find the item details based on type
    if (type === 'tour') {
      const tour = tours.find(t => t.id === id);
      if (tour) {
        addItem({
          id: tour.id,
          name: tour.title,
          price: tour.price,
          quantity: 1,
          image: tour.image,
          variation: 'Passeio'
        });
      }
    } else if (type === 'accommodation') {
      const accommodation = accommodations.find(a => a.id === id);
      if (accommodation) {
        addItem({
          id: accommodation.id,
          name: accommodation.name,
          price: accommodation.price,
          quantity: 1,
          image: accommodation.images[0],
          variation: 'Hospedagem'
        });
      }
    } else if (type === 'package') {
      const pkg = packages.find(p => p.id === id);
      if (pkg) {
        addItem({
          id: pkg.id,
          name: pkg.title,
          price: pkg.price,
          quantity: 1,
          image: pkg.image,
          variation: 'Pacote'
        });
      }
    } else if (type === 'product') {
      // For products, we'd need a products data file
      // This is placeholder logic
      console.log(`Adding product ${id} to cart`);
    }
  };

  // Get destination URLs based on item type
  const getItemUrl = (id: number, type: string) => {
    switch (type) {
      case 'tour':
        return `/passeios/${id}`;
      case 'accommodation':
        return `/hospedagens/${id}`;
      case 'package':
        return `/pacotes/${id}`;
      case 'product':
        return `/loja/${id}`;
      default:
        return '#';
    }
  };

  // Get type label in Portuguese
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'tour':
        return 'Passeio';
      case 'accommodation':
        return 'Hospedagem';
      case 'package':
        return 'Pacote';
      case 'product':
        return 'Produto';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold">
              Minha Lista de Desejos
            </h1>
            {wishlistItems.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearWishlist}
                className="text-gray-500 hover:text-gray-700"
              >
                Limpar Lista
              </Button>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-medium mb-2">Sua lista de desejos está vazia</h2>
              <p className="text-gray-500 mb-6">
                Adicione itens à sua lista de desejos para salvar experiências que você deseja vivenciar
              </p>
              <Link to="/passeios">
                <Button className="bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90">
                  Explorar Passeios
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div 
                  key={`${item.type}-${item.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-48">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button
                        onClick={() => removeFromWishlist(item.id, item.type)}
                        className="bg-white/90 hover:bg-white rounded-full p-1.5 text-gray-700 hover:text-red-500 transition-colors"
                        aria-label="Remover da lista de desejos"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <span className="absolute bottom-3 left-3 bg-tuca-light-blue text-tuca-deep-blue text-xs px-2 py-1 rounded-full">
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                  <div className="p-4">
                    <Link to={getItemUrl(item.id, item.type)}>
                      <h3 className="text-lg font-medium mb-2 hover:text-tuca-ocean-blue transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center mt-4">
                      <Link 
                        to={getItemUrl(item.id, item.type)}
                        className="text-tuca-ocean-blue hover:underline"
                      >
                        Ver Detalhes
                      </Link>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(item.id, item.type)}
                        className="bg-tuca-coral hover:bg-tuca-coral/90"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Adicionar
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

export default Wishlist;
