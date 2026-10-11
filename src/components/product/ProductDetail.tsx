"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProducts, summarizePrices } from "@/lib/api";
import {
  bnNumber,
  changeView,
  formatPercent,
  formatTaka,
  unitLabel,
} from "@/lib/bn";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import MarketTable from "@/components/product/MarketTable";
import DetailSkeleton from "@/components/product/DetailSkeleton";

function Stat({
  label,
  value,
  tone = "",
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4 text-center shadow-sm">
      <p className="text-xs font-medium text-base-content/50">{label}</p>
      <p className={`mt-1 text-xl font-extrabold ${tone}`}>{value}</p>
    </div>
  );
}

export default function ProductDetail({ slug }: { slug: string }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts(signal),
  });

  if (isLoading) return <DetailSkeleton />;
  if (isError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <ErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  const product = data?.find((item) => item.slug === slug) ?? null;

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon="🚫"
          title="পণ্যটি খুঁজে পাওয়া যায়নি"
          message="আপনি যে পণ্যটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।"
        />
      </div>
    );
  }

  const change = changeView(product.change);
  const summary = summarizePrices(product);
  const unit = unitLabel(product.unit);
  const trendWord = change.dir === "up" ? "বেড়েছে" : "কমেছে";

  const description =
    change.dir === "flat"
      ? `${product.categoryNameBn} ক্যাটাগরির নিত্যপণ্য। আজকের দাম ${formatTaka(product.today)} (${unit})। গতকালের তুলনায় দাম অপরিবর্তিত।`
      : `${product.categoryNameBn} ক্যাটাগরির নিত্যপণ্য। আজকের দাম ${formatTaka(product.today)} (${unit})। গতকালের তুলনায় ${formatPercent(product.change.pct)} ${trendWord}।`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-base-content/60">
        <Link href="/" className="hover:text-primary">
          হোম
        </Link>
        <span aria-hidden>/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-primary"
        >
          {product.categoryIcon} {product.categoryNameBn}
        </Link>
        <span aria-hidden>/</span>
        <span className="font-medium text-base-content/80">
          {product.nameBn}
        </span>
      </nav>

      <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-6xl">
            <span aria-hidden>{product.image}</span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {product.nameBn}
              </h1>
              <span
                className={`badge gap-1 border font-semibold ${change.bgClass}`}
              >
                <span aria-hidden>{change.symbol}</span> {change.text}
              </span>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-base-content/70">
              {description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="badge badge-primary badge-outline gap-1">
                <span aria-hidden>{product.categoryIcon}</span>
                {product.categoryNameBn}
              </span>
              <span className="badge badge-ghost">{unit}</span>
              <span className="badge badge-ghost">
                {bnNumber(product.markets.length)} বাজার
              </span>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl bg-primary/10 px-5 py-4 text-center">
            <p className="text-xs font-medium text-base-content/60">
              আজকের দাম
            </p>
            <p className="text-2xl font-extrabold text-primary sm:text-3xl">
              {formatTaka(product.today)}
            </p>
            <p className="text-xs text-base-content/50">{unit}</p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold">মূল্য সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat
            label="সর্বনিম্ন দাম"
            value={formatTaka(summary.min)}
            tone="text-success"
          />
          <Stat
            label="সর্বোচ্চ দাম"
            value={formatTaka(summary.max)}
            tone="text-error"
          />
          <Stat label="গড় দাম" value={formatTaka(summary.avg)} />
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat
          label="গতকালের দাম"
          value={formatTaka(product.yesterday)}
        />
        <Stat label="গত সপ্তাহে" value={formatTaka(product.lastWeek)} />
        <Stat label="গত মাসে" value={formatTaka(product.lastMonth)} />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <MarketTable markets={product.markets} />
      </section>
    </div>
  );
}
