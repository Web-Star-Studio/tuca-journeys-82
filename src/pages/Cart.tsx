
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium text-center mb-2">
              Seu Carrinho
            </h1>
            <p className="text-center text-muted-foreground mb-12">
              Revise seus itens antes de prosseguir para o checkout
            </p>
            
            {cart.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <h2 className="text-xl font-medium mb-4">Seu carrinho está vazio</h2>
                <p className="text-muted-foreground mb-6">
                  Explore nossos passeios, hospedagens e produtos para adicionar ao seu carrinho
                </p>
                <Button onClick={() => navigate('/tours')}>
                  Ver Passeios
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {item.image && (
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-16 h-16 object-cover rounded-md mr-4"
                                />
                              )}
                              <div>
                                <div className="font-medium text-gray-900">{item.name}</div>
                                <div className="text-sm text-gray-500">{item.type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            R$ {item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <button 
                                className="p-1 rounded-md hover:bg-gray-100"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                -
                              </button>
                              <span className="mx-2 w-8 text-center">{item.quantity}</span>
                              <button 
                                className="p-1 rounded-md hover:bg-gray-100"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button 
                              className="text-red-600 hover:text-red-900"
                              onClick={() => removeItem(item.id)}
                            >
                              Remover
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">Subtotal:</span>
                    <span className="text-lg font-medium">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => navigate('/tours')}>
                      Continuar Comprando
                    </Button>
                    <Button onClick={handleCheckout}>
                      Finalizar Compra
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
