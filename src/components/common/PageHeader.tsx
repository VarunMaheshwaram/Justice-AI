import React from 'react';
import { cn } from '../../utils/cn';

interface PageHeaderProps {
  title: string;
  description?: string;
  meta?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  meta,
  actions,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 pb-6 border-b border-[#E5E9EF] sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className="space-y-1 min-w-0">
        {meta && <p className="text-xs font-medium text-[#D9874D]">{meta}</p>}
        <h1 className="text-2xl font-semibold tracking-tight text-[#14243A]">{title}</h1>
        {description && (
          <p className="text-sm text-[#697586] max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">{actions}</div>
      )}
    </div>
  );
};
