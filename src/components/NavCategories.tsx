"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchCategories } from "@/lib/api";
import type { Category } from "@/types";

export default function NavCategories() {
  const pathname = usePathname();
  const [cats, setCats] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories()
      .then(setCats)
      .catch(() => setCats([]));
  }, []);

  return (
    <nav className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Horizontal scroll container with fade edges */}
        <div className="relative">
          <ul className="flex gap-1 overflow-x-auto scrollbar-hide scroll-smooth-touch px-4">
            {cats.map((c) => {
              const active = pathname === `/category/${c.id}`;
              return (
                <li key={c.id} className="shrink-0">
                  <Link
                    href={`/category/${c.id}`}
                    className={`flex items-center gap-1.5 px-3 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors ${active
                        ? "text-brand font-semibold border-brand"
                        : "text-gray-600 border-transparent hover:text-brand hover:border-brand/30"
                      }`}
                  >
                    {c.icon && <span>{c.icon}</span>}
                    <span>{c.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ✅ Right fade indicator (mobile only) */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-white to-transparent md:hidden" />
        </div>
      </div>
    </nav>
  );
}