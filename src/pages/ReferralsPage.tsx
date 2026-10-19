import { useMemo, useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import {
  Accessibility,
  Building2,
  CircleCheck,
  Clock3,
  HeartHandshake,
  Languages,
  MapPin,
  PhoneCall,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useKinga } from '@/lib/kinga/store';
import { HELPLINES, SUPPORT_ORGS } from '@/lib/kinga/helplines';
import { COUNTIES, ORG_TYPES, type OrganisationType } from '@/lib/kinga/types';
import { useLanguage } from '@/lib/i18n/useLanguage';
import { cn } from '@/lib/utils';

const capacityStyles = {
  available: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300',
  limited: 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300',
  full: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300',
} as const;

export default function ReferralsPage() {
  const { services, organisations } = useKinga();
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState('');
  const [county, setCounty] = useState('all');
  const [type, setType] = useState('all');

  useSeoMeta({
    title: 'Kinga — Verified referral directory',
    description:
      'Every service in the Kinga referral network is verified: child protection, health, legal aid, GBV support, shelters and counselling.',
  });

  const orgById = useMemo(
    () => new Map(organisations.map((o) => [o.id, o])),
    [organisations],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      if (county !== 'all' && !s.counties.includes(county)) return false;
      if (type !== 'all' && s.type !== type) return false;
      if (q) {
        const org = orgById.get(s.organisationId);
        const haystack = `${s.name} ${org?.name ?? ''} ${s.counties.join(' ')} ${s.languages.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [services, query, county, type, orgById]);

  const coveredCounties = new Set(services.flatMap((s) => s.counties)).size;

  return (
    <div className="container py-10 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {t('refs.kicker')}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('refs.title')}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t('refs.lede')}</p>
      </div>

      {/* Stats */}
      <dl className="mt-8 grid max-w-xl grid-cols-3 gap-4">
        {[
          { value: services.length, label: t('refs.statServices') },
          {
            value: organisations.filter((o) => o.status === 'active').length,
            label: t('refs.statOrgs'),
          },
          { value: coveredCounties, label: t('refs.statCounties') },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-card p-4">
            <dd className="font-display text-3xl font-semibold">{stat.value}</dd>
            <dt className="mt-1 text-xs text-muted-foreground">{stat.label}</dt>
          </div>
        ))}
      </dl>

      {/* ------------------------------------------------ National helplines */}
      <section className="mt-12" aria-labelledby="helplines-heading">
        <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <div className="max-w-2xl">
            <h2
              id="helplines-heading"
              className="flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight"
            >
              <PhoneCall className="size-6 text-primary" aria-hidden />
              {t('helplines.title')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t('helplines.lede')}
            </p>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {HELPLINES.map((line) => (
              <li
                key={line.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold leading-snug">{line.name}</h3>
                  <span className="shrink-0 rounded-full bg-primary px-3 py-1 font-mono text-lg font-bold tracking-wider text-primary-foreground">
                    {line.shortCode}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {lang === 'sw' ? line.descriptionSw : line.descriptionEn}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    {lang === 'sw' ? line.availabilitySw : line.availabilityEn}
                  </span>
                  {line.number && (
                    <Button asChild size="sm" className="rounded-full">
                      <a href={`tel:${line.number}`}>
                        <PhoneCall className="size-3.5" />
                        {t('helplines.call', { number: line.shortCode ?? line.number })}
                      </a>
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------- Well-known support orgs */}
      <section className="mt-10" aria-labelledby="orgs-heading">
        <div className="max-w-2xl">
          <h2
            id="orgs-heading"
            className="flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight"
          >
            <HeartHandshake className="size-6 text-primary" aria-hidden />
            {t('helplines.orgsTitle')}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t('helplines.orgsLede')}
          </p>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORT_ORGS.map((org) => (
            <li key={org.id} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold leading-snug">{org.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {lang === 'sw' ? org.knownForSw : org.knownForEn}
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
                <ShieldCheck className="size-3" aria-hidden />
                {t('helplines.viaResponder')}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------ Service directory */}
      <div className="mt-14">
        {/* Filters */}
        <div className="grid gap-3 sm:grid-cols-[1fr_12rem_14rem]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('refs.searchPh')}
              aria-label={t('refs.searchLabel')}
              className="pl-9"
            />
          </div>
          <Select value={county} onValueChange={setCounty}>
            <SelectTrigger aria-label={t('refs.filterCounty')}>
              <SelectValue placeholder={t('refs.allCounties')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('refs.allCounties')}</SelectItem>
              {COUNTIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger aria-label={t('refs.filterType')}>
              <SelectValue placeholder={t('refs.allTypes')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('refs.allTypes')}</SelectItem>
              {(Object.keys(ORG_TYPES) as OrganisationType[]).map((orgType) => (
                <SelectItem key={orgType} value={orgType}>
                  {t(`orgtype.${orgType}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <Card className="mt-6 border-dashed">
            <CardContent className="px-8 py-12 text-center">
              <p className="mx-auto max-w-sm text-muted-foreground">{t('refs.empty')}</p>
            </CardContent>
          </Card>
        ) : (
          <ul className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((service) => {
              const org = orgById.get(service.organisationId);
              return (
                <li key={service.id}>
                  <Card
                    className={cn(
                      'h-full transition-all hover:-translate-y-1 hover:shadow-md',
                      !service.active && 'opacity-60',
                    )}
                  >
                    <CardContent className="flex h-full flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <Badge variant="secondary">{t(`orgtype.${service.type}`)}</Badge>
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                            capacityStyles[service.capacity],
                          )}
                        >
                          {t(`capacity.${service.capacity}`)}
                        </span>
                      </div>
                      <h2 className="mt-3 text-lg font-semibold leading-snug">{service.name}</h2>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Building2 className="size-3.5 shrink-0" aria-hidden />
                        {org?.name ?? 'Unknown organisation'}
                        {org?.status === 'active' && (
                          <ShieldCheck className="size-3.5 text-primary" aria-label={t('refs.verifiedOrg')} />
                        )}
                      </p>

                      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <MapPin className="size-3.5 shrink-0" aria-hidden />
                          {service.counties.join(', ')}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock3 className="size-3.5 shrink-0" aria-hidden />
                          {service.hours}
                        </p>
                        <p className="flex items-center gap-2">
                          <Languages className="size-3.5 shrink-0" aria-hidden />
                          {service.languages.join(', ')}
                        </p>
                      </div>

                      {service.accessibility.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
                          <Accessibility className="size-3.5 text-primary" aria-hidden />
                          {service.accessibility.map((feature) => (
                            <span
                              key={feature}
                              className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                            >
                              {feature.replace('-', ' ')}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="mt-auto pt-4 text-xs text-muted-foreground">
                        <CircleCheck className="mr-1 inline size-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
                        {t('refs.handles')}{' '}
                        {service.handlesCategories.map((c) => t(`cat.${c}`)).join(', ')}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
