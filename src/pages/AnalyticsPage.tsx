import { useSeoMeta } from '@unhead/react';
import { EyeOff, Info, TrendingDown, TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  COUNTY_SIGNALS,
  MONTHLY_SIGNALS,
  REFERRAL_OUTCOMES,
  RESPONSE_TIMES,
} from '@/lib/kinga/seed';
import { useLanguage } from '@/lib/i18n/useLanguage';

const categoryConfig = {
  marriage: { label: 'Child marriage', color: 'var(--chart-1)' },
  gbv: { label: 'GBV', color: 'var(--chart-3)' },
  fgm: { label: 'FGM', color: 'var(--chart-2)' },
  threats: { label: 'Threats', color: 'var(--chart-5)' },
  school: { label: 'School dropout', color: 'var(--chart-4)' },
  other: { label: 'Other', color: 'hsl(200 14% 60%)' },
} satisfies ChartConfig;

const countyConfig = {
  signals: { label: 'Signals', color: 'var(--chart-1)' },
} satisfies ChartConfig;

const responseConfig = {
  hours: { label: 'Median hours to first contact', color: 'var(--chart-4)' },
} satisfies ChartConfig;

const outcomeConfig = {
  value: { label: 'Referrals' },
  completed: { label: 'Completed', color: 'var(--chart-4)' },
  inProgress: { label: 'In progress', color: 'var(--chart-1)' },
  awaiting: { label: 'Awaiting acceptance', color: 'var(--chart-2)' },
  unreachable: { label: 'Unable to reach', color: 'hsl(200 14% 60%)' },
} satisfies ChartConfig;

export default function AnalyticsPage() {
  const { t } = useLanguage();

  useSeoMeta({
    title: 'Kinga — Community early-warning analytics',
    description:
      'Aggregated, anonymised risk trends: where protection risks are rising, which referral pathways work, and how fast help arrives.',
  });

  const totalSignals = MONTHLY_SIGNALS.reduce(
    (sum, m) => sum + m.marriage + m.fgm + m.gbv + m.threats + m.school + m.other,
    0,
  );

  const INSIGHTS = [
    {
      icon: TrendingUp,
      title: t('analytics.insight.1.title'),
      body: t('analytics.insight.1.body'),
    },
    {
      icon: TrendingDown,
      title: t('analytics.insight.2.title'),
      body: t('analytics.insight.2.body'),
    },
    {
      icon: TrendingUp,
      title: t('analytics.insight.3.title'),
      body: t('analytics.insight.3.body'),
    },
  ];

  return (
    <div className="container py-10 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {t('analytics.kicker')}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('analytics.title')}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {t('analytics.lede', { total: totalSignals.toLocaleString() })}
        </p>
      </div>

      {/* Privacy banner */}
      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-5">
        <EyeOff className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
        <div className="text-sm leading-relaxed">
          <p className="font-semibold text-foreground">{t('analytics.privacyTitle')}</p>
          <p className="mt-1 text-muted-foreground">{t('analytics.privacyBody')}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl">{t('analytics.chart1Title')}</CardTitle>
            <CardDescription>{t('analytics.chart1Desc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={categoryConfig} className="h-72 w-full">
              <BarChart data={MONTHLY_SIGNALS} margin={{ left: -16, right: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="marriage" stackId="a" fill="var(--color-marriage)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="gbv" stackId="a" fill="var(--color-gbv)" />
                <Bar dataKey="fgm" stackId="a" fill="var(--color-fgm)" />
                <Bar dataKey="threats" stackId="a" fill="var(--color-threats)" />
                <Bar dataKey="school" stackId="a" fill="var(--color-school)" />
                <Bar dataKey="other" stackId="a" fill="var(--color-other)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl">{t('analytics.chart2Title')}</CardTitle>
            <CardDescription>{t('analytics.chart2Desc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={countyConfig} className="h-72 w-full">
              <BarChart data={COUNTY_SIGNALS} layout="vertical" margin={{ left: 12, right: 16 }}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="county"
                  tickLine={false}
                  axisLine={false}
                  width={84}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="signals" fill="var(--color-signals)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl">{t('analytics.chart3Title')}</CardTitle>
            <CardDescription>{t('analytics.chart3Desc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={responseConfig} className="h-64 w-full">
              <LineChart data={RESPONSE_TIMES} margin={{ left: -16, right: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={40}
                  domain={[0, 10]}
                  tickFormatter={(v: number) => `${v}h`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => t('analytics.hours', { value: String(value) })}
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="var(--color-hours)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl">{t('analytics.chart4Title')}</CardTitle>
            <CardDescription>{t('analytics.chart4Desc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={outcomeConfig} className="mx-auto h-64 w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={REFERRAL_OUTCOMES}
                  dataKey="value"
                  nameKey="status"
                  innerRadius="55%"
                  outerRadius="85%"
                  strokeWidth={2}
                >
                  {REFERRAL_OUTCOMES.map((entry) => (
                    <Cell key={entry.status} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="status" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          {t('analytics.insightsTitle')}
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {INSIGHTS.map((insight) => (
            <Card key={insight.title}>
              <CardContent className="p-5">
                <insight.icon className="size-5 text-primary" aria-hidden />
                <h3 className="mt-3 text-base font-semibold">{insight.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{insight.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <Info className="size-3.5" aria-hidden />
          {t('analytics.demo')}
        </p>
      </div>
    </div>
  );
}
