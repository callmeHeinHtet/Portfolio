export const getImagePath = (src: string): string => {
  // Remove any leading slash to prevent double slashes
  const cleanPath = src.startsWith('/') ? src.slice(1) : src;
  
  if (process.env.NODE_ENV === 'production') {
    // For production (GitHub Pages)
    return `/Portfolio/${cleanPath}`;
  }
  // For development
  return `/${cleanPath}`;
}; 