import { useParams, Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import type { Category, Product } from '../types';
import SEO from '../components/SEO';
import ProductCard from '../components/ui/ProductCard';
import { SkeletonCard } from '../components/ui/LoadingSpinner';
import Breadcrumb from '../components/ui/Breadcrumb';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: categories, loading: cLoading } = useData<Category[]>('/data/categories.json');
  const { data: products, loading: pLoading } = useData<Product[]>('/data/products.json');

  const category = categories?.find((c) => c.slug === slug && c.published);
  const catProducts = (products || []).filter((p) => p.category === slug && p.published);
  const loading = cLoading || pLoading;

  if (!loading && !category) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl font-black text-slate-100 mb-4">404</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Category Not Found</h1>
          <Link to="/categories" className="text-amber-600 font-semibold underline">Browse all categories</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={category?.seoTitle || `${category?.name} — HomeStyle Furniture`}
        description={category?.seoDescription || ''}
        ogImage={category?.coverImage}
      />
      <div className="bg-slate-50 min-h-screen">
        {/* Hero */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img
            src={category?.coverImage || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200'}
            alt={category?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/20" />
          <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <Breadcrumb
              crumbs={[
                { label: 'Categories', href: '/categories' },
                { label: category?.name || '…' },
              ]}
              light
            />
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-3">{category?.name}</h1>
            <p className="text-white/70 text-sm mt-2 max-w-xl">{category?.description}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-7">
            <p className="text-slate-500 text-sm">
              {loading ? '…' : `${catProducts.length} products`} in this category
            </p>
            <Link
              to="/contact"
              className="flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              Request a Quote <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : catProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 mb-3">No products in this category yet.</p>
              <Link to="/products" className="text-amber-600 font-semibold underline text-sm">Browse all products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {catProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Inquiry CTA */}
          <div className="mt-14 bg-slate-900 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-black text-xl mb-1">Interested in {category?.name}?</h3>
              <p className="text-slate-400 text-sm">Contact our sales team for wholesale pricing and MOQ details.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link to="/contact" className="btn-primary text-sm">
                Get a Quote <ArrowRight size={15} />
              </Link>
              <a
                href="https://wa.me/8613800138000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold text-sm rounded-xl transition-colors"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
