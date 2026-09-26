import { Integration } from '../types/integration';

export const mockIntegrations: Integration[] = [
  {
    id: 'int-whatsapp',
    channel: 'whatsapp',
    name: 'WhatsApp Business',
    provider: 'Evolution API',
    identifier: '+54 9 11 4567-8901 (Evolution API)',
    status: 'conectado',
    statusLabel: 'Activo',
    requiresPaidPlan: false,
    lastSync: 'Sincronizado hace 2 min',
    metadata: {
      instanceId: 'inst_franja_prod_01',
      webhookUrl: 'https://api.franjaautomations.com/webhook/wa',
      batteryStatus: '100% (Conectado)'
    }
  },
  {
    id: 'int-gmail',
    channel: 'gmail',
    name: 'Gmail Corporativo',
    provider: 'Google Workspace OAuth',
    identifier: 'ventas@miempresa.com',
    status: 'conectado',
    statusLabel: 'Activo',
    requiresPaidPlan: true,
    lastSync: 'Conectado token activo',
    metadata: {
      quotaDaily: '2,000 correos/día',
      mailbox: 'ventas@miempresa.com'
    }
  },
  {
    id: 'int-instagram',
    channel: 'instagram',
    name: 'Instagram Direct',
    provider: 'Meta Graph API',
    identifier: '@miempresa.oficial',
    status: 'sesion_expirada',
    statusLabel: 'Sesión expirada',
    requiresPaidPlan: true,
    lastSync: 'Token caducado hace 2 días',
    metadata: {
      accountType: 'Professional Creator'
    }
  },
  {
    id: 'int-sheets',
    channel: 'sheets',
    name: 'Google Sheets',
    provider: 'Google Drive API',
    identifier: 'Leads y Campañas Activas 2026',
    status: 'conectado',
    statusLabel: 'Activo',
    requiresPaidPlan: false,
    lastSync: 'Actualizado hace 15 min',
    metadata: {
      syncedRows: '8,500 filas'
    }
  }
];
