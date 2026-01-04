
export interface KoledaSession {
  id: string;
  date: string;
  name: string; // e.g., Street name or District
  housesVisited: number;
  totalOfferings: number;
  createdAt: number;
}

export type NewKoledaData = Omit<KoledaSession, 'id' | 'createdAt'>;

export type Theme = 'green' | 'blue' | 'purple' | 'gold';
