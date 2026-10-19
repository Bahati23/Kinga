import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  HeartHandshake,
  LifeBuoy,
  LogOut,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { HELPLINES } from '@/lib/kinga/helplines';
import { useLanguage } from '@/lib/i18n/useLanguage';

const QUICK_EXIT_URL = 'https://www.google.com';

/**
 * Persistent help & support tool — a floating button on every page giving
 * instant access to helplines, the community, safety planning, the USSD
 * channel, and a Quick Exit (standard safeguarding pattern that leaves the
 * site immediately).
 */
export function HelpButton() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);

  const destinations = [
    {
      to: '/community',
      icon: HeartHandshake,
      title: t('help.community'),
      body: t('help.communityBody'),
    },
    {
      to: '/safety',
      icon: ShieldCheck,
      title: t('help.safety'),
      body: t('help.safetyBody'),
    },
    {
      to: '/ussd',
      icon: Smartphone,
      title: t('help.ussd'),
      body: t('help.ussdBody', { code: '*384*21#' }),
    },
  ];

  return (
    <>
      {/* Floating trigger */}
      <Button
        onClick={() => setOpen(true)}
        aria-label={t('help.open')}
        className="fixed bottom-5 right-5 z-50 h-12 gap-2 rounded-full bg-coral px-5 text-white shadow-lg transition-transform hover:scale-105 hover:bg-coral/90 focus-visible:ring-2 focus-visible:ring-ring"
      >
        <LifeBuoy className="size-5" aria-hidden />
        <span className="hidden text-sm font-semibold sm:inline">{t('help.button')}</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
          <DialogHeader className="bg-primary px-6 py-5 text-left text-primary-foreground">
            <DialogTitle className="flex items-center gap-2.5 font-display text-2xl">
              <LifeBuoy className="size-6" aria-hidden />
              {t('help.title')}
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/80">
              {t('help.lede')}
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6">
            {/* Helplines */}
            <section aria-label={t('help.helplines')}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t('help.helplines')}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {HELPLINES.map((line) => (
                  <li
                    key={line.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug">{line.name}</p>
                      <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                        {lang === 'sw' ? line.descriptionSw : line.descriptionEn}
                      </p>
                    </div>
                    {line.number && (
                      <Button asChild size="sm" className="shrink-0 rounded-full font-mono">
                        <a href={`tel:${line.number}`}>
                          <PhoneCall className="size-3.5" />
                          {line.shortCode ?? line.number}
                        </a>
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* Destinations */}
            <section className="space-y-2.5" aria-label={t('help.title')}>
              {destinations.map((dest) => (
                <Link
                  key={dest.to}
                  to={dest.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3.5 rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <dest.icon className="size-5 text-primary" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{dest.title}</span>
                    <span className="block text-xs leading-snug text-muted-foreground">
                      {dest.body}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                </Link>
              ))}
            </section>

            {/* Quick exit */}
            <section className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/40">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                    {t('help.quickExit')}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-amber-800/80 dark:text-amber-200/80">
                    {t('help.quickExitNote')}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 rounded-full border-amber-400 text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-200 dark:hover:bg-amber-900/50"
                  onClick={() => window.location.assign(QUICK_EXIT_URL)}
                >
                  <LogOut className="size-3.5" />
                  {t('help.quickExit')}
                </Button>
              </div>
            </section>
          </div>

          <div className="border-t border-border p-3">
            <Button variant="ghost" className="w-full rounded-full" onClick={() => setOpen(false)}>
              <X className="size-4" />
              {t('help.close')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
