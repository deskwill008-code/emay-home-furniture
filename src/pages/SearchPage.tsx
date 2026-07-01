import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import type { Product, Blog, Category } from '../types';
import SEO from '../components/SEO';
import ProductCard from '../components/ui/ProductCard';
import BlogCard from '../components/ui/BlogCard';
import { Search, Package, BookOpen, Layers } from 'lucide-react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [input, setInput] = useState(query);

  const { data: products } = useData<Product[]>('/data/products.json');
  const { data: blogs } = useData<Blog[]>('/data/blogs.json');
  const { data: categories } = useData<Category[]>('/data/categories.json');

  const q = query.toLowerCase().trim();

  const matchedProducts = q
    ? (products || []).filter((p) =>
        p.published && (
          p.name.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
        )
      )
    : [];

  const matchedBlogs = q
    ? (blogs || []).filter((b) =>
        b.published && (
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
        )
      )
    : [];

  const matchedCategories = q
    ? (categories || []).filter((c) =>
        c.published && (
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
        )
      )
    : [];

  const total = matchedProducts.length + matchedBlogs.length + matchedCategories.length;

  useEffect(() => { setInput(query); }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) navigate(`/search?q=${encodeURIComponent(input.trim())}`);
  };

  return (
    <>
      <SEO
        title={query ? `Search "${query}" | HomeStyle Furniture` : 'Search | HomeStyle Furniture'}
        description={`Search results for "${query}" — products, categories, and articles.`}
      />
      <div className="bg-slate-50 min-h-screen">
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <form onSubmit={handleSubmit} className="max-w-2xl">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search products, categories, articles…"
                  className="w-full pl-12 pr-28 py-3.5 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
            {q && (
              <p className="text-slate-500 text-sm mt-3">
                <strong className="text-slate-800">{total}</strong> results for "{query}"
              </p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {!q && (
            <div className="text-center py-20 text-slate-400">
              <Search size={40} className="mx-auto mb-4 text-slate-200" />
              <p>Enter a search term to find products, categories, and articles.</p>
            </div>
          )}

          {q && total === 0 && (
            <div className="text-center py-20">
              <Search size={40} className="mx-auto mb-4 text-slate-200" />
              <p className="text-slate-700 font-semibold mb-1">No results for "{query}"</p>
              <p className="text-slate-400 text-sm mb-4">Try a different term or browse our products.</p>
              <Link to="/products" className="text-amber-600 font-bold underline text-sm">Browse all products</Link>
            </div>
          )}

          {matchedCategories.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Layers size={16} className="text-amber-500" />
                <h2 className="font-black text-slate-800">Categories <span className="text-slate-400 font-normal text-sm">({matchedCategories.length})</span></h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.slug}`}
                    className="bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-card-hover hover:-translate-y-0.5 transition-all flex gap-4 items-center group"
                  >
                    <img src={cat.coverImage} alt={cat.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div>
                      <div className="font-bold text-slate-800 text-sm group-hover:text-amber-600 transition-colors">{cat.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{cat.productCount} products</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchedProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Package size={16} className="text-amber-500" />
                <h2 className="font-black text-slate-800">Products <span className="text-slate-400 font-normal text-sm">({matchedProducts.length})</span></h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {matchedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}

          {matchedBlogs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <BookOpen size={16} className="text-amber-500" />
                <h2 className="font-black text-slate-800">Articles <span className="text-slate-400 font-normal text-sm">({matchedBlogs.length})</span></h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {matchedBlogs.map((b) => <BlogCard key={b.id} blog={b} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
