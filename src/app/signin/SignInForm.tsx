"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import PasswordInput from "@/components/PasswordInput";

export default function SignInForm() {
  const params = useSearchParams();
  const redirect = params.get("redirect") ?? "/";
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const { error } = await signIn.email({
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    });

    if (error) {
      setLoading(false);
      toast.error(error.message ?? "লগইন ব্যর্থ হয়েছে");
      return;
    }

    toast.success("সফলভাবে লগইন হয়েছে");
    setTimeout(() => {
      window.location.href = redirect;
    }, 1200);
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-xl border p-6 md:p-8">
        <h1 className="text-2xl font-bold text-center mb-6">সাইন ইন</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            required
            placeholder="ইমেইল"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand transition-colors"
          />

          <PasswordInput name="password" placeholder="পাসওয়ার্ড" />

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full bg-brand text-white"
          >
            {loading ? "অপেক্ষা করুন…" : "সাইন ইন"}
          </Button>
        </form>

        <div className="my-4 text-center text-sm text-gray-500">অথবা</div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() =>
              signIn.social({ provider: "google", callbackURL: redirect })
            }
            className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 text-sm"
          >
            <FaGoogle className="text-red-500" /> Google দিয়ে সাইন ইন
          </button>
          <button
            type="button"
            onClick={() =>
              signIn.social({ provider: "github", callbackURL: redirect })
            }
            className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 text-sm"
          >
            <FaGithub /> GitHub দিয়ে সাইন ইন
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-brand font-medium">
            সাইন আপ
          </Link>
        </p>
      </div>
    </div>
  );
}