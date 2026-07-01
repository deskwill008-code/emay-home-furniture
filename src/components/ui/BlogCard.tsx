import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { formatDate } from '../../utils';
import type { Blog } from '../../types';

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-[16/9] bg-slate-50">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1 bg-white/95 backdrop-blur-sm text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
            <Tag size={9} />
            {blog.category}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-slate-800 text-sm leading-snug mb-2 group-hover:text-amber-600 transition-colors line-clamp-2 flex-1">
          {blog.title}
        </h3>
        <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">{blog.excerpt}</p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><User size={10} />{blog.author}</span>
            <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(blog.publishDate)}</span>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 group-hover:gap-1.5 transition-all">
            Read <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
}
