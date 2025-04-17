
/**
 * Format a price to a localized currency format
 * 
 * @param price Price to format
 * @param locale Locale to use for formatting (default: 'pt-BR')
 * @param currency Currency to use (default: 'BRL')
 * @returns Formatted price string
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
 * Format a number with thousand separators
 * 
 * @param num Number to format
 * @param locale Locale to use for formatting (default: 'pt-BR')
 * @returns Formatted number string
 */
export const formatNumber = (
  num: number | undefined,
  locale: string = 'pt-BR'
): string => {
  if (num === undefined || num === null) {
    return 'Número não disponível';
  }
  
  try {
    return new Intl.NumberFormat(locale).format(num);
  } catch (error) {
    console.error('Error formatting number:', error);
    return num.toString();
  }
};

/**
 * Truncate a string to a maximum length and add ellipsis if needed
 * 
 * @param text Text to truncate
 * @param maxLength Maximum length of the truncated text
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  
  return text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;
};

/**
 * Format a phone number to a standard format
 * 
 * @param phoneNumber Phone number to format
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return '';
  
  // Remove non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format based on Brazilian phone number pattern
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phoneNumber;
};
