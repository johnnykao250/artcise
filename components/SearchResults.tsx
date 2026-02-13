'use client';

import { ResultCard } from './ResultCard';
import type { AuctionResult } from '@/lib/types';

interface SearchResultsProps {
  results: AuctionResult[];
  query: string;
  hiddenCount?: number;
  onClearSeen?: () => void;
}

export function SearchResults({ results, query, hiddenCount = 0, onClearSeen }: SearchResultsProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-graphite">
            {results.length > 0
              ? `${results.length} result${results.length === 1 ? '' : 's'}`
              : 'No results'}
          </p>
          {hiddenCount > 0 && (
            <p className="text-sm text-graphite/70">
              {hiddenCount} already seen (hidden)
              {onClearSeen && (
                <>
                  {' · '}
                  <button type="button" onClick={onClearSeen} className="text-sage hover:underline">
                    Clear history
                  </button>
                </>
              )}
            </p>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[var(--border)] bg-white/50 py-16 text-center">
          <p className="text-graphite">
            {hiddenCount > 0
              ? "No new results — you've already seen all for this search."
              : 'No matches for your search.'}
          </p>
          <p className="mt-1 text-sm text-graphite/70">
            {hiddenCount > 0 && onClearSeen ? (
              <>
                <button type="button" onClick={onClearSeen} className="text-sage hover:underline">
                  Clear seen history
                </button>
                {' to show them again.'}
              </>
            ) : (
              <>Try a different query or submit your own item for identification.</>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
