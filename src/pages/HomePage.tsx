import { useData } from '../hooks/useData';
import type { Product, Category, Testimonial, Blog } from '../types';
import SEO from '../components/SEO';
import ProductCard from '../components/ui/ProductCard';
import CategoryCard from '../components/ui/CategoryCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import BlogCard from '../components/ui/BlogCard';
import { SkeletonCard } from '../components/ui/LoadingSpinner';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight, Shield, Factory, Settings, Clock, Globe, Headphones,
  Download, ChevronRight, CheckCircle, Play, Star, Award, Zap,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  shield: Shield, factory: Factory, settings: Settings,
  clock: Clock, globe: Globe, headphones: Headphones, award: Award,
  zap: Zap, star: Star, download: Download,
};

export default function HomePage() {
  const { data: products, loading: pLoading } = useData<Product[]>('/data/products.json');
  const { data: categories, loading: cLoading } = useData<Category[]>('/data/categories.json');
  const { data: testimonials } = useData<Testimonial[]>('/data/testimonials.json');
  const { data: blogs } = useData<Blog[]>('/data/blogs.json');

  const featured = products?.filter((p) => p.published && p.featured).slice(0, 4) || [];
  const featuredCats = categories?.filter((c) => c.published).slice(0, 6) || [];
  const featuredTestimonials = testimonials?.filter((t) => t.published).slice(0, 6) || [];
  const latestBlogs = blogs?.filter((b) => b.published).slice(0, 3) || [];

  const whyReasons = [
    { icon: 'shield', title: 'ISO 9001 Certified', desc: 'Rigorous quality management ensuring consistent product quality in every production batch.' },
    { icon: 'factory', title: '50,000 m² Factory', desc: 'State-of-the-art manufacturing in Foshan — the furniture capital of China.' },
    { icon: 'settings', title: 'OEM / ODM Services', desc: 'Full custom manufacturing with your brand, designs, and specifications at scale.' },
    { icon: 'clock', title: '98.5% On-Time Delivery', desc: 'Dedicated production scheduling and logistics coordination for every order.' },
    { icon: 'globe', title: '60+ Countries Served', desc: 'Deep expertise with US, EU, Australian, and GCC import requirements.' },
    { icon: 'headphones', title: 'Dedicated Account Managers', desc: 'Named contacts available via email, WhatsApp, and video call for every client.' },
  ];

  const processSteps = [
    { step: '01', title: 'Inquiry & Quotation', desc: 'Submit requirements. Receive a detailed quotation within 24 hours.' },
    { step: '02', title: 'Sample Development', desc: 'Custom samples to your specs for approval before bulk production.' },
    { step: '03', title: 'Production', desc: 'Full-scale manufacturing with quality checks at every stage.' },
    { step: '04', title: 'QC Inspection', desc: 'Pre-shipment inspection. Third-party inspection available.' },
    { step: '05', title: 'Export & Shipping', desc: 'Professional export packing and full shipping documentation.' },
    { step: '06', title: 'After-Sales Support', desc: 'Dedicated after-sales service to ensure your satisfaction.' },
  ];

  return (
    <>
      <SEO
        title="HomeStyle Furniture — Premium B2B Home Furniture Manufacturer & OEM Supplier"
        description="Leading B2B home furniture manufacturer in Foshan, China. Computer desks, ergonomic chairs, coffee tables, and storage solutions. ISO 9001 certified. OEM/ODM. 60+ countries."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'HomeStyle Furniture Co., Ltd.',
          description: 'B2B home furniture manufacturer',
          url: 'https://homestylefurniture.com',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'CN',
            addressRegion: 'Guangdong',
            addressLocality: 'Foshan',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            availableLanguage: 'English',
          },
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/30" />
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/25 text-amber-400 text-[11px] font-bold px-4 py-2 rounded-full mb-7 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              ISO 9001 Certified Manufacturer · Est. 2005
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.1] tracking-tight mb-6">
              Premium Home Furniture{' '}
              <span className="text-gradient">Manufacturer</span>
              <br />
              for Global Distributors
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              Partner with HomeStyle — China's trusted B2B furniture manufacturer. Computer desks, ergonomic chairs, coffee tables & storage solutions. OEM/ODM available.
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <Link to="/products" className="btn-primary text-sm px-7 py-3.5 text-base hover:shadow-[0_8px_24px_rgba(245,158,11,0.35)]">
                Browse Products
                <ArrowRight size={17} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 transition-all backdrop-blur-sm text-base"
              >
                Request a Quote
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: '19+', label: 'Years Experience' },
                { value: '60+', label: 'Countries Served' },
                { value: '500+', label: 'Team Members' },
                { value: '200K+', label: 'Annual Output' },
              ].map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">{stat.value}</div>
                  <div className="text-[11px] text-white/60 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-5 h-8 border border-white/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {['ISO 9001:2015', 'BSCI Certified', 'FSC Certified', 'CARB Compliant', 'CE Marked'].map((cert) => (
              <div key={cert} className="flex items-center gap-2">
                <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-500">{cert}</span>
              </div>
            ))}
            <div className="hidden sm:flex items-center gap-2">
              <Shield size={14} className="text-amber-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-slate-500">SGS & Intertek Tested</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="section-label">Product Range</span>
              <h2 className="section-title">Explore Our Categories</h2>
              <p className="section-subtitle max-w-lg">
                From home offices to living rooms — premium B2B furniture for every space.
              </p>
            </div>
            <Link
              to="/categories"
              className="flex-shrink-0 flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              All Categories <ArrowRight size={15} />
            </Link>
          </div>

          {cLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] shimmer rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredCats.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="section-label">Top Sellers</span>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link
              to="/products"
              className="flex-shrink-0 flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              All Products <ArrowRight size={15} />
            </Link>
          </div>
          {pLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label text-amber-400">Our Advantages</span>
            <h2 className="section-title text-white">Why Global Buyers Choose HomeStyle</h2>
            <p className="section-subtitle text-slate-400 max-w-2xl mx-auto">
              Trusted by 500+ distributors across 60 countries for consistent quality, on-time delivery, and genuine partnership.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyReasons.map((r) => {
              const Icon = ICON_MAP[r.icon] || Shield;
              return (
                <div
                  key={r.title}
                  className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/30 rounded-2xl p-6 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-amber-500/15 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/25 transition-colors">
                    <Icon size={22} className="text-amber-400" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{r.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FACTORY ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-ambient aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="HomeStyle Furniture Factory"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-5 -right-5 bg-amber-500 text-white rounded-2xl px-6 py-4 shadow-amber">
                <div className="text-3xl font-black">19+</div>
                <div className="text-[11px] font-semibold opacity-90 mt-0.5">Years Manufacturing</div>
              </div>
              {/* Play button overlay */}
              <Link
                to="/factory"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 group"
              >
                <Play size={22} className="text-slate-800 ml-1 group-hover:text-amber-600 transition-colors" />
              </Link>
            </div>

            {/* Text side */}
            <div>
              <span className="section-label">Factory Tour</span>
              <h2 className="section-title mb-5">State-of-the-Art Manufacturing</h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Our 50,000 m² facility in Foshan, Guangdong combines CNC technology, automated finishing lines, and strict quality control at every production stage. Founded in 2005, we have grown into a trusted partner for distributors in 60+ countries.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Every product undergoes 3-stage quality inspection before shipment — meeting international standards including BIFMA, EN, and ASTM.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: '50,000 m²', label: 'Factory Area' },
                  { value: '200,000+', label: 'Pieces/Year' },
                  { value: '98.5%', label: 'On-Time Rate' },
                  { value: '< 0.3%', label: 'Defect Rate' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="text-2xl font-black text-amber-600">{stat.value}</div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/factory" className="btn-dark gap-2">
                View Factory Tour <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">From Concept to Container</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Our streamlined process ensures quality and transparency at every step of your order.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-amber-500 text-white rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1.5">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-8 -right-3 z-10 w-6 items-center justify-center">
                    <ChevronRight size={16} className="text-amber-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      {featuredTestimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-label">Client Reviews</span>
              <h2 className="section-title">What Our Partners Say</h2>
              <p className="section-subtitle max-w-xl mx-auto">
                Trusted by distributors and wholesalers across 60 countries.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BLOG ─────────────────────────────────────────────── */}
      {latestBlogs.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <span className="section-label">Knowledge Base</span>
                <h2 className="section-title">Latest From Our Blog</h2>
              </div>
              <Link
                to="/blog"
                className="flex-shrink-0 flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
              >
                All Articles <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CATALOG CTA ──────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Download Our Full Product Catalog
          </h2>
          <p className="text-amber-100 text-lg mb-8 max-w-xl mx-auto">
            Complete product specs, dimensions, pricing guidelines, and MOQ details — all in one document.
          </p>
          <Link
            to="/catalogs"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-amber-600 font-black rounded-2xl hover:bg-amber-50 transition-all shadow-xl text-base"
          >
            <Download size={20} />
            Download Free Catalog
          </Link>
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────────── */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label text-amber-400">Start Today</span>
          <h2 className="section-title text-white mb-4">Ready to Place Your Order?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Get a personalized quotation and product recommendation from our sales team within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary text-base px-8 py-4">
              Request a Quote <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/8613800138000?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20furniture%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all text-base"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
