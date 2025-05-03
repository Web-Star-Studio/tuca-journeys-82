/**
 * Date formatting and manipulation utilities
 */

/**
 * Format a date to a localized string representation
 * @param date The date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns The formatted date string
 */
export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', options).format(dateObj);
};

/**
 * Format a date range (start and end dates)
 * @param startDate Start date
 * @param endDate End date
 * @returns Formatted date range string
 */
export const formatDateRange = (startDate: Date | string, endDate: Date | string): string => {
  if (!startDate || !endDate) return '';
  
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  // If same day, return single date
  if (start.toDateString() === end.toDateString()) {
    return formatDate(start);
  }

  // If same month and year, return format like "1-5 January 2023"
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}-${end.getDate()} ${formatDate(start, { month: 'long', year: 'numeric' })}`;
  }
  
  // Otherwise, return full range
  return `${formatDate(start)} - ${formatDate(end)}`;
};

/**
 * Format time from date object or string
 * @param date Date object or string
 * @returns Formatted time string (HH:MM)
 */
export const formatTime = (date: Date | string): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Format a date and time together
 * @param date The date to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: Date | string): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return `${formatDate(dateObj)}, ${formatTime(dateObj)}`;
};

/**
 * Check if a date is today
 * @param date Date to check
 * @returns Boolean indicating if the date is today
 */
export const isToday = (date: Date | string): boolean => {
  const today = new Date();
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  
  return checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear();
};
