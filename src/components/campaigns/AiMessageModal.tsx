import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Icon } from '../ui/Icon';
import { useApp } from '../../context/AppContext';

interface AiMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (generatedText: string) => void;
}

export const AiMessageModal: React.FC<AiMessageModalProps> = ({
  isOpen,
  onClose,
  onApply
}) => {
  const { user } = useApp();
  const [product, setProduct] = useState('Plan Anual de Automatización');
  const [audience, setAudience] = useState('Empresas y distribuidores mayoristas');
  const [benefit, setBenefit] = useState('25% OFF de bienvenida y activación sin cargo');
  const [tone, setTone] = useState<'Profesional' | 'Cercano' | 'Persuasivo' | 'Urgente' | 'Amigable'>('Cercano');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string>('');

  const isFreePlan = user?.plan === 'FREE';

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let copy = '';
      if (tone === 'Urgente') {
        copy = `¡Hola {{Nombre}}! ⚡ Últimas 24hs para aprovechar en {{Empresa}} nuestro ${benefit} exclusivo en ${product}. Respondé este mensaje antes de que venza el cupón.`;
      } else if (tone === 'Profesional') {
        copy = `Estimado/a {{Nombre}}, desde nuestro equipo comercial queremos acercarle a {{Empresa}} una propuesta estratégica: ${benefit} en la contratación de ${product}. Quedamos a su disposición.`;
      } else if (tone === 'Persuasivo') {
        copy = `Hola {{Nombre}} 👋, sabemos el desafío de escalar ventas en {{Empresa}}. Diseñamos una oportunidad única: ${benefit} en ${product} con soporte prioritario. ¿Coordinamos una demo de 5 minutos?`;
      } else if (tone === 'Amigable') {
        copy = `¡Hola {{Nombre}}! 😊 Esperamos que tengas un gran día en {{Empresa}}. Queremos celebrarlo con un regalo especial: ${benefit} en ${product}. ¡Avisanos si te gustaría activarlo hoy!`;
      } else {
        // Cercano (Default)
        copy = `Hola {{Nombre}} 👋, vimos que en {{Empresa}} están buscando optimizar sus resultados. Tenemos ${benefit} en ${product} exclusivo para ti hoy. ¿Te gustaría coordinar una llamada breve?`;
      }
      setGeneratedResult(copy);
      setIsGenerating(false);
    }, 700);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="✨ Crear mensaje con Asistente IA"
      subtitle="Genera textos persuasivos y aprobados para tus canales"
      maxWidth="max-w-lg"
    >
      {isFreePlan ? (
        <div className="flex flex-col items-center text-center p-4 gap-3 bg-surface-container-low rounded-xl">
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
            <Icon name="lock" size={24} />
          </div>
          <h4 className="font-bold text-on-surface">Disponible en planes STARTER, PRO y BUSINESS</h4>
          <p className="text-xs text-secondary max-w-xs">
            El asistente inteligente con redacción comercial y optimización anti-bloqueo no está habilitado en la prueba gratuita.
          </p>
          <button
            onClick={() => {
              onClose();
              window.location.hash = '#/billing';
            }}
            className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-lg hover:bg-primary-container"
          >
            Actualizar plan
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {!generatedResult ? (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface">¿Qué estás promocionando?</label>
                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Ej: Plan Anual de Gestión, Descuento en calzado..."
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 focus:border-primary outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface">¿Quién es tu público objetivo?</label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="Ej: Gerentes comerciales, clientes recurrentes..."
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 focus:border-primary outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface">¿Cuál es el principal beneficio o gancho?</label>
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => setBenefit(e.target.value)}
                  placeholder="Ej: 25% OFF, envío gratis, 2x1 hasta el viernes..."
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-xs border border-outline-variant/40 focus:border-primary outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface">Selecciona el tono</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {(['Cercano', 'Profesional', 'Persuasivo', 'Urgente', 'Amigable'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`h-8 rounded-lg text-xs font-medium transition-all ${
                        tone === t
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'bg-surface-container-low text-secondary hover:bg-surface-container'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full h-11 mt-2 rounded-lg bg-primary text-on-primary font-semibold text-xs flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-98 shadow-sm"
              >
                {isGenerating ? (
                  <>
                    <Icon name="progress_activity" size={18} className="animate-spin" />
                    <span>Redactando propuesta inteligente...</span>
                  </>
                ) : (
                  <>
                    <Icon name="auto_awesome" size={18} />
                    <span>Generar mensaje con IA</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-secondary">
                <span className="font-semibold text-primary flex items-center gap-1">
                  <Icon name="check_circle" size={16} /> Mensaje generado ({tone})
                </span>
                <span>Plantilla adaptable</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low border border-primary-fixed text-xs text-on-surface leading-relaxed">
                {generatedResult}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setGeneratedResult('')}
                  className="flex-1 h-10 rounded-lg bg-surface-container-low text-secondary hover:bg-surface-container text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Icon name="refresh" size={16} />
                  <span>Regenerar</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onApply(generatedResult);
                    onClose();
                  }}
                  className="flex-1 h-10 rounded-lg bg-primary text-on-primary text-xs font-semibold flex items-center justify-center gap-1 shadow-sm hover:bg-primary-container"
                >
                  <Icon name="check" size={16} />
                  <span>Usar este mensaje</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
