import { useData } from '../hooks/useData';
import type { Company } from '../types';
import SEO from '../components/SEO';
import InquiryForm from '../components/ui/InquiryForm';
import Breadcrumb from '../components/ui/Breadcrumb';
import { Phone, Mail, MapPin, MessageCircle, Clock, Globe, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const { data: company } = useData<Company>('/data/company.json');

  return (
    <>
      <SEO
        title="Contact HomeStyle Furniture — B2B Sales Inquiries & Wholesale Quotes"
        description="Contact our sales team for wholesale furniture inquiries, OEM/ODM quotes, and product information. Response within 24 hours."
      />
      <div className="bg-slate-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb crumbs={[{ label: 'Contact' }]} />
            <h1 className="text-3xl font-black text-slate-900 mt-3">Contact Our Sales Team</h1>
            <p className="text-slate-500 text-sm mt-1">We respond to all inquiries within 24 hours, Mon–Sat.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Contact info */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
                <h3 className="font-black text-slate-800 mb-5">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: 'Phone', value: company?.phone, href: company?.phone ? `tel:${company.phone}` : undefined },
                    { icon: Mail, label: 'Email', value: company?.email, href: company?.email ? `mailto:${company.email}` : undefined },
                    { icon: MessageCircle, label: 'WhatsApp', value: company?.whatsapp, href: company?.whatsapp ? `https://wa.me/${company.whatsapp.replace(/\D/g, '')}` : undefined },
                  ].map((item) => {
                    if (!item.value) return null;
                    const Icon = item.icon;
                    const Wrapper = item.href ? 'a' : 'div';
                    return (
                      <Wrapper
                        key={item.label}
                        href={item.href}
                        target={item.icon === MessageCircle ? '_blank' : undefined}
                        rel={item.icon === MessageCircle ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-amber-100 transition-colors">
                          <Icon size={15} className="text-amber-600" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.label}</div>
                          <div className="text-sm font-semibold text-slate-700 group-hover:text-amber-600 transition-colors">{item.value}</div>
                        </div>
                      </Wrapper>
                    );
                  })}
                  {company?.address && (
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin size={15} className="text-amber-600" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Address</div>
                        <div className="text-sm text-slate-600 leading-relaxed">{company.address}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={15} className="text-amber-500" />
                  <h3 className="font-black text-slate-800">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { day: 'Mon – Fri', hours: '8:00 AM – 6:00 PM' },
                    { day: 'Saturday', hours: '9:00 AM – 3:00 PM' },
                    { day: 'Sunday', hours: 'Email only' },
                  ].map((t) => (
                    <div key={t.day} className="flex justify-between">
                      <span className="text-slate-500">{t.day}</span>
                      <span className="text-slate-800 font-semibold">{t.hours}</span>
                    </div>
                  ))}
                  <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-50">China Standard Time (CST, UTC+8)</p>
                </div>
              </div>

              {/* Markets */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Globe size={15} className="text-amber-500" />
                  <h3 className="font-black text-slate-800">Main Markets</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(company?.mainMarkets || ['North America', 'Europe', 'Australia', 'Middle East', 'SE Asia']).map((m) => (
                    <span key={m} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">{m}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquiry form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-100 shadow-card">
              <div className="mb-6">
                <h3 className="font-black text-slate-800 text-xl mb-1">Send an Inquiry</h3>
                <p className="text-slate-500 text-sm">
                  Fill in your requirements and we'll reply within 24 hours with a tailored quotation.
                </p>
              </div>
              <InquiryForm />
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-8 bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-card h-64">
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-slate-50">
              <MapPin size={28} className="text-amber-500" />
              <div className="text-center">
                <p className="font-bold text-slate-700">{company?.name || 'HomeStyle Furniture Co., Ltd.'}</p>
                <p className="text-sm text-slate-400 mt-0.5">{company?.address}</p>
              </div>
              {company?.googleMaps && (
                <a
                  href={company.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Open in Google Maps <ArrowRight size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
