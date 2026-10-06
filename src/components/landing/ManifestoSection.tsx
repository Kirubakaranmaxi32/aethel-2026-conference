import React from 'react';
import { CONFERENCE_INFO } from '@/config/conference.config';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="py-20 sm:py-28 border-b border-border bg-surface-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Index Sidebar */}
          <div className="lg:col-span-4 space-y-4 font-mono text-xs text-neutral-500">
            <div className="text-accent-gold uppercase tracking-widest font-semibold">
              [01 // CURATORIAL THESIS]
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-neutral-200 font-normal leading-snug">
              Moving past benchmark demos to verify actual computational primitives.
            </h3>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed pt-2">
              Every presentation undergoes code evaluation and peer review by our steering committee of systems researchers.
            </p>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-8 space-y-8">
            <blockquote className="font-serif text-2xl sm:text-3xl text-neutral-100 font-normal leading-relaxed border-l-2 border-accent-gold pl-6">
              "{CONFERENCE_INFO.manifesto.heading}"
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-300 text-sm leading-relaxed font-sans font-light">
              {CONFERENCE_INFO.manifesto.paragraphs.map((p, idx) => (
                <p key={idx} className="space-y-2">
                  <span className="font-mono text-[11px] text-neutral-500 block">
                    SECTION {idx + 1}.0
                  </span>
                  <span>{p}</span>
                </p>
              ))}
            </div>

            <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neutral-400">
              <span className="text-neutral-500">STEERING PRINCIPLES:</span>
              <span>100% NO SPONSORED PITCHES</span>
              <span>OPEN SOURCE ARTIFACT AUDITING</span>
              <span>CHATHAM HOUSE ROUNDTABLES</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
