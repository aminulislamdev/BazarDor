import Link from "next/link";
import { toBn } from "@/lib/bn";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* ─── Big 404 Illustration ─── */}
        <div className="relative inline-block mb-6">
          {/* Shopping cart emoji as illustration */}
          <div className="text-[7rem] md:text-[9rem] leading-none select-none">
            🛒
          </div>

          {/* Floating 404 badge */}
          <div className="absolute -top-2 -right-2 bg-brand text-white font-bold text-lg md:text-xl px-3 py-1.5 rounded-full shadow-lg rotate-12">
            {toBn(404)}
          </div>
        </div>

        {/* ─── Heading ─── */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          ওহ! পাতাটি খুঁজে পাওয়া যায়নি
        </h1>

        {/* ─── Description ─── */}
        <p className="text-gray-500 text-base md:text-lg mb-8 max-w-md mx-auto">
          আপনি যে পাতাটি খুঁজছেন সেটা নেই, মুছে ফেলা হয়েছে, অথবা URL ভুল
          লেখা হয়েছে।
        </p>

        {/* ─── CTA Buttons ─── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors font-medium w-full sm:w-auto"
          >
            <FiHome size={18} />
            হোম পেজে ফিরে যান
          </Link>

          <button
            onClick={undefined}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium w-full sm:w-auto"
            data-client
          >
            <FiArrowLeft size={18} />
            আগের পাতায় যান
          </button>
        </div>

        {/* ─── Popular Categories ─── */}
        <div>
          <p className="text-sm text-gray-400 mb-3">
            জনপ্রিয় ক্যাটাগরি দেখুন
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <CategoryChip href="/category/chal" emoji="🍚" label="চাল" />
            <CategoryChip href="/category/dal" emoji="🥘" label="ডাল" />
            <CategoryChip href="/category/tel" emoji="🛢️" label="তেল" />
            <CategoryChip href="/category/sobji" emoji="🥬" label="সবজি" />
            <CategoryChip href="/category/mach" emoji="🐟" label="মাছ" />
            <CategoryChip href="/category/mangsho" emoji="🍗" label="মাংস" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryChip({
  href,
  emoji,
  label,
}: {
  href: string;
  emoji: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-brand hover:text-brand transition-colors"
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </Link>
  );
}