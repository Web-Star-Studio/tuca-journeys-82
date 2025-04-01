
import { Package } from "@/data/packages";

interface PackageItineraryTabProps {
  packageData: Package;
}

const PackageItineraryTab = ({ packageData }: PackageItineraryTabProps) => {
  return (
    <>
      <h2 className="text-2xl font-serif font-medium mb-6">Roteiro Detalhado</h2>
      <div className="space-y-8">
        {packageData.itinerary?.map((day, index) => (
          <div key={index} className="border-l-2 border-tuca-ocean-blue pl-6 pb-6 relative">
            <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-tuca-ocean-blue flex items-center justify-center text-white text-sm">
              {day.day}
            </div>
            <h3 className="text-xl font-medium mb-2">{day.title}</h3>
            <p className="text-gray-700">{day.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PackageItineraryTab;
