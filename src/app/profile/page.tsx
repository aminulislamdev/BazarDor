"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

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
    router.push("/signin?redirect=/profile");
    return null;
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    const nextName = name ?? session?.user.name ?? "";
    if (!nextName.trim() || nextName === session?.user.name) return;

    setUpdating(true);
    const { error } = await updateUser({ name: nextName });
    setUpdating(false);

    if (error) {
      toast.error(error.message ?? "আপডেট ব্যর্থ হয়েছে");
      return;
    }
    toast.success("তথ্য আপডেট হয়েছে");
  }

  const avatarUrl =
    session.user.image ??
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      session.user.email
    )}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
        </p>
      </div>

      {/* User card */}
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
          onClick={() => signOut()}
          className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
        >
          <FiLogOut className="text-base" />
          সাইন আউট
        </button>
      </div>

      {/* Update form */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-semibold text-gray-900 mb-4">তথ্য</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              নাম
            </label>
            <input
              id="name"
              type="text"
              value={name ?? session.user.name ?? ""}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand transition-colors"
              placeholder="আপনার নাম"
            />
          </div>

          <Button
            type="submit"
            isDisabled={
              updating ||
              !(name ?? session.user.name ?? "").trim() ||
              (name ?? session.user.name) === session.user.name
            }
            className="w-full bg-brand text-white font-medium"
          >
            {updating ? "আপডেট হচ্ছে…" : "আপডেট"}
          </Button>
        </form>
      </div>
    </div>
  );
}