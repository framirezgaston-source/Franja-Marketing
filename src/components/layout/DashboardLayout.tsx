import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../ui/BrandLogo';
import { Icon } from '../ui/Icon';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, drawerOpen, setDrawerOpen } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: 'space_dashboard' },
    {
      label: 'Campañas',
      path: '/campaigns',
      icon: 'campaign',
      subLinks: [
        { label: 'Todas', path: '/campaigns?status=todas' },
        { label: 'Programadas', path: '/campaigns?status=programadas' },
        { label: 'Enviando', path: '/campaigns?status=enviando' },
        { label: 'Historial', path: '/campaigns?status=historial' }
      ]
    },
    { label: 'Contactos', path: '/contacts', icon: 'group' },
    { label: 'Integraciones', path: '/integrations', icon: 'hub' },
    { label: 'WhatsApp', path: '/whatsapp', icon: 'chat' },
    { label: 'Plan y facturación', path: '/billing', icon: 'credit_card' },
    { label: 'Configuración', path: '/settings', icon: 'settings' }
  ];

  const bottomTabs = [
    { label: 'Dashboard', path: '/dashboard', icon: 'space_dashboard' },
    { label: 'Campañas', path: '/campaigns', icon: 'campaign' },
    { label: 'Contactos', path: '/contacts', icon: 'group' },
    { label: 'Canales', path: '/integrations', icon: 'hub' },
    { label: 'Plan', path: '/billing', icon: 'credit_card' }
  ];

  const planCreditsPercent = user
    ? Math.min(100, Math.round((user.creditsUsed / Math.max(1, user.creditsTotal)) * 100))
    : 64.8;

  return (
    <div className="bg-surface text-on-surface flex flex-col min-h-screen">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-40 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(11,28,48,0.05)] border-b border-surface-container-high/60">
        <div className="h-16 px-4 sm:px-6 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              aria-label="Abrir menú lateral"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
              onClick={() => setDrawerOpen(true)}
            >
              <Icon name="menu" size={24} />
            </button>

            {/* Brand Logo */}
            <NavLink to="/dashboard" className="flex items-center gap-2">
              <BrandLogo />
            </NavLink>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Create CTA in header on desktop */}
            <button
              onClick={() => navigate('/campaigns/new')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs transition-all active:scale-98"
            >
              <Icon name="add_circle" size={17} />
              <span>Nueva campaña</span>
            </button>

            {/* Notifications */}
            <button
              aria-label="Notificaciones"
              onClick={() => alert('No tienes notificaciones pendientes')}
              className="w-10 h-10 relative flex items-center justify-center rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            >
              <Icon name="notifications" size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
            </button>

            {/* Profile Avatar / Link to Settings */}
            <NavLink
              to="/settings"
              aria-label="Mi Perfil"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs hover:ring-2 hover:ring-primary-fixed transition-all"
            >
              <Icon name="person" size={18} />
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main Container with Desktop Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pt-16">
        {/* Desktop Fixed Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-surface-container-high/60 min-h-[calc(100vh-4rem)] p-4 justify-between bg-surface-container-lowest sticky top-16">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/dashboard' && location.pathname.startsWith(link.path));
              return (
                <div key={link.label} className="flex flex-col">
                  <NavLink
                    to={link.path}
                    className={`flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-fixed text-on-primary-fixed-variant font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                    }`}
                  >
                    <Icon name={link.icon} size={20} className={isActive ? 'text-primary' : 'text-on-surface-variant'} />
                    <span>{link.label}</span>
                  </NavLink>

                  {/* Sublinks if available and active */}
                  {link.subLinks && isActive && (
                    <div className="pl-9 flex flex-col gap-1 py-1">
                      {link.subLinks.map((sub) => (
                        <NavLink
                          key={sub.label}
                          to={sub.path}
                          className="py-1 px-2 text-xs text-on-surface-variant hover:text-primary rounded transition-colors"
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Plan & Credits Widget in Sidebar */}
          <div className="p-3.5 bg-surface-container-low rounded-xl flex flex-col gap-2 border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Plan Activo</span>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[11px] font-bold">
                {user?.plan || 'PRO'} ${user?.plan === 'BUSINESS' ? 79 : user?.plan === 'STARTER' ? 15 : user?.plan === 'FREE' ? 0 : 29}/mes
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-on-surface-variant">
              <span>Créditos</span>
              <span className="font-semibold text-on-surface">
                {(user?.creditsUsed || 3240).toLocaleString()} / {(user?.creditsTotal || 5000).toLocaleString()}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${planCreditsPercent}%` }} />
            </div>
            <NavLink
              to="/billing"
              className="w-full h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary text-xs font-semibold transition-colors hover:bg-primary-container mt-1"
            >
              Actualizar plan
            </NavLink>
          </div>
        </aside>

        {/* Mobile Slide-Out Drawer (Exact Stitch layout) */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-in-out ${
            drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-300 ${
              drawerOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer content */}
          <div
            className={`relative w-[310px] max-w-[85vw] h-full bg-surface-container-lowest flex flex-col justify-between shadow-[0_12px_32px_-4px_rgba(11,25,44,0.18)] z-10 pt-safe pb-safe transition-transform duration-300 ${
              drawerOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex flex-col overflow-y-auto px-4 py-4">
              <div className="flex items-center justify-between pb-4 border-b border-surface-container-low">
                <BrandLogo />
                <button
                  aria-label="Cerrar menú lateral"
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low"
                  onClick={() => setDrawerOpen(false)}
                >
                  <Icon name="close" size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-1 mt-3">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path || (link.path !== '/dashboard' && location.pathname.startsWith(link.path));
                  return (
                    <div key={link.label} className="flex flex-col">
                      <NavLink
                        to={link.path}
                        onClick={() => setDrawerOpen(false)}
                        className={`flex items-center gap-3 px-3 h-12 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'bg-primary-fixed text-on-primary-fixed-variant font-semibold'
                            : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                        }`}
                      >
                        <Icon name={link.icon} size={22} className={isActive ? 'text-primary' : 'text-on-surface-variant'} />
                        <span className="font-medium">{link.label}</span>
                      </NavLink>

                      {link.subLinks && isActive && (
                        <div className="pl-12 flex flex-col gap-1 pb-1">
                          {link.subLinks.map((sub) => (
                            <NavLink
                              key={sub.label}
                              to={sub.path}
                              onClick={() => setDrawerOpen(false)}
                              className="py-1 text-xs text-on-surface-variant hover:text-primary font-medium"
                            >
                              {sub.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Plan Card in Mobile Drawer */}
            <div className="p-4 bg-surface-container-low rounded-xl mx-4 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold uppercase text-secondary">Plan Activo</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[11px] font-semibold">
                  {user?.plan || 'PRO'} ${user?.plan === 'BUSINESS' ? 79 : user?.plan === 'STARTER' ? 15 : user?.plan === 'FREE' ? 0 : 29}/mes
                </span>
              </div>
              <div className="flex justify-between items-center my-1 text-xs">
                <span className="text-on-surface-variant">Créditos</span>
                <span className="text-on-surface font-semibold">
                  {(user?.creditsUsed || 3240).toLocaleString()} / {(user?.creditsTotal || 5000).toLocaleString()}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden mb-3">
                <div className="h-full bg-primary rounded-full" style={{ width: `${planCreditsPercent}%` }} />
              </div>
              <NavLink
                to="/billing"
                onClick={() => setDrawerOpen(false)}
                className="w-full h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary text-sm font-semibold transition-colors hover:bg-primary-container"
              >
                Actualizar plan
              </NavLink>
            </div>
          </div>
        </div>

        {/* Content Viewport */}
        <main className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-12 px-4 sm:px-6">
          {children}
        </main>
      </div>

      {/* Fixed Bottom Tab Bar for Mobile (Exact Stitch implementation) */}
      <nav className="lg:hidden fixed bottom-0 w-full z-40 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(11,28,48,0.06)] border-t border-surface-container-high/60">
        <div className="flex justify-around items-center h-16 px-1">
          {bottomTabs.map((tab) => {
            const isActive = location.pathname === tab.path || (tab.path !== '/dashboard' && location.pathname.startsWith(tab.path));
            return (
              <NavLink
                key={tab.label}
                to={tab.path}
                className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-12 transition-colors ${
                  isActive ? 'text-primary font-semibold' : 'text-on-surface-variant'
                }`}
              >
                <Icon name={tab.icon} size={22} className={isActive ? 'text-primary' : 'text-secondary'} />
                <span className="text-[11px] leading-tight">{tab.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
