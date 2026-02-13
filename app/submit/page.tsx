import { SubmitForm } from '@/components/SubmitForm';
import Link from 'next/link';

export default function SubmitPage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-[var(--border)] bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-semibold text-ink hover:text-sage">
            Artcise
          </Link>
          <Link
            href="/"
            className="text-sm text-graphite hover:text-ink"
          >
            ← Search
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <h2 className="font-serif text-xl font-semibold text-ink">Submit an item</h2>
        <p className="mt-1 text-sm text-graphite">
          One image plus dimensions (height, width, length). We use image checks to keep submissions appropriate.
        </p>
        <SubmitForm />
      </div>
    </main>
  );
}
