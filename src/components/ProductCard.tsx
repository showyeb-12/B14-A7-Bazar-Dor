import Link from "next/link";
import { changeView, formatTaka, unitLabel } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const change = changeView(product.change);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-4xl leading-none" aria-hidden>
          {product.image}
        </span>
        <span
          className={`badge badge-sm gap-1 border font-semibold ${change.bgClass}`}
          title={change.label}
        >
          <span aria-hidden>{change.symbol}</span>
          {change.text}
        </span>
      </div>

      <h3 className="mt-3 text-base font-bold leading-snug">
        {product.nameBn}
      </h3>

      <p className="mt-0.5 text-xs text-base-content/60">
        {unitLabel(product.unit)}
        <span className="mx-1" aria-hidden>
          •
        </span>
        <span aria-hidden>{product.categoryIcon}</span> {product.categoryNameBn}
      </p>

      <div className="mt-3 flex items-end justify-between border-t border-base-200 pt-3">
        <div>
          <p className="text-[11px] font-medium text-base-content/50">
            আজকের দাম
          </p>
          <p className="text-lg font-extrabold text-base-content">
            {formatTaka(product.today)}
          </p>
        </div>
        <span className="text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
          বিস্তারিত →
        </span>
      </div>
    </Link>
  );
}
