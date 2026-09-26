import React, { useState, useEffect } from 'react';
import { contactService } from '../services/contactService';
import { Contact } from '../types/contact';
import { Icon } from '../components/ui/Icon';
import { Modal } from '../components/ui/Modal';
import { useApp } from '../context/AppContext';

export const ContactsPage: React.FC = () => {
  const { showToast } = useApp();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'valido' | 'excluido'>('todos');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Contact Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newCity, setNewCity] = useState('');

  const loadContacts = async () => {
    const data = await contactService.getContacts(searchQuery);
    setContacts(data);
  };

  useEffect(() => {
    loadContacts();
  }, [searchQuery]);

  const filteredContacts = contacts.filter((c) => {
    if (statusFilter !== 'todos' && c.status !== statusFilter) return false;
    return true;
  });

  const totalCount = contacts.length;
  const validCount = contacts.filter((c) => c.status === 'valido').length;
  const excludedCount = contacts.filter((c) => c.status === 'excluido').length;

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    await contactService.addContact({
      name: newName,
      email: newEmail,
      phone: newPhone,
      company: newCompany || 'Empresa Independiente',
      city: newCity || 'Buenos Aires',
      status: 'valido'
    });

    showToast(`Contacto ${newName} agregado con éxito`, 'success');
    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewCompany('');
    setNewCity('');
    await loadContacts();
  };

  const handleDeleteContact = async (id: string, name: string) => {
    if (window.confirm(`¿Deseas eliminar a ${name}?`)) {
      await contactService.deleteContact(id);
      showToast(`Contacto eliminado`, 'info');
      await loadContacts();
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 max-w-6xl mx-auto pt-2 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">Contactos</h1>
          <p className="text-xs sm:text-sm text-secondary mt-0.5">
            Gestiona tu libreta de prospectos comerciales y sus variables dinámicas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="h-10 px-4 rounded-xl bg-surface-container-high text-primary text-xs font-semibold hover:bg-surface-container flex items-center gap-1.5 transition-colors"
          >
            <Icon name="upload_file" size={17} />
            <span>Importar lista</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="h-10 px-4 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container flex items-center gap-1.5 shadow-xs active:scale-98 transition-all"
          >
            <Icon name="person_add" size={17} />
            <span>+ Nuevo contacto</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col">
          <span className="text-xs text-secondary font-medium">Total Contactos</span>
          <span className="text-xl sm:text-2xl font-bold text-on-surface mt-0.5 tabular-nums">
            {totalCount.toLocaleString()}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col">
          <span className="text-xs text-emerald-800 font-semibold">Contactos Válidos</span>
          <span className="text-xl sm:text-2xl font-bold text-emerald-700 mt-0.5 tabular-nums">
            {validCount.toLocaleString()}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col">
          <span className="text-xs text-error font-semibold">Excluidos / Inválidos</span>
          <span className="text-xl sm:text-2xl font-bold text-error mt-0.5 tabular-nums">
            {excludedCount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-3 rounded-xl border border-surface-container/60 shadow-xs">
        <div className="flex items-center gap-1">
          {(['todos', 'valido', 'excluido'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                statusFilter === st
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-secondary hover:bg-surface-container-low'
              }`}
            >
              {st === 'todos' ? 'Todos' : st === 'valido' ? 'Válidos' : 'Excluidos'}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:w-64">
          <Icon name="search" size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, email o WhatsApp..."
            className="w-full h-9 pl-8 pr-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none"
          />
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-secondary font-bold uppercase tracking-wider border-b border-surface-container">
              <tr>
                <th className="p-3.5">Nombre</th>
                <th className="p-3.5">WhatsApp / Tel</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Empresa</th>
                <th className="p-3.5">Ciudad</th>
                <th className="p-3.5">Estado</th>
                <th className="p-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-3.5 font-bold text-on-surface">
                    {contact.name}
                    {contact.role && <span className="block text-[11px] font-normal text-secondary">{contact.role}</span>}
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-on-surface">{contact.phone}</td>
                  <td className="p-3.5 text-secondary">{contact.email}</td>
                  <td className="p-3.5 font-medium text-on-surface">{contact.company}</td>
                  <td className="p-3.5 text-secondary">{contact.city}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        contact.status === 'valido'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-error-container text-error'
                      }`}
                    >
                      {contact.status === 'valido' ? 'Válido' : 'Excluido'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => alert(`Variables de ${contact.name}:\n${JSON.stringify(contact.customFields || {}, null, 2)}`)}
                        className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-primary"
                        title="Ver detalles"
                      >
                        <Icon name="visibility" size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact.id, contact.name)}
                        className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-error"
                        title="Eliminar"
                      >
                        <Icon name="delete" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Importar */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Importar lista de contactos"
        subtitle="Carga rápida compatible con Excel, CSV o Google Sheets"
      >
        <div className="flex flex-col gap-4">
          <div className="p-6 rounded-xl border-2 border-dashed border-primary-fixed bg-surface-container-low/50 flex flex-col items-center text-center gap-2">
            <Icon name="cloud_upload" size={32} className="text-primary" />
            <span className="text-xs font-semibold text-on-surface">Arrastra tu archivo aquí o haz clic para examinar</span>
            <span className="text-[11px] text-secondary">Soporta .xlsx, .csv hasta 100,000 registros</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              onClick={() => setIsImportModalOpen(false)}
              className="px-4 h-10 rounded-lg text-xs font-semibold text-secondary hover:bg-surface-container-low"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                showToast('8,500 contactos importados y normalizados con éxito', 'success');
                setIsImportModalOpen(false);
              }}
              className="px-4 h-10 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container"
            >
              Procesar archivo
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Nuevo Contacto */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Nuevo Contacto Manual"
        subtitle="Agrega un prospecto con sus datos comerciales"
      >
        <form onSubmit={handleAddContact} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface">Nombre y Apellido *</label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ej: Marcelo Delgado"
              className="h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface">Número de WhatsApp (con código de país) *</label>
            <input
              type="tel"
              required
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="+54 9 11 1234-5678"
              className="h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface">Correo electrónico</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="marcelo@empresa.com"
              className="h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface">Empresa</label>
              <input
                type="text"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder="Ej: Tech Soluciones"
                className="h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface">Ciudad</label>
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="Ej: Córdoba"
                className="h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 h-10 rounded-lg text-xs font-semibold text-secondary hover:bg-surface-container-low"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 h-10 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs"
            >
              Guardar contacto
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
