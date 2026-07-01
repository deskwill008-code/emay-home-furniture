import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object;
}

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ogType = 'website',
  schema,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:image', ogImage, true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:image', ogImage, true);

    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
    }

    if (schema) {
      const id = 'schema-org-data';
      let scriptEl = document.getElementById(id);
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.setAttribute('type', 'application/ld+json');
        scriptEl.id = id;
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schema]);

  return null;
}
