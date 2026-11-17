# CineVault

CineVault is a movie discovery app for browsing a small curated catalog, filtering by genre, searching by title, and keeping a watchlist.

## Features

- Search movies by title.
- Filter the catalog by genre.
- Add or remove movies from the watchlist.
- Browse a responsive movie-card layout with ratings, release years, and posters.

The current catalog is sample data defined in the app, and the watchlist is held in memory for the current session.

## Tech stack

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide icons

## Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite to use the app.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
