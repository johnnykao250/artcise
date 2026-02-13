/**
 * Artcise taxonomy — antiques-focused categories for precise search
 * Designed for queries like "blue and white vases" that traditional aggregators handle poorly
 */

export const TAXONOMY = {
  ceramics: {
    label: 'Ceramics & Pottery',
    slug: 'ceramics-pottery',
    children: {
      'blue-and-white': { label: 'Blue & White', slug: 'blue-and-white' },
      'chinese-export': { label: 'Chinese Export', slug: 'chinese-export' },
      delft: { label: 'Delft', slug: 'delft' },
      majolica: { label: 'Majolica', slug: 'majolica' },
      porcelain: { label: 'Porcelain', slug: 'porcelain' },
      stoneware: { label: 'Stoneware', slug: 'stoneware' },
      pottery: { label: 'Pottery', slug: 'pottery' },
    },
  },
  furniture: {
    label: 'Furniture & Design',
    slug: 'furniture-design',
    children: {
      antiques: { label: 'Antique Furniture', slug: 'antique-furniture' },
      midcentury: { label: 'Mid-Century Modern', slug: 'midcentury-modern' },
      'arts-crafts': { label: 'Arts & Crafts', slug: 'arts-crafts' },
      victorian: { label: 'Victorian', slug: 'victorian' },
    },
  },
  art: {
    label: 'Fine Art',
    slug: 'fine-art',
    children: {
      paintings: { label: 'Paintings', slug: 'paintings' },
      sculptures: { label: 'Sculptures', slug: 'sculptures' },
      prints: { label: 'Prints & Works on Paper', slug: 'prints' },
      contemporary: { label: 'Contemporary Art', slug: 'contemporary-art' },
    },
  },
  jewelry: {
    label: 'Jewelry & Gems',
    slug: 'jewelry-gems',
    children: {
      vintage: { label: 'Vintage Jewelry', slug: 'vintage-jewelry' },
      estate: { label: 'Estate Jewelry', slug: 'estate-jewelry' },
      watches: { label: 'Watches', slug: 'watches' },
    },
  },
  silver: {
    label: 'Silver & Metals',
    slug: 'silver-metals',
    children: {
      sterling: { label: 'Sterling Silver', slug: 'sterling-silver' },
      flatware: { label: 'Flatware', slug: 'flatware' },
      hollowware: { label: 'Hollowware', slug: 'hollowware' },
    },
  },
  decorative: {
    label: 'Decorative Arts',
    slug: 'decorative-arts',
    children: {
      lamps: { label: 'Lamps & Lighting', slug: 'lamps-lighting' },
      mirrors: { label: 'Mirrors', slug: 'mirrors' },
      textiles: { label: 'Textiles & Rugs', slug: 'textiles-rugs' },
    },
  },
  collectibles: {
    label: 'Collectibles',
    slug: 'collectibles',
    children: {
      coins: { label: 'Coins & Banknotes', slug: 'coins-banknotes' },
      toys: { label: 'Toys & Memorabilia', slug: 'toys-memorabilia' },
      books: { label: 'Books & Manuscripts', slug: 'books-manuscripts' },
    },
  },
} as const;

export type CategoryKey = keyof typeof TAXONOMY;
export type SubcategoryKey<K extends CategoryKey> = keyof (typeof TAXONOMY)[K]['children'];

/** Map common search terms to taxonomy slugs for smarter matching */
export const SEARCH_SYNONYMS: Record<string, string[]> = {
  'blue and white': ['blue-and-white', 'blue & white', 'blue white'],
  'blue and white vase': ['blue-and-white', 'ceramics-pottery'],
  'blue and white vases': ['blue-and-white', 'ceramics-pottery'],
  'chinese porcelain': ['chinese-export', 'porcelain'],
  'delft pottery': ['delft', 'ceramics-pottery'],
  'mid century': ['midcentury-modern', 'furniture-design'],
  'midcentury': ['midcentury-modern'],
};
