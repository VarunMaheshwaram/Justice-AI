import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-md text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14243A] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-[#14243A] text-white hover:bg-[#203650]',
        accent: 'bg-[#D9874D] text-white hover:bg-[#c5753d]',
        destructive: 'bg-[#C94D4D] text-white hover:bg-[#b23f3f]',
        outline:
          'border border-[#E5E9EF] bg-white text-[#202936] hover:bg-[#F7F8FA] hover:border-[#cfd7e3]',
        secondary: 'bg-[#F7F8FA] text-[#202936] hover:bg-[#eceff4] border border-[#E5E9EF]',
        ghost: 'text-[#202936] hover:bg-[#F7F8FA]',
        link: 'text-[#14243A] underline-offset-4 hover:underline px-0',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-11 px-6 text-sm',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
