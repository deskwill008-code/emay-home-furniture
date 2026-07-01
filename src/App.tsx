import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Layout from './components/layout/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const CategoryDetailPage = lazy(() => import('./pages/CategoryDetailPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const CatalogsPage = lazy(() => import('./pages/CatalogsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const FactoryPage = lazy(() => import('./pages/FactoryPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <div className="text-8xl font-black text-slate-100 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h1>
        <p className="text-slate-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductDetailPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/:slug" element={<CategoryDetailPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="catalogs" element={<CatalogsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="factory" element={<FactoryPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
