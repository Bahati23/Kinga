import { Shield } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/useLanguage';

/**
 * Pseudonymous identity chip for the community circle. The avatar color and
 * member code derive deterministically from the pubkey — never from profile
 * metadata — so nobody's chosen Nostr name or photo can leak here.
 */
export function PseudonymBadge({ pubkey, time }: { pubkey: string; time?: string }) {
  const { t } = useLanguage();
  const hue = Math.round((parseInt(pubkey.slice(0, 2), 16) / 255) * 360);

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: `hsl(${hue} 60% 42%)` }}
        aria-hidden
      >
        <Shield className="size-4" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-foreground">
          {t('community.member')}
        </span>
        {time && <span className="block text-xs text-muted-foreground">{time}</span>}
      </span>
    </span>
  );
}
