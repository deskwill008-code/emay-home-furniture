import { useState } from 'react';
import { useData } from '../hooks/useData';
import type { Blog } from '../types';
import SEO from '../components/SEO';
import BlogCard from '../components/ui/BlogCard';
import { SkeletonCard } from '../components/ui/LoadingSpinner';
import Breadcrumb from '../components/ui/Breadcrumb';
import { Search } from 'lucide-react';

export default function BlogPage() {
  const { data: blogs, loading } = useData<Blog[]>('/data/blogs.json');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const published = (blogs || []).filter((b) => b.published);
  const blogCategories = [...new Set(published.map((b) => b.category))];

  const filtered = published
    .filter((b) => !selectedCategory || b.category === selectedCategory)
    .filter((b) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q);
    });

  return (
    <>
      <SEO
        title="B2B Furniture Industry Blog | HomeStyle Furniture Manufacturer"
        description="Sourcing guides, trends, and insights for furniture buyers, distributors, and importers. OEM/ODM advice, shipping tips, and market intelligence."
      />
      <div className="bg-slate-50 min-h-screen">
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb crumbs={[{ label: 'Blog' }]} />
            <h1 className="text-3xl font-black text-slate-900 mt-3">Industry Blog</h1>
            <p className="text-slate-500 text-sm mt-1">Sourcing guides, trends, and insights for furniture buyers worldwide.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  !selectedCategory ? 'bg-amber-500 text-white shadow-amber' : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-300'
                }`}
              >
                All
              </button>
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat ? 'bg-amber-500 text-white shadow-amber' : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">No articles found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
