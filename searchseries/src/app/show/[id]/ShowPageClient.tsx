// src/app/show/[id]/ShowPageClient.tsx

'use client';

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { fetchShowById } from "@/app/lib/api";
import { Show } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/app/components/FavoriteButton";
import { StarIcon } from "lucide-react";

/**
 * Klijentska komponenta za prikaz detalja o jednoj seriji.
 * Dohvaća podatke o seriji po ID-ju, prikazuje osnovne informacije,
 * te omogućuje navigaciju na epizode i cast, kao i dodavanje u favorite.
 */
export default function ShowPageClient() {
  const params = useParams();
  const id = Number(params?.id);
  const [show, setShow] = useState<Show | null>(null);

  useEffect(() => {
    if (!id || isNaN(id)) return;
    fetchShowById(id)
      .then(setShow)
      .catch(() => notFound());
  }, [id]);

  if (!show) return <p className="text-white p-4">Loading...</p>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {show.image?.original && (
          <div className="relative w-full md:w-[500px] h-96">
            <Image
              src={show.image.original}
              alt={show.name}
              fill
              className="object-cover rounded"
              priority
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-blue-500">{show.name}</h1>
          <p className="text-gray-400 mb-2"> <StarIcon className="w-4 h-4 text-yellow-400" /> {show.rating?.average ?? "N/A"}</p>
          <p className="text-sm text-gray-400 mb-2">Status: {show.status}</p>
          <p className="text-sm text-gray-400 mb-4">Genres: {show.genres?.join(", ") || "Unknown"}</p>
          <div
            className="prose prose-sm max-w-none text-white"
            dangerouslySetInnerHTML={{ __html: show.summary || "<p>Opis nije dostupan.</p>" }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href={`/show/${show.id}/episodes?name=${encodeURIComponent(show.name)}`}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition text-center"
          >
            View Episodes
          </Link>
          <Link
            href={`/show/${show.id}/cast`}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition text-center"
          >
            View Cast
          </Link>
          <FavoriteButton
            id={show.id}
            type="show"
            name={show.name}
            image={show.image?.medium}
            isFavorite={false} // ako treba, možeš dohvatiti favorite kao i u ostalim komponentama
          />
        </div>
      </div>
    </main>
  );
}
