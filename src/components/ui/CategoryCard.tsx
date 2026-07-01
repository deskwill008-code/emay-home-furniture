import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import type { Category } from '../../types';

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group relative rounded-2xl overflow-hidden bg-slate-100 block"
      style={{ aspectRatio: '4/3' }}
    >
      <img
        src={category.coverImage}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
        loading="lazy"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Package size={11} className="text-amber-400" />
          <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">
            {category.productCount} Products
          </span>
        </div>
        <h3 className="text-white font-bold text-base leading-tight mb-1">{category.name}</h3>
        <p className="text-white/65 text-xs line-clamp-1 mb-3">{category.description}</p>
        <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-bold transform translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          Browse Category <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  );
}
