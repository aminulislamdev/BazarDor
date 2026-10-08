"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import type { Product, SortOption } from "@/types";

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sorted =
    sort === "asc"
      ? [...products].sort((a, b) => a.price - b.price)
      : sort === "desc"
        ? [...products].sort((a, b) => b.price - a.price)
        : products;

  return (
    <>
      <div className="flex justify-end mb-4">
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </>
  );
}