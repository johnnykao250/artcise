/**
 * Guest account: anonymous ID + "seen" item tracking
 * So returning visitors don't see the same items again (sold or active).
 * - Guest ID: cookie (persists across sessions)
 * - Seen IDs: localStorage (per guest, per device)
 */

const GUEST_ID_COOKIE = 'artcise_guest_id';
const GUEST_ID_MAX_AGE_DAYS = 365;
const SEEN_STORAGE_KEY_PREFIX = 'artcise_seen_';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, maxAgeDays: number) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeDays * 24 * 60 * 60}; SameSite=Lax`;
}

function generateGuestId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** Get or create a persistent guest ID (cookie). Call from client only. */
export function getOrCreateGuestId(): string {
  let id = getCookie(GUEST_ID_COOKIE);
  if (!id) {
    id = generateGuestId();
    setCookie(GUEST_ID_COOKIE, id, GUEST_ID_MAX_AGE_DAYS);
  }
  return id;
}

/** Get the set of listing IDs this guest has already seen. Call from client only. */
export function getSeenIds(guestId: string): Set<string> {
  if (typeof localStorage === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(SEEN_STORAGE_KEY_PREFIX + guestId);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

/** Mark these listing IDs as seen for this guest. Call from client only. */
export function addSeenIds(guestId: string, ids: string[]): void {
  if (typeof localStorage === 'undefined' || ids.length === 0) return;
  const seen = getSeenIds(guestId);
  ids.forEach((id) => seen.add(id));
  try {
    localStorage.setItem(SEEN_STORAGE_KEY_PREFIX + guestId, JSON.stringify([...seen]));
  } catch {
    // storage full or private mode
  }
}

/** Clear seen history for this guest (e.g. "Start fresh" for testing). */
export function clearSeenIds(guestId: string): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(SEEN_STORAGE_KEY_PREFIX + guestId);
}
