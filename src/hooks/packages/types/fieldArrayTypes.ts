
import { UseFieldArrayReturn } from "react-hook-form";
import { PackageFormValues } from "@/components/admin/packages/types";

// Define the item type for itinerary
export type ItineraryItem = {
  day: number;
  title: string;
  description: string;
};

// Define the field item type for string-based arrays
export type FieldItem = {
  title: string;
  description?: string;
  day?: number;
};

// Generic field array type for field items
export interface StringFieldArrayType {
  fields: any[];
  append: (value: FieldItem) => void;
  prepend: (value: FieldItem | FieldItem[]) => void;
  remove: (index: number | number[]) => void;
  swap: (indexA: number, indexB: number) => void;
  move: (from: number, to: number) => void;
  insert: (index: number, value: FieldItem) => void;
  update: (index: number, value: FieldItem) => void;
  replace: (value: FieldItem[]) => void;
}

// Generic field array type for itinerary items
export interface ItineraryFieldArrayType {
  fields: any[];
  append: (value: ItineraryItem) => void;
  prepend: (value: ItineraryItem | ItineraryItem[]) => void;
  remove: (index: number | number[]) => void;
  swap: (indexA: number, indexB: number) => void;
  move: (from: number, to: number) => void;
  insert: (index: number, value: ItineraryItem) => void;
  update: (index: number, value: ItineraryItem) => void;
  replace: (value: ItineraryItem[]) => void;
}

// Specific field array types
export type HighlightsFieldArray = StringFieldArrayType;
export type IncludesFieldArray = StringFieldArrayType;
export type ExcludesFieldArray = StringFieldArrayType;
export type DatesFieldArray = StringFieldArrayType;
export type ItineraryItemFieldArray = ItineraryFieldArrayType;
