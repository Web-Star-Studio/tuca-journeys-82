
/**
 * Format a date string to a localized date format
 * 
 * @param dateString ISO date string to format
 * @param locale Locale to use for formatting (default: 'pt-BR')
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, locale: string = 'pt-BR'): string => {
  if (!dateString) return 'Data não disponível';
  
  try {
    return new Date(dateString).toLocaleDateString(locale);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Data inválida';
  }
};

/**
 * Format a date string to a localized date and time format
 * 
 * @param dateString ISO date string to format
 * @param locale Locale to use for formatting (default: 'pt-BR')
 * @returns Formatted date and time string
 */
export const formatDateTime = (dateString: string, locale: string = 'pt-BR'): string => {
  if (!dateString) return 'Data não disponível';
  
  try {
    return new Date(dateString).toLocaleString(locale);
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return 'Data inválida';
  }
};

/**
 * Get the number of days between two date strings
 * 
 * @param startDateString Start date string
 * @param endDateString End date string
 * @returns Number of days between the dates
 */
export const getDaysBetween = (startDateString: string, endDateString: string): number => {
  try {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (error) {
    console.error('Error calculating days between dates:', error);
    return 0;
  }
};

/**
 * Get the number of days from now to a future date
 * 
 * @param futureDateString Future date string
 * @returns Number of days from now to the future date
 */
export const getDaysFromNow = (futureDateString: string): number => {
  try {
    const futureDate = new Date(futureDateString);
    const today = new Date();
    
    // Clear time portion for accurate day calculation
    today.setHours(0, 0, 0, 0);
    futureDate.setHours(0, 0, 0, 0);
    
    const diffTime = futureDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  } catch (error) {
    console.error('Error calculating days from now:', error);
    return 0;
  }
};
