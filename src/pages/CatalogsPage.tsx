import { useState } from 'react';
import { useData } from '../hooks/useData';
import type { Catalog } from '../types';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Breadcrumb from '../components/ui/Breadcrumb';
import { Link } from 'react-router-dom';
import { Download, Eye, FileText, Calendar, Globe, ArrowRight } from 'lucide-react';

const TYPES = ['All', 'Product Catalog', 'Company Profile', 'Certificate', 'Assembly Manual', 'Brochure', 'Installation Guide'];

const TYPE_COLORS: Record<string, string> = {
  'Product Catalog': 'bg-blue-50 text-blue-700 border-blue-100',
  'Company Profile': 'bg-purple-50 text-purple-700 border-purple-100',
  'Certificate': 'bg-green-50 text-green-700 border-green-100',
  'Assembly Manual': 'bg-orange-50 text-orange-700 border-orange-100',
  'Brochure': 'bg-pink-50 text-pink-700 border-pink-100',
  'Installation Guide': 'bg-cyan-50 text-cyan-700 border-cyan-100',
};

export default function CatalogsPage() {
  const { data: catalogs, loading } = useData<Catalog[]>('/data/catalogs.json');
  const [selectedType, setSelectedType] = useState('All');

  const filtered = (catalogs || [])
    .filter((c) => c.published)
    .filter((c) => selectedType === 'All' || c.type === selectedType);

  return (
    <>
      <SEO
        title="Download Center — Catalogs, Certificates & Manuals | HomeStyle Furniture"
        description="Download product catalogs, company profiles, ISO certifications, assembly manuals, and OEM/ODM brochures from HomeStyle Furniture Co., Ltd."
      />
      <div className="bg-slate-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb crumbs={[{ label: 'Download Center' }]} />
            <div className="mt-3">
              <h1 className="text-3xl font-black text-slate-900">Download Center</h1>
              <p className="text-slate-500 text-sm mt-1">
                Catalogs, certificates, assembly manuals, and company documents — free to download.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Tabs */}
          <div className="flex gap-2 flex-wrap mb-8">
            {TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedType === type
                    ? 'bg-amber-500 text-white shadow-amber'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:text-amber-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">No documents available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((catalog) => {
                const typeStyle = TYPE_COLORS[catalog.type] || 'bg-slate-50 text-slate-700 border-slate-200';
                return (
                  <div
                    key={catalog.id}
                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Cover */}
                    <div className="relative overflow-hidden bg-slate-50" style={{ aspectRatio: '3/4' }}>
                      <img
                        src={catalog.coverImage}
                        alt={catalog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${typeStyle} backdrop-blur-sm`}>
                          {catalog.type}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1">
                        <FileText size={10} className="text-white/80" />
                        <span className="text-white/80 text-[10px] font-medium">{catalog.fileSize}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-slate-800 text-sm leading-snug mb-1.5 line-clamp-2">{catalog.title}</h3>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{catalog.description}</p>
                      <div className="flex items-center gap-3 mb-4 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1"><Globe size={10} />{catalog.language}</span>
                        <span className="flex items-center gap-1"><Calendar size={10} />{catalog.version}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 hover:border-amber-400 hover:text-amber-600 text-slate-600 rounded-lg text-[11px] font-bold transition-colors">
                          <Eye size={12} />
                          Preview
                        </button>
                        <a
                          href={catalog.pdfFile}
                          download
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[11px] font-bold transition-colors"
                        >
                          <Download size={12} />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-slate-900 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-black text-white mb-2">Need a custom catalog?</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
              Contact our team and we'll prepare a custom catalog tailored to your market and product needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all hover:shadow-amber text-sm"
            >
              Contact Sales Team <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
