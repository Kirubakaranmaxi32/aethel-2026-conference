# AETHEL 2026 — International Symposium on Autonomous Systems & Intelligence

A premium, production-quality conference registration web application built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, **React Router**, and **Supabase (PostgreSQL & Supabase Auth)**.

---

## 🏛️ Application Architecture & Experiences

The application delivers two dedicated, cohesive experiences backed by the same Supabase PostgreSQL database:

### 1. Public Conference Landing Page (`/`)
- **Aesthetic**: Minimal, editorial, typography-forward (Swiss & classical serif typography, obsidian/alabaster high-contrast palette, hairline architectural borders, zero template cards or excessive AI gradients).
- **Core Sections**:
  - `[00 // HERO]`: Curatorial theme, dates, location, capacity counters, and primary action.
  - `[01 // MANIFESTO]`: Curatorial thesis on computational primitives and peer-reviewed rigor.
  - `[02 // CURATED TRACKS]`: 4 deep architectural syllabus tracks with subject tags.
  - `[03 // KEYNOTE FACULTY]`: Visionary fellows & research leaders with abstracts and portraits.
  - `[04 // PROGRAMME SCHEDULE]`: Interactive 3-day itinerary with time stamps and locations.
  - `[05 // ADMISSION TIERS]`: Clear accreditation tiers with direct tier pre-selection.
  - `[06 // INQUIRIES & ADMISSIONS]`: Editorial FAQ accordion.
  - `[07 // ACCREDITATION DOSSIER]`: Configuration-driven registration form with instant Supabase persistence.

### 2. Admissions Committee Admin Panel (`/admin`)
- **Authentication**: Authenticated via **Supabase Auth** (Email & Password), session persistence, plus one-click evaluation access.
- **Real-Time Database Operations**:
  - **Metrics Dashboard**: Total dossiers, pending review, accredited/approved, declined, and tier/sector distribution bars.
  - **Live Filter Engine**: Search by attendee name, email, company, and role; filter by ticket tier; filter by industry sector; filter by status tab.
  - **Registration Dossier Table**: Column sorting, quick approve/reject inline buttons, status badges, and dossier inspector.
  - **Detail View Slide-Over**: Full attendee dossier with profile, timestamps, Supabase UUID, selected networking tracks, review status decision buttons, and internal committee notes editor that saves directly to Supabase.
  - **Data Export**: One-click CSV export with sanitization.

---

## ⚙️ Configuration-Driven Registration System

Rather than hardcoding inputs, the form engine in [`src/config/registration.config.ts`](src/config/registration.config.ts) defines the schema declaratively:

```ts
export const REGISTRATION_CONFIG: RegistrationConfig = {
  formId: 'aethel-2026-delegates',
  version: '2.1.0',
  title: 'Delegate Application & Registration',
  fields: [
    { id: 'full_name', label: 'Full Name', type: 'text', required: true, ... },
    { id: 'email', label: 'Work Email Address', type: 'email', required: true, ... },
    { id: 'company', label: 'Organization / Company', type: 'text', required: true, ... },
    { id: 'job_title', label: 'Job Title / Function', type: 'text', required: true, ... },
    { id: 'ticket_type', label: 'Selected Ticket Tier', type: 'radio-cards', required: true, options: [...] },
    { id: 'industry', label: 'Primary Industry Focus', type: 'select', required: true, options: [...] },
    { id: 'networking_interest', label: 'Networking & Syndicate Tracks', type: 'checkbox-tags', required: true, options: [...] },
  ],
};
```

The dynamic form renderer ([`src/components/form/DynamicRegistrationForm.tsx`](src/components/form/DynamicRegistrationForm.tsx)) dynamically iterates through the schema, renders the appropriate atomic inputs, validates constraints, and executes the Supabase mutation.

---

## 🗄️ Supabase PostgreSQL Setup

### 1. Database Schema Migration
Open your [Supabase Dashboard](https://app.supabase.com) &rarr; **SQL Editor**, and run the SQL script located in [`supabase/schema.sql`](supabase/schema.sql):

```sql
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

-- Enable Row Level Security (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow public / anon users to submit registrations
CREATE POLICY "Allow anonymous submissions" ON public.registrations
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow reading & updating registrations
CREATE POLICY "Allow read registrations" ON public.registrations
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow update registrations" ON public.registrations
    FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
```

### 2. Environment Variables
Add your project credentials to `.env`:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```

*(You can also configure or test credentials live inside the web application via the **Supabase Connection Setup** dialog without restarting Vite).*

---

## 🚀 Running the Application

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```
