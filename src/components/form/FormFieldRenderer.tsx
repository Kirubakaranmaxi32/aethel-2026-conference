import React from 'react';
import { FormFieldDefinition, RegistrationPayload } from '@/types/registration';
import { TextInput } from './TextInput';
import { SelectInput } from './SelectInput';
import { RadioCards } from './RadioCards';
import { CheckboxGroup } from './CheckboxGroup';

interface FormFieldRendererProps {
  field: FormFieldDefinition;
  value: any;
  onChange: (fieldId: keyof RegistrationPayload, value: any) => void;
  error?: string | null;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  const colClass = field.colSpan === 'half' ? 'col-span-1 sm:col-span-1' : 'col-span-full';

  let controlNode: React.ReactNode = null;

  switch (field.type) {
    case 'text':
    case 'email':
      controlNode = (
        <TextInput
          id={field.id}
          type={field.type}
          label={field.label}
          value={value || ''}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          helperText={field.helperText}
          required={field.required}
          error={error}
        />
      );
      break;

    case 'select':
      controlNode = (
        <SelectInput
          id={field.id}
          label={field.label}
          options={field.options || []}
          value={value || ''}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          helperText={field.helperText}
          required={field.required}
          error={error}
        />
      );
      break;

    case 'radio-cards':
      controlNode = (
        <RadioCards
          name={field.id}
          label={field.label}
          options={field.options || []}
          value={value || ''}
          onChange={(val) => onChange(field.id, val)}
          helperText={field.helperText}
          required={field.required}
          error={error}
        />
      );
      break;

    case 'checkbox-tags':
      controlNode = (
        <CheckboxGroup
          label={field.label}
          options={field.options || []}
          value={Array.isArray(value) ? value : []}
          onChange={(val) => onChange(field.id, val)}
          helperText={field.helperText}
          required={field.required}
          error={error}
        />
      );
      break;

    default:
      controlNode = null;
  }

  return <div className={colClass}>{controlNode}</div>;
};
