export type PlanTier = 'FREE' | 'STARTER' | 'PRO' | 'BUSINESS';

export interface User {
  id: string;
  name: string;
  email: string;
  companyName: string;
  accountType: 'personal' | 'empresa';
  role: string;
  avatarUrl?: string;
  plan: PlanTier;
  creditsAvailable: number;
  creditsTotal: number;
  creditsUsed: number;
  timezone: string;
  language: string;
  taxId?: string;
  billingAddress?: string;
}
