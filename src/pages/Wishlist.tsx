
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Trash2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.title || item.name,
      price: item.price || item.price_per_night || 0,
      quantity: 1,
      image: item.image || item.image_url || '/placeholder.jpg',
      variation: item.type
    });
    toast.success(`${item.title || item.name} adicionado ao carrinho`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Meus Favoritos</h1>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium text-gray-600 mb-4">Sua lista de favoritos está vazia</h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Adicione tours, acomodações ou produtos à sua lista de favoritos para encontrá-los facilmente mais tarde
              </p>
              <Button asChild>
                <Link to="/tours">Explorar Tours</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <Card key={`${item.type}-${item.id}`} className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={item.image || '/placeholder.jpg'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-medium">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {item.type === 'tour' ? 'Tour' : 
                      item.type === 'accommodation' ? 'Acomodação' : 'Produto'}
                    </p>
                    <p className="font-medium text-tuca-ocean-blue">
                      {item.price ? `R$ ${item.price.toFixed(2)}` : ''}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" onClick={() => removeFromWishlist(item.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remover
                    </Button>
                    <Button size="sm" onClick={() => handleAddToCart(item)}>
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Adicionar
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

export default Wishlist;
