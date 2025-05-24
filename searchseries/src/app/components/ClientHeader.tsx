// src/app/components/ClientHeader.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Star, ArrowLeft } from "lucide-react";

/**
 * Klijentska navigacijska traka koja uključuje:
 * - Gumb za povratak na prethodnu stranicu
 * - Linkove za Home i Favorites
 * 
 * Komponenta se koristi unutar layouta i dostupna je na svim podstranicama.
 */
export default function ClientHeader() {
  const router = useRouter();
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md mb-6">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        
        {/* Gumb za povratak unazad - koristi Next router.back() */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Glavna navigacija: Home i Favorites */}
        <nav className="flex gap-6 text-sm">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-blue-300 text-blue-400 transition"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-1 hover:text-blue-300 text-blue-400 transition"
          >
            <Star className="w-4 h-4" />
            <span>Favorites</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
