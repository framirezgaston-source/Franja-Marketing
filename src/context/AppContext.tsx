import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, PlanTier } from '../types/user';
import { Campaign, CampaignStatus } from '../types/campaign';
import { authService, initialMockUser } from '../services/authService';
import { campaignService } from '../services/campaignService';

interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  updatePlan: (plan: PlanTier) => Promise<void>;
  deductCredits: (amount: number) => Promise<void>;

  campaigns: Campaign[];
  loadingCampaigns: boolean;
  refreshCampaigns: () => Promise<void>;
  createCampaign: (data: Omit<Campaign, 'id' | 'createdAt' | 'sentCount' | 'deliveredCount' | 'failedCount' | 'progressPercent'>) => Promise<Campaign>;
  updateCampaignStatus: (id: string, status: CampaignStatus) => Promise<void>;
  duplicateCampaign: (id: string) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;

  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(initialMockUser);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const refreshCampaigns = async () => {
    try {
      const data = await campaignService.getCampaigns();
      setCampaigns(data);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  useEffect(() => {
    refreshCampaigns();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = async (email: string, pass: string) => {
    const u = await authService.login(email, pass);
    setUser(u);
    showToast('Sesión iniciada correctamente', 'success');
  };

  const register = async (name: string, email: string) => {
    const u = await authService.register(name, email);
    setUser(u);
    showToast('Cuenta creada con éxito', 'success');
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    showToast('Sesión cerrada', 'info');
  };

  const updatePlan = async (plan: PlanTier) => {
    const u = await authService.updateUserPlan(plan);
    setUser({ ...u });
    showToast(`Plan actualizado a ${plan}`, 'success');
  };

  const deductCredits = async (amount: number) => {
    const u = await authService.deductCredits(amount);
    setUser({ ...u });
  };

  const createCampaign = async (data: Omit<Campaign, 'id' | 'createdAt' | 'sentCount' | 'deliveredCount' | 'failedCount' | 'progressPercent'>) => {
    const created = await campaignService.createCampaign(data);
    await refreshCampaigns();
    await deductCredits(created.estimatedCredits);
    showToast(`Campaña "${created.name}" creada`, 'success');
    return created;
  };

  const updateCampaignStatus = async (id: string, status: CampaignStatus) => {
    await campaignService.updateCampaignStatus(id, status);
    await refreshCampaigns();
    showToast(`Estado de campaña actualizado`, 'info');
  };

  const duplicateCampaign = async (id: string) => {
    await campaignService.duplicateCampaign(id);
    await refreshCampaigns();
    showToast('Campaña duplicada', 'success');
  };

  const deleteCampaign = async (id: string) => {
    await campaignService.deleteCampaign(id);
    await refreshCampaigns();
    showToast('Campaña eliminada', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updatePlan,
        deductCredits,
        campaigns,
        loadingCampaigns,
        refreshCampaigns,
        createCampaign,
        updateCampaignStatus,
        duplicateCampaign,
        deleteCampaign,
        toasts,
        showToast,
        removeToast,
        drawerOpen,
        setDrawerOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
