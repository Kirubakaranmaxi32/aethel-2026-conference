import React from 'react';
import { SPEAKERS } from '@/config/conference.config';

export const SpeakersSection: React.FC = () => {
  return (
    <section id="speakers" className="py-20 sm:py-28 border-b border-border bg-surface-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-gold">
              [03 // KEYNOTE FACULTY]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-normal">
              Visionaries, Systems Architects & Fellows
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-500 max-w-sm">
            All keynotes are 45-minute technical deep dives followed by open delegate interrogations.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPEAKERS.map((speaker) => (
            <div
              key={speaker.id}
              className="bg-surface-200 border border-border rounded-sm overflow-hidden group hover:border-neutral-500 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo with subtle grayscale filter that reveals on hover */}
                <div className="relative aspect-4/3 w-full bg-surface-100 overflow-hidden">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-background/90 backdrop-blur-xs text-accent-goldLight border border-border rounded-xs">
                      {speaker.tag}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-serif text-xl text-neutral-100 font-normal tracking-tight">
                      {speaker.name}
                    </h3>
                    <p className="font-mono text-xs text-neutral-400 mt-0.5">
                      {speaker.title}
                    </p>
                    <p className="font-mono text-[11px] text-accent-gold tracking-wide">
                      {speaker.organization}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed font-light pt-2">
                    {speaker.bio}
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="px-6 py-3 border-t border-border-subtle bg-surface-100 flex items-center justify-between font-mono text-[11px] text-neutral-500">
                <span>STAGE // MAIN HALL</span>
                <span className="text-neutral-400 group-hover:text-accent-goldLight transition-colors">
                  Keynote Lecture &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
