"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import PasswordInput from "@/components/PasswordInput";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const { error } = await signUp.email({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message ?? "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }

    toast.success("সফলভাবে রেজিস্ট্রেশন হয়েছে");
    router.push("/signin");
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-xl border p-6 md:p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="name"
            required
            placeholder="নাম"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand transition-colors"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="ইমেইল"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand transition-colors"
          />

          {/* ✅ Password with show/hide toggle */}
          <PasswordInput
            name="password"
            placeholder="পাসওয়ার্ড (সর্বনিম্ন ৮ অক্ষর)"
            minLength={8}
          />

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full bg-brand text-white"
          >
            {loading ? "অপেক্ষা করুন…" : "রেজিস্টার করুন"}
          </Button>
        </form>

        <div className="my-4 text-center text-sm text-gray-500">অথবা</div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() =>
              signIn.social({ provider: "google", callbackURL: "/" })
            }
            className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 text-sm"
          >
            <FaGoogle className="text-red-500" /> Google দিয়ে সাইন আপ
          </button>
          <button
            type="button"
            onClick={() =>
              signIn.social({ provider: "github", callbackURL: "/" })
            }
            className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 text-sm"
          >
            <FaGithub /> GitHub দিয়ে সাইন আপ
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-brand font-medium">
            সাইন ইন
          </Link>
        </p>
      </div>
    </div>
  );
}