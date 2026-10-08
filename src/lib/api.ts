"use cache";

import type { RawProduct, RawCategory, Product, Category } from "@/types";
import { mapProduct, mapCategory } from "./mappers";

const BASE =
  process.env.NEXT_PUBLIC_API ??
  "https://api.api-store.workers.dev/api/bazardor";

export const api = {
  products: (categoryId?: string) =>
    `${BASE}/products${categoryId ? `?category=${categoryId}` : ""}`,
  product: (id: string | number) => `${BASE}/products/${id}`,
  categories: () => `${BASE}/categories`,
  category: (id: string) => `${BASE}/categories/${id}`,
};

export async function fetchProducts(
  categoryId?: string
): Promise<Product[]> {
  const res = await fetch(api.products(categoryId));
  if (!res.ok) return [];
  const json = await res.json();
  const list: RawProduct[] = json.data ?? json;
  return list.map(mapProduct);
}

export async function fetchProduct(
  id: string | number
): Promise<Product | null> {
  const res = await fetch(api.product(id));
  if (!res.ok) return null;
  const json = await res.json();
  const raw: RawProduct = json.data ?? json;
  return mapProduct(raw);
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(api.categories());
  if (!res.ok) return [];
  const json = await res.json();
  const list: RawCategory[] = json.data ?? json;
  return list.map(mapCategory);
}