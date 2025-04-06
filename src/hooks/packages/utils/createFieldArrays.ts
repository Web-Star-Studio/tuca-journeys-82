
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { PackageFormValues, FieldItem } from "@/components/admin/packages/types";
import { 
  HighlightsFieldArray, 
  IncludesFieldArray, 
  ExcludesFieldArray, 
  ItineraryFieldArrayType, 
  DatesFieldArray,
  ItineraryItem
} from "../types/fieldArrayTypes";

/**
 * Creates a field array for highlights
 */
export function createHighlightsFieldArray(
  form: UseFormReturn<PackageFormValues>
): HighlightsFieldArray {
  const fieldArrayResult = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  return {
    fields: fieldArrayResult.fields,
    append: (value: FieldItem) => fieldArrayResult.append(value),
    prepend: (value: FieldItem | FieldItem[]) => fieldArrayResult.prepend(value),
    remove: (index: number | number[]) => fieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => fieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => fieldArrayResult.move(from, to),
    insert: (index: number, value: FieldItem) => fieldArrayResult.insert(index, value),
    update: (index: number, value: FieldItem) => fieldArrayResult.update(index, value),
    replace: (value: FieldItem[]) => fieldArrayResult.replace(value),
  };
}

/**
 * Creates a field array for includes
 */
export function createIncludesFieldArray(
  form: UseFormReturn<PackageFormValues>
): IncludesFieldArray {
  const fieldArrayResult = useFieldArray({
    control: form.control,
    name: "includes",
  });

  return {
    fields: fieldArrayResult.fields,
    append: (value: FieldItem) => fieldArrayResult.append(value),
    prepend: (value: FieldItem | FieldItem[]) => fieldArrayResult.prepend(value),
    remove: (index: number | number[]) => fieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => fieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => fieldArrayResult.move(from, to),
    insert: (index: number, value: FieldItem) => fieldArrayResult.insert(index, value),
    update: (index: number, value: FieldItem) => fieldArrayResult.update(index, value),
    replace: (value: FieldItem[]) => fieldArrayResult.replace(value),
  };
}

/**
 * Creates a field array for excludes
 */
export function createExcludesFieldArray(
  form: UseFormReturn<PackageFormValues>
): ExcludesFieldArray {
  const fieldArrayResult = useFieldArray({
    control: form.control,
    name: "excludes",
  });

  return {
    fields: fieldArrayResult.fields,
    append: (value: FieldItem) => fieldArrayResult.append(value),
    prepend: (value: FieldItem | FieldItem[]) => fieldArrayResult.prepend(value),
    remove: (index: number | number[]) => fieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => fieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => fieldArrayResult.move(from, to),
    insert: (index: number, value: FieldItem) => fieldArrayResult.insert(index, value),
    update: (index: number, value: FieldItem) => fieldArrayResult.update(index, value),
    replace: (value: FieldItem[]) => fieldArrayResult.replace(value),
  };
}

/**
 * Creates a field array for dates
 */
export function createDatesFieldArray(
  form: UseFormReturn<PackageFormValues>
): DatesFieldArray {
  const fieldArrayResult = useFieldArray({
    control: form.control,
    name: "dates",
  });

  return {
    fields: fieldArrayResult.fields,
    append: (value: FieldItem) => fieldArrayResult.append(value),
    prepend: (value: FieldItem | FieldItem[]) => fieldArrayResult.prepend(value),
    remove: (index: number | number[]) => fieldArrayResult.remove(index),
    swap: (indexA: number, indexB: number) => fieldArrayResult.swap(indexA, indexB),
    move: (from: number, to: number) => fieldArrayResult.move(from, to),
    insert: (index: number, value: FieldItem) => fieldArrayResult.insert(index, value),
    update: (index: number, value: FieldItem) => fieldArrayResult.update(index, value),
    replace: (value: FieldItem[]) => fieldArrayResult.replace(value),
  };
}

/**
 * Creates a field array for itinerary items
 */
export function createItineraryFieldArray(
  form: UseFormReturn<PackageFormValues>
): ItineraryFieldArrayType {
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
