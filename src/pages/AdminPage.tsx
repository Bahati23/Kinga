import { useSeoMeta } from '@unhead/react';
import {
  Activity,
  Building2,
  History,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  setOrgStatus,
  setResponderVerified,
  setServiceActive,
  setServiceCapacity,
  useKinga,
} from '@/lib/kinga/store';
import { dateLabel, timeAgo } from '@/lib/kinga/format';
import type { OrgStatus, ServiceCapacity } from '@/lib/kinga/types';
import { useLanguage } from '@/lib/i18n/useLanguage';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

const orgStatusStyles: Record<OrgStatus, string> = {
  active: 'border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300',
  pending: 'border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300',
  suspended: 'border-red-300 bg-red-100 text-red-800 dark:border-red-900 dark:bg-red-950/60 dark:text-red-300',
};

export default function AdminPage() {
  const { cases, responders, organisations, services, audit } = useKinga();
  const { toast } = useToast();
  const { t, lang } = useLanguage();

  useSeoMeta({
    title: 'Kinga — Platform administration',
    description:
      'Verify organisations and responders, manage the referral directory and review the protected audit trail.',
  });

  const open = cases.filter((c) => !['closed', 'unreachable'].includes(c.status));
  const escalated = cases.filter((c) => c.status === 'escalated');

  const stats = [
    { label: t('admin.stats.signals'), value: cases.length + 1226, icon: Activity },
    { label: t('admin.stats.active'), value: open.length, icon: ScrollText },
    { label: t('admin.stats.escalated'), value: escalated.length, icon: ShieldAlert },
    {
      label: t('admin.stats.responders'),
      value: responders.filter((r) => r.verified).length,
      icon: Users,
    },
    {
      label: t('admin.stats.orgs'),
      value: organisations.filter((o) => o.status === 'active').length,
      icon: Building2,
    },
  ];

  return (
    <div className="container py-10 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {t('admin.kicker')}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
          {t('admin.title')}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t('admin.lede')}</p>
      </div>

      {/* Overview stats */}
      <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <dt className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <stat.icon className="size-3.5 text-primary" aria-hidden />
                {stat.label}
              </dt>
              <dd className="mt-2 font-display text-3xl font-semibold">
                {stat.value.toLocaleString()}
              </dd>
            </CardContent>
          </Card>
        ))}
      </dl>

      {/* Safeguarding queue */}
      {escalated.length > 0 && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-300 bg-red-50 p-5 dark:border-red-900 dark:bg-red-950/40">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden />
          <div className="text-sm">
            <p className="font-semibold text-red-900 dark:text-red-200">
              {t('admin.safeguarding', { count: escalated.length })}
            </p>
            <p className="mt-1 text-red-800/80 dark:text-red-200/80">
              {t('admin.safeguardingBody', { refs: escalated.map((c) => c.reference).join(', ') })}
            </p>
          </div>
        </div>
      )}

      <Tabs defaultValue="organisations" className="mt-10">
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          {(['organisations', 'responders', 'services', 'audit'] as const).map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {t(`admin.tab.${tab}`)}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Organisations */}
        <TabsContent value="organisations" className="mt-6">
          <ul className="space-y-3">
            {organisations.map((org) => (
              <li
                key={org.id}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
              >
                <div className="min-w-0 flex-1 basis-64">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold">{org.name}</h2>
                    <Badge variant="outline" className={cn(orgStatusStyles[org.status])}>
                      {t(`orgstatus.${org.status}`)}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`orgtype.${org.type}`)} · {org.counties.join(', ')} ·{' '}
                    {t('admin.partnerSince', { date: dateLabel(org.joinedAt, lang) })}
                  </p>
                </div>
                <div className="flex gap-2">
                  {org.status !== 'active' && (
                    <Button
                      size="sm"
                      className="rounded-full"
                      onClick={() => {
                        setOrgStatus(org.id, 'active');
                        toast({ title: t('toast.orgVerified', { name: org.name }) });
                      }}
                    >
                      <ShieldCheck className="size-3.5" />
                      {t('admin.verifyActivate')}
                    </Button>
                  )}
                  {org.status === 'active' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-red-300 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40"
                      onClick={() => {
                        setOrgStatus(org.id, 'suspended');
                        toast({
                          title: t('toast.orgSuspended', { name: org.name }),
                          description: t('toast.orgSuspendedBody'),
                        });
                      }}
                    >
                      {t('admin.suspend')}
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>

        {/* Responders */}
        <TabsContent value="responders" className="mt-6">
          <ul className="space-y-3">
            {responders.map((responder) => {
              const org = organisations.find((o) => o.id === responder.organisationId);
              const openCases = cases.filter(
                (c) =>
                  c.assignedResponderId === responder.id &&
                  ['assigned', 'in-progress', 'escalated'].includes(c.status),
              ).length;
              return (
                <li
                  key={responder.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
                >
                  <div className="min-w-0 flex-1 basis-64">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold">{responder.name}</h2>
                      {responder.verified ? (
                        <Badge variant="outline" className={orgStatusStyles.active}>
                          <ShieldCheck className="size-3" /> {t('admin.verified')}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className={orgStatusStyles.pending}>
                          {t('admin.awaiting')}
                        </Badge>
                      )}
                      <Badge variant="secondary" className="capitalize">
                        {t('admin.training')} {responder.trainingStatus.replace('-', ' ')}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {responder.role} · {org?.name} · {responder.counties.join(', ')} ·{' '}
                      {t('admin.openCases', { count: openCases })}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {t('admin.languages')} {responder.languages.join(', ')}
                    </p>
                  </div>
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Switch
                      checked={responder.verified}
                      onCheckedChange={(checked) => {
                        setResponderVerified(responder.id, checked);
                        toast({
                          title: checked
                            ? t('toast.rspVerified', { name: responder.name })
                            : t('toast.rspRevoked', { name: responder.name }),
                        });
                      }}
                      aria-label={t('admin.toggleResponder', { name: responder.name })}
                    />
                    {t('admin.verified')}
                  </label>
                </li>
              );
            })}
          </ul>
        </TabsContent>

        {/* Services */}
        <TabsContent value="services" className="mt-6">
          <ul className="space-y-3">
            {services.map((service) => {
              const org = organisations.find((o) => o.id === service.organisationId);
              return (
                <li
                  key={service.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
                >
                  <div className="min-w-0 flex-1 basis-64">
                    <h2 className="font-semibold">{service.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {org?.name} · {service.counties.join(', ')} · {service.hours}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Select
                      value={service.capacity}
                      onValueChange={(v) => {
                        setServiceCapacity(service.id, v as ServiceCapacity);
                        toast({
                          title: t('toast.svcCapacity', { name: service.name, value: t(`capacity.${v}`) }),
                        });
                      }}
                    >
                      <SelectTrigger className="w-36" aria-label={t('admin.capacityLabel', { name: service.name })}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(['available', 'limited', 'full'] as const).map((cap) => (
                          <SelectItem key={cap} value={cap}>
                            {t(`capacity.${cap}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <Switch
                        checked={service.active}
                        onCheckedChange={(checked) => {
                          setServiceActive(service.id, checked);
                          toast({
                            title: checked
                              ? t('toast.svcOn', { name: service.name })
                              : t('toast.svcOff', { name: service.name }),
                          });
                        }}
                        aria-label={t('admin.toggleService', { name: service.name })}
                      />
                      {t('admin.active')}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </TabsContent>

        {/* Audit log */}
        <TabsContent value="audit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-lg">
                <History className="size-4 text-primary" aria-hidden />
                {t('admin.auditTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative space-y-4 border-l border-border pl-5">
                {audit.slice(0, 20).map((entry) => (
                  <li key={entry.id} className="relative">
                    <span
                      className="absolute -left-[26px] top-1 size-2.5 rounded-full border-2 border-card bg-primary"
                      aria-hidden
                    />
                    <p className="text-sm">
                      <span className="font-medium">{entry.actor}</span> — {entry.action}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      <span className="font-mono">{entry.resource}</span> ·{' '}
                      {timeAgo(entry.at, lang)}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 rounded-lg bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
                {t('admin.auditNote')}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
