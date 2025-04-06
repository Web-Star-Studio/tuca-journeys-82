
import { UseFieldArrayReturn } from "react-hook-form";
import { PackageFormValues } from "@/components/admin/packages/types";

// Define the item type for itinerary
export type ItineraryItem = {
  day: number;
  title: string;
  description: string;
};

// Generic field array type
export interface FieldArrayBase<T> {
  fields: any[];
  append: (value: T) => void;
  prepend: (value: T | T[]) => void;
  remove: (index: number | number[]) => void;
  swap: (indexA: number, indexB: number) => void;
  move: (from: number, to: number) => void;
  insert: (index: number, value: T) => void;
  update: (index: number, value: T) => void;
  replace: (value: T[]) => void;
}

// String field array type (for highlights, includes, excludes, dates)
export type StringFieldArray = FieldArrayBase<string>;

// Itinerary field array type
export type ItineraryFieldArray = FieldArrayBase<ItineraryItem>;

// Specific field array types
export type HighlightsFieldArray = StringFieldArray;
export type IncludesFieldArray = StringFieldArray;
export type ExcludesFieldArray = StringFieldArray;
export type DatesFieldArray = StringFieldArray;
export type ItineraryItemFieldArray = ItineraryFieldArray;
