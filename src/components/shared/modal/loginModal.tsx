"use client";

import { useScrollLock } from "@/lib/useScrollLock/useScrollLock";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function LoginModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  useScrollLock(isOpen);
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/10 backdrop-blur-[4px] flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-xl md:w-[500px] w-[350px]  shadow-lg overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/pubg.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
        <div
          onClick={onClose}
          className="absolute right-3 top-3 size-8 flex items-center justify-center text-white rounded-full bg-gray-400 hover:bg-gray-500 cursor-pointer z-20"
        >
          <RxCross2 />
        </div>
        <div className="relative z-10 p-3 py-4 text-white">
          <div className="flex justify-center items-center">
            <Image
              className="w-[120px]"
              src="/logo.png"
              alt="logo"
              width={500}
              height={500}
            />
          </div>
          <div className="flex w-full justify-center mt-8">
            <button
              onClick={() => {
                setLoading(true);
                signIn("google", { callbackUrl: "/verify-account" });
              }}
              className="flex cursor-pointer items-center justify-center space-x-3 text-white font-semibold px-6 py-3 rounded-md shadow-md transition bg-gray-800"
            >
              <Image
                className="size-6"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                alt="img"
                width={300}
                height={300}
              />
              <span> {loading ? "Processing..." : "Sign in with Google"}</span>
            </button>
          </div>
          <p className="text-[14px] text-center mt-6">
            By payment, {`you're`} agreeing to{" "}
            <Link href="/privacy-policy" className="text-blue-600 underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms-and-service" className="text-blue-600 underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
