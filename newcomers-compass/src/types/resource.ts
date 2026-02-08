export interface Resource {
  id: string | number;
  title: string;
  category: 'Social' | 'Food' | 'Education' | 'Transit' | 'Other';
  description: string;
  website: string;
  imageUrl?: string;
}

export interface PendingResource {
  id: string;
  name: string;
  category: 'Essential Services' | 'Social & Community' | 'Education/ESL' | 'Transportation';
  description: string;
  websiteUrl: string;
  imageUrl?: string;
  submitterName?: string;
  submitterEmail?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface Itinerary {
  id: string;
  title: string;
  description: string;
  duration: string;
  targetAudience: string;
  activities: {
    time: string;
    activity: string;
    location: string;
    description: string;
  }[];
  imageUrl?: string;
  createdAt: Date;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example?: string;
  category: string;
  createdAt: Date;
}
