
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRestaurantDetails, useRestaurantAdmin } from '@/hooks/use-restaurants';
import {
  ArrowLeft,
  Edit,
  Trash,
  AlertCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import RestaurantFormDialog from '@/components/admin/restaurant/RestaurantFormDialog';
import TableManagement from '@/components/admin/restaurant/TableManagement';
import ReservationCalendar from '@/components/admin/restaurant/ReservationCalendar';
import ReservationList from '@/components/admin/restaurant/ReservationList';
import { useRestaurantReservations } from '@/hooks/use-restaurants';

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = id ? parseInt(id) : 0;
  const navigate = useNavigate();

  const { restaurant, tables, isLoading } = useRestaurantDetails(restaurantId);
  const { updateReservationStatus, reservations, isLoading: reservationsLoading } = 
    useRestaurantReservations(restaurantId);

  const { deleteRestaurant } = useRestaurantAdmin();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('visao-geral');

  if (isLoading) {
    return (
      <AdminLayout pageTitle="Detalhes do Restaurante">
        <div className="p-6 text-center">
          <div className="animate-pulse flex flex-col space-y-4 items-center">
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
            <div className="h-48 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!restaurant) {
    return (
      <AdminLayout pageTitle="Restaurante não encontrado">
        <div className="p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Restaurante não encontrado</h2>
            <p className="text-muted-foreground mb-6">
              O restaurante solicitado não foi encontrado ou foi excluído
            </p>
            <Button onClick={() => navigate('/admin/restaurants')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Lista de Restaurantes
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const handleDeleteConfirm = () => {
    deleteRestaurant(restaurantId);
    setIsDeleteDialogOpen(false);
    navigate('/admin/restaurants');
  };

  const handleStatusChange = (reservationId: number, status: string) => {
    updateReservationStatus({ id: reservationId, status });
  };
  
  const filteredReservations = reservations?.filter(reservation => {
    return reservation.reservation_date === format(selectedDate, 'yyyy-MM-dd');
  }) || [];

  return (
    <AdminLayout pageTitle={`Restaurante: ${restaurant.name}`}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/restaurants')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <Badge className={restaurant.is_active ? "bg-green-600" : "bg-gray-500"}>
              {restaurant.is_active ? 'Ativo' : 'Inativo'}
            </Badge>
            {restaurant.is_featured && (
              <Badge variant="outline" className="border-amber-500 text-amber-700">
                Destaque
              </Badge>
            )}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsFormDialogOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="mesas">Mesas</TabsTrigger>
            <TabsTrigger value="reservas">Reservas</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          {/* Tab: Overview */}
          <TabsContent value="visao-geral">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Informações do Restaurante</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Tipo de Cozinha</h3>
                      <p>{restaurant.cuisine_type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Faixa de Preço</h3>
                      <p>{restaurant.price_range}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Descrição Curta</h3>
                    <p>{restaurant.short_description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Descrição Completa</h3>
                    <p className="whitespace-pre-line">{restaurant.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Endereço</h3>
                    <p>{restaurant.address}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Métodos de Pagamento</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {(restaurant.payment_methods || []).map((method, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Imagem</CardTitle>
                </CardHeader>
                <CardContent>
                  {restaurant.image_url ? (
                    <img 
                      src={restaurant.image_url} 
                      alt={restaurant.name} 
                      className="w-full h-48 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Sem imagem</p>
                    </div>
                  )}
                  
                  {restaurant.gallery_images && restaurant.gallery_images.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Galeria</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {restaurant.gallery_images.slice(0, 6).map((img, idx) => (
                          <img 
                            key={idx}
                            src={img} 
                            alt={`Galeria ${idx + 1}`}
                            className="w-full h-14 object-cover rounded-sm"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Horários de Funcionamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {restaurant.opening_hours && Object.entries(restaurant.opening_hours)
                    .map(([day, hours]) => {
                      const dayNames: Record<string, string> = {
                        monday: 'Segunda-feira',
                        tuesday: 'Terça-feira',
                        wednesday: 'Quarta-feira',
                        thursday: 'Quinta-feira',
                        friday: 'Sexta-feira',
                        saturday: 'Sábado',
                        sunday: 'Domingo'
                      };
                      
                      return (
                        <div key={day} className="flex justify-between py-1 border-b">
                          <span>{dayNames[day] || day}</span>
                          <span>
                            {hours.open && hours.close
                              ? `${hours.open} - ${hours.close}`
                              : 'Fechado'}
                          </span>
                        </div>
                      );
                    })}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Mesas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between py-1 border-b">
                    <span>Total de Mesas</span>
                    <span className="font-medium">{tables?.length || 0}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span>Capacidade Total</span>
                    <span className="font-medium">
                      {tables?.reduce((sum, table) => sum + table.capacity, 0) || 0} lugares
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span>Mesas Disponíveis</span>
                    <span className="font-medium">
                      {tables?.filter(table => table.is_active).length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span>Capacidade Disponível</span>
                    <span className="font-medium">
                      {tables?.filter(table => table.is_active)
                        .reduce((sum, table) => sum + table.capacity, 0) || 0} lugares
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Tables */}
          <TabsContent value="mesas">
            <TableManagement />
          </TabsContent>

          {/* Tab: Reservations */}
          <TabsContent value="reservas">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <ReservationCalendar onDateSelect={setSelectedDate} />
              </div>
              
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Reservas para {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </CardTitle>
                    <CardDescription>
                      Total: {filteredReservations.length} reservas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReservationList 
                      reservations={filteredReservations}
                      isLoading={reservationsLoading}
                      onStatusChange={handleStatusChange}
                      onViewDetails={() => {}}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab: Settings */}
          <TabsContent value="configuracoes">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Restaurante</CardTitle>
                <CardDescription>
                  Configurações e políticas para o restaurante
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Política de Reservas</h3>
                  <p className="whitespace-pre-line">{restaurant.reservation_policy || 'Nenhuma política definida'}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Restaurant Edit Dialog */}
      <RestaurantFormDialog
        isOpen={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        restaurant={restaurant}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o restaurante
              "{restaurant.name}" e todas as informações associadas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default RestaurantDetail;
