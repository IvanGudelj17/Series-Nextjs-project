/**
 * Stranica za prikaz svih epizoda određene serije.
 * Klijentska komponenta `ShowPageClient` koristi `useParams()` za dohvat ID-ja serije i dohvaća epizode.
 */

import ShowPageClient from "./ShowPageClient";

export default function EpisodesPage() {
  return <ShowPageClient />;
}