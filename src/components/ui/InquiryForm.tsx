import { useState } from 'react';
import { Send, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import type { InquiryForm as InquiryFormType } from '../../types';
import { buildWhatsAppMessage } from '../../utils';
import { useData } from '../../hooks/useData';
import type { Company } from '../../types';

interface Props {
  productName?: string;
  productModel?: string;
  compact?: boolean;
}

const COUNTRIES = [
  'United States', 'United Kingdom', 'Australia', 'Canada', 'Germany', 'France',
  'Netherlands', 'Spain', 'Italy', 'Sweden', 'UAE', 'Saudi Arabia', 'Kuwait',
  'South Korea', 'Japan', 'Singapore', 'Malaysia', 'Thailand', 'Brazil',
  'Mexico', 'South Africa', 'Nigeria', 'India', 'New Zealand', 'Other',
];

export default function InquiryForm({ productName = '', productModel = '', compact = false }: Props) {
  const { data: company } = useData<Company>('/data/company.json');
  const [form, setForm] = useState<InquiryFormType>({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    quantity: '',
    productName,
    productModel,
    message: productName
      ? `Hello,\n\nI'm interested in your ${productName} (Model: ${productModel}).\n\nPlease send me your best wholesale quotation and catalog.\n\nThank you.`
      : '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={30} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Inquiry Received!</h3>
        <p className="text-slate-600 text-sm mb-1">
          Thank you, <strong>{form.name}</strong>.
        </p>
        <p className="text-slate-500 text-sm mb-6">
          Our sales team will respond within <strong>24 hours</strong> with a personalized quotation.
        </p>
        {company?.whatsapp && (
          <a
            href={buildWhatsAppMessage(form.productName || 'your products', form.productModel || '', company.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl transition-colors"
          >
            <MessageCircle size={16} />
            Also chat on WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product context (read-only) */}
      {(productName || productModel) && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <p className="text-xs text-amber-700">
            <span className="font-bold">Requesting quote for:</span> {productName} — {productModel}
          </p>
        </div>
      )}

      <div className={`grid grid-cols-1 ${compact ? '' : 'sm:grid-cols-2'} gap-4`}>
        <div>
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="John Smith"
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Company *</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            placeholder="Your Company Ltd."
            className="form-input"
          />
        </div>
      </div>

      <div className={`grid grid-cols-1 ${compact ? '' : 'sm:grid-cols-2'} gap-4`}>
        <div>
          <label className="form-label">Country *</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select country…</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Quantity (pcs) *</label>
          <input
            type="text"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            placeholder="e.g. 100 pcs"
            className="form-input"
          />
        </div>
      </div>

      <div className={`grid grid-cols-1 ${compact ? '' : 'sm:grid-cols-2'} gap-4`}>
        <div>
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Phone / WhatsApp</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 555 000 0000"
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label className="form-label">Message *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={compact ? 4 : 5}
          placeholder="Describe your requirements, customization needs, target market…"
          className="form-input resize-none"
        />
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm hover:shadow-amber"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send size={16} />
              Send Inquiry
            </>
          )}
        </button>

        {company?.whatsapp && (
          <a
            href={buildWhatsAppMessage(productName || 'your furniture products', productModel || '', company.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle size={16} />
            Or Chat on WhatsApp
          </a>
        )}
      </div>
    </form>
  );
}
