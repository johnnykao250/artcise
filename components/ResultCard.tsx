'use client';

import Image from 'next/image';
import type { AuctionResult } from '@/lib/types';

interface ResultCardProps {
  result: AuctionResult;
}

const SOURCE_LABELS: Record<string, string> = {
  invaluable: 'Invaluable',
  liveauctioneers: 'LiveAuctioneers',
  submission: 'Submission',
};

export function ResultCard({ result }: ResultCardProps) {
  const Wrapper = result.sourceUrl ? 'a' : 'div';
  const wrapperProps = result.sourceUrl
    ? { href: result.sourceUrl, target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};
  return (
    <Wrapper
      {...wrapperProps}
      className="group block rounded-xl border border-[var(--border)] bg-white overflow-hidden transition hover:shadow-lg hover:border-sage/40"
    >
      <div className="relative aspect-[4/3] bg-cream">
        {result.imageUrl ? (
          <Image
            src={result.imageUrl}
            alt=""
            fill
            className="object-cover transition group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-graphite/40 text-sm">
            No image
          </div>
        )}
        {result.source && SOURCE_LABELS[result.source] && (
          <span className="absolute top-2 right-2 rounded px-2 py-1 text-xs font-medium bg-sage/20 text-sage">
            {SOURCE_LABELS[result.source]}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif text-base font-medium text-ink line-clamp-2 group-hover:text-sage">
          {result.title}
        </h3>
        {result.auctionHouse && (
          <p className="mt-1 text-sm text-graphite">{result.auctionHouse}</p>
        )}
        {result.priceFormatted && (
          <p className="mt-2 text-lg font-semibold text-ink">{result.priceFormatted}</p>
        )}
        {result.saleDate && (
          <p className="mt-1 text-xs text-graphite/70">Sold {result.saleDate}</p>
        )}
      </div>
    </Wrapper>
  );
}
