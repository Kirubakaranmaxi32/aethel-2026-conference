import React, { useState } from 'react';
import { SCHEDULE } from '@/config/conference.config';
import { Clock, MapPin } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const activeDay = SCHEDULE[activeDayIndex];

  return (
    <section id="schedule" className="py-20 sm:py-28 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-gold">
              [04 // PROGRAMME SCHEDULE]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-normal">
              Three-Day Symposium Itinerary
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-500 max-w-sm">
            All talks begin punctually. Live streaming is strictly restricted to verified virtual fellows.
          </p>
        </div>

        {/* Day Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          {SCHEDULE.map((day, idx) => (
            <button
              key={day.day}
              onClick={() => setActiveDayIndex(idx)}
              className={`px-6 py-4 text-left transition-all border-b-2 font-mono whitespace-nowrap ${
                activeDayIndex === idx
                  ? 'border-accent-gold text-neutral-100 bg-surface-200'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-surface-100'
              }`}
            >
              <div className="text-xs uppercase tracking-wider font-semibold">
                {day.day} // {day.date}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1 font-sans">
                {day.theme}
              </div>
            </button>
          ))}
        </div>

        {/* Sessions Timeline */}
        <div className="divide-y divide-border border-y border-border">
          {activeDay.sessions.map((session, idx) => (
            <div
              key={idx}
              className="py-6 px-4 sm:px-6 hover:bg-surface-200/50 transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
            >
              {/* Time */}
              <div className="md:col-span-3 font-mono text-xs text-accent-goldLight flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{session.time}</span>
              </div>

              {/* Title & Speaker */}
              <div className="md:col-span-6 space-y-1.5">
                <h3 className="font-serif text-base sm:text-lg text-neutral-100 font-normal leading-snug">
                  {session.title}
                </h3>
                {session.speaker && (
                  <p className="font-mono text-xs text-neutral-400">
                    <span className="text-neutral-200">{session.speaker}</span>
                    {session.role && <span className="text-neutral-500"> — {session.role}</span>}
                  </p>
                )}
              </div>

              {/* Track badge & Location */}
              <div className="md:col-span-3 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 font-mono text-xs">
                <span className="px-2 py-0.5 bg-surface-100 border border-border text-neutral-300 rounded-xs text-[10px] uppercase tracking-wider">
                  {session.trackCode}
                </span>
                <span className="text-neutral-500 text-[11px] flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {session.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
