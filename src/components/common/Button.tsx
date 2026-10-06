import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none tracking-tight select-none';

  const variants = {
    primary: 'bg-neutral-100 text-neutral-950 hover:bg-white border border-transparent shadow-subtle focus:ring-neutral-400',
    accent: 'bg-accent-gold text-neutral-950 hover:bg-accent-goldLight border border-transparent shadow-subtle focus:ring-accent-goldLight font-semibold',
    secondary: 'bg-surface-100 text-neutral-200 hover:text-white hover:bg-surface-50 border border-border hover:border-neutral-600 focus:ring-neutral-500',
    ghost: 'bg-transparent text-neutral-400 hover:text-neutral-100 hover:bg-surface-100 border border-transparent focus:ring-neutral-600',
    danger: 'bg-rose-950/60 text-rose-300 hover:bg-rose-900/80 border border-rose-800/60 focus:ring-rose-500',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-sm gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-sm gap-2',
    lg: 'text-base px-6 py-3.5 rounded-sm gap-2.5 tracking-normal',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
