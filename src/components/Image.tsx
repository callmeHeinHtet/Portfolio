import NextImage from 'next/image';
import { BASE_PATH } from '@/utils/constants';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export const Image = ({ src, alt, className, fill, width, height }: ImageProps) => {
  // Remove any leading slash and combine with BASE_PATH
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  
  // In production, prepend the base path
  const fullPath = process.env.NODE_ENV === 'production'
    ? `${BASE_PATH}/static/images/${cleanSrc}`
    : `/${cleanSrc}`;

  return (
    <NextImage
      src={fullPath}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      unoptimized // Since we're using static export
    />
  );
}; 