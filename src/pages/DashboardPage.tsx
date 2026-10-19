import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Inbox,
  RotateCcw,
  ShieldAlert,
  UserRound,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CategoryBadge, ChannelBadge, RiskLevelBadge, StatusBadge } from '@/components/kinga/badges';
import { resetDemo, useKinga } from '@/lib/kinga/store';
import { timeAgo, timeOfDay } from '@/lib/kinga/format';
import { ACTING_RESPONDER_ID, ACTING_RESPONDER_NAME, ACTING_RESPONDER_ROLE } from '@/lib/kinga/actingUser';
import { useLanguage } from '@/lib/i18n/useLanguage';
import type { CaseStatus, KingaCase } from '@/lib/kinga/types';
import { cn } from '@/lib/utils';

type QueueFilter = 'all' | 'mine' | CaseStatus;

const QUEUE_TABS: { value: QueueFilter; labelKey: string }[] = [
  { value: 'all', labelKey: 'dash.tabs.all' },
  { value: 'new', labelKey: 'dash.tabs.new' },
  { value: 'mine', labelKey: 'dash.tabs.mine' },
  { value: 'assigned', labelKey: 'dash.tabs.assigned' },
  { value: 'in-progress', labelKey: 'dash.tabs.in-progress' },
  { value: 'escalated', labelKey: 'dash.tabs.escalated' },
  { value: 'referred', labelKey: 'dash.tabs.referred' },
  { value: 'closed', labelKey: 'dash.tabs.closed' },
];

function sortCases(a: KingaCase, b: KingaCase) {
  const urgentA = a.riskLevel === 'urgent' && !['closed', 'unreachable'].includes(a.status);
  const urgentB = b.riskLevel === 'urgent' && !['closed', 'unreachable'].includes(b.status);
  if (urgentA !== urgentB) return urgentA ? -1 : 1;
  return b.createdAt - a.createdAt;
}

export default function DashboardPage() {
  const { cases, responders } = useKinga();
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<QueueFilter>('all');

  useSeoMeta({
    title: 'Kinga — Responder dashboard',
    description:
      'Triage discreet risk signals, manage cases and route verified referrals — the Kinga responder dashboard.',
  });

  const counts = useMemo(() => {
    const open = cases.filter((c) => !['closed', 'unreachable'].includes(c.status));
    return {
      new: cases.filter((c) => c.status === 'new').length,
      urgent: open.filter((c) => c.riskLevel === 'urgent').length,
      inProgress: cases.filter((c) => c.status === 'in-progress').length,
      escalated: cases.filter((c) => c.status === 'escalated').length,
      closed: cases.filter((c) => c.status === 'closed').length,
    };
  }, [cases]);

  const filtered = useMemo(() => {
    let list = [...cases];
    if (filter === 'mine') {
      list = list.filter((c) => c.assignedResponderId === ACTING_RESPONDER_ID);
    } else if (filter !== 'all') {
      list = list.filter((c) => c.status === filter);
    }
    return list.sort(sortCases);
  }, [cases, filter]);

  const responderName = (id?: string) => responders.find((r) => r.id === id)?.name;

  const [emptyBefore, emptyAfter] = t('dash.empty', { link: '' }).split('  ');

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <UserRound className="size-4" aria-hidden />
            {t('dash.signedIn', { name: ACTING_RESPONDER_NAME, role: ACTING_RESPONDER_ROLE })}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t('dash.title')}
          </h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => resetDemo()}
          title={t('dash.resetTitle')}
        >
          <RotateCcw className="size-3.5" />
          {t('dash.reset')}
        </Button>
      </div>

      {/* Stats */}
      <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {[
          { icon: Inbox, label: t('dash.stats.new'), value: counts.new, tone: 'text-sky-600 dark:text-sky-400' },
          { icon: AlertTriangle, label: t('dash.stats.urgent'), value: counts.urgent, tone: 'text-red-600 dark:text-red-400' },
          { icon: Clock, label: t('dash.stats.inProgress'), value: counts.inProgress, tone: 'text-amber-600 dark:text-amber-400' },
          { icon: ShieldAlert, label: t('dash.stats.escalated'), value: counts.escalated, tone: 'text-red-600 dark:text-red-400' },
          { icon: CheckCircle2, label: t('dash.stats.closed'), value: counts.closed, tone: 'text-emerald-600 dark:text-emerald-400' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <dt className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <stat.icon className={cn('size-3.5', stat.tone)} aria-hidden />
                {stat.label}
              </dt>
              <dd className="mt-2 font-display text-3xl font-semibold">{stat.value}</dd>
            </CardContent>
          </Card>
        ))}
      </dl>

      {/* Queue */}
      <div className="mt-10">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as QueueFilter)}>
          <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
            {QUEUE_TABS.map((tab) => {
              const count =
                tab.value === 'all'
                  ? cases.length
                  : tab.value === 'mine'
                    ? cases.filter((c) => c.assignedResponderId === ACTING_RESPONDER_ID).length
                    : cases.filter((c) => c.status === tab.value).length;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {t(tab.labelKey)}
                  <Badge
                    variant="secondary"
                    className="ml-1.5 px-1.5 text-[10px] data-[state=active]:bg-white/20"
                  >
                    {count}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        <ul className="mt-6 space-y-3">
          {filtered.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="px-8 py-12 text-center">
                <p className="mx-auto max-w-sm text-muted-foreground">
                  {emptyBefore}{' '}
                  <Link to="/ussd" className="font-medium text-primary underline-offset-4 hover:underline">
                    {t('dash.emptyLink')}
                  </Link>{' '}
                  {emptyAfter}
                </p>
              </CardContent>
            </Card>
          )}
          {filtered.map((c) => (
            <li key={c.id}>
              <Link
                to={`/cases/${c.id}`}
                className="group block rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  <div className="min-w-28">
                    <p className="font-mono text-sm font-bold text-foreground">{c.reference}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {timeOfDay(c.createdAt)} · {timeAgo(c.createdAt, lang)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <RiskLevelBadge level={c.riskLevel} />
                    <CategoryBadge category={c.riskCategory} />
                    <ChannelBadge channel={c.channel} />
                  </div>
                  <div className="ml-auto flex items-center gap-4">
                    <div className="text-right">
                      <StatusBadge status={c.status} />
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t('home.queue.county', { county: c.county })} ·{' '}
                        {responderName(c.assignedResponderId) ?? (
                          <span className="italic">{t('dash.unassigned')}</span>
                        )}
                      </p>
                    </div>
                    <ChevronRight
                      className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <ShieldAlert className="size-3.5" aria-hidden />
          {t('dash.privacyNote')}
          <Link to="/analytics" className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline">
            {t('dash.viewTrends')} <ArrowRight className="size-3" />
          </Link>
        </p>
      </div>
    </div>
  );
}
