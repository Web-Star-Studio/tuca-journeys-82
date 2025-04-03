
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePackageDetail, usePackages } from "@/hooks/use-packages";
import { Package } from "@/data/types/packageTypes";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger 
} from "@/components/ui/tabs";

// Import our new components
import BasicInfoForm from "./form/BasicInfoForm";
import HighlightsForm from "./form/HighlightsForm";
import DetailsForm from "./form/DetailsForm";
import ItineraryForm from "./form/ItineraryForm";
import FormActions from "./form/FormActions";
import { packageFormSchema, PackageFormValues } from "./types";

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
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const { data: packageData, isLoading: isLoadingPackage } = usePackageDetail(
    packageId || 0
  );
  
  const { 
    createPackage, 
    updatePackage
  } = usePackages();

  // Define the form
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
      days: 1,
      persons: 1,
      rating: 4.5,
      category: "romantic",
      highlights: [""],
      includes: [""],
      excludes: [""],
      itinerary: [{ day: 1, title: "", description: "" }],
      dates: [""],
    },
  });

  // These calls have been updated to use the correct field names instead of all using "itinerary"
  const highlightsArray = form.useFieldArray({
    name: "highlights",
  });

  const includesArray = form.useFieldArray({
    name: "includes",
  });

  const excludesArray = form.useFieldArray({
    name: "excludes",
  });

  const itineraryArray = form.useFieldArray({
    name: "itinerary",
  });

  const datesArray = form.useFieldArray({
    name: "dates",
  });

  // Load package data when editing
  useEffect(() => {
    if (packageData) {
      // Determine category based on package ID patterns
      let category = packageData.category || "romantic";
      if (!packageData.category) {
        if (packageData.id >= 1 && packageData.id <= 2 || packageData.id === 6) {
          category = "romantic";
        } else if (packageData.id >= 3 && packageData.id <= 4) {
          category = "adventure";
        } else if (packageData.id === 5) {
          category = "family";
        } else if (packageData.id === 4) {
          category = "premium";
        } else {
          category = "budget";
        }
      }

      // Set form values
      form.reset({
        title: packageData.title,
        description: packageData.description,
        image: packageData.image,
        price: packageData.price,
        days: packageData.days,
        persons: packageData.persons,
        rating: packageData.rating,
        category,
        highlights: packageData.highlights || [""],
        includes: packageData.includes || [""],
        excludes: packageData.excludes || [""],
        itinerary: packageData.itinerary || [{ day: 1, title: "", description: "" }],
        dates: packageData.dates || [""],
      });

      setPreviewUrl(packageData.image);
    }
  }, [packageData, form]);

  // Update image preview when URL changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "image") {
        setPreviewUrl(value.image as string);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Form submission
  const onSubmit = (data: PackageFormValues) => {
    if (packageId) {
      // Update existing package
      updatePackage.mutate(
        {
          id: packageId,
          ...data,
        } as Package,
        {
          onSuccess: onSuccess,
        }
      );
    } else {
      // Create new package
      createPackage.mutate(data as Omit<Package, "id">, {
        onSuccess: onSuccess,
      });
    }
  };

  // Check if the form is being submitted
  const isSubmitting = createPackage.isPending || updatePackage.isPending;

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
