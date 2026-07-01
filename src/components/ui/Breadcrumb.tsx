import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  crumbs: Crumb[];
  light?: boolean;
}

export default function Breadcrumb({ crumbs, light = false }: Props) {
  const base = light
    ? 'text-white/60 hover:text-white'
    : 'text-slate-400 hover:text-amber-600';
  const active = light ? 'text-white/90' : 'text-slate-600';
  const chevron = light ? 'text-white/30' : 'text-slate-300';

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs flex-wrap">
      <Link to="/" className={`flex items-center gap-1 transition-colors ${base}`}>
        <Home size={12} />
        Home
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={12} className={chevron} />
          {crumb.href ? (
            <Link to={crumb.href} className={`transition-colors ${base}`}>
              {crumb.label}
            </Link>
          ) : (
            <span className={`font-medium ${active}`}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
