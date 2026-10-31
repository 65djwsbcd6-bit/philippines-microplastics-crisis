import React from 'react';

export type IconName =
  | 'pin'
  | 'bag'
  | 'box'
  | 'cup'
  | 'utensils'
  | 'clamshell'
  | 'delivery-cup'
  | 'delivery-straw'
  | 'delivery-cutlery'
  | 'delivery-bag'
  | 'delivery-sachet'
  | 'sunrise'
  | 'sun'
  | 'moon'
  | 'package'
  | 'micro'
  | 'plankton'
  | 'fish'
  | 'turtle'
  | 'users'
  | 'puzzle'
  | 'rain'
  | 'waves'
  | 'umbrella'
  | 'sprout'
  | 'coral'
  | 'soup'
  | 'bike'
  | 'sachet'
  | 'bottle'
  | 'straw'
  | 'image'
  | 'check'
  | 'refresh'
  | 'shield'
  | 'heart'
  | 'sparkles'
  | 'arrow-right'
  | 'leaf'
  | 'building'
  | 'landmark'
  | 'share';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = 'ic', ...props }) => {
  switch (name) {
    case 'pin':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    case 'bag':
    case 'delivery-bag':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
          <path d="M9.5 7v1a2.5 2.5 0 0 0 5 0V7" />
        </svg>
      );
    case 'box':
    case 'clamshell':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="2.5" y="6" width="19" height="3.5" rx="0.5" />
          <path d="M4.5 9.5v8.5a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-8.5" />
          <path d="M10 9.5v2.5h4v-2.5" />
        </svg>
      );
    case 'cup':
    case 'delivery-cup':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="9" y="3.5" width="6" height="2" rx="0.5" />
          <rect x="5" y="5.5" width="14" height="2" rx="0.5" />
          <path d="M6.5 7.5L8.5 20a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1l2-12.5" />
        </svg>
      );
    case 'utensils':
    case 'delivery-cutlery':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M6 3v4a2 2 0 0 0 4 0V3" />
          <line x1="8" y1="3" x2="8" y2="7" />
          <line x1="8" y1="9" x2="8" y2="21" />
          <path d="M13.5 6.5c0-2 1.1-3.5 2.5-3.5s2.5 1.5 2.5 3.5c0 2-1.1 3.5-2.5 3.5s-2.5-1.5-2.5-3.5z" />
          <line x1="16" y1="10" x2="16" y2="21" />
        </svg>
      );
    case 'sunrise':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M12 2v6M4.2 10.2l1.4 1.4M1 18h2M21 18h2M18.4 11.6l1.4-1.4M23 22H1M8 6l4-4 4 4M16 18a4 4 0 0 0-8 0" />
        </svg>
      );
    case 'sun':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
        </svg>
      );
    case 'moon':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z" />
        </svg>
      );
    case 'package':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M16.5 9.4 7.5 4.2M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7zM3.3 7 12 12l8.7-5M12 22V12" />
        </svg>
      );
    case 'micro':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M6 18h12M8 22h8M10 18a5 5 0 0 1 0-9M9 3l4 6M14 5l-3 5" />
        </svg>
      );
    case 'plankton':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M7 12c0-2 2-3 5-3s5 1 5 3-2 3-5 3-5-1-5-3zM3 7l3 2M3 17l3-2M21 7l-3 2M21 17l-3-2M12 5v2M12 17v2" />
        </svg>
      );
    case 'fish':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M2 12c4-6 12-6 16 0-4 6-12 6-16 0zM18 12l4-4v8zM7 11h.01" />
        </svg>
      );
    case 'turtle':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M5 14a7 5 0 0 1 14 0zM19 12l3-1.5M7 14l-2 3M17 14l2 3M10 14V9M14 14V9" />
        </svg>
      );
    case 'users':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2 21a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 7M22 21a7 7 0 0 0-4-6" />
        </svg>
      );
    case 'puzzle':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z" />
        </svg>
      );
    case 'rain':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M5 14a4 4 0 0 1 1-7.9A6 6 0 0 1 18 8a3.5 3.5 0 0 1 0 7M8 17v3M12 17v3M16 17v3" />
        </svg>
      );
    case 'waves':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M2 8c3 3 5-3 10 0s7-3 10 0M2 14c3 3 5-3 10 0s7-3 10 0M2 20c3 3 5-3 10 0s7-3 10 0" />
        </svg>
      );
    case 'umbrella':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M3 12a9 9 0 0 1 18 0zM12 12v8a2 2 0 0 0 4 0" />
        </svg>
      );
    case 'sprout':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M12 22V12M12 12c0-4 3-6 7-6 0 4-3 6-7 6zM12 15c0-3-2-5-6-5 0 3 2 5 6 5z" />
        </svg>
      );
    case 'coral':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M12 21V11M12 15l-4-4V6M12 13l4-4V4M8 11 5 8" />
        </svg>
      );
    case 'soup':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M4 12h16a8 8 0 0 1-16 0zM8 4c1 1 1 2 0 3M12 4c1 1 1 2 0 3M16 4c1 1 1 2 0 3" />
        </svg>
      );
    case 'bike':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <circle cx="5" cy="17" r="3" />
          <circle cx="19" cy="17" r="3" />
          <path d="M5 14h5l3-6h4l2 6M9 8h3" />
        </svg>
      );
    case 'sachet':
    case 'delivery-sachet':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="6" y="3" width="12" height="18" rx="1.5" />
          <line x1="6" y1="7.5" x2="18" y2="7.5" />
          <line x1="6" y1="16.5" x2="18" y2="16.5" />
        </svg>
      );
    case 'bottle':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M10 2h4M10 2v3l-2 3v13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8l-2-3V2M8 12h8" />
        </svg>
      );
    case 'straw':
    case 'delivery-straw':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M8.5 21L15 9.5 13 3.5" />
        </svg>
      );
    case 'image':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-4-4L5 21" />
        </svg>
      );
    case 'check':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case 'refresh':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
        </svg>
      );
    case 'shield':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'heart':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      );
    case 'leaf':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case 'building':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
        </svg>
      );
    case 'landmark':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <line x1="3" x2="21" y1="22" y2="22" />
          <line x1="6" x2="6" y1="18" y2="11" />
          <line x1="10" x2="10" y1="18" y2="11" />
          <line x1="14" x2="14" y1="18" y2="11" />
          <line x1="18" x2="18" y1="18" y2="11" />
          <polygon points="12 2 20 7 4 7" />
          <line x1="2" x2="22" y1="18" y2="18" />
        </svg>
      );
    case 'share':
      return (
        <svg className={className} viewBox="0 0 24 24" {...props}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
          <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
        </svg>
      );
    default:
      return null;
  }
};
