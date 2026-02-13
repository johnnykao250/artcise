'use client';

import { useState, useCallback, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { TaxonomyFilters } from './TaxonomyFilters';
import { SearchResults } from './SearchResults';
import { search } from '@/lib/search';
import { getOrCreateGuestId, getSeenIds, addSeenIds, clearSeenIds } from '@/lib/guest';
import type { AuctionResult } from '@/lib/types';

function toAuctionResult(item: { id: string; title: string; description?: string; price?: number; priceFormatted?: string; imageUrl: string }): AuctionResult {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    priceFormatted: item.priceFormatted,
    imageUrl: item.imageUrl,
    source: 'submission',
  };
}

export function SearchClient() {
  const [listings, setListings] = useState<AuctionResult[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | undefined>();
  const [subcategory, setSubcategory] = useState<string | undefined>();
  const [results, setResults] = useState<AuctionResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [hiddenCount, setHiddenCount] = useState(0);

  useEffect(() => {
    fetch('/api/listings')
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setListings((Array.isArray(data) ? data : []).map(toAuctionResult)))
      .catch(() => setListings([]));
  }, []);

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;
    const guestId = getOrCreateGuestId();
    const raw = search({ query: query.trim(), category, subcategory }, listings);
    const seen = getSeenIds(guestId);
    const newResults = raw.filter((r) => !seen.has(r.id));
    const hidden = raw.length - newResults.length;
    setHiddenCount(hidden);
    setResults(newResults);
    setHasSearched(true);
    if (newResults.length > 0) {
      addSeenIds(guestId, newResults.map((r) => r.id));
    }
  }, [query, category, subcategory, listings]);

  const handleClearSeen = useCallback(() => {
    const guestId = getOrCreateGuestId();
    clearSeenIds(guestId);
    setHiddenCount(0);
    if (hasSearched && query.trim()) {
      handleSearch();
    }
  }, [hasSearched, query, handleSearch]);

  const handleCategoryChange = useCallback((cat?: string, sub?: string) => {
    setCategory(cat);
    setSubcategory(sub);
    if (hasSearched && query.trim()) {
      const guestId = getOrCreateGuestId();
      const raw = search({ query: query.trim(), category: cat, subcategory: sub }, listings);
      const seen = getSeenIds(guestId);
      const newResults = raw.filter((r) => !seen.has(r.id));
      setHiddenCount(raw.length - newResults.length);
      setResults(newResults);
      if (newResults.length > 0) {
        addSeenIds(guestId, newResults.map((r) => r.id));
      }
    }
  }, [hasSearched, query, listings]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          placeholder="Try: blue and white vases"
        />
        <p className="text-center text-sm text-graphite/70">
          Taxonomy-aware search for art, antiques &amp; collectibles.
        </p>
        <p className="text-center text-xs text-graphite/60">
          You&apos;re browsing as a guest. Items you&apos;ve seen won&apos;t show again on your next search.
        </p>
      </div>

      <TaxonomyFilters
        selectedCategory={category}
        selectedSubcategory={subcategory}
        onCategoryChange={handleCategoryChange}
      />

      {hasSearched && (
        <SearchResults
          results={results}
          query={query}
          hiddenCount={hiddenCount}
          onClearSeen={handleClearSeen}
        />
      )}

      {!hasSearched && (
        <div className="rounded-xl border border-dashed border-[var(--border)] bg-white/50 py-20 text-center">
          <p className="text-graphite/80">
            Enter a search term (e.g. <strong>blue and white vases</strong>) to see precise, curated results.
          </p>
        </div>
      )}
    </div>
  );
}
