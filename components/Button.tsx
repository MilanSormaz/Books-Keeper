import { forwardRef, ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  { className, children, variant = 'primary', asChild = false, ...props },
  ref
) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm md:px-6 md:py-2.5 md:text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-[#5A5A40] text-white hover:bg-[#4A4A30] focus:ring-[#5A5A40]',
    secondary: 'bg-transparent border border-[#5A5A40] text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white focus:ring-[#5A5A40]',
  };

    const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      className={twMerge(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = 'Button';
