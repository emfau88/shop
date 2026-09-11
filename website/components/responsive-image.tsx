import type { ImgHTMLAttributes } from 'react';

type ResponsiveImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'sizes' | 'width'
> & {
  src: string;
  sourceWidth: number;
  sizes?: string;
};

function responsiveSrcSet(src: string, sourceWidth: number) {
  const extensionIndex = src.lastIndexOf('.');
  const base = src.slice(0, extensionIndex);

  return `${base}-480.webp 480w, ${base}-960.webp 960w, ${src} ${sourceWidth}w`;
}

export function ResponsiveImage({
  src,
  sourceWidth,
  sizes = '100vw',
  decoding = 'async',
  ...props
}: ResponsiveImageProps) {
  return (
    <img
      {...props}
      src={src}
      srcSet={responsiveSrcSet(src, sourceWidth)}
      sizes={sizes}
      width={sourceWidth}
      decoding={decoding}
    />
  );
}
