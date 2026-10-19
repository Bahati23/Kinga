import { Link } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import {
  ArrowRight,
  BarChart3,
  BellRing,
  EyeOff,
  HeartHandshake,
  LayoutDashboard,
  Lock,
  MapPinOff,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Smartphone,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryBadge, ChannelBadge, RiskLevelBadge, StatusBadge } from '@/components/kinga/badges';
import { useKinga } from '@/lib/kinga/store';
import { timeAgo } from '@/lib/kinga/format';
import { useLanguage } from '@/lib/i18n/useLanguage';

const SHIFT_OLD_KEYS = ['home.shift.old.1', 'home.shift.old.2', 'home.shift.old.3'];
const SHIFT_NEW_KEYS = [
  'home.shift.new.1',
  'home.shift.new.2',
  'home.shift.new.3',
  'home.shift.new.4',
  'home.shift.new.5',
];

export default function Index() {
  const { cases, services, organisations } = useKinga();
  const { t, lang } = useLanguage();

  useSeoMeta({
    title: 'Kinga — Before harm happens',
    description:
      'Kinga is a privacy-first early-warning and referral platform that lets girls discreetly signal risk of child marriage, FGM and violence — before harm happens.',
  });

  const openCases = cases.filter((c) => !['closed', 'unreachable'].includes(c.status));
  const urgentCount = openCases.filter((c) => c.riskLevel === 'urgent').length;
  const activeServices = services.filter((s) => s.active).length;
  const verifiedOrgs = organisations.filter((o) => o.status === 'active').length;
  const recent = cases.slice(0, 3);

  const CHANNELS = [
    {
      icon: Phone,
      name: 'USSD — *384*21#',
      tag: t('home.ch.1.tag'),
      body: t('home.ch.1.body'),
    },
    {
      icon: MessageSquareText,
      name: t('home.ch.2.name'),
      tag: t('home.ch.2.tag'),
      body: t('home.ch.2.body'),
    },
    {
      icon: LayoutDashboard,
      name: t('home.ch.3.name'),
      tag: t('home.ch.3.tag'),
      body: t('home.ch.3.body'),
    },
  ];

  const PILLARS = [
    { icon: EyeOff, title: t('home.pillar.1.title'), body: t('home.pillar.1.body') },
    { icon: MapPinOff, title: t('home.pillar.2.title'), body: t('home.pillar.2.body') },
    { icon: UserCheck, title: t('home.pillar.3.title'), body: t('home.pillar.3.body') },
    { icon: BarChart3, title: t('home.pillar.4.title'), body: t('home.pillar.4.body') },
  ];

  return (
    <div>
      {/* ---------------------------------------------------------------- */}
      {/* Hero */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_80%_-10%,hsl(187_72%_21%/0.14),transparent),radial-gradient(40rem_24rem_at_10%_110%,hsl(35_92%_42%/0.12),transparent)] dark:bg-[radial-gradient(60rem_30rem_at_80%_-10%,hsl(180_52%_55%/0.12),transparent),radial-gradient(40rem_24rem_at_10%_110%,hsl(38_92%_58%/0.10),transparent)]"
        />
        <div className="container grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <ShieldCheck className="size-3.5" aria-hidden />
              {t('home.hero.kicker')}
            </p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {t('home.hero.title1')}
              <br />
              <span className="text-primary">{t('home.hero.title2')}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t('home.hero.lede')}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full px-6 text-base">
                <Link to="/ussd">
                  <Smartphone className="size-4" />
                  {t('home.hero.ctaUssd')}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6 text-base">
                <Link to="/dashboard">
                  {t('home.hero.ctaDash')}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
              {[
                { value: String(openCases.length), label: t('home.hero.statOpen') },
                { value: String(urgentCount), label: t('home.hero.statUrgent') },
                {
                  value: `${activeServices}`,
                  label: t('home.hero.statServices', { orgs: verifiedOrgs }),
                },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Live queue preview card */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-gold/15 blur-2xl"
            />
            <Card className="shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <BellRing className="size-4 text-primary" aria-hidden />
                    {t('home.queue.title')}
                  </p>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <span className="size-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
                    {t('home.queue.live')}
                  </span>
                </div>
                <ul className="mt-4 space-y-3">
                  {recent.map((c) => (
                    <li key={c.id}>
                      <Link
                        to={`/cases/${c.id}`}
                        className="block rounded-xl border border-border bg-background p-3.5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-semibold text-muted-foreground">
                            {c.reference}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {timeAgo(c.createdAt, lang)}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <RiskLevelBadge level={c.riskLevel} />
                          <CategoryBadge category={c.riskCategory} />
                          <StatusBadge status={c.status} />
                          <ChannelBadge channel={c.channel} />
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {t('home.queue.county', { county: c.county })} ·{' '}
                          {c.reporter === 'self' ? t('home.queue.self') : t('home.queue.other')}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  {t('home.queue.note')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The shift */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {t('home.shift.l1a')}
              <em className="text-muted-foreground">{t('home.shift.l1em')}</em>
              {t('home.shift.l1b')}
              <br />
              {t('home.shift.l2a')}
              <span className="text-primary">{t('home.shift.l2em')}</span>
              {t('home.shift.l2b')}
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <Card className="border-dashed opacity-80">
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {t('home.shift.oldWay')}
                </p>
                <ol className="mt-4 space-y-3">
                  {SHIFT_OLD_KEYS.map((key, i) => (
                    <li key={key} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-bold">
                        {i + 1}
                      </span>
                      {t(key)}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 rounded-lg bg-secondary/70 p-3 text-xs leading-relaxed text-muted-foreground">
                  {t('home.shift.oldNote')}
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/40 shadow-md">
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {t('home.shift.newWay')}
                </p>
                <ol className="mt-4 space-y-3">
                  {SHIFT_NEW_KEYS.map((key, i) => (
                    <li key={key} className="flex items-center gap-3 text-sm font-medium text-foreground">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      {t(key)}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 rounded-lg bg-primary/5 p-3 text-xs leading-relaxed text-foreground">
                  {t('home.shift.newNote')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Channels */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {t('home.channels.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {t('home.channels.lede')}
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CHANNELS.map((channel) => (
              <Card key={channel.name} className="transition-all hover:-translate-y-1 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                      <channel.icon className="size-5 text-primary" aria-hidden />
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground">
                      {channel.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-mono text-base font-semibold text-foreground">
                    {channel.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{channel.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Privacy pillars */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-border bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] opacity-80">
              <Lock className="size-4" aria-hidden />
              {t('home.pillars.kicker')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {t('home.pillars.title')}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
              >
                <pillar.icon className="size-6 text-gold" aria-hidden />
                <h3 className="mt-4 text-base font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CTA */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="relative isolate mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-lg sm:p-12">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(30rem_16rem_at_50%_-20%,hsl(35_92%_42%/0.15),transparent)]"
            />
            <HeartHandshake className="mx-auto size-10 text-gold" aria-hidden />
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {t('home.cta.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t('home.cta.lede')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/ussd">
                  {t('home.cta.primary')}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link to="/analytics">{t('home.cta.secondary')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
