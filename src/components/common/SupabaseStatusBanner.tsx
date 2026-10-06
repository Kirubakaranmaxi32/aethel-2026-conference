import React, { useEffect, useState } from 'react';
import { AlertTriangle, Settings, RefreshCw } from 'lucide-react';
import { testSupabaseConnection, getSupabaseCredentials } from '@/lib/supabase';

interface SupabaseStatusBannerProps {
  onOpenConfig?: () => void;
  compact?: boolean;
}

export const SupabaseStatusBanner: React.FC<SupabaseStatusBannerProps> = ({
  onOpenConfig,
  compact = false,
}) => {
  const [status, setStatus] = useState<{
    tested: boolean;
    ok: boolean;
    message: string;
    loading: boolean;
  }>({
    tested: false,
    ok: false,
    message: 'Checking database connectivity...',
    loading: true,
  });

  const checkConnection = async () => {
    setStatus(prev => ({ ...prev, loading: true }));
    const result = await testSupabaseConnection();
    setStatus({
      tested: true,
      ok: result.ok,
      message: result.message,
      loading: false,
    });
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const { isConfigured, url } = getSupabaseCredentials();

  // If already configured and successful in compact mode, render minimal indicator
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs font-mono">
        <span
          className={`w-2 h-2 rounded-full ${
            status.loading ? 'bg-amber-400 animate-pulse' : status.ok ? 'bg-emerald-400' : 'bg-rose-400'
          }`}
        />
        <span className="text-neutral-400">
          Supabase: {status.loading ? 'Verifying...' : status.ok ? 'Connected' : 'Offline'}
        </span>
        {onOpenConfig && (
          <button
            onClick={onOpenConfig}
            className="text-neutral-500 hover:text-neutral-300 p-0.5 ml-1 transition-colors"
            title="Database Configuration"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  // If not configured, show helpful setup banner
  if (!isConfigured || !status.ok) {
    return (
      <div className="border-b border-border bg-surface-200/90 backdrop-blur-xs px-4 py-2.5 text-xs text-neutral-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong className="text-white font-medium">Supabase Database Notice:</strong>{' '}
              {status.message}
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={checkConnection}
              disabled={status.loading}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-400 hover:text-neutral-200 border border-border hover:border-neutral-700 rounded-xs transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${status.loading ? 'animate-spin' : ''}`} />
              <span>Retry</span>
            </button>
            {onOpenConfig && (
              <button
                onClick={onOpenConfig}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-neutral-100 hover:bg-white text-neutral-950 rounded-xs transition-colors"
              >
                <Settings className="w-3 h-3" />
                <span>Configure Supabase</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-border-subtle bg-surface-300/60 px-4 py-1.5 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>PostgreSQL connected via Supabase</span>
          <span className="text-neutral-600">|</span>
          <span className="text-neutral-500 truncate max-w-xs">{url}</span>
        </div>
        {onOpenConfig && (
          <button
            onClick={onOpenConfig}
            className="text-[11px] font-mono text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            Settings
          </button>
        )}
      </div>
    </div>
  );
};
