import * as React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-[#E5E9EF] bg-white px-3 py-2 text-sm text-[#202936] placeholder:text-[#697586]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14243A] focus-visible:border-[#14243A] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      'flex min-h-[96px] w-full rounded-md border border-[#E5E9EF] bg-white px-3 py-2 text-sm text-[#202936] placeholder:text-[#697586]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14243A] focus-visible:border-[#14243A] disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      'flex h-10 w-full rounded-md border border-[#E5E9EF] bg-white px-3 py-2 text-sm text-[#202936] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14243A] focus-visible:border-[#14243A] disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = 'Select';

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('text-sm font-medium leading-none text-[#202936]', className)}
    {...props}
  />
));
Label.displayName = 'Label';

export { Input, Textarea, Select, Label };
