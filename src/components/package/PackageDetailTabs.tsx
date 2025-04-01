
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package } from "@/data/packages";
import PackageOverviewTab from "./PackageDetailTabs/PackageOverviewTab";
import PackageItineraryTab from "./PackageDetailTabs/PackageItineraryTab";
import PackageIncludesTab from "./PackageDetailTabs/PackageIncludesTab";
import PackageDatesTab from "./PackageDetailTabs/PackageDatesTab";

interface PackageDetailTabsProps {
  packageData: Package;
}

const PackageDetailTabs = ({ packageData }: PackageDetailTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="itinerary">Roteiro</TabsTrigger>
        <TabsTrigger value="includes">Inclui/Não Inclui</TabsTrigger>
        <TabsTrigger value="dates">Datas</TabsTrigger>
      </TabsList>
      
      {/* Overview Tab */}
      <TabsContent value="overview" className="mt-6">
        <PackageOverviewTab packageData={packageData} />
      </TabsContent>
      
      {/* Itinerary Tab */}
      <TabsContent value="itinerary" className="mt-6">
        <PackageItineraryTab packageData={packageData} />
      </TabsContent>
      
      {/* Includes Tab */}
      <TabsContent value="includes" className="mt-6">
        <PackageIncludesTab packageData={packageData} />
      </TabsContent>
      
      {/* Dates Tab */}
      <TabsContent value="dates" className="mt-6">
        <PackageDatesTab packageData={packageData} />
      </TabsContent>
    </Tabs>
  );
};

export default PackageDetailTabs;
