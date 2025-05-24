'use client';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

/**
 * Layout za Favorites stranicu – uključuje navigacijsku traku s "Back" gumbom i linkom na Home.
 */
export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <header className="bg-gray-900 text-white py-4 shadow-md mb-6">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          
          {/* Back gumb s ikonom */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Linkovi za navigaciju */}
          <nav className="flex gap-6 text-sm">
            <Link
              href="/"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition"
            >
              <Home className="w-4 h-4" /><span>Home</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4">{children}</main>
    </>
  );
}