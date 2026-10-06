import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FieldOption } from '@/types/registration';

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: FieldOption[];
  error?: string | null;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  error,
  helperText,
  required,
  placeholder,
  id,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={id} className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
        {label} {required && <span className="text-accent-gold">*</span>}
      </label>

      <div className="relative">
        <select
          id={id}
          className={`w-full appearance-none bg-surface-100 border text-neutral-100 text-sm px-3.5 py-2.5 pr-10 rounded-sm transition-colors duration-150 focus:outline-none focus:bg-surface-50 cursor-pointer ${
            error
              ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/20'
              : 'border-border focus:border-neutral-400'
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-surface-200 text-neutral-500">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface-200 text-neutral-200">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="text-xs text-rose-400 font-mono tracking-tight">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-neutral-500 leading-normal">{helperText}</p>
      ) : null}
    </div>
  );
};
