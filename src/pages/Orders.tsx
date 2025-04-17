
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Search, Package, ShoppingBag, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const mockOrders = [
  {
    id: '1001',
    date: '2023-04-10',
    total: 157.90,
    status: 'entregue',
    items: [
      { name: 'Camiseta Noronha', quantity: 1, price: 79.90 },
      { name: 'Chaveiro', quantity: 2, price: 39.00 }
    ]
  },
  {
    id: '1002',
    date: '2023-03-25',
    total: 235.50,
    status: 'processando',
    items: [
      { name: 'Livro Fernando de Noronha', quantity: 1, price: 145.50 },
      { name: 'Boné', quantity: 1, price: 90.00 }
    ]
  },
  {
    id: '1003',
    date: '2023-03-05',
    total: 59.90,
    status: 'cancelado',
    items: [
      { name: 'Caneca Souvenir', quantity: 1, price: 59.90 }
    ]
  }
];

// Status badge variants
const statusVariants = {
  entregue: 'success',
  processando: 'warning',
  cancelado: 'destructive'
};

const Orders = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');

  // Filter orders based on search term and status
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.includes(searchTerm) || 
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Meus Pedidos</h1>
            
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar pedidos..."
                  className="pl-10 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="entregue">Entregue</SelectItem>
                  <SelectItem value="processando">Processando</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-medium text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Nenhum pedido encontrado' 
                  : 'Você ainda não fez nenhum pedido'}
              </h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchTerm || statusFilter !== 'all'
                  ? 'Tente ajustar seus filtros de busca'
                  : 'Explore nossa loja e faça seu primeiro pedido!'}
              </p>
              <Button asChild>
                <Link to="/shop">Ir para a Loja</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b">
                      <div>
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium">Pedido #{order.id}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(order.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3 sm:mt-0">
                        <Badge 
                          variant={statusVariants[order.status as keyof typeof statusVariants] as any || 'default'}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        
                        <div className="text-right">
                          <div className="font-medium">
                            R$ {order.total.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{item.name}</span>
                              <span className="text-gray-500 text-sm"> x{item.quantity}</span>
                            </div>
                            <div>R$ {item.price.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button asChild size="sm">
                          <Link to={`/orders/${order.id}`}>Ver Detalhes</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
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

export default Orders;
