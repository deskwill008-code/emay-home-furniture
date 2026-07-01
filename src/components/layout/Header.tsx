import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail, Search, ArrowRight } from 'lucide-react';
import { useData } from '../../hooks/useData';
import type { Company, Category } from '../../types';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [productsOpen, setProductsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: company } = useData<Company>('/data/company.json');
  const { data: categories } = useData<Category[]>('/data/categories.json');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setProductsOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearchOpen(false); setProductsOpen(false); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products', hasDropdown: true },
    { label: 'Categories', href: '/categories' },
    { label: 'Catalogs', href: '/catalogs' },
    { label: 'About Us', href: '/about' },
    { label: 'Factory', href: '/factory' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_20px_rgba(0,0,0,0.05)]'
          : 'bg-white shadow-sm'
      }`}
    >
      {/* Top strip */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
            {company?.phone && (
              <a
                href={`tel:${company.phone}`}
                className="flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Phone size={11} className="flex-shrink-0" />
                {company.phone}
              </a>
            )}
            {company?.email && (
              <a
                href={`mailto:${company.email}`}
                className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Mail size={11} className="flex-shrink-0" />
                {company.email}
              </a>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              ISO 9001 Certified
            </span>
            <span className="text-slate-700">·</span>
            <span>OEM / ODM Available</span>
            <span className="text-slate-700">·</span>
            <span>60+ Countries Served</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px] gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center shadow-amber group-hover:bg-amber-600 transition-colors">
              <span className="text-white font-black text-sm tracking-tight">HS</span>
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-slate-900 font-bold text-[15px] tracking-tight">HomeStyle</div>
              <div className="text-slate-400 text-[9px] uppercase tracking-[0.18em] font-medium">Furniture Co.</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center" role="navigation">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-0.5 px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'text-amber-600 bg-amber-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={productsOpen}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                    />
                  </Link>
                  {productsOpen && categories && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 animate-slide-down">
                      <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden py-2">
                        <div className="px-4 pt-2 pb-3 border-b border-slate-50">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Categories</p>
                        </div>
                        {categories.filter((c) => c.published).map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/categories/${cat.slug}`}
                            className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors group"
                          >
                            <span>{cat.name}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                          </Link>
                        ))}
                        <div className="border-t border-slate-50 px-4 pt-3 pb-2 mt-1">
                          <Link
                            to="/products"
                            className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                          >
                            View All Products <ArrowRight size={11} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'text-amber-600 bg-amber-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search size={17} />
            </button>
            <Link
              to="/contact"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-all hover:shadow-amber active:scale-95"
            >
              Get a Quote
              <ArrowRight size={13} />
            </Link>
            <button
              className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-3 animate-slide-down">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, categories, blog articles…"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent focus:bg-white transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <kbd className="hidden sm:inline-flex items-center px-2 py-1 bg-white border border-slate-200 rounded text-[10px] text-slate-400">ESC</kbd>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search…"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </form>

            <nav className="space-y-0.5">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                      isActive(item.href)
                        ? 'text-amber-600 bg-amber-50'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <div className="ml-4 mt-1 mb-2 space-y-0.5 border-l-2 border-amber-100 pl-3">
                      {categories?.filter((c) => c.published).map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/categories/${cat.slug}`}
                          className="block px-2 py-1.5 text-xs text-slate-500 hover:text-amber-600 transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-3 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-colors"
              >
                Get a Quote <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
