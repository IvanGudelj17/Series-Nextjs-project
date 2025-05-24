'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchShowEpisodes } from "@/app/lib/api";
import { Episode } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

export default function EpisodesPageClient() {
  const params = useParams();
  const id = Number(params?.id);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    if (!id || isNaN(id)) return;
    fetchShowEpisodes(id).then(setEpisodes).catch(console.error);
  }, [id]);

  const stripHtml = (summary: string): string =>
    summary.replace(/<[^>]+>/g, "");

  if (!episodes.length) return <p className="text-white">Loading episodes...</p>;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-8 text-white">Episodes</h2>

      <div className="space-y-6">
        {episodes.map((episode, index) => (
          <Link key={episode.id} href={`/show/${id}/episodes/${episode.id}`} className="block">
            <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition hover:scale-[1.01]">
              <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                <Image
                  src={episode.image?.original || "/placeholder.jpg"}
                  alt={episode.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {index + 1}. {episode.name}
                </h3>
                <p className="text-sm text-gray-300">
                  {episode.summary
                    ? stripHtml(episode.summary).slice(0, 150) + "..."
                    : "No Description for this episode..."}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
