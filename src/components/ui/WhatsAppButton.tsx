import { useData } from '../../hooks/useData';
import type { Company } from '../../types';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const { data: company } = useData<Company>('/data/company.json');
  const [dismissed, setDismissed] = useState(false);

  if (!company?.whatsapp || dismissed) return null;

  const number = company.whatsapp.replace(/\D/g, '');
  const msg = encodeURIComponent('Hello! I would like to inquire about your furniture products. Please provide more information and a quotation.');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <div className="flex items-center gap-2 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-slate-100 px-4 py-2.5 pr-2 animate-fade-in">
        <div>
          <p className="text-xs font-bold text-slate-800">Chat with us</p>
          <p className="text-[10px] text-slate-500">Usually replies in minutes</p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="ml-2 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <X size={12} />
        </button>
      </div>

      {/* Button */}
      <a
        href={`https://wa.me/${number}?text=${msg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-40 pulse-ring" />
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
