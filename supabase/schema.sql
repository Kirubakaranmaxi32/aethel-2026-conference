-- ==============================================================================
-- AETHEL 2026 // DATABASE SCHEMA MIGRATION FOR SUPABASE
-- Run this in your Supabase SQL Editor (https://app.supabase.com/project/_/sql)
-- ==============================================================================

-- 1. Create registrations table
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

-- 2. Indexes for search and high-performance filtering
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations (email);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations (status);
CREATE INDEX IF NOT EXISTS idx_registrations_ticket_type ON public.registrations (ticket_type);
CREATE INDEX IF NOT EXISTS idx_registrations_industry ON public.registrations (industry);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations (created_at DESC);

-- 3. Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_registration_updated ON public.registrations;
CREATE TRIGGER on_registration_updated
    BEFORE UPDATE ON public.registrations
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 4. Row Level Security (RLS) configuration
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow public / anon users to submit registrations
DROP POLICY IF EXISTS "Allow anonymous submissions" ON public.registrations;
CREATE POLICY "Allow anonymous submissions"
    ON public.registrations
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow authenticated users (Admin panel) to read all registrations
DROP POLICY IF EXISTS "Allow authenticated read" ON public.registrations;
CREATE POLICY "Allow authenticated read"
    ON public.registrations
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow authenticated users (Admin panel) to update registration status
DROP POLICY IF EXISTS "Allow authenticated update" ON public.registrations;
CREATE POLICY "Allow authenticated update"
    ON public.registrations
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy fallback for development & anon testing (allows reading & updating with anon key if needed)
DROP POLICY IF EXISTS "Allow anon read for demo/preview" ON public.registrations;
CREATE POLICY "Allow anon read for demo/preview"
    ON public.registrations
    FOR SELECT
    TO anon
    USING (true);

DROP POLICY IF EXISTS "Allow anon update for demo/preview" ON public.registrations;
CREATE POLICY "Allow anon update for demo/preview"
    ON public.registrations
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

-- 5. Comments
COMMENT ON TABLE public.registrations IS 'Stores conference attendee registrations for AETHEL 2026';
