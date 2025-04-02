
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Star } from "lucide-react";
import { Package } from "@/data/packages";
import SafeImage from "@/components/ui/safe-image";

interface PackageDetailHeroProps {
  packageData: Package;
}

const PackageDetailHero = ({ packageData }: PackageDetailHeroProps) => {
  return (
    <div className="relative h-[60vh]">
      <SafeImage
        src={packageData.image}
        alt={packageData.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60">
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <div className="max-w-3xl">
            <Link 
              to="/pacotes" 
              className="inline-flex items-center text-white mb-4 hover:text-tuca-coral transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para pacotes
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {packageData.title}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {packageData.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center">
                <Calendar className="h-4 w-4 text-white mr-2" />
                <span className="text-white text-sm font-medium">{packageData.days} dias</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center">
                <Users className="h-4 w-4 text-white mr-2" />
                <span className="text-white text-sm font-medium">
                  {packageData.persons} {packageData.persons === 1 ? 'pessoa' : 'pessoas'}
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-white text-sm font-medium">{packageData.rating}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailHero;
