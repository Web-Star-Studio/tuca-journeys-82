
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Package } from "@/data/packages";

interface PackageOverviewTabProps {
  packageData: Package;
}

const PackageOverviewTab = ({ packageData }: PackageOverviewTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-medium mb-4">Destaques do Pacote</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packageData.highlights?.map((highlight, index) => (
            <div key={index} className="flex items-start">
              <div className="bg-tuca-ocean-blue/10 p-2 rounded-full mr-3">
                <Check className="h-4 w-4 text-tuca-ocean-blue" />
              </div>
              <p className="text-gray-700">{highlight}</p>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />

      <div>
        <h2 className="text-2xl font-serif font-medium mb-4">Sobre este Pacote</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Descubra o paraíso de Fernando de Noronha com este pacote exclusivo, especialmente criado para proporcionar uma experiência inesquecível. Você terá a oportunidade de conhecer as praias mais bonitas do arquipélago, fazer trilhas com vistas deslumbrantes e mergulhar em águas cristalinas.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Nosso pacote foi cuidadosamente elaborado para garantir conforto e praticidade, permitindo que você aproveite ao máximo sua estadia neste santuário ecológico. Com acomodação em pousadas charmosas e passeios guiados por profissionais experientes, sua viagem será completa e sem preocupações.
        </p>
      </div>
    </div>
  );
};

export default PackageOverviewTab;
