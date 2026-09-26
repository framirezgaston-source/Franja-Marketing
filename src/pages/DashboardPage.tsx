import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/ui/Icon';
import { mockDashboardMetrics } from '../mocks/dashboard';

export const DashboardPage: React.FC = () => {
  const { user, campaigns, updateCampaignStatus, duplicateCampaign, showToast } = useApp();
  const navigate = useNavigate();

  const metrics = mockDashboardMetrics;

  const handlePauseToggle = (campaignId: string, currentStatus: string) => {
    const next = currentStatus === 'pausada' ? 'enviando' : 'pausada';
    updateCampaignStatus(campaignId, next);
  };

  const handleDuplicate = (campaignId: string) => {
    duplicateCampaign(campaignId);
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-6 pt-2">
      {/* Saludo y Acción Primaria */}
      <section className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                Hola, {user?.name.split(' ')[0] || 'Carlos'}
              </h1>
              <span className="text-xl sm:text-2xl animate-pulse">👋</span>
            </div>
            <p className="text-xs sm:text-sm text-secondary mt-0.5 leading-snug">
              Gestiona tus campañas y automatiza tus ventas desde un solo lugar.
            </p>
          </div>
        </div>

        {/* Botón CTA de alto impacto */}
        <button
          onClick={() => navigate('/campaigns/new')}
          className="w-full h-12 rounded-xl bg-primary text-on-primary font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(0,81,187,0.35)] active:scale-[0.98] transition-all hover:bg-primary-container"
        >
          <Icon name="add_circle" size={20} />
          <span>Crear campaña</span>
        </button>
      </section>

      {/* Monitor de Créditos y Capacidad (Banner Inteligente) */}
      <section className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(11,28,48,0.04)] border border-surface-container/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <Icon name="toll" size={18} />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
                Balance de saldo
              </span>
              <p className="text-base sm:text-lg font-bold text-on-surface leading-tight tabular-nums">
                {(user?.creditsAvailable ?? metrics.balanceCurrent).toLocaleString()} / {(user?.creditsTotal ?? metrics.balanceTotal).toLocaleString()}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container text-xs flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
            {metrics.balanceRemainingPercent}% Restante
          </span>
        </div>

        {/* Barra de progreso segmentada */}
        <div className="space-y-1.5">
          <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-primary via-primary-container to-tertiary-fixed-dim rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(
                  100,
                  Math.round(
                    ((user?.creditsUsed ?? metrics.monthlyConsumption) /
                      (user?.creditsTotal ?? metrics.balanceTotal)) *
                      100
                  )
                )}%`
              }}
            />
          </div>
          <div className="flex justify-between items-center text-secondary text-xs">
            <span>
              Consumo mensual:{' '}
              <strong className="text-on-surface font-semibold tabular-nums">
                {(user?.creditsUsed ?? metrics.monthlyConsumption).toLocaleString()} envíos
              </strong>
            </span>
            <NavLink
              to="/billing"
              className="text-primary font-semibold hover:underline flex items-center gap-0.5"
            >
              <span>Recargar</span>
              <Icon name="arrow_forward" size={14} />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Métricas Clave (Bento Grid Móvil / Desktop de 2 a 4 columnas) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
            Métricas de rendimiento
          </span>
          <span className="text-xs text-primary font-medium flex items-center gap-1 cursor-pointer hover:underline">
            Últimos 30 días
            <Icon name="calendar_today" size={13} />
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {/* Métrica 1: Campañas */}
          <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-[0_2px_8px_rgba(11,28,48,0.03)] border border-surface-container/60 flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-secondary truncate font-medium">Campañas</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                <Icon name="campaign" size={16} />
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl text-on-surface font-bold tracking-tight tabular-nums">
                {metrics.totalCampaigns}
              </span>
              <p className="text-xs text-secondary flex items-center gap-0.5 mt-0.5 font-medium">
                <Icon name="trending_up" size={14} className="text-primary" />
                <span>+{metrics.activeCampaigns} activas</span>
              </p>
            </div>
          </div>

          {/* Métrica 2: Enviados */}
          <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-[0_2px_8px_rgba(11,28,48,0.03)] border border-surface-container/60 flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-secondary truncate font-medium">Enviados</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                <Icon name="forward_to_inbox" size={16} />
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl text-on-surface font-bold tracking-tight tabular-nums">
                {metrics.totalSent.toLocaleString()}
              </span>
              <p className="text-xs text-secondary truncate mt-0.5 font-medium">
                {metrics.quotaPercent}% de la cuota
              </p>
            </div>
          </div>

          {/* Métrica 3: Entregados */}
          <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-[0_2px_8px_rgba(11,28,48,0.03)] border border-surface-container/60 flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-secondary truncate font-medium">Entregados</span>
              <div className="w-7 h-7 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant">
                <Icon name="check_circle" size={16} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl text-on-surface font-bold tracking-tight tabular-nums">
                  {metrics.totalDelivered.toLocaleString()}
                </span>
              </div>
              <span className="inline-block px-1.5 py-0.5 mt-1 rounded bg-secondary-container text-on-secondary-fixed text-[11px] font-bold">
                {metrics.deliveredPercent}% efectividad
              </span>
            </div>
          </div>

          {/* Métrica 4: Fallidos */}
          <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-[0_2px_8px_rgba(11,28,48,0.03)] border border-surface-container/60 flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-secondary truncate font-medium">Fallidos</span>
              <div className="w-7 h-7 rounded-lg bg-error-container flex items-center justify-center text-error">
                <Icon name="error" size={16} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl text-error font-bold tracking-tight tabular-nums">
                  {metrics.totalFailed.toLocaleString()}
                </span>
              </div>
              <span className="inline-block px-1.5 py-0.5 mt-1 rounded bg-error-container text-on-error-container text-[11px] font-bold">
                {metrics.failedPercent}% no entregado
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Próximas Campañas & Recientes (Cards exactas de Stitch) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-on-surface">Próximas campañas</h2>
            <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container text-xs flex items-center justify-center font-bold">
              {campaigns.length}
            </span>
          </div>
          <NavLink
            to="/campaigns"
            className="text-xs text-primary font-semibold hover:underline"
          >
            Ver todas
          </NavLink>
        </div>

        {/* Lista de Tarjetas */}
        <div className="flex flex-col gap-3">
          {campaigns.map((camp) => {
            const isSending = camp.status === 'enviando';
            const isPaused = camp.status === 'pausada';
            const isCompleted = camp.status === 'completada';
            const isDraft = camp.status === 'borrador';

            return (
              <div
                key={camp.id}
                className={`bg-surface-container-lowest rounded-xl p-4 border border-surface-container/60 flex flex-col gap-3 transition-all hover:border-primary-fixed ${
                  isSending ? 'shadow-[0_4px_16px_rgba(23,105,230,0.08)] ring-1 ring-primary/20' : 'shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center ${
                        isSending
                          ? 'bg-primary-fixed text-primary'
                          : isCompleted
                          ? 'bg-surface-container-high text-on-surface'
                          : isDraft
                          ? 'bg-surface-container-low text-secondary'
                          : 'bg-surface-container text-primary'
                      }`}
                    >
                      <Icon
                        name={
                          camp.channel === 'whatsapp'
                            ? isSending
                              ? 'send'
                              : 'forum'
                            : camp.channel === 'gmail'
                            ? 'mail'
                            : 'photo_camera'
                        }
                        size={20}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <NavLink
                        to={`/campaigns/${camp.id}`}
                        className="text-sm font-bold text-on-surface truncate hover:text-primary transition-colors"
                      >
                        {camp.name}
                      </NavLink>
                      <div className="flex items-center gap-1.5 text-secondary text-xs mt-0.5">
                        <span>{camp.channelLabel}</span>
                        <span>•</span>
                        <span>{camp.totalContacts.toLocaleString()} contactos</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {isSending && (
                    <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[11px] font-bold flex items-center gap-1.5 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      Enviando {camp.progressPercent}%
                    </span>
                  )}
                  {camp.status === 'programada' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-semibold whitespace-nowrap shrink-0">
                      Programada
                    </span>
                  )}
                  {isCompleted && (
                    <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-semibold whitespace-nowrap shrink-0">
                      Completada
                    </span>
                  )}
                  {isDraft && (
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-secondary text-[11px] font-semibold whitespace-nowrap shrink-0">
                      Borrador
                    </span>
                  )}
                  {isPaused && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-semibold whitespace-nowrap shrink-0">
                      Pausada
                    </span>
                  )}
                </div>

                {/* Progress bar for Sending / Paused */}
                {(isSending || isPaused) && (
                  <div className="space-y-1">
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${isPaused ? 'bg-amber-500' : 'bg-primary'}`}
                        style={{ width: `${camp.progressPercent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-secondary text-xs">
                      <span>
                        {camp.sentCount.toLocaleString()} / {camp.totalContacts.toLocaleString()} enviados
                      </span>
                      <span className="text-primary font-medium">Restan ~8m</span>
                    </div>
                  </div>
                )}

                {/* Card Actions Footer */}
                <div className="flex items-center justify-between pt-1 text-secondary text-xs">
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <Icon name={isCompleted ? 'event_available' : 'schedule'} size={15} />
                    <span>{camp.scheduledAt || 'Sin programar aún'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Action buttons matching Stitch */}
                    {isSending || isPaused ? (
                      <>
                        <button
                          onClick={() => handlePauseToggle(camp.id, camp.status)}
                          className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-semibold text-xs flex items-center gap-1 hover:bg-surface-container-high transition-colors"
                        >
                          <Icon name={isPaused ? 'play_arrow' : 'pause'} size={15} />
                          <span>{isPaused ? 'Reanudar' : 'Pausar'}</span>
                        </button>
                        <NavLink
                          to={`/campaigns/${camp.id}`}
                          className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-semibold text-xs flex items-center gap-1 hover:bg-primary-container shadow-xs transition-colors"
                        >
                          <Icon name="insights" size={15} />
                          <span>En vivo</span>
                        </NavLink>
                      </>
                    ) : isCompleted ? (
                      <NavLink
                        to={`/campaigns/${camp.id}`}
                        className="text-xs text-primary font-semibold hover:underline"
                      >
                        Reporte completo
                      </NavLink>
                    ) : isDraft ? (
                      <NavLink
                        to="/campaigns/new"
                        className="px-3 py-1 rounded-lg bg-surface-container-low text-primary text-xs font-semibold hover:bg-surface-container"
                      >
                        Editar flujo
                      </NavLink>
                    ) : (
                      <>
                        <button
                          onClick={() => handleDuplicate(camp.id)}
                          aria-label="Duplicar campaña"
                          className="w-7 h-7 rounded-lg hover:bg-surface-container-low flex items-center justify-center text-secondary transition-colors"
                          title="Duplicar campaña"
                        >
                          <Icon name="content_copy" size={17} />
                        </button>
                        <NavLink
                          to={`/campaigns/${camp.id}`}
                          aria-label="Detalles"
                          className="w-7 h-7 rounded-lg hover:bg-surface-container-low flex items-center justify-center text-primary font-semibold transition-colors"
                          title="Ver detalles"
                        >
                          <Icon name="more_vert" size={18} />
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Canales Conectados (Exact Stitch design) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base sm:text-lg font-bold text-on-surface">Canales conectados</h2>
          <NavLink
            to="/integraciones"
            className="text-xs text-primary font-semibold hover:underline"
          >
            Configurar
          </NavLink>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-3 sm:p-4 shadow-[0_2px_12px_rgba(11,28,48,0.03)] border border-surface-container/60 flex flex-col gap-2.5">
          {/* Canal 1: WhatsApp Business */}
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0">
                <Icon name="chat" size={18} />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-on-surface truncate">WhatsApp Business</span>
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                </div>
                <span className="text-xs text-secondary truncate">+54 9 11 4567-8901 (Evolution API)</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-semibold">
              Activo
            </span>
          </div>

          {/* Canal 2: Gmail API */}
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-surface-container text-on-surface flex items-center justify-center flex-shrink-0">
                <Icon name="mail" size={18} />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-on-surface truncate">Gmail Corporativo</span>
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                </div>
                <span className="text-xs text-secondary truncate">ventas@miempresa.com</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-semibold">
              Activo
            </span>
          </div>

          {/* Canal 3: Instagram Direct (Alerta de reconexión) */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low/60">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-error-container text-error flex items-center justify-center flex-shrink-0">
                <Icon name="sync_problem" size={18} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-on-surface truncate">Instagram Direct</span>
                <span className="text-xs text-error truncate font-medium">Sesión expirada</span>
              </div>
            </div>
            <button
              onClick={() => {
                showToast('Reconectando cuenta de Instagram...', 'info');
                setTimeout(() => showToast('¡Instagram reconectado exitosamente!', 'success'), 1200);
              }}
              className="px-2.5 py-1 rounded-lg bg-error text-on-error text-xs font-semibold shadow-xs active:scale-95 transition-transform hover:bg-red-700"
            >
              Reconectar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
