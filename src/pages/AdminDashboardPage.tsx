import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminStats } from '@/components/admin/AdminStats';
import { RegistrationFilters } from '@/components/admin/RegistrationFilters';
import { RegistrationTable } from '@/components/admin/RegistrationTable';
import { RegistrationDetailDrawer } from '@/components/admin/RegistrationDetailDrawer';
import {
  RegistrationRecord,
  RegistrationFilters as IRegistrationFilters,
  RegistrationStatus,
} from '@/types/registration';
import {
  fetchRegistrations,
  updateRegistrationStatus,
  computeStatsFromRecords,
} from '@/lib/supabase';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, isDemoAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user && !isDemoAdmin) {
      navigate('/admin/login');
    }
  }, [user, isDemoAdmin, authLoading, navigate]);

  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<RegistrationRecord | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter state
  const [filters, setFilters] = useState<IRegistrationFilters>({
    search: '',
    ticket_type: 'all',
    industry: 'all',
    status: 'all',
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Load registrations from Supabase
  const loadRegistrations = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await fetchRegistrations(filters);
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Failed to fetch registrations from Supabase.');
      setRegistrations([]);
      return;
    }

    setRegistrations(result.data);
  }, [filters]);

  useEffect(() => {
    if (user || isDemoAdmin) {
      loadRegistrations();
    }
  }, [user, isDemoAdmin, loadRegistrations]);

  // Compute stats across all current registrations (or total query)
  const stats = useMemo(() => {
    return computeStatsFromRecords(registrations);
  }, [registrations]);

  // Handle status update mutation
  const handleUpdateStatus = async (
    id: string,
    newStatus: RegistrationStatus,
    notes?: string
  ) => {
    setIsUpdatingStatus(true);
    const result = await updateRegistrationStatus(id, newStatus, notes);
    setIsUpdatingStatus(false);

    if (!result.success || !result.data) {
      showToast(`Error: ${result.error || 'Failed to update status'}`);
      return;
    }

    // Optimistically update local records state
    const updated = result.data;
    setRegistrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );

    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord({ ...selectedRecord, ...updated });
    }

    showToast(`Dossier #${id.slice(0, 8)} status marked as [${newStatus.toUpperCase()}]`);
  };

  // Column sorting handler
  const handleSort = (field: 'created_at' | 'full_name' | 'company') => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  // CSV Export utility
  const handleExportCsv = () => {
    if (registrations.length === 0) {
      showToast('No registrations to export.');
      return;
    }

    const headers = [
      'ID',
      'Full Name',
      'Email',
      'Company',
      'Job Title',
      'Ticket Type',
      'Industry',
      'Networking Interests',
      'Status',
      'Admin Notes',
      'Submitted At (UTC)',
    ];

    const rows = registrations.map((r) => [
      r.id,
      `"${r.full_name.replace(/"/g, '""')}"`,
      r.email,
      `"${r.company.replace(/"/g, '""')}"`,
      `"${r.job_title.replace(/"/g, '""')}"`,
      r.ticket_type,
      `"${r.industry.replace(/"/g, '""')}"`,
      `"${(r.networking_interest || []).join('; ')}"`,
      r.status,
      `"${(r.admin_notes || '').replace(/"/g, '""')}"`,
      r.created_at,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aethel_2026_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${registrations.length} registrations to CSV.`);
  };

  // Filter reset handler
  const handleResetFilters = () => {
    setFilters({
      search: '',
      ticket_type: 'all',
      industry: 'all',
      status: 'all',
      sortBy: 'created_at',
      sortOrder: 'desc',
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-mono text-xs text-neutral-400">
        Authenticating Admissions Committee Credentials...
      </div>
    );
  }

  return (
    <AdminLayout
      title="Symposium Registrations Registry"
      subtitle="Real-time admissions database backed by Supabase PostgreSQL."
    >
      <div className="space-y-8">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 p-4 bg-surface-100 border border-neutral-600 rounded-sm shadow-editorial text-xs font-mono text-neutral-200 flex items-center gap-2.5 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Database Query Error Notice */}
        {error && (
          <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-sm text-xs text-rose-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">Supabase Query Notice</p>
              <p className="text-neutral-300">{error}</p>
              <p className="text-neutral-400 text-[11px] pt-1">
                Make sure your Supabase URL & Key are set, and the `registrations` table has been created via the SQL schema.
              </p>
            </div>
          </div>
        )}

        {/* Statistics Panels */}
        <AdminStats
          stats={stats}
          onFilterStatus={(st) => setFilters((prev) => ({ ...prev, status: st }))}
          activeStatusFilter={filters.status}
        />

        {/* Search & Filter Controls */}
        <RegistrationFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          onRefresh={loadRegistrations}
          onExportCsv={handleExportCsv}
          isRefreshing={loading}
          totalFiltered={registrations.length}
        />

        {/* Primary Registrations Data Table */}
        <RegistrationTable
          registrations={registrations}
          isLoading={loading}
          onSelectRegistration={(rec) => setSelectedRecord(rec)}
          onUpdateStatus={handleUpdateStatus}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSort={handleSort}
        />
      </div>

      {/* Slide-over Attendee Dossier Detail */}
      <RegistrationDetailDrawer
        registration={selectedRecord}
        isOpen={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        onUpdateStatus={handleUpdateStatus}
        isUpdating={isUpdatingStatus}
      />
    </AdminLayout>
  );
};
