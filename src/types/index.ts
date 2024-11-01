export interface Log {
  id: string;
  type: 'stripe' | 'adyen' | 'other';
  message: string;
  timestamp: Date;
  status: 'success' | 'error';
}

export interface UserProfile {
  username: string;
  bin: string;
  proxy: string;
  totalHits: number;
}

export interface FilterState {
  showAll: boolean;
  allHits: boolean;
  stripe: boolean;
  adyen: boolean;
}