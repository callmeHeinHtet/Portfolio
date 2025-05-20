export const getImagePath = (src: string): string => {
  // Remove any leading slash to prevent double slashes
  const cleanPath = src.startsWith('/') ? src.slice(1) : src;
  
  // In production, all assets should be under /Portfolio/
  if (process.env.NODE_ENV === 'production') {
    return `/Portfolio/${cleanPath}`;
  }
  // In development, serve from root
  return `/${cleanPath}`;
}; 