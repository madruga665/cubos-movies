import { cn } from '@/lib/tailwind-merge';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const baseStyles =
    'flex items-center justify-center min-h-[44px] px-5 py-3 rounded-[2px] font-roboto font-normal text-base transition-opacity hover:opacity-90 active:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-white',
    ghost: 'bg-[rgba(183,68,247,0.08)] text-primary backdrop-blur-[2px]',
  };

  return (
    <button className={cn(`${baseStyles} ${variants[variant]}`, className)} {...props}>
      {children}
    </button>
  );
}
