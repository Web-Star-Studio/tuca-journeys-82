
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { PackageFormValues } from "@/components/admin/packages/types";
import { 
  HighlightsFieldArray, 
  IncludesFieldArray, 
  ExcludesFieldArray, 
  ItineraryFieldArrayType, 
  DatesFieldArray,
  ItineraryItem,
  StringFieldArrayType
} from "../types/fieldArrayTypes";

/**
 * Creates a field array for string fields (highlights, includes, excludes, dates)
 */
export function createStringFieldArray(
  form: UseFormReturn<PackageFormValues>,
  name: "highlights" | "includes" | "excludes" | "dates" // Specify exact string literals
): StringFieldArrayType {
  const fieldArrayResult = useFieldArray({
    control: form.control,
    name, // Now we're using specific string literals that match the form schema
  });

  return {
    fields: fieldArrayResult.fields,
    append: (value: string) => fieldArrayResult.append({ title: value }),
    prepend: (value: string | string[]) => {
      if (Array.isArray(value)) {
        fieldArrayResult.prepend(value.map(item => ({ title: item })));
      } else {
        fieldArrayResult.prepend({ title: value });
      }
    },
    remove: (index: number | number[]) => fieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => fieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => fieldArrayResult.move(from, to),
    insert: (index: number, value: string) => fieldArrayResult.insert(index, { title: value }),
    update: (index: number, value: string) => fieldArrayResult.update(index, { title: value }),
    replace: (value: string[]) => fieldArrayResult.replace(value.map(item => ({ title: item }))),
  };
}

/**
 * Creates a field array for itinerary items
 */
export function createItineraryFieldArray(
  form: UseFormReturn<PackageFormValues>
): ItineraryFieldArrayType {
  // Use the literal "itinerary" string which satisfies TypeScript
  const itineraryKey = "itinerary";
  const fieldArrayResult = useFieldArray({
    control: form.control,
    name: itineraryKey, // TypeScript knows this is exactly "itinerary"
  });

  return {
    fields: fieldArrayResult.fields,
    append: (value: ItineraryItem) => 
      fieldArrayResult.append(value),
    prepend: (value: ItineraryItem | ItineraryItem[]) => 
      fieldArrayResult.prepend(value),
    remove: (index: number | number[]) => 
      fieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => 
      fieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => 
      fieldArrayResult.move(from, to),
    insert: (index: number, value: ItineraryItem) => 
      fieldArrayResult.insert(index, value),
    update: (index: number, value: ItineraryItem) => 
      fieldArrayResult.update(index, value),
    replace: (value: ItineraryItem[]) => 
      fieldArrayResult.replace(value),
  };
}
