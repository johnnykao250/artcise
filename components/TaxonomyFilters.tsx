'use client';

import { TAXONOMY } from '@/lib/taxonomy';
import type { CategoryKey } from '@/lib/taxonomy';

interface TaxonomyFiltersProps {
  selectedCategory?: string;
  selectedSubcategory?: string;
  onCategoryChange: (category?: string, subcategory?: string) => void;
}

export function TaxonomyFilters({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
}: TaxonomyFiltersProps) {
  const categories = Object.entries(TAXONOMY) as [CategoryKey, (typeof TAXONOMY)[CategoryKey]][];

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-graphite">Refine by category</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(undefined, undefined)}
          className={`rounded-full px-4 py-2 text-sm transition ${
            !selectedCategory
              ? 'bg-ink text-white'
              : 'bg-white text-graphite hover:bg-gray-100 border border-[var(--border)]'
          }`}
        >
          All
        </button>
        {categories.map(([key, cat]) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <div key={key} className="flex flex-wrap gap-1">
              <button
                onClick={() => onCategoryChange(cat.slug, undefined)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isSelected
                    ? 'bg-sage text-white'
                    : 'bg-white text-graphite hover:bg-gray-100 border border-[var(--border)]'
                }`}
              >
                {cat.label}
              </button>
              {isSelected &&
                Object.entries(cat.children).map(([subKey, sub]) => (
                  <button
                    key={subKey}
                    onClick={() => onCategoryChange(cat.slug, sub.slug)}
                    className={`rounded-full px-3 py-1.5 text-xs transition ${
                      selectedSubcategory === sub.slug
                        ? 'bg-clay text-white'
                        : 'bg-cream text-graphite hover:bg-sandstone/30 border border-[var(--border)]'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
