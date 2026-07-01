export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function buildWhatsAppMessage(productName: string, productModel: string, whatsapp: string): string {
  const message = encodeURIComponent(
    `Hello,\n\nI'm interested in your ${productName} (Model: ${productModel}).\n\nPlease send me your quotation and catalog.\n\nThank you.`
  );
  return `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${message}`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + '…';
}
