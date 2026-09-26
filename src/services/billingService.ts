import { PricingPlan, Invoice, PaymentMethod } from '../types/billing';
import { PlanTier } from '../types/user';
import { mockPricingPlans, mockInvoices, mockPaymentMethod } from '../mocks/billing';

class BillingService {
  private plans: PricingPlan[] = [...mockPricingPlans];
  private invoices: Invoice[] = [...mockInvoices];
  private paymentMethod: PaymentMethod = { ...mockPaymentMethod };

  async getPlans(): Promise<PricingPlan[]> {
    await new Promise((res) => setTimeout(res, 50));
    return [...this.plans];
  }

  async getInvoices(): Promise<Invoice[]> {
    await new Promise((res) => setTimeout(res, 50));
    return [...this.invoices];
  }

  async getPaymentMethod(): Promise<PaymentMethod> {
    await new Promise((res) => setTimeout(res, 50));
    return { ...this.paymentMethod };
  }

  async updatePaymentMethod(last4: string): Promise<PaymentMethod> {
    await new Promise((res) => setTimeout(res, 200));
    this.paymentMethod = {
      ...this.paymentMethod,
      last4
    };
    return { ...this.paymentMethod };
  }

  canAccessChannel(plan: PlanTier, channel: 'whatsapp' | 'gmail' | 'instagram'): boolean {
    if (channel === 'whatsapp') return true;
    if (channel === 'gmail' || channel === 'instagram') {
      return plan !== 'FREE';
    }
    return false;
  }

  canAccessAi(plan: PlanTier): boolean {
    return plan !== 'FREE';
  }
}

export const billingService = new BillingService();
