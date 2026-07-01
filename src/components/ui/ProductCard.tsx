import { Link } from 'react-router-dom';
import { ArrowRight, Tag, Clock, Star } from 'lucide-react';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50 aspect-[4/3]">
        <img
          src={product.featuredImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.featured && (
            <span className="flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              <Star size={9} className="fill-white" />
              Featured
            </span>
          )}
        </div>

        {/* Quick action overlay */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-full shadow">
            View Details <ArrowRight size={11} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="mb-2">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{product.model}</p>
          <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed flex-1">
          {product.shortDescription}
        </p>

        <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <Tag size={10} className="text-amber-400" />
            MOQ: {product.moq}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <Clock size={10} className="text-amber-400" />
            {product.leadTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
