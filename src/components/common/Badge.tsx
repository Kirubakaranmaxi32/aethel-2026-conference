import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'approved' | 'pending' | 'rejected' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const base = 'inline-flex items-center font-mono font-medium tracking-wider uppercase rounded-xs transition-colors';

  const variants = {
    default: 'bg-surface-100 text-neutral-300 border border-border',
    gold: 'bg-accent-gold/10 text-accent-goldLight border border-accent-gold/30',
    approved: 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50',
    pending: 'bg-amber-950/40 text-amber-300 border border-amber-800/50',
    rejected: 'bg-rose-950/40 text-rose-300 border border-rose-800/50',
    outline: 'bg-transparent text-neutral-400 border border-border',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
  };

  const dotColors = {
    default: 'bg-neutral-400',
    gold: 'bg-accent-gold',
    approved: 'bg-emerald-400',
    pending: 'bg-amber-400',
    rejected: 'bg-rose-400',
    outline: 'bg-neutral-500',
  };

  return (
    <span className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} shrink-0`} />}
      <span>{children}</span>
    </span>
  );
};
