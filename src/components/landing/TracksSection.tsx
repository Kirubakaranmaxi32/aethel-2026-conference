import React from 'react';
import { TRACKS } from '@/config/conference.config';
import { ArrowUpRight } from 'lucide-react';

export const TracksSection: React.FC = () => {
  return (
    <section id="tracks" className="py-20 sm:py-28 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-gold">
              [02 // CURATED TRACKS]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-normal">
              Technical Syllabus & Architectural Domains
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-500 max-w-sm">
            Four specialized tracks curated by principal architects at leading frontier labs.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRACKS.map((track) => (
            <div
              key={track.id}
              className="group p-8 bg-surface-200 border border-border rounded-sm hover:border-neutral-500 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-accent-gold font-semibold tracking-wider">
                    {track.code}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-neutral-100 font-normal tracking-tight">
                    {track.title}
                  </h3>
                  <p className="font-mono text-xs text-neutral-400 mt-1">
                    {track.subtitle}
                  </p>
                </div>

                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  {track.description}
                </p>
              </div>

              {/* Topics tags */}
              <div className="mt-8 pt-6 border-t border-border-subtle">
                <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-2.5">
                  CORE TECHNICAL SUBJECTS
                </div>
                <div className="flex flex-wrap gap-2">
                  {track.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-mono bg-surface-100 border border-border-subtle text-neutral-300 rounded-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
