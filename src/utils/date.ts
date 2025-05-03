
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Format a date string to a readable format
 * @param dateString Date string in ISO format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format a date string to a long format with day of week
 * @param dateString Date string in ISO format
 * @returns Formatted date string with day of week
 */
export const formatLongDate = (dateString: string): string => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch (error) {
    console.error('Error formatting long date:', error);
    return dateString;
  }
};

/**
 * Format a date string to show only the month and year
 * @param dateString Date string in ISO format
 * @returns Formatted month and year
 */
export const formatMonthYear = (dateString: string): string => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, "MMMM 'de' yyyy", { locale: ptBR });
  } catch (error) {
    console.error('Error formatting month/year:', error);
    return dateString;
  }
};
