
import { Check, X } from "lucide-react";
import { Package } from "@/data/packages";

interface PackageIncludesTabProps {
  packageData: Package;
}

const PackageIncludesTab = ({ packageData }: PackageIncludesTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-serif font-medium mb-4 flex items-center">
          <Check className="h-5 w-5 text-tuca-ocean-blue mr-2" />
          O Pacote Inclui
        </h2>
        <ul className="space-y-3">
          {packageData.includes?.map((item, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 text-tuca-ocean-blue mr-3 mt-1" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-serif font-medium mb-4 flex items-center">
          <X className="h-5 w-5 text-red-500 mr-2" />
          O Pacote Não Inclui
        </h2>
        <ul className="space-y-3">
          {packageData.excludes?.map((item, index) => (
            <li key={index} className="flex items-start">
              <X className="h-4 w-4 text-red-500 mr-3 mt-1" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageIncludesTab;
