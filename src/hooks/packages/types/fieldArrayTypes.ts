
import { UseFieldArrayReturn } from "react-hook-form";
import { PackageFormValues } from "@/components/admin/packages/types";

// Define the item type for itinerary
export type ItineraryItem = {
  day: number;
  title: string;
  description: string;
};

// Base types for the field arrays
export type StringFieldArray = {
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

export type ItineraryItemFieldArray = {
  fields: any[];
  append: (value: ItineraryItem) => void;
  prepend: (value: ItineraryItem | ItineraryItem[]) => void;
  remove: (index: number | number[]) => void;
  swap: (indexA: number, indexB: number) => void;
  move: (from: number, to: number) => void;
  insert: (index: number, value: ItineraryItem) => void;
  replace: (index: number, value: ItineraryItem) => void;
  update: (index: number, value: ItineraryItem) => void;
};

// Specific field array types
export type HighlightsFieldArray = StringFieldArray;
export type IncludesFieldArray = StringFieldArray;
export type ExcludesFieldArray = StringFieldArray;
export type DatesFieldArray = StringFieldArray;
export type ItineraryFieldArray = ItineraryItemFieldArray;
