# Artcise

**Art** + **Precise** — A better search for art, antiques, and collectibles.

Artcise focuses on **precise search UX and taxonomy**, inspired by WorthPoint and designed to fix the poor search experience of aggregators like Barnebys. Results are sourced from Invaluable and LiveAuctioneers.

## Features

- **Taxonomy-aware search** — Categories like "Blue & White", "Chinese Export", "Delft" for antiques-focused queries
- **Clean, organized results** — Relevance sorting, filters, and clear source attribution
- **No live bidding (yet)** — Focus on precise search and sold records first

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- DM Sans + Libre Baskerville fonts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data Sources

Currently uses **mock data** for prototype. Real integration options:

- **Invaluable** — No public API; consider Apify, partnership, or ToS-compliant methods
- **LiveAuctioneers** — Apify scraper exists (paid ~$10/1k results); or partnership

Add `lib/dataSources.ts` and connect when ready.

## Project Structure

```
artcise/
├── app/           # Next.js App Router
├── components/    # UI components
├── lib/           # Search, taxonomy, types, mock data
└── public/
```

## License

Private. For personal/research use.
