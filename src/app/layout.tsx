import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProviderWrapper } from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস সহ নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <ToastProviderWrapper>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProviderWrapper>
      </body>
    </html>
  );
}