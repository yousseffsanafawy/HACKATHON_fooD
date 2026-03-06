interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`bg-slate-200 rounded animate-pulse ${className}`}></div>
  );
}

interface ShimmerProps {
  className?: string;
}

export function Shimmer({ className = '' }: ShimmerProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
    </div>
  );
}

export function InventorySkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-[20px] p-4 shadow-sm border border-emerald-50 flex gap-4 items-center">
          <Skeleton className="w-16 h-16 rounded-2xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-2 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Hero Card Skeleton */}
      <div className="glass-card rounded-xl p-5 shadow-xl overflow-hidden relative">
        <Skeleton className="h-20 w-full" />
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="aspect-[4/5] rounded-xl" />
        <Skeleton className="aspect-[4/5] rounded-xl" />
      </div>

      {/* Recommended Section Skeleton */}
      <div>
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="flex gap-4 overflow-hidden">
          <Skeleton className="w-64 h-80 rounded-xl flex-shrink-0" />
          <Skeleton className="w-64 h-80 rounded-xl flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-50">
      <Skeleton className="aspect-[4/5] w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full mt-2" />
      </div>
    </div>
  );
}

export function ScanLoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 max-w-sm mx-4 text-center shadow-2xl">
        {/* Animated Scanner */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div 
            className="absolute inset-0 border-4 border-primary/20 rounded-full"
            style={{ animation: 'spin 2s linear infinite' }}
          />
          <div 
            className="absolute inset-4 border-4 border-primary/40 rounded-full"
            style={{ animation: 'spin 1.5s linear infinite reverse' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-5xl">qr_code_scanner</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Analyzing Items...
        </h2>
        
        <p className="text-slate-500 text-sm mb-4">
          Our AI is identifying your groceries
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-primary"
              style={{
                animation: 'pulse 1s infinite',
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB] p-4">
      <Skeleton className="h-10 w-10 rounded-full mb-4" />
      <Skeleton className="h-8 w-48 mb-6" />
      <Skeleton className="h-12 w-full rounded-xl mb-4" />
      <div className="space-y-3">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    </div>
  );
}
