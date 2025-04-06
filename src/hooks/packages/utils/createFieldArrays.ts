
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
export function createStringFieldArray<T extends "highlights" | "includes" | "excludes" | "dates">(
  form: UseFormReturn<PackageFormValues>,
  name: T
): StringFieldArrayType {
  // Use a type-safe approach with generics
  const fieldArrayResult = useFieldArray({
    control: form.control,
    name, // Using the specific string literals that match the form schema
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
  // Using a literal string constant with explicit type annotation to ensure type safety
  const name = "itinerary" as const; // 'as const' ensures TypeScript treats this as a literal type
  
  const fieldArrayResult = useFieldArray({
    control: form.control,
    name, // This is explicitly the literal string "itinerary"
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
