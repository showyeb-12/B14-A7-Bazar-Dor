import type { ReactNode } from "react";
import Image from "next/image";
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
    <div className="mx-auto grid max-w-5xl items-stretch gap-6 px-4 py-8 sm:gap-8 sm:py-14 lg:grid-cols-2">
      <div className="order-2 relative flex items-center justify-center overflow-hidden rounded-3xl border border-base-300 bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-6 py-8 lg:order-1">
        <Image
          src="/hero-market.svg"
          alt="কাঁচাবাজারের ঝুড়িতে চাল, মাছ, সবজি ও মাংস"
          width={640}
          height={480}
          priority
          className="h-auto w-full max-w-xs drop-shadow-xl sm:max-w-sm lg:max-w-lg"
        />
      </div>

      <div className="order-1 mx-auto flex w-full max-w-md flex-col gap-5 lg:order-2">
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
    </div>
  );
}
