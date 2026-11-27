import React from 'react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  label: string;
  value: string | number;
  detail?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, detail, className }) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-[#E5E9EF] bg-white p-5 flex flex-col justify-between gap-2',
        className
      )}
    >
      <span className="text-xs font-medium text-[#697586]">{label}</span>
      <span className="text-2xl font-semibold tracking-tight text-[#14243A] tabular-nums">
        {value}
      </span>
      {detail && <span className="text-xs text-[#697586]">{detail}</span>}
    </div>
  );
};

interface StatusTextProps {
  status: string;
  className?: string;
}

export const StatusText: React.FC<StatusTextProps> = ({ status, className }) => {
  const normalized = status.toLowerCase();
  let colorClass = 'text-[#203650]';

  if (
    normalized.includes('complete') ||
    normalized.includes('active') ||
    normalized.includes('approved') ||
    normalized.includes('responded') ||
    normalized.includes('clarified') ||
    normalized.includes('court-confirmed') ||
    normalized.includes('success')
  ) {
    colorClass = 'text-[#24845D]';
  } else if (
    normalized.includes('pending') ||
    normalized.includes('processing') ||
    normalized.includes('review') ||
    normalized.includes('flagged') ||
    normalized.includes('medium') ||
    normalized.includes('ai-extracted')
  ) {
    colorClass = 'text-[#D99A35]';
  } else if (
    normalized.includes('failed') ||
    normalized.includes('rejected') ||
    normalized.includes('suspended') ||
    normalized.includes('high')
  ) {
    colorClass = 'text-[#C94D4D]';
  } else if (
    normalized.includes('archived') ||
    normalized.includes('closed') ||
    normalized.includes('inactive') ||
    normalized.includes('not submitted')
  ) {
    colorClass = 'text-[#697586]';
  }

  return (
    <span className={cn('text-xs font-semibold whitespace-nowrap', colorClass, className)}>
      {status}
    </span>
  );
};
