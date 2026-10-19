import { Link, useLocation } from 'react-router-dom';
import { Check, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label={t('nav.openMenu')} className="rounded-full">
              <Menu className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            {/* Navigation */}
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

            <DropdownMenuSeparator />

            {/* Language */}
            <DropdownMenuLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Language / Lugha
            </DropdownMenuLabel>
            {(['en', 'sw'] as const).map((l) => (
              <DropdownMenuItem
                key={l}
                onSelect={() => setLang(l)}
                className="cursor-pointer px-3 py-2 text-sm"
              >
                <span className={cn('flex-1', lang === l && 'font-semibold text-primary')}>
                  {l === 'en' ? 'English' : 'Kiswahili'}
                </span>
                {lang === l && <Check className="size-4 text-primary" aria-hidden />}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            {/* Theme */}
            <DropdownMenuLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Theme
            </DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="cursor-pointer px-3 py-2 text-sm"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="size-4" aria-hidden />
                  Light mode
                </>
              ) : (
                <>
                  <Moon className="size-4" aria-hidden />
                  Dark mode
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
