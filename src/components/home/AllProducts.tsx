"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import { bnNumber } from "@/lib/bn";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import { ProductGridSkeleton } from "@/components/Skeletons";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

export default function AllProducts() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts(signal),
  });

  return (
    <section
      id="সব-পণ্য"
      className="scroll-mt-28 border-y border-base-300 bg-base-200/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionHeading
          eyebrow="সম্পূর্ণ তালিকা"
          title="সব পণ্য"
          subtitle={
            data
              ? `মোট ${bnNumber(data.length)} টি নিত্যপণ্যের আজকের বাজারদর`
              : "নিত্যপ্রয়োজনীয় সব পণ্যের আজকের বাজারদর"
          }
        />

        {isLoading ? (
          <ProductGridSkeleton count={12} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : data && data.length > 0 ? (
          <ProductGrid products={data} />
        ) : (
          <EmptyState
            title="কোনো পণ্য পাওয়া যায়নি"
            message="এখন কোনো পণ্যের তথ্য নেই। একটু পরে আবার দেখুন।"
          />
        )}
      </div>
    </section>
  );
}
