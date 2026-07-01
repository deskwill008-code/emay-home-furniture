export interface Product {
  id: string;
  name: string;
  model: string;
  sku: string;
  slug: string;
  category: string;
  brand: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  applications: string[];
  material: string;
  colors: string[];
  dimensions: string;
  weight: string;
  packageSize: string;
  moq: string;
  leadTime: string;
  warranty: string;
  featuredImage: string;
  gallery: string[];
  videoUrl: string;
  pdfCatalog: string;
  seoTitle: string;
  seoDescription: string;
  metaKeywords: string;
  published: boolean;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  productCount: number;
  published: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  publishDate: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
}

export interface Catalog {
  id: string;
  title: string;
  type: string;
  coverImage: string;
  pdfFile: string;
  description: string;
  version: string;
  language: string;
  publishDate: string;
  fileSize: string;
  published: boolean;
}

export interface Testimonial {
  id: string;
  customerName: string;
  company: string;
  country: string;
  position: string;
  content: string;
  photo: string;
  rating: number;
  published: boolean;
}

export interface Company {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  favicon: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  googleMaps: string;
  founded: string;
  employees: string;
  factorySize: string;
  annualOutput: string;
  exportCountries: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  certifications: string[];
  paymentTerms: string;
  mainMarkets: string[];
}

export interface InquiryForm {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  quantity: string;
  productName?: string;
  productModel?: string;
  message: string;
}
