import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { integrationService } from '../services/integrationService';
import { Integration } from '../types/integration';
import { Icon } from '../components/ui/Icon';
import { Modal } from '../components/ui/Modal';
import { useApp } from '../context/AppContext';

export const IntegrationsPage: React.FC = () => {
  const { user, showToast } = useApp();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [activeModalChannel, setActiveModalChannel] = useState<string | null>(null);

  const loadIntegrations = async () => {
    const data = await integrationService.getIntegrations();
    setIntegrations(data);
  };

  useEffect(() => {
    loadIntegrations();
  }, []);

  const handleAction = async (item: Integration) => {
    if (item.requiresPaidPlan && user?.plan === 'FREE') {
      alert(`La integración con ${item.name} requiere un plan STARTER o superior.`);
      return;
    }

    if (item.channel === 'whatsapp') {
      window.location.hash = '#/whatsapp';
      return;
    }

    if (item.status === 'sesion_expirada' || item.status === 'no_conectado') {
      showToast(`Conectando con ${item.name}...`, 'info');
      await integrationService.updateStatus(item.id, 'conectado');
      await loadIntegrations();
      showToast(`¡${item.name} conectado con éxito!`, 'success');
    } else {
      setActiveModalChannel(item.name);
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 max-w-5xl mx-auto pt-2 pb-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">Canales e Integraciones</h1>
        <p className="text-xs sm:text-sm text-secondary mt-0.5">
          Conecta tus proveedores de mensajería para disparar campañas y centralizar respuestas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((item) => {
          const isConnected = item.status === 'conectado';
          const isExpired = item.status === 'sesion_expirada';
          const isLocked = item.requiresPaidPlan && user?.plan === 'FREE';

          return (
            <div
              key={item.id}
              className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-xs flex flex-col justify-between gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      item.channel === 'whatsapp'
                        ? 'bg-emerald-100 text-emerald-700'
                        : item.channel === 'gmail'
                        ? 'bg-surface-container-high text-on-surface'
                        : item.channel === 'instagram'
                        ? 'bg-pink-100 text-pink-700'
                        : 'bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    <Icon
                      name={
                        item.channel === 'whatsapp'
                          ? 'chat'
                          : item.channel === 'gmail'
                          ? 'mail'
                          : item.channel === 'instagram'
                          ? 'photo_camera'
                          : 'grid_on'
                      }
                      size={24}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-on-surface flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {isLocked && (
                        <span className="text-[10px] bg-surface-container px-2 py-0.5 rounded text-secondary font-semibold">
                          🔒 Plan Pago
                        </span>
                      )}
                    </h3>
                    <span className="text-xs text-secondary font-medium">{item.provider}</span>
                    <p className="text-xs text-on-surface font-mono mt-1">{item.identifier}</p>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
                    isConnected
                      ? 'bg-secondary-container text-on-secondary-fixed'
                      : isExpired
                      ? 'bg-error-container text-error'
                      : 'bg-surface-container text-secondary'
                  }`}
                >
                  {item.statusLabel}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-surface-container-low text-xs text-secondary">
                <span>{item.lastSync}</span>

                <div className="flex items-center gap-2">
                  {item.channel === 'whatsapp' ? (
                    <NavLink
                      to="/whatsapp"
                      className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-semibold text-xs hover:bg-primary-container shadow-xs"
                    >
                      Consola WhatsApp
                    </NavLink>
                  ) : (
                    <button
                      onClick={() => handleAction(item)}
                      className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                        isExpired
                          ? 'bg-error text-on-error hover:bg-red-700'
                          : isConnected
                          ? 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                          : 'bg-primary text-on-primary hover:bg-primary-container'
                      }`}
                    >
                      {isExpired ? 'Reconectar' : isConnected ? 'Configuración' : 'Conectar'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={!!activeModalChannel}
        onClose={() => setActiveModalChannel(null)}
        title={`Configuración de ${activeModalChannel}`}
        subtitle="Ajustes de servidor y parámetros de API"
      >
        <div className="flex flex-col gap-3">
          <p className="text-xs text-secondary">
            Esta instancia se encuentra operativa y vinculada con el protocolo de mensajería empresarial. Los eventos de webhook están recibiendo callbacks de entrega y lectura correctamente.
          </p>
          <div className="p-3 bg-surface-container-low rounded-lg text-xs font-mono text-secondary">
            Status: HTTP 200 OK · Webhook active
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveModalChannel(null)}
              className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-lg"
            >
              Entendido
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
