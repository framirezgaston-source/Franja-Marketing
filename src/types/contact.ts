export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  role?: string;
  customFields?: Record<string, string>;
  status: 'valido' | 'invalido' | 'excluido';
  exclusionReason?: string;
  createdAt: string;
}

export interface ColumnMapping {
  fileColumn: string;
  targetField: string;
  sampleValue?: string;
}

export interface ContactValidationSummary {
  total: number;
  valid: number;
  excluded: number;
  invalidPhones: number;
  invalidEmails: number;
  emptyRequired: number;
}
