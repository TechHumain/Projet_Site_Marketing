export interface ConsentCategories {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentCookie {
  categories: ConsentCategories;
  timestamp: string;
}

export interface ConsentEvent extends ConsentCookie {
  userId?: string | null;
}
