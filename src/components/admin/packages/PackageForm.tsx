
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageFormValues } from "./types";
import BasicInfoForm from "./form/BasicInfoForm";
import HighlightsForm from "./form/HighlightsForm";
import DetailsForm from "./form/DetailsForm";
import ItineraryForm from "./form/ItineraryForm";
import FormActions from "./form/FormActions";
import { usePackageSubmit } from "@/hooks/packages/usePackageSubmit";
import { usePackageForm } from "@/hooks/packages/usePackageForm";
import { usePackageDetail } from "@/hooks/use-packages";
import { Form } from "@/components/ui/form";
import { adaptPackageToFormPackage } from "@/utils/packageAdapter";
import { Package } from "@/types/package";

interface PackageFormProps {
  packageId: number | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const PackageForm = ({ packageId, onSuccess, onCancel }: PackageFormProps) => {
  const [activeTab, setActiveTab] = useState("basic-info");
  
  // Fetch package details if editing an existing package
  const { data: packageData, isLoading: isLoadingPackage } = usePackageDetail(packageId || 0);
  
  // Initialize form with package data if available
  const { 
    form, 
    previewUrl,
    highlightsArray, 
    includesArray, 
    excludesArray, 
    itineraryArray, 
    datesArray 
  } = usePackageForm(
    // Convert from canonical Package to form Package if data is available
    packageId && packageData ? adaptPackageToFormPackage(packageData) : undefined
  );
  
  // Setup submission handler
  const { handleSubmit, isSubmitting } = usePackageSubmit(packageId, onSuccess);

  if (packageId && isLoadingPackage) {
    return <div className="p-8 text-center">Carregando dados do pacote...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="basic-info">Informações</TabsTrigger>
            <TabsTrigger value="highlights">Destaques e Datas</TabsTrigger>
            <TabsTrigger value="details">O que Inclui/Não Inclui</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerário</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic-info" className="space-y-6">
            <BasicInfoForm form={form} previewUrl={previewUrl} />
          </TabsContent>
          
          <TabsContent value="highlights" className="space-y-6">
            <HighlightsForm 
              form={form} 
              highlightsArray={highlightsArray}
              datesArray={datesArray}
            />
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            <DetailsForm 
              form={form} 
              includesArray={includesArray}
              excludesArray={excludesArray}
            />
          </TabsContent>
          
          <TabsContent value="itinerary" className="space-y-6">
            <ItineraryForm 
              form={form} 
              itineraryArray={itineraryArray}
            />
          </TabsContent>
        </Tabs>
        
        <FormActions 
          isSubmitting={isSubmitting} 
          packageId={packageId}
          onCancel={onCancel}
          submitLabel={packageId ? "Salvar Alterações" : "Criar Pacote"}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </form>
    </Form>
  );
};

export default PackageForm;
