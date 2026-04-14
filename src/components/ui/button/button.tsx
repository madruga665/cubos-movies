import { cn } from '@/lib/tailwind-merge';
import React from 'react';
import { Spinner } from '../spinner/spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  className,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'flex items-center justify-center min-h-[44px] px-5 py-3 rounded-[2px] font-roboto font-normal text-base transition-opacity hover:opacity-90 active:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-white font-bold',
    ghost: 'bg-[rgba(183,68,247,0.08)] text-primary backdrop-blur-[2px] font-bold',
  };

  return (
    <button
      className={cn(`${baseStyles} ${variants[variant]}`, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Spinner size="sm" className="mr-2" /> : null}
      {children}
    </button>
  );
}
