
import { useForm, useFieldArray, UseFieldArrayReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PackageFormValues } from "@/components/admin/packages/types";
import { useEffect, useState } from "react";
import { Package } from "@/data/types/packageTypes";

// Define the schema
const packageSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  image: z.string().min(1, "A imagem é obrigatória"),
  price: z.number().min(1, "O preço é obrigatório"),
  days: z.number().min(1, "A duração é obrigatória"),
  persons: z.number().min(1, "O número de pessoas é obrigatório"),
  rating: z.number().min(0).max(5).optional(),
  category: z.string().min(1, "A categoria é obrigatória"),
  includes: z.array(z.string()).min(1, "Inclua pelo menos um item"),
  excludes: z.array(z.string()).min(1, "Inclua pelo menos um item não incluído"),
  highlights: z.array(z.string()).min(1, "Inclua pelo menos um destaque"),
  itinerary: z.array(z.object({
    day: z.number(),
    title: z.string().min(1, "O título do dia é obrigatório"),
    description: z.string().min(1, "A descrição do dia é obrigatória"),
  })).min(1, "Inclua pelo menos um dia no itinerário"),
  dates: z.array(z.string()).min(1, "Inclua pelo menos uma data disponível"),
});

// Define base type for field arrays
type BaseFieldArrayType<T extends keyof PackageFormValues> = Omit<UseFieldArrayReturn<PackageFormValues, T, "id">, "append">;

// Define type for the field arrays with string items
export type HighlightsFieldArray = BaseFieldArrayType<"highlights"> & {
  append: (value: string) => void;
};

export type IncludesFieldArray = BaseFieldArrayType<"includes"> & {
  append: (value: string) => void;
};

export type ExcludesFieldArray = BaseFieldArrayType<"excludes"> & {
  append: (value: string) => void;
};

// Define type for the itinerary field array
export type ItineraryFieldArray = BaseFieldArrayType<"itinerary"> & {
  append: (value: { day: number; title: string; description: string }) => void;
};

// Define type for the dates field array
export type DatesFieldArray = BaseFieldArrayType<"dates"> & {
  append: (value: string) => void;
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

  // Create field arrays with proper typing
  const highlightsFieldArray = useFieldArray({
    control: form.control,
    name: "highlights",
  });
  
  const highlightsArray: HighlightsFieldArray = {
    ...highlightsFieldArray,
    append: (value: string) => highlightsFieldArray.append(value as any),
  };

  const includesFieldArray = useFieldArray({
    control: form.control,
    name: "includes",
  });
  
  const includesArray: IncludesFieldArray = {
    ...includesFieldArray,
    append: (value: string) => includesFieldArray.append(value as any),
  };

  const excludesFieldArray = useFieldArray({
    control: form.control,
    name: "excludes",
  });
  
  const excludesArray: ExcludesFieldArray = {
    ...excludesFieldArray,
    append: (value: string) => excludesFieldArray.append(value as any),
  };

  const itineraryFieldArray = useFieldArray({
    control: form.control,
    name: "itinerary",
  });
  
  const itineraryArray: ItineraryFieldArray = {
    ...itineraryFieldArray,
    append: (value: { day: number; title: string; description: string }) => 
      itineraryFieldArray.append(value as any),
  };

  const datesFieldArray = useFieldArray({
    control: form.control,
    name: "dates",
  });
  
  const datesArray: DatesFieldArray = {
    ...datesFieldArray,
    append: (value: string) => datesFieldArray.append(value as any),
  };

  // Initialize with at least one item each if empty
  useEffect(() => {
    if (highlightsArray.fields.length === 0) highlightsArray.append("" as any);
    if (includesArray.fields.length === 0) includesArray.append("" as any);
    if (excludesArray.fields.length === 0) excludesArray.append("" as any);
    if (itineraryArray.fields.length === 0) itineraryArray.append({ day: 1, title: "", description: "" } as any);
    if (datesArray.fields.length === 0) datesArray.append("" as any);
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
