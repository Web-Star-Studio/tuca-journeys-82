
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageFormValues } from "./types";
import BasicInfoForm from "./form/BasicInfoForm";
import HighlightsForm from "./form/HighlightsForm";
import DetailsForm from "./form/DetailsForm";
import ItineraryForm from "./form/ItineraryForm";
import FormActions from "./form/FormActions";

interface PackageFormProps {
  form: UseFormReturn<PackageFormValues>;
  onSubmit: (values: PackageFormValues) => void;
  isLoading: boolean;
  submitLabel?: string;
  highlightsArray: any;
  includesArray: any;
  excludesArray: any;
  itineraryArray: any;
  datesArray: any;
}

const PackageForm = ({ 
  form, 
  onSubmit, 
  isLoading, 
  submitLabel = "Salvar",
  highlightsArray,
  includesArray,
  excludesArray,
  itineraryArray,
  datesArray
}: PackageFormProps) => {
  const [activeTab, setActiveTab] = useState("basic-info");

  const handleSubmit = (values: PackageFormValues) => {
    onSubmit(values);
  };

  return (
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
          <BasicInfoForm form={form} />
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
        isLoading={isLoading} 
        submitLabel={submitLabel} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </form>
  );
};

export default PackageForm;
