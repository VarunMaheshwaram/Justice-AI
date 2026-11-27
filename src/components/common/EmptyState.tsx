import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="rounded-lg border border-dashed border-[#E5E9EF] bg-white px-6 py-12 text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-[#F7F8FA] text-[#14243A]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-[#14243A]">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-[#697586]">{description}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
};
