import { User, PlanTier } from '../types/user';

export const initialMockUser: User = {
  id: 'usr-carlos-1',
  name: 'Carlos Ramírez',
  email: 'framirezgaston@franjaautomations.com',
  companyName: 'Acero Tech S.A.',
  accountType: 'empresa',
  role: 'Administrador',
  avatarUrl: '',
  plan: 'PRO',
  creditsAvailable: 1760,
  creditsTotal: 5000,
  creditsUsed: 3240,
  timezone: 'America/Argentina/Buenos_Aires',
  language: 'es-AR',
  taxId: '30-71234567-9',
  billingAddress: 'Av. Corrientes 1450, Piso 8, CABA'
};

class AuthService {
  private currentUser: User | null = initialMockUser;

  getUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  async login(email: string, _pass: string): Promise<User> {
    await new Promise((res) => setTimeout(res, 150));
    this.currentUser = {
      ...initialMockUser,
      email: email || initialMockUser.email
    };
    return this.currentUser;
  }

  async register(name: string, email: string): Promise<User> {
    await new Promise((res) => setTimeout(res, 150));
    this.currentUser = {
      ...initialMockUser,
      name: name || 'Carlos Ramírez',
      email: email || 'carlos@miempresa.com',
      plan: 'FREE',
      creditsAvailable: 15,
      creditsTotal: 15,
      creditsUsed: 0
    };
    return this.currentUser;
  }

  async logout(): Promise<void> {
    await new Promise((res) => setTimeout(res, 50));
    this.currentUser = null;
  }

  async updateUserPlan(newPlan: PlanTier): Promise<User> {
    if (!this.currentUser) throw new Error('No autenticado');
    const allowances: Record<PlanTier, number> = {
      FREE: 15,
      STARTER: 1000,
      PRO: 5000,
      BUSINESS: 20000
    };
    this.currentUser = {
      ...this.currentUser,
      plan: newPlan,
      creditsTotal: allowances[newPlan],
      creditsAvailable: Math.max(0, allowances[newPlan] - this.currentUser.creditsUsed)
    };
    return this.currentUser;
  }

  async deductCredits(amount: number): Promise<User> {
    if (!this.currentUser) throw new Error('No autenticado');
    this.currentUser = {
      ...this.currentUser,
      creditsAvailable: Math.max(0, this.currentUser.creditsAvailable - amount),
      creditsUsed: this.currentUser.creditsUsed + amount
    };
    return this.currentUser;
  }
}

export const authService = new AuthService();
