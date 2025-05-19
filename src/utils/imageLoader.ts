export const getImagePath = (src: string): string => {
  if (process.env.NODE_ENV === 'production') {
    return `/Portfolio${src}`;
  }
  return src;
}; 