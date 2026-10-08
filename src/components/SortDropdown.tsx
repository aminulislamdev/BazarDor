"use client";

import { SortOption } from "@/types";

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
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-brand"
    >
      {SORTS.map((s) => (
        <option key={s.k} value={s.k}>
          {s.label}
        </option>
      ))}
    </select>
  );
}