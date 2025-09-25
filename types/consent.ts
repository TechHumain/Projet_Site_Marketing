export type ConsentCategories = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentStatus = 'ACCEPT' | 'REJECT' | 'CUSTOM';
