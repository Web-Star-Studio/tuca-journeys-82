
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Package } from "@/data/packages";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface PackageDetailSidebarProps {
  packageData: Package;
  isInWishlist: boolean;
  onWishlistToggle: () => void;
}

const PackageDetailSidebar = ({ 
  packageData, 
  isInWishlist, 
  onWishlistToggle 
}: PackageDetailSidebarProps) => {
  return (
    <div className="sticky top-24 bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="text-center mb-4">
        <div className="text-gray-500 mb-1">A partir de</div>
        <div className="text-3xl font-bold text-tuca-ocean-blue">
          R$ {packageData.price.toLocaleString('pt-BR')}
        </div>
        <div className="text-gray-500 text-sm mb-4">por pessoa</div>
        <Separator className="my-4" />
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Duração:</span>
          <span className="font-medium">{packageData.days} dias</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Pessoas:</span>
          <span className="font-medium">{packageData.persons}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Avaliação:</span>
          <span className="font-medium flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 inline" />
            {packageData.rating}/5
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <Link to={`/reservar/pacote/${packageData.id}`}>
          <Button className="w-full bg-tuca-coral hover:bg-tuca-coral/90 text-white">
            Reservar Agora
          </Button>
        </Link>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onWishlistToggle}
        >
          {isInWishlist ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        </Button>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Precisa de ajuda para decidir?</p>
        <Link to="/contato" className="text-tuca-ocean-blue hover:underline font-medium">
          Entre em contato conosco
        </Link>
      </div>
    </div>
  );
};

export default PackageDetailSidebar;
