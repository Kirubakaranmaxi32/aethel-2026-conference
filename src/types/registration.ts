export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export type TicketTypeId = 'standard' | 'all-access' | 'executive' | 'fellowship';

export type IndustryId =
  | 'artificial-intelligence'
  | 'distributed-systems'
  | 'enterprise-saas'
  | 'fintech-crypto'
  | 'hardware-robotics'
  | 'biotech-compute'
  | 'academic-research';

export type NetworkingInterestId =
  | 'executive-roundtables'
  | 'research-collaborations'
  | 'founder-investor-connections'
  | 'technical-deep-dives'
  | 'open-source-coalitions'
  | 'career-talent-exchange';

export interface RegistrationRecord {
  id: string;
  full_name: string;
  email: string;
  company: string;
  job_title: string;
  ticket_type: string;
  industry: string;
  networking_interest: string[];
  status: RegistrationStatus;
  admin_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface RegistrationPayload {
  full_name: string;
  email: string;
  company: string;
  job_title: string;
  ticket_type: string;
  industry: string;
  networking_interest: string[];
}

export type FormFieldType =
  | 'text'
  | 'email'
  | 'select'
  | 'radio-cards'
  | 'checkbox-tags';

export interface FieldOption {
  label: string;
  value: string;
  description?: string;
  badge?: string;
  price?: string;
}

export interface FormFieldDefinition {
  id: keyof RegistrationPayload;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  colSpan?: 'full' | 'half';
  options?: FieldOption[];
  validate?: (value: any, formValues: Partial<RegistrationPayload>) => string | null;
}

export interface RegistrationConfig {
  formId: string;
  version: string;
  title: string;
  subtitle: string;
  fields: FormFieldDefinition[];
  submitButtonText: string;
  successMessage: {
    title: string;
    description: string;
  };
}

export interface RegistrationFilters {
  search: string;
  ticket_type: string;
  industry: string;
  status: 'all' | RegistrationStatus;
  sortBy: 'created_at' | 'full_name' | 'company';
  sortOrder: 'asc' | 'desc';
}

export interface RegistrationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  ticketTypeBreakdown: Record<string, number>;
  industryBreakdown: Record<string, number>;
}
