"use client";

import { useState } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";

export default function UpdateForm() {
  const { data: session } = useSession();
  const [editedName, setEditedName] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const name = editedName ?? session?.user.name ?? "";

  const hasChanges = name.trim() && name !== session?.user.name;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!hasChanges) return;

    setUpdating(true);
    const { error } = await updateUser({ name });
    setUpdating(false);

    if (error) {
      toast.error(error.message ?? "আপডেট ব্যর্থ হয়েছে");
      return;
    }
    toast.success("তথ্য আপডেট হয়েছে");
  }

  return (
    <div className="bg-white rounded-xl border p-6">
      <h2 className="font-semibold text-gray-900 mb-2">তথ্য</h2>
      <p className="text-sm text-gray-500 mb-4">
        আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
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
            value={name}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="আপনার নাম"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand transition-colors"
          />
        </div>

        <Button
          type="submit"
          isDisabled={updating || !hasChanges}
          className="w-full bg-brand text-white font-medium"
        >
          {updating ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}
        </Button>
      </form>
    </div>
  );
}