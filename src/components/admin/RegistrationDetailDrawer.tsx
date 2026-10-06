import React, { useState } from 'react';
import { RegistrationRecord, RegistrationStatus } from '@/types/registration';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import {
  X,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Save,
  Check,
} from 'lucide-react';

interface RegistrationDetailDrawerProps {
  registration: RegistrationRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: RegistrationStatus, notes?: string) => Promise<void>;
  isUpdating?: boolean;
}

export const RegistrationDetailDrawer: React.FC<RegistrationDetailDrawerProps> = ({
  registration,
  isOpen,
  onClose,
  onUpdateStatus,
  isUpdating = false,
}) => {
  const [adminNotes, setAdminNotes] = useState(registration?.admin_notes || '');
  const [notesSaved, setNotesSaved] = useState(false);

  // Sync notes when registration changes
  React.useEffect(() => {
    setAdminNotes(registration?.admin_notes || '');
    setNotesSaved(false);
  }, [registration]);

  if (!isOpen || !registration) return null;

  const handleStatusClick = async (newStatus: RegistrationStatus) => {
    await onUpdateStatus(registration.id, newStatus, adminNotes);
  };

  const handleSaveNotes = async () => {
    await onUpdateStatus(registration.id, registration.status, adminNotes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      });
    } catch {
      return isoString;
    }
  };

  const statusVariant =
    registration.status === 'approved'
      ? 'approved'
      : registration.status === 'rejected'
      ? 'rejected'
      : 'pending';

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="relative w-full max-w-xl bg-surface-200 border-l border-border h-full flex flex-col shadow-editorial overflow-hidden">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-border bg-surface-300 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                DOSSIER // {registration.id.slice(0, 8)}
              </span>
              <Badge variant={statusVariant} size="sm" dot>
                {registration.status}
              </Badge>
            </div>
            <h2 className="font-serif text-xl text-neutral-100 font-normal">
              {registration.full_name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-surface-100 border border-border-subtle rounded-sm font-mono text-xs">
            <div>
              <span className="text-neutral-500 block text-[10px]">EMAIL ADDRESS</span>
              <a
                href={`mailto:${registration.email}`}
                className="text-neutral-200 hover:text-accent-goldLight truncate block mt-0.5"
              >
                {registration.email}
              </a>
            </div>

            <div>
              <span className="text-neutral-500 block text-[10px]">AFFILIATION</span>
              <span className="text-neutral-200 truncate block mt-0.5">
                {registration.company}
              </span>
            </div>

            <div>
              <span className="text-neutral-500 block text-[10px]">DESIGNATION / ROLE</span>
              <span className="text-neutral-200 truncate block mt-0.5">
                {registration.job_title}
              </span>
            </div>

            <div>
              <span className="text-neutral-500 block text-[10px]">REGISTERED ON</span>
              <span className="text-neutral-300 block mt-0.5">
                {formatDate(registration.created_at)}
              </span>
            </div>
          </div>

          {/* Ticket Tier */}
          <div className="space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              ADMISSION PASS TIER
            </div>
            <div className="p-4 bg-surface-100 border border-border rounded-sm flex items-center justify-between">
              <div>
                <span className="font-serif text-lg text-neutral-100 capitalize">
                  {registration.ticket_type.replace('-', ' ')}
                </span>
                <span className="block text-xs font-mono text-accent-goldLight mt-0.5">
                  Official Conference Credential
                </span>
              </div>
              <Badge variant="gold" size="sm">
                TIER VERIFIED
              </Badge>
            </div>
          </div>

          {/* Industry Sector */}
          <div className="space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              INDUSTRY & SECTOR FOCUS
            </div>
            <div className="p-3.5 bg-surface-100 border border-border rounded-sm text-xs font-mono text-neutral-200">
              {registration.industry}
            </div>
          </div>

          {/* Networking Tracks */}
          <div className="space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 flex items-center justify-between">
              <span>SELECTED NETWORKING TRACKS</span>
              <span>{registration.networking_interest?.length || 0} tracks</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {registration.networking_interest && registration.networking_interest.length > 0 ? (
                registration.networking_interest.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-mono bg-surface-100 border border-border text-neutral-200 rounded-xs"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <span className="text-xs text-neutral-500 italic">None specified</span>
              )}
            </div>
          </div>

          {/* Admin Evaluation Notes */}
          <div className="space-y-2 pt-2 border-t border-border-subtle">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-neutral-500" />
                <span>Internal Committee Review Notes</span>
              </span>
              {notesSaved && (
                <span className="text-emerald-400 flex items-center gap-1 font-mono text-[10px]">
                  <Check className="w-3 h-3" /> Saved to Supabase
                </span>
              )}
            </div>
            <textarea
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="e.g. Approved for syndicate seating; speaker in Track 02; priority sponsor liaison..."
              className="w-full bg-surface-100 border border-border p-3 text-xs font-mono text-neutral-200 rounded-sm focus:outline-none focus:border-neutral-500"
            />
            <div className="flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSaveNotes}
                isLoading={isUpdating}
                leftIcon={<Save className="w-3.5 h-3.5" />}
              >
                Save Notes
              </Button>
            </div>
          </div>
        </div>

        {/* Drawer Action Footer: Review Decision */}
        <div className="p-5 border-t border-border bg-surface-300 space-y-3">
          <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            ADMISSIONS ACTION PROTOCOL
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={registration.status === 'approved' ? 'primary' : 'secondary'}
              size="sm"
              isLoading={isUpdating}
              onClick={() => handleStatusClick('approved')}
              leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              className={registration.status === 'approved' ? '!bg-emerald-600 !text-white' : ''}
            >
              Approve
            </Button>

            <Button
              variant={registration.status === 'rejected' ? 'danger' : 'secondary'}
              size="sm"
              isLoading={isUpdating}
              onClick={() => handleStatusClick('rejected')}
              leftIcon={<XCircle className="w-3.5 h-3.5 text-rose-400" />}
              className={registration.status === 'rejected' ? '!bg-rose-900 !text-white' : ''}
            >
              Reject
            </Button>

            <Button
              variant={registration.status === 'pending' ? 'secondary' : 'ghost'}
              size="sm"
              isLoading={isUpdating}
              onClick={() => handleStatusClick('pending')}
              leftIcon={<Clock className="w-3.5 h-3.5 text-amber-400" />}
            >
              Reset Pending
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
