import { bnNumber, formatTaka } from "@/lib/bn";
import type { MarketPrice } from "@/lib/types";

function groupByDivision(markets: MarketPrice[]) {
  const groups = new Map<string, MarketPrice[]>();
  for (const market of markets) {
    const list = groups.get(market.division) ?? [];
    list.push(market);
    groups.set(market.division, list);
  }
  return Array.from(groups.entries());
}

export default function MarketTable({ markets }: { markets: MarketPrice[] }) {
  if (!markets.length) {
    return (
      <p className="text-sm text-base-content/60">
        এই পণ্যের বাজারভিত্তিক তথ্য নেই।
      </p>
    );
  }

  const cheapest = Math.min(...markets.map((m) => m.min));
  const priciest = Math.max(...markets.map((m) => m.max));
  const groups = groupByDivision(markets);

  return (
    <div className="space-y-6">
      {groups.map(([division, list]) => (
        <div key={division}>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-base-content/80">
            <span aria-hidden>📍</span> {division} বিভাগ
            <span className="badge badge-ghost badge-sm">
              {bnNumber(list.length)} বাজার
            </span>
          </h4>

          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="table table-sm">
              <thead>
                <tr className="bg-base-200/70 text-base-content/70">
                  <th>বাজার</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বোচ্চ</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {list.map((market) => {
                  const avg = Math.round((market.min + market.max) / 2);
                  return (
                    <tr key={`${division}-${market.market}`}>
                      <td className="font-medium">{market.market}</td>
                      <td className="text-right">
                        <span
                          className={
                            market.min === cheapest
                              ? "font-bold text-success"
                              : ""
                          }
                        >
                          {formatTaka(market.min)}
                        </span>
                      </td>
                      <td className="text-right">
                        <span
                          className={
                            market.max === priciest
                              ? "font-bold text-error"
                              : ""
                          }
                        >
                          {formatTaka(market.max)}
                        </span>
                      </td>
                      <td className="text-right text-base-content/70">
                        {formatTaka(avg)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
