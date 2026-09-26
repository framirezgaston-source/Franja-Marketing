import React, { useState } from 'react';
import { Icon } from '../components/ui/Icon';
import { useApp } from '../context/AppContext';
import { TestSendModal } from '../components/campaigns/TestSendModal';

export const WhatsAppPage: React.FC = () => {
  const { showToast } = useApp();
  const [isConnected, setIsConnected] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  const handleDisconnect = () => {
    if (window.confirm('¿Deseas desconectar la instancia de WhatsApp Business? Las campañas en curso se detendrán.')) {
      setIsConnected(false);
      showToast('Instancia de WhatsApp desconectada', 'info');
    }
  };

  const handleConnectSimulated = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsConnected(true);
      showToast('¡WhatsApp vinculado exitosamente mediante código QR!', 'success');
    }, 1800);
  };

  return (
    <div className="flex flex-col w-full gap-5 max-w-4xl mx-auto pt-2 pb-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">Consola de WhatsApp</h1>
        <p className="text-xs sm:text-sm text-secondary mt-0.5">
          Gestiona la instancia de Evolution API / WhatsApp Cloud API y el estado de la sesión.
        </p>
      </div>

      {/* Main Connection Status Card */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-low">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-surface-container text-secondary'
            }`}>
              <Icon name="chat" size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-on-surface">Instancia Evolution API</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isConnected ? 'bg-secondary-container text-on-secondary-fixed' : 'bg-error-container text-error'
                }`}>
                  {isConnected ? 'Activo' : 'Desconectado'}
                </span>
              </div>
              <p className="text-xs text-secondary mt-0.5 font-mono">
                {isConnected ? '+54 9 11 4567-8901' : 'Sin número vinculado'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <button
                  onClick={() => setIsTestModalOpen(true)}
                  className="px-3.5 h-10 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high flex items-center gap-1.5 transition-colors"
                >
                  <Icon name="send" size={16} className="text-primary" />
                  <span>Enviar prueba</span>
                </button>
                <button
                  onClick={handleDisconnect}
                  className="px-3.5 h-10 rounded-lg bg-error-container text-error text-xs font-semibold hover:bg-red-100 flex items-center gap-1.5 transition-colors"
                >
                  <Icon name="power_settings_new" size={16} />
                  <span>Desconectar</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleConnectSimulated}
                disabled={isScanning}
                className="px-4 h-10 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container flex items-center gap-1.5 shadow-xs"
              >
                <Icon name="qr_code_scanner" size={16} />
                <span>{isScanning ? 'Sincronizando...' : 'Escanear QR'}</span>
              </button>
            )}
          </div>
        </div>

        {/* QR Code Section if disconnected */}
        {!isConnected ? (
          <div className="flex flex-col items-center text-center p-6 bg-surface-container-low rounded-xl border border-surface-container gap-4">
            <h4 className="font-bold text-sm text-on-surface">Vincula tu teléfono con el código QR</h4>
            <p className="text-xs text-secondary max-w-sm">
              Abre WhatsApp en tu teléfono, ve a Dispositivos vinculados y escanea el código para autorizar la instancia de envíos.
            </p>

            {/* Simulated Visual QR */}
            <div className="relative p-4 bg-white rounded-xl shadow-md border border-neutral-200">
              <svg className="w-48 h-48" viewBox="0 0 100 100" fill="currentColor">
                {/* Simulated QR Code matrix */}
                <rect x="5" y="5" width="25" height="25" rx="3" fill="#0b1c30" />
                <rect x="10" y="10" width="15" height="15" rx="2" fill="#ffffff" />
                <rect x="13" y="13" width="9" height="9" fill="#0051bb" />

                <rect x="70" y="5" width="25" height="25" rx="3" fill="#0b1c30" />
                <rect x="75" y="10" width="15" height="15" rx="2" fill="#ffffff" />
                <rect x="78" y="13" width="9" height="9" fill="#0051bb" />

                <rect x="5" y="70" width="25" height="25" rx="3" fill="#0b1c30" />
                <rect x="10" y="75" width="15" height="15" rx="2" fill="#ffffff" />
                <rect x="13" y="78" width="9" height="9" fill="#0051bb" />

                {/* Random Matrix cells */}
                <rect x="35" y="10" width="6" height="6" fill="#0b1c30" />
                <rect x="45" y="15" width="8" height="6" fill="#0b1c30" />
                <rect x="58" y="8" width="6" height="6" fill="#0b1c30" />
                <rect x="35" y="25" width="12" height="6" fill="#0b1c30" />
                <rect x="52" y="22" width="6" height="8" fill="#0b1c30" />

                <rect x="10" y="38" width="8" height="8" fill="#0b1c30" />
                <rect x="25" y="42" width="6" height="6" fill="#0b1c30" />
                <rect x="38" y="38" width="16" height="16" rx="2" fill="#0051bb" />
                <rect x="60" y="42" width="8" height="6" fill="#0b1c30" />
                <rect x="75" y="36" width="6" height="12" fill="#0b1c30" />

                <rect x="36" y="65" width="8" height="6" fill="#0b1c30" />
                <rect x="50" y="60" width="12" height="6" fill="#0b1c30" />
                <rect x="68" y="72" width="8" height="8" fill="#0b1c30" />
                <rect x="80" y="64" width="6" height="14" fill="#0b1c30" />
                <rect x="42" y="80" width="16" height="6" fill="#0b1c30" />
                <rect x="65" y="85" width="8" height="6" fill="#0b1c30" />
              </svg>

              {isScanning && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2">
                  <Icon name="progress_activity" size={32} className="animate-spin text-primary" />
                  <span className="text-xs font-bold text-on-surface">Validando handshake...</span>
                </div>
              )}
            </div>

            <button
              onClick={handleConnectSimulated}
              disabled={isScanning}
              className="px-5 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs active:scale-98"
            >
              Simular escaneo de QR
            </button>
          </div>
        ) : (
          /* Instance Metrics & Telemetry */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col">
              <span className="text-xs text-secondary font-medium">Batería del Teléfono</span>
              <span className="text-lg font-bold text-on-surface mt-1 flex items-center gap-1.5">
                <Icon name="battery_charging_full" size={20} className="text-emerald-600" />
                <span>100% Conectado</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col">
              <span className="text-xs text-secondary font-medium">Cadencia Activa</span>
              <span className="text-lg font-bold text-on-surface mt-1 flex items-center gap-1.5">
                <Icon name="speed" size={20} className="text-primary" />
                <span>~45 msg/min</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col">
              <span className="text-xs text-secondary font-medium">Protección Antispam</span>
              <span className="text-lg font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                <Icon name="verified_user" size={20} />
                <span>Certificado Meta</span>
              </span>
            </div>
          </div>
        )}
      </div>

      <TestSendModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        messageText="Hola Carlos 👋, comprobación de canal WhatsApp Business OK."
        channelName="WhatsApp"
      />
    </div>
  );
};
