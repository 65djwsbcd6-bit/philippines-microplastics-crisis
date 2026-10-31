import React, { useState } from 'react';
import { Icon } from './Icon';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderOnly?: boolean;
  theme?: 'dark' | 'light';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  placeholderOnly = false,
  theme = 'dark',
  ...props
}) => {
  const [error, setError] = useState(false);

  if (error || placeholderOnly) {
    const isLight = theme === 'light';
    return (
      <div
        className={`${className} flex flex-col items-center justify-center gap-1.5 ${
          isLight
            ? 'bg-slate-50 border-2 border-dashed border-slate-300 text-slate-700'
            : 'bg-[#071923]/90 border-2 border-dashed border-cyan-500/40 text-slate-300'
        } text-xs text-center p-3 rounded-xl`}
      >
        <div
          className={`w-8 h-8 rounded-lg ${
            isLight
              ? 'bg-emerald-50 border border-emerald-300 text-emerald-600'
              : 'bg-cyan-500/10 border border-cyan-400/30 text-cyan-400'
          } flex items-center justify-center mb-0.5 shrink-0`}
        >
          <Icon name="image" className="w-4 h-4" />
        </div>
        <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'} line-clamp-1`}>
          {alt}
        </span>
        <span
          className={`font-mono text-[10px] ${
            isLight
              ? 'text-slate-600 bg-white border border-slate-200 shadow-xs'
              : 'text-cyan-300/90 bg-ocean-950/90 border border-cyan-500/30'
          } px-2 py-0.5 rounded line-clamp-1 max-w-[95%]`}
        >
          {src}
        </span>
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
