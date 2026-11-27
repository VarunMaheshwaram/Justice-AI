import React from 'react';
import { Info } from 'lucide-react';
import { LEGAL_DISCLAIMER_TEXT } from '../../constants';
import { cn } from '../../utils/cn';

interface DisclaimerBannerProps {
  compact?: boolean;
  demoNotice?: string;
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  compact = false,
  demoNotice,
  className,
}) => {
  return (
    <div
      role="note"
      className={cn(
        'rounded-lg border border-[#E5E9EF] bg-white px-4 py-3 text-xs text-[#697586] leading-relaxed',
        className
      )}
    >
      <div className="flex items-start gap-2.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#D9874D]" aria-hidden="true" />
        <div className="space-y-1">
          {demoNotice && (
            <p className="font-medium text-[#14243A]">{demoNotice}</p>
          )}
          <p className={compact ? 'line-clamp-2' : ''}>{LEGAL_DISCLAIMER_TEXT}</p>
        </div>
      </div>
    </div>
  );
};
