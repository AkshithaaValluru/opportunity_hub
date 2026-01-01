export type Level = 'State' | 'National' | 'International';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'Internship' | 'Hackathon' | 'Job' | 'Competition' | 'Workshop' | 'Other';
  category: string; // AI/ML, IT, Space, Sports, Law, etc.
  level: Level;
  location: string;
  deadline: string; // ISO date string YYYY-MM-DD
  isPaid: boolean;
  isVerified: boolean;
  url: string;
  description: string;
}

export interface User {
  email: string;
  name: string;
}

export type ViewMode = 'discover' | 'saved';

export type FilterState = {
  category: string;
  type: string;
  level: string;
  onlyPaid: boolean;
};

export const INITIAL_FILTERS: FilterState = {
  category: 'All',
  type: 'All',
  level: 'All',
  onlyPaid: false,
};

export const CATEGORIES = ['All', 'AI/ML', 'IT/Software', 'Space/Science', 'Business/Finance', 'Law/Policy', 'Design/Creative', 'Sports', 'Other'];
export const TYPES = ['All', 'Internship', 'Hackathon', 'Job', 'Competition', 'Workshop'];
export const LEVELS = ['All', 'State', 'National', 'International'];
