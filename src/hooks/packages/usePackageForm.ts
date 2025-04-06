
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PackageFormValues } from "@/components/admin/packages/types";
import { useEffect, useState } from "react";
import { Package } from "@/data/types/packageTypes";
import { packageSchema } from "./schema/packageSchema";
import { 
  createStringFieldArray, 
  createItineraryFieldArray 
} from "./utils/createFieldArrays";
import {
  HighlightsFieldArray,
  IncludesFieldArray,
  ExcludesFieldArray,
  ItineraryFieldArray,
  DatesFieldArray
} from "./types/fieldArrayTypes";

export type { 
  HighlightsFieldArray,
  IncludesFieldArray,
  ExcludesFieldArray,
  ItineraryFieldArray,
  DatesFieldArray
};

export function usePackageForm(initialValues?: Package) {
  const [previewUrl, setPreviewUrl] = useState("");
  
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      image: initialValues?.image || "",
      price: initialValues?.price || 0,
      days: initialValues?.days || 1,
      persons: initialValues?.persons || 1,
      rating: initialValues?.rating || 5,
      category: initialValues?.category || "adventure",
      includes: initialValues?.includes || [""],
      excludes: initialValues?.excludes || [""],
      highlights: initialValues?.highlights || [""],
      itinerary: initialValues?.itinerary || [{ day: 1, title: "", description: "" }],
      dates: initialValues?.dates || [""],
    },
  });

  // Watch for image changes to update preview
  const imageValue = form.watch("image");
  useEffect(() => {
    setPreviewUrl(imageValue);
  }, [imageValue]);

  // Create field arrays with type-safe wrappers
  const highlightsArray = createStringFieldArray(form, "highlights") as HighlightsFieldArray;
  const includesArray = createStringFieldArray(form, "includes") as IncludesFieldArray;
  const excludesArray = createStringFieldArray(form, "excludes") as ExcludesFieldArray;
  const datesArray = createStringFieldArray(form, "dates") as DatesFieldArray;
  const itineraryArray = createItineraryFieldArray(form);

  // Initialize with at least one item each if empty
  useEffect(() => {
    if (highlightsArray.fields.length === 0) highlightsArray.append("");
    if (includesArray.fields.length === 0) includesArray.append("");
    if (excludesArray.fields.length === 0) excludesArray.append("");
    if (itineraryArray.fields.length === 0) itineraryArray.append({ day: 1, title: "", description: "" });
    if (datesArray.fields.length === 0) datesArray.append("");
  }, [highlightsArray, includesArray, excludesArray, itineraryArray, datesArray]);

  return {
    form,
    previewUrl,
    highlightsArray,
    includesArray,
    excludesArray,
    itineraryArray,
    datesArray,
  };
}
