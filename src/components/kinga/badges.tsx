import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n/useLanguage';
import type { CaseStatus, Channel, RiskCategoryId, RiskLevel } from '@/lib/kinga/types';

const riskLevelClasses: Record<RiskLevel, string> = {
  urgent:
    'border-red-300 bg-red-100 text-red-800 dark:border-red-900 dark:bg-red-950/60 dark:text-red-300',
  emerging:
    'border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300',
  info: 'border-teal-300 bg-teal-100 text-teal-900 dark:border-teal-900 dark:bg-teal-950/60 dark:text-teal-300',
};

const riskDotClasses: Record<RiskLevel, string> = {
  urgent: 'bg-red-500',
  emerging: 'bg-amber-500',
  info: 'bg-teal-500',
};

export function RiskLevelBadge({ level, className }: { level: RiskLevel; className?: string }) {
  const { t } = useLanguage();
  return (
    <Badge variant="outline" className={cn('gap-1.5 font-semibold', riskLevelClasses[level], className)}>
      <span className={cn('size-1.5 rounded-full', riskDotClasses[level], level === 'urgent' && 'motion-safe:animate-pulse')} aria-hidden />
      {t(`level.${level}`)}
    </Badge>
  );
}

const statusClasses: Record<CaseStatus, string> = {
  new: 'border-sky-300 bg-sky-100 text-sky-900 dark:border-sky-900 dark:bg-sky-950/60 dark:text-sky-300',
  assigned:
    'border-violet-300 bg-violet-100 text-violet-900 dark:border-violet-900 dark:bg-violet-950/60 dark:text-violet-300',
  'in-progress':
    'border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300',
  escalated:
    'border-red-300 bg-red-100 text-red-800 dark:border-red-900 dark:bg-red-950/60 dark:text-red-300',
  referred:
    'border-teal-300 bg-teal-100 text-teal-900 dark:border-teal-900 dark:bg-teal-950/60 dark:text-teal-300',
  closed:
    'border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300',
  unreachable:
    'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300',
};

export function StatusBadge({ status, className }: { status: CaseStatus; className?: string }) {
  const { t } = useLanguage();
  return (
    <Badge variant="outline" className={cn('font-medium', statusClasses[status], className)}>
      {t(`status.${status}`)}
    </Badge>
  );
}

export function CategoryBadge({ category, className }: { category: RiskCategoryId; className?: string }) {
  const { t } = useLanguage();
  return (
    <Badge variant="secondary" className={cn('font-medium', className)}>
      {t(`cat.${category}`)}
    </Badge>
  );
}

export function ChannelBadge({ channel, className }: { channel: Channel; className?: string }) {
  return (
    <Badge variant="outline" className={cn('font-mono text-[10px] uppercase tracking-wider text-muted-foreground', className)}>
      {channel}
    </Badge>
  );
}
