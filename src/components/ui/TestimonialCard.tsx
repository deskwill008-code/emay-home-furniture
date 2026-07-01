import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../../types';

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={`${
                i < testimonial.rating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200 fill-slate-200'
              }`}
            />
          ))}
        </div>
        <Quote size={24} className="text-amber-100 flex-shrink-0" />
      </div>

      {/* Quote */}
      <p className="text-sm text-slate-600 leading-relaxed flex-1 italic">"{testimonial.content}"</p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
        <div className="relative flex-shrink-0">
          <img
            src={testimonial.photo}
            alt={testimonial.customerName}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <div>
          <div className="font-bold text-slate-800 text-sm">{testimonial.customerName}</div>
          <div className="text-xs text-slate-500">{testimonial.position}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs font-semibold text-amber-600">{testimonial.company}</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-400">{testimonial.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
