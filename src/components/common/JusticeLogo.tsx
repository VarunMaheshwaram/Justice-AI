import React from 'react';
import { cn } from '../../utils/cn';

interface JusticeLogoProps {
  variant?: 'dark' | 'light';
  compact?: boolean;
  className?: string;
}

export const JusticeLogo: React.FC<JusticeLogoProps> = ({
  variant = 'dark',
  compact = false,
  className,
}) => {
  const isLight = variant === 'light';
  return (
    <span className={cn('inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none', className)}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="7"
          fill={isLight ? '#203650' : '#14243A'}
          stroke={isLight ? '#344f70' : '#14243A'}
          strokeWidth="1"
        />
        {/* Central pillar + neural node */}
        <path
          d="M16 7V24M11.5 24H20.5"
          stroke="#FFFFFF"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        {/* Balance beam */}
        <path
          d="M8.5 11.5H23.5"
          stroke="#D9874D"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        {/* Left scale pan */}
        <path
          d="M8.5 11.5L6.5 17H10.5L8.5 11.5Z"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M6 17.5C6.8 18.8 10.2 18.8 11 17.5" stroke="#D9874D" strokeWidth="1.4" strokeLinecap="round" />
        {/* Right scale pan */}
        <path
          d="M23.5 11.5L21.5 17H25.5L23.5 11.5Z"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M21 17.5C21.8 18.8 25.2 18.8 26 17.5" stroke="#D9874D" strokeWidth="1.4" strokeLinecap="round" />
        {/* Apex precision node */}
        <circle cx="16" cy="7.5" r="2" fill="#D9874D" />
      </svg>
      {!compact && (
        <span
          className={cn(
            'text-base font-bold tracking-tight',
            isLight ? 'text-white' : 'text-[#14243A]'
          )}
        >
          JUSTICE <span className="text-[#D9874D]">AI</span>
        </span>
      )}
    </span>
  );
};
