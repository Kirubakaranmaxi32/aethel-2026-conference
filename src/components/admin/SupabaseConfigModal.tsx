import React, { useState } from 'react';
import { X, Check, Copy, Database, AlertCircle, RefreshCw, KeyRound, Globe, FileCode2 } from 'lucide-react';
import { getSupabaseCredentials, saveSupabaseCredentials, clearCustomSupabaseCredentials, testSupabaseConnection } from '@/lib/supabase';
import { Button } from '@/components/common/Button';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved?: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  onConfigSaved,
}) => {
  const currentCredentials = getSupabaseCredentials();
  const [url, setUrl] = useState(currentCredentials.url);
  const [anonKey, setAnonKey] = useState(currentCredentials.anonKey);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSql, setShowSql] = useState(false);

  if (!isOpen) return null;

  const handleSaveAndTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setTesting(true);
    setTestResult(null);

    // Save credentials to localStorage
    saveSupabaseCredentials(url, anonKey);

    // Test live connection
    const res = await testSupabaseConnection();
    setTesting(false);
    setTestResult({ ok: res.ok, message: res.message });

    if (res.ok && onConfigSaved) {
      onConfigSaved();
    }
  };

  const handleResetToEnv = () => {
    clearCustomSupabaseCredentials();
    const envCreds = getSupabaseCredentials();
    setUrl(envCreds.url);
    setAnonKey(envCreds.anonKey);
    setTestResult(null);
  };

  const copySqlSchema = () => {
    const sql = `-- Run this in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    job_title TEXT NOT NULL,
    ticket_type TEXT NOT NULL,
    industry TEXT NOT NULL,
    networking_interest TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous submissions" ON public.registrations
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow read registrations" ON public.registrations
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow update registrations" ON public.registrations
    FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);`;

    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-surface-200 border border-border rounded-sm shadow-editorial overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-300">
          <div className="flex items-center gap-2.5">
            <Database className="w-4 h-4 text-accent-gold" />
            <h2 className="text-base font-medium text-neutral-100 font-mono tracking-tight">
              SUPABASE // CONNECTION SETUP
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-200 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-neutral-300">
          <p className="text-xs text-neutral-400 leading-relaxed">
            The registration form and admin panel interact with your Supabase PostgreSQL instance.
            Provide your project URL and public Anon Key from your Supabase dashboard (<strong>Project Settings &gt; API</strong>).
          </p>

          <form onSubmit={handleSaveAndTest} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                <Globe className="w-3.5 h-3.5 inline mr-1 text-neutral-500" />
                Project URL (VITE_SUPABASE_URL)
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://xyzcompany.supabase.co"
                required
                className="w-full bg-surface-100 border border-border text-neutral-100 text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-neutral-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                <KeyRound className="w-3.5 h-3.5 inline mr-1 text-neutral-500" />
                Project Anon Key (VITE_SUPABASE_ANON_KEY)
              </label>
              <input
                type="password"
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                required
                className="w-full bg-surface-100 border border-border text-neutral-100 text-sm px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-neutral-500 font-mono"
              />
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-sm border text-xs flex items-start gap-2.5 ${
                  testResult.ok
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                }`}
              >
                {testResult.ok ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="leading-relaxed">{testResult.message}</div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleResetToEnv}
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors underline font-mono"
              >
                Reset to .env values
              </button>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowSql(!showSql)}
                  leftIcon={<FileCode2 className="w-3.5 h-3.5" />}
                >
                  {showSql ? 'Hide SQL Script' : 'View SQL Schema'}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={testing}
                  leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />}
                >
                  Save & Test Connection
                </Button>
              </div>
            </div>
          </form>

          {/* SQL Migration Assistant */}
          {showSql && (
            <div className="p-4 bg-surface-300 border border-border rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  PostgreSQL Schema (`registrations` table)
                </span>
                <button
                  onClick={copySqlSchema}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-surface-100 hover:bg-surface-50 border border-border text-neutral-200 rounded-xs transition-colors"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied SQL</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-neutral-400" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-neutral-500">
                Execute this in your Supabase project's SQL Editor to set up the registration table and Row Level Security.
              </p>
              <pre className="p-3 bg-background border border-border-subtle rounded text-[11px] font-mono text-neutral-300 overflow-x-auto max-h-48 leading-relaxed">
{`CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    job_title TEXT NOT NULL,
    ticket_type TEXT NOT NULL,
    industry TEXT NOT NULL,
    networking_interest TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon insert" ON public.registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all select" ON public.registrations FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all update" ON public.registrations FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-border bg-surface-300 flex items-center justify-end">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
