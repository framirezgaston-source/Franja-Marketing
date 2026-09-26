import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BrandLogo } from '../components/ui/BrandLogo';
import { Icon } from '../components/ui/Icon';

export const LandingPage: React.FC = () => {
  const [activeCustomerIndex, setActiveCustomerIndex] = useState(0);

  const sampleCustomers = [
    { name: 'Carlos', company: 'Acero Tech', discount: '25% OFF', product: 'Plan Anual' },
    { name: 'María', company: 'Distribuidora del Sur', discount: '30% OFF', product: 'Pack Mayorista' },
    { name: 'Juan', company: 'Logística Latina', discount: '15% OFF', product: 'Módulo Flotas' }
  ];

  const currentCustomer = sampleCustomers[activeCustomerIndex];

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-sans selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/60">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          <BrandLogo size="md" />

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-secondary">
            <a href="#problema" className="hover:text-primary transition-colors">Problema</a>
            <a href="#solucion" className="hover:text-primary transition-colors">Solución</a>
            <a href="#como-funciona" className="hover:text-primary transition-colors">Cómo funciona</a>
            <a href="#canales" className="hover:text-primary transition-colors">Canales</a>
            <a href="#planes" className="hover:text-primary transition-colors">Planes</a>
          </nav>

          <div className="flex items-center gap-3">
            <NavLink
              to="/login"
              className="text-xs sm:text-sm font-semibold text-secondary hover:text-primary px-3 py-1.5 transition-colors"
            >
              Iniciar sesión
            </NavLink>
            <NavLink
              to="/register"
              className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs sm:text-sm font-semibold hover:bg-primary-container shadow-xs transition-all active:scale-98"
            >
              Comenzar gratis
            </NavLink>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-surface-container-high/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-semibold mb-6 shadow-xs animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>15 envíos gratis · No requiere tarjeta de crédito</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight leading-tight max-w-4xl">
            Automatiza tus campañas comerciales y llega a{' '}
            <span className="text-primary bg-gradient-to-r from-primary via-primary-container to-tertiary bg-clip-text text-transparent">
              miles de clientes
            </span>{' '}
            automáticamente.
          </h1>

          <p className="mt-5 text-base sm:text-xl text-secondary max-w-2xl leading-relaxed">
            Crea campañas personalizadas en WhatsApp, Gmail e Instagram, importa tus contactos y automatiza tus envíos desde una sola plataforma.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <NavLink
              to="/register"
              className="w-full sm:w-auto px-7 h-12 rounded-xl bg-primary text-on-primary font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(0,81,187,0.35)] hover:bg-primary-container transition-all active:scale-98"
            >
              <Icon name="rocket_launch" size={20} />
              <span>Comenzar gratis</span>
            </NavLink>
            <a
              href="#como-funciona"
              className="w-full sm:w-auto px-6 h-12 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors border border-outline-variant/30"
            >
              <Icon name="play_circle" size={20} className="text-primary" />
              <span>Ver cómo funciona</span>
            </a>
          </div>

          {/* Quick Metrics Bar in Hero */}
          <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="text-xs text-secondary font-medium">Tasa de Entrega</span>
              <p className="text-xl sm:text-2xl font-bold text-on-surface mt-0.5">97.3%</p>
              <span className="text-[11px] text-emerald-600 font-semibold">Evolution API Oficial</span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="text-xs text-secondary font-medium">Cadencia Antispam</span>
              <p className="text-xl sm:text-2xl font-bold text-on-surface mt-0.5">~45 msg/min</p>
              <span className="text-[11px] text-primary font-semibold">Seguro contra bloqueos</span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="text-xs text-secondary font-medium">Canales Nativos</span>
              <p className="text-xl sm:text-2xl font-bold text-on-surface mt-0.5">3 en 1</p>
              <span className="text-[11px] text-secondary">WhatsApp, Gmail, IG</span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="text-xs text-secondary font-medium">Redacción IA</span>
              <p className="text-xl sm:text-2xl font-bold text-on-surface mt-0.5">Contextual</p>
              <span className="text-[11px] text-tertiary-container font-semibold">Plantillas aprobadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Problema */}
      <section id="problema" className="py-16 bg-surface-container-lowest border-b border-surface-container-high/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-error">El Desafío Actual</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-1">
              ¿Sigues perdiendo horas enviando mensajes uno por uno?
            </h2>
            <p className="text-sm sm:text-base text-secondary mt-2">
              Los métodos tradicionales de prospección y seguimiento saturan a tu equipo y provocan errores costosos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-surface border border-outline-variant/30 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-lg bg-error-container text-error flex items-center justify-center">
                <Icon name="timer_off" size={20} />
              </div>
              <h3 className="font-semibold text-base text-on-surface">Envíos manuales y lentos</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Copiar y pegar mensajes cientos de veces al día es agotador y propenso a equivocaciones de nombres.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-outline-variant/30 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-lg bg-error-container text-error flex items-center justify-center">
                <Icon name="folder_off" size={20} />
              </div>
              <h3 className="font-semibold text-base text-on-surface">Contactos desorganizados</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Listas dispersas en archivos de Excel, notas de WhatsApp y bandejas de entrada sin sincronización.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-outline-variant/30 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-lg bg-error-container text-error flex items-center justify-center">
                <Icon name="speaker_notes_off" size={20} />
              </div>
              <h3 className="font-semibold text-base text-on-surface">Mensajes genéricos sin impacto</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Mensajes masivos sin variables dinámicas que terminan archivados o reportados como spam.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-outline-variant/30 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-lg bg-error-container text-error flex items-center justify-center">
                <Icon name="hourglass_disabled" size={20} />
              </div>
              <h3 className="font-semibold text-base text-on-surface">Pérdida crítica de tiempo</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Horas comerciales no aprovechadas en cerrar ventas por ocuparse de la carga operativa.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-outline-variant/30 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-lg bg-error-container text-error flex items-center justify-center">
                <Icon name="query_stats" size={20} />
              </div>
              <h3 className="font-semibold text-base text-on-surface">Falta total de seguimiento</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Desconocer cuántos mensajes se entregaron, cuántos rebotaron o qué oferta convirtió más.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-outline-variant/30 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-lg bg-error-container text-error flex items-center justify-center">
                <Icon name="report_problem" size={20} />
              </div>
              <h3 className="font-semibold text-base text-on-surface">Riesgo de bloqueo de números</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Disparar envíos sin cadencia ni regulación anti-spam resulta en suspensiones inmediatas de Meta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Solución */}
      <section id="solucion" className="py-16 bg-surface border-b border-surface-container-high/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">La Solución Integral</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-1">
              Franja Marketing: Tu motor omnicanal de crecimiento comercial
            </h2>
            <p className="text-sm sm:text-base text-secondary mt-2">
              Un único panel que centraliza audiencias, personalización hiper-precisa y entregas automatizadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-container text-primary flex items-center justify-center mb-4">
                  <Icon name="hub" size={28} />
                </div>
                <h3 className="font-bold text-lg text-on-surface">Omnicanalidad Real</h3>
                <p className="text-xs sm:text-sm text-secondary mt-2 leading-relaxed">
                  Conecta tus canales oficiales de WhatsApp (Evolution API), Gmail Corporativo e Instagram Direct sin configuraciones complejas.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-surface-container-low flex items-center gap-2 text-xs font-semibold text-primary">
                <span>Multi-instancia segura</span>
                <Icon name="arrow_forward" size={16} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center mb-4">
                  <Icon name="data_object" size={28} />
                </div>
                <h3 className="font-bold text-lg text-on-surface">Variables Dinámicas</h3>
                <p className="text-xs sm:text-sm text-secondary mt-2 leading-relaxed">
                  Inyecta automáticamente nombre, empresa, descuentos específicos y datos de tus planillas directamente en cada mensaje individual.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-surface-container-low flex items-center gap-2 text-xs font-semibold text-primary">
                <span>100% Personalizado</span>
                <Icon name="arrow_forward" size={16} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center mb-4">
                  <Icon name="speed" size={28} />
                </div>
                <h3 className="font-bold text-lg text-on-surface">Cadencia Anti-Spam Inteligente</h3>
                <p className="text-xs sm:text-sm text-secondary mt-2 leading-relaxed">
                  Ritmo de salida de ~45 mensajes/minuto con intervalos variables para proteger tus líneas telefónicas y cuentas de reputación.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-surface-container-low flex items-center gap-2 text-xs font-semibold text-primary">
                <span>Certificado Meta</span>
                <Icon name="arrow_forward" size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Cómo Funciona (4 Pasos) */}
      <section id="como-funciona" className="py-16 bg-surface-container-lowest border-b border-surface-container-high/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Flujo Simple & Rápido</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-1">
              Cómo funciona en 4 sencillos pasos
            </h2>
            <p className="text-sm sm:text-base text-secondary mt-2">
              Lanza tu primera campaña en menos de 3 minutos sin fricciones técnicas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-surface border border-surface-container flex flex-col gap-3 relative">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-xs">
                1
              </div>
              <h3 className="font-semibold text-base text-on-surface">Importa tus contactos</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Carga tu archivo Excel (.xlsx), CSV o conecta directamente tu hoja de Google Sheets. El sistema mapea las columnas automáticamente.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-surface-container flex flex-col gap-3 relative">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-xs">
                2
              </div>
              <h3 className="font-semibold text-base text-on-surface">Crea tu campaña</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Asigna un nombre comercial y selecciona el canal de destino: WhatsApp Oficial, Gmail o Instagram Direct.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-surface-container flex flex-col gap-3 relative">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-xs">
                3
              </div>
              <h3 className="font-semibold text-base text-on-surface">Personaliza tu mensaje</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Escribe tu texto, añade variables dinámicas o utiliza el Asistente IA para optimizar el copy con vista previa en vivo.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-surface-container flex flex-col gap-3 relative">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-xs">
                4
              </div>
              <h3 className="font-semibold text-base text-on-surface">Programa y envía</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Elige envío inmediato o define fecha, hora y zona horaria. Monitorea los envíos y respuestas en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Personalización Interactiva */}
      <section className="py-16 bg-surface border-b border-surface-container-high/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Prueba la magia en vivo</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-1">
              Personalización dinámica real
            </h2>
            <p className="text-sm text-secondary mt-1">
              Observa cómo un único mensaje de plantilla se transforma para cada prospecto de tu base:
            </p>
          </div>

          {/* Interactive Switcher */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-xs font-semibold text-secondary mr-1">Simular contacto:</span>
            {sampleCustomers.map((cust, idx) => (
              <button
                key={cust.name}
                onClick={() => setActiveCustomerIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCustomerIndex === idx
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container text-secondary hover:bg-surface-container-high'
                }`}
              >
                {cust.name} ({cust.company})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Editor Template View */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-secondary">
                <span className="font-semibold text-on-surface flex items-center gap-1.5">
                  <Icon name="edit_note" size={18} className="text-primary" />
                  Editor de Plantilla
                </span>
                <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-medium">
                  Variables activas
                </span>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low font-mono text-xs leading-relaxed text-on-surface">
                Hola <span className="text-primary font-bold bg-primary-fixed px-1 rounded">&#123;&#123;Nombre&#125;&#125;</span> 👋, vimos que en{' '}
                <span className="text-primary font-bold bg-primary-fixed px-1 rounded">&#123;&#123;Empresa&#125;&#125;</span> están buscando optimizar sus envíos. Tenemos un{' '}
                <span className="text-primary font-bold bg-primary-fixed px-1 rounded">&#123;&#123;Descuento&#125;&#125;</span> especial en{' '}
                <span className="text-primary font-bold bg-primary-fixed px-1 rounded">&#123;&#123;Producto&#125;&#125;</span> exclusivo para ti hoy.
              </div>
            </div>

            {/* Resolved Chat Preview */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-secondary">
                <span className="font-semibold text-on-surface flex items-center gap-1.5">
                  <Icon name="visibility" size={18} className="text-emerald-600" />
                  Lo que recibe {currentCustomer.name}
                </span>
                <span className="text-emerald-700 font-medium">Enviado vía WhatsApp</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-xs leading-relaxed text-emerald-950 font-sans shadow-xs">
                Hola <strong className="text-emerald-900 font-bold">{currentCustomer.name}</strong> 👋, vimos que en{' '}
                <strong className="text-emerald-900 font-bold">{currentCustomer.company}</strong> están buscando optimizar sus envíos. Tenemos un{' '}
                <strong className="text-emerald-900 font-bold">{currentCustomer.discount}</strong> especial en{' '}
                <strong className="text-emerald-900 font-bold">{currentCustomer.product}</strong> exclusivo para ti hoy.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Canales */}
      <section id="canales" className="py-16 bg-surface-container-lowest border-b border-surface-container-high/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Conectividad Total</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-1">
              Conecta los canales donde están tus clientes
            </h2>
            <p className="text-sm sm:text-base text-secondary mt-2">
              Olvídate de alternar pestañas: gestiona WhatsApp, correo corporativo y mensajes directos desde una única bandeja central.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <div className="p-6 rounded-2xl bg-surface border border-surface-container flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Icon name="chat" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-on-surface">WhatsApp Business</h3>
                <span className="text-xs text-emerald-700 font-semibold">Evolution API / Cloud API</span>
                <p className="text-xs text-secondary mt-2 leading-relaxed">
                  Envío masivo con templates homologados, mensajes multimedia (imágenes, PDF, videos) y respuestas directas con tus agentes.
                </p>
              </div>
              <ul className="text-xs text-secondary space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5 text-on-surface">
                  <Icon name="check" size={16} className="text-emerald-600" />
                  <span>Soporte de números locales (+54, +51, etc.)</span>
                </li>
                <li className="flex items-center gap-1.5 text-on-surface">
                  <Icon name="check" size={16} className="text-emerald-600" />
                  <span>Cadencia anti-bloqueo preconfigurada</span>
                </li>
              </ul>
            </div>

            {/* Gmail */}
            <div className="p-6 rounded-2xl bg-surface border border-surface-container flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center">
                <Icon name="mail" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-on-surface">Gmail Corporativo</h3>
                <span className="text-xs text-primary font-semibold">Google Workspace OAuth</span>
                <p className="text-xs text-secondary mt-2 leading-relaxed">
                  Automatiza secuencias de correos con tu dominio propio (@tuempresa.com) logrando una alta entregabilidad en bandeja principal.
                </p>
              </div>
              <ul className="text-xs text-secondary space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5 text-on-surface">
                  <Icon name="check" size={16} className="text-primary" />
                  <span>Firma corporativa automática</span>
                </li>
                <li className="flex items-center gap-1.5 text-on-surface">
                  <Icon name="check" size={16} className="text-primary" />
                  <span>Seguimiento de apertura y clicks</span>
                </li>
              </ul>
            </div>

            {/* Instagram */}
            <div className="p-6 rounded-2xl bg-surface border border-surface-container flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
                <Icon name="photo_camera" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-on-surface">Instagram Direct</h3>
                <span className="text-xs text-pink-700 font-semibold">Meta Graph API</span>
                <p className="text-xs text-secondary mt-2 leading-relaxed">
                  Llega directo a la bandeja de DMs de tus seguidores y prospectos con promociones de historias y ofertas flash personalizadas.
                </p>
              </div>
              <ul className="text-xs text-secondary space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5 text-on-surface">
                  <Icon name="check" size={16} className="text-pink-600" />
                  <span>Ideal para ecommerce y retail</span>
                </li>
                <li className="flex items-center gap-1.5 text-on-surface">
                  <Icon name="check" size={16} className="text-pink-600" />
                  <span>Adjuntos gráficos instantáneos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sección IA */}
      <section className="py-16 bg-surface border-b border-surface-container-high/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-surface-container-lowest to-surface-container-low border border-primary-fixed shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-lg">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold w-fit">
                <Icon name="auto_awesome" size={16} />
                <span>Asistente Inteligente</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                Crea mensajes comerciales con IA
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Olvídate del bloqueo creativo. Especifica tu producto, tu audiencia y el gancho comercial para generar copys altamente persuasivos aprobados por las directrices de Meta.
              </p>
              <div className="flex items-center gap-2 text-xs text-secondary">
                <Icon name="info" size={16} className="text-primary" />
                <span>Disponible a partir del plan STARTER</span>
              </div>
            </div>

            <div className="shrink-0">
              <NavLink
                to="/register"
                className="px-6 h-12 rounded-xl bg-primary text-on-primary font-bold text-sm flex items-center gap-2 hover:bg-primary-container shadow-md transition-all active:scale-98"
              >
                <Icon name="auto_awesome" size={18} />
                <span>✨ Crear con IA</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section id="planes" className="py-16 bg-surface-container-lowest">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Planes Claros & Sin Sorpresas</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-1">
            Comienza gratis hoy mismo
          </h2>
          <p className="text-sm sm:text-base text-secondary mt-2 max-w-xl mx-auto">
            Disfruta de 15 envíos de por vida sin necesidad de tarjeta. Escala a Starter, Pro o Business cuando tu negocio lo demande.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="p-5 rounded-xl bg-surface border border-surface-container flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-secondary">Prueba Gratuita</span>
                <h4 className="text-xl font-bold text-on-surface mt-1">FREE</h4>
                <p className="text-2xl font-bold text-on-surface mt-2">$0 <span className="text-xs text-secondary font-normal">USD</span></p>
                <p className="text-xs text-secondary mt-2">15 envíos totales de por vida para probar la plataforma.</p>
              </div>
              <NavLink to="/register" className="mt-4 w-full h-9 flex items-center justify-center rounded-lg bg-surface-container text-primary font-semibold text-xs hover:bg-surface-container-high">
                Registrarse gratis
              </NavLink>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-surface-container flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-primary">Negocios</span>
                <h4 className="text-xl font-bold text-on-surface mt-1">STARTER</h4>
                <p className="text-2xl font-bold text-on-surface mt-2">$15 <span className="text-xs text-secondary font-normal">USD / mes</span></p>
                <p className="text-xs text-secondary mt-2">1,000 envíos mensuales con Asistente IA y 3 canales.</p>
              </div>
              <NavLink to="/register" className="mt-4 w-full h-9 flex items-center justify-center rounded-lg bg-surface-container-high text-primary font-semibold text-xs hover:bg-primary hover:text-on-primary">
                Elegir Starter
              </NavLink>
            </div>

            <div className="p-5 rounded-xl bg-surface-container-lowest border-2 border-primary shadow-md flex flex-col justify-between relative">
              <span className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold">
                RECOMENDADO
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase text-primary">Más Popular</span>
                <h4 className="text-xl font-bold text-on-surface mt-1">PRO</h4>
                <p className="text-2xl font-bold text-primary mt-2">$29 <span className="text-xs text-secondary font-normal">USD / mes</span></p>
                <p className="text-xs text-secondary mt-2">5,000 envíos mensuales con reportes avanzados en tiempo real.</p>
              </div>
              <NavLink to="/register" className="mt-4 w-full h-9 flex items-center justify-center rounded-lg bg-primary text-on-primary font-semibold text-xs hover:bg-primary-container shadow-xs">
                Comenzar con PRO
              </NavLink>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-surface-container flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-secondary">Alto Rendimiento</span>
                <h4 className="text-xl font-bold text-on-surface mt-1">BUSINESS</h4>
                <p className="text-2xl font-bold text-on-surface mt-2">$79 <span className="text-xs text-secondary font-normal">USD / mes</span></p>
                <p className="text-xs text-secondary mt-2">20,000 envíos mensuales con soporte 24/7 y cola prioritaria.</p>
              </div>
              <NavLink to="/register" className="mt-4 w-full h-9 flex items-center justify-center rounded-lg bg-surface-container text-primary font-semibold text-xs hover:bg-primary hover:text-on-primary">
                Elegir Business
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-10 bg-surface-container-low border-t border-surface-container-high/60 text-xs text-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <BrandLogo size="sm" />
          <p>© 2026 Franja Marketing. Todos los derechos reservados. Automatizamos tus procesos, mejoramos tus resultados.</p>
          <div className="flex items-center gap-4">
            <NavLink to="/login" className="hover:text-primary">Iniciar sesión</NavLink>
            <NavLink to="/register" className="hover:text-primary">Crear cuenta</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};
