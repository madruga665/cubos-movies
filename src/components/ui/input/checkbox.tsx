'use client';

import React from 'react';
import { cn } from '@/lib/tailwind-merge';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer group select-none", className)}>
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className="peer appearance-none size-5 border border-primary rounded-sm bg-transparent checked:bg-primary transition-all duration-200"
          {...props}
        />
        <svg
          className="absolute size-3.5 text-background pointer-events-none hidden peer-checked:block stroke-[4]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span className="text-sm font-roboto text-foreground group-hover:text-primary transition-colors">
        {label}
      </span>
    </label>
  );
}
