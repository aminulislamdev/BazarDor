import { notFound } from "next/navigation";
import { fetchCategories, fetchProducts } from "@/lib/api";
import CategoryProducts from "@/components/CategoryProducts";
import { toBn } from "@/lib/bn";

// ✅ Dynamic params — allow blocking
export const instant = false;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [products, categories] = await Promise.all([
    fetchProducts(id),
    fetchCategories(),
  ]);

  if (products.length === 0) {
    notFound();
  }

  const category = categories.find((c) => c.id === id);
  const icon = category?.icon ?? "📦";
  const name = category?.name ?? id;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* ─── Category Header Card ─── */}
      <div className="bg-white rounded-xl border p-5 md:p-6 flex items-center gap-4">
        {/* Icon */}
        <div className="text-4xl md:text-5xl shrink-0">{icon}</div>

        {/* Title + subtitle */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {name}
          </h1>
          <p className="text-sm text-gray-700 mt-1">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* ─── Products Grid with Sort ─── */}
      <CategoryProducts products={products} />
    </div>
  );
}