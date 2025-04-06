
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

// Define custom types for each field array without using generics that cause constraints issues
export type HighlightsFieldArray = {
  fields: UseFieldArrayReturn<PackageFormValues, "highlights", "id">["fields"];
  append: (value: string) => void;
  prepend: UseFieldArrayReturn<PackageFormValues, "highlights", "id">["prepend"];
  remove: UseFieldArrayReturn<PackageFormValues, "highlights", "id">["remove"];
  swap: UseFieldArrayReturn<PackageFormValues, "highlights", "id">["swap"];
  move: UseFieldArrayReturn<PackageFormValues, "highlights", "id">["move"];
  insert: UseFieldArrayReturn<PackageFormValues, "highlights", "id">["insert"];
  replace: UseFieldArrayReturn<PackageFormValues, "highlights", "id">["replace"];
  update: UseFieldArrayReturn<PackageFormValues, "highlights", "id">["update"];
};

export type IncludesFieldArray = {
  fields: UseFieldArrayReturn<PackageFormValues, "includes", "id">["fields"];
  append: (value: string) => void;
  prepend: UseFieldArrayReturn<PackageFormValues, "includes", "id">["prepend"];
  remove: UseFieldArrayReturn<PackageFormValues, "includes", "id">["remove"];
  swap: UseFieldArrayReturn<PackageFormValues, "includes", "id">["swap"];
  move: UseFieldArrayReturn<PackageFormValues, "includes", "id">["move"];
  insert: UseFieldArrayReturn<PackageFormValues, "includes", "id">["insert"];
  replace: UseFieldArrayReturn<PackageFormValues, "includes", "id">["replace"];
  update: UseFieldArrayReturn<PackageFormValues, "includes", "id">["update"];
};

export type ExcludesFieldArray = {
  fields: UseFieldArrayReturn<PackageFormValues, "excludes", "id">["fields"];
  append: (value: string) => void;
  prepend: UseFieldArrayReturn<PackageFormValues, "excludes", "id">["prepend"];
  remove: UseFieldArrayReturn<PackageFormValues, "excludes", "id">["remove"];
  swap: UseFieldArrayReturn<PackageFormValues, "excludes", "id">["swap"];
  move: UseFieldArrayReturn<PackageFormValues, "excludes", "id">["move"];
  insert: UseFieldArrayReturn<PackageFormValues, "excludes", "id">["insert"];
  replace: UseFieldArrayReturn<PackageFormValues, "excludes", "id">["replace"];
  update: UseFieldArrayReturn<PackageFormValues, "excludes", "id">["update"];
};

export type ItineraryFieldArray = {
  fields: UseFieldArrayReturn<PackageFormValues, "itinerary", "id">["fields"];
  append: (value: { day: number; title: string; description: string }) => void;
  prepend: UseFieldArrayReturn<PackageFormValues, "itinerary", "id">["prepend"];
  remove: UseFieldArrayReturn<PackageFormValues, "itinerary", "id">["remove"];
  swap: UseFieldArrayReturn<PackageFormValues, "itinerary", "id">["swap"];
  move: UseFieldArrayReturn<PackageFormValues, "itinerary", "id">["move"];
  insert: UseFieldArrayReturn<PackageFormValues, "itinerary", "id">["insert"];
  replace: UseFieldArrayReturn<PackageFormValues, "itinerary", "id">["replace"];
  update: UseFieldArrayReturn<PackageFormValues, "itinerary", "id">["update"];
};

export type DatesFieldArray = {
  fields: UseFieldArrayReturn<PackageFormValues, "dates", "id">["fields"];
  append: (value: string) => void;
  prepend: UseFieldArrayReturn<PackageFormValues, "dates", "id">["prepend"];
  remove: UseFieldArrayReturn<PackageFormValues, "dates", "id">["remove"];
  swap: UseFieldArrayReturn<PackageFormValues, "dates", "id">["swap"];
  move: UseFieldArrayReturn<PackageFormValues, "dates", "id">["move"];
  insert: UseFieldArrayReturn<PackageFormValues, "dates", "id">["insert"];
  replace: UseFieldArrayReturn<PackageFormValues, "dates", "id">["replace"];
  update: UseFieldArrayReturn<PackageFormValues, "dates", "id">["update"];
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

  // Create proper field arrays using specific field names
  const highlightsFieldArray = useFieldArray({
    control: form.control,
    name: "highlights",
  });
  
  const highlightsArray: HighlightsFieldArray = {
    fields: highlightsFieldArray.fields,
    append: (value: string) => highlightsFieldArray.append(value),
    prepend: highlightsFieldArray.prepend,
    remove: highlightsFieldArray.remove,
    swap: highlightsFieldArray.swap,
    move: highlightsFieldArray.move,
    insert: highlightsFieldArray.insert,
    replace: highlightsFieldArray.replace,
    update: highlightsFieldArray.update,
  };

  const includesFieldArray = useFieldArray({
    control: form.control,
    name: "includes",
  });
  
  const includesArray: IncludesFieldArray = {
    fields: includesFieldArray.fields,
    append: (value: string) => includesFieldArray.append(value),
    prepend: includesFieldArray.prepend,
    remove: includesFieldArray.remove,
    swap: includesFieldArray.swap,
    move: includesFieldArray.move,
    insert: includesFieldArray.insert,
    replace: includesFieldArray.replace,
    update: includesFieldArray.update,
  };

  const excludesFieldArray = useFieldArray({
    control: form.control,
    name: "excludes",
  });
  
  const excludesArray: ExcludesFieldArray = {
    fields: excludesFieldArray.fields,
    append: (value: string) => excludesFieldArray.append(value),
    prepend: excludesFieldArray.prepend,
    remove: excludesFieldArray.remove,
    swap: excludesFieldArray.swap,
    move: excludesFieldArray.move,
    insert: excludesFieldArray.insert,
    replace: excludesFieldArray.replace,
    update: excludesFieldArray.update,
  };

  const itineraryFieldArray = useFieldArray({
    control: form.control,
    name: "itinerary",
  });
  
  const itineraryArray: ItineraryFieldArray = {
    fields: itineraryFieldArray.fields,
    append: (value: { day: number; title: string; description: string }) => 
      itineraryFieldArray.append(value),
    prepend: itineraryFieldArray.prepend,
    remove: itineraryFieldArray.remove,
    swap: itineraryFieldArray.swap,
    move: itineraryFieldArray.move,
    insert: itineraryFieldArray.insert,
    replace: itineraryFieldArray.replace,
    update: itineraryFieldArray.update,
  };

  const datesFieldArray = useFieldArray({
    control: form.control,
    name: "dates",
  });
  
  const datesArray: DatesFieldArray = {
    fields: datesFieldArray.fields,
    append: (value: string) => datesFieldArray.append(value),
    prepend: datesFieldArray.prepend,
    remove: datesFieldArray.remove,
    swap: datesFieldArray.swap,
    move: datesFieldArray.move,
    insert: datesFieldArray.insert,
    replace: datesFieldArray.replace,
    update: datesFieldArray.update,
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
