import { PricingPlan, Invoice, PaymentMethod } from '../types/billing';

export const mockPricingPlans: PricingPlan[] = [
  {
    id: 'FREE',
    name: 'FREE',
    badge: 'Prueba Gratuita',
    subtitle: 'Prueba Gratuita',
    priceMonthlyUsd: 0,
    periodLabel: 'USD',
    creditsLabel: '15 envíos totales de por vida',
    creditsAllowance: 15,
    isLifetimeAllowance: true,
    hasAi: false,
    hasWhatsApp: true,
    hasGmail: false,
    hasInstagram: false,
    features: [
      { name: '15 envíos totales de por vida', included: true, highlight: true },
      { name: 'Canal WhatsApp Business', included: true },
      { name: 'Sin Asistente de IA', included: false },
      { name: 'Gmail no disponible', included: false },
      { name: 'Instagram Direct no disponible', included: false }
    ]
  },
  {
    id: 'STARTER',
    name: 'STARTER',
    badge: 'Negocios Emergentes',
    subtitle: 'Negocios Emergentes',
    priceMonthlyUsd: 15,
    periodLabel: 'USD / mes',
    creditsLabel: '1,000 envíos al mes',
    creditsAllowance: 1000,
    hasAi: true,
    hasWhatsApp: true,
    hasGmail: true,
    hasInstagram: true,
    features: [
      { name: '1,000 envíos al mes', included: true, highlight: true },
      { name: 'WhatsApp, Gmail e Instagram', included: true },
      { name: 'Asistente IA incluido', included: true },
      { name: 'Flujos automatizados estándar', included: true }
    ]
  },
  {
    id: 'PRO',
    name: 'PRO',
    badge: 'Más Popular',
    subtitle: 'Recomendado',
    priceMonthlyUsd: 29,
    periodLabel: 'USD / mes',
    creditsLabel: '5,000 envíos al mes',
    creditsAllowance: 5000,
    isPopular: true,
    isCurrent: true,
    hasAi: true,
    hasWhatsApp: true,
    hasGmail: true,
    hasInstagram: true,
    features: [
      { name: '5,000 envíos al mes', included: true, highlight: true },
      { name: 'WhatsApp, Gmail e Instagram', included: true },
      { name: 'Asistente IA con memoria contextual', included: true },
      { name: 'Reportes avanzados en tiempo real', included: true }
    ]
  },
  {
    id: 'BUSINESS',
    name: 'BUSINESS',
    badge: 'Alto Rendimiento',
    subtitle: 'Alto Rendimiento',
    priceMonthlyUsd: 79,
    periodLabel: 'USD / mes',
    creditsLabel: '20,000 envíos al mes',
    creditsAllowance: 20000,
    hasAi: true,
    hasWhatsApp: true,
    hasGmail: true,
    hasInstagram: true,
    features: [
      { name: '20,000 envíos al mes', included: true, highlight: true },
      { name: 'WhatsApp, Gmail e Instagram prioritarios', included: true },
      { name: 'Asistente IA prioritario y webhooks dedicados', included: true },
      { name: 'Soporte 24/7 vía WhatsApp', included: true }
    ]
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    number: '#INV-2025-010',
    date: '28 Oct 2025',
    amountUsd: 29.0,
    status: 'pagada',
    statusLabel: 'Pagada',
    pdfUrl: '#'
  },
  {
    id: 'inv-2',
    number: '#INV-2025-009',
    date: '28 Sep 2025',
    amountUsd: 29.0,
    status: 'pagada',
    statusLabel: 'Pagada',
    pdfUrl: '#'
  },
  {
    id: 'inv-3',
    number: '#INV-2025-008',
    date: '28 Ago 2025',
    amountUsd: 29.0,
    status: 'pagada',
    statusLabel: 'Pagada',
    pdfUrl: '#'
  }
];

export const mockPaymentMethod: PaymentMethod = {
  brand: 'Mastercard',
  last4: '4289',
  expMonth: '11',
  expYear: '28',
  gateway: 'Mercado Pago',
  status: 'activo'
};
