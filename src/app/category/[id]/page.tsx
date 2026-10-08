import { notFound } from "next/navigation";
import { fetchProducts } from "@/lib/api";
import CategoryProducts from "@/components/CategoryProducts";

// ✅ Allow blocking — category content is dynamic per params
export const instant = false;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = await fetchProducts(id);

  if (products.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold capitalize mb-4">{id}</h1>
      <CategoryProducts products={products} />
    </div>
  );
}