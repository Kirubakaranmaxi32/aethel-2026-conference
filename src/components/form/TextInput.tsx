import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  helperText?: string;
  required?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helperText,
  required,
  id,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
          {label} {required && <span className="text-accent-gold">*</span>}
        </label>
      </div>

      <input
        id={id}
        className={`w-full bg-surface-100 border text-neutral-100 text-sm px-3.5 py-2.5 rounded-sm transition-colors duration-150 placeholder:text-neutral-600 focus:outline-none focus:bg-surface-50 ${
          error
            ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/20'
            : 'border-border focus:border-neutral-400'
        } ${className}`}
        {...props}
      />

      {error ? (
        <p className="text-xs text-rose-400 font-mono tracking-tight">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-neutral-500 leading-normal">{helperText}</p>
      ) : null}
    </div>
  );
};
