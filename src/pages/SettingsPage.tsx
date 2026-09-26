import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/ui/Icon';

export const SettingsPage: React.FC = () => {
  const { user, logout, showToast } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || 'Carlos Ramírez');
  const [email] = useState(user?.email || 'framirezgaston@franjaautomations.com');
  const [accountType, setAccountType] = useState(user?.accountType || 'empresa');
  const [companyName, setCompanyName] = useState(user?.companyName || 'Acero Tech S.A.');
  const [taxId, setTaxId] = useState(user?.taxId || '30-71234567-9');
  const [timezone, setTimezone] = useState(user?.timezone || 'America/Argentina/Buenos_Aires');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Preferencias guardadas exitosamente', 'success');
  };

  const handleLogout = async () => {
    if (window.confirm('¿Deseas cerrar tu sesión actual?')) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-12 max-w-3xl mx-auto pt-2">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">Configuración</h1>
        <p className="text-xs sm:text-sm text-secondary mt-0.5">
          Administra la información de tu perfil, datos fiscales de tu empresa y preferencias de cuenta.
        </p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Perfil */}
        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-surface-container/60 shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-surface-container-low">
            <Icon name="person" size={20} className="text-primary" />
            <h2 className="text-base font-bold text-on-surface">Perfil de Usuario</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface">Nombre y Apellido</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface">Correo electrónico</label>
              <input
                type="email"
                disabled
                value={email}
                className="h-10 px-3 rounded-lg bg-surface-container-low/60 text-xs text-secondary border border-outline-variant/20 outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface">Tipo de Cuenta</label>
            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-on-surface">
                <input
                  type="radio"
                  name="accType"
                  checked={accountType === 'personal'}
                  onChange={() => setAccountType('personal')}
                  className="w-4 h-4 text-primary"
                />
                <span>Personal</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-on-surface">
                <input
                  type="radio"
                  name="accType"
                  checked={accountType === 'empresa'}
                  onChange={() => setAccountType('empresa')}
                  className="w-4 h-4 text-primary"
                />
                <span>Empresa / Corporativo</span>
              </label>
            </div>
          </div>
        </div>

        {/* Empresa */}
        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-surface-container/60 shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-surface-container-low">
            <Icon name="business" size={20} className="text-primary" />
            <h2 className="text-base font-bold text-on-surface">Datos de la Empresa</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface">Razón Social</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface">Identificación Fiscal / CUIT / RUT</label>
              <input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Preferencias */}
        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-surface-container/60 shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-surface-container-low">
            <Icon name="tune" size={20} className="text-primary" />
            <h2 className="text-base font-bold text-on-surface">Preferencias de Región</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface">Zona horaria predeterminada</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none"
              >
                <option value="America/Argentina/Buenos_Aires">America/Argentina/Buenos_Aires (GMT-3)</option>
                <option value="America/Lima">America/Lima (GMT-5)</option>
                <option value="America/Bogota">America/Bogota (GMT-5)</option>
                <option value="America/Santiago">America/Santiago (GMT-4)</option>
                <option value="America/Mexico_City">America/Mexico_City (GMT-6)</option>
                <option value="Europe/Madrid">Europe/Madrid (GMT+1)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface">Idioma de la Interfaz</label>
              <select
                defaultValue="es"
                className="h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 outline-none"
              >
                <option value="es">Español (Latinoamérica)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cuenta y Plan */}
        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-surface-container/60 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
            <div className="flex items-center gap-2.5">
              <Icon name="verified_user" size={20} className="text-primary" />
              <h2 className="text-base font-bold text-on-surface">Estado de la Cuenta</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              Activa
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl">
            <div className="flex flex-col">
              <span className="text-xs text-secondary">Plan contratado</span>
              <span className="text-sm font-bold text-on-surface">{user?.plan || 'PRO'}</span>
            </div>
            <NavLink
              to="/billing"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Gestionar suscripción</span>
              <Icon name="arrow_forward" size={14} />
            </NavLink>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 h-10 rounded-lg bg-error-container text-error text-xs font-semibold hover:bg-red-100 transition-colors flex items-center gap-1.5"
            >
              <Icon name="logout" size={16} />
              <span>Cerrar sesión</span>
            </button>

            <button
              type="submit"
              className="px-6 h-10 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs active:scale-98"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
