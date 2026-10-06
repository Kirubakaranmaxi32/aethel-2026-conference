import React from 'react';
import { RegistrationFilters as IRegistrationFilters } from '@/types/registration';
import { REGISTRATION_CONFIG } from '@/config/registration.config';
import { Search, RotateCcw, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface RegistrationFiltersProps {
  filters: IRegistrationFilters;
  onChange: (newFilters: IRegistrationFilters) => void;
  onReset: () => void;
  onRefresh: () => void;
  onExportCsv: () => void;
  isRefreshing?: boolean;
  totalFiltered: number;
}

export const RegistrationFilters: React.FC<RegistrationFiltersProps> = ({
  filters,
  onChange,
  onReset,
  onRefresh,
  onExportCsv,
  isRefreshing = false,
  totalFiltered,
}) => {
  const ticketField = REGISTRATION_CONFIG.fields.find((f) => f.id === 'ticket_type');
  const industryField = REGISTRATION_CONFIG.fields.find((f) => f.id === 'industry');

  const ticketOptions = ticketField?.options || [];
  const industryOptions = industryField?.options || [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, search: e.target.value });
  };

  const handleTicketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, ticket_type: e.target.value });
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, industry: e.target.value });
  };

  const handleStatusChange = (status: 'all' | 'pending' | 'approved' | 'rejected') => {
    onChange({ ...filters, status });
  };

  const hasActiveFilters = Boolean(
    filters.search ||
    filters.ticket_type !== 'all' ||
    filters.industry !== 'all' ||
    filters.status !== 'all'
  );

  return (
    <div className="space-y-4 bg-surface-200 border border-border rounded-sm p-4 sm:p-5">
      {/* Top Filter Bar: Status Tabs + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        {/* Status segment buttons */}
        <div className="flex items-center space-x-1 p-1 bg-surface-100 border border-border rounded-xs font-mono text-xs overflow-x-auto">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => {
            const isActive = filters.status === status;
            return (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-3 py-1.5 uppercase tracking-wider rounded-xs transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-950 font-semibold shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-surface-50'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Refresh & CSV Export */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={onRefresh}
            isLoading={isRefreshing}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />}
            title="Reload from Supabase"
          >
            Sync
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onExportCsv}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter Controls: Search + Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Search Input */}
        <div className="sm:col-span-5 relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search attendee, email, company, role..."
            className="w-full bg-surface-100 border border-border pl-9 pr-3.5 py-2 text-xs font-mono text-neutral-200 rounded-sm focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600"
          />
        </div>

        {/* Ticket Type Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={filters.ticket_type}
            onChange={handleTicketChange}
            className="w-full bg-surface-100 border border-border px-3 py-2 text-xs font-mono text-neutral-300 rounded-sm focus:outline-none focus:border-neutral-500 cursor-pointer"
          >
            <option value="all">All Ticket Tiers</option>
            {ticketOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Industry Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={filters.industry}
            onChange={handleIndustryChange}
            className="w-full bg-surface-100 border border-border px-3 py-2 text-xs font-mono text-neutral-300 rounded-sm focus:outline-none focus:border-neutral-500 cursor-pointer"
          >
            <option value="all">All Industry Sectors</option>
            {industryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Action */}
        <div className="sm:col-span-1 flex justify-end">
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="p-2 text-neutral-400 hover:text-neutral-200 border border-border hover:border-neutral-600 rounded-sm transition-colors"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter summary status */}
      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-1">
        <span>Showing {totalFiltered} matching dossiers</span>
        {hasActiveFilters && (
          <span className="text-accent-goldLight">Filtered view active</span>
        )}
      </div>
    </div>
  );
};
