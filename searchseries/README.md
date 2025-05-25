# 🎬 SearchSeries

SearchSeries je jednostavna i intuitivna web aplikacija za sve ljubitelje serija. Omogućuje ti da istražuješ popularne TV serije, pregledaš njihove epizode i glumačku postavu, te spremiš svoje favorite kako bi im se lakše mogao/la vratiti kasnije.

---

## 🔑 Ključne funkcionalnosti

- ✅ Početna stranica s najpopularnijim serijama, sortiranim po ocjenama
- 🎭 Pregled detalja pojedine serije s opisom, žanrovima i ocjenom
- 🧑‍🤝‍🧑 Pregled glumaca (cast) za svaku seriju
- 📺 Pregled svih epizoda i pojedinačnih detalja epizoda
- ⭐ Dodavanje i uklanjanje serija i glumaca iz liste favorita
- 📂 Stranica `/favorites` za brzi pristup tvojim omiljenim sadržajima
- 📍 Prikaz 404 stranice ako dođe do greške ili nepostojeće serije
- 🌐 Potpuno funkcionalna aplikacija spremna za deploy na Vercel

---

## ⚙️ Kako pokrenuti projekt lokalno

1. Kloniraj repozitorij:
   ```bash
   git clone https://github.com/korisnicko-ime/searchseries.git
   cd searchseries
   ```

2. Instaliraj potrebne pakete:
   ```bash
   npm install
   ```

3. Pokreni aplikaciju:
   ```bash
   npm run dev
   ```

> ✅ Nema potrebe za dodatnim `.env` varijablama. Aplikacija koristi javni TVMaze API.

---

## 🚀 Build & Deploy

Ako želiš testirati aplikaciju u produkcijskom modu:

```bash
npm run build
npm start
```

### Deploy (Vercel)

https://series-nextjs-project-3sos.vercel.app/
---

## 🛠️ TODO / Moguća poboljšanja

- 💾 Favoriti se trenutno čuvaju samo privremeno (u memoriji). U budućnosti se planira dodati podrška za localStorage ili backend.
- 🔍 Dodavanje funkcionalnosti za pretragu serija pomoću input polja i modala
- 📥 Uvođenje "Učitaj više" opcije ili infinite scrolla za listu serija

---
