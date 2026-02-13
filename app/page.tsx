import { SearchClient } from '@/components/SearchClient';

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-[var(--border)] bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-ink">
              Artcise
            </h1>
            <p className="mt-0.5 text-sm text-graphite">
              Precise search for art, antiques &amp; collectibles
            </p>
          </div>
          <a
            href="/submit"
            className="rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-cream"
          >
            Submit item
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SearchClient />
      </div>

      <footer className="mt-16 border-t border-[var(--border)] py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-graphite/70 sm:px-6">
          Submit your item for identification. For personal research only.
        </div>
      </footer>
    </main>
  );
}
