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
    <nav className="border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-hide">
        {cats.map((c) => {
          const active = pathname === `/category/${c.id}`;
          return (
            <Link
              key={c.id}
              href={`/category/${c.id}`}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors ${active
                  ? "text-brand font-semibold border-brand"
                  : "text-gray-600 border-transparent hover:text-brand hover:border-brand/30"
                }`}
            >
              {c.icon && <span>{c.icon}</span>}
              <span>{c.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}