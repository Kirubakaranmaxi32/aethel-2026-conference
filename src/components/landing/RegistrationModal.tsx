import { X } from 'lucide-react';
import { REGISTRATION_CONFIG } from '@/config/registration.config';
import { DynamicRegistrationForm } from '@/components/form/DynamicRegistrationForm';
import { RegistrationPayload } from '@/types/registration';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: string;
  onOpenSupabaseConfig?: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
  onOpenSupabaseConfig,
}) => {
  if (!isOpen) return null;

  const initialValues: Partial<RegistrationPayload> = selectedTier
    ? { ticket_type: selectedTier }
    : {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-surface-200 border border-border rounded-sm shadow-editorial overflow-hidden">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-300">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-gold" />
            <div>
              <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-100">
                AETHEL 2026 // DELEGATE REGISTRATION
              </h2>
              <p className="text-[10px] font-mono text-neutral-500">
                DYNAMIC ADMISSIONS PROTOCOL V{REGISTRATION_CONFIG.version}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-200 transition-colors p-1"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          <div className="mb-6 space-y-1">
            <h3 className="font-serif text-2xl text-neutral-100 font-normal">
              {REGISTRATION_CONFIG.title}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {REGISTRATION_CONFIG.subtitle}
            </p>
          </div>

          <DynamicRegistrationForm
            config={REGISTRATION_CONFIG}
            initialValues={initialValues}
            onOpenSupabaseConfig={onOpenSupabaseConfig}
          />
        </div>
      </div>
    </div>
  );
};
