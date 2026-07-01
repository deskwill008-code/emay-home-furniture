import { useParams, Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import type { Blog } from '../types';
import SEO from '../components/SEO';
import BlogCard from '../components/ui/BlogCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Breadcrumb from '../components/ui/Breadcrumb';
import { formatDate } from '../utils';
import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: blogs, loading } = useData<Blog[]>('/data/blogs.json');

  if (loading) return <LoadingSpinner />;

  const blog = blogs?.find((b) => b.slug === slug && b.published);

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Article Not Found</h1>
          <Link to="/blog" className="text-amber-600 font-semibold underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const related = (blogs || []).filter((b) => b.category === blog.category && b.id !== blog.id && b.published).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage,
    datePublished: blog.publishDate,
    author: { '@type': 'Person', name: blog.author },
    publisher: {
      '@type': 'Organization',
      name: 'HomeStyle Furniture Co., Ltd.',
      logo: { '@type': 'ImageObject', url: '/uploads/logos/logo.svg' },
    },
  };

  return (
    <>
      <SEO
        title={blog.seoTitle}
        description={blog.seoDescription}
        ogImage={blog.coverImage}
        ogType="article"
        schema={schema}
      />
      <div className="bg-white">
        {/* Hero */}
        <div className="relative h-72 sm:h-[420px] overflow-hidden">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end max-w-4xl mx-auto px-4 sm:px-6 pb-10">
            <Breadcrumb crumbs={[{ label: 'Blog', href: '/blog' }, { label: blog.title }]} light />
            <span className="mt-3 inline-block bg-amber-500 text-white text-[11px] font-bold px-3 py-1 rounded-full w-fit">
              {blog.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-3 leading-tight">
              {blog.title}
            </h1>
          </div>
        </div>

        {/* Article */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><User size={14} />{blog.author}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(blog.publishDate)}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Tag size={13} className="text-slate-400" />
              {blog.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-full">{tag}</span>
              ))}
            </div>
            <button
              onClick={() => navigator.share?.({ title: blog.title, url: window.location.href })}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-600 transition-colors font-medium"
            >
              <Share2 size={14} />Share
            </button>
          </div>

          {/* Content */}
          <div className="prose-article space-y-4">
            {blog.content.split('\n\n').map((block, i) => {
              if (block.startsWith('## ')) {
                return (
                  <h2 key={i} className="text-xl font-black text-slate-900 mt-10 mb-3 first:mt-0">
                    {block.slice(3)}
                  </h2>
                );
              }
              if (block.startsWith('**1.') || block.startsWith('**2.') || block.startsWith('**3.')) {
                return (
                  <div key={i} className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                    <p className="text-sm text-slate-700 font-semibold">{block.replace(/\*\*/g, '')}</p>
                  </div>
                );
              }
              return (
                <p key={i} className="text-slate-600 leading-relaxed text-[15px]">
                  {block.replace(/\*\*([^*]+)\*\*/g, (_, t) => t)}
                </p>
              );
            })}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              <ArrowLeft size={15} />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="bg-slate-50 border-t border-slate-100 py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-black text-slate-800 text-xl mb-7">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((b) => <BlogCard key={b.id} blog={b} />)}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
