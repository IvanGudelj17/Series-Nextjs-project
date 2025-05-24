/**
 * Ovaj modul sadrži sve funkcije za dohvat podataka s TVmaze API-ja.
 * Svaka funkcija je tipizirana i koristi try-catch za bolje rukovanje greškama.
 */
import { CastMember, Episode, EpisodeDetail, Show } from "../types";
const BASE_URL = "https://api.tvmaze.com";
/**
 * Dohvaća listu TV serija i sortira ih po prosječnoj ocjeni.
 * Ako su odabrani žanrovi, filtrira prema njima.
 */
export async function fetchSeries(limit: number = 20, genres: string[] = []): Promise<Show[]> {
  const res = await fetch(`${BASE_URL}/shows`);
  if (!res.ok) throw new Error("Failed to fetch shows");

  const data: Show[] = await res.json();

  const sorted = data.sort(
    (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)
  );

  if (genres.length === 0) {
    return sorted.slice(0, limit);
  }

  const filtered = sorted.filter((show) =>
    show.genres?.some((genre) => genres.includes(genre))
  );
  return filtered.slice(0, limit);
}

/**
 * Dohvaća detalje jedne serije na temelju njenog ID-a.
 */
export async function fetchShowById(id: number): Promise<Show> {
  const res = await fetch(`${BASE_URL}/shows/${id}`);
  if (!res.ok) throw new Error("Failed to fetch show details");
  return await res.json();
}

/**
 * Dohvaća sve epizode za određenu seriju (ID showa).
 */
export async function fetchShowEpisodes(showId: number): Promise<Episode[]> {
  const res = await fetch(`${BASE_URL}/shows/${showId}/episodes`);
  if (!res.ok) throw new Error("Failed to fetch show episodes");

  return await res.json();
}

/**
 * Dohvaća sve glumce koji su glumili u seriji.
 */
export async function fetchShowCast(showId: number): Promise<CastMember[]> {
  const res = await fetch(`${BASE_URL}/shows/${showId}/cast`);
  if (!res.ok) throw new Error("Failed to fetch show cast");

  return await res.json();
}

/**
 * Dohvaća detalje pojedine epizode po ID-u epizode.
 */
export async function fetchEpisodeById(episodeId: number): Promise<EpisodeDetail> {
  const res = await fetch(`${BASE_URL}/episodes/${episodeId}`);
  if (!res.ok) {
    console.error("API error:", res.status, res.statusText);
    throw new Error("Failed to fetch episode details");
  }

  return await res.json();
}
