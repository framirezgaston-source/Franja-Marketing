import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/ui/BrandLogo';
import { Icon } from '../components/ui/Icon';
import { useApp } from '../context/AppContext';

export const RegisterPage: React.FC = () => {
  const { register } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    setIsLoading(true);
    try {
      await register(name, email);
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
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
            Crea tu cuenta gratis
          </h1>
          <p className="text-xs sm:text-sm text-secondary">
            Obtén 15 envíos de por vida sin necesidad de tarjeta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface">Nombre y Apellido</label>
            <div className="flex items-center gap-2 bg-surface-container-low px-3 rounded-lg border border-outline-variant/40 focus-within:border-primary">
              <Icon name="person" size={18} className="text-secondary" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Carlos Ramírez"
                className="w-full h-10 bg-transparent text-xs text-on-surface outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface">Correo electrónico laboral</label>
            <div className="flex items-center gap-2 bg-surface-container-low px-3 rounded-lg border border-outline-variant/40 focus-within:border-primary">
              <Icon name="mail" size={18} className="text-secondary" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="carlos@tuempresa.com"
                className="w-full h-10 bg-transparent text-xs text-on-surface outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface">Contraseña</label>
            <div className="flex items-center gap-2 bg-surface-container-low px-3 rounded-lg border border-outline-variant/40 focus-within:border-primary">
              <Icon name="lock" size={18} className="text-secondary" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="w-full h-10 bg-transparent text-xs text-on-surface outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface">Confirmar contraseña</label>
            <div className="flex items-center gap-2 bg-surface-container-low px-3 rounded-lg border border-outline-variant/40 focus-within:border-primary">
              <Icon name="lock_reset" size={18} className="text-secondary" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                className="w-full h-10 bg-transparent text-xs text-on-surface outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 mt-2 rounded-lg bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container shadow-xs transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Icon name="progress_activity" size={18} className="animate-spin" />
            ) : (
              <span>Crear cuenta gratis</span>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-secondary">
          ¿Ya tienes cuenta?{' '}
          <NavLink to="/login" className="text-primary font-semibold hover:underline">
            Iniciar sesión
          </NavLink>
        </p>
      </div>
    </div>
  );
};
