"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { FaResearchgate } from "react-icons/fa6";
import { RotateCcw } from "lucide-react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-[20px] font-medium text-red-500 mb-4">
        Something went wrong!
      </h1>
      <div className="flex items-center gap-2">
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer flex items-center gap-1">
            <FaHome /> Back home
          </button>
        </Link>{" "}
        <button
          onClick={reset}
          className="bg-red-500 hover:bg-red-700 cursor-pointer text-white py-2 px-4 rounded flex items-center gap-1"
        >
          <RotateCcw />
          Try Again
        </button>
      </div>
    </div>
  );
}
