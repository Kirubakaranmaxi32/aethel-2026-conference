import React from 'react';
import { REGISTRATION_CONFIG } from '@/config/registration.config';
import { DynamicRegistrationForm } from '@/components/form/DynamicRegistrationForm';
import { ShieldCheck } from 'lucide-react';

interface RegistrationSectionProps {
  onOpenSupabaseConfig?: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({ onOpenSupabaseConfig }) => {
  return (
    <section id="register" className="py-20 sm:py-28 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-gold">
              [07 // ACCREDITATION DOSSIER]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-normal">
              {REGISTRATION_CONFIG.title}
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-500 max-w-sm">
            {REGISTRATION_CONFIG.subtitle}
          </p>
        </div>

        {/* Embedded Dynamic Form Card */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-surface-200 border border-border rounded-sm shadow-editorial">
          <div className="pb-6 mb-8 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE REGISTRY OPEN // CAP: 1,200 DELEGATES</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-gold" />
              <span>PEER-REVIEW COMMITTEE ACCREDITATION</span>
            </div>
          </div>

          <DynamicRegistrationForm
            config={REGISTRATION_CONFIG}
            onOpenSupabaseConfig={onOpenSupabaseConfig}
          />
        </div>
      </div>
    </section>
  );
};
