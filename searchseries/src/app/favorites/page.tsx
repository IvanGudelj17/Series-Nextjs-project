'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { FavoriteItem } from "@/app/types";

/**
 * Klijentska stranica koja prikazuje korisnikove spremljene favorite:
 * - Podijeljeno na TV serije i glumce
 * - Omogućuje uklanjanje pojedinog favorita
 */
export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Dohvaća sve favorite s API-ja (GET /api/favorites)
  const fetchFavorites = async () => {
    const res = await fetch("/api/favorites", { cache: "no-store" });
    if (res.ok) {
      const data: FavoriteItem[] = await res.json();
      setFavorites(data);
    }
    setLoading(false);
  };

  // Dohvati favorite pri prvom učitavanju stranice
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Uklanja odabrani favorit i ažurira lokalnu listu
  const removeFavorite = async (id: number, type: "show" | "person") => {
    await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type }),
    });

    // Lokalna promjena stanja nakon uklanjanja
    setFavorites((prev) => prev.filter((item) => item.id !== id || item.type !== type));
  };
  const shows = favorites.filter((f) => f.type === "show");
  const people = favorites.filter((f) => f.type === "person");
  if (loading) return <p className="text-white">Loading favorites...</p>;

  return (
    <main className="space-y-12 text-white py-10">
      <h1 className="text-4xl font-bold text-center">Your Favorites</h1>

      {/* omiljene serije */}
      <section>
        <h2 className="text-2xl text-blue-400 font-semibold mb-4">TV Series</h2>
        {shows.length === 0 ? (
          <p className="text-gray-400">No favorite series yet. Add some!</p>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-2">
            {shows.map((show) => (
              <div
                key={`show-${show.id}`}
                className="relative min-w-[180px] bg-gray-800 rounded-lg shadow"
              >
                <Image
                  src={show.image || "/placeholder.jpg"}
                  alt={show.name}
                  width={180}
                  height={270}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 text-sm font-medium">{show.name}</div>

                {/* Gumb za uklanjanje serije iz favorita */}
                <button
                  onClick={() => removeFavorite(show.id, "show")}
                  className="absolute top-2 right-2 text-xs bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow transition-transform transform hover:scale-110"
                  title="Remove from favorites"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* omiljeni glumci */}
      <section>
        <h2 className="text-2xl text-blue-400 font-semibold mb-4">Actors</h2>
        {people.length === 0 ? (
          <p className="text-gray-400">No favorite actors yet. Add some!</p>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-2">
            {people.map((person) => (
              <div
                key={`person-${person.id}`}
                className="relative min-w-[160px] bg-gray-800 rounded-lg shadow"
              >
                <Image
                  src={person.image || "/placeholder.jpg"}
                  alt={person.name}
                  width={160}
                  height={240}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 text-sm font-medium">{person.name}</div>

                {/* Gumb za uklanjanje glumca iz favorita */}
                <button
                  onClick={() => removeFavorite(person.id, "person")}
                  className="absolute top-2 right-2 text-xs bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow transition-transform transform hover:scale-110"
                  title="Remove from favorites"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
