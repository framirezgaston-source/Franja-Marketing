import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Icon } from '../ui/Icon';
import { useApp } from '../../context/AppContext';

interface TestSendModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageText: string;
  channelName?: string;
}

export const TestSendModal: React.FC<TestSendModalProps> = ({
  isOpen,
  onClose,
  messageText,
  channelName = 'WhatsApp'
}) => {
  const { showToast } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('+54 9 11 4829-1920');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSend = () => {
    if (!phoneNumber) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      showToast(`Prueba de ${channelName} enviada a ${phoneNumber}`, 'success');
      setTimeout(() => {
        setSentSuccess(false);
        onClose();
      }, 1400);
    }, 900);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Enviar mensaje de prueba`}
      subtitle={`Valida la entrega y el renderizado real de variables en tu dispositivo`}
      maxWidth="max-w-md"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-on-surface">Número de teléfono / Destinatario</label>
          <div className="flex items-center gap-2 bg-surface-container-low px-3 rounded-lg border border-outline-variant/40 focus-within:border-primary">
            <Icon name="smartphone" size={18} className="text-secondary" />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+54 9 11..."
              className="w-full h-10 bg-transparent text-xs text-on-surface outline-none"
            />
          </div>
          <span className="text-[11px] text-secondary">
            Se enviará reemplazando las variables con el primer contacto de tu lista (Carlos, Acero Tech).
          </span>
        </div>

        <div className="p-3 bg-surface-container-low rounded-lg border border-surface-container">
          <span className="text-[11px] font-semibold text-secondary block mb-1">Vista del contenido:</span>
          <p className="text-xs text-on-surface line-clamp-3 italic">
            "{messageText.replace('{{Nombre}}', 'Carlos').replace('{{Empresa}}', 'Acero Tech')}"
          </p>
        </div>

        {sentSuccess && (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold">
            <Icon name="check_circle" size={18} className="text-emerald-600" />
            <span>¡Mensaje de prueba entregado con éxito!</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSending}
            className="px-4 h-10 rounded-lg text-xs font-semibold text-secondary hover:bg-surface-container-low"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={isSending || sentSuccess}
            className="px-4 h-10 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs flex items-center gap-1.5 active:scale-98"
          >
            {isSending ? (
              <>
                <Icon name="progress_activity" size={16} className="animate-spin" />
                <span>Enviando...</span>
              </>
            ) : sentSuccess ? (
              <>
                <Icon name="done" size={16} />
                <span>Enviado</span>
              </>
            ) : (
              <>
                <Icon name="send" size={16} />
                <span>Enviar prueba</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
