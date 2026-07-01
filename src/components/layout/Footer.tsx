import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Linkedin, Youtube, MessageCircle, ArrowRight, Send } from 'lucide-react';
import { useData } from '../../hooks/useData';
import type { Company, Category } from '../../types';

export default function Footer() {
  const { data: company } = useData<Company>('/data/company.json');
  const { data: categories } = useData<Category[]>('/data/categories.json');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Top CTA strip */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-white font-bold text-lg">Ready to start your wholesale order?</p>
            <p className="text-slate-400 text-sm mt-0.5">Get a customized quotation within 24 hours.</p>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-all hover:shadow-amber"
          >
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                <span className="text-white font-black text-sm">HS</span>
              </div>
              <div className="leading-tight">
                <div className="text-white font-bold text-base">HomeStyle</div>
                <div className="text-slate-500 text-[9px] uppercase tracking-[0.18em]">Furniture Co.</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 mb-5">
              {company?.description || 'Premium B2B home furniture manufacturer for global distributors and OEM/ODM partners since 2005.'}
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {company?.certifications?.map((cert) => (
                <span
                  key={cert}
                  className="text-[10px] font-semibold px-2 py-0.5 bg-slate-800 text-slate-400 rounded border border-slate-700/50"
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {company?.facebook && (
                <a
                  href={company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={15} />
                </a>
              )}
              {company?.linkedin && (
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
              )}
              {company?.youtube && (
                <a
                  href={company.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={15} />
                </a>
              )}
              {company?.whatsapp && (
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'All Products', href: '/products' },
                { label: 'Download Catalogs', href: '/catalogs' },
                { label: 'Factory Tour', href: '/factory' },
                { label: 'Industry Blog', href: '/blog' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-500 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-slate-700 rounded-full group-hover:bg-amber-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Product Categories</h3>
            <ul className="space-y-2.5">
              {categories?.filter((c) => c.published).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="text-sm text-slate-500 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-slate-700 rounded-full group-hover:bg-amber-400 transition-colors" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Contact Us</h3>
            <ul className="space-y-3.5 mb-7">
              {company?.phone && (
                <li>
                  <a href={`tel:${company.phone}`} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-amber-500/20 transition-colors">
                      <Phone size={13} className="text-slate-400 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-600 uppercase tracking-wider font-medium">Phone</div>
                      <div className="text-sm text-slate-300 group-hover:text-amber-400 transition-colors">{company.phone}</div>
                    </div>
                  </a>
                </li>
              )}
              {company?.email && (
                <li>
                  <a href={`mailto:${company.email}`} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-amber-500/20 transition-colors">
                      <Mail size={13} className="text-slate-400 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-600 uppercase tracking-wider font-medium">Email</div>
                      <div className="text-sm text-slate-300 group-hover:text-amber-400 transition-colors">{company.email}</div>
                    </div>
                  </a>
                </li>
              )}
              {company?.address && (
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={13} className="text-slate-400" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-600 uppercase tracking-wider font-medium">Address</div>
                    <div className="text-sm text-slate-400 leading-relaxed">{company.address}</div>
                  </div>
                </li>
              )}
            </ul>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Newsletter</h3>
              {subscribed ? (
                <div className="bg-green-900/30 border border-green-800/50 rounded-xl p-3 text-center">
                  <p className="text-green-400 text-xs font-medium">Subscribed! Thank you.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 min-w-0 transition-all"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 w-9 h-9 bg-amber-500 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send size={14} className="text-white" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-slate-600">
            © {year} {company?.name || 'HomeStyle Furniture Co., Ltd.'}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-slate-600">
            <span>Proudly serving 60+ countries</span>
            <span className="text-slate-800">·</span>
            <span>Foshan, Guangdong, China</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
