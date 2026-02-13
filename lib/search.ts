import type { AuctionResult, SearchParams } from './types';

/**
 * Artcise search — precise matching with taxonomy awareness.
 * Results come from listings (API) or mock data.
 */
export function search(params: SearchParams, dataSource: AuctionResult[]): AuctionResult[] {
  const { query, category, subcategory, minPrice, maxPrice, sort = 'relevance' } = params;
  const q = query.trim().toLowerCase();

  if (!q) {
    return [];
  }

  let results = filterByQuery(dataSource, q);

  // Taxonomy slugs (e.g. ceramics-pottery, blue-and-white)
  if (category) {
    const terms = category.toLowerCase().replace(/-/g, ' ').split(/\s+/);
    results = results.filter((r) => {
      const c = (r.category ?? '').toLowerCase();
      return terms.some((t) => c.includes(t));
    });
  }
  if (subcategory) {
    const terms = subcategory.toLowerCase().replace(/-/g, ' ').split(/\s+/);
    results = results.filter((r) => {
      const c = (r.category ?? '').toLowerCase();
      return terms.some((t) => c.includes(t));
    });
  }
  if (minPrice != null) {
    results = results.filter((r) => (r.price ?? 0) >= minPrice);
  }
  if (maxPrice != null) {
    results = results.filter((r) => (r.price ?? 0) <= maxPrice);
  }

  return sortResults(results, sort, q);
}

function filterByQuery(results: AuctionResult[], query: string): AuctionResult[] {
  const terms = query.split(/\s+/).filter(Boolean);
  return results.filter((r) => {
    const searchable = `${r.title} ${r.description ?? ''} ${r.category ?? ''}`.toLowerCase();
    return terms.every((t) => searchable.includes(t));
  });
}

function sortResults(results: AuctionResult[], sort: SearchParams['sort'], query: string): AuctionResult[] {
  switch (sort) {
    case 'price-asc':
      return [...results].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    case 'price-desc':
      return [...results].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    case 'date-desc':
      return [...results].sort((a, b) => (b.saleDate ?? '').localeCompare(a.saleDate ?? ''));
    case 'relevance':
    default: {
      const terms = query.split(/\s+/).filter(Boolean);
      return [...results].sort((a, b) => {
        const scoreA = relevanceScore(a, terms);
        const scoreB = relevanceScore(b, terms);
        return scoreB - scoreA;
      });
    }
  }
}

function relevanceScore(item: AuctionResult, terms: string[]): number {
  const text = `${item.title} ${item.description ?? ''} ${item.category ?? ''}`.toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (item.title.toLowerCase().includes(term)) score += 3;
    if ((item.category ?? '').toLowerCase().includes(term)) score += 2;
    if (text.includes(term)) score += 1;
  }
  return score;
}
