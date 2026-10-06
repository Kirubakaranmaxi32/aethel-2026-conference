import React from 'react';
import { RegistrationRecord, RegistrationStatus } from '@/types/registration';
import { Badge } from '@/components/common/Badge';
import {
  CheckCircle2,
  XCircle,
  Eye,
  ArrowUpDown,
  Inbox,
} from 'lucide-react';

interface RegistrationTableProps {
  registrations: RegistrationRecord[];
  isLoading: boolean;
  onSelectRegistration: (record: RegistrationRecord) => void;
  onUpdateStatus: (id: string, status: RegistrationStatus) => Promise<void>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (field: 'created_at' | 'full_name' | 'company') => void;
}

export const RegistrationTable: React.FC<RegistrationTableProps> = ({
  registrations,
  isLoading,
  onSelectRegistration,
  onUpdateStatus,
  sortBy = 'created_at',
  sortOrder = 'desc',
  onSort,
}) => {
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const getStatusBadgeVariant = (status: RegistrationStatus) => {
    if (status === 'approved') return 'approved';
    if (status === 'rejected') return 'rejected';
    return 'pending';
  };

  if (isLoading) {
    return (
      <div className="bg-surface-200 border border-border rounded-sm p-16 text-center">
        <div className="inline-block w-6 h-6 border-2 border-accent-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
          Querying Supabase Database...
        </p>
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="bg-surface-200 border border-border rounded-sm p-16 text-center space-y-4">
        <Inbox className="w-10 h-10 text-neutral-600 mx-auto" />
        <div className="space-y-1">
          <h3 className="font-serif text-lg text-neutral-300">No Registrations Located</h3>
          <p className="text-xs text-neutral-500 font-mono max-w-sm mx-auto">
            No delegate submissions match the current query criteria or database is currently awaiting submissions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-200 border border-border rounded-sm overflow-hidden shadow-subtle">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface-300 font-mono text-[11px] uppercase tracking-wider text-neutral-400 select-none">
              <th className="py-3.5 px-4 sm:px-6">
                <button
                  onClick={() => onSort && onSort('full_name')}
                  className={`inline-flex items-center gap-1.5 transition-colors ${sortBy === 'full_name' ? 'text-accent-goldLight' : 'hover:text-neutral-200'}`}
                >
                  <span>Delegate / Email</span>
                  <ArrowUpDown className={`w-3 h-3 ${sortBy === 'full_name' ? 'text-accent-gold' : 'text-neutral-500'}`} />
                  {sortBy === 'full_name' && <span className="text-[9px]">({sortOrder})</span>}
                </button>
              </th>
              <th className="py-3.5 px-4">
                <button
                  onClick={() => onSort && onSort('company')}
                  className={`inline-flex items-center gap-1.5 transition-colors ${sortBy === 'company' ? 'text-accent-goldLight' : 'hover:text-neutral-200'}`}
                >
                  <span>Affiliation & Role</span>
                  <ArrowUpDown className={`w-3 h-3 ${sortBy === 'company' ? 'text-accent-gold' : 'text-neutral-500'}`} />
                  {sortBy === 'company' && <span className="text-[9px]">({sortOrder})</span>}
                </button>
              </th>
              <th className="py-3.5 px-4">Ticket Tier</th>
              <th className="py-3.5 px-4">Industry Sector</th>
              <th className="py-3.5 px-4">Networking</th>
              <th className="py-3.5 px-4">
                <button
                  onClick={() => onSort && onSort('created_at')}
                  className={`inline-flex items-center gap-1.5 transition-colors ${sortBy === 'created_at' ? 'text-accent-goldLight' : 'hover:text-neutral-200'}`}
                >
                  <span>Registered</span>
                  <ArrowUpDown className={`w-3 h-3 ${sortBy === 'created_at' ? 'text-accent-gold' : 'text-neutral-500'}`} />
                  {sortBy === 'created_at' && <span className="text-[9px]">({sortOrder})</span>}
                </button>
              </th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-xs">
            {registrations.map((reg) => (
              <tr
                key={reg.id}
                className="hover:bg-surface-100/60 transition-colors group"
              >
                {/* Name & Email */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="font-medium text-neutral-100 font-sans text-sm">
                    {reg.full_name}
                  </div>
                  <div className="font-mono text-[11px] text-neutral-500 mt-0.5">
                    {reg.email}
                  </div>
                </td>

                {/* Company & Role */}
                <td className="py-4 px-4">
                  <div className="text-neutral-200 font-medium">
                    {reg.company}
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">
                    {reg.job_title}
                  </div>
                </td>

                {/* Ticket Tier */}
                <td className="py-4 px-4 font-mono">
                  <span className="capitalize px-2 py-0.5 bg-surface-100 border border-border text-neutral-200 text-[11px] rounded-xs font-medium">
                    {reg.ticket_type.replace('-', ' ')}
                  </span>
                </td>

                {/* Industry */}
                <td className="py-4 px-4 text-neutral-300 font-mono text-[11px] max-w-[140px] truncate">
                  {reg.industry}
                </td>

                {/* Networking Interests */}
                <td className="py-4 px-4 font-mono text-[11px] text-neutral-400">
                  <span title={reg.networking_interest?.join(', ')}>
                    {reg.networking_interest?.length || 0} tracks
                  </span>
                </td>

                {/* Date */}
                <td className="py-4 px-4 font-mono text-[11px] text-neutral-400 whitespace-nowrap">
                  {formatDate(reg.created_at)}
                </td>

                {/* Status Badge */}
                <td className="py-4 px-4">
                  <Badge variant={getStatusBadgeVariant(reg.status)} size="sm" dot>
                    {reg.status}
                  </Badge>
                </td>

                {/* Action Buttons */}
                <td className="py-4 px-4 text-right pr-6">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Quick Approve button */}
                    {reg.status !== 'approved' && (
                      <button
                        onClick={() => onUpdateStatus(reg.id, 'approved')}
                        title="Quick Approve"
                        className="p-1.5 text-neutral-400 hover:text-emerald-400 hover:bg-emerald-950/40 rounded-xs transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}

                    {/* Quick Reject button */}
                    {reg.status !== 'rejected' && (
                      <button
                        onClick={() => onUpdateStatus(reg.id, 'rejected')}
                        title="Quick Reject"
                        className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xs transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}

                    {/* View Dossier trigger */}
                    <button
                      onClick={() => onSelectRegistration(reg)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono bg-surface-100 hover:bg-surface-50 border border-border text-neutral-300 hover:text-white rounded-xs transition-colors"
                    >
                      <Eye className="w-3 h-3 text-accent-gold" />
                      <span>Dossier</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="py-3 px-6 border-t border-border bg-surface-300 flex items-center justify-between font-mono text-[11px] text-neutral-500">
        <span>RECORD COUNT: {registrations.length}</span>
        <span>POSTGRESQL // SCHEMA: PUBLIC.REGISTRATIONS</span>
      </div>
    </div>
  );
};
