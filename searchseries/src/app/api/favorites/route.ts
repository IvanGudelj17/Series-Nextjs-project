// src/app/api/favorites/route.ts

import { NextRequest, NextResponse } from "next/server";
import { FavoriteItem } from "@/app/lib/favoriteStore";

/**
 * Globalna memorija za čuvanje favorita.
 */
let favorites: FavoriteItem[] = [];

/**
 * GET /api/favorites
 * Vraća listu svih spremljenih favorita.
 */
export async function GET() {
  return NextResponse.json(favorites);
}

/**
 * POST /api/favorites
 * Dodaje novi favorit ako već ne postoji (po id i type-u).
 * Tijelo zahtjeva mora sadržavati objekt: { id, type, name, image }
 */
export async function POST(req: NextRequest) {
  const newItem: FavoriteItem = await req.json();
  const alreadyExists = favorites.some((f) => f.id === newItem.id && f.type === newItem.type);
  if (!alreadyExists) {favorites.push(newItem);}
  return NextResponse.json({ success: true });
}
/**
 * DELETE /api/favorites
 * Briše favorit iz memorije po kombinaciji `id` i `type`.
 * Tijelo zahtjeva: { id, type }
 */
export async function DELETE(req: NextRequest) {
 const { id, type }: { id: number; type: FavoriteItem["type"] } = await req.json();
  favorites = favorites.filter((f) => !(f.id === id && f.type === type));
  return NextResponse.json({ success: true });
}
