import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';
import { SupabaseStatusBanner } from '@/components/common/SupabaseStatusBanner';
import { SupabaseConfigModal } from './SupabaseConfigModal';
import { LogOut, ExternalLink, Database, User } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  actions,
}) => {
  const { user, signOut, isDemoAdmin } = useAuth();
  const navigate = useNavigate();
  const [configModalOpen, setConfigModalOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background text-neutral-100 flex flex-col font-sans">
      {/* Top Database Status Indicator */}
      <SupabaseStatusBanner onOpenConfig={() => setConfigModalOpen(true)} />

      {/* Main Admin Header */}
      <header className="border-b border-border bg-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left brand & section */}
            <div className="flex items-center gap-4">
              <Link to="/admin" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-sm bg-neutral-100 flex items-center justify-center font-mono font-bold text-neutral-950 text-xs">
                  Æ
                </div>
                <div>
                  <div className="font-serif text-base font-normal tracking-tight text-neutral-100 flex items-center gap-2">
                    <span>AETHEL 2026</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 bg-surface-50 border border-border text-accent-goldLight uppercase tracking-wider rounded-xs">
                      ADMIN REGISTRY
                    </span>
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                    ADMISSIONS & ATTENDEE MANAGEMENT
                  </div>
                </div>
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-neutral-200 px-3 py-1.5 border border-border hover:border-neutral-600 rounded-sm transition-colors"
              >
                <span>Public Landing</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <button
                onClick={() => setConfigModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-neutral-200 p-2 border border-border hover:border-neutral-600 rounded-sm transition-colors"
                title="Supabase Database Settings"
              >
                <Database className="w-3.5 h-3.5 text-accent-gold" />
                <span className="hidden md:inline">Database</span>
              </button>

              <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-400 pl-2 border-l border-border">
                <User className="w-3.5 h-3.5 text-neutral-500" />
                <span className="text-neutral-300 truncate max-w-[160px]">
                  {user?.email || (isDemoAdmin ? 'admin@aethelsummit.internal' : 'Authenticated')}
                </span>
                {isDemoAdmin && (
                  <span className="px-1.5 py-0.2 text-[9px] bg-amber-950/60 border border-amber-800/80 text-amber-300 rounded-xs">
                    DEMO ACCESS
                  </span>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                leftIcon={<LogOut className="w-3.5 h-3.5" />}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-header / Title Bar */}
      <div className="border-b border-border bg-surface-300 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-normal">
              {title}
            </h1>
            {subtitle && (
              <p className="font-mono text-xs text-neutral-400">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      {/* Database settings modal */}
      <SupabaseConfigModal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
      />
    </div>
  );
};
