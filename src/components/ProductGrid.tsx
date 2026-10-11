import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function ProductGrid({
  products,
  className = "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4",
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
