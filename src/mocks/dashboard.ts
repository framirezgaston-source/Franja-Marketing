export interface DashboardMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
  deliveredPercent: number;
  failedPercent: number;
  quotaPercent: number;
  balanceCurrent: number;
  balanceTotal: number;
  balanceRemainingPercent: number;
  monthlyConsumption: number;
}

export const mockDashboardMetrics: DashboardMetrics = {
  totalCampaigns: 24,
  activeCampaigns: 4,
  totalSent: 48250,
  totalDelivered: 46980,
  totalFailed: 1270,
  deliveredPercent: 97.3,
  failedPercent: 2.7,
  quotaPercent: 96.5,
  balanceCurrent: 1760,
  balanceTotal: 5000,
  balanceRemainingPercent: 35.2,
  monthlyConsumption: 3240
};
