import { en } from '@/lib/i18n/en';
import { sw } from '@/lib/i18n/sw';
import type { Lang } from '@/lib/i18n/context';

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

function fill(template: string, n: number): string {
  return template.replace('{n}', String(n));
}

/** Localised relative time: "just now" / "sasa hivi", "3 h ago" / "saa 3 zilizopita" */
export function timeAgo(ts: number, lang: Lang = 'en', now = Date.now()): string {
  const dict = lang === 'sw' ? sw : en;
  const diff = Math.max(0, now - ts);
  if (diff < MIN) return dict['time.justNow'];
  if (diff < HOUR) return fill(dict['time.min'], Math.floor(diff / MIN));
  if (diff < DAY) return fill(dict['time.hour'], Math.floor(diff / HOUR));
  const days = Math.floor(diff / DAY);
  return days === 1 ? dict['time.day1'] : fill(dict['time.days'], days);
}

/** "10:32" 24-hour clock */
export function timeOfDay(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function dateLabel(ts: number, lang: Lang = 'en'): string {
  return new Date(ts).toLocaleDateString(lang === 'sw' ? 'sw-KE' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
