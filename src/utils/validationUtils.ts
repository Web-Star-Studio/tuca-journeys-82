
/**
 * Utility functions for data validation and sanitization
 */

/**
 * Validate an email address
 * @param email The email to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitize a string to prevent XSS attacks
 * @param input The string to sanitize
 * @returns The sanitized string
 */
export const sanitizeString = (input: string): string => {
  if (!input) return '';
  
  // Replace potentially dangerous characters
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
};

/**
 * Validate a URL
 * @param url The URL to validate
 * @returns True if the URL is valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate an image URL and ensure it has an image extension
 * @param url The URL to validate
 * @returns True if the URL is a valid image URL, false otherwise
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!isValidUrl(url)) return false;
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
  const lowerUrl = url.toLowerCase();
  
  return imageExtensions.some(ext => lowerUrl.endsWith(ext));
};

/**
 * Validate a price value
 * @param price The price to validate
 * @returns True if the price is valid (number >= 0), false otherwise
 */
export const isValidPrice = (price: any): boolean => {
  const parsedPrice = parseFloat(price);
  return !isNaN(parsedPrice) && parsedPrice >= 0;
};

/**
 * Format a price in BRL currency
 * @param price The price to format
 * @returns The formatted price string
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(price);
};

/**
 * Format a date using the Brazilian format (DD/MM/YYYY)
 * @param date The date to format
 * @returns The formatted date string
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR');
};

/**
 * Check if all required fields in an object are present and non-empty
 * @param obj The object to check
 * @param requiredFields Array of field names that are required
 * @returns True if all required fields have values, false otherwise
 */
export const hasRequiredFields = (obj: any, requiredFields: string[]): boolean => {
  return requiredFields.every(field => {
    const value = obj[field];
    if (value === undefined || value === null) return false;
    if (typeof value === 'string') return value.trim() !== '';
    return true;
  });
};

/**
 * Validate a phone number (Brazilian format)
 * @param phone The phone number to validate
 * @returns True if the phone number is valid, false otherwise
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  // Basic Brazilian phone validation (accepts formats like: +55 11 98765-4321 or 11987654321)
  const phoneRegex = /^(\+?\d{1,3}[ -]?)?(\(?\d{2}\)?[ -]?)?(\d{4,5}[ -]?\d{4})$/;
  return phoneRegex.test(phone);
};

/**
 * Validate a CPF number
 * @param cpf The CPF number to validate
 * @returns True if the CPF is valid, false otherwise
 */
export const isValidCPF = (cpf: string): boolean => {
  // Remove non-numeric characters
  cpf = cpf.replace(/[^\d]/g, '');
  
  // CPF must have 11 digits
  if (cpf.length !== 11) return false;
  
  // Check if all digits are the same (invalid CPF)
  if (/^(\d)\1+$/.test(cpf)) return false;
  
  // Validate digits
  let sum = 0;
  let remainder;
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
};

/**
 * Helper to generate a random ID (for client-side use only)
 * @returns A random string ID
 */
export const generateClientId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
