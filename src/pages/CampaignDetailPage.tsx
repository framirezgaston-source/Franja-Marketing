import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/ui/Icon';
import { mockLiveFeed } from '../mocks/campaigns';
import { LiveFeedItem } from '../types/campaign';

export const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { campaigns, updateCampaignStatus, showToast } = useApp();

  const campaign = campaigns.find((c) => c.id === id) || campaigns[0];

  const [isPaused, setIsPaused] = useState(campaign?.status === 'pausada');
  const [feedItems, setFeedItems] = useState<LiveFeedItem[]>(mockLiveFeed);
  const [processedCount, setProcessedCount] = useState(campaign?.sentCount || 6430);
  const [deliveredCount, setDeliveredCount] = useState(campaign?.deliveredCount || 6210);

  const totalContacts = campaign?.totalContacts || 8350;
  const progressPercent = Math.min(100, Number(((processedCount / totalContacts) * 100).toFixed(1)));

  // Periodic simulated live delivery feed
  useEffect(() => {
    if (isPaused || campaign?.status !== 'enviando') return;

    const names = [
      'Lucía Fernández',
      'Gabriel Romero',
      'Florencia Herrera',
      'Martín Silva',
      'Esteban Rossi',
      'Camila Benítez'
    ];

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomPhone = `+54 9 11 ${Math.floor(1000 + Math.random() * 9000)}-****`;
      const newItem: LiveFeedItem = {
        id: `feed-${Date.now()}`,
        phoneNumber: randomPhone,
        contactName: randomName,
        status: 'entregado',
        timeAgo: 'ahora',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      setFeedItems((prev) => [newItem, ...prev.slice(0, 5)]);
      setProcessedCount((prev) => Math.min(totalContacts, prev + 1));
      setDeliveredCount((prev) => Math.min(totalContacts, prev + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, campaign?.status, totalContacts]);

  const handleTogglePause = () => {
    const nextPaused = !isPaused;
    setIsPaused(nextPaused);
    updateCampaignStatus(campaign.id, nextPaused ? 'pausada' : 'enviando');
    showToast(nextPaused ? 'Campaña pausada' : 'Campaña reanudada', 'info');
  };

  const handleStopCampaign = () => {
    if (window.confirm('¿Estás seguro de que deseas detener la campaña por completo? Esta acción liberará la cola no procesada.')) {
      updateCampaignStatus(campaign.id, 'detenida');
      showToast('Campaña detenida con éxito. Los informes finales fueron consolidados.', 'info');
      navigate('/campaigns');
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 max-w-4xl mx-auto pt-2 pb-10">
      {/* Breadcrumb nav */}
      <div className="flex items-center gap-2 text-xs text-secondary px-1">
        <NavLink to="/campaigns" className="hover:text-primary transition-colors flex items-center gap-1">
          <Icon name="arrow_back" size={16} />
          <span>Volver a campañas</span>
        </NavLink>
        <span>/</span>
        <span className="text-on-surface font-semibold truncate">{campaign.name}</span>
      </div>

      {/* Tarjeta Cabecera de Estado y Metadatos (Exact Stitch Image 6) */}
      <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-sm border border-surface-container/60 flex flex-col gap-4 relative overflow-hidden">
        {/* Glow decorativo */}
        <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold flex items-center gap-1">
                <Icon name="chat" size={14} />
                <span>{campaign.channel === 'whatsapp' ? 'WhatsApp' : campaign.channel === 'gmail' ? 'Gmail' : 'Instagram'}</span>
              </span>
              <span className="text-xs text-secondary">• {campaign.scheduledAt || 'Hoy, 10:30 AM'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              {campaign.name}
            </h1>

            <p className="text-xs text-secondary flex items-center gap-1">
              <Icon name="person" size={14} />
              <span>
                Creada por <strong className="text-on-surface font-medium">{campaign.createdBy}</strong>
              </span>
            </p>
          </div>

          {/* Badge de Estado En Vivo Pulsante */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-container text-on-primary text-xs font-semibold shadow-sm shrink-0">
            {campaign.status === 'enviando' && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-on-primary" />
              </span>
            )}
            <span className="uppercase">{isPaused ? 'PAUSADA' : campaign.status}</span>
          </div>
        </div>

        {/* Barra de Control Rápido de Emergencia */}
        <div className="grid grid-cols-2 gap-3 pt-1 relative z-10">
          <button
            type="button"
            onClick={handleTogglePause}
            className={`h-11 px-4 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] ${
              isPaused
                ? 'bg-primary text-on-primary hover:bg-primary-container shadow-xs'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
            }`}
          >
            <Icon name={isPaused ? 'play_circle' : 'pause_circle'} size={20} className={isPaused ? 'text-on-primary' : 'text-primary'} />
            <span>{isPaused ? 'Reanudar envío' : 'Pausar envío'}</span>
          </button>

          <button
            type="button"
            onClick={handleStopCampaign}
            className="h-11 px-4 rounded-lg bg-error-container hover:bg-red-100 text-error flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all active:scale-[0.98]"
          >
            <Icon name="stop_circle" size={20} />
            <span>Detener</span>
          </button>
        </div>
      </div>

      {/* Progreso de Entrega */}
      <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-sm border border-surface-container/60 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-secondary uppercase font-semibold">Progreso de Entrega</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl sm:text-3xl text-on-surface font-bold tracking-tight tabular-nums">
                {processedCount.toLocaleString()}
              </span>
              <span className="text-base text-secondary tabular-nums">/ {totalContacts.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl sm:text-3xl text-primary font-bold tabular-nums">{progressPercent}%</span>
            <span className="text-xs text-secondary">Completado</span>
          </div>
        </div>

        {/* Barra de progreso visual con gradiente */}
        <div className="w-full h-3.5 bg-surface-container rounded-full overflow-hidden p-0.5 relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-container via-primary to-tertiary transition-all duration-700 ease-out relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>

        {/* Métricas de Flujo & Cadencia Anti-spam */}
        <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs">
              <Icon name="speed" size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-secondary leading-tight">Ritmo Evolution API</span>
              <span className="text-xs text-on-surface font-semibold leading-tight">
                {campaign.sendingRate || '~45 msgs/min (Antispam Activo)'}
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-semibold">
            Seguro Meta
          </span>
        </div>
      </div>

      {/* Métricas Clave en Tiempo Real (Grid de 3 cols) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {/* Enviados */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-sm border border-surface-container/60 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-secondary font-medium">Enviados</span>
            <Icon name="outbox" size={18} className="text-primary" />
          </div>
          <span className="text-xl sm:text-2xl text-on-surface font-bold tracking-tight tabular-nums">
            {processedCount.toLocaleString()}
          </span>
          <span className="text-[11px] text-secondary">100% cuota</span>
        </div>

        {/* Entregados */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-sm border border-surface-container/60 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-secondary font-medium">Entregados</span>
            <Icon name="done_all" size={18} className="text-tertiary-container" />
          </div>
          <span className="text-xl sm:text-2xl text-on-surface font-bold tracking-tight tabular-nums">
            {deliveredCount.toLocaleString()}
          </span>
          <span className="text-[11px] text-tertiary-container font-medium">96.5% confirm.</span>
        </div>

        {/* Rebotes */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-sm border border-surface-container/60 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-secondary font-medium">Rebotes</span>
            <Icon name="error" size={18} className="text-error" />
          </div>
          <span className="text-xl sm:text-2xl text-error font-bold tracking-tight tabular-nums">
            {campaign.failedCount || 220}
          </span>
          <span className="text-[11px] text-error">3.5% descono.</span>
        </div>
      </div>

      {/* Monitor de Consumo de Créditos */}
      <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl shadow-sm border border-surface-container/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="toll" size={20} className="text-primary" />
            <span className="text-sm font-bold text-on-surface">Consumo de Créditos</span>
          </div>
          <span className="text-xs text-secondary">PRO Mensual</span>
        </div>
        <div className="flex items-center justify-between bg-surface-container-low p-3 rounded-lg">
          <div className="flex flex-col">
            <span className="text-xs text-secondary">Deducidos hasta ahora</span>
            <span className="text-base sm:text-lg font-bold text-on-surface tabular-nums">
              {processedCount.toLocaleString()} cr
            </span>
          </div>
          <div className="h-8 w-px bg-outline-variant/40" />
          <div className="flex flex-col items-end">
            <span className="text-xs text-secondary">Costo estimado total</span>
            <span className="text-base sm:text-lg font-bold text-primary tabular-nums">
              {campaign.estimatedCredits.toLocaleString()} cr
            </span>
          </div>
        </div>
      </div>

      {/* Feed en Tiempo Real de Envíos (Live Activity Feed) */}
      <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-sm border border-surface-container/60 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <h2 className="text-base font-bold text-on-surface">Registro de Envíos en Vivo</h2>
          </div>
          <span className="text-xs text-secondary">Feed constante</span>
        </div>

        {/* Live List Items */}
        <div className="flex flex-col gap-2">
          {feedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low transition-all duration-300 hover:bg-surface-container"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    item.status === 'sin_whatsapp'
                      ? 'bg-error-container text-error'
                      : 'bg-surface-container-lowest text-primary shadow-xs'
                  }`}
                >
                  <Icon name={item.status === 'sin_whatsapp' ? 'error_outline' : 'done_all'} size={18} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-on-surface truncate">{item.phoneNumber}</span>
                  <span className="text-[11px] text-secondary truncate">{item.contactName}</span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-0.5 ${
                    item.status === 'sin_whatsapp'
                      ? 'bg-error-container text-error'
                      : 'bg-surface-container text-tertiary-container'
                  }`}
                >
                  {item.status === 'sin_whatsapp' ? 'Sin WhatsApp' : 'Entregado ✓✓'}
                </span>
                <span className="text-[10px] text-secondary mt-0.5">{item.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vista previa de Plantilla Enviada */}
      <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-sm border border-surface-container/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-secondary uppercase font-semibold">Plantilla en Envío</span>
          <span className="text-xs text-primary font-semibold">HSM Aprobado</span>
        </div>
        <div className="p-3.5 rounded-lg bg-surface-container-low flex flex-col gap-2">
          <p className="text-xs text-on-surface leading-relaxed whitespace-pre-line">
            "{campaign.messageContent}"
          </p>
          <div className="flex items-center gap-1 mt-1 text-secondary text-[11px]">
            <Icon name="touch_app" size={16} />
            <span>Incluye botón de acción rápida directo al CRM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
