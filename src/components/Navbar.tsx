"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";
import ClientDate from "@/components/ClientDate";

function navLinkClass(active: boolean) {
  return [
    "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
    active
      ? "bg-primary text-primary-content shadow-sm"
      : "text-base-content/70 hover:bg-base-200 hover:text-base-content",
  ].join(" ");
}

function CategoryNavSkeleton() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-1.5 overflow-hidden px-4 py-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className="skeleton h-7 w-16 shrink-0 rounded-full"
        />
      ))}
    </div>
  );
}

function CategoryNav() {
  const pathname = usePathname();
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getCategories(signal),
  });

  return (
    <nav className="mx-auto flex max-w-6xl items-center gap-1.5 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Link href="/" className={navLinkClass(pathname === "/")}>
        হোম
      </Link>

      {isLoading &&
        Array.from({ length: 6 }).map((_, index) => (
          <span
            key={index}
            className="skeleton h-7 w-16 shrink-0 rounded-full"
          />
        ))}

      {categories?.map((category) => {
        const href = `/category/${category.slug}`;
        return (
          <Link
            key={category.slug}
            href={href}
            className={navLinkClass(pathname === href)}
          >
            <span aria-hidden className="mr-1">
              {category.icon}
            </span>
            {category.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            🛒
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-primary">
              বাজার দর
            </span>
            <ClientDate className="text-[11px] font-medium text-base-content/60" />
          </span>
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-2">
          <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
            সাইন ইন
          </Link>
          <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
            সাইন আপ
          </Link>
        </nav>
      </div>

      <div className="border-t border-base-300/70 bg-base-100/70">
        <Suspense fallback={<CategoryNavSkeleton />}>
          <CategoryNav />
        </Suspense>
      </div>
    </header>
  );
}
