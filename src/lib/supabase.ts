import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { RegistrationPayload, RegistrationRecord, RegistrationFilters, RegistrationStats, RegistrationStatus } from '@/types/registration';

const STORAGE_KEY_URL = 'aethel_supabase_url';
const STORAGE_KEY_KEY = 'aethel_supabase_anon_key';

const cleanVal = (val: string | null | undefined): string => {
  if (!val) return '';
  return val.trim().replace(/^['"]|['"]$/g, '');
};

export function getSupabaseCredentials(): {
  url: string;
  anonKey: string;
  isConfigured: boolean;
  missing: 'none' | 'url' | 'anonKey' | 'both';
} {
  // 1. Check localStorage first (allows runtime configuration in admin/setup)
  const localUrl = typeof window !== 'undefined' ? cleanVal(localStorage.getItem(STORAGE_KEY_URL)) : '';
  const localKey = typeof window !== 'undefined' ? cleanVal(localStorage.getItem(STORAGE_KEY_KEY)) : '';

  // 2. Check Vite env variables
  const envUrl = cleanVal(import.meta.env.VITE_SUPABASE_URL as string | undefined);
  const envKey = cleanVal(import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

  const url = localUrl || envUrl || '';
  const anonKey = localKey || envKey || '';

  const isValidUrl = url.startsWith('http://') || url.startsWith('https://');
  const hasAnonKey = Boolean(anonKey && anonKey.length > 10);
  const isConfigured = Boolean(isValidUrl && hasAnonKey);

  let missing: 'none' | 'url' | 'anonKey' | 'both' = 'none';
  if (!isValidUrl && !hasAnonKey) missing = 'both';
  else if (!isValidUrl) missing = 'url';
  else if (!hasAnonKey) missing = 'anonKey';

  return { url, anonKey, isConfigured, missing };
}

export function saveSupabaseCredentials(url: string, anonKey: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
    localStorage.setItem(STORAGE_KEY_KEY, anonKey.trim());
    // Invalidate cached client
    cachedClient = null;
  }
}

export function clearCustomSupabaseCredentials() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_URL);
    localStorage.removeItem(STORAGE_KEY_KEY);
    cachedClient = null;
  }
}

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const { url, anonKey, isConfigured } = getSupabaseCredentials();
  if (!isConfigured) {
    return null;
  }

  if (!cachedClient) {
    try {
      cachedClient = createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return cachedClient;
}

/**
 * Validates connection to Supabase and verifies the registrations table exists
 */
export async function testSupabaseConnection(): Promise<{
  ok: boolean;
  message: string;
  tableFound: boolean;
}> {
  const creds = getSupabaseCredentials();
  const client = getSupabase();
  if (!client) {
    let msg = 'Supabase credentials are not configured.';
    if (creds.missing === 'anonKey') {
      msg = `Connected URL (${creds.url}) is set, but VITE_SUPABASE_ANON_KEY is missing in .env.`;
    } else if (creds.missing === 'url') {
      msg = 'VITE_SUPABASE_URL is missing or invalid in .env.';
    }
    return {
      ok: false,
      message: msg,
      tableFound: false,
    };
  }

  try {
    const { error } = await client
      .from('registrations')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === '42P01') {
        return {
          ok: false,
          message: 'Connected to Supabase, but the "registrations" table does not exist. Please run the schema.sql migration.',
          tableFound: false,
        };
      }
      return {
        ok: false,
        message: `Supabase Error: ${error.message} (Code: ${error.code})`,
        tableFound: false,
      };
    }

    return {
      ok: true,
      message: 'Successfully connected to Supabase and verified the "registrations" table.',
      tableFound: true,
    };
  } catch (err: any) {
    return {
      ok: false,
      message: err?.message || 'Could not reach Supabase endpoint.',
      tableFound: false,
    };
  }
}

/**
 * Submits a new registration to Supabase
 */
