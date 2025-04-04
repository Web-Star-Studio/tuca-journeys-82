
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger 
} from "@/components/ui/tabs";

// Import our form components
import BasicInfoForm from "./form/BasicInfoForm";
import HighlightsForm from "./form/HighlightsForm";
import DetailsForm from "./form/DetailsForm";
import ItineraryForm from "./form/ItineraryForm";
import FormActions from "./form/FormActions";

// Import our custom hooks
import { usePackageForm } from "@/hooks/packages/usePackageForm";
import { usePackageSubmit } from "@/hooks/packages/usePackageSubmit";

interface PackageFormProps {
  packageId: number | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export const PackageForm = ({
  packageId,
  onCancel,
  onSuccess,
}: PackageFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  
  // Use our custom hooks
  const {
    form,
    previewUrl,
    isLoadingPackage,
    highlightsArray,
    includesArray,
    excludesArray,
    itineraryArray,
    datesArray
  } = usePackageForm(packageId);
  
  const { handleSubmit, isSubmitting } = usePackageSubmit(packageId, onSuccess);

  if (packageId && isLoadingPackage) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
        <span className="ml-2">Carregando informações do pacote...</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="basic" className="flex-1">
              Informações Básicas
            </TabsTrigger>
            <TabsTrigger value="highlights" className="flex-1">
              Destaques
            </TabsTrigger>
            <TabsTrigger value="details" className="flex-1">
              Detalhes
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="flex-1">
              Itinerário
            </TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-4 pt-4">
            <BasicInfoForm form={form} previewUrl={previewUrl} />
          </TabsContent>

          {/* Highlights Tab */}
          <TabsContent value="highlights" className="space-y-4 pt-4">
            <HighlightsForm 
              form={form}
              highlightsArray={highlightsArray}
              datesArray={datesArray}
            />
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6 pt-4">
            <DetailsForm 
              form={form}
              includesArray={includesArray}
              excludesArray={excludesArray}
            />
          </TabsContent>

          {/* Itinerary Tab */}
          <TabsContent value="itinerary" className="space-y-4 pt-4">
            <ItineraryForm form={form} itineraryArray={itineraryArray} />
          </TabsContent>
        </Tabs>

        <FormActions 
          isSubmitting={isSubmitting}
          packageId={packageId}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
};

export default PackageForm;
