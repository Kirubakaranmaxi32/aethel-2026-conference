import React from 'react';
import { Check } from 'lucide-react';
import { FieldOption } from '@/types/registration';

interface CheckboxGroupProps {
  label: string;
  options: FieldOption[];
  value?: string[];
  onChange: (val: string[]) => void;
  error?: string | null;
  helperText?: string;
  required?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  value = [],
  onChange,
  error,
  helperText,
  required,
}) => {
  const toggleOption = (optVal: string) => {
    if (value.includes(optVal)) {
      onChange(value.filter((v) => v !== optVal));
    } else {
      onChange([...value, optVal]);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
          {label} {required && <span className="text-accent-gold">*</span>}
        </label>
        <span className="text-[11px] font-mono text-neutral-500">
          {value.length} selected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {options.map((opt) => {
          const isSelected = value.includes(opt.value);
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => toggleOption(opt.value)}
              className={`p-3 rounded-sm border text-left transition-all duration-150 flex items-start gap-3 ${
                isSelected
                  ? 'border-accent-gold/70 bg-surface-50 ring-1 ring-accent-gold/20'
                  : 'border-border bg-surface-100 hover:border-neutral-600 hover:bg-surface-50'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-xs border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'border-accent-gold bg-accent-gold text-neutral-950'
                    : 'border-neutral-600 bg-transparent'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>

              <div className="flex-1 min-w-0">
                <span
                  className={`text-xs font-medium block truncate ${
                    isSelected ? 'text-neutral-100' : 'text-neutral-300'
                  }`}
                >
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="text-[11px] text-neutral-500 block line-clamp-1 mt-0.5">
                    {opt.description}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="text-xs text-rose-400 font-mono tracking-tight">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-neutral-500 leading-normal">{helperText}</p>
      ) : null}
    </div>
  );
};
