export type IntegrationStatus = 'conectado' | 'conectando' | 'no_conectado' | 'error' | 'sesion_expirada';

export interface Integration {
  id: string;
  channel: 'whatsapp' | 'gmail' | 'instagram' | 'sheets';
  name: string;
  provider: string;
  identifier: string;
  status: IntegrationStatus;
  statusLabel: string;
  requiresPaidPlan?: boolean;
  lastSync?: string;
  metadata?: Record<string, string>;
}
