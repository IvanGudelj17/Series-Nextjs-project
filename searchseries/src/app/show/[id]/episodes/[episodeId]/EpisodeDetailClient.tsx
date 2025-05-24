'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchEpisodeById } from "@/app/lib/api";
import { EpisodeDetail } from "@/app/types";
import Image from "next/image";

export default function EpisodeDetailClient() {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState<EpisodeDetail | null>(null);

  useEffect(() => {
    const id = Number(episodeId);
    if (!id || isNaN(id)) return;

    fetchEpisodeById(id)
      .then(setEpisode)
      .catch(() => setEpisode(null));
  }, [episodeId]);

  if (!episode) return <p className="text-white px-4">Loading episode...</p>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-white bg-gray-900 mt-4">
      <h1 className="text-4xl font-bold mb-8 text-center">{episode.name}</h1>

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

      <div className="bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-300">
          <p><strong>Season:</strong> {episode.season}</p>
          <p><strong>Episode:</strong> {episode.number}</p>
          <p><strong>Air date:</strong> {episode.airdate}</p>
          <p><strong>Runtime:</strong> {episode.runtime} min</p>
          <p><strong>Rating:</strong> ⭐ {episode.rating?.average ?? "N/A"}</p>
        </div>

        <div
          className="prose dark:prose-invert max-w-none mt-4 text-base leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: episode.summary || "<p>No summary available.</p>",
          }}
        />
      </div>
    </main>
  );
}
