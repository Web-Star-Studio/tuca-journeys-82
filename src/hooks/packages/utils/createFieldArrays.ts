
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { PackageFormValues } from "@/components/admin/packages/types";
import { 
  HighlightsFieldArray, 
  IncludesFieldArray, 
  ExcludesFieldArray, 
  ItineraryFieldArray, 
  DatesFieldArray,
  ItineraryItem
} from "../types/fieldArrayTypes";

/**
 * Creates a field array for string arrays (highlights, includes, excludes, dates)
 */
export function createStringFieldArray(
  form: UseFormReturn<PackageFormValues>,
  name: "highlights" | "includes" | "excludes" | "dates"
): HighlightsFieldArray | IncludesFieldArray | ExcludesFieldArray | DatesFieldArray {
  const fieldArrayResult = useFieldArray({
    control: form.control,
    name,
  });

  return {
    fields: fieldArrayResult.fields,
    append: (value: string) => fieldArrayResult.append(value),
    prepend: (value: string | string[]) => fieldArrayResult.prepend(value),
    remove: (index: number | number[]) => fieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => fieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => fieldArrayResult.move(from, to),
    insert: (index: number, value: string) => fieldArrayResult.insert(index, value),
    replace: (index: number, value: string) => fieldArrayResult.replace(index, value),
    update: (index: number, value: string) => fieldArrayResult.update(index, value),
  };
}

/**
 * Creates a field array for itinerary items
 */
export function createItineraryFieldArray(
  form: UseFormReturn<PackageFormValues>
): ItineraryFieldArray {
  const fieldArrayResult = useFieldArray({
    control: form.control,
    name: "itinerary",
  });

  return {
    fields: fieldArrayResult.fields,
    append: (value: ItineraryItem) => 
      fieldArrayResult.append(value),
    prepend: (value: ItineraryItem | ItineraryItem[]) => 
      fieldArrayResult.prepend(value),
    remove: (index: number | number[]) => fieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => fieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => fieldArrayResult.move(from, to),
    insert: (index: number, value: ItineraryItem) => 
      fieldArrayResult.insert(index, value),
    replace: (index: number, value: ItineraryItem) => 
      fieldArrayResult.replace(index, value),
    update: (index: number, value: ItineraryItem) => 
      fieldArrayResult.update(index, value),
  };
}
