import { Contact, ColumnMapping, ContactValidationSummary } from '../types/contact';

export const mockContacts: Contact[] = [
  {
    id: 'cnt-1',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@acerotech.com',
    phone: '+54 9 11 4829-1920',
    company: 'Acero Tech',
    city: 'Buenos Aires',
    role: 'Gerente de Compras',
    customFields: {
      Descuento: '25% OFF',
      Producto: 'Plan Anual'
    },
    status: 'valido',
    createdAt: '2026-09-20'
  },
  {
    id: 'cnt-2',
    name: 'María Gómez',
    email: 'maria.gomez@distribuidoradelsur.com',
    phone: '+54 9 11 8765-4321',
    company: 'Distribuidora del Sur',
    city: 'Córdoba',
    role: 'Directora Comercial',
    customFields: {
      Descuento: '30% OFF',
      Producto: 'Pack Mayorista'
    },
    status: 'valido',
    createdAt: '2026-09-20'
  },
  {
    id: 'cnt-3',
    name: 'Juan Pérez',
    email: 'juan.perez@logisticalatina.com',
    phone: '+54 9 11 2345-6789',
    company: 'Logística Latina',
    city: 'Rosario',
    role: 'Jefe de Operaciones',
    customFields: {
      Descuento: '15% OFF',
      Producto: 'Módulo Flotas'
    },
    status: 'valido',
    createdAt: '2026-09-21'
  },
  {
    id: 'cnt-4',
    name: 'Lucía Fernández',
    email: 'lfernandez@innovagroup.pe',
    phone: '+51 987 654 321',
    company: 'Innova Group',
    city: 'Lima',
    role: 'Marketing Lead',
    customFields: {
      Descuento: '20% OFF',
      Producto: 'Plan Pro'
    },
    status: 'valido',
    createdAt: '2026-09-22'
  },
  {
    id: 'cnt-5',
    name: 'Gabriel Romero',
    email: 'g.romero@agrocapital.com.ar',
    phone: '+54 9 351 555-1234',
    company: 'Agro Capital',
    city: 'Río Cuarto',
    role: 'CEO',
    customFields: {
      Descuento: '25% OFF',
      Producto: 'Suscripción Semestral'
    },
    status: 'valido',
    createdAt: '2026-09-23'
  },
  {
    id: 'cnt-6',
    name: 'Roberto Diaz',
    email: 'roberto@sintelefono.com',
    phone: '+54 9 11 4455-****',
    company: 'Construcciones Norte',
    city: 'Salta',
    role: 'Socio Fundador',
    status: 'excluido',
    exclusionReason: 'Número no registrado en WhatsApp',
    createdAt: '2026-09-24'
  },
  {
    id: 'cnt-7',
    name: 'Florencia Herrera',
    email: 'florencia@herrera.net',
    phone: '+54 9 11 1122-3344',
    company: 'Estudio Herrera & Asoc.',
    city: 'Mendoza',
    role: 'Abogada Principal',
    status: 'valido',
    createdAt: '2026-09-24'
  },
  {
    id: 'cnt-8',
    name: 'Sin Nombre',
    email: 'correo_invalido@',
    phone: '1234',
    company: 'Desconocido',
    city: 'Desconocido',
    status: 'excluido',
    exclusionReason: 'Teléfono inválido y correo sin formato',
    createdAt: '2026-09-24'
  }
];

export const defaultColumnMappings: ColumnMapping[] = [
  { fileColumn: 'cliente_nombre', targetField: 'Nombre', sampleValue: 'Carlos Mendoza' },
  { fileColumn: 'empresa', targetField: 'Empresa', sampleValue: 'Acero Tech' },
  { fileColumn: 'celular', targetField: 'WhatsApp', sampleValue: '+54 9 11 4829-1920' },
  { fileColumn: 'correo', targetField: 'Email', sampleValue: 'carlos.mendoza@acerotech.com' },
  { fileColumn: 'ciudad', targetField: 'Ciudad', sampleValue: 'Buenos Aires' },
  { fileColumn: 'bonificacion', targetField: 'Descuento', sampleValue: '25% OFF' },
  { fileColumn: 'interes', targetField: 'Producto', sampleValue: 'Plan Anual' }
];

export const mockValidationSummary: ContactValidationSummary = {
  total: 8500,
  valid: 8350,
  excluded: 150,
  invalidPhones: 92,
  invalidEmails: 38,
  emptyRequired: 20
};
