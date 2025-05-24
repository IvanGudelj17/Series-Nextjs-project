export type FavoriteType = "show" | "person"

//tipiziranje podataka koje ima jedan favorite clan
export type FavoriteItem={
    id: number;
    type: FavoriteType;
    name: string;
    image?: string;
}
//lista favorita
let favorites: FavoriteItem[]=[];

//metoda za GET za dohvat svih favorita - vraca ih iz memorije
export function getFavorites(): FavoriteItem[]{return favorites;}

//metoda za POST za dodavanje novog favorita s provjerom ako već postoji
export function addFavorite(item: FavoriteItem): void {
    const ItemExists = favorites.some(item => item.id === item.id && item.type === item.type);
    if(!ItemExists){favorites.push(item)};
}

//metoda za DELETE za uklanjanje favorita po id i type-u
export function removeFavorite(id:number,type:FavoriteType): void {
    favorites = favorites.filter(item => !(item.id === id && item.type === type));
}