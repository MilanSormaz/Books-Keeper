import { forwardRef, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, className, required, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1">
        <textarea
          ref={ref}
          rows={4}
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

Textarea.displayName = 'Textarea';
