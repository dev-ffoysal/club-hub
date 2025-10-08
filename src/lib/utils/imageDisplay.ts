export const getImageUrl = (image: string | undefined | File) => {
  // Get the base URL from environment or fallback to localhost
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5001';
  
  // Handle string images
  if (typeof image === 'string') {
    // If it's already a full HTTPS URL, return as is
    if (image.startsWith('https://') || image.startsWith('http://')) {
      return image;
    }
    
    // If it starts with /images/, it's a relative path from domain root
    if (image.startsWith('/images/')) {
      return `${baseUrl}${image}`;
    }
    
    // If it starts with /, it's already a relative path from domain root
    if (image.startsWith('/')) {
      return `${baseUrl}${image}`;
    }
    
    // Otherwise, add base URL with a slash
    return `${baseUrl}/${image}`;
  }
  
  // Handle number images (legacy support)
  console.log('image', image, baseUrl);
  return `${baseUrl}/${image}`;
}