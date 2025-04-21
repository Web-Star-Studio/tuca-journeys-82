
import React, { useState } from "react";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import CouponForm from "@/components/partner/coupons/CouponForm";
import { useCurrentPartner } from "@/hooks/use-partner";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tag, Plus, Edit, Trash2, Copy, Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

// Interface simulada para cupons
interface Coupon {
  id: number;
  code: string;
  discount_percentage: number;
  valid_from: string;
  valid_until: string;
  min_purchase_amount: number | null;
  max_uses: number | null;
  current_uses: number;
  description: string | null;
  partner_id: string;
  created_at: string;
  applicable_to: string[] | null;
}

const PartnerCoupons = () => {
  const { toast } = useToast();
  const { data: partner } = useCurrentPartner();
  const [isNewCouponDialogOpen, setIsNewCouponDialogOpen] = useState(false);
  const [isEditCouponDialogOpen, setIsEditCouponDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState<Coupon | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  // Para demonstração, geramos cupons simulados
  const generateMockCoupons = () => {
    const now = new Date();
    const pastDate = new Date(now);
    pastDate.setMonth(pastDate.getMonth() - 1);

    const futureDate = new Date(now);
    futureDate.setMonth(futureDate.getMonth() + 1);

    const farFutureDate = new Date(now);
    farFutureDate.setMonth(farFutureDate.getMonth() + 2);

    return [
      {
        id: 1,
        code: "VERAO2025",
        discount_percentage: 15,
        valid_from: now.toISOString(),
        valid_until: futureDate.toISOString(),
        min_purchase_amount: 200,
        max_uses: 50,
        current_uses: 12,
        description: "Cupom de verão 2025.",
        partner_id: partner?.id || "",
        created_at: pastDate.toISOString(),
        applicable_to: null,
      },
      {
        id: 2,
        code: "BEM-VINDO",
        discount_percentage: 10,
        valid_from: pastDate.toISOString(),
        valid_until: farFutureDate.toISOString(),
        min_purchase_amount: null,
        max_uses: null,
        current_uses: 35,
        description: "Cupom de boas-vindas para novos clientes.",
        partner_id: partner?.id || "",
        created_at: pastDate.toISOString(),
        applicable_to: null,
      },
      {
        id: 3,
        code: "PROMO50",
        discount_percentage: 50,
        valid_from: pastDate.toISOString(),
        valid_until: pastDate.toISOString(),
        min_purchase_amount: 500,
        max_uses: 10,
        current_uses: 10,
        description: "Promoção especial - 50% de desconto.",
        partner_id: partner?.id || "",
        created_at: pastDate.toISOString(),
        applicable_to: null,
      },
    ];
  };

  const mockCoupons = generateMockCoupons();

  const activeCoupons = mockCoupons.filter(
    (coupon) => new Date(coupon.valid_until) >= new Date()
  );
  const expiredCoupons = mockCoupons.filter(
    (coupon) => new Date(coupon.valid_until) < new Date()
  );

  const handleCreateCoupon = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Simulação de uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Cupom criado",
        description: `Cupom ${data.code} criado com sucesso.`,
      });
      setIsNewCouponDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o cupom.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCoupon = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Simulação de uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Cupom atualizado",
        description: `Cupom ${data.code} atualizado com sucesso.`,
      });
      setIsEditCouponDialogOpen(false);
      setCurrentCoupon(null);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o cupom.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCoupon = async () => {
    if (!currentCoupon) return;
    
    try {
      // Simulação de uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Cupom excluído",
        description: `Cupom ${currentCoupon.code} excluído com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o cupom.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setCurrentCoupon(null);
    }
  };

  const handleCopyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Código copiado",
      description: `Código ${code} copiado para a área de transferência.`,
    });
  };

  const handleEditClick = (coupon: Coupon) => {
    setCurrentCoupon(coupon);
    setIsEditCouponDialogOpen(true);
  };

  const handleDeleteClick = (coupon: Coupon) => {
    setCurrentCoupon(coupon);
    setIsDeleteDialogOpen(true);
  };

  return (
    <PartnerLayout pageTitle="Cupons de Desconto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">
            Gerenciar Cupons de Desconto
          </CardTitle>
          <Button 
            onClick={() => setIsNewCouponDialogOpen(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Novo Cupom
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="active" className="flex items-center gap-1">
                <Tag className="h-4 w-4" /> Cupons Ativos
                <Badge variant="secondary" className="ml-1">{activeCoupons.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="expired" className="flex items-center gap-1">
                <Tag className="h-4 w-4" /> Cupons Expirados
                <Badge variant="secondary" className="ml-1">{expiredCoupons.length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {activeCoupons.length > 0 ? (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Desconto</TableHead>
                        <TableHead>Validade</TableHead>
                        <TableHead>Usos</TableHead>
                        <TableHead>Valor Mín.</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeCoupons.map((coupon) => (
                        <TableRow key={coupon.id}>
                          <TableCell className="font-medium">
                            {coupon.code}
                          </TableCell>
                          <TableCell>{coupon.discount_percentage}%</TableCell>
                          <TableCell>
                            <div className="text-xs">
                              <p>De: {format(new Date(coupon.valid_from), "dd/MM/yyyy")}</p>
                              <p>Até: {format(new Date(coupon.valid_until), "dd/MM/yyyy")}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {coupon.current_uses}
                            {coupon.max_uses ? `/${coupon.max_uses}` : ""}
                          </TableCell>
                          <TableCell>
                            {coupon.min_purchase_amount ? `R$ ${coupon.min_purchase_amount.toFixed(2)}` : "-"}
                          </TableCell>
                          <TableCell className="text-right flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCopyToClipboard(coupon.code)}
                              title="Copiar código"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditClick(coupon)}
                              title="Editar cupom"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(coupon)}
                              className="text-red-500 hover:text-red-600"
                              title="Excluir cupom"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Tag className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Nenhum cupom ativo</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-4">
                    Você ainda não criou nenhum cupom de desconto ou todos os seus cupons estão expirados.
                  </p>
                  <Button onClick={() => setIsNewCouponDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-1" /> Criar Cupom
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="expired">
              {expiredCoupons.length > 0 ? (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Desconto</TableHead>
                        <TableHead>Validade</TableHead>
                        <TableHead>Usos</TableHead>
                        <TableHead>Valor Mín.</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expiredCoupons.map((coupon) => (
                        <TableRow key={coupon.id} className="opacity-70">
                          <TableCell className="font-medium">
                            {coupon.code}
                          </TableCell>
                          <TableCell>{coupon.discount_percentage}%</TableCell>
                          <TableCell>
                            <div className="text-xs">
                              <p>De: {format(new Date(coupon.valid_from), "dd/MM/yyyy")}</p>
                              <p>Até: {format(new Date(coupon.valid_until), "dd/MM/yyyy")}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {coupon.current_uses}
                            {coupon.max_uses ? `/${coupon.max_uses}` : ""}
                          </TableCell>
                          <TableCell>
                            {coupon.min_purchase_amount ? `R$ ${coupon.min_purchase_amount.toFixed(2)}` : "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => {
                                const validFrom = new Date();
                                const validUntil = new Date();
                                validUntil.setMonth(validUntil.getMonth() + 1);
                                
                                // Clonar cupom para edição com novas datas
                                setCurrentCoupon({
                                  ...coupon,
                                  valid_from: validFrom.toISOString(),
                                  valid_until: validUntil.toISOString(),
                                  current_uses: 0
                                });
                                setIsEditCouponDialogOpen(true);
                              }}
                            >
                              Renovar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Check className="h-12 w-12 mx-auto text-green-500 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Nenhum cupom expirado</h3>
                  <p className="text-gray-500">Todos os seus cupons estão válidos.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog para criar novo cupom */}
      <Dialog open={isNewCouponDialogOpen} onOpenChange={setIsNewCouponDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Cupom</DialogTitle>
            <DialogDescription>
              Preencha os detalhes para criar um novo cupom de desconto.
            </DialogDescription>
          </DialogHeader>
          <CouponForm
            onSubmit={handleCreateCoupon}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog para editar cupom */}
      <Dialog open={isEditCouponDialogOpen} onOpenChange={setIsEditCouponDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Cupom</DialogTitle>
            <DialogDescription>
              Atualize os detalhes do cupom de desconto.
            </DialogDescription>
          </DialogHeader>
          {currentCoupon && (
            <CouponForm
              onSubmit={handleEditCoupon}
              initialData={{
                code: currentCoupon.code,
                discount_percentage: currentCoupon.discount_percentage,
                valid_from: new Date(currentCoupon.valid_from),
                valid_until: new Date(currentCoupon.valid_until),
                min_purchase_amount: currentCoupon.min_purchase_amount,
                max_uses: currentCoupon.max_uses,
                description: currentCoupon.description || "",
                applicable_to: currentCoupon.applicable_to || [],
              }}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmar exclusão */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o cupom{" "}
              <span className="font-medium">{currentCoupon?.code}</span>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDeleteCoupon}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PartnerLayout>
  );
};

export default PartnerCoupons;
