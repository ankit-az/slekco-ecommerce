export default function Skeleton({ className = '' }) {
  return (
    <div
      className={`bg-gray-800/60 animate-pulse rounded-xl ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4 space-y-4">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/4" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-9 w-9 rounded-xl" />
      </div>
    </div>
  );
}
