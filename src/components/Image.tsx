import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean; // only the LCP image should be true; everything else lazy-loads
  sizes?: string;
}

export const Image = ({ src, alt, className, fill, width, height, priority = false, sizes }: ImageProps) => {
  // Handle both absolute URLs and relative paths
  const imageSrc = src.startsWith('http')
    ? src
    : process.env.NODE_ENV === 'production'
      ? `/Portfolio${src.startsWith('/') ? src : `/${src}`}`
      : src.startsWith('/') ? src : `/${src}`;

  return (
    <NextImage
      src={imageSrc}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      unoptimized // Required for static export
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};
