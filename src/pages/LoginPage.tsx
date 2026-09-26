import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/ui/BrandLogo';
import { Icon } from '../components/ui/Icon';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('framirezgaston@franjaautomations.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await login('google.user@empresa.com', 'google_auth_token');
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-2">
          <BrandLogo size="lg" />
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight mt-2">
            Iniciar sesión en Franja
          </h1>
          <p className="text-xs sm:text-sm text-secondary">
            Gestiona tus campañas comerciales y automatizaciones
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-on-surface">Correo electrónico</label>
            <div className="flex items-center gap-2 bg-surface-container-low px-3 rounded-lg border border-outline-variant/40 focus-within:border-primary">
              <Icon name="mail" size={18} className="text-secondary" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className="w-full h-11 bg-transparent text-xs text-on-surface outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-on-surface">Contraseña</label>
              <button
                type="button"
                onClick={() => alert('Te enviamos un enlace de recuperación a tu correo')}
                className="text-xs text-primary hover:underline font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-3 rounded-lg border border-outline-variant/40 focus-within:border-primary">
              <Icon name="lock" size={18} className="text-secondary" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 bg-transparent text-xs text-on-surface outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 mt-1 rounded-lg bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container shadow-xs transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Icon name="progress_activity" size={18} className="animate-spin" />
            ) : (
              <span>Iniciar sesión</span>
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-surface-container-high" />
          <span className="absolute bg-surface-container-lowest px-3 text-[11px] text-secondary uppercase font-semibold">
            o continúa con
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full h-11 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors border border-outline-variant/30"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continuar con Google</span>
        </button>

        <p className="text-center text-xs text-secondary">
          ¿Aún no tienes cuenta?{' '}
          <NavLink to="/register" className="text-primary font-semibold hover:underline">
            Crear cuenta gratis
          </NavLink>
        </p>
      </div>
    </div>
  );
};
