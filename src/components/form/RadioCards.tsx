import React from 'react';
import { Check } from 'lucide-react';
import { FieldOption } from '@/types/registration';

interface RadioCardsProps {
  label: string;
  name: string;
  options: FieldOption[];
  value?: string;
  onChange: (val: string) => void;
  error?: string | null;
  helperText?: string;
  required?: boolean;
}

export const RadioCards: React.FC<RadioCardsProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  required,
}) => {
  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
          {label} {required && <span className="text-accent-gold">*</span>}
        </label>
        {value && (
          <span className="text-[11px] font-mono text-neutral-500">
            Selected: <span className="text-neutral-300 capitalize">{value}</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <div
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`relative p-3.5 rounded-sm border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                isSelected
                  ? 'border-accent-gold/80 bg-surface-50 ring-1 ring-accent-gold/30'
                  : 'border-border bg-surface-100 hover:border-neutral-600 hover:bg-surface-50'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-100 tracking-tight">
                      {opt.label}
                    </h4>
                    {opt.badge && (
                      <span className="inline-block mt-0.5 text-[10px] font-mono uppercase tracking-wider text-accent-goldLight">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  {opt.price && (
                    <span className="font-mono text-sm font-semibold text-neutral-200">
                      {opt.price}
                    </span>
                  )}
                </div>

                {opt.description && (
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    {opt.description}
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono">
                <span className={isSelected ? 'text-accent-goldLight' : 'text-neutral-500'}>
                  {isSelected ? 'Selected Tier' : 'Select Tier'}
                </span>
                <div
                  className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-accent-gold bg-accent-gold text-neutral-950'
                      : 'border-neutral-600 bg-transparent'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            </div>
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
