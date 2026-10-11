import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-5 px-4 py-10 sm:py-14">
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="text-3xl" aria-hidden>
            🛒
          </span>
          <span className="text-2xl font-extrabold text-primary">
            বাজার দর
          </span>
        </Link>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-base-content/60">{subtitle}</p>
        )}
      </div>
      <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}