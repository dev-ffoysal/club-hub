/**
 * Utility functions for transforming data objects for React components
 */

/**
 * Extracts the ID from a university or category object
 * @param item - University or category object with _id property
 * @returns The ID string
 */
export const extractId = (item: any): string => {
  // If the item is already a string, return it
  if (typeof item === 'string') return item;
  
  // If the item is an object with an _id property, return the _id
  if (item && typeof item === 'object' && item._id) {
    return item._id;
  }
  
  // If we can't extract an ID, return an empty string
  return '';
};

/**
 * Extracts the name from a university or category object
 * @param item - University or category object with name property
 * @returns The name string
 */
export const extractName = (item: any): string => {
  // If the item is already a string, return it
  if (typeof item === 'string') return item;
  
  // If the item is an object with a name property, return the name
  if (item && typeof item === 'object' && item.name) {
    return item.name;
  }
  
  // If the item is an object with a title property (for categories), return the title
  if (item && typeof item === 'object' && item.title) {
    return item.title;
  }
  
  // If we can't extract a name, return an empty string
  return '';
};

/**
 * Prepares an array of university or category objects for use in Select components
 * @param items - Array of university or category objects
 * @returns Array of objects with value and label properties
 */
export const prepareSelectOptions = (items: any[]): { value: string; label: string }[] => {
  if (!items || !Array.isArray(items)) return [];
  
  return items.map(item => ({
    value: extractId(item),
    label: extractName(item)
  }));
};

/**
 * Prepares filter parameters for API requests
 * @param filters - Object containing filter parameters
 * @returns Object with IDs extracted from any university or category objects
 */
export const prepareFilterParams = (filters: any): any => {
  const result = { ...filters };
  
  // Extract IDs from university objects if present
  if (filters.universities && Array.isArray(filters.universities)) {
    result.universities = filters.universities.map(extractId);
  }
  
  // Extract IDs from category objects if present
  if (filters.categories && Array.isArray(filters.categories)) {
    result.categories = filters.categories.map(extractId);
  }
  
  return result;
};