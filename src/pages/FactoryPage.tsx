import SEO from '../components/SEO';
import Breadcrumb from '../components/ui/Breadcrumb';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, Zap, Eye, Package, Truck } from 'lucide-react';

const factoryAreas = [
  {
    no: '01',
    title: 'Raw Material Warehouse',
    desc: '2,000+ m² climate-controlled storage for MDF, solid wood, hardware, and fabrics. All materials sourced from certified, audited suppliers.',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    no: '02',
    title: 'CNC Cutting & Machining',
    desc: 'State-of-the-art CNC routers and panel saws deliver precision to ±0.1mm. Automated nesting minimizes material waste.',
    image: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    no: '03',
    title: 'Finishing & Coating Line',
    desc: 'Automated UV coating and lacquering lines in dust-free spray booths for consistent, high-quality finishes every batch.',
    image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    no: '04',
    title: 'Assembly & QC Hall',
    desc: 'Skilled craftsmen with automated assembly stations. Every unit checked against standardized quality checklists before packing.',
    image: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    no: '05',
    title: 'Export Packaging',
    desc: '5-ply export carton with foam corner protection. All packaging drop-tested to ISTA 1A and 2A standards.',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    no: '06',
    title: 'R&D Design Center',
    desc: '20+ product designers developing 50+ new designs annually. Full CAD/3D modeling, prototyping, and sample dev in-house.',
    image: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function FactoryPage() {
  return (
    <>
      <SEO
        title="Factory Tour | HomeStyle Furniture — 50,000 m² Manufacturing in Foshan"
        description="Virtual factory tour of HomeStyle Furniture's 50,000 m² facility in Foshan, China. CNC precision, automated finishing, 3-stage QC, export packaging."
        ogImage="https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1200"
      />
      <div className="bg-white">
        {/* Hero */}
        <div className="relative h-72 sm:h-[520px] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="HomeStyle Furniture Factory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Breadcrumb crumbs={[{ label: 'Factory' }]} light />
            <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 leading-tight">Factory Tour</h1>
            <p className="text-white/70 text-lg mt-2 max-w-xl">
              50,000 m² of state-of-the-art manufacturing in Foshan, Guangdong — China's furniture capital.
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="bg-amber-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
              {[
                { icon: Award, label: 'CNC Precision', val: '±0.1mm' },
                { icon: Eye, label: 'QC Stages', val: '3-Stage' },
                { icon: Package, label: 'Export Packing', val: 'ISTA Certified' },
                { icon: Zap, label: 'Lead Time', val: '15–60 days' },
                { icon: Truck, label: 'On-Time Rate', val: '98.5%' },
                { icon: CheckCircle, label: 'Defect Rate', val: '< 0.3%' },
              ].map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.label} className="text-center">
                    <Icon size={20} className="text-white/80 mx-auto mb-1.5" />
                    <div className="text-white font-black text-base">{cap.val}</div>
                    <div className="text-amber-100 text-[11px] font-medium mt-0.5">{cap.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Factory Areas */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="section-label">Inside Our Factory</span>
              <h2 className="section-title">World-Class Manufacturing</h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                From raw material receipt to container loading — every area designed for quality, efficiency, and scale.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {factoryAreas.map((area) => (
                <div key={area.no} className="group">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 left-3 w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white font-black text-sm shadow">
                      {area.no}
                    </div>
                  </div>
                  <h3 className="font-black text-slate-800 text-base mb-1.5">{area.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QC */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-label">Quality Control</span>
              <h2 className="section-title">3-Stage Quality Control</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { stage: '01', title: 'Incoming Material Check', desc: 'All materials tested for formaldehyde, moisture, and dimensional accuracy before entering production.' },
                { stage: '02', title: 'In-Process Inspection', desc: 'QC staff inspect at every stage: cutting, edge banding, drilling, finishing, and assembly.' },
                { stage: '03', title: 'Pre-Shipment Audit', desc: '100% visual inspection + random sampling (AQL 2.5) before packing. Third-party inspection available.' },
              ].map((s) => (
                <div key={s.stage} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-card">
                  <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center font-black text-base mb-4">{s.stage}</div>
                  <h3 className="font-black text-slate-800 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visit CTA */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Schedule a Factory Visit</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              We welcome international buyers to Foshan. Our team arranges transportation from Guangzhou, Shenzhen, or Hong Kong airports.
            </p>
            <Link to="/contact" className="btn-primary text-base px-8 py-4">
              Schedule a Visit
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
