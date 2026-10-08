"use client";

import { FiChevronDown } from "react-icons/fi";
import type { SortOption } from "@/types";

const SORTS: { k: SortOption; label: string }[] = [
  { k: "default", label: "ডিফল্ট" },
  { k: "asc", label: "দাম: কম থেকে বেশি" },
  { k: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-select"
        className="text-xl text-gray-800 whitespace-nowrap"
      >
        সাজান:
      </label>

      <div className="relative">
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none border border-gray-200 rounded-lg pl-3 pr-9 py-2 text-sm bg-white focus:outline-none focus:border-brand transition-colors cursor-pointer"
        >
          {SORTS.map((s) => (
            <option key={s.k} value={s.k}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <FiChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
      </div>
    </div>
  );
}