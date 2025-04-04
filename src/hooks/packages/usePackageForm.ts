
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PackageFormValues } from "@/components/admin/packages/types";
import { useEffect } from "react";
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

export function usePackageForm(initialValues?: Package) {
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

  // Field arrays
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

  // Initialize with at least one item each if empty
  useEffect(() => {
    if (highlightsArray.fields.length === 0) highlightsArray.append("");
    if (includesArray.fields.length === 0) includesArray.append("");
    if (excludesArray.fields.length === 0) excludesArray.append("");
    if (itineraryArray.fields.length === 0) itineraryArray.append({ day: 1, title: "", description: "" });
    if (datesArray.fields.length === 0) datesArray.append("");
  }, []);

  return {
    form,
    highlightsArray,
    includesArray,
    excludesArray,
    itineraryArray,
    datesArray,
  };
}
