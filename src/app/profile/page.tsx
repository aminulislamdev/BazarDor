"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import UpdateForm from "@/components/UpdateForm";

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
      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
      setSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 w-64 bg-gray-100 rounded mb-6 animate-pulse" />
        <div className="bg-white rounded-xl border p-6 h-24 animate-pulse mb-4" />
        <div className="bg-white rounded-xl border p-6 h-48 animate-pulse" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">লগইন পেজে নিয়ে যাওয়া হচ্ছে…</p>
      </div>
    );
  }

  // ✅ First letter of name (uppercase)
  const firstLetter = session.user.name?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
        </p>
      </div>

      {/* User card */}
      <div className="bg-white rounded-xl border p-6 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* ✅ Letter avatar */}
          <div className="w-14 h-14 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xl shrink-0">
            {firstLetter}
          </div>
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

      {/* Update form */}
      <UpdateForm />
    </div>
  );
}