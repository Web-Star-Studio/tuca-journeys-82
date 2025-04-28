
/**
 * Format a price to a localized currency string
 * 
 * @param price The price to format
 * @param locale The locale to use for formatting (default: 'pt-BR')
 * @param currency The currency code (default: 'BRL')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  price: number | undefined, 
  locale: string = 'pt-BR', 
  currency: string = 'BRL'
): string => {
  if (price === undefined || price === null) {
    return 'Valor não disponível';
  }
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(price);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `R$ ${price.toFixed(2)}`;
  }
};

/**
 * Format a date to a localized string
 * 
 * @param date The date to format
 * @param locale The locale to use for formatting (default: 'pt-BR')
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | undefined,
  locale: string = 'pt-BR'
): string => {
  if (!date) return 'Data não disponível';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale);
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(date);
  }
};
