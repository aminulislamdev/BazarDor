"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin?redirect=/profile");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
      setSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border p-6 text-sm text-gray-500">
          ডেটা লোড হচ্ছে...
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const userDisplayName = session.user.name ?? "User";
  const userEmail = session.user.email ?? userDisplayName;
  const avatarUrl =
    session.user.image ??
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      userEmail
    )}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
        </p>
      </div>

      <div className="bg-white rounded-xl border p-6 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={avatarUrl}
            alt={session.user.name ?? "user"}
            width={56}
            height={56}
            unoptimized
            className="w-14 h-14 rounded-full object-cover bg-gray-100"
          />
          <div>
            <div className="font-semibold text-gray-900">
              {session.user.name}
            </div>
            <div className="text-sm text-gray-500">{session.user.email}</div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-50"
        >
          <FiLogOut className="text-base" />
          {signingOut ? "সাইন আউট হচ্ছে…" : "সাইন আউট"}
        </button>
      </div>

      {/* Update info card */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-semibold text-gray-900 mb-2">তথ্য</h2>
        <p className="text-sm text-gray-500 mb-4">
          আপনার নাম পরিবর্তন করতে চাইলে নিচের বাটনে ক্লিক করুন।
        </p>
        <Link
          href="/profile/update"
          className="inline-block px-5 py-2.5 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors text-sm font-medium"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}