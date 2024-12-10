export type Locale = 'en' | 'ar';

export interface Messages {
  [key: string]: {
    [key: string]: string;
  };
}