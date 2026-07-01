import { useData } from '../hooks/useData';
import type { Category } from '../types';
import SEO from '../components/SEO';
import CategoryCard from '../components/ui/CategoryCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Breadcrumb from '../components/ui/Breadcrumb';

export default function CategoriesPage() {
  const { data: categories, loading } = useData<Category[]>('/data/categories.json');
  const published = categories?.filter((c) => c.published) || [];

  return (
    <>
      <SEO
        title="Product Categories | HomeStyle B2B Furniture Manufacturer"
        description="Browse all furniture categories: computer desks, ergonomic chairs, coffee tables, book cabinets, living room storage, and non-woven storage cabinets."
      />
      <div className="bg-slate-50 min-h-screen">
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb crumbs={[{ label: 'Categories' }]} />
            <h1 className="text-3xl font-black text-slate-900 mt-3">Product Categories</h1>
            <p className="text-slate-500 text-sm mt-1">Explore our full range of B2B furniture product categories.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {published.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
