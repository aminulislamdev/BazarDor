"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function NavAuth() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) {
    return (
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/signin"
          className="text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
        >
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="text-sm px-3 py-1.5 bg-brand text-white rounded-lg hover:bg-brand-dark font-medium transition-colors"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  // Logged in — profile chip + dropdown
  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-semibold text-sm">
          {session.user.name?.[0]?.toUpperCase() ?? "?"}
        </div>
        <div className="hidden sm:block text-sm font-medium text-gray-800">
          {session.user.name?.split(" ")[0]}
        </div>
        <svg
          className={`w-3 h-3 text-gray-500 transition-transform ${open ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          {/* User info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="font-semibold text-gray-900 truncate">
              {session.user.name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {session.user.email}
            </div>
          </div>

          {/* Menu items */}
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FiUser className="text-brand" />
            <span>আমার প্রোফাইল</span>
          </Link>

          <button
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
          >
            <FiLogOut />
            <span>সাইন আউট</span>
          </button>
        </div>
      )}
    </div>
  );
}