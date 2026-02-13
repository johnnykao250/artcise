'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search art, antiques, collectibles…',
  isLoading = false,
}: SearchBarProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="relative w-full max-w-2xl"
    >
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[var(--border)] bg-white px-5 py-4 pr-14 text-base text-ink placeholder:text-graphite/60 shadow-sm transition focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
        autoFocus
        aria-label="Search"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white transition hover:bg-graphite disabled:opacity-60"
      >
        {isLoading ? '…' : 'Search'}
      </button>
    </form>
  );
}
