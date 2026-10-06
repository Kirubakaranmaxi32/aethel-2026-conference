import { Link } from 'react-router-dom';
import { ArrowUpRight, Shield, Database } from 'lucide-react';

export const Footer: React.FC<{ onOpenSupabaseConfig?: () => void }> = ({ onOpenSupabaseConfig }) => {
  return (
    <footer className="border-t border-border bg-surface-300 text-neutral-400 text-xs">
      {/* Upper Colophon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Identity column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-sm bg-neutral-100 flex items-center justify-center font-mono font-bold text-neutral-950 text-xs">
                Æ
              </span>
              <span className="font-serif text-lg font-medium tracking-tight text-neutral-100">
                AETHEL // 2026
              </span>
            </div>
            <p className="text-sm text-neutral-400 font-normal leading-relaxed max-w-sm">
              Global Intelligence & Systems Summit. Convening 1,200 systems architects, computational researchers, and founders at the Palace of Fine Arts, San Francisco.
            </p>
            <div className="pt-2 font-mono text-[11px] text-neutral-500 space-y-1">
              <div>LAT 37.8020° N // LON 122.4487° W</div>
              <div>COORDINATION: SECRETARIAT@AETHELSUMMIT.COM</div>
            </div>
          </div>

          {/* Navigation links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-neutral-200 uppercase tracking-widest font-semibold pb-1">
              PROGRAMME
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#manifesto" className="hover:text-neutral-100 transition-colors">
                  01 // Symposium Manifesto
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-neutral-100 transition-colors">
                  02 // Curated Tracks & Labs
                </a>
              </li>
              <li>
                <a href="#speakers" className="hover:text-neutral-100 transition-colors">
                  03 // Keynote Faculty
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-neutral-100 transition-colors">
                  04 // 3-Day Technical Itinerary
                </a>
              </li>
              <li>
                <a href="#admission" className="hover:text-neutral-100 transition-colors">
                  05 // Admissions & Passes
                </a>
              </li>
            </ul>
          </div>

          {/* Infrastructure & Administration */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-neutral-200 uppercase tracking-widest font-semibold pb-1">
              INFRASTRUCTURE & ADMIN
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 text-accent-goldLight hover:underline"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Registration Portal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              {onOpenSupabaseConfig && (
                <li>
                  <button
                    onClick={onOpenSupabaseConfig}
                    className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-neutral-100 transition-colors"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Supabase Connection Console</span>
                  </button>
                </li>
              )}
              <li className="pt-2 text-[11px] text-neutral-500 leading-normal">
                Backed by Supabase PostgreSQL with Row-Level Security and configuration-driven dynamic schema validation.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-subtle bg-surface-300 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} AETHEL SYMPOSIUM FOUNDATION. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>STRICTLY PEER-REVIEWED</span>
            <span>CHATHAM HOUSE RULE FOR SYNDICATES</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
