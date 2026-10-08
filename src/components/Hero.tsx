import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { formatBnDate } from "@/lib/bn";
import banner from "../../public/image/bazar-hero.png";

export default async function Hero() {
  // ✅ Force dynamic — প্রতি request এ নতুন date
  await connection();

  const today = formatBnDate();

  return (
    <section className="bg-brand-light">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-center md:text-left">
          <span className="inline-block text-xs md:text-sm bg-brand/10 text-brand px-3 py-1 rounded-full font-medium">
          {today}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            আজকের বাজারদর দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম সহ নিত্যপ্রয়োজনীয় পণ্যের
            সর্বশেষ বাজারদর এক জায়গায়। প্রতিদিন আপডেট।
          </p>
          <Link
            href="#সব-পণ্য"
            className="inline-block bg-brand text-white px-6 py-2.5 rounded-lg hover:bg-brand-dark transition-colors font-medium"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src={banner}
            alt="বাজারের ঝুড়ি"
            width={400}
            height={400}
            className="w-full max-w-md h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}