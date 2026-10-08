"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
  name: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
};

export default function PasswordInput({
  name,
  placeholder = "পাসওয়ার্ড",
  required = true,
  minLength,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        name={name}
        type={show ? "text" : "password"}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg pl-3 pr-11 py-2.5 text-sm focus:outline-none focus:border-brand transition-colors"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
        tabIndex={-1}
      >
        {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
      </button>
    </div>
  );
}