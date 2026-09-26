import { Integration, IntegrationStatus } from '../types/integration';
import { mockIntegrations } from '../mocks/integrations';

class IntegrationService {
  private integrations: Integration[] = [...mockIntegrations];

  async getIntegrations(): Promise<Integration[]> {
    await new Promise((res) => setTimeout(res, 50));
    return [...this.integrations];
  }

  async updateStatus(id: string, status: IntegrationStatus): Promise<Integration> {
    await new Promise((res) => setTimeout(res, 100));
    const idx = this.integrations.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error('Integración no encontrada');

    const statusLabel =
      status === 'conectado'
        ? 'Activo'
        : status === 'sesion_expirada'
        ? 'Sesión expirada'
        : status === 'conectando'
        ? 'Conectando...'
        : 'Desconectado';

    const updated = {
      ...this.integrations[idx],
      status,
      statusLabel,
      lastSync: status === 'conectado' ? 'Recién actualizado' : this.integrations[idx].lastSync
    };
    this.integrations[idx] = updated;
    return updated;
  }
}

export const integrationService = new IntegrationService();
