"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import DetailSkeleton from "@/components/product/DetailSkeleton";

function ProductDetailWithParams() {
  const params = useParams<{ slug: string }>();

  return <ProductDetail slug={params.slug} />;
}

export default function ProductPage() {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ProductDetailWithParams />
    </Suspense>
  );
}
