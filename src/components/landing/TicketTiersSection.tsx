import React from 'react';
import { TICKET_TIERS } from '@/config/conference.config';
import { Button } from '@/components/common/Button';
import { Check, ArrowRight } from 'lucide-react';

interface TicketTiersSectionProps {
  onSelectTier: (tierId: string) => void;
}

export const TicketTiersSection: React.FC<TicketTiersSectionProps> = ({ onSelectTier }) => {
  return (
    <section id="admission" className="py-20 sm:py-28 border-b border-border bg-surface-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-gold">
              [05 // ADMISSION TIERS]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-normal">
              Delegate Accreditation & Passes
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-500 max-w-sm">
            All passes include full symposium credentials, curated dining, and digital repository access.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TICKET_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`p-8 rounded-sm border flex flex-col justify-between transition-all duration-200 relative ${
                tier.recommended
                  ? 'border-accent-gold bg-surface-200 ring-1 ring-accent-gold/40 shadow-editorial'
                  : 'border-border bg-surface-200 hover:border-neutral-500'
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-3 left-6">
                  <span className="px-2.5 py-0.5 bg-accent-gold text-neutral-950 font-mono text-[10px] uppercase font-bold tracking-wider rounded-xs">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-neutral-100 font-normal">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="font-serif text-4xl text-neutral-100 font-medium">
                      {tier.price}
                    </span>
                    <span className="font-mono text-xs text-neutral-500">USD</span>
                  </div>
                  <p className="font-mono text-[11px] text-accent-goldLight mt-1">
                    {tier.capacity}
                  </p>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed font-light border-t border-border-subtle pt-4">
                  {tier.description}
                </p>

                {/* Features list */}
                <div className="space-y-3 pt-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    INCLUSIONS & PRIVILEGES
                  </div>
                  <ul className="space-y-2.5 text-xs text-neutral-300">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-border-subtle">
                <Button
                  variant={tier.recommended ? 'accent' : 'secondary'}
                  size="md"
                  onClick={() => onSelectTier(tier.id)}
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Apply as {tier.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
