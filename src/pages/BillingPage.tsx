import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/ui/Icon';
import { Modal } from '../components/ui/Modal';
import { mockPricingPlans, mockInvoices, mockPaymentMethod } from '../mocks/billing';
import { PlanTier } from '../types/user';

export const BillingPage: React.FC = () => {
  const { user, updatePlan, showToast } = useApp();
  const [plans] = useState(mockPricingPlans);
  const [invoices] = useState(mockInvoices);
  const [paymentMethod, setPaymentMethod] = useState(mockPaymentMethod);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isUpdatingCard, setIsUpdatingCard] = useState(false);

  const currentPlanTier: PlanTier = user?.plan || 'PRO';

  const handleSelectPlan = async (planId: PlanTier) => {
    if (planId === currentPlanTier) return;
    await updatePlan(planId);
  };

  const handleScrollToPlans = () => {
    const el = document.getElementById('planes-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleConfirmNewCard = () => {
    setIsUpdatingCard(true);
    setTimeout(() => {
      setIsUpdatingCard(false);
      setIsPaymentModalOpen(false);
      setPaymentMethod((prev) => ({ ...prev, last4: `${Math.floor(1000 + Math.random() * 9000)}` }));
      showToast('¡Método de pago actualizado exitosamente con Mercado Pago!', 'success');
    }, 1000);
  };

  const handleDownloadInvoice = (invNum: string) => {
    showToast(`Descargando comprobante ${invNum} en formato PDF...`, 'info');
  };

  const usedCredits = user?.creditsUsed || 3240;
  const totalCredits = user?.creditsTotal || 5000;
  const remainingCredits = Math.max(0, totalCredits - usedCredits);
  const percentUsed = Math.min(100, Number(((usedCredits / totalCredits) * 100).toFixed(1)));

  return (
    <div className="flex flex-col w-full gap-6 pb-12 max-w-4xl mx-auto pt-2">
      {/* Title & Header */}
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wider text-primary font-bold flex items-center gap-1">
          <Icon name="verified" size={16} />
          <span>Suscripción & Cuotas</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Plan y Facturación
        </h1>
        <p className="text-xs sm:text-sm text-secondary">
          Gestiona tu suscripción, método de pago y volumen de envíos mensuales.
        </p>
      </div>

      {/* Banner Plan Actual (Exact Stitch Image 8) */}
      <div className="relative overflow-hidden rounded-2xl bg-inverse-surface text-inverse-on-surface p-6 sm:p-7 shadow-xl shadow-inverse-surface/15">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-gradient-to-br from-primary-fixed/20 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
          <Icon name="token" size={120} className="text-white" />
        </div>

        <div className="relative flex flex-col gap-4 z-10">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse" />
              PLAN ACTUAL
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-surface-variant font-medium">
              <Icon name="schedule" size={16} />
              Renueva 28 Nov 2026
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-surface-dim font-medium block">
                Nivel empresarial
              </span>
              <h2 className="text-3xl sm:text-4xl text-white font-bold">{currentPlanTier}</h2>
            </div>
            <div className="text-right">
              <span className="text-3xl sm:text-4xl text-white font-bold tracking-tight">
                ${currentPlanTier === 'BUSINESS' ? 79 : currentPlanTier === 'STARTER' ? 15 : currentPlanTier === 'FREE' ? 0 : 29}
              </span>
              <span className="text-xs text-surface-dim ml-1">USD / mes</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md flex flex-col gap-2.5">
            <div className="flex justify-between items-center text-xs text-inverse-on-surface">
              <span className="flex items-center gap-1.5 text-surface-container-high">
                <Icon name="send" size={16} />
                Consumo de créditos
              </span>
              <span className="font-bold text-white tabular-nums">
                {usedCredits.toLocaleString()}{' '}
                <span className="text-surface-dim font-normal">/ {totalCredits.toLocaleString()}</span>
              </span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-tertiary-fixed to-primary-container rounded-full transition-all duration-700"
                style={{ width: `${percentUsed}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[11px] text-surface-dim pt-0.5">
              <span>{percentUsed}% utilizado</span>
              <span className="text-tertiary-fixed font-semibold">
                {remainingCredits.toLocaleString()} envíos restantes
              </span>
            </div>
          </div>

          <button
            onClick={handleScrollToPlans}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-primary-container text-on-primary text-xs sm:text-sm font-semibold shadow-md shadow-primary-container/30 hover:bg-primary transition-all active:scale-[0.99]"
          >
            <Icon name="bolt" size={20} />
            <span>Actualizar plan</span>
          </button>
        </div>
      </div>

      {/* Método de Pago */}
      <div className="rounded-xl bg-surface-container-lowest p-5 sm:p-6 shadow-sm border border-surface-container/60 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <Icon name="credit_card" size={20} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm sm:text-base font-bold text-on-surface leading-tight">Método de pago</h3>
              <span className="text-xs text-secondary">Cobro automático mensual</span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-secondary-container text-xs font-semibold">
            Activo
          </span>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 rounded-md bg-surface-container-lowest flex items-center justify-center shadow-xs border border-surface-container">
              <Icon name="payments" size={20} className="text-primary-container" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-on-surface">
                  {paymentMethod.brand} •••• {paymentMethod.last4}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                  MP
                </span>
              </div>
              <span className="text-[11px] text-secondary">Procesado vía Mercado Pago</span>
            </div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
        </div>

        <button
          onClick={() => setIsPaymentModalOpen(true)}
          className="w-full h-10 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
        >
          <Icon name="cached" size={18} />
          <span>Cambiar método de pago</span>
        </button>
      </div>

      {/* Compara Nuestros Planes (Grid de 4 planes) */}
      <div id="planes-section" className="flex flex-col gap-4 scroll-mt-20">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-on-surface">Compara nuestros planes</h3>
          <p className="text-xs text-secondary mt-0.5">
            Escala tu comunicación omnicanal sin fricciones técnicas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p) => {
            const isCurrent = p.id === currentPlanTier;
            return (
              <div
                key={p.id}
                className={`rounded-xl p-5 flex flex-col justify-between gap-4 transition-all ${
                  isCurrent
                    ? 'bg-surface-container-lowest border-2 border-primary shadow-md relative'
                    : 'bg-surface-container-lowest border border-surface-container/60 shadow-xs'
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold">
                    PLAN ACTUAL
                  </span>
                )}

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-secondary">
                        {p.subtitle}
                      </span>
                      <h4 className="text-xl font-bold text-on-surface mt-0.5">{p.name}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-on-surface tabular-nums">
                        ${p.priceMonthlyUsd}
                      </span>
                      <span className="text-[10px] text-secondary block">{p.periodLabel}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-surface-container-low">
                    {p.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs">
                        <Icon
                          name={f.included ? 'check_circle' : 'cancel'}
                          size={16}
                          className={f.included ? 'text-primary' : 'text-outline opacity-40'}
                        />
                        <span className={f.included ? (f.highlight ? 'font-semibold text-on-surface' : 'text-on-surface') : 'text-outline opacity-50'}>
                          {f.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isCurrent}
                  onClick={() => handleSelectPlan(p.id)}
                  className={`w-full h-10 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    isCurrent
                      ? 'bg-surface-container-low text-primary cursor-default'
                      : p.id === 'BUSINESS'
                      ? 'bg-primary text-on-primary hover:bg-primary-container shadow-xs'
                      : 'bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary'
                  }`}
                >
                  {isCurrent ? (
                    <>
                      <Icon name="check" size={16} />
                      <span>Plan Actual</span>
                    </>
                  ) : (
                    <span>Elegir {p.name}</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historial de Facturación */}
      <div className="rounded-xl bg-surface-container-lowest p-5 sm:p-6 shadow-sm border border-surface-container/60 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <Icon name="receipt_long" size={20} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-on-surface leading-tight">
                Historial de Facturación
              </h3>
              <span className="text-xs text-secondary">Tus últimos comprobantes emitidos</span>
            </div>
          </div>
          <Icon name="history" size={20} className="text-secondary" />
        </div>

        <div className="flex flex-col gap-2.5">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors"
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-on-surface">{inv.number}</span>
                  <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface-variant text-[11px] font-semibold">
                    {inv.statusLabel}
                  </span>
                </div>
                <span className="text-xs text-secondary">
                  {inv.date} • ${inv.amountUsd.toFixed(2)} USD
                </span>
              </div>

              <button
                onClick={() => handleDownloadInvoice(inv.number)}
                className="h-8 px-3 rounded-lg bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs border border-surface-container"
              >
                <Icon name="download" size={15} />
                <span>PDF</span>
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1 text-secondary text-xs">
          <span className="flex items-center gap-1.5">
            <Icon name="security" size={16} className="text-primary" />
            <span>Facturación con IVA discriminado</span>
          </span>
          <button
            onClick={() => showToast('Descargando resumen fiscal anual', 'info')}
            className="text-primary hover:underline font-semibold"
          >
            Ver todas
          </button>
        </div>
      </div>

      {/* Modal Mercado Pago (Exact Stitch Image 8) */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Actualizar Tarjeta"
        subtitle="Pasarela de pago segura Mercado Pago"
      >
        <div className="flex flex-col gap-4">
          <p className="text-xs text-secondary leading-relaxed">
            Serás redirigido a la pasarela segura de Mercado Pago para autorizar tu nuevo método de pago sin recargos adicionales.
          </p>

          <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-2 text-xs text-on-surface font-medium border border-surface-container">
            <Icon name="lock" size={18} className="text-primary" />
            <span>Conexión cifrada TLS 256-bit con Mercado Pago</span>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsPaymentModalOpen(false)}
              className="flex-1 h-11 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={isUpdatingCard}
              onClick={handleConfirmNewCard}
              className="flex-1 h-11 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container flex items-center justify-center gap-2 shadow-xs active:scale-98"
            >
              {isUpdatingCard ? (
                <>
                  <Icon name="progress_activity" size={16} className="animate-spin" />
                  <span>Conectando con MP...</span>
                </>
              ) : (
                <span>Continuar</span>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
