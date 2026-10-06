import React, { useState } from 'react';
import { RegistrationConfig, RegistrationPayload, RegistrationRecord } from '@/types/registration';
import { FormFieldRenderer } from './FormFieldRenderer';
import { Button } from '@/components/common/Button';
import { submitRegistration, getSupabaseCredentials } from '@/lib/supabase';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface DynamicRegistrationFormProps {
  config: RegistrationConfig;
  initialValues?: Partial<RegistrationPayload>;
  onSuccess?: (record: RegistrationRecord) => void;
  onOpenSupabaseConfig?: () => void;
}

export const DynamicRegistrationForm: React.FC<DynamicRegistrationFormProps> = ({
  config,
  initialValues = {},
  onSuccess,
  onOpenSupabaseConfig,
}) => {
  // Initialize form state dynamically from configuration fields
  const [formData, setFormData] = useState<Partial<RegistrationPayload>>(() => {
    const defaults: Partial<RegistrationPayload> = {
      full_name: '',
      email: '',
      company: '',
      job_title: '',
      ticket_type: 'all-access', // sensible default or from initialValues
      industry: '',
      networking_interest: [],
      ...initialValues,
    };
    return defaults;
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationRecord | null>(null);

  const { isConfigured } = getSupabaseCredentials();

  // Field change handler
  const handleFieldChange = (fieldId: keyof RegistrationPayload, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear error for field on modification
    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: null,
      }));
    }
  };

  // Dynamic validation driven by config schema
  const validateForm = (): boolean => {
    const newErrors: Record<string, string | null> = {};
    let isValid = true;

    for (const field of config.fields) {
      const val = formData[field.id];

      // 1. Required check
      if (field.required) {
        if (
          val === undefined ||
          val === null ||
          val === '' ||
          (Array.isArray(val) && val.length === 0)
        ) {
          newErrors[field.id] = `${field.label} is required.`;
          isValid = false;
          continue;
        }
      }

      // 2. Custom validation function specified in field config
      if (field.validate) {
        const errorMsg = field.validate(val, formData);
        if (errorMsg) {
          newErrors[field.id] = errorMsg;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const payload: RegistrationPayload = {
      full_name: (formData.full_name || '').trim(),
      email: (formData.email || '').trim(),
      company: (formData.company || '').trim(),
      job_title: (formData.job_title || '').trim(),
      ticket_type: formData.ticket_type || 'standard',
      industry: formData.industry || 'Artificial Intelligence & ML',
      networking_interest: formData.networking_interest || [],
    };

    const result = await submitRegistration(payload);

    setIsSubmitting(false);

    if (!result.success || !result.data) {
      setSubmitError(
        result.error || 'Unable to store registration. Please check Supabase database connection.'
      );
      return;
    }

    setSubmittedRecord(result.data);
    if (onSuccess) {
      onSuccess(result.data);
    }
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setFormData({
      full_name: '',
      email: '',
      company: '',
      job_title: '',
      ticket_type: 'all-access',
      industry: '',
      networking_interest: [],
    });
  };

  // Success view
  if (submittedRecord) {
    return (
      <div className="p-8 sm:p-10 bg-surface-200 border border-border rounded-sm shadow-editorial space-y-6 animate-fade-in">
        <div className="flex items-center gap-3 text-emerald-400">
          <CheckCircle2 className="w-8 h-8 shrink-0" />
          <div>
            <h3 className="text-xl font-serif text-neutral-100 tracking-tight">
              {config.successMessage.title}
            </h3>
            <p className="text-xs font-mono text-emerald-400/90 uppercase tracking-widest mt-0.5">
              Registration Dossier // Confirmed
            </p>
          </div>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed">
          {config.successMessage.description}
        </p>

        {/* Dossier card */}
        <div className="p-5 bg-surface-100 border border-border-subtle rounded-sm space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <span className="text-neutral-500">DOSSIER RECORD ID</span>
            <span className="text-neutral-200 font-semibold">{submittedRecord.id.slice(0, 8)}...</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-neutral-500 block text-[10px]">DELEGATE</span>
              <span className="text-neutral-200">{submittedRecord.full_name}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">CREDENTIAL EMAIL</span>
              <span className="text-neutral-200">{submittedRecord.email}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">AFFILIATION</span>
              <span className="text-neutral-200">
                {submittedRecord.job_title}, {submittedRecord.company}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px]">ADMISSION TIER</span>
              <span className="text-accent-goldLight font-medium capitalize">
                {submittedRecord.ticket_type}
              </span>
            </div>
          </div>
          <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px]">
            <span className="text-neutral-500">INITIAL REVIEW STATUS</span>
            <span className="px-2 py-0.5 bg-amber-950/60 border border-amber-800/80 text-amber-300 uppercase tracking-wider rounded-xs">
              {submittedRecord.status}
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-neutral-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-accent-gold" />
            Stored securely in Supabase PostgreSQL
          </span>
          <Button variant="secondary" size="sm" onClick={handleReset}>
            Submit Another Registration
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isConfigured && (
        <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-sm text-xs text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium text-amber-100">Supabase Connection Required</p>
            <p className="text-neutral-400 leading-relaxed">
              {getSupabaseCredentials().missing === 'anonKey'
                ? `Project URL (${getSupabaseCredentials().url}) is connected, but VITE_SUPABASE_ANON_KEY is missing. Add your publishable/anon key in .env or via the configuration console.`
                : 'Registrations are stored in Supabase PostgreSQL. Configure your project credentials to enable live submissions.'}
            </p>
            {onOpenSupabaseConfig && (
              <button
                type="button"
                onClick={onOpenSupabaseConfig}
                className="mt-1 text-xs text-accent-goldLight underline hover:text-white"
              >
                Configure Supabase Credentials Now
              </button>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Grid layout rendered from configuration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        {config.fields.map((field) => (
          <FormFieldRenderer
            key={field.id}
            field={field}
            value={formData[field.id]}
            onChange={handleFieldChange}
            error={errors[field.id]}
          />
        ))}
      </div>

      {/* Global submission error */}
      {submitError && (
        <div className="p-3 bg-rose-950/50 border border-rose-800/60 rounded-sm text-xs text-rose-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Registration Failed</p>
            <p className="text-neutral-300">{submitError}</p>
            {onOpenSupabaseConfig && (
              <button
                type="button"
                onClick={onOpenSupabaseConfig}
                className="text-xs text-rose-300 underline hover:text-rose-100 font-mono"
              >
                Inspect Supabase connection settings &rarr;
              </button>
            )}
          </div>
        </div>
      )}

      {/* Form Footer */}
      <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
          <span>SCHEMA // {config.fields.length} Configured Parameters</span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          {config.submitButtonText}
        </Button>
      </div>
    </form>
  );
};
