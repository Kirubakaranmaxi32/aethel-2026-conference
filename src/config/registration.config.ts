import { RegistrationConfig } from '@/types/registration';

export const REGISTRATION_CONFIG: RegistrationConfig = {
  formId: 'aethel-2026-delegates',
  version: '2.1.0',
  title: 'Delegate Application & Registration',
  subtitle: 'Join 1,200 systems engineers, founders, and computational scientists in San Francisco.',
  submitButtonText: 'Submit Registration for Review',
  successMessage: {
    title: 'Application Received',
    description: 'Your registration dossier has been logged into the conference registry. Our admissions committee reviews submissions within 48 hours.',
  },
  fields: [
    {
      id: 'full_name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'e.g. Dr. Elena Vance',
      helperText: 'As it will appear on your credential pass and delegate directory.',
      colSpan: 'half',
      validate: (value) => {
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Please provide your full legal or professional name.';
        }
        return null;
      },
    },
    {
      id: 'email',
      label: 'Work Email Address',
      type: 'email',
      required: true,
      placeholder: 'elena.vance@blackmesa.ai',
      helperText: 'Verification links and itinerary notifications will be delivered here.',
      colSpan: 'half',
      validate: (value) => {
        if (!value || typeof value !== 'string') return 'Email address is required.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid corporate or institutional email address.';
        }
        return null;
      },
    },
    {
      id: 'company',
      label: 'Organization / Company',
      type: 'text',
      required: true,
      placeholder: 'e.g. Anthropic, DeepMind, Stanford Research',
      helperText: 'Firm, institution, or venture fund affiliation.',
      colSpan: 'half',
      validate: (value) => {
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Organization name is required.';
        }
        return null;
      },
    },
    {
      id: 'job_title',
      label: 'Job Title / Function',
      type: 'text',
      required: true,
      placeholder: 'e.g. Principal Systems Architect',
      helperText: 'Your role or operational specialty.',
      colSpan: 'half',
      validate: (value) => {
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Role or title is required.';
        }
        return null;
      },
    },
    {
      id: 'ticket_type',
      label: 'Selected Ticket Tier',
      type: 'radio-cards',
      required: true,
      helperText: 'Select your admission tier. Invoicing options available for enterprise teams.',
      colSpan: 'full',
      options: [
        {
          label: 'Standard Delegate',
          value: 'standard',
          price: '$1,400',
          badge: 'General Admission',
          description: 'Access to all mainstage keynotes, technical tracks, expo pavilion, and evening receptions.',
        },
        {
          label: 'All-Access Pass',
          value: 'all-access',
          price: '$2,400',
          badge: 'Most Popular',
          description: 'Includes hands-on engineering labs, private speaker lounges, full session recordings, and VIP dining.',
        },
        {
          label: 'Executive Syndicate',
          value: 'executive',
          price: '$4,800',
          badge: 'Limited to 150',
          description: 'Closed-door Chatham House roundtables, private founder-investor dinners, and 1:1 concierge briefing.',
        },
        {
          label: 'Academic / Fellowship',
          value: 'fellowship',
          price: 'Complimentary',
          badge: 'Application-based',
          description: 'Curated for full-time doctoral researchers, grant recipients, and open-source core maintainers.',
        },
      ],
      validate: (value) => {
        if (!value) return 'Please choose an admission tier.';
        return null;
      },
    },
    {
      id: 'industry',
      label: 'Primary Industry Focus',
      type: 'select',
      required: true,
      placeholder: 'Select your operational sector...',
      helperText: 'Helps us place you in tailored breakout pods and lunch roundtables.',
      colSpan: 'full',
      options: [
        { label: 'Artificial Intelligence & Machine Learning', value: 'Artificial Intelligence & ML' },
        { label: 'Distributed Systems & Infrastructure', value: 'Distributed Systems & Cloud' },
        { label: 'Enterprise Software & DevTools', value: 'Enterprise SaaS & DevTools' },
        { label: 'FinTech, Blockchain & Algorithmic Trading', value: 'FinTech & Digital Assets' },
        { label: 'Robotics, Autonomous Hardware & Silicon', value: 'Robotics & Hardware' },
        { label: 'Computational Biology & Life Sciences', value: 'BioTech & Health Systems' },
        { label: 'Academia, Gov & Independent Research', value: 'Academia & Research' },
      ],
      validate: (value) => {
        if (!value) return 'Please indicate your industry discipline.';
        return null;
      },
    },
    {
      id: 'networking_interest',
      label: 'Networking & Syndicate Tracks',
      type: 'checkbox-tags',
      required: true,
      helperText: 'Select at least one track so our matchmaking engine pairs you with relevant peers.',
      colSpan: 'full',
      options: [
        {
          label: 'Executive Roundtables',
          value: 'Executive Roundtables',
          description: 'Closed-door peer discussions for engineering leadership.',
        },
        {
          label: 'Investor & Founder Matchmaking',
          value: 'Investor & Founder Matchmaking',
          description: 'Direct 1:1 meetings between venture partners and technical founders.',
        },
        {
          label: 'Technical Deep Dives',
          value: 'Technical Deep Dives',
          description: 'Code-level architectural teardowns with lead maintainers.',
        },
        {
          label: 'Open Source Coalitions',
          value: 'Open Source Coalitions',
          description: 'Standardization and governance working groups.',
        },
        {
          label: 'Research Collaborations',
          value: 'Research Collaborations',
          description: 'Cross-institutional academic and industrial lab exchanges.',
        },
        {
          label: 'Talent & Leadership Exchange',
          value: 'Talent & Leadership Exchange',
          description: 'High-level hiring, advisory, and board-level introductions.',
        },
      ],
      validate: (value) => {
        if (!Array.isArray(value) || value.length === 0) {
          return 'Please select at least one networking track of interest.';
        }
        return null;
      },
    },
  ],
};
