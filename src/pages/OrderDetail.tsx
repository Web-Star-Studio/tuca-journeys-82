
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChevronLeft,
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock order data
const mockOrders = {
  '1001': {
    id: '1001',
    date: '2023-04-10',
    total: 157.90,
    status: 'entregue',
    paymentMethod: 'Cartão de Crédito',
    paymentStatus: 'Aprovado',
    shippingAddress: {
      name: 'João Silva',
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    tracking: {
      code: 'BR123456789',
      url: '#',
      history: [
        { date: '2023-04-10', status: 'Entregue', description: 'Pedido entregue ao destinatário' },
        { date: '2023-04-08', status: 'Em Rota', description: 'Pedido saiu para entrega' },
        { date: '2023-04-06', status: 'Enviado', description: 'Pedido enviado' },
        { date: '2023-04-05', status: 'Processando', description: 'Pedido em preparação' },
        { date: '2023-04-04', status: 'Pagamento Confirmado', description: 'Pagamento aprovado' }
      ]
    },
    items: [
      { id: 1, name: 'Camiseta Noronha', quantity: 1, price: 79.90, image: '/product-tshirt.jpg' },
      { id: 2, name: 'Chaveiro', quantity: 2, price: 39.00, image: '/product-mug.jpg' }
    ]
  },
  '1002': {
    id: '1002',
    date: '2023-03-25',
    total: 235.50,
    status: 'processando',
    paymentMethod: 'Pix',
    paymentStatus: 'Aprovado',
    shippingAddress: {
      name: 'João Silva',
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    tracking: {
      code: null,
      url: null,
      history: [
        { date: '2023-03-25', status: 'Processando', description: 'Pedido em preparação' },
        { date: '2023-03-25', status: 'Pagamento Confirmado', description: 'Pagamento aprovado' }
      ]
    },
    items: [
      { id: 3, name: 'Livro Fernando de Noronha', quantity: 1, price: 145.50, image: '/product-book.jpg' },
      { id: 4, name: 'Boné', quantity: 1, price: 90.00, image: '/product-hat.jpg' }
    ]
  },
  '1003': {
    id: '1003',
    date: '2023-03-05',
    total: 59.90,
    status: 'cancelado',
    paymentMethod: 'Boleto',
    paymentStatus: 'Reembolsado',
    shippingAddress: {
      name: 'João Silva',
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    tracking: {
      code: null,
      url: null,
      history: [
        { date: '2023-03-07', status: 'Cancelado', description: 'Pedido cancelado pelo cliente' },
        { date: '2023-03-05', status: 'Aguardando Pagamento', description: 'Aguardando confirmação do pagamento' }
      ]
    },
    items: [
      { id: 5, name: 'Caneca Souvenir', quantity: 1, price: 59.90, image: '/product-mug.jpg' }
    ]
  }
};

// Status badge variants
const statusVariants = {
  entregue: { variant: 'success', icon: CheckCircle2 },
  processando: { variant: 'warning', icon: Clock },
  cancelado: { variant: 'destructive', icon: X }
};

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const order = id ? mockOrders[id as keyof typeof mockOrders] : null;

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20 py-12">
          <div className="container mx-auto px-4 text-center">
            <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
            <h1 className="text-3xl font-bold mb-4">Pedido não encontrado</h1>
            <p className="mb-6 text-gray-600">
              O pedido que você está procurando não existe ou foi removido.
            </p>
            <Button asChild>
              <Link to="/orders">Voltar para Meus Pedidos</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const StatusIcon = statusVariants[order.status as keyof typeof statusVariants]?.icon || AlertCircle;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/orders">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Voltar para Pedidos
              </Link>
            </Button>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold flex items-center">
                  Pedido #{order.id}
                  <Badge 
                    variant={statusVariants[order.status as keyof typeof statusVariants]?.variant as any || 'default'}
                    className="ml-3 text-xs"
                  >
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </h1>
                
                <div className="flex items-center mt-2 text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Realizado em {new Date(order.date).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              
              {order.status !== 'cancelado' && (
                <Button variant="outline">
                  {order.status === 'entregue' ? 'Comprar Novamente' : 'Cancelar Pedido'}
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Itens do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y">
                    {order.items.map((item) => (
                      <li key={item.id} className="py-4 flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded border bg-gray-50">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">Quantidade: {item.quantity}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">R$ {item.price.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">
                            {item.quantity > 1 && `R$ ${(item.price / item.quantity).toFixed(2)} cada`}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">R$ {order.total.toFixed(2)}</span>
                </CardFooter>
              </Card>
              
              {/* Tracking History */}
              <Card>
                <CardHeader>
                  <CardTitle>Histórico do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="relative border-l border-gray-200 ml-3">
                    {order.tracking.history.map((event, index) => (
                      <li key={index} className="mb-6 ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -left-3 ring-8 ring-white">
                          {index === 0 ? (
                            <StatusIcon className={`h-4 w-4 ${
                              order.status === 'entregue' ? 'text-green-500' : 
                              order.status === 'processando' ? 'text-amber-500' : 'text-red-500'
                            }`} />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                          )}
                        </span>
                        <h3 className="font-medium">{event.status}</h3>
                        <time className="block mb-1 text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString('pt-BR')}
                        </time>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </li>
                    ))}
                  </ol>
                  
                  {order.tracking.code && (
                    <div className="mt-4 p-3 bg-gray-50 rounded flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">Código de rastreamento:</div>
                        <div className="font-medium">{order.tracking.code}</div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={order.tracking.url || '#'} target="_blank" rel="noopener noreferrer">
                          <Truck className="h-4 w-4 mr-2" />
                          Rastrear
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>R$ {order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Frete</span>
                    <span>Grátis</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-medium">
                    <span>Total</span>
                    <span>R$ {order.total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{order.paymentMethod}</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full mr-2 ${
                      order.paymentStatus === 'Aprovado' ? 'bg-green-500' : 
                      order.paymentStatus === 'Reembolsado' ? 'bg-blue-500' : 'bg-amber-500'
                    }`}></div>
                    <span>{order.paymentStatus}</span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Endereço de Entrega</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="font-medium">{order.shippingAddress.name}</div>
                  <div>{order.shippingAddress.street}</div>
                  <div>
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}
                  </div>
                  <div>{order.shippingAddress.country}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetail;
