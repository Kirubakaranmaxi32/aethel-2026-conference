import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { CONFERENCE_INFO } from '@/config/conference.config';

interface HeroSectionProps {
  onRegisterClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick }) => {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 border-b border-border bg-gradient-to-b from-surface-300/80 via-background to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Index Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 border-b border-border-subtle font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-gold" />
            <span className="uppercase tracking-widest text-neutral-300">
              AETHEL // ANNUAL SYMPOSIUM
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider text-neutral-500">
            <span>EDITION 2026</span>
            <span className="hidden sm:inline">PEER-REVIEWED TECHNICAL CONVENING</span>
            <span>SAN FRANCISCO</span>
          </div>
        </div>

        {/* Main Hero Title & Description */}
        <div className="pt-12 sm:pt-16 pb-12 space-y-8">
          <div className="space-y-4 max-w-5xl">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-neutral-100 leading-tightest">
              The Architecture of{' '}
              <span className="italic font-serif text-accent-goldLight">
                Autonomous Thought.
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 font-light max-w-3xl leading-relaxed pt-2">
              The international symposium uniting leading systems architects, foundation model researchers, and hardware engineers designing the post-accelerator computational substrate.
            </p>
          </div>

          {/* Key Facts Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 pb-2 border-y border-border-subtle max-w-4xl font-mono text-xs text-neutral-300">
            <div className="flex items-center gap-3 py-3">
              <Calendar className="w-4 h-4 text-accent-gold shrink-0" />
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">DATES</span>
                <span className="font-medium text-neutral-200">{CONFERENCE_INFO.dates}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 border-t sm:border-t-0 sm:border-l border-border-subtle sm:pl-4">
              <MapPin className="w-4 h-4 text-accent-gold shrink-0" />
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">LOCATION</span>
                <span className="font-medium text-neutral-200">{CONFERENCE_INFO.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 border-t sm:border-t-0 sm:border-l border-border-subtle sm:pl-4">
              <Users className="w-4 h-4 text-accent-gold shrink-0" />
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">CAPACITY</span>
                <span className="font-medium text-neutral-200">1,200 Invited Fellows</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Button
              variant="accent"
              size="lg"
              onClick={onRegisterClick}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Submit Delegate Application
            </Button>
            <a
              href="#schedule"
              className="inline-flex items-center justify-center font-medium transition-all duration-200 text-sm px-6 py-3.5 rounded-sm border border-border hover:border-neutral-500 text-neutral-300 hover:text-white bg-surface-100/60"
            >
              View 3-Day Technical Schedule
            </a>
          </div>
        </div>

        {/* Numerical Grid / Conference Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-border">
          {CONFERENCE_INFO.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl text-neutral-100 font-normal">
                {stat.value}
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
