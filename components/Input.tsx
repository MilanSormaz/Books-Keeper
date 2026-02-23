import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, required, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1">
        <input
          ref={ref}
          className={twMerge(
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-[#5A5A40] focus:ring-[#5A5A40] sm:text-sm',
            error && 'border-red-500'
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
});

Input.displayName = 'Input';
