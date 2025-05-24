/**
 * Layout koji se koristi za sve rute unutar /show/[id]/... (epizode, glumci, detalji).
 * Dodaje zajednički header (navigaciju i back gumb) i postavlja osnovni layout oko sadržaja.
 */

import ClientHeader from "@/app/components/ClientHeader";

export default function ShowLayout({ children,}: {children: React.ReactNode;}) {
  return (
    <>
      {/* Navigacijska traka s back gumbom i linkovima (Home, Favorites) */}
      <ClientHeader />

      {/* Glavni sadržaj stranice s paddingom i centralnom širinom */}
      <main className="max-w-6xl mx-auto px-4">{children}</main>
    </>
  );
}
