import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { ArrowUpRight, Menu, X, Shield } from 'lucide-react';
import { SupabaseStatusBanner } from './SupabaseStatusBanner';

interface NavbarProps {
  onRegisterClick?: () => void;
  onOpenSupabaseConfig?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRegisterClick,
  onOpenSupabaseConfig,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md border-b border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-sm bg-neutral-100 flex items-center justify-center font-mono font-bold text-neutral-950 text-sm tracking-tighter group-hover:bg-accent-gold transition-colors">
              Æ
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-medium tracking-tight text-neutral-100 group-hover:text-accent-goldLight transition-colors">
                AETHEL 2026
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                SF // NOV 12–14
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-wider uppercase">
            <a href="#manifesto" className="text-neutral-400 hover:text-neutral-100 transition-colors">
              Manifesto
            </a>
            <a href="#tracks" className="text-neutral-400 hover:text-neutral-100 transition-colors">
              Tracks
            </a>
            <a href="#speakers" className="text-neutral-400 hover:text-neutral-100 transition-colors">
              Faculty
            </a>
            <a href="#schedule" className="text-neutral-400 hover:text-neutral-100 transition-colors">
              Schedule
            </a>
            <a href="#admission" className="text-neutral-400 hover:text-neutral-100 transition-colors">
              Admission
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <SupabaseStatusBanner compact onOpenConfig={onOpenSupabaseConfig} />
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-neutral-100 border border-border hover:border-neutral-600 rounded-sm transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-accent-gold" />
              <span>Admin Portal</span>
            </Link>

            <Button
              variant="accent"
              size="sm"
              onClick={onRegisterClick}
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Register Delegate
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface-200 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-mono text-sm uppercase tracking-wider text-neutral-300">
            <a
              href="#manifesto"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Manifesto
            </a>
            <a
              href="#tracks"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Tracks
            </a>
            <a
              href="#speakers"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Faculty
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Schedule
            </a>
            <a
              href="#admission"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Admission
            </a>
          </nav>

          <div className="pt-4 border-t border-border flex flex-col gap-2.5">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 text-xs font-mono text-neutral-300 border border-border rounded-sm"
            >
              <Shield className="w-3.5 h-3.5 text-accent-gold" />
              <span>Admin Dashboard</span>
            </Link>

            <Button
              variant="accent"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onRegisterClick) onRegisterClick();
              }}
              className="w-full"
            >
              Register Delegate
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
