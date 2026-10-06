import React, { useState } from 'react';
import { FAQS } from '@/config/conference.config';
import { Plus, Minus } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-gold">
              [06 // INQUIRIES & ADMISSIONS]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-normal">
              Frequently Addressed Matters
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-500 max-w-sm">
            Direct institutional inquiries to delegations@aethelsummit.com.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="divide-y divide-border border-y border-border max-w-4xl">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-start justify-between text-left gap-4 group focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg text-neutral-200 group-hover:text-accent-goldLight transition-colors">
                    {faq.question}
                  </span>
                  <span className="text-neutral-500 group-hover:text-neutral-300 p-1">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-3xl">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
