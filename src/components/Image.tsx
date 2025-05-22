import NextImage from 'next/image';
import { ASSET_PREFIX } from '@/utils/constants';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export const Image = ({ src, alt, className, fill, width, height }: ImageProps) => {
  // Handle both absolute URLs and relative paths
  const imageSrc = src.startsWith('http') ? src : `${ASSET_PREFIX}${src}`;

  return (
    <NextImage
      src={imageSrc}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      unoptimized // Required for static export
      priority // Load images immediately
    />
  );
}; 