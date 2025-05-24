import Image from "next/image";
import Link from "next/link";
import { Star as StarIcon } from "lucide-react";
import { ShowCardProps } from "../types";

/**
 * Komponenta za prikaz osnovnih informacija o jednoj seriji:
 * Slika, naziv i ocjena. Cijela kartica je kao Link za navigaciju na detalje serije.
 */
export default function ShowCard({ id, name, image, rating }: ShowCardProps) {
  return (
    <Link
      href={`/show/${id}`}
      className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform hover:scale-[1.02]"
    >
      {/* Slika serije s fallback placeholderom ako nema slike */}
      <div className="relative w-full h-72 bg-gray-300">
        {!image?.medium && (<div className="absolute inset-0 bg-gray-400 animate-pulse" />)}
        <Image
          src={image?.medium || "/placeholder.jpg"}
          alt={name}
          fill
          className="object-cover"
          unoptimized={!image?.medium} // ne koristi optimizaciju ako je placeholder
        />
      </div>
      {/* Naziv i ocjena serije */}
      <div className="p-4 bg-gray-800">
        <h3 className="text-lg font-semibold text-white truncate">{name}</h3>
        <p className="text-sm text-gray-400 mt-1"> <StarIcon className="w-4 h-4 text-yellow-400" /> {rating?.average ?? "N/A"}</p>
      </div>
    </Link>
  );
}