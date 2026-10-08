import type {
  RawProduct,
  RawCategory,
  Product,
  Category,
  Market,
} from "@/types";

export function mapProduct(raw: RawProduct): Product {
  if (!raw || !raw.id) {
    throw new Error("Invalid product: missing id");
  }

  const markets: Market[] = (raw.markets ?? []).map((m) => {
    const min = Number(m.min) || 0;
    const max = Number(m.max) || 0;
    return {
      name: m.market || "—",
      division: m.division || "—",
      min,
      max,
      avg: Math.round((min + max) / 2),
    };
  });

  const mins = markets.map((m) => m.min).filter((n) => n > 0);
  const maxs = markets.map((m) => m.max).filter((n) => n > 0);
  const today = Number(raw.today) || 0;

  const min = mins.length ? Math.min(...mins) : today;
  const max = maxs.length ? Math.max(...maxs) : today;
  const avg = markets.length
    ? Math.round(
      markets.reduce((sum, market) => sum + market.avg, 0) / markets.length
    )
    : today;

  return {
    id: raw.id,
    slug: raw.slug || String(raw.id),
    name: raw.nameBn || "—",
    category: raw.category || "",
    categoryName: raw.categoryNameBn || "",
    categoryIcon: raw.categoryIcon || "📦",
    unit: raw.unit || "kg",
    emoji: raw.image || "📦",
    price: today,
    yesterday: Number(raw.yesterday) || today,
    lastWeek: Number(raw.lastWeek) || today,
    lastMonth: Number(raw.lastMonth) || today,
    change: Number(raw.change?.pct) || 0,
    changeDir: raw.change?.dir || "flat",
    min,
    max,
    avg,
    markets,
  };
}

export function mapCategory(raw: RawCategory): Category {
  return {
    id: raw.id,
    name: raw.nameBn,
    icon: raw.icon,
  };
}