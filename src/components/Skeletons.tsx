export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="skeleton h-10 w-10 rounded-full" />
        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
      <div className="skeleton mt-3 h-5 w-3/4 rounded" />
      <div className="skeleton mt-2 h-3 w-1/2 rounded" />
      <div className="mt-3 flex items-end justify-between border-t border-base-200 pt-3">
        <div className="skeleton h-7 w-24 rounded" />
        <div className="skeleton h-4 w-14 rounded" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
