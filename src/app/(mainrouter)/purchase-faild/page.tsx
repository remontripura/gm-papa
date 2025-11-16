import { Home } from "lucide-react";
import Link from "next/link";

export default async function ErrorPage() {
  return (
    <div className="md:min-h-screen h-[60vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        {/* Error Icon / Heading */}
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
            <span className="text-red-500 text-3xl">⚠️</span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-red-600 mb-2">
          Failed to Process
        </h2>
        <p className="text-gray-600 mb-6">
          Something went wrong while processing your request.  
          Please try again or return to the homepage.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all"
        >
          <Home size={18} />
          Go Home
        </Link>
      </div>
    </div>
  );
}
