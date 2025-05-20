import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export const Image = ({ src, alt, className, fill, width, height }: ImageProps) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      unoptimized // Since we're using static export
    />
  );
}; 