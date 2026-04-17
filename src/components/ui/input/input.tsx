import React, { forwardRef, useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-2 w-full max-w-95">
      <label htmlFor={id} className="font-roboto font-bold text-[12.8px] text-foreground">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className={`bg-input-bg border rounded-sm min-h-11 p-3 font-roboto font-normal text-base text-foreground placeholder:text-secondary-text outline-none transition-colors ${
          error ? 'border-red-500 focus:border-red-600' : 'border-[#3c393f] focus:border-primary'
        }`}
        {...props}
      />
      {error && <span className="text-red-500 text-xs font-roboto -mt-1">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
