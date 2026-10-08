import Link from "next/link";
import { toBn } from "@/lib/bn";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-6xl font-bold text-brand">{toBn(404)}</h1>
      <p className="text-gray-600 text-lg">পাতাটি খুঁজে পাওয়া যায়নি।</p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors font-medium"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}