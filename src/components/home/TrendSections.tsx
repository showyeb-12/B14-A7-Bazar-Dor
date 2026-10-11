"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import { ProductGridSkeleton } from "@/components/Skeletons";
import ErrorState from "@/components/ErrorState";

export default function TrendSections() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts(signal),
  });

  const products = data ?? [];
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <section
        id="বেড়েছে"
        className="mx-auto max-w-6xl scroll-mt-28 px-4 py-10 sm:py-12"
      >
        <SectionHeading
          eyebrow="দাম বাড়ছে"
          title={
            <>
              আজ দাম বেড়েছে <span className="text-success">▲</span>
            </>
          }
          subtitle="সর্বোচ্চ বাড়তি দরের ৬টি পণ্য"
        />
        {isLoading ? (
          <ProductGridSkeleton count={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : (
          <ProductGrid products={risers} />
        )}
      </section>

      <section
        id="কমেছে"
        className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-12 pt-2 sm:pb-14"
      >
        <SectionHeading
          eyebrow="দাম কমছে"
          title={
            <>
              আজ দাম কমেছে <span className="text-error">▼</span>
            </>
          }
          subtitle="সর্বোচ্চ কমতি দরের ৬টি পণ্য"
        />
        {isLoading ? (
          <ProductGridSkeleton count={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : (
          <ProductGrid products={fallers} />
        )}
      </section>
    </>
  );
}
