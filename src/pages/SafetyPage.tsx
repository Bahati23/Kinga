import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import {
  AlertTriangle,
  ClipboardCheck,
  Eye,
  HeartHandshake,
  PhoneCall,
  Siren,
  Smartphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { HELPLINES } from '@/lib/kinga/helplines';
import { useLanguage } from '@/lib/i18n/useLanguage';
import { cn } from '@/lib/utils';

const PLAN_KEY = 'kinga:safety-plan';
const PLAN_ITEMS = 8;

const SIGN_KEYS = ['safety.sign.1', 'safety.sign.2', 'safety.sign.3', 'safety.sign.4', 'safety.sign.5'];
const DIGITAL_KEYS = ['safety.digital.1', 'safety.digital.2', 'safety.digital.3', 'safety.digital.4', 'safety.digital.5'];
const NOW_KEYS = ['safety.now.1', 'safety.now.2', 'safety.now.3', 'safety.now.4'];

function loadPlan(): boolean[] {
  try {
    const raw = localStorage.getItem(PLAN_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as boolean[];
      if (Array.isArray(parsed) && parsed.length === PLAN_ITEMS) return parsed;
    }
  } catch {
    // storage unavailable
  }
  return Array(PLAN_ITEMS).fill(false);
}

export default function SafetyPage() {
  const { t } = useLanguage();
  const [checked, setChecked] = useState<boolean[]>(loadPlan);

  useSeoMeta({
    title: 'Kinga — Safety & precautions',
    description:
      'Practical, discreet precautions to prevent harm: warning signs, a personal safety plan, digital safety, and what to do when harm is close.',
  });

  useEffect(() => {
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(checked));
    } catch {
      // storage unavailable
    }
  }, [checked]);

  const done = checked.filter(Boolean).length;

  return (
    <div className="container py-10 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {t('safety.kicker')}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('safety.title')}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t('safety.lede')}</p>
      </div>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
        {/* Warning signs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5 font-display text-xl">
              <Eye className="size-5 text-primary" aria-hidden />
              {t('safety.signs.title')}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{t('safety.signs.lede')}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {SIGN_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm leading-relaxed">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                  {t(key)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Safety plan checklist */}
        <Card className="border-primary/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5 font-display text-xl">
              <ClipboardCheck className="size-5 text-primary" aria-hidden />
              {t('safety.plan.title')}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{t('safety.plan.lede')}</p>
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-muted-foreground">
                  {t('safety.plan.done', { done, total: PLAN_ITEMS })}
                </span>
                <span className="text-primary">{Math.round((done / PLAN_ITEMS) * 100)}%</span>
              </div>
              <Progress value={(done / PLAN_ITEMS) * 100} className="mt-2 h-2" />
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {Array.from({ length: PLAN_ITEMS }, (_, i) => (
                <li key={i}>
                  <label
                    className={cn(
                      'flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm leading-relaxed transition-colors',
                      checked[i]
                        ? 'border-primary/40 bg-primary/5 text-foreground'
                        : 'border-border hover:border-primary/25',
                    )}
                  >
                    <Checkbox
                      checked={checked[i]}
                      onCheckedChange={(value) =>
                        setChecked((prev) => prev.map((c, j) => (j === i ? value === true : c)))
                      }
                      className="mt-0.5"
                      aria-label={t(`safety.plan.${i + 1}`)}
                    />
                    <span className={cn(checked[i] && 'line-through opacity-70')}>
                      {t(`safety.plan.${i + 1}`)}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Digital safety */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5 font-display text-xl">
              <Smartphone className="size-5 text-primary" aria-hidden />
              {t('safety.digital.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {DIGITAL_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {t(key)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* If harm is close */}
        <Card className="border-red-300 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5 font-display text-xl text-red-900 dark:text-red-200">
              <Siren className="size-5" aria-hidden />
              {t('safety.now.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {NOW_KEYS.map((key, i) => (
                <li key={key} className="flex items-start gap-3 text-sm leading-relaxed text-red-900 dark:text-red-200">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-200 text-[10px] font-bold text-red-900 dark:bg-red-900 dark:text-red-200">
                    {i + 1}
                  </span>
                  {t(key)}
                </li>
              ))}
            </ol>
            <div className="mt-5 flex flex-wrap gap-2">
              {HELPLINES.filter((h) => h.number).map((line) => (
                <Button key={line.id} asChild size="sm" className="rounded-full font-mono">
                  <a href={`tel:${line.number}`}>
                    <PhoneCall className="size-3.5" />
                    {line.shortCode}
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community CTA */}
      <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <HeartHandshake className="mx-auto size-8 text-gold" aria-hidden />
        <p className="mt-4 text-lg leading-relaxed text-foreground">{t('safety.communityCta')}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t('safety.helplineCta')}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full">
            <Link to="/community">{t('safety.communityBtn')}</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/referrals">{t('refs.title')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
