import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/ui/Icon';
import { CampaignChannel } from '../types/campaign';
import { defaultColumnMappings, mockValidationSummary } from '../mocks/contacts';
import { AiMessageModal } from '../components/campaigns/AiMessageModal';
import { TestSendModal } from '../components/campaigns/TestSendModal';

export const CreateCampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, createCampaign, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Campaign Info
  const [campaignName, setCampaignName] = useState('Promoción Septiembre VIP');
  const [selectedChannel, setSelectedChannel] = useState<CampaignChannel>('whatsapp');

  // Step 2: Contacts
  const [importSource, setImportSource] = useState<'excel' | 'csv' | 'sheets' | 'api'>('excel');
  const [sheetsUrl, setSheetsUrl] = useState('https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms');
  const [apiUrl, setApiUrl] = useState('https://api.miempresa.com/v1/leads');
  const [apiKey, setApiKey] = useState('key_live_9921448');
  const [apiTested, setApiTested] = useState(false);
  const [mappings, setMappings] = useState(defaultColumnMappings);
  const [validation] = useState(mockValidationSummary);

  // Step 3: Message Editor & Preview
  const [messageText, setMessageText] = useState(
    'Hola {{Nombre}} 👋, vimos que en {{Empresa}} están buscando optimizar sus envíos. Tenemos un {{Descuento}} especial en {{Producto}} exclusivo para ti hoy.'
  );
  const [hasMedia, setHasMedia] = useState(false);
  const [mediaType, setMediaType] = useState<'none' | 'image' | 'video' | 'document'>('none');
  const [testPhoneNumber, setTestPhoneNumber] = useState('+54 9 11 4829-1920');
  const [isTestSending, setIsTestSending] = useState(false);
  const [testSendSuccess, setTestSendSuccess] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Step 4: Schedule
  const [sendOption, setSendOption] = useState<'ahora' | 'programar'>('ahora');
  const [scheduledDate, setScheduledDate] = useState('2026-10-14');
  const [scheduledTime, setScheduledTime] = useState('10:00');
  const [timezone, setTimezone] = useState('America/Argentina/Buenos_Aires');
  const [repeatWeekly, setRepeatWeekly] = useState(false);

  // Credit calculation
  // Regla del prompt: Texto = 1 crédito por contacto; Texto + cualquier multimedia = 1.2 créditos por contacto
  const creditMultiplier = hasMedia ? 1.2 : 1.0;
  const estimatedCredits = Math.round(validation.valid * creditMultiplier);
  const userBalance = user?.creditsAvailable ?? 12500;
  const hasEnoughCredits = userBalance >= estimatedCredits;

  // Insert variable in editor
  const handleInsertVariable = (varName: string) => {
    const editor = document.getElementById('message-textarea') as HTMLTextAreaElement | null;
    if (!editor) {
      setMessageText((prev) => `${prev} ${varName}`);
      return;
    }
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const val = editor.value;
    const next = val.substring(0, start) + ' ' + varName + ' ' + val.substring(end);
    setMessageText(next);
    setTimeout(() => {
      editor.focus();
      editor.selectionStart = editor.selectionEnd = start + varName.length + 2;
    }, 10);
  };

  const handleSendTestInline = () => {
    setIsTestSending(true);
    setTimeout(() => {
      setIsTestSending(false);
      setTestSendSuccess(true);
      showToast(`Prueba enviada a ${testPhoneNumber}`, 'success');
      setTimeout(() => setTestSendSuccess(false), 3000);
    }, 800);
  };

  // Preview replacement
  const getRenderedPreview = () => {
    return messageText
      .replace(/{{Nombre}}/g, 'Carlos')
      .replace(/{{Empresa}}/g, 'Acero Tech')
      .replace(/{{Descuento}}/g, '25% OFF')
      .replace(/{{Producto}}/g, 'Plan Anual')
      .replace(/{{Ciudad}}/g, 'Buenos Aires')
      .replace(/{{Telefono}}/g, '+54 9 11 4829-1920');
  };

  const handleConfirmAndLaunch = async () => {
    if (!hasEnoughCredits) {
      alert('No tienes suficientes créditos para realizar esta campaña.');
      return;
    }

    const created = await createCampaign({
      name: campaignName,
      channel: selectedChannel,
      channelLabel:
        selectedChannel === 'whatsapp'
          ? 'WhatsApp Oficial API'
          : selectedChannel === 'gmail'
          ? 'Gmail Corporativo'
          : 'Instagram Direct',
      channelSubtext: 'Evolution API',
      status: sendOption === 'ahora' ? 'enviando' : 'programada',
      statusLabel: sendOption === 'ahora' ? 'Enviando 1%' : 'Programada',
      totalContacts: validation.valid,
      excludedCount: validation.excluded,
      messageContent: messageText,
      hasMedia,
      mediaType,
      estimatedCredits,
      scheduledAt:
        sendOption === 'ahora'
          ? 'Hoy, en curso'
          : `${scheduledDate}, ${scheduledTime} hs`,
      createdBy: user?.name || 'Carlos R.',
      timezone,
      repeatWeekly
    });

    navigate(`/campaigns/${created.id}`);
  };

  return (
    <div className="flex flex-col w-full pb-10 max-w-4xl mx-auto pt-2">
      {/* Stepper Header Card */}
      <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container/60 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-secondary uppercase font-bold tracking-wider">
            Paso {currentStep} de 5
          </span>
          <span className="text-xs text-primary font-bold">
            {currentStep * 20}% completado
          </span>
        </div>

        {/* Stepper Track */}
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-container rounded-full z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 25}%` }}
          />

          {[
            { step: 1, label: 'Campaña' },
            { step: 2, label: 'Contactos' },
            { step: 3, label: 'Mensaje' },
            { step: 4, label: 'Envío' },
            { step: 5, label: 'Confirmar' }
          ].map((s) => {
            const isDone = s.step < currentStep;
            const isActive = s.step === currentStep;
            return (
              <div
                key={s.step}
                onClick={() => {
                  if (s.step < currentStep) setCurrentStep(s.step as any);
                }}
                className={`relative z-10 flex flex-col items-center cursor-pointer ${
                  s.step > currentStep ? 'pointer-events-none' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-primary text-on-primary shadow-xs'
                      : isActive
                      ? 'bg-primary text-on-primary shadow-md ring-4 ring-primary-fixed scale-110'
                      : 'bg-surface-container-high text-secondary'
                  }`}
                >
                  {isDone ? <Icon name="check" size={16} /> : s.step}
                </div>
                <span
                  className={`text-[11px] mt-1 hidden xs:inline ${
                    isActive ? 'text-primary font-bold' : 'text-secondary font-medium'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: CAMPAIGN INFO */}
      {currentStep === 1 && (
        <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6 shadow-sm border border-surface-container/60 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Información de la campaña</h2>
            <p className="text-xs text-secondary mt-1">
              Define el identificador comercial y selecciona exactamente UN canal de emisión.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-on-surface">Nombre de campaña</label>
            <input
              type="text"
              required
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Ej: Promoción Septiembre VIP, Flash Sale, etc."
              className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-sm border border-outline-variant/40 focus:border-primary outline-none"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-semibold text-on-surface">
              Canal de envío (Selecciona exactamente uno)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* WhatsApp */}
              <button
                type="button"
                onClick={() => setSelectedChannel('whatsapp')}
                className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                  selectedChannel === 'whatsapp'
                    ? 'border-primary bg-primary-fixed/20 ring-2 ring-primary shadow-xs'
                    : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Icon name="chat" size={20} />
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                </div>
                <h4 className="font-bold text-sm text-on-surface">WhatsApp Oficial API</h4>
                <p className="text-[11px] text-secondary leading-snug">
                  Evolution API conectada · +54 9 11 4567-8901
                </p>
              </button>

              {/* Gmail */}
              <button
                type="button"
                onClick={() => {
                  if (user?.plan === 'FREE') {
                    alert('El canal Gmail requiere plan STARTER o superior.');
                    return;
                  }
                  setSelectedChannel('gmail');
                }}
                className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                  selectedChannel === 'gmail'
                    ? 'border-primary bg-primary-fixed/20 ring-2 ring-primary shadow-xs'
                    : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center">
                    <Icon name="mail" size={20} />
                  </div>
                  {user?.plan === 'FREE' ? (
                    <span className="text-[10px] bg-surface-container px-1.5 py-0.5 rounded text-secondary font-semibold">
                      🔒 STARTER+
                    </span>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  )}
                </div>
                <h4 className="font-bold text-sm text-on-surface">Gmail Corporativo</h4>
                <p className="text-[11px] text-secondary leading-snug">
                  Google Workspace · ventas@miempresa.com
                </p>
              </button>

              {/* Instagram */}
              <button
                type="button"
                onClick={() => {
                  if (user?.plan === 'FREE') {
                    alert('El canal Instagram requiere plan STARTER o superior.');
                    return;
                  }
                  setSelectedChannel('instagram');
                }}
                className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                  selectedChannel === 'instagram'
                    ? 'border-primary bg-primary-fixed/20 ring-2 ring-primary shadow-xs'
                    : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center">
                    <Icon name="photo_camera" size={20} />
                  </div>
                  {user?.plan === 'FREE' ? (
                    <span className="text-[10px] bg-surface-container px-1.5 py-0.5 rounded text-secondary font-semibold">
                      🔒 STARTER+
                    </span>
                  ) : (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                      Reconectar
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-on-surface">Instagram Direct</h4>
                <p className="text-[11px] text-secondary leading-snug">
                  Meta Graph API · @miempresa.oficial
                </p>
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-surface-container-low">
            <button
              type="button"
              onClick={() => {
                if (!campaignName.trim()) {
                  alert('Por favor, ingresa el nombre de la campaña');
                  return;
                }
                setCurrentStep(2);
              }}
              className="px-6 h-11 rounded-lg bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-primary-container shadow-xs active:scale-98"
            >
              <span>Siguiente: Contactos</span>
              <Icon name="arrow_forward" size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CONTACTS, MAPPING & VALIDATION */}
      {currentStep === 2 && (
        <div className="flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6 shadow-sm border border-surface-container/60 flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Importar Contactos</h2>
              <p className="text-xs text-secondary mt-1">
                Sube tu base de prospectos y valida los números antes del envío.
              </p>
            </div>

            {/* Source tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'excel', label: 'Excel (.xlsx)', icon: 'table_view' },
                { id: 'csv', label: 'CSV (.csv)', icon: 'description' },
                { id: 'sheets', label: 'Google Sheets', icon: 'grid_on' },
                { id: 'api', label: 'Conexión API', icon: 'webhook' }
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setImportSource(s.id as any)}
                  className={`p-3 rounded-lg border text-center flex flex-col items-center gap-1.5 transition-all ${
                    importSource === s.id
                      ? 'border-primary bg-primary-fixed/20 shadow-xs'
                      : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <Icon name={s.icon} size={20} className={importSource === s.id ? 'text-primary' : 'text-secondary'} />
                  <span className="font-semibold text-xs text-on-surface">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Source Config Inputs */}
            {importSource === 'excel' || importSource === 'csv' ? (
              <div className="p-6 rounded-xl border-2 border-dashed border-primary-fixed bg-surface-container-low/50 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
                  <Icon name="upload_file" size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold text-on-surface">Base_Clientes_Septiembre_2026.xlsx</span>
                  <p className="text-[11px] text-secondary mt-0.5">8,500 filas cargadas · 1.4 MB</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  ✓ Archivo verificado automáticamente
                </span>
              </div>
            ) : importSource === 'sheets' ? (
              <div className="flex flex-col gap-2 p-4 bg-surface-container-low rounded-xl border border-surface-container">
                <label className="text-xs font-semibold text-on-surface">Enlace de Google Sheets público o compartido</label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={sheetsUrl}
                    onChange={(e) => setSheetsUrl(e.target.value)}
                    className="flex-1 h-10 px-3 rounded-lg bg-surface-container-lowest text-xs border border-outline-variant/40 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => showToast('Hoja de cálculo sincronizada: 8,500 contactos', 'success')}
                    className="px-3 h-10 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shrink-0"
                  >
                    Sincronizar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 p-4 bg-surface-container-low rounded-xl border border-surface-container">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface">API Endpoint URL</label>
                  <input
                    type="url"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-xs border border-outline-variant/40 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface">API Key / Bearer Token</label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-xs border border-outline-variant/40 outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setApiTested(true);
                    showToast('Conexión con endpoint validada con código 200 OK', 'success');
                  }}
                  className="w-fit px-4 h-9 rounded-lg bg-surface-container-high text-primary text-xs font-semibold hover:bg-surface-container flex items-center gap-1.5"
                >
                  <Icon name="link" size={16} />
                  <span>{apiTested ? '✓ Conexión probada' : 'Probar conexión'}</span>
                </button>
              </div>
            )}

            {/* Mapeo de Columnas */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider text-secondary">
                Mapeo de Columnas Detectadas
              </span>
              <div className="overflow-x-auto border border-surface-container rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-low text-secondary font-semibold border-b border-surface-container">
                    <tr>
                      <th className="p-2.5">Columna en Archivo</th>
                      <th className="p-2.5">Mapear a Variable</th>
                      <th className="p-2.5 hidden sm:table-cell">Dato de Muestra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    {mappings.map((m, idx) => (
                      <tr key={m.fileColumn} className="hover:bg-surface-container-low/50">
                        <td className="p-2.5 font-mono text-[11px] text-on-surface">{m.fileColumn}</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-bold text-[11px]">
                            {`{{${m.targetField}}}`}
                          </span>
                        </td>
                        <td className="p-2.5 text-secondary hidden sm:table-cell">{m.sampleValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Resumen de Validación */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface">Validación de Audiencia</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  98.2% Aptitud
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-surface-container-lowest rounded-lg">
                  <span className="text-[10px] text-secondary block">Encontrados</span>
                  <span className="text-base font-bold text-on-surface tabular-nums">
                    {validation.total.toLocaleString()}
                  </span>
                </div>
                <div className="p-2 bg-surface-container-lowest rounded-lg border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 font-semibold block">Válidos</span>
                  <span className="text-base font-bold text-emerald-700 tabular-nums">
                    {validation.valid.toLocaleString()}
                  </span>
                </div>
                <div className="p-2 bg-surface-container-lowest rounded-lg border border-error-container">
                  <span className="text-[10px] text-error font-semibold block">Excluidos</span>
                  <span className="text-base font-bold text-error tabular-nums">
                    {validation.excluded.toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-secondary">
                * Se excluyeron 92 números sin prefijo internacional, 38 correos con sintaxis inválida y 20 registros vacíos.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 h-11 rounded-lg text-xs font-semibold text-secondary hover:bg-surface-container-low"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-6 h-11 rounded-lg bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-primary-container shadow-xs active:scale-98"
            >
              <span>Siguiente: Diseñar Mensaje</span>
              <Icon name="arrow_forward" size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: MESSAGE DESIGNER & REALTIME PREVIEW (Image 4 from Stitch) */}
      {currentStep === 3 && (
        <div className="flex flex-col gap-4">
          {/* Context Badges Bar */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface text-xs font-semibold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {campaignName}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-semibold">
                <Icon name="chat" size={16} className="text-primary" fill />
                {selectedChannel === 'whatsapp'
                  ? 'WhatsApp Oficial API'
                  : selectedChannel === 'gmail'
                  ? 'Gmail Corporativo'
                  : 'Instagram Direct'}
              </div>
            </div>
            {/* Audience summary row */}
            <div className="flex items-center justify-between pt-1 text-secondary text-xs">
              <div className="flex items-center gap-1.5">
                <Icon name="groups" size={18} className="text-primary" />
                <span>
                  Audiencia activa: <strong className="text-on-surface">{validation.valid.toLocaleString()} contactos</strong>
                </span>
              </div>
              <span className="text-secondary text-[11px] font-medium bg-surface-container px-2 py-0.5 rounded-full">
                {validation.excluded} excluidos
              </span>
            </div>
          </div>

          {/* Main Workspace: Editor Panel */}
          <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container/60 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <Icon name="edit_note" size={20} />
                </div>
                <h2 className="text-base font-bold text-on-surface">Diseña tu mensaje</h2>
              </div>
              {/* AI Generator Action */}
              <button
                type="button"
                onClick={() => setIsAiModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs shadow-xs hover:bg-tertiary-fixed-dim transition-all"
              >
                <Icon name="auto_awesome" size={16} />
                <span>Asistente IA</span>
              </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between p-1.5 bg-surface-container-low rounded-lg overflow-x-auto">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleInsertVariable('*texto*')}
                  className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest text-on-surface hover:text-primary transition-colors text-xs font-bold shadow-xs"
                  title="Negrita"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertVariable('_texto_')}
                  className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest text-on-surface hover:text-primary transition-colors text-xs italic shadow-xs"
                  title="Cursiva"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertVariable('🚀')}
                  className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest text-on-surface hover:text-primary transition-colors shadow-xs"
                  title="Emojis"
                >
                  <Icon name="sentiment_satisfied" size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertVariable('https://franja.co/promo')}
                  className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest text-on-surface hover:text-primary transition-colors shadow-xs"
                  title="Enlace"
                >
                  <Icon name="link" size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextMedia = !hasMedia;
                    setHasMedia(nextMedia);
                    setMediaType(nextMedia ? 'image' : 'none');
                    showToast(nextMedia ? 'Adjunto multimedia habilitado (1.2 cr/contacto)' : 'Multimedia removida', 'info');
                  }}
                  className={`w-8 h-8 flex items-center justify-center rounded transition-colors shadow-xs ${
                    hasMedia ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface hover:text-primary'
                  }`}
                  title="Adjuntar multimedia"
                >
                  <Icon name="add_photo_alternate" size={18} />
                </button>
              </div>

              <div className="flex items-center gap-1 pl-2">
                <span className="text-[11px] font-semibold text-secondary hidden sm:inline">Variables:</span>
              </div>
            </div>

            {/* Chips de Variables Rápidas */}
            <div className="flex items-center gap-1.5 py-1 overflow-x-auto no-scrollbar">
              <span className="text-xs font-semibold text-secondary whitespace-nowrap mr-1">Insertar:</span>
              {['{{Nombre}}', '{{Empresa}}', '{{Descuento}}', '{{Producto}}', '{{Ciudad}}'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleInsertVariable(v)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container text-primary font-semibold text-xs hover:bg-surface-container-high transition-colors active:scale-95"
                >
                  + {v}
                </button>
              ))}
            </div>

            {/* Textarea Principal */}
            <div className="relative rounded-lg bg-surface-container-low p-3 border border-outline-variant/30 focus-within:border-primary">
              <textarea
                id="message-textarea"
                rows={5}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Escribe el contenido de tu campaña aquí..."
                className="w-full bg-transparent resize-none outline-none text-xs sm:text-sm text-on-surface leading-relaxed placeholder:text-secondary"
              />
              <div className="flex items-center justify-between pt-2 text-secondary text-xs">
                <span className="flex items-center gap-1 text-primary font-medium">
                  <Icon name="bolt" size={14} />
                  Plantilla aprobada por Meta
                </span>
                <span>
                  {messageText.length} caracteres ({Math.max(1, Math.ceil(messageText.length / 160))} mensaje)
                </span>
              </div>
            </div>
          </div>

          {/* Realtime Preview Section: WhatsApp Phone Mock (Exact Stitch Image 4) */}
          <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container/60 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <Icon name="visibility" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">Vista previa de cliente</h3>
                  <p className="text-[11px] text-secondary">Simulación con datos reales de tu base</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-primary text-xs font-semibold">
                En vivo
              </span>
            </div>

            {/* WhatsApp Simulated Frame */}
            <div className="rounded-xl overflow-hidden shadow-sm bg-surface-container border border-surface-container">
              {/* WhatsApp Header */}
              <div className="bg-surface-container-high px-3 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface shadow-xs">
                    <Icon name="person" size={18} className="text-primary" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-surface-container-high" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-on-surface font-semibold truncate leading-tight">
                      Carlos M. (Acero Tech)
                    </span>
                    <span className="text-[10px] text-secondary leading-tight">En línea ahora</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <Icon name="call" size={18} />
                  <Icon name="more_vert" size={18} />
                </div>
              </div>

              {/* Chat Canvas */}
              <div className="p-4 flex flex-col gap-2 bg-[#efeae2]/60 min-h-[160px] justify-end">
                {/* Date Badge */}
                <div className="flex justify-center">
                  <span className="px-3 py-0.5 rounded-full bg-surface-container-lowest text-secondary text-[10px] font-medium shadow-xs">
                    Hoy
                  </span>
                </div>

                {/* Message Bubble */}
                <div className="self-end max-w-[88%] bg-white rounded-xl rounded-tr-xs p-3 shadow-sm border border-black/5">
                  {hasMedia && (
                    <div className="w-full h-28 mb-2 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary text-xs font-medium border border-surface-container">
                      <Icon name="image" size={24} className="mr-1 text-primary" />
                      <span>[Imagen adjunta de campaña]</span>
                    </div>
                  )}
                  <p className="text-xs text-on-surface leading-snug whitespace-pre-line font-sans">
                    {getRenderedPreview()}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-secondary">10:42 AM</span>
                    <Icon name="done_all" size={14} className="text-primary font-bold" />
                  </div>
                </div>
              </div>

              {/* Test Send Bar in Phone Footer */}
              <div className="p-3 bg-surface-container-lowest flex flex-col gap-2 border-t border-surface-container">
                <span className="text-[11px] text-secondary font-medium">
                  Validación de entrega en dispositivo real:
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-surface-container-low rounded-lg px-3 py-1.5 flex items-center gap-2 border border-outline-variant/30">
                    <Icon name="smartphone" size={18} className="text-secondary" />
                    <input
                      type="tel"
                      value={testPhoneNumber}
                      onChange={(e) => setTestPhoneNumber(e.target.value)}
                      placeholder="+54 9 11..."
                      className="w-full bg-transparent text-xs text-on-surface outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendTestInline}
                    disabled={isTestSending}
                    className="shrink-0 px-3.5 h-9 rounded-lg bg-surface-container-high text-primary text-xs font-semibold flex items-center gap-1 active:scale-95 transition-transform hover:bg-surface-container"
                  >
                    {isTestSending ? (
                      <Icon name="progress_activity" size={16} className="animate-spin" />
                    ) : (
                      <Icon name="send" size={16} />
                    )}
                    <span>Probar</span>
                  </button>
                </div>
                {testSendSuccess && (
                  <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1 animate-fade-in">
                    <Icon name="check_circle" size={16} className="text-emerald-600" />
                    <span>Mensaje de prueba enviado exitosamente a tu WhatsApp</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Card: Credit & Next Step */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-md border border-surface-container/60 flex flex-col gap-3">
            <div className="flex items-center justify-between bg-surface-container-low rounded-lg p-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xs">
                  <Icon name="toll" size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-secondary">Consumo estimado:</span>
                  <span className="text-sm font-bold text-on-surface">
                    {estimatedCredits.toLocaleString()} créditos
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-secondary">Saldo disponible</span>
                <span className="block text-xs font-bold text-primary tabular-nums">
                  {userBalance.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-1/3 h-11 rounded-lg bg-surface-container-low text-on-surface text-xs sm:text-sm font-semibold hover:bg-surface-container flex items-center justify-center gap-1"
              >
                <Icon name="arrow_back" size={18} />
                <span>Atrás</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="flex-1 h-11 rounded-lg bg-primary text-on-primary text-xs sm:text-sm font-semibold shadow-md hover:bg-primary-container flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Siguiente: Programación</span>
                <Icon name="arrow_forward" size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: SCHEDULE */}
      {currentStep === 4 && (
        <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6 shadow-sm border border-surface-container/60 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Programación de Envío</h2>
            <p className="text-xs text-secondary mt-1">
              Decide si lanzar la campaña de forma inmediata o fijar fecha y horario específico.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSendOption('ahora')}
              className={`p-4 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                sendOption === 'ahora'
                  ? 'border-primary bg-primary-fixed/20 ring-2 ring-primary shadow-xs'
                  : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Icon name="bolt" size={20} />
                <span>Enviar ahora</span>
              </div>
              <p className="text-xs text-secondary mt-1">
                La cola de envíos comenzará tan pronto confirmes en el paso final a un ritmo de ~45 msg/min.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSendOption('programar')}
              className={`p-4 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                sendOption === 'programar'
                  ? 'border-primary bg-primary-fixed/20 ring-2 ring-primary shadow-xs'
                  : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Icon name="calendar_month" size={20} />
                <span>Programar para más tarde</span>
              </div>
              <p className="text-xs text-secondary mt-1">
                Define fecha, hora y zona horaria para maximizar tasas de apertura en horarios de oficina.
              </p>
            </button>
          </div>

          {sendOption === 'programar' && (
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface">Fecha de inicio</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-surface-container-lowest text-xs border border-outline-variant/40 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface">Hora de inicio</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-surface-container-lowest text-xs border border-outline-variant/40 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface">Zona horaria</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-container-lowest text-xs border border-outline-variant/40 outline-none"
                >
                  <option value="America/Argentina/Buenos_Aires">America/Argentina/Buenos_Aires (GMT-3)</option>
                  <option value="America/Lima">America/Lima (GMT-5)</option>
                  <option value="America/Bogota">America/Bogota (GMT-5)</option>
                  <option value="America/Santiago">America/Santiago (GMT-4)</option>
                  <option value="America/Mexico_City">America/Mexico_City (GMT-6)</option>
                  <option value="Europe/Madrid">Europe/Madrid (GMT+1)</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={repeatWeekly}
                  onChange={(e) => setRepeatWeekly(e.target.checked)}
                  className="w-4 h-4 rounded text-primary border-outline-variant"
                />
                <span className="text-xs text-on-surface font-medium">Repetir semanalmente en el mismo horario</span>
              </label>
            </div>
          )}

          <div className="p-3.5 bg-surface-container-low rounded-xl text-xs text-secondary flex items-center gap-2">
            <Icon name="info" size={18} className="text-primary" />
            <span>
              La campaña se enviará:{' '}
              <strong className="text-on-surface">
                {sendOption === 'ahora' ? 'Inmediatamente al confirmar' : `${scheduledDate} a las ${scheduledTime} hs (${timezone.split('/')[1]})`}
              </strong>
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-surface-container-low">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-4 h-11 rounded-lg text-xs font-semibold text-secondary hover:bg-surface-container-low"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="px-6 h-11 rounded-lg bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-primary-container shadow-xs active:scale-98"
            >
              <span>Siguiente: Revisión Final</span>
              <Icon name="arrow_forward" size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: CONFIRMATION & CREDIT CHECK */}
      {currentStep === 5 && (
        <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6 shadow-sm border border-surface-container/60 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Confirmar y Lanzar Campaña</h2>
            <p className="text-xs text-secondary mt-1">
              Revisa el resumen final antes de procesar el lote de envíos.
            </p>
          </div>

          {/* Resumen Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-secondary">Campaña</span>
              <span className="text-sm font-bold text-on-surface">{campaignName}</span>
              <span className="text-xs text-primary font-medium">{selectedChannel.toUpperCase()}</span>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-secondary">Audiencia Válida</span>
              <span className="text-sm font-bold text-on-surface tabular-nums">
                {validation.valid.toLocaleString()} destinatarios
              </span>
              <span className="text-xs text-secondary">{validation.excluded} excluidos</span>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-secondary">Modalidad de Envío</span>
              <span className="text-sm font-bold text-on-surface">
                {sendOption === 'ahora' ? 'Envío Inmediato' : `Programado: ${scheduledDate} ${scheduledTime}`}
              </span>
              <span className="text-xs text-secondary">Cadencia: ~45 msgs/min (Antispam Meta)</span>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-secondary">Cálculo de Créditos</span>
              <span className="text-sm font-bold text-on-surface tabular-nums">
                {estimatedCredits.toLocaleString()} créditos
              </span>
              <span className="text-xs text-secondary">
                {hasMedia ? '1.2 créditos por contacto (con multimedia)' : '1 crédito por contacto (solo texto)'}
              </span>
            </div>
          </div>

          {/* Mensaje preview card */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
            <span className="text-xs font-semibold text-secondary">Contenido de mensaje procesado:</span>
            <p className="text-xs text-on-surface italic leading-relaxed whitespace-pre-line">
              "{getRenderedPreview()}"
            </p>
          </div>

          {/* Verificación estricta de saldo */}
          {!hasEnoughCredits ? (
            <div className="p-4 rounded-xl bg-error-container text-on-error-container border border-error/20 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Icon name="error" size={22} className="text-error" />
                <h4 className="font-bold text-sm">No tienes suficientes créditos para realizar esta campaña.</h4>
              </div>
              <p className="text-xs text-on-error-container">
                Esta campaña requiere <strong className="tabular-nums">{estimatedCredits.toLocaleString()} créditos</strong>, pero tu saldo disponible es de solo <strong className="tabular-nums">{userBalance.toLocaleString()} créditos</strong>.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/billing')}
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs hover:bg-primary-container shadow-xs"
                >
                  Actualizar plan
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 rounded-lg bg-surface-container-low text-secondary font-semibold text-xs hover:bg-surface-container"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="check_circle" size={20} className="text-emerald-600" />
                <span className="text-xs font-semibold">Saldo disponible suficiente ({userBalance.toLocaleString()} cr)</span>
              </div>
              <span className="text-xs font-bold text-emerald-800">
                Restarán {(userBalance - estimatedCredits).toLocaleString()} cr
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-surface-container-low">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-4 h-11 rounded-lg text-xs font-semibold text-secondary hover:bg-surface-container-low"
            >
              Atrás
            </button>
            <button
              type="button"
              disabled={!hasEnoughCredits}
              onClick={handleConfirmAndLaunch}
              className={`px-7 h-12 rounded-xl text-on-primary font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-98 ${
                hasEnoughCredits
                  ? 'bg-primary hover:bg-primary-container cursor-pointer'
                  : 'bg-outline/50 cursor-not-allowed opacity-60'
              }`}
            >
              <Icon name="rocket_launch" size={20} />
              <span>Confirmar y Lanzar Campaña</span>
            </button>
          </div>
        </div>
      )}

      {/* AI Message Modal */}
      <AiMessageModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApply={(text) => setMessageText(text)}
      />

      {/* Test Send Modal */}
      <TestSendModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        messageText={messageText}
        channelName={selectedChannel.toUpperCase()}
      />
    </div>
  );
};
