
import { ChangeEvent } from "react";

/**
 * Helper function to convert form input values to numbers
 * @param event Change event from input
 * @returns Number value from the input
 */
export const handleNumberInputChange = (
  event: ChangeEvent<HTMLInputElement>,
  defaultValue: number = 0
): number => {
  const value = event.target.value;
  return value === "" ? defaultValue : Number(value);
};

/**
 * Converts string to array of strings, cleaning up empty entries
 * @param input String input with delimiter
 * @param delimiter String delimiter (default: comma)
 * @returns Array of trimmed strings
 */
export const stringToArray = (
  input: string, 
  delimiter: string = ","
): string[] => {
  return input.split(delimiter)
    .map(item => item.trim())
    .filter(Boolean);
};

/**
 * Converts array of strings to a single string
 * @param arr Array of strings
 * @param delimiter String delimiter (default: comma)
 * @returns Combined string
 */
export const arrayToString = (
  arr: string[] | undefined,
  delimiter: string = ","
): string => {
  return Array.isArray(arr) ? arr.join(delimiter) : "";
};
