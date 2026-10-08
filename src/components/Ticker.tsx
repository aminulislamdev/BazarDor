"use client";

import { useEffect, useState } from "react";
import { toBn, formatChange } from "@/lib/bn";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types";

export default function Ticker() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((list) => setItems(list.slice(0, 10)))
      .catch(() => setItems([]));
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="bg-brand-light border-y border-brand/20 overflow-hidden">
      <div className="flex animate-[marquee_35s_linear_infinite] whitespace-nowrap py-1.5 hover:paused">
        {[...items, ...items].map((p, i) => {
          const ch = formatChange(p.change, p.changeDir);
          const color =
            ch.dir === "up"
              ? "text-green-600"
              : ch.dir === "down"
                ? "text-red-600"
                : "text-gray-500";
          return (
            <span key={i} className="mx-4 text-xs text-gray-800">
              {p.emoji} {p.name} · <b>{toBn(p.price)}</b> টাকা/{p.unit}{" "}
              <span className={color}>{ch.text}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}