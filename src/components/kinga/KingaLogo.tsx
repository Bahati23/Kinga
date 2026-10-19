import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/useLanguage';
import { cn } from '@/lib/utils';

export function KingaLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { t } = useLanguage();
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-primary shadow-sm">
        <ShieldCheck className="size-5 text-primary-foreground" aria-hidden />
        <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-gold ring-2 ring-background" aria-hidden />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-wide text-foreground">
            KINGA
          </span>
          <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t('brand.tagline')}
          </span>
        </span>
      )}
    </span>
  );
}
