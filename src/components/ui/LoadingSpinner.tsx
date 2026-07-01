interface Props {
  label?: string;
  className?: string;
}

export default function LoadingSpinner({ label = 'Loading…', className = '' }: Props) {
  return (
    <div className={`flex flex-col items-center justify-center py-24 gap-3 ${className}`}>
      <div className="w-10 h-10 border-[3px] border-amber-100 border-t-amber-500 rounded-full animate-spin" />
      <p className="text-sm text-slate-400 font-medium">{label}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="aspect-[4/3] shimmer" />
      <div className="p-4 space-y-2.5">
        <div className="h-3 shimmer rounded-lg w-1/3" />
        <div className="h-4 shimmer rounded-lg" />
        <div className="h-3 shimmer rounded-lg w-5/6" />
        <div className="h-3 shimmer rounded-lg w-2/3" />
        <div className="flex gap-3 pt-2">
          <div className="h-3 shimmer rounded-lg w-16" />
          <div className="h-3 shimmer rounded-lg w-16" />
        </div>
      </div>
    </div>
  );
}
