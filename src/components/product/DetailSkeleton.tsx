export default function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div className="skeleton h-5 w-56 rounded" />
      <div className="skeleton h-40 w-full rounded-3xl" />
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="skeleton h-28 rounded-2xl" />
        ))}
      </div>
      <div className="skeleton h-72 w-full rounded-3xl" />
    </div>
  );
}
