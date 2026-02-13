'use client';

import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { TaxonomyFilters } from './TaxonomyFilters';
import { SearchResults } from './SearchResults';
import { search } from '@/lib/search';
import type { AuctionResult } from '@/lib/types';

export function SearchClient() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | undefined>();
  const [subcategory, setSubcategory] = useState<string | undefined>();
  const [results, setResults] = useState<AuctionResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    const r = search({
      query: query.trim(),
      category,
      subcategory,
    });
    setResults(r);
    setHasSearched(true);
  };

  const handleCategoryChange = (cat?: string, sub?: string) => {
    setCategory(cat);
    setSubcategory(sub);
    if (hasSearched && query.trim()) {
      const r = search({ query: query.trim(), category: cat, subcategory: sub });
      setResults(r);
    }
  };

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
          Taxonomy-aware search. Results from Invaluable &amp; LiveAuctioneers.
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
          sourceUrls={{
            invaluable: `https://www.invaluable.com/search?query=${encodeURIComponent(query)}`,
            liveauctioneers: `https://www.liveauctioneers.com/search/?q=${encodeURIComponent(query)}`,
          }}
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
