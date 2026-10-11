"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProductsByCategory } from "@/lib/api";
import { bnNumber } from "@/lib/bn";
import ProductGrid from "@/components/ProductGrid";
import { ProductGridSkeleton } from "@/components/Skeletons";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

type SortKey = "default" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export default function CategoryView({ slug }: { slug: string }) {
  const [sort, setSort] = useState<SortKey>("default");

  const productsQuery = useQuery({
    queryKey: ["category-products", slug],
    queryFn: ({ signal }) => getProductsByCategory(slug, signal),
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getCategories(signal),
  });

  const category =
    categoriesQuery.data?.find((item) => item.slug === slug) ?? null;

  const sorted = useMemo(() => {
    const list = [...(productsQuery.data ?? [])];
    if (sort === "price-asc") list.sort((a, b) => a.today - b.today);
    if (sort === "price-desc") list.sort((a, b) => b.today - a.today);
    return list;
  }, [productsQuery.data, sort]);

  const isLoading = productsQuery.isLoading || categoriesQuery.isLoading;
  const isError = productsQuery.isError || categoriesQuery.isError;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="skeleton mb-6 h-10 w-56 rounded" />
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <ErrorState
          onRetry={() => {
            productsQuery.refetch();
            categoriesQuery.refetch();
          }}
        />
      </div>
    );
  }

  if (!category || sorted.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon="🧺"
          title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
          message="সম্ভবত ক্যাটাগরিটি খালি অথবা আপনি ভুল লিংকে এসেছেন।"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            <span aria-hidden>{category.icon}</span>
            {category.nameBn}
          </h1>
          <p className="mt-1 text-sm text-base-content/60">
            {bnNumber(sorted.length)} টি পণ্যের আজকের বাজারদর
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium text-base-content/60">সাজান:</span>
          <select
            className="select select-bordered select-sm sm:select-md"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ProductGrid products={sorted} />
    </div>
  );
}
