import React, { useState } from 'react';
import { Icon } from './Icon';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  ...props
}) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`${className} flex flex-col items-center justify-center gap-1 bg-ocean-800/60 border border-dashed border-cyan-500/40 text-slate-400 text-[11px] text-center p-2 min-h-[100px]`}
      >
        <Icon name="image" className="w-5 h-5 text-cyan-400" />
        <span className="font-medium line-clamp-1">{alt}</span>
        <span className="font-mono text-[10px] opacity-70 line-clamp-1">{src}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};
