
/**
 * Format a number as currency in BRL format
 * @param value Number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Format a date in Brazilian format (DD/MM/YYYY)
 * @param date Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR');
};

/**
 * Format a date and time in Brazilian format (DD/MM/YYYY HH:MM)
 * @param date Date to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: Date | string): string => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR') + ' ' + 
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};
