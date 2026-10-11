"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import CategoryView from "@/components/category/CategoryView";
import { ProductGridSkeleton } from "@/components/Skeletons";

function CategoryWithParams() {
  const params = useParams<{ slug: string }>();

  return <CategoryView slug={params.slug} />;
}

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="skeleton mb-6 h-10 w-56 rounded" />
          <ProductGridSkeleton count={8} />
        </div>
      }
    >
      <CategoryWithParams />
    </Suspense>
  );
}
