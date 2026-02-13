export type Source = 'invaluable' | 'liveauctioneers' | 'submission';

export interface AuctionResult {
  id: string;
  title: string;
  description?: string;
  price?: number;
  currency?: string;
  priceFormatted?: string;
  imageUrl?: string;
  source?: Source;
  sourceUrl?: string;
  auctionHouse?: string;
  lotNumber?: string;
  saleDate?: string;
  category?: string;
}

export interface SearchParams {
  query: string;
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  source?: Source;
  sort?: 'relevance' | 'price-asc' | 'price-desc' | 'date-desc';
}
