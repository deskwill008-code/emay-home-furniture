import { useParams, Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import type { Product, Company } from '../types';
import SEO from '../components/SEO';
import InquiryForm from '../components/ui/InquiryForm';
import Breadcrumb from '../components/ui/Breadcrumb';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { buildWhatsAppMessage } from '../utils';
import { useState } from 'react';
import {
  MessageCircle, Download, Share2, CheckCircle, Package,
  Clock, Shield, Truck, Tag, ChevronLeft, ChevronRight, ZoomIn,
  Star, ArrowRight,
} from 'lucide-react';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: products, loading } = useData<Product[]>('/data/products.json');
  const { data: company } = useData<Company>('/data/company.json');
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'inquiry'>('details');

  if (loading) return <LoadingSpinner />;

  const product = products?.find((p) => p.slug === slug && p.published);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl font-black text-slate-100 mb-4">404</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h1>
          <Link to="/products" className="text-amber-600 font-semibold underline">Browse all products</Link>
        </div>
      </div>
    );
  }

  const related = (products || [])
    .filter((p) => p.category === product.category && p.id !== product.id && p.published)
    .slice(0, 4);

  const whatsappUrl = company ? buildWhatsAppMessage(product.name, product.model, company.whatsapp) : '#';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand },
    image: product.gallery,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      seller: { '@type': 'Organization', name: 'HomeStyle Furniture Co., Ltd.' },
    },
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  return (
    <>
      <SEO
        title={product.seoTitle}
        description={product.seoDescription}
        keywords={product.metaKeywords}
        ogImage={product.featuredImage}
        ogType="product"
        schema={schema}
      />

      <div className="bg-white">
        {/* Breadcrumb */}
        <div className="bg-slate-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <Breadcrumb
              crumbs={[
                { label: 'Products', href: '/products' },
                { label: product.name },
              ]}
            />
          </div>
        </div>

        {/* Main product layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">

            {/* ── Gallery ── */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 group" style={{ aspectRatio: '4/3' }}>
                <img
                  src={product.gallery[activeImage] || product.featuredImage}
                  alt={`${product.name} - view ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Zoom hint */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={13} className="text-slate-500" />
                  <span className="text-[11px] text-slate-500 font-medium">Zoom</span>
                </div>
                {/* Nav arrows */}
                {product.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage((p) => Math.max(0, p - 1))}
                      disabled={activeImage === 0}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-xl flex items-center justify-center shadow-md transition-all disabled:opacity-30 active:scale-95"
                    >
                      <ChevronLeft size={18} className="text-slate-700" />
                    </button>
                    <button
                      onClick={() => setActiveImage((p) => Math.min(product.gallery.length - 1, p + 1))}
                      disabled={activeImage === product.gallery.length - 1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-xl flex items-center justify-center shadow-md transition-all disabled:opacity-30 active:scale-95"
                    >
                      <ChevronRight size={18} className="text-slate-700" />
                    </button>
                  </>
                )}
                {/* Image counter */}
                {product.gallery.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                    {activeImage + 1} / {product.gallery.length}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {product.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative flex-shrink-0 w-[72px] h-[72px] rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === i ? 'border-amber-500 shadow-amber' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product Info ── */}
            <div>
              {/* Status badges */}
              <div className="flex items-center gap-2 mb-3">
                {product.featured && (
                  <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                    <Star size={9} className="fill-amber-500 text-amber-500" />
                    Featured
                  </span>
                )}
                <span className="flex items-center gap-1 bg-green-50 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-green-200">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  In Production
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 mb-1">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{product.name}</h1>
                <button
                  onClick={handleShare}
                  className="flex-shrink-0 p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  aria-label="Share this product"
                >
                  <Share2 size={17} />
                </button>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm text-slate-400">Model: <strong className="text-slate-600">{product.model}</strong></span>
                <span className="text-slate-300">·</span>
                <span className="text-sm text-slate-400">SKU: <strong className="text-slate-600">{product.sku}</strong></span>
              </div>

              <p className="text-slate-600 leading-relaxed mb-6 text-[15px]">{product.shortDescription}</p>

              {/* Key specs grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: Tag, label: 'MOQ', value: product.moq },
                  { icon: Clock, label: 'Lead Time', value: product.leadTime },
                  { icon: Shield, label: 'Warranty', value: product.warranty },
                  { icon: Package, label: 'Material', value: product.material },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                      <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={15} className="text-amber-600" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.label}</div>
                        <div className="text-sm font-bold text-slate-700 leading-tight">{item.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-2">
                    Available Finishes ({product.colors.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span key={color} className="px-3 py-1.5 bg-white border border-slate-200 hover:border-amber-400 rounded-lg text-xs font-semibold text-slate-600 cursor-default transition-colors">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex flex-col gap-3 mb-5">
                <button
                  onClick={() => setActiveTab('inquiry')}
                  className="flex items-center justify-center gap-2 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all hover:shadow-amber text-[15px] active:scale-[0.99]"
                >
                  <Truck size={18} />
                  Request a Quote
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all text-[15px]"
                >
                  <MessageCircle size={18} />
                  WhatsApp Inquiry
                </a>
              </div>
              {product.pdfCatalog && (
                <a
                  href={product.pdfCatalog}
                  download
                  className="flex items-center justify-center gap-2 py-3 border border-slate-200 hover:border-amber-400 text-slate-600 hover:text-amber-600 font-semibold rounded-xl transition-all text-sm"
                >
                  <Download size={15} />
                  Download Product Catalog
                </a>
              )}
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="mt-16">
            <div className="flex gap-1 border-b border-slate-100 mb-8">
              {[
                { id: 'details' as const, label: 'Product Details' },
                { id: 'specs' as const, label: 'Specifications' },
                { id: 'inquiry' as const, label: 'Request a Quote' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3.5 text-sm font-bold rounded-t-lg transition-colors border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-amber-500 text-amber-600 bg-amber-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 animate-fade-in">
                <div className="lg:col-span-3">
                  <h3 className="font-bold text-slate-800 text-base mb-4">Full Description</h3>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line mb-7">{product.fullDescription}</p>

                  {product.features.length > 0 && (
                    <div>
                      <h4 className="font-bold text-slate-800 mb-3">Key Features</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                            <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="lg:col-span-2">
                  {product.applications.length > 0 && (
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-3">Ideal Applications</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.applications.map((app) => (
                          <span key={app} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl animate-fade-in">
                <div className="overflow-hidden rounded-2xl border border-slate-100">
                  {[
                    { label: 'Product Model', value: product.model },
                    { label: 'SKU', value: product.sku },
                    { label: 'Material', value: product.material },
                    { label: 'Available Colors', value: product.colors.join(', ') },
                    { label: 'Dimensions', value: product.dimensions },
                    { label: 'Product Weight', value: product.weight },
                    { label: 'Package Size', value: product.packageSize },
                    { label: 'Min. Order Qty', value: product.moq },
                    { label: 'Lead Time', value: product.leadTime },
                    { label: 'Warranty', value: product.warranty },
                  ].map((row, i) => (
                    <div key={row.label} className={`flex ${i % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}`}>
                      <div className="w-40 sm:w-48 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex-shrink-0 border-r border-slate-100 flex items-center">
                        {row.label}
                      </div>
                      <div className="flex-1 px-5 py-3.5 text-sm text-slate-800 font-medium">{row.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inquiry' && (
              <div className="max-w-2xl animate-fade-in">
                <InquiryForm productName={product.name} productModel={product.model} />
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className="bg-slate-50 border-t border-slate-100 py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-7">
                <h2 className="font-bold text-slate-800 text-xl">Related Products</h2>
                <Link to={`/categories/${product.category}`} className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors">
                  More in this category <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.slug}`}
                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-50">
                      <img src={p.featuredImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{p.model}</p>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-2">{p.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
