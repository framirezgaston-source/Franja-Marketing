import React, { useState } from 'react';
import { useSearchParams, useNavigate, NavLink } from 'react-router-dom';
import { BrandLogo } from '../components/ui/BrandLogo';
import { Icon } from '../components/ui/Icon';
import { useApp } from '../context/AppContext';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const email = searchParams.get('email') || 'carlos@miempresa.com';
  const [resending, setResending] = useState(false);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      showToast(`Nuevo correo de verificación enviado a ${email}`, 'info');
    }, 800);
  };

  const handleSimulateVerification = () => {
    showToast('¡Correo verificado con éxito!', 'success');
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container p-6 sm:p-8 flex flex-col items-center text-center gap-6">
        <BrandLogo size="lg" />

        <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-xs">
          <Icon name="mark_email_read" size={32} />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
            Verifica tu correo electrónico
          </h1>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            Hemos enviado un enlace de confirmación a:
          </p>
          <span className="font-semibold text-sm text-on-surface bg-surface-container-low py-1.5 px-3 rounded-lg border border-surface-container">
            {email}
          </span>
          <p className="text-xs text-secondary mt-1">
            Por favor, revisa tu bandeja de entrada o carpeta de spam y haz clic en el botón de confirmación.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 w-full pt-2">
          {/* Quick simulation button so users can easily test onboarding flow */}
          <button
            onClick={handleSimulateVerification}
            className="w-full h-11 rounded-lg bg-primary text-on-primary font-semibold text-xs sm:text-sm hover:bg-primary-container shadow-xs transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <Icon name="verified" size={18} />
            <span>Confirmar correo y continuar</span>
          </button>

          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full h-10 rounded-lg bg-surface-container-low text-secondary hover:bg-surface-container font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            {resending ? (
              <Icon name="progress_activity" size={16} className="animate-spin" />
            ) : (
              <Icon name="send" size={16} />
            )}
            <span>Reenviar correo</span>
          </button>
        </div>

        <NavLink to="/login" className="text-xs text-secondary hover:text-primary flex items-center gap-1 font-medium">
          <Icon name="arrow_back" size={16} />
          <span>Volver al inicio de sesión</span>
        </NavLink>
      </div>
    </div>
  );
};
