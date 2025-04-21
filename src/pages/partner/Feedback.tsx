
import React, { useState } from "react";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  Star,
  Search,
  ThumbsUp,
  ThumbsDown,
  Mail,
  Calendar,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentPartner } from "@/hooks/use-partner";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Feedback {
  id: number;
  customerName: string;
  customerEmail: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  itemName: string;
  bookingId: number;
  status: "responded" | "pending" | "flagged";
  response?: string;
}

const PartnerFeedback = () => {
  const { toast } = useToast();
  const { data: partner } = useCurrentPartner();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  // Generate mock feedback data
  const generateMockFeedback = () => {
    const names = ["João Silva", "Maria Santos", "Carlos Oliveira", "Ana Pereira", "Pedro Costa"];
    const emails = ["joao@example.com", "maria@example.com", "carlos@example.com", "ana@example.com", "pedro@example.com"];
    const avatars = ["A", "B", "C", "D", "E"];
    const comments = [
      "Excelente experiência! Voltarei em breve.",
      "Adorei o serviço, mas poderia melhorar a comunicação.",
      "Achei o preço um pouco alto para o que é oferecido.",
      "Atendimento perfeito do início ao fim.",
      "O local é lindo, mas tive problemas com a limpeza.",
    ];
    
    const businessTypeMap = {
      'accommodation': ["Quarto Standard", "Suíte Premium", "Chalé Família"],
      'tour': ["Passeio de Barco", "Trilha Ecológica", "Mergulho"],
      'vehicle': ["SUV Compacto", "Carro Econômico", "Van Executiva"],
      'event': ["Workshop de Fotografia", "Festival de Música", "Exposição de Arte"],
      'product': ["Kit Souvenirs", "Camiseta Local", "Artesanato"],
      'restaurant': ["Jantar Especial", "Almoço Executivo", "Café da Manhã"],
      'service': ["Massagem Relaxante", "Consultoria", "Translado"],
    };
    
    const businessType = partner?.business_type || 'product';
    const itemNames = businessTypeMap[businessType as keyof typeof businessTypeMap] || businessTypeMap.product;
    
    return Array.from({ length: 15 }, (_, i) => {
      const randomRating = Math.floor(Math.random() * 5) + 1;
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomEmail = emails[Math.floor(Math.random() * emails.length)];
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
      const randomComment = comments[Math.floor(Math.random() * comments.length)];
      const randomItemName = itemNames[Math.floor(Math.random() * itemNames.length)];
      
      // Create date within the last 30 days
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      const statuses: ("responded" | "pending" | "flagged")[] = ["responded", "pending", "flagged"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: i + 1,
        customerName: randomName,
        customerEmail: randomEmail,
        avatar: randomAvatar,
        rating: randomRating,
        comment: randomComment,
        date: date.toISOString(),
        itemName: randomItemName,
        bookingId: 1000 + i,
        status: randomStatus,
        response: randomStatus === "responded" ? "Obrigado pelo seu feedback!" : undefined,
      };
    });
  };

  const mockFeedback = generateMockFeedback();

  // Filter feedback based on search and filters
  const filteredFeedback = mockFeedback.filter((feedback) => {
    const matchesSearch =
      feedback.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.itemName.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending") return matchesSearch && feedback.status === "pending";
    if (activeTab === "responded") return matchesSearch && feedback.status === "responded";
    if (activeTab === "flagged") return matchesSearch && feedback.status === "flagged";
    return matchesSearch;
  });

  const handleReply = () => {
    if (!selectedFeedback || !replyMessage.trim()) return;

    // In a real implementation, this would send the reply to an API
    toast({
      title: "Resposta enviada",
      description: "Sua resposta foi enviada para o cliente.",
    });

    setIsReplyDialogOpen(false);
    setReplyMessage("");
    setSelectedFeedback(null);
  };

  // Calculate average rating
  const averageRating =
    mockFeedback.length > 0
      ? (
          mockFeedback.reduce((acc, curr) => acc + curr.rating, 0) /
          mockFeedback.length
        ).toFixed(1)
      : "0.0";

  // Count by rating
  const ratingCounts = mockFeedback.reduce(
    (acc, curr) => {
      acc[curr.rating] += 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "responded":
        return <Badge variant="outline" className="text-green-600 border-green-600">Respondido</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-600 border-amber-600">Pendente</Badge>;
      case "flagged":
        return <Badge variant="outline" className="text-red-600 border-red-600">Sinalizado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <PartnerLayout pageTitle="Feedbacks">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Avaliação Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-bold">{averageRating}</span>
              <div className="flex">
                {renderStars(Math.round(Number(averageRating)))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Baseado em {mockFeedback.length} avaliações
            </p>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Distribuição de Avaliações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="w-16 flex items-center">
                    <span className="mr-1">{rating}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-yellow-400 h-2.5 rounded-full"
                      style={{
                        width: `${
                          (ratingCounts[rating as keyof typeof ratingCounts] /
                            mockFeedback.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm w-10 text-right">
                    {ratingCounts[rating as keyof typeof ratingCounts]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg mb-2">Feedback dos Clientes</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, comentário..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">
                Todos ({mockFeedback.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pendentes ({mockFeedback.filter(f => f.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="responded">
                Respondidos ({mockFeedback.filter(f => f.status === "responded").length})
              </TabsTrigger>
              <TabsTrigger value="flagged">
                Sinalizados ({mockFeedback.filter(f => f.status === "flagged").length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {filteredFeedback.length > 0 ? (
            <div className="space-y-4">
              {filteredFeedback.map((feedback) => (
                <Card key={feedback.id} className="overflow-hidden">
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{feedback.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{feedback.customerName}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {feedback.customerEmail}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(feedback.status)}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {renderStars(feedback.rating)}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(feedback.date), "dd/MM/yyyy")}
                      </div>
                    </div>
                    <h4 className="font-medium text-sm mb-1">
                      {feedback.itemName} - Reserva #{feedback.bookingId}
                    </h4>
                    <p className="text-sm">{feedback.comment}</p>
                    
                    {feedback.response && (
                      <div className="mt-3 bg-gray-50 p-3 rounded-md">
                        <div className="text-sm font-medium mb-1">Sua resposta:</div>
                        <p className="text-sm">{feedback.response}</p>
                      </div>
                    )}
                    
                    <div className="mt-3 flex justify-between">
                      <div>
                        {feedback.status !== "flagged" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            title="Sinalizar como impróprio"
                          >
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            Sinalizar
                          </Button>
                        )}
                      </div>
                      
                      {feedback.status !== "responded" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedFeedback(feedback);
                            setIsReplyDialogOpen(true);
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Responder
                        </Button>
                      )}
                      
                      {feedback.status === "responded" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedFeedback(feedback);
                            setReplyMessage(feedback.response || "");
                            setIsReplyDialogOpen(true);
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Editar Resposta
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium mb-2">Nenhum feedback encontrado</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Não encontramos feedbacks que correspondam aos seus filtros de pesquisa.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Responder ao Feedback
            </DialogTitle>
            <DialogDescription>
              Escreva uma resposta para o feedback do cliente.
            </DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <>
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <div className="flex items-center gap-1 mb-1">
                  {renderStars(selectedFeedback.rating)}
                  <span className="text-sm text-gray-500 ml-1">
                    por {selectedFeedback.customerName}
                  </span>
                </div>
                <p className="text-sm">{selectedFeedback.comment}</p>
              </div>
              <Textarea
                placeholder="Escreva sua resposta..."
                className="min-h-[120px]"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleReply} disabled={!replyMessage.trim()}>
                  {selectedFeedback.status === "responded" ? "Atualizar" : "Enviar"} Resposta
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PartnerLayout>
  );
};

export default PartnerFeedback;
