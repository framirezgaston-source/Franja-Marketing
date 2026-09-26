import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/ui/BrandLogo';
import { Icon } from '../components/ui/Icon';
import { useApp } from '../context/AppContext';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Selections
  const [accountType, setAccountType] = useState<'persona' | 'empresa'>('empresa');
  const [firstChannel, setFirstChannel] = useState<'whatsapp' | 'gmail' | 'instagram'>('whatsapp');
  const [importSource, setImportSource] = useState<'excel' | 'csv' | 'sheets' | 'api'>('excel');

  const handleFinish = () => {
    showToast('¡Configuración inicial completada! 15 envíos de prueba disponibles.', 'success');
    navigate('/campaigns/new');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container p-6 sm:p-8 flex flex-col gap-6">
        {/* Header with Steps */}
        <div className="flex items-center justify-between border-b border-surface-container-low pb-4">
          <BrandLogo size="md" />
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? 'bg-primary text-on-primary ring-2 ring-primary-fixed'
                    : step > s
                    ? 'bg-emerald-600 text-white'
                    : 'bg-surface-container text-secondary'
                }`}
              >
                {step > s ? '✓' : s}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Account Type */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Paso 1 de 3</span>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface mt-1">
                ¿Cómo utilizarás Franja Marketing?
              </h2>
              <p className="text-xs sm:text-sm text-secondary mt-1">
                Personalizaremos tu experiencia según tu modelo de trabajo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAccountType('persona')}
                className={`p-5 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                  accountType === 'persona'
                    ? 'border-primary bg-primary-fixed/20 shadow-xs'
                    : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs">
                  <Icon name="person" size={24} />
                </div>
                <h4 className="font-bold text-sm text-on-surface">Soy una persona</h4>
                <p className="text-xs text-secondary leading-snug">
                  Profesional independiente, consultor o creador que gestiona su propia cartera de clientes.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('empresa')}
                className={`p-5 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                  accountType === 'empresa'
                    ? 'border-primary bg-primary-fixed/20 shadow-xs'
                    : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs">
                  <Icon name="domain" size={24} />
                </div>
                <h4 className="font-bold text-sm text-on-surface">Represento una empresa</h4>
                <p className="text-xs text-secondary leading-snug">
                  Equipo comercial, agencia o pyme con alto volumen de prospectos y necesidad de múltiples remitentes.
                </p>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 h-11 rounded-lg bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-primary-container shadow-xs active:scale-98"
              >
                <span>Continuar</span>
                <Icon name="arrow_forward" size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Connect First Channel */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Paso 2 de 3</span>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface mt-1">
                Conecta tu primer canal
              </h2>
              <p className="text-xs sm:text-sm text-secondary mt-1">
                ¿A través de qué canal enviarás tus primeras comunicaciones?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFirstChannel('whatsapp')}
                className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                  firstChannel === 'whatsapp'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Icon name="chat" size={20} />
                </div>
                <h4 className="font-bold text-xs text-on-surface">WhatsApp Business</h4>
                <span className="text-[11px] text-emerald-700 font-semibold">Más popular</span>
              </button>

              <button
                type="button"
                onClick={() => setFirstChannel('gmail')}
                className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                  firstChannel === 'gmail'
                    ? 'border-primary bg-primary-fixed/20 shadow-xs'
                    : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center">
                  <Icon name="mail" size={20} />
                </div>
                <h4 className="font-bold text-xs text-on-surface">Gmail Corporativo</h4>
                <span className="text-[11px] text-secondary">Google Workspace</span>
              </button>

              <button
                type="button"
                onClick={() => setFirstChannel('instagram')}
                className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                  firstChannel === 'instagram'
                    ? 'border-pink-600 bg-pink-50/50 shadow-xs'
                    : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center">
                  <Icon name="photo_camera" size={20} />
                </div>
                <h4 className="font-bold text-xs text-on-surface">Instagram Direct</h4>
                <span className="text-[11px] text-secondary">Meta Graph API</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 h-11 rounded-lg text-xs font-semibold text-secondary hover:bg-surface-container-low"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 h-11 rounded-lg bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-primary-container shadow-xs active:scale-98"
              >
                <span>Continuar</span>
                <Icon name="arrow_forward" size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Source */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Paso 3 de 3</span>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface mt-1">
                Importa tus contactos
              </h2>
              <p className="text-xs sm:text-sm text-secondary mt-1">
                Selecciona la fuente de datos donde tienes almacenados tus prospectos.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'excel', label: 'Excel (.xlsx)', icon: 'table_view' },
                { id: 'csv', label: 'CSV (.csv)', icon: 'description' },
                { id: 'sheets', label: 'Google Sheets', icon: 'grid_on' },
                { id: 'api', label: 'Conexión API', icon: 'webhook' }
              ].map((src) => (
                <button
                  key={src.id}
                  type="button"
                  onClick={() => setImportSource(src.id as any)}
                  className={`p-3.5 rounded-xl border text-center flex flex-col items-center gap-2 transition-all ${
                    importSource === src.id
                      ? 'border-primary bg-primary-fixed/20 shadow-xs'
                      : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <Icon name={src.icon} size={24} className={importSource === src.id ? 'text-primary' : 'text-secondary'} />
                  <span className="font-semibold text-xs text-on-surface">{src.label}</span>
                </button>
              ))}
            </div>

            <div className="p-3.5 bg-surface-container-low rounded-xl border border-surface-container text-xs text-secondary leading-relaxed">
              💡 Podrás asociar las columnas de tu archivo (Nombre, Empresa, WhatsApp, etc.) en el asistente de creación de campaña.
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 h-11 rounded-lg text-xs font-semibold text-secondary hover:bg-surface-container-low"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 h-11 rounded-lg bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-primary-container shadow-xs active:scale-98"
              >
                <span>Finalizar configuración</span>
                <Icon name="check" size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Finished! */}
        {step === 4 && (
          <div className="flex flex-col items-center text-center gap-5 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs animate-bounce">
              <Icon name="celebration" size={32} />
            </div>

            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                ¡Tu cuenta está lista!
              </h2>
              <p className="text-xs sm:text-sm text-secondary max-w-sm">
                Has configurado tu perfil de {accountType === 'empresa' ? 'Empresa' : 'Persona'} con canal {firstChannel.toUpperCase()} e importación vía {importSource.toUpperCase()}.
              </p>
              <span className="mt-2 inline-block px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold">
                15 envíos gratuitos acreditados en tu cuenta
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full pt-4">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full sm:flex-1 h-12 rounded-xl bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:bg-primary-container transition-all active:scale-98"
              >
                <Icon name="add_circle" size={20} />
                <span>Crear mi primera campaña</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto px-5 h-12 rounded-xl bg-surface-container-low text-secondary hover:text-on-surface text-xs font-semibold"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
