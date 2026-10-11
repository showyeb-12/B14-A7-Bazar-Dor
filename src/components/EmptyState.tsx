import Link from "next/link";

export default function EmptyState({
  icon = "🔍",
  title,
  message,
}: {
  icon?: string;
  title: string;
  message?: string;
}) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-base-300 bg-base-100 p-10 text-center shadow-sm">
      <div className="text-5xl" aria-hidden>
        {icon}
      </div>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      {message && (
        <p className="mt-2 text-sm text-base-content/60">{message}</p>
      )}
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
