import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { fetchProduct, fetchProducts } from "@/lib/api";
import { formatPrice, formatChange, toBn } from "@/lib/bn";
import ProductCard from "@/components/ProductCard";


export const instant = false;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const { id } = await params;

  
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?redirect=/product/${id}`);

  
  const p = await fetchProduct(id);
  if (!p) return notFound();

 
  const related = (await fetchProducts(p.category))
    .filter((x) => x.id !== p.id)
    .slice(0, 4);

  
  const ch = formatChange(p.change, p.changeDir);
  const color =
    ch.dir === "up"
      ? "text-green-600"
      : ch.dir === "down"
        ? "text-red-600"
        : "text-gray-500";


  const trendColor = (curr: number, prev: number) =>
    curr > prev
      ? "text-green-600"
      : curr < prev
        ? "text-red-600"
        : "text-gray-500";

  const trendArrow = (curr: number, prev: number) =>
    curr > prev ? "▲" : curr < prev ? "▼" : "—";

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
  
      <nav className="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-brand">
          হোম
        </Link>
        <span>/</span>
        <Link href={`/category/${p.category}`} className="hover:text-brand">
          {p.categoryName}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{p.name}</span>
      </nav>


      <div className="bg-white rounded-xl border p-6 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className="text-5xl">{p.emoji}</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {p.name}
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                {p.categoryName} · {toBn(p.markets.length)}টি বাজারে দাম পাওয়া
                গেছে
              </p>

              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="text-xs bg-brand/10 text-brand px-3 py-1 rounded-full font-medium">
                  {p.categoryIcon} {p.categoryName}
                </span>
                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  প্রতি {p.unit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current price box */}
        <div className="bg-brand-light rounded-xl p-4 md:min-w-45 text-right shrink-0">
          <div className="text-xs text-gray-600 mb-1">আজকের দাম</div>
          <div className="text-3xl font-bold text-gray-900">
            {formatPrice(p.price)}
          </div>
          <div className={`text-sm font-semibold mt-1 ${color}`}>{ch.text}</div>
          <div className="text-[11px] text-gray-500 mt-1">প্রতি {p.unit}</div>
        </div>
      </div>

      {/* ─── Min / Max / Avg ─── */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="সর্বনিম্ন দাম" value={p.min} icon="⬇️" />
        <StatCard label="সর্বোচ্চ দাম" value={p.max} icon="⬆️" />
        <StatCard label="গড় দাম" value={p.avg} icon="📊" />
      </div>

      {/* ─── Price Trend ─── */}
      <div>
        <h2 className="font-semibold mb-3 text-lg">দামের ধারা</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <TrendCard
            label="আজ"
            value={p.price}
            arrow=""
            color="text-gray-900"
          />
          <TrendCard
            label="গতকাল"
            value={p.yesterday}
            arrow={trendArrow(p.price, p.yesterday)}
            color={trendColor(p.price, p.yesterday)}
          />
          <TrendCard
            label="গত সপ্তাহে"
            value={p.lastWeek}
            arrow={trendArrow(p.price, p.lastWeek)}
            color={trendColor(p.price, p.lastWeek)}
          />
          <TrendCard
            label="গত মাসে"
            value={p.lastMonth}
            arrow={trendArrow(p.price, p.lastMonth)}
            color={trendColor(p.price, p.lastMonth)}
          />
        </div>
      </div>

      {/* ─── Market-wise table ─── */}
      {p.markets.length > 0 && (
        <div>
          <h2 className="font-semibold mb-3 text-lg">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left font-medium text-gray-700">
                    বাজার
                  </th>
                  <th className="p-3 text-left font-medium text-gray-700">
                    বিভাগ
                  </th>
                  <th className="p-3 text-right font-medium text-gray-700">
                    সর্বনিম্ন
                  </th>
                  <th className="p-3 text-right font-medium text-gray-700">
                    সর্বোচ্চ
                  </th>
                  <th className="p-3 text-right font-medium text-gray-700">
                    গড়
                  </th>
                </tr>
              </thead>
              <tbody>
                {p.markets.map((m) => (
                  <tr
                    key={m.name}
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-left font-medium text-gray-900">
                      {m.name}
                    </td>
                    <td className="p-3 text-left text-gray-600">
                      {m.division}
                    </td>
                    <td className="p-3 text-right text-gray-700">
                      {formatPrice(m.min)}
                    </td>
                    <td className="p-3 text-right text-gray-700">
                      {formatPrice(m.max)}
                    </td>
                    <td className="p-3 text-right font-semibold text-gray-900">
                      {formatPrice(m.avg)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── Related products ─── */}
      {related.length > 0 && (
        <div>
          <h2 className="font-semibold mb-3 text-lg">
            একই ক্যাটাগরির অন্যান্য পণ্য
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((rp) => (
              <ProductCard key={rp.id} p={rp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Small helper components ───

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-4 flex items-start justify-between">
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="font-bold text-lg text-gray-900 mt-1">
          {formatPrice(value)}
        </div>
      </div>
      <div className="text-xl">{icon}</div>
    </div>
  );
}

function TrendCard({
  label,
  value,
  arrow,
  color,
}: {
  label: string;
  value: number;
  arrow: string;
  color: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`font-bold text-lg mt-1 ${color}`}>
        {arrow && <span className="mr-1">{arrow}</span>}
        {formatPrice(value)}
      </div>
    </div>
  );
}