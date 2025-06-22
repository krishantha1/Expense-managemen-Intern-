/**
 * Generates a unique supplier code with the format: SUP-XXXXXXXX
 * where X is a random alphanumeric character (uppercase letters and numbers)
 * @returns {string} A unique supplier code
 */
export const generateSupplierCode = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "SUP-";

  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Add timestamp suffix to ensure uniqueness
  const timestamp = Date.now().toString(36).toUpperCase();
  result += `-${timestamp}`;

  return result;
};

/**
 * Validates if a supplier code follows the correct format
 * @param code - The supplier code to validate
 * @returns {boolean} True if the code is valid, false otherwise
 */
export const isValidSupplierCode = (code: string): boolean => {
  const pattern = /^SUP-[A-Z0-9]{8}-[A-Z0-9]+$/;
  return pattern.test(code);
};
