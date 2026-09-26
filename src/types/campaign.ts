export type CampaignChannel = 'whatsapp' | 'gmail' | 'instagram';

export type CampaignStatus = 
  | 'borrador' 
  | 'validando' 
  | 'programada' 
  | 'enviando' 
  | 'pausada' 
  | 'completada' 
  | 'detenida' 
  | 'error' 
  | 'cancelada';

export interface Campaign {
  id: string;
  name: string;
  channel: CampaignChannel;
  channelLabel: string;
  channelSubtext?: string;
  status: CampaignStatus;
  statusLabel: string;
  totalContacts: number;
  sentCount: number;
  deliveredCount: number;
  failedCount: number;
  excludedCount?: number;
  scheduledAt?: string;
  completedAt?: string;
  createdAt: string;
  createdBy: string;
  messageContent: string;
  hasMedia?: boolean;
  mediaType?: 'image' | 'video' | 'audio' | 'document' | 'none';
  mediaUrl?: string;
  estimatedCredits: number;
  sendingRate?: string;
  progressPercent: number;
  timezone?: string;
  repeatWeekly?: boolean;
}

export interface LiveFeedItem {
  id: string;
  phoneNumber: string;
  contactName: string;
  status: 'entregado' | 'enviado' | 'leido' | 'fallido' | 'sin_whatsapp';
  timeAgo: string;
  timestamp: string;
}
