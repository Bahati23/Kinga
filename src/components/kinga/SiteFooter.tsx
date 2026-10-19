import { Link } from 'react-router-dom';
import { Lock, PhoneCall } from 'lucide-react';
import { KingaLogo } from '@/components/kinga/KingaLogo';
import { useLanguage } from '@/lib/i18n/useLanguage';

export function SiteFooter() {
  const { t } = useLanguage();

  const links = [
    { to: '/ussd', key: 'footer.ussd' },
    { to: '/dashboard', key: 'footer.dashboard' },
    { to: '/referrals', key: 'footer.referrals' },
    { to: '/analytics', key: 'footer.analytics' },
    { to: '/admin', key: 'footer.admin' },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div className="space-y-4">
          <KingaLogo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t('footer.tagline')}
          </p>
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
            <Lock className="size-3.5" aria-hidden />
            {t('footer.privacyBadge')}
          </p>
        </div>

        <nav className="space-y-3" aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            {t('footer.platform')}
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  className="rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  to={link.to}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            {t('footer.safetyTitle')}
          </h2>
          <p className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <PhoneCall className="mt-0.5 size-4 shrink-0" aria-hidden />
            {t('footer.safetyNote')}
          </p>
          <p className="rounded-lg bg-primary/5 px-3 py-2 font-mono text-xs font-semibold text-primary">
            {t('footer.helplines')}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{t('footer.demo')}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex items-center justify-center py-5 text-center text-xs text-muted-foreground">
          <p>{t('footer.builtWith')}</p>
        </div>
      </div>
    </footer>
  );
}
