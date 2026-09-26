import { Campaign, CampaignStatus } from '../types/campaign';
import { mockCampaigns } from '../mocks/campaigns';

class CampaignService {
  private campaigns: Campaign[] = [...mockCampaigns];

  async getCampaigns(filter?: { status?: string; channel?: string; search?: string }): Promise<Campaign[]> {
    // Simulated network delay
    await new Promise((res) => setTimeout(res, 50));
    let result = [...this.campaigns];

    if (filter?.status && filter.status !== 'todas') {
      if (filter.status === 'programadas') {
        result = result.filter((c) => c.status === 'programada');
      } else if (filter.status === 'enviando') {
        result = result.filter((c) => c.status === 'enviando');
      } else if (filter.status === 'historial') {
        result = result.filter((c) => c.status === 'completada' || c.status === 'detenida');
      } else {
        result = result.filter((c) => c.status === filter.status);
      }
    }

    if (filter?.channel && filter.channel !== 'todos') {
      result = result.filter((c) => c.channel === filter.channel);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.channelLabel.toLowerCase().includes(q)
      );
    }

    return result;
  }

  async getCampaignById(id: string): Promise<Campaign | undefined> {
    await new Promise((res) => setTimeout(res, 50));
    return this.campaigns.find((c) => c.id === id);
  }

  async createCampaign(campaignData: Omit<Campaign, 'id' | 'createdAt' | 'sentCount' | 'deliveredCount' | 'failedCount' | 'progressPercent'>): Promise<Campaign> {
    await new Promise((res) => setTimeout(res, 100));
    const newCampaign: Campaign = {
      ...campaignData,
      id: `camp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      sentCount: campaignData.status === 'enviando' ? 1 : 0,
      deliveredCount: campaignData.status === 'enviando' ? 1 : 0,
      failedCount: 0,
      progressPercent: campaignData.status === 'enviando' ? 1 : 0
    };
    this.campaigns.unshift(newCampaign);
    return newCampaign;
  }

  async updateCampaignStatus(id: string, newStatus: CampaignStatus): Promise<Campaign> {
    await new Promise((res) => setTimeout(res, 50));
    const idx = this.campaigns.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Campaña no encontrada');

    const updated = {
      ...this.campaigns[idx],
      status: newStatus,
      statusLabel: newStatus === 'pausada' ? 'Pausada' : newStatus === 'detenida' ? 'Detenida' : newStatus === 'enviando' ? 'Enviando' : this.campaigns[idx].statusLabel
    };
    this.campaigns[idx] = updated;
    return updated;
  }

  async duplicateCampaign(id: string): Promise<Campaign> {
    await new Promise((res) => setTimeout(res, 50));
    const orig = this.campaigns.find((c) => c.id === id);
    if (!orig) throw new Error('Campaña no encontrada');

    const copy: Campaign = {
      ...orig,
      id: `camp-${Date.now()}`,
      name: `${orig.name} (Copia)`,
      status: 'borrador',
      statusLabel: 'Borrador',
      sentCount: 0,
      deliveredCount: 0,
      failedCount: 0,
      progressPercent: 0,
      createdAt: new Date().toISOString()
    };
    this.campaigns.unshift(copy);
    return copy;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 50));
    this.campaigns = this.campaigns.filter((c) => c.id !== id);
    return true;
  }
}

export const campaignService = new CampaignService();
