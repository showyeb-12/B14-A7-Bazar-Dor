"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import { changeView, formatTaka } from "@/lib/bn";
import type { Unit } from "@/lib/types";

const UNIT_SHORT: Record<Unit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

function TickerRow({ ariaHidden }: { ariaHidden?: boolean }) {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts(signal),
  });

  if (!data) {
    return (
      <div className="flex gap-6 px-4" aria-hidden={ariaHidden}>
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className="skeleton h-5 w-40 rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex shrink-0 gap-6 px-4" aria-hidden={ariaHidden}>
      {data.map((product) => {
        const change = changeView(product.change);
        const toneClass =
          change.dir === "up"
            ? "text-success"
            : change.dir === "down"
              ? "text-error"
              : "text-base-content/50";
        return (
          <span
            key={product.id}
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm"
          >
            <span aria-hidden>{product.image}</span>
            <span className="font-medium">{product.nameBn}</span>
            <span className="text-base-content/60">দাম</span>
            <span className="font-semibold">{formatTaka(product.today)}</span>
            <span className="text-base-content/60">
              /{UNIT_SHORT[product.unit]}
            </span>
            <span className={`font-semibold ${toneClass}`}>
              {change.symbol} {change.text}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="border-b border-base-300 bg-neutral text-neutral-content">
      <div className="group flex overflow-hidden py-2">
        <div className="flex w-max animate-marquee pause-on-hover">
          <TickerRow />
          <TickerRow ariaHidden />
        </div>
      </div>
    </div>
  );
}
