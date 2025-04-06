
import { useForm, useFieldArray } from "react-hook-form";
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

// Define field array return types for type safety
export type HighlightsFieldArray = {
  fields: any[];
  append: (value: string) => void;
  prepend: (value: string | string[]) => void;
  remove: (index: number | number[]) => void;
  swap: (indexA: number, indexB: number) => void;
  move: (from: number, to: number) => void;
  insert: (index: number, value: string) => void;
  replace: (index: number, value: string) => void;
  update: (index: number, value: string) => void;
};

export type IncludesFieldArray = {
  fields: any[];
  append: (value: string) => void;
  prepend: (value: string | string[]) => void;
  remove: (index: number | number[]) => void;
  swap: (indexA: number, indexB: number) => void;
  move: (from: number, to: number) => void;
  insert: (index: number, value: string) => void;
  replace: (index: number, value: string) => void;
  update: (index: number, value: string) => void;
};

export type ExcludesFieldArray = {
  fields: any[];
  append: (value: string) => void;
  prepend: (value: string | string[]) => void;
  remove: (index: number | number[]) => void;
  swap: (indexA: number, indexB: number) => void;
  move: (from: number, to: number) => void;
  insert: (index: number, value: string) => void;
  replace: (index: number, value: string) => void;
  update: (index: number, value: string) => void;
};

export type ItineraryFieldArray = {
  fields: any[];
  append: (value: { day: number; title: string; description: string }) => void;
  prepend: (value: { day: number; title: string; description: string } | { day: number; title: string; description: string }[]) => void;
  remove: (index: number | number[]) => void;
  swap: (indexA: number, indexB: number) => void;
  move: (from: number, to: number) => void;
  insert: (index: number, value: { day: number; title: string; description: string }) => void;
  replace: (index: number, value: { day: number; title: string; description: string }) => void;
  update: (index: number, value: { day: number; title: string; description: string }) => void;
};

export type DatesFieldArray = {
  fields: any[];
  append: (value: string) => void;
  prepend: (value: string | string[]) => void;
  remove: (index: number | number[]) => void;
  swap: (indexA: number, indexB: number) => void;
  move: (from: number, to: number) => void;
  insert: (index: number, value: string) => void;
  replace: (index: number, value: string) => void;
  update: (index: number, value: string) => void;
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

  // Create and set up highlights field array
  const highlightsFieldArrayResult = useFieldArray({
    control: form.control,
    name: "highlights",
  });
  
  const highlightsArray: HighlightsFieldArray = {
    fields: highlightsFieldArrayResult.fields,
    append: (value: string) => highlightsFieldArrayResult.append(value),
    prepend: (value: string | string[]) => highlightsFieldArrayResult.prepend(value),
    remove: (index: number | number[]) => highlightsFieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => highlightsFieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => highlightsFieldArrayResult.move(from, to),
    insert: (index: number, value: string) => highlightsFieldArrayResult.insert(index, value),
    replace: (index: number, value: string) => highlightsFieldArrayResult.replace(index, value),
    update: (index: number, value: string) => highlightsFieldArrayResult.update(index, value),
  };

  // Create and set up includes field array
  const includesFieldArrayResult = useFieldArray({
    control: form.control,
    name: "includes",
  });
  
  const includesArray: IncludesFieldArray = {
    fields: includesFieldArrayResult.fields,
    append: (value: string) => includesFieldArrayResult.append(value),
    prepend: (value: string | string[]) => includesFieldArrayResult.prepend(value),
    remove: (index: number | number[]) => includesFieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => includesFieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => includesFieldArrayResult.move(from, to),
    insert: (index: number, value: string) => includesFieldArrayResult.insert(index, value),
    replace: (index: number, value: string) => includesFieldArrayResult.replace(index, value),
    update: (index: number, value: string) => includesFieldArrayResult.update(index, value),
  };

  // Create and set up excludes field array
  const excludesFieldArrayResult = useFieldArray({
    control: form.control,
    name: "excludes",
  });
  
  const excludesArray: ExcludesFieldArray = {
    fields: excludesFieldArrayResult.fields,
    append: (value: string) => excludesFieldArrayResult.append(value),
    prepend: (value: string | string[]) => excludesFieldArrayResult.prepend(value),
    remove: (index: number | number[]) => excludesFieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => excludesFieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => excludesFieldArrayResult.move(from, to),
    insert: (index: number, value: string) => excludesFieldArrayResult.insert(index, value),
    replace: (index: number, value: string) => excludesFieldArrayResult.replace(index, value),
    update: (index: number, value: string) => excludesFieldArrayResult.update(index, value),
  };

  // Create and set up itinerary field array
  const itineraryFieldArrayResult = useFieldArray({
    control: form.control,
    name: "itinerary",
  });
  
  const itineraryArray: ItineraryFieldArray = {
    fields: itineraryFieldArrayResult.fields,
    append: (value: { day: number; title: string; description: string }) => itineraryFieldArrayResult.append(value),
    prepend: (value: { day: number; title: string; description: string } | { day: number; title: string; description: string }[]) => itineraryFieldArrayResult.prepend(value),
    remove: (index: number | number[]) => itineraryFieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => itineraryFieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => itineraryFieldArrayResult.move(from, to),
    insert: (index: number, value: { day: number; title: string; description: string }) => itineraryFieldArrayResult.insert(index, value),
    replace: (index: number, value: { day: number; title: string; description: string }) => itineraryFieldArrayResult.replace(index, value),
    update: (index: number, value: { day: number; title: string; description: string }) => itineraryFieldArrayResult.update(index, value),
  };

  // Create and set up dates field array
  const datesFieldArrayResult = useFieldArray({
    control: form.control,
    name: "dates",
  });
  
  const datesArray: DatesFieldArray = {
    fields: datesFieldArrayResult.fields,
    append: (value: string) => datesFieldArrayResult.append(value),
    prepend: (value: string | string[]) => datesFieldArrayResult.prepend(value),
    remove: (index: number | number[]) => datesFieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => datesFieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => datesFieldArrayResult.move(from, to),
    insert: (index: number, value: string) => datesFieldArrayResult.insert(index, value),
    replace: (index: number, value: string) => datesFieldArrayResult.replace(index, value),
    update: (index: number, value: string) => datesFieldArrayResult.update(index, value),
  };

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
