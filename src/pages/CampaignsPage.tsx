import React, { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/ui/Icon';
import { CampaignChannel } from '../types/campaign';

export const CampaignsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { campaigns, updateCampaignStatus, duplicateCampaign, deleteCampaign } = useApp();

  const activeTab = searchParams.get('status') || 'todas';
  const [selectedChannel, setSelectedChannel] = useState<'todos' | CampaignChannel>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = campaigns.filter((c) => {
    // Tab filtering
    if (activeTab === 'programadas' && c.status !== 'programada') return false;
    if (activeTab === 'enviando' && c.status !== 'enviando' && c.status !== 'pausada') return false;
    if (activeTab === 'historial' && c.status !== 'completada' && c.status !== 'detenida') return false;

    // Channel filtering
    if (selectedChannel !== 'todos' && c.channel !== selectedChannel) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!c.name.toLowerCase().includes(q) && !c.channelLabel.toLowerCase().includes(q)) return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col w-full gap-5 max-w-6xl mx-auto pt-2 pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">Campañas</h1>
          <p className="text-xs sm:text-sm text-secondary mt-0.5">
            Monitorea el estado, la cadencia y los resultados de todas tus comunicaciones comerciales.
          </p>
        </div>
        <button
          onClick={() => navigate('/campaigns/new')}
          className="h-11 px-5 rounded-xl bg-primary text-on-primary text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-container shadow-xs active:scale-98 transition-all shrink-0"
        >
          <Icon name="add_circle" size={18} />
          <span>Nueva campaña</span>
        </button>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-3 rounded-xl border border-surface-container/60 shadow-xs">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'todas', label: 'Todas' },
            { id: 'programadas', label: 'Programadas' },
            { id: 'enviando', label: 'Enviando' },
            { id: 'historial', label: 'Historial' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSearchParams({ status: tab.id })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-secondary hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Channel Filter & Search Input */}
        <div className="flex items-center gap-2">
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value as any)}
            className="h-9 px-2.5 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none text-secondary"
          >
            <option value="todos">Todos los canales</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="gmail">Gmail</option>
            <option value="instagram">Instagram</option>
          </select>

          <div className="relative flex-1 sm:w-56">
            <Icon name="search" size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar campaña..."
              className="w-full h-9 pl-8 pr-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Campaigns Data Table / Responsive Card Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="bg-surface-container-lowest p-12 rounded-2xl border border-surface-container text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
            <Icon name="campaign" size={28} />
          </div>
          <h3 className="font-bold text-base text-on-surface">No se encontraron campañas</h3>
          <p className="text-xs text-secondary max-w-sm">
            {searchQuery
              ? 'No hay campañas que coincidan con los criterios de búsqueda.'
              : 'Aún no tienes campañas con este filtro. ¡Crea tu primera campaña hoy!'}
          </p>
          <button
            onClick={() => navigate('/campaigns/new')}
            className="mt-2 px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container"
          >
            Crear primera campaña
          </button>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container/60 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-secondary font-bold uppercase tracking-wider border-b border-surface-container">
                <tr>
                  <th className="p-3.5">Campaña</th>
                  <th className="p-3.5">Canal</th>
                  <th className="p-3.5 text-right">Contactos</th>
                  <th className="p-3.5 text-right">Enviados</th>
                  <th className="p-3.5 text-right">Entregados</th>
                  <th className="p-3.5 text-right">Fallidos</th>
                  <th className="p-3.5">Fecha</th>
                  <th className="p-3.5">Estado</th>
                  <th className="p-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {filteredCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="p-3.5 font-bold text-on-surface">
                      <NavLink to={`/campaigns/${camp.id}`} className="hover:text-primary transition-colors">
                        {camp.name}
                      </NavLink>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-semibold text-[11px] inline-flex items-center gap-1">
                        <Icon name={camp.channel === 'whatsapp' ? 'chat' : camp.channel === 'gmail' ? 'mail' : 'photo_camera'} size={14} className="text-primary" />
                        <span>{camp.channel === 'whatsapp' ? 'WhatsApp' : camp.channel === 'gmail' ? 'Gmail' : 'Instagram'}</span>
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-medium tabular-nums">{camp.totalContacts.toLocaleString()}</td>
                    <td className="p-3.5 text-right font-medium tabular-nums">{camp.sentCount.toLocaleString()}</td>
                    <td className="p-3.5 text-right text-emerald-700 font-semibold tabular-nums">{camp.deliveredCount.toLocaleString()}</td>
                    <td className="p-3.5 text-right text-error font-medium tabular-nums">{camp.failedCount.toLocaleString()}</td>
                    <td className="p-3.5 text-secondary">{camp.scheduledAt || 'Sin programar'}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${
                          camp.status === 'enviando'
                            ? 'bg-primary-fixed text-on-primary-fixed-variant'
                            : camp.status === 'programada'
                            ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                            : camp.status === 'completada'
                            ? 'bg-secondary-container text-on-secondary-fixed'
                            : camp.status === 'pausada'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-surface-container-highest text-secondary'
                        }`}
                      >
                        {camp.statusLabel}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <NavLink
                          to={`/campaigns/${camp.id}`}
                          aria-label="Ver detalles"
                          className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-primary"
                          title="Ver detalles"
                        >
                          <Icon name="visibility" size={17} />
                        </NavLink>
                        <button
                          onClick={() => duplicateCampaign(camp.id)}
                          aria-label="Duplicar"
                          className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-secondary"
                          title="Duplicar"
                        >
                          <Icon name="content_copy" size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`¿Deseas eliminar la campaña "${camp.name}"?`)) {
                              deleteCampaign(camp.id);
                            }
                          }}
                          aria-label="Eliminar"
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

          {/* Mobile Card List View */}
          <div className="md:hidden divide-y divide-surface-container">
            {filteredCampaigns.map((camp) => (
              <div key={camp.id} className="p-4 flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <NavLink to={`/campaigns/${camp.id}`} className="font-bold text-sm text-on-surface truncate hover:text-primary">
                      {camp.name}
                    </NavLink>
                    <span className="text-xs text-secondary">{camp.channelLabel} • {camp.totalContacts.toLocaleString()} contactos</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
                      camp.status === 'enviando'
                        ? 'bg-primary-fixed text-on-primary-fixed-variant'
                        : camp.status === 'completada'
                        ? 'bg-secondary-container text-on-secondary-fixed'
                        : 'bg-surface-container text-secondary'
                    }`}
                  >
                    {camp.statusLabel}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs py-1 bg-surface-container-low rounded-lg">
                  <div>
                    <span className="text-[10px] text-secondary block">Enviados</span>
                    <span className="font-bold tabular-nums">{camp.sentCount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-800 block font-medium">Entregados</span>
                    <span className="font-bold text-emerald-700 tabular-nums">{camp.deliveredCount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-error block font-medium">Fallidos</span>
                    <span className="font-bold text-error tabular-nums">{camp.failedCount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-secondary">{camp.scheduledAt || 'Sin fecha'}</span>
                  <div className="flex items-center gap-2">
                    <NavLink to={`/campaigns/${camp.id}`} className="text-primary font-semibold hover:underline">
                      Ver en vivo
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
