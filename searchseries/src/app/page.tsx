'use client';
import { useEffect, useState } from "react";
import ShowCard from "./components/ShowCard";
import { fetchSeries } from "./lib/api";
import { Show } from "./types";

// Lista žanrova koja se koristi za filtriranje – mogla bi doći iz API-ja, ali ovdje je statična
const allGenres = ["Drama", "Action", "Comedy", "Thriller", "Romance", "Fantasy", "Science-Fiction"];

export default function HomePage() {
  // State koji čuva odabrane žanrove
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // State u kojem se pohranjuju dohvaćene serije
  const [shows, setShows] = useState<Show[]>([]);

  // useEffect koji se poziva svaki put kada se promijeni odabrani žanr
  // Dohvaća serije s filtracijom
  useEffect(() => {
    const loadShows = async () => {
      const result = await fetchSeries(50, selectedGenres);
      setShows(result);
    };
    loadShows();
  }, [selectedGenres]);

  // Funkcija za toggleanje žanra u listi odabranih
  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Naslov stranice */}
      <h1 className="text-3xl font-bold mb-6">
        TV Series You Must <span className="text-blue-500">Watch</span>
      </h1>

      {/* Checkbox filter po žanrovima */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {allGenres.map((genre) => {
            const isSelected = selectedGenres.includes(genre);
            return (
              <label
                key={genre}
                className={`cursor-pointer px-4 py-2 rounded-full border text-sm transition 
                  ${isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-blue-400"
                  }`}
              >
                {/* Checkbox je skriven, ali kontrolira selekciju */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleGenreChange(genre)}
                  className="hidden"
                />
                {genre}
              </label>
            );
          })}
        </div>
      </div>

      {/* Prikaz kartica serija */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
{shows.map((show, index) => (
  <ShowCard
    key={show.id}
    id={show.id}
    name={show.name}
    image={show.image}
    rating={show.rating}
    priority={index === 0} // Prva serija ima prioritet za brže učitavanje slike da poboljšam SEO
  />
))}
      </div>
    </main>
  );
}