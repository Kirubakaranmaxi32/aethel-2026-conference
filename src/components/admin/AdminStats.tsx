import React from 'react';
import { RegistrationStats } from '@/types/registration';
import { Users, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface AdminStatsProps {
  stats: RegistrationStats;
  onFilterStatus?: (status: 'all' | 'pending' | 'approved' | 'rejected') => void;
  activeStatusFilter?: string;
}

export const AdminStats: React.FC<AdminStatsProps> = ({
  stats,
  onFilterStatus,
  activeStatusFilter = 'all',
}) => {
  return (
    <div className="space-y-6">
      {/* 4 Primary Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}
        <div
          onClick={() => onFilterStatus && onFilterStatus('all')}
          className={`p-5 rounded-sm border cursor-pointer transition-all ${
            activeStatusFilter === 'all'
              ? 'border-neutral-400 bg-surface-100 ring-1 ring-neutral-400/20'
              : 'border-border bg-surface-200 hover:border-neutral-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>TOTAL DOSSIERS</span>
            <Users className="w-4 h-4 text-neutral-500" />
          </div>
          <div className="mt-3 font-serif text-3xl sm:text-4xl text-neutral-100 font-normal">
            {stats.total}
          </div>
          <div className="mt-1 font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
            All submitted delegates
          </div>
        </div>

        {/* Pending */}
        <div
          onClick={() => onFilterStatus && onFilterStatus('pending')}
          className={`p-5 rounded-sm border cursor-pointer transition-all ${
            activeStatusFilter === 'pending'
              ? 'border-amber-500 bg-surface-100 ring-1 ring-amber-500/20'
              : 'border-border bg-surface-200 hover:border-neutral-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-amber-300">
            <span>PENDING REVIEW</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3 font-serif text-3xl sm:text-4xl text-amber-200 font-normal">
            {stats.pending}
          </div>
          <div className="mt-1 font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
            Awaiting committee decision
          </div>
        </div>

        {/* Approved */}
        <div
          onClick={() => onFilterStatus && onFilterStatus('approved')}
          className={`p-5 rounded-sm border cursor-pointer transition-all ${
            activeStatusFilter === 'approved'
              ? 'border-emerald-500 bg-surface-100 ring-1 ring-emerald-500/20'
              : 'border-border bg-surface-200 hover:border-neutral-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
            <span>ACCREDITED / APPROVED</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 font-serif text-3xl sm:text-4xl text-emerald-200 font-normal">
            {stats.approved}
          </div>
          <div className="mt-1 font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
            Admission credential issued
          </div>
        </div>

        {/* Rejected */}
        <div
          onClick={() => onFilterStatus && onFilterStatus('rejected')}
          className={`p-5 rounded-sm border cursor-pointer transition-all ${
            activeStatusFilter === 'rejected'
              ? 'border-rose-500 bg-surface-100 ring-1 ring-rose-500/20'
              : 'border-border bg-surface-200 hover:border-neutral-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-rose-300">
            <span>DECLINED</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-3 font-serif text-3xl sm:text-4xl text-rose-200 font-normal">
            {stats.rejected}
          </div>
          <div className="mt-1 font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
            Capacity or criteria not met
          </div>
        </div>
      </div>

      {/* Breakdown Row: Ticket Tiers & Industry Sectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Ticket Type Distribution */}
        <div className="p-5 bg-surface-200 border border-border rounded-sm space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2 text-neutral-400">
            <span className="uppercase tracking-wider font-semibold">TICKET TIER DISTRIBUTION</span>
            <span className="text-[10px] text-neutral-500">PROPORTION</span>
          </div>
          <div className="space-y-2 pt-1">
            {Object.entries(stats.ticketTypeBreakdown).length === 0 ? (
              <p className="text-neutral-500 text-xs italic font-sans py-2">No registrations recorded yet.</p>
            ) : (
              Object.entries(stats.ticketTypeBreakdown).map(([tier, count]) => {
                const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                return (
                  <div key={tier} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-300 capitalize">{tier.replace('-', ' ')}</span>
                      <span className="text-neutral-400">
                        {count} <span className="text-neutral-600">({pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-1 bg-surface-100 rounded-xs overflow-hidden">
                      <div
                        className="h-full bg-accent-gold transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Industry Sector Breakdown */}
        <div className="p-5 bg-surface-200 border border-border rounded-sm space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2 text-neutral-400">
            <span className="uppercase tracking-wider font-semibold">SECTOR AFFILIATION</span>
            <span className="text-[10px] text-neutral-500">COUNT</span>
          </div>
          <div className="space-y-2 pt-1 max-h-36 overflow-y-auto pr-1">
            {Object.entries(stats.industryBreakdown).length === 0 ? (
              <p className="text-neutral-500 text-xs italic font-sans py-2">No sector data recorded yet.</p>
            ) : (
              Object.entries(stats.industryBreakdown).map(([ind, count]) => (
                <div key={ind} className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-300 truncate max-w-[220px]">{ind}</span>
                  <span className="px-1.5 py-0.5 bg-surface-100 border border-border text-neutral-400 rounded-xs">
                    {count}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
