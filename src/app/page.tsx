import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types";
import { Suspense } from "react";

function Section({
  id,
  title,
  subtitle,
  items,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  items: Product[];
}) {
  if (items.length === 0) return null;
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 py-8 scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-bold mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

function HeroSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-8 w-40 bg-gray-200 rounded-md mb-4" />
      <div className="h-12 w-full max-w-xl bg-gray-200 rounded-md mb-4" />
      <div className="h-4 w-2/3 bg-gray-200 rounded-md mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-xl h-64" />
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  const products = await fetchProducts();

  const risers = [...products]
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);
  const fallers = [...products]
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Section title="আজ দাম বেড়েছে ▲" items={risers} />
      <Section title="আজ দাম কমেছে ▼" items={fallers} />
      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="বাজারভিত্তিক সর্বশেষ দর"
        items={products}
      />
    </>
  );
}