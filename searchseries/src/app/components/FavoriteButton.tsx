"use client";
import { useState } from "react";
import { FavoriteButtonProps } from "../types";

/**
 * Komponenta za prikaz gumba za dodavanje ili uklanjanje iz favorita.
 * Ovisno o statusu, prikazuje različite boje i tekst te šalje POST ili DELETE zahtjev na API.
 */
export default function FavoriteButton({
  id,
  type,
  name,
  image,
  isFavorite,
}: FavoriteButtonProps) {
  // Lokalno stanje – prati je li ovaj item trenutno u favoritima
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(isFavorite);

  // Funkcija za izmjenu favorita (toggle) – asinhrono šalje zahtjev na server
  const handleToggle = async () => {
    if (favoriteStatus) {
      // Ako je već favorit izbriši ga iz favorita
      await fetch(`/api/favorites`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type }),
      });
      setFavoriteStatus(false);
    } else {
      // Inače ga dodaj u favorite
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, name, image }),
      });
      setFavoriteStatus(true);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-2 mt-4 text-sm rounded-md font-medium transition ${
        favoriteStatus? "bg-red-500 text-white hover:bg-red-600": "bg-blue-500 text-white hover:bg-blue-600"}`}>
      {/* Prikaz teksta ovisno o statusu  i je li vec dodan u favorite ili ne*/}
      {favoriteStatus ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
