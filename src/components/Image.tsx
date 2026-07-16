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
  // Served from the domain root on Vercel — no basePath prefix. (Until 2026-07-17 this
  // prepended '/Portfolio' for GitHub Pages.)
  const imageSrc = src.startsWith('http') || src.startsWith('/') ? src : `/${src}`;

  return (
    <NextImage
      src={imageSrc}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};
