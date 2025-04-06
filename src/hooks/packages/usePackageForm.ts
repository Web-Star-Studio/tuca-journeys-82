
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PackageFormValues, FieldItem } from "@/components/admin/packages/types";
import { useEffect, useState } from "react";
import { Package } from "@/data/types/packageTypes";
import { packageSchema } from "./schema/packageSchema";
import { 
  createHighlightsFieldArray, 
  createIncludesFieldArray, 
  createExcludesFieldArray, 
  createDatesFieldArray,
  createItineraryFieldArray 
} from "./utils/createFieldArrays";
import {
  HighlightsFieldArray,
  IncludesFieldArray,
  ExcludesFieldArray,
  ItineraryFieldArrayType,
  DatesFieldArray
} from "./types/fieldArrayTypes";

export type { 
  HighlightsFieldArray,
  IncludesFieldArray,
  ExcludesFieldArray,
  ItineraryFieldArrayType,
  DatesFieldArray
};

export function usePackageForm(initialValues?: Package) {
  const [previewUrl, setPreviewUrl] = useState("");
  
  // Convert string arrays to FieldItem arrays for form initialization
  const mapStringToFieldItems = (items: string[] = [""]): FieldItem[] => {
    return items.map(item => ({ title: item }));
  };

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
      includes: initialValues?.includes ? mapStringToFieldItems(initialValues.includes) : [{ title: "" }],
      excludes: initialValues?.excludes ? mapStringToFieldItems(initialValues.excludes) : [{ title: "" }],
      highlights: initialValues?.highlights ? mapStringToFieldItems(initialValues.highlights) : [{ title: "" }],
      itinerary: initialValues?.itinerary || [{ day: 1, title: "", description: "" }],
      dates: initialValues?.dates ? mapStringToFieldItems(initialValues.dates) : [{ title: "" }],
    },
  });

  // Watch for image changes to update preview
  const imageValue = form.watch("image");
  useEffect(() => {
    setPreviewUrl(imageValue);
  }, [imageValue]);

  // Create field arrays with dedicated functions for each field type
  const highlightsArray = createHighlightsFieldArray(form);
  const includesArray = createIncludesFieldArray(form);
  const excludesArray = createExcludesFieldArray(form);
  const datesArray = createDatesFieldArray(form);
  const itineraryArray = createItineraryFieldArray(form);

  // Initialize with at least one item each if empty
  useEffect(() => {
    if (highlightsArray.fields.length === 0) highlightsArray.append({ title: "" });
    if (includesArray.fields.length === 0) includesArray.append({ title: "" });
    if (excludesArray.fields.length === 0) excludesArray.append({ title: "" });
    if (itineraryArray.fields.length === 0) itineraryArray.append({ day: 1, title: "", description: "" });
    if (datesArray.fields.length === 0) datesArray.append({ title: "" });
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
