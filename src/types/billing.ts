import { PlanTier } from './user';

export interface PlanFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

export interface PricingPlan {
  id: PlanTier;
  name: string;
  badge?: string;
  subtitle: string;
  priceMonthlyUsd: number;
  periodLabel: string;
  creditsLabel: string;
  creditsAllowance: number;
  isLifetimeAllowance?: boolean;
  features: PlanFeature[];
  isPopular?: boolean;
  isCurrent?: boolean;
  hasAi: boolean;
  hasWhatsApp: boolean;
  hasGmail: boolean;
  hasInstagram: boolean;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amountUsd: number;
  status: 'pagada' | 'pendiente' | 'fallida';
  statusLabel: string;
  pdfUrl?: string;
}

export interface PaymentMethod {
  brand: string;
  last4: string;
  expMonth: string;
  expYear: string;
  gateway: 'Mercado Pago';
  status: 'activo' | 'invalido' | 'expirado';
}
