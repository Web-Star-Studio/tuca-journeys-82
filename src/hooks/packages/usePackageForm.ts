
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePackageDetail } from "@/hooks/use-packages";
import { Package } from "@/data/types/packageTypes";
import { packageFormSchema, PackageFormValues } from "@/components/admin/packages/types";

export const usePackageForm = (packageId: number | null) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Fetch package data if editing
  const { data: packageData, isLoading: isLoadingPackage } = usePackageDetail(
    packageId || 0
  );
  
  // Define the form with zod resolver
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

  // Create the field arrays
  const highlightsArray = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const includesArray = useFieldArray({
    control: form.control,
    name: "includes",
  });

  const excludesArray = useFieldArray({
    control: form.control,
    name: "excludes",
  });

  const itineraryArray = useFieldArray({
    control: form.control,
    name: "itinerary",
  });

  const datesArray = useFieldArray({
    control: form.control,
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

  return {
    form,
    previewUrl,
    isLoadingPackage,
    highlightsArray,
    includesArray,
    excludesArray,
    itineraryArray,
    datesArray,
  };
};
