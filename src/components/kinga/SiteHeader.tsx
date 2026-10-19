import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { KingaLogo } from '@/components/kinga/KingaLogo';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/lib/i18n/useLanguage';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/ussd', labelKey: 'nav.ussd' },
  { to: '/community', labelKey: 'nav.community' },
  { to: '/safety', labelKey: 'nav.safety' },
  { to: '/referrals', labelKey: 'nav.referrals' },
  { to: '/dashboard', labelKey: 'nav.dashboard' },
  { to: '/analytics', labelKey: 'nav.analytics' },
  { to: '/admin', labelKey: 'nav.admin' },
];

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();

  const isActive = (to: string, end?: boolean) =>
    end ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Kinga — home"
        >
          <KingaLogo />
        </Link>

        <div className="flex items-center gap-2">
          {/* Language toggle (EN / SW) */}
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-3 font-semibold"
            onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
            aria-label="Language / Lugha"
          >
            {lang === 'en' ? 'SW' : 'EN'}
          </Button>

          {/* Light / dark mode toggle */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {/* Navigation menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label={t('nav.openMenu')} className="rounded-full">
                <Menu className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              {NAV_ITEMS.map((item) => (
                <DropdownMenuItem
                  key={item.to}
                  asChild
                  className={cn(
                    'cursor-pointer px-3 py-2.5 text-sm',
                    isActive(item.to, item.end) && 'bg-primary/10 font-semibold text-primary',
                  )}
                >
                  <Link to={item.to}>{t(item.labelKey)}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
