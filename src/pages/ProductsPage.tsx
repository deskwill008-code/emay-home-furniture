import { useState } from 'react';
import { useData } from '../hooks/useData';
import type { Product, Category } from '../types';
import SEO from '../components/SEO';
import ProductCard from '../components/ui/ProductCard';
import { SkeletonCard } from '../components/ui/LoadingSpinner';
import Breadcrumb from '../components/ui/Breadcrumb';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'featured', label: 'Featured First' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
];

export default function ProductsPage() {
  const { data: products, loading } = useData<Product[]>('/data/products.json');
  const { data: categories } = useData<Category[]>('/data/categories.json');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sort, setSort] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = (products || [])
    .filter((p) => p.published)
    .filter((p) => !selectedCategory || p.category === selectedCategory)
    .filter((p) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sort === 'featured') return Number(b.featured) - Number(a.featured);
      if (sort === 'name-asc') return a.name.localeCompare(b.name);
      if (sort === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });

  const hasFilters = !!search || !!selectedCategory;

  return (
    <>
      <SEO
        title="B2B Home Furniture Products | HomeStyle Manufacturer"
        description="Browse wholesale home furniture: computer desks, ergonomic chairs, coffee tables, bookshelves, and storage solutions. MOQ available. OEM/ODM welcome."
      />
      <div className="bg-slate-50 min-h-screen">
        {/* Page Header */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb crumbs={[{ label: 'Products' }]} />
            <div className="mt-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h1 className="text-3xl font-black text-slate-900">All Products</h1>
                <p className="text-slate-500 text-sm mt-1">
                  {loading ? '…' : `${filtered.length} products`} available for wholesale
                </p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700"
              >
                <SlidersHorizontal size={15} />
                Filters {hasFilters && <span className="w-2 h-2 bg-amber-500 rounded-full" />}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-7">

            {/* Sidebar */}
            <aside className={`w-56 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} sm:block`}>
              <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden sticky top-28">
                {/* Search */}
                <div className="p-4 border-b border-slate-50">
                  <div className="relative">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search products…"
                      className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Category filter */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</p>
                    {hasFilters && (
                      <button
                        onClick={() => { setSearch(''); setSelectedCategory(''); }}
                        className="text-[10px] text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-0.5"
                      >
                        <X size={10} />Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        !selectedCategory ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      All Products
                    </button>
                    {categories?.filter((c) => c.published).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                          selectedCategory === cat.slug ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-1">
                          <span className="line-clamp-1">{cat.name}</span>
                          <span className="text-slate-400 text-[10px] flex-shrink-0">({cat.productCount})</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="p-4 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Sort By</p>
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="w-full text-xs py-2 pl-3 pr-7 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 bg-white appearance-none"
                    >
                      {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1 min-w-0">
              {/* Mobile search */}
              <div className="sm:hidden mb-4 relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products…"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                />
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <Search size={24} className="text-slate-400" />
                  </div>
                  <p className="text-slate-700 font-semibold mb-1">No products found</p>
                  <p className="text-slate-400 text-sm mb-4">Try adjusting your search or filters</p>
                  <button
                    onClick={() => { setSearch(''); setSelectedCategory(''); }}
                    className="text-amber-600 text-sm font-semibold underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