export async function submitRegistration(payload: RegistrationPayload): Promise<{
  success: boolean;
  data?: RegistrationRecord;
  error?: string;
}> {
  const creds = getSupabaseCredentials();
  const client = getSupabase();
  if (!client) {
    const errorMsg =
      creds.missing === 'anonKey'
        ? `Supabase Anon Key is missing. Please add VITE_SUPABASE_ANON_KEY to .env for project ${creds.url}.`
        : 'Supabase connection is not configured. Please configure your project credentials in .env.';
    return {
      success: false,
      error: errorMsg,
    };
  }

  try {
    const insertPayload = {
      full_name: payload.full_name.trim(),
      email: payload.email.trim().toLowerCase(),
      company: payload.company.trim(),
      job_title: payload.job_title.trim(),
      ticket_type: payload.ticket_type,
      industry: payload.industry,
      networking_interest: payload.networking_interest || [],
      status: 'pending' as RegistrationStatus,
    };

    const { data, error } = await client
      .from('registrations')
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.error('Supabase registration insert error:', error);
      return {
        success: false,
        error: error.message || 'Failed to record registration.',
      };
    }

    return {
      success: true,
      data: data as RegistrationRecord,
    };
  } catch (err: any) {
    console.error('Unexpected error during registration submission:', err);
    return {
      success: false,
      error: err?.message || 'Network error occurred while submitting registration.',
    };
  }
}

/**
 * Fetches registrations from Supabase with live filtering, searching, and sorting
 */
export async function fetchRegistrations(filters?: Partial<RegistrationFilters>): Promise<{
  success: boolean;
  data: RegistrationRecord[];
  error?: string;
}> {
  const creds = getSupabaseCredentials();
  const client = getSupabase();
  if (!client) {
    const errorMsg =
      creds.missing === 'anonKey'
        ? `Supabase Anon Key is missing. Please add VITE_SUPABASE_ANON_KEY to .env for project ${creds.url}.`
        : 'Supabase is not configured. Please provide project credentials in .env.';
    return {
      success: false,
      data: [],
      error: errorMsg,
    };
  }

  try {
    let query = client.from('registrations').select('*');

    // Filter by status
    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    // Filter by ticket_type
    if (filters?.ticket_type && filters.ticket_type !== 'all') {
      query = query.eq('ticket_type', filters.ticket_type);
    }

    // Filter by industry
    if (filters?.industry && filters.industry !== 'all') {
      query = query.eq('industry', filters.industry);
    }

    // Sort order
    const sortBy = filters?.sortBy || 'created_at';
    const sortOrder = filters?.sortOrder || 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    const { data, error } = await query;

    if (error) {
      console.error('Failed to fetch registrations:', error);
      return {
        success: false,
        data: [],
        error: error.message,
      };
    }

    let records = (data as RegistrationRecord[]) || [];

    // Client-side text search (full_name, email, company, job_title) for fast fuzzy responsiveness
    if (filters?.search && filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      records = records.filter(r =>
        r.full_name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.company.toLowerCase().includes(q) ||
        r.job_title.toLowerCase().includes(q)
      );
    }

    return {
      success: true,
      data: records,
    };
  } catch (err: any) {
    return {
      success: false,
      data: [],
      error: err?.message || 'Failed to query Supabase registrations.',
    };
  }
}

/**
 * Updates status (approve, reject, pending) or admin notes of a registration
 */
export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus,
  admin_notes?: string
): Promise<{ success: boolean; data?: RegistrationRecord; error?: string }> {
  const client = getSupabase();
  if (!client) {
    return { success: false, error: 'Supabase client not configured.' };
  }

  try {
    const updateData: Record<string, any> = { status };
    if (admin_notes !== undefined) {
      updateData.admin_notes = admin_notes;
    }

    const { data, error } = await client
      .from('registrations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as RegistrationRecord };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update registration status.' };
  }
}

/**
 * Computes aggregated statistics directly from the database records
 */
export function computeStatsFromRecords(records: RegistrationRecord[]): RegistrationStats {
  const stats: RegistrationStats = {
    total: records.length,
    pending: 0,
    approved: 0,
    rejected: 0,
    ticketTypeBreakdown: {},
    industryBreakdown: {},
  };

  for (const record of records) {
    if (record.status === 'approved') stats.approved++;
    else if (record.status === 'rejected') stats.rejected++;
    else stats.pending++;

    stats.ticketTypeBreakdown[record.ticket_type] = (stats.ticketTypeBreakdown[record.ticket_type] || 0) + 1;
    stats.industryBreakdown[record.industry] = (stats.industryBreakdown[record.industry] || 0) + 1;
  }

  return stats;
}
