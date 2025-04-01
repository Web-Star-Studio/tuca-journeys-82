
import { Calendar } from "lucide-react";
import { Package } from "@/data/packages";

interface PackageDatesTabProps {
  packageData: Package;
}

const PackageDatesTab = ({ packageData }: PackageDatesTabProps) => {
  return (
    <>
      <h2 className="text-2xl font-serif font-medium mb-6">Próximas Datas Disponíveis</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packageData.dates?.map((date, index) => (
          <div key={index} className="border rounded-lg p-4 hover:border-tuca-ocean-blue transition-colors cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 group-hover:text-tuca-ocean-blue transition-colors mr-2" />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{date}</span>
              </div>
              <div className="text-tuca-ocean-blue opacity-0 group-hover:opacity-100 transition-opacity">
                Selecionar
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PackageDatesTab;
