"use client";

export default function ErrorState({
  title = "ডেটা আনতে সমস্যা হয়েছে",
  message = "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-3xl border border-error/30 bg-error/5 p-8 text-center">
      <div className="text-4xl" aria-hidden>
        ⚠️
      </div>
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <p className="mt-1 text-sm text-base-content/60">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary btn-sm mt-4">
          আবার চেষ্টা করুন
        </button>
      )}
    </div>
  );
}
