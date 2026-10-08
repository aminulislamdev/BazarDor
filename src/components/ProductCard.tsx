import Link from "next/link";
import { formatPrice, formatChange } from "@/lib/bn";
import type { Product } from "@/types";

export default function ProductCard({ p }: { p: Product }) {
  const ch = formatChange(p.change, p.changeDir);
  const color =
    ch.dir === "up"
      ? "text-green-600"
      : ch.dir === "down"
        ? "text-red-600"
        : "text-gray-500";

  return (
    <Link
      href={`/product/${p.id}`}
      className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow block"
    >
      <div className="text-3xl mb-2">{p.emoji}</div>
      <h3 className="font-semibold text-gray-900 line-clamp-1">{p.name}</h3>
      <p className="text-xs text-gray-500">প্রতি {p.unit}</p>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <div className="text-[10px] text-gray-500">আজকের দাম</div>
          <div className="font-bold text-lg text-gray-900">
            {formatPrice(p.price)}
          </div>
        </div>
        <span className={`text-xs font-semibold ${color} whitespace-nowrap`}>
          {ch.text}
        </span>
      </div>
    </Link>
  );
}