'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchShowCast } from "@/app/lib/api";
import { CastMember } from "@/app/types";
import Image from "next/image";
import FavoriteButton from "@/app/components/FavoriteButton";
import { FavoriteItem } from "@/app/lib/favoriteStore";

export default function CastPageClient() {
  const { id } = useParams();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const showId = Number(id);
    if (!showId || isNaN(showId)) return;

    // Dohvati cast za seriju
    fetchShowCast(showId)
      .then(setCast)
      .catch(console.error);

    // Dohvati favorite
    fetch("/api/favorites")
      .then((res) => res.json())
      .then(setFavorites)
      .catch(console.error);
  }, [id]);

  if (!cast.length) {
    return <p className="text-white px-4">Loading cast...</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-white mb-10">Cast</h2>
      <div className="space-y-12">
        {cast.map((member, index) => {
          const isEven = index % 2 === 0;
          const imageUrl = member.person.image?.original || "/placeholder.jpg";

          const isFavorite = favorites.some(
            (f) => f.id === member.person.id && f.type === "person"
          );

          return (
            <div
              key={member.person.id}
              className={`flex flex-col hover:shadow-lg max-w-4xl mx-auto transition-shadow hover:scale-101 transition-transform duration-200 ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-6 bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6`}
            >
              <div className="relative w-full sm:w-72 h-[400px] flex-shrink-0">
                <Image
                  src={imageUrl}
                  alt={member.person.name}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="flex-1 text-white space-y-2 text-center lg:text-center">
                <h3 className="text-2xl font-bold">{member.person.name}</h3>
                <p className="text-lg text-gray-300">
                  as <span className="italic text-gray-400">{member.character.name}</span>
                </p>
              </div>

              <div>
                <FavoriteButton
                  id={member.person.id}
                  type="person"
                  name={member.person.name}
                  image={member.person.image?.medium}
                  isFavorite={isFavorite}
                />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
