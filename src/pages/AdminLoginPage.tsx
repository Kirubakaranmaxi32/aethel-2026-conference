import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';
import { Shield, KeyRound, Mail, ArrowRight, AlertCircle, Database, Sparkles } from 'lucide-react';
import { SupabaseConfigModal } from '@/components/admin/SupabaseConfigModal';

export const AdminLoginPage: React.FC = () => {
  const { signIn, signUp, loginAsDemoAdmin, user, isDemoAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);

  // If already logged in, redirect to /admin
  React.useEffect(() => {
    if (user || isDemoAdmin) {
      navigate('/admin');
    }
  }, [user, isDemoAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    if (mode === 'signin') {
      const { error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        setErrorMsg(error.message);
      } else {
        navigate('/admin');
      }
    } else {
      const { error } = await signUp(email, password);
      setLoading(false);
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg('Account created. Check your email for confirmation if required, or sign in now.');
        setMode('signin');
      }
    }
  };

  const handleDemoAccess = () => {
    loginAsDemoAdmin();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background text-neutral-100 flex flex-col justify-between font-sans">
      {/* Top Header */}
      <div className="border-b border-border bg-surface-300 py-4 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-sm bg-neutral-100 flex items-center justify-center font-mono font-bold text-neutral-950 text-xs">
            Æ
          </div>
          <span className="font-serif text-sm tracking-tight text-neutral-200">
            AETHEL 2026 // SYMPOSIUM
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setConfigModalOpen(true)}
            className="text-xs font-mono text-neutral-400 hover:text-neutral-200 flex items-center gap-1.5"
          >
            <Database className="w-3.5 h-3.5 text-accent-gold" />
            <span>Supabase Config</span>
          </button>
          <Link
            to="/"
            className="text-xs font-mono text-neutral-400 hover:text-neutral-200"
          >
            &larr; Back to Landing
          </Link>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-surface-200 border border-border rounded-sm shadow-editorial overflow-hidden">
          {/* Card Header */}
          <div className="p-6 sm:p-8 border-b border-border bg-surface-300 space-y-2">
            <div className="flex items-center gap-2 text-accent-gold">
              <Shield className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                RESTRICTED ACCESS // LEVEL 4
              </span>
            </div>
            <h1 className="font-serif text-2xl text-neutral-100 font-normal">
              Admissions Committee Portal
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Authenticated access to review, accredit, and manage attendee dossiers stored in Supabase.
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 space-y-6">
            {errorMsg && (
              <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-sm text-xs text-rose-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-sm text-xs text-emerald-200">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="committee@aethelsummit.com"
                    required
                    className="w-full bg-surface-100 border border-border pl-9 pr-3.5 py-2.5 text-xs font-mono text-neutral-100 rounded-sm focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full bg-surface-100 border border-border pl-9 pr-3.5 py-2.5 text-xs font-mono text-neutral-100 rounded-sm focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={loading}
                className="w-full mt-2"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {mode === 'signin' ? 'Sign In with Supabase Auth' : 'Create Admin Account'}
              </Button>
            </form>

            {/* Toggle sign in / sign up */}
            <div className="pt-2 text-center text-xs text-neutral-400 font-mono">
              {mode === 'signin' ? (
                <span>
                  First time administrator?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-accent-goldLight underline hover:text-white"
                  >
                    Register new admin user
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-accent-goldLight underline hover:text-white"
                  >
                    Return to sign in
                  </button>
                </span>
              )}
            </div>

            {/* Quick Demo Access Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-subtle" />
              </div>
              <div className="relative flex justify-center text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                <span className="bg-surface-200 px-3">EVALUATION CONVENIENCE</span>
              </div>
            </div>

            {/* Quick Admin Access Button */}
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full p-3 rounded-sm border border-border bg-surface-100 hover:bg-surface-50 hover:border-neutral-500 transition-colors flex items-center justify-between text-xs text-neutral-300 font-mono"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-gold" />
                <span>Instant Admin Access (Bypass Login)</span>
              </div>
              <span className="text-accent-goldLight">&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-surface-300 py-4 px-6 text-center text-xs font-mono text-neutral-500">
        SECURITY PROTOCOL: STRICT ROW-LEVEL AUTHENTICATION // SUPABASE POSTGRESQL
      </div>

      <SupabaseConfigModal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
      />
    </div>
  );
};
