"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EpisodeDetail } from "@/app/types";
import Image from "next/image";
import { Star as StarIcon } from "lucide-react";
/**
 * Komponenta koja dohvaća i prikazuje detalje o jednoj epizodi serije.
 * Podaci se dohvaćaju klijentski korištenjem useEffect i dynamic routing parametra episodeId.
 */
export default function EpisodeDetailPageClient() {
  const { episodeId } = useParams(); // Dohvaćanje ID-ja epizode iz URL-a
  const [episode, setEpisode] = useState<EpisodeDetail | null>(null); // Stanje za spremljene podatke

  // Efekt koji dohvaća podatke o epizodi kad se componenta učita ili promijeni ID epizode.
  useEffect(() => {
    const fetchEpisode = async () => {
      if (!episodeId || Array.isArray(episodeId)) return; // Validacija ID-ja

      const res = await fetch(`/api/episode/${episodeId}`);
      if (res.ok) {
        const data = await res.json();
        setEpisode(data);
      }
    };

    fetchEpisode();
  }, [episodeId]);

  // Prikaz loadera dok se čeka odgovor
  if (!episode) {
    return <p className="text-white px-4">Loading episode...</p>;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-white bg-gray-900 mt-4">
      <h1 className="text-4xl font-bold mb-8 text-center">{episode.name}</h1>

      {/* Prikaz slike epizode */}
      {episode.image?.original && (
        <div className="relative w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-lg mb-8">
          <Image
            src={episode.image.original}
            alt={episode.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Informacije o epizodi: sezona, broj, datum itd. */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-300">
          <p><strong>Season:</strong> {episode.season}</p>
          <p><strong>Episode:</strong> {episode.number}</p>
          <p><strong>Air date:</strong> {episode.airdate}</p>
          <p><strong>Runtime:</strong> {episode.runtime} min</p>
          <p><strong>Rating:</strong> <StarIcon className="w-4 h-4 text-yellow-400" /> {episode.rating?.average ?? "N/A"}</p>
        </div>

        {/* Opis epizode (formatiran HTML iz API-ja) */}
        <div
          className="prose dark:prose-invert max-w-none mt-4 text-base leading-relaxed"
          dangerouslySetInnerHTML={{__html: episode.summary || "<p>No summary available.</p>",}}
        />
      </div>
    </main>
  );
}
