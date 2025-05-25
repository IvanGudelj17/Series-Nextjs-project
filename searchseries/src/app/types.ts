/**
 * Tip koji opisuje osnovne informacije o jednoj TV seriji.
 * Koristi se za prikaz liste serija i za detaljnu stranicu serije.
 */
export type Show = {
  id: number;
  name: string;
  image?: {
    medium?: string;
    original?: string;
  };
  rating?: {
    average?: number;
  };
  genres?: string[];
  summary?: string;
  status?: string;
};

/**
 * Tip koji opisuje jednu epizodu unutar serije.
 * Koristi se u listi epizoda.
 */
export type Episode = {
  id: number;
  name: string;
  image?: {
    medium?: string;
    original?: string;
  };
  summary?: string;
};

/**
 * Tip koji opisuje punu informaciju o epizodi – koristi se na detaljnoj stranici epizode.
 */
export type EpisodeDetail = {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  summary?: string;
  runtime?: number;
  type?: string;
  image?: {
    medium?: string;
    original?: string;
  };
  rating?: {
    average?: number;
  };
};

/**
 * Tip koji opisuje jednog glumca i njegov lik u seriji.
 * Koristi se na cast stranici.
 */
export type CastMember = {
  person: {
    id: number;
    name: string;
    image?: {
      medium?: string;
      original?: string;
    };
  };
  character: {
    name: string;
    image?: {
      medium?: string;
      original?: string;
    };
  };
};

/**
 * Tip koji opisuje jedan omiljeni element – seriju ili glumca.
 * Koristi se u localStorage i na /favorites stranici.
 */
export type FavoriteItem = {
  id: number;
  type: "show" | "person";
  name: string;
  image?: string;
};
/**
 * Tipovi za FavoriteButton komponentu
 * FavoritesType definira dopuštene vrijednosti – "show" za serije i "person" za glumce.
 * FavoriteButtonProps definira sve podatke potrebne za upravljanje omiljenim stavkama u aplikaciji (id, tip, ime, slika i početni status favorita).
 */
export type FavoritesType = "show" | "person";

export type FavoriteButtonProps = {
  id: number;
  type: FavoritesType;
  name: string;
  image?: string;
  isFavorite: boolean;
};
/**
 * Tip propsa koji komponenta ShowCard prima za prikaz jedne serije.
 * Koristi se samo medium slika i prosječna ocjena serije.
 */
export type ShowCardProps = {
  id: number;
  name: string;
  image?: {
    medium?: string;
  };
  rating?: {
    average?: number;
  };
  priority?: boolean;
};

