export interface Speaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  bio: string;
  tag: string;
  image: string;
  featured?: boolean;
}

export interface Track {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
}

export interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
  role?: string;
  trackCode: string;
  location: string;
}

export interface ScheduleDay {
  day: string;
  date: string;
  theme: string;
  sessions: ScheduleItem[];
}

export interface TicketTier {
  id: string;
  name: string;
  price: string;
  badge?: string;
  description: string;
  features: string[];
  recommended?: boolean;
  capacity: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
